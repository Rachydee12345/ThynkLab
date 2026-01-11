
import React, { useEffect, useRef } from 'react';
import { useSection } from '../context/SectionContext';

interface SectionProps {
  label: string;
  children: React.ReactNode;
  isHero?: boolean;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ label, children, isHero = false, className = "" }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { setActiveLabel, setIsVisible } = useSection();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveLabel(label);
          // If it's a hero, we might want the label hidden until we scroll a bit
          // but per requirements, we want the label to appear as we scroll.
          // For simplicity and consistency:
          if (!isHero) setIsVisible(true);
        }
      },
      {
        // Detect section when it reaches the top 20% of the viewport
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [label, isHero, setActiveLabel, setIsVisible]);

  // Specific scroll-linked logic for Heroes to match Home page behavior
  useEffect(() => {
    if (!isHero) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 150;
      if (scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHero, setIsVisible]);

  return (
    <section ref={sectionRef} className={className}>
      {children}
    </section>
  );
};

export default Section;
