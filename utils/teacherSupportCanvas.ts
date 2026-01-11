
import { BlueprintCycle } from '../blueprint';

const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
  const words = text.split(' ');
  let line = '';
  let testY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, testY);
      line = words[n] + ' ';
      testY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, testY);
  return testY + lineHeight;
};

const drawLogoOnCanvas = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
  const scale = size / 32;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  
  const grad = ctx.createLinearGradient(4, 4, 28, 28);
  grad.addColorStop(0, '#7C3AED');
  grad.addColorStop(0.55, '#EC4899');
  grad.addColorStop(0.80, '#F97316');
  grad.addColorStop(1, '#FACC15');
  
  ctx.strokeStyle = grad;
  ctx.lineWidth = 6;
  ctx.lineCap = 'square';
  
  ctx.beginPath();
  ctx.moveTo(4, 4);
  ctx.lineTo(16, 16);
  ctx.lineTo(16, 30);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(28, 4);
  ctx.lineTo(16, 16);
  ctx.stroke();
  
  ctx.restore();
};

const drawBranding = (ctx: CanvasRenderingContext2D, width: number, height: number, cycle: BlueprintCycle, pageNum: number, margin: number) => {
  // Draw Logo
  drawLogoOnCanvas(ctx, margin, 75, 48);
  
  // Branding Top Left
  ctx.fillStyle = "#0F172A";
  ctx.font = "900 60px Montserrat, sans-serif";
  ctx.textAlign = 'left';
  ctx.fillText("THYNKLAB", margin + 65, 120);
  
  ctx.fillStyle = "#64748B";
  ctx.font = "500 24px Montserrat, sans-serif";
  ctx.fillText("WHERE FUTURE SKILLS BEGIN", margin, 160);

  // Page Indicator Top Right
  ctx.fillStyle = "#7C3AED";
  ctx.font = "bold 24px Montserrat, sans-serif";
  ctx.textAlign = 'right';
  ctx.fillText(`PAGE ${pageNum} OF 4`, width - margin, 120);
  
  // Guide Subtitle
  ctx.fillStyle = "#94A3B8";
  ctx.font = "bold 24px Montserrat, sans-serif";
  ctx.fillText("TEACHER SUPPORT GUIDE", width - margin, 160);
  
  // Divider
  ctx.fillStyle = "#7C3AED";
  ctx.beginPath();
  // @ts-ignore - roundRect is modern but may not be in all TS types yet
  if (ctx.roundRect) ctx.roundRect(margin, 200, width - (margin * 2), 6, 3);
  else ctx.rect(margin, 200, width - (margin * 2), 6);
  ctx.fill();

  // Footer
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, height - 120, width, 120);
  
  ctx.strokeStyle = "#E2E8F0";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(margin, height - 120);
  ctx.lineTo(width - margin, height - 120);
  ctx.stroke();

  ctx.fillStyle = '#94A3B8';
  ctx.font = 'bold 18px Montserrat';
  ctx.textAlign = 'center';
  ctx.fillText(`THYNKLAB 2026 © • YEAR 4 ENGINEERING • CYCLE: ${cycle.theme}`, width / 2, height - 60);
  ctx.textAlign = 'left';
};

export const drawTeacherSupportPage = (cycle: BlueprintCycle, pageNum: number): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  const width = 1240;
  const height = 1754;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error("Could not create canvas context");

  const data = cycle.teacherSupport;
  const margin = 100;

  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  drawBranding(ctx, width, height, cycle, pageNum, margin);

  ctx.fillStyle = '#0F172A';
  let y = 300;

  if (pageNum === 1) {
    ctx.font = '900 36px Montserrat';
    ctx.fillText('MISSION OUTCOMES', margin, y);
    y += 60;

    data.outcomes.forEach(o => {
      ctx.fillStyle = '#F1F5F9';
      ctx.fillRect(margin, y, width - (margin * 2), 140);
      ctx.fillStyle = '#7C3AED';
      ctx.font = 'bold 14px Montserrat';
      ctx.fillText(o.cat.toUpperCase(), margin + 30, y + 40);
      ctx.fillStyle = '#1E293B';
      ctx.font = '600 20px Montserrat';
      y = wrapText(ctx, o.outcome, margin + 30, y + 75, width - (margin * 2) - 60, 28);
      ctx.fillStyle = '#64748B';
      ctx.font = 'italic 16px Montserrat';
      ctx.fillText(`Evaluation Method: ${o.method}`, margin + 30, y + 10);
      y += 80;
    });

    y += 40;
    ctx.fillStyle = '#0F172A';
    ctx.font = '900 36px Montserrat';
    ctx.fillText('TECHNICAL VOCABULARY', margin, y);
    y += 60;
    data.vocab.forEach(v => {
      ctx.fillStyle = '#1E293B';
      ctx.font = 'bold 20px Montserrat';
      ctx.fillText(v.t, margin, y);
      ctx.fillStyle = '#64748B';
      ctx.font = '500 18px Montserrat';
      ctx.fillText(`: ${v.d}`, margin + ctx.measureText(v.t).width + 10, y);
      y += 40;
    });
  } else if (pageNum === 2) {
    ctx.font = '900 36px Montserrat';
    ctx.fillText('PEDAGOGICAL FRAMEWORK', margin, y);
    y += 60;

    data.pedagogy.forEach(p => {
      ctx.fillStyle = '#EEF2FF';
      ctx.fillRect(margin, y, width - (margin * 2), 220);
      ctx.fillStyle = '#4338CA';
      ctx.font = '900 20px Montserrat';
      ctx.fillText(`${p.title.toUpperCase()}: ${p.subtitle}`, margin + 30, y + 45);
      
      ctx.fillStyle = '#1E293B';
      ctx.font = 'bold 16px Montserrat';
      ctx.fillText('STRATEGY:', margin + 30, y + 85);
      ctx.font = '500 16px Montserrat';
      ctx.fillText(p.strategy, margin + 140, y + 85);

      ctx.font = 'bold 16px Montserrat';
      ctx.fillText('FOCUS:', margin + 30, y + 120);
      ctx.font = '500 16px Montserrat';
      ctx.fillText(p.focus, margin + 140, y + 120);

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(margin + 20, y + 145, width - (margin * 2) - 40, 55);
      ctx.fillStyle = '#4338CA';
      ctx.font = 'italic bold 16px Montserrat';
      ctx.fillText(`Questioning: "${p.action}"`, margin + 40, y + 180);
      y += 250;
    });
  } else if (pageNum === 3) {
    ctx.font = '900 36px Montserrat';
    ctx.fillText('ASSESSMENT RUBRIC', margin, y);
    y += 60;

    const colWidths = [220, 260, 260, 260];
    const startX = margin;
    
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(startX, y, width - (margin * 2), 60);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px Montserrat';
    ctx.fillText('CRITERIA', startX + 20, y + 38);
    ctx.fillText('DEVELOPING', startX + colWidths[0] + 20, y + 38);
    ctx.fillText('PROFICIENT', startX + colWidths[0] + colWidths[1] + 20, y + 38);
    ctx.fillText('ADVANCED', startX + colWidths[0] + colWidths[1] + colWidths[2] + 20, y + 38);
    
    y += 60;
    data.rubric.forEach((r) => {
      const rowHeight = 200;
      ctx.strokeStyle = '#E2E8F0';
      ctx.strokeRect(startX, y, width - (margin * 2), rowHeight);
      
      ctx.beginPath();
      ctx.moveTo(startX + colWidths[0], y); ctx.lineTo(startX + colWidths[0], y + rowHeight);
      ctx.moveTo(startX + colWidths[0] + colWidths[1], y); ctx.lineTo(startX + colWidths[0] + colWidths[1], y + rowHeight);
      ctx.moveTo(startX + colWidths[0] + colWidths[1] + colWidths[2], y); ctx.lineTo(startX + colWidths[0] + colWidths[1] + colWidths[2], y + rowHeight);
      ctx.stroke();

      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 16px Montserrat';
      wrapText(ctx, r.criteria, startX + 15, y + 40, colWidths[0] - 30, 22);
      
      ctx.font = '500 14px Montserrat';
      wrapText(ctx, r.dev, startX + colWidths[0] + 15, y + 40, colWidths[1] - 30, 20);
      wrapText(ctx, r.prof, startX + colWidths[0] + colWidths[1] + 15, y + 40, colWidths[2] - 30, 20);
      wrapText(ctx, r.adv, startX + colWidths[0] + colWidths[1] + colWidths[2] + 15, y + 40, colWidths[3] - 30, 20);
      
      y += rowHeight;
    });
  } else if (pageNum === 4) {
    ctx.font = '900 36px Montserrat';
    ctx.fillText('EXIT CHECKLIST', margin, y);
    y += 50;
    data.checklist.forEach(c => {
      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.arc(margin + 15, y - 8, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1E293B';
      ctx.font = '600 20px Montserrat';
      ctx.fillText(c, margin + 40, y);
      y += 50;
    });

    y += 60;
    ctx.fillStyle = '#0F172A';
    ctx.font = '900 36px Montserrat';
    ctx.fillText('COMMON MISCONCEPTIONS', margin, y);
    y += 60;
    data.misconceptions.forEach(m => {
      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(margin, y, width - (margin * 2), 100);
      ctx.fillStyle = '#EF4444';
      ctx.font = 'bold 16px Montserrat';
      ctx.fillText('ERROR:', margin + 20, y + 40);
      ctx.fillStyle = '#1E293B';
      ctx.fillText(m.error, margin + 90, y + 40);
      
      ctx.fillStyle = '#10B981';
      ctx.fillText('FIX:', margin + 20, y + 75);
      ctx.fillStyle = '#1E293B';
      ctx.font = 'italic 16px Montserrat';
      ctx.fillText(m.fix, margin + 90, y + 75);
      y += 130;
    });
  }

  return canvas;
};
