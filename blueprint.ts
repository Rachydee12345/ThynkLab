
export interface BlueprintStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BlueprintResource {
  title: string;
  type: string;
  id?: string;
  url?: string;
}

export interface BlueprintCycle {
  id: string;
  key: string;
  title: string;
  theme: string;
  svgSchematic: string;
  make: {
    dailyGoal: string;
    description: string;
    materials: string[];
    steps: BlueprintStep[];
    resources: BlueprintResource[];
    challenge?: {
      title: string;
      description: string;
      requirements: string[];
    };
  };
  thynk: {
    concepts: { title: string; description: string; icon: string }[];
    explanation: { title: string; text: string };
    deepDive: {
      heading: string;
      whyItMatters: string;
      realWorldApplication: string;
      logicExploration: string;
    };
    quiz: { id: number; question: string; options: string[]; answer: number }[];
  };
  tweak: {
    intro: string;
    options: { id: string; title: string; description: string; icon: string }[];
  };
  test: {
    intro: string;
    methods: { title: string; description: string; icon: string }[];
  };
  teacherSupport: {
    outcomes: { cat: string; outcome: string; method: string }[];
    vocab: { t: string; d: string }[];
    pedagogy: { title: string; icon: string; subtitle: string; strategy: string; focus: string; action: string }[];
    rubric: { criteria: string; dev: string; prof: string; adv: string }[];
    misconceptions: { error: string; fix: string }[];
    checklist: string[];
  };
}

export interface Blueprint {
  unit: {
    id: string;
    yearGroup: number;
    title: string;
    description: string;
    thynkLink: {
      context: string;
      mission: string;
    };
  };
  security: {
    schoolName: string;
    chatbotPassword: string;
    aiBudgetLimit: number;
  };
  cycles: BlueprintCycle[];
}

export const blueprint: Blueprint = {
  "unit": {
    "id": "year-4-moving-vehicles",
    "yearGroup": 4,
    "title": "Moving Vehicles",
    "description": "Exploration of wheels, axles, and automated robotics inspired by Anglo-Saxon engineering.",
    "thynkLink": {
      "context": "In Anglo-Saxon times, carts and wagons were essential for transporting goods. These early vehicles relied on simple machines like wheels and axles to move heavy loads efficiently.",
      "mission": "In this unit, you’ll build a rolling cart inspired by these early designs — and then add a modern twist by powering and controlling it with a Sphero robot."
    }
  },
  "security": {
    "schoolName": "Thynk Academy Primary",
    "chatbotPassword": "thynkbot123",
    "aiBudgetLimit": 50.00
  },
  "cycles": [
    {
      "id": "cycle-1",
      "key": "CYCLE 1: WHEELS & AXLES",
      "title": "Build Your Rolling Cart!",
      "theme": "Wheels & Axles",
      "svgSchematic": `<svg viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="450" fill="#F8FAFC"/>
        <rect x="250" y="100" width="300" height="250" rx="8" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2"/>
        <rect x="240" y="140" width="320" height="20" rx="4" fill="#BAE6FD" stroke="#0EA5E9" stroke-width="2"/>
        <rect x="240" y="290" width="320" height="20" rx="4" fill="#BAE6FD" stroke="#0EA5E9" stroke-width="2"/>
        <line x1="200" y1="150" x2="600" y2="150" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
        <line x1="200" y1="300" x2="600" y2="300" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
        <rect x="165" y="115" width="30" height="70" rx="4" fill="#1E293B"/>
        <rect x="605" y="115" width="30" height="70" rx="4" fill="#1E293B"/>
        <rect x="165" y="265" width="30" height="70" rx="4" fill="#1E293B"/>
        <rect x="605" y="265" width="30" height="70" rx="4" fill="#1E293B"/>
        <text x="400" y="70" text-anchor="middle" font-family="Montserrat" font-weight="bold" font-size="14" fill="#64748B">CHASSIS ASSEMBLY (TOP VIEW)</text>
        <text x="400" y="135" font-family="Montserrat" font-size="10" fill="#0369A1" text-anchor="middle">BEARING (STRAW)</text>
        <text x="180" y="205" font-family="Montserrat" font-size="10" fill="#EF4444" text-anchor="middle" font-weight="bold">FRICTION GAP</text>
      </svg>`,
      "make": {
        "dailyGoal": "Today, we are learning how to build a rolling cart that moves using wheels and axles.",
        "description": "We are building a rolling cart that can zoom down a ramp! Focus on making the chassis strong and the axles straight.",
        "materials": ["A5 Corrugated Cardboard", "2x Wooden Skewers", "2x Plastic Straws", "4x Plastic Wheels", "Masking Tape", "Scissors", "Ruler"],
        "steps": [
          { "id": "m1", "title": "Layout & Mark", "description": "Use your ruler to mark a rectangle on your cardboard. Make sure the corners are square!", "icon": "Layout" },
          { "id": "m2", "title": "Precision Cut", "description": "Carefully cut your cardboard along the lines. Keep your fingers away from the scissor blades.", "icon": "Scissors" },
          { "id": "m3", "title": "Prepare Bearings", "description": "Cut two straws so they are 2cm shorter than the width of your cardboard chassis.", "icon": "Scissors" },
          { "id": "m4", "title": "The Parallel Secret", "description": "Draw two straight lines across the bottom of your base. These must be perfectly parallel so your cart drives straight.", "icon": "AlignJustify" },
          { "id": "m5", "title": "Secure Straws", "description": "Tape the straws onto your lines. Use enough tape so they don't wiggle, but don't squash the straws!", "icon": "Box" },
          { "id": "m6", "title": "Insert Axles", "description": "Gently slide a wooden skewer through each straw. These are your rotating axles.", "icon": "MoveHorizontal" },
          { "id": "m7", "title": "The Friction Roll", "description": "Place your cart on a slope. Release it and observe how the wheels and axles work together to glide smoothly!", "icon": "RefreshCw" }
        ],
        "resources": [
          { "title": "Chassis Template A", "type": "Template", "id": "CHASSIS_TEMPLATE" },
          { "title": "Axle Assembly Guide", "type": "Template", "id": "AXLE_GUIDE" }
        ]
      },
      "thynk": {
        "concepts": [
          { "title": "Wheel & Axle Mechanics", "description": "A simple machine where a circular wheel rotates around a central rod (axle) to convert sliding friction into rolling friction.", "icon": "Settings" },
          { "title": "Friction Reduction", "description": "The bearing (straw) provides a smooth, low-friction surface for the axle to spin inside, preventing it from catching on the rough cardboard.", "icon": "Minimize2" },
          { "title": "Parallel Geometry", "description": "If axles are not perfectly parallel, the wheels fight each other, creating 'drag' and making the vehicle turn or stop early.", "icon": "AlignJustify" },
          { "title": "Force of Gravity", "description": "On a ramp, gravity pulls the mass of the cart downward. Smooth bearings allow more of this energy to be used for speed rather than heat.", "icon": "TrendingDown" }
        ],
        "explanation": { "title": "Mechanical Force", "text": "Gravity or a push creates motion. Friction at the axle can be reduced using a smooth straw bearing." },
        "deepDive": {
          "heading": "Mechanical Efficiency: The Power of the Axle",
          "whyItMatters": "In engineering, efficiency is everything. If we waste energy through friction, our vehicles go slower and break down sooner. Understanding the Wheel & Axle allows us to move thousands of kilograms with very little effort.",
          "realWorldApplication": "Modern car engines and electric motors use ball bearings—tiny metal balls—to make their axles spin even smoother than your straw bearings. Without this, your family car would waste most of its fuel just trying to overcome the friction of the road!",
          "logicExploration": "When you align your straws, you are using Geometry. Two parallel lines never meet; if your axles stay perfectly parallel, your wheels never fight each other. This is the secret to a high-speed vehicle."
        },
        "quiz": [
          { "id": 1, "question": "What is the plastic straw used for?", "options": ["Axle", "Bearing", "Chassis"], "answer": 1 },
          { "id": 2, "question": "Which machine uses a rod through a wheel?", "options": ["Lever", "Wheel & Axle", "Pulley"], "answer": 1 },
          { "id": 3, "question": "What happens if axles aren't parallel?", "options": ["Goes faster", "Goes straight", "The cart will turn"], "answer": 2 },
          { "id": 4, "question": "Friction is a force that...", "options": ["Helps speed", "Resists motion", "Changes color"], "answer": 1 },
          { "id": 5, "question": "Why leave a gap between wheel and chassis?", "options": ["To look cool", "To reduce friction", "To balance weight"], "answer": 1 },
          { "id": 6, "question": "The Chassis is the...", "options": ["Motor", "Wheels", "Body Frame"], "answer": 2 }
        ]
      },
      "tweak": {
        "intro": "Upgrade your Anglo-Saxon cart! Choose up to 3 options total.",
        "options": [
          { "id": "t1", "title": "Cargo Walls", "description": "Add 4cm walls to keep grain safe.", "icon": "Box" },
          { "id": "t2", "title": "Driver's Seat", "description": "Build a platform for a mini-figure.", "icon": "CircleDot" },
          { "id": "t3", "title": "Wheel Grips", "description": "Add rubber bands for traction.", "icon": "Zap" },
          { "id": "t4", "title": "Aero-Front", "description": "Add a pointed card-nose for speed.", "icon": "ArrowUp" },
          { "id": "t5", "title": "Reinforced Base", "description": "Double layer the cardboard.", "icon": "Shield" },
          { "id": "t6", "title": "Shield Patterns", "description": "Add Anglo-Saxon patterns.", "icon": "Target" }
        ]
      },
      "test": {
        "intro": "Scientific testing proves your engineering.",
        "methods": [
          { "title": "Friction Spin Test", "description": "Flick each wheel. It should spin for at least 2 seconds without stopping.", "icon": "RefreshCw" },
          { "title": "Ramp Roll", "description": "Measure how far the cart rolls from a 20cm high ramp. Aim for 2 meters!", "icon": "TrendingDown" },
          { "title": "The Drift Test", "description": "Roll the cart down a straight line. Does it stay on the path or turn?", "icon": "ArrowRight" }
        ]
      },
      "teacherSupport": {
        "outcomes": [
          { "cat": "Mechanical Engineering", "outcome": "Understand that an axle must be parallel to the chassis for straight movement.", "method": "Observe cart trajectory during 'Ramp Roll' test." },
          { "cat": "Physics", "outcome": "Identify that friction is a force that can be reduced using bearings.", "method": "Compare wheel spin time with and without straw bearings." }
        ],
        "vocab": [
          { "t": "Chassis", "d": "The base frame of a vehicle." },
          { "t": "Bearing", "d": "A part that helps a machine rotate smoothly by reducing friction." },
          { "t": "Friction", "d": "The force that resists motion when surfaces rub together." },
          { "t": "Axle", "d": "The central shaft for a rotating wheel." }
        ],
        "pedagogy": [
          { "title": "Scaffolding", "icon": "Hammer", "subtitle": "Visual Alignment", "strategy": "Use the 'Parallel Secret' guide.", "focus": "Precision marking.", "action": "Ask: 'How can we check if your straws are exactly the same distance apart?'" },
          { "title": "Inquiry", "icon": "Lightbulb", "subtitle": "Friction Discovery", "strategy": "The 'Friction Gap' exploration.", "focus": "Cause and effect.", "action": "Prompt: 'What happens if the wheel is pushed tightly against the cardboard?'" }
        ],
        "rubric": [
          { "criteria": "Mechanical Stability", "dev": "Wheels are attached but wobbly or misaligned.", "prof": "Axles are parallel and wheels spin freely with straw bearings.", "adv": "Chassis is reinforced and wheels show minimal resistance during high-speed roll." }
        ],
        "misconceptions": [
          { "error": "Wheels should be as tight as possible to the chassis.", "fix": "Tight wheels create friction. We need a 'pinky-gap' for rotation." },
          { "error": "Any straw will work as a bearing regardless of size.", "fix": "The skewer must move loosely inside the straw to prevent binding." }
        ],
        "checklist": [
          "Are both straw bearings parallel?",
          "Do all four wheels spin for at least 2 seconds?",
          "Is the chassis cut squarely?"
        ]
      }
    },
    {
      "id": "cycle-2",
      "key": "CYCLE 2: POWERED MOVEMENT",
      "title": "Chariot Coupling!",
      "theme": "Powered Movement",
      "svgSchematic": `<svg viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="450" fill="#F8FAFC"/>
        <circle cx="200" cy="250" r="45" fill="#FFFFFF" stroke="#6366F1" stroke-width="3"/>
        <path d="M140 280 L260 280 L240 180 L160 180 Z" fill="#EEF2FF" stroke="#6366F1" stroke-width="2" opacity="0.6"/>
        <text x="200" y="320" text-anchor="middle" font-family="Montserrat" font-weight="bold" font-size="10" fill="#6366F1">SPHERO (IN CUP)</text>
        <path d="M250 220 C 350 220, 350 220, 450 220" stroke="#7C3AED" stroke-width="15" stroke-linecap="round" fill="none"/>
        <rect x="300" y="210" width="100" height="20" rx="4" fill="#7C3AED"/>
        <text x="350" y="200" text-anchor="middle" font-family="Montserrat" font-weight="bold" font-size="10" fill="#7C3AED">U-BRIDGE COUPLER</text>
        <rect x="450" y="170" width="220" height="120" rx="8" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2"/>
        <circle cx="490" cy="290" r="25" fill="#1E293B"/>
        <circle cx="630" cy="290" r="25" fill="#1E293B"/>
        <text x="560" y="235" text-anchor="middle" font-family="Montserrat" font-weight="bold" font-size="12" fill="#64748B">LOAD (CART)</text>
        <text x="400" y="80" text-anchor="middle" font-family="Montserrat" font-weight="bold" font-size="16" fill="#64748B">CHARIOT COUPLING ASSEMBLY</text>
      </svg>`,
      "make": {
        "dailyGoal": "Today, we are learning how to power our carts using a robotic horse and a custom coupler.",
        "description": "We are creating a chariot-style coupler! The robot acts as the horse, pushing or pulling the cart.",
        "materials": ["Rolling Cart", "Sphero Bolt", "Plastic Cup", "Cardboard Coupler", "Masking Tape", "iPad", "Sphero Edu App"],
        "steps": [
          { "id": "pm1", "title": "Chariot Setup", "description": "Place your rolling cart on the floor and put your Sphero robot in front of it.", "icon": "Box" },
          { "id": "pm2", "title": "Modify the Cup", "description": "Carefully cut the bottom out of your plastic cup. This is the shell for your 'horse'.", "icon": "Scissors" },
          { "id": "pm3", "title": "The Coupling Bridge", "description": "Fold a cardboard strip into a 'U' shape to bridge the gap between the cup and the cart.", "icon": "PenTool" },
          { "id": "pm4", "title": "Secure the Join", "description": "Tape the bridge to the rim of the cup and the front of your cart chassis.", "icon": "Link" },
          { "id": "pm5", "title": "Dock the Horse", "description": "Slide the cup shell over your Sphero Bolt. The robot should touch the floor through the hole.", "icon": "Zap" },
          { "id": "pm6", "title": "Pair & Connect", "description": "Open the Sphero Edu app on your iPad. Turn on your Sphero and pair it. You are now the driver!", "icon": "Radio" },
          { "id": "pm7", "title": "Powered Horse Drive", "description": "Use the joystick in the Sphero Edu app to drive your 'robotic horse'. Watch it power your cart!", "icon": "Truck" }
        ],
        "resources": [{ "title": "Coupling Instructions", "type": "Template", "id": "COUPLING_INSTRUCTIONS" }]
      },
      "thynk": {
        "concepts": [
          { "title": "Traction & Grip", "description": "Traction is the friction between the robot's wheels (or shell) and the floor. Without enough traction, the robot spins in place without moving the cart.", "icon": "Zap" },
          { "title": "Energy Transfer", "description": "The robotic horse creates 'Rotational Force'. The coupler transfers this into 'Linear Motion' to pull the cart forward.", "icon": "RefreshCw" },
          { "title": "System Coupling", "description": "A 'rigid' coupler makes the cart easy to push, while a 'flexible' coupler is better for pulling around corners. We must balance strength and flexibility.", "icon": "Link" },
          { "title": "Mass & Torque", "description": "Torque is the twisting force of the motor. Heavier carts require more torque to start moving from a standstill (Static Friction).", "icon": "Weight" }
        ],
        "explanation": { "title": "The Power Bridge", "text": "The robot spins its shell. By coupling it to the cart, the energy is transferred to the load." },
        "deepDive": {
          "heading": "Torque & Traction: Mastering Powered Movement",
          "whyItMatters": "Powering a vehicle isn't just about having a fast motor; it's about how that motor connects to the load. If the connection (coupler) is too weak, it snaps. If the traction is too low, the motor just spins without moving. This is why engineers spend years designing the perfect gearboxes and tires.",
          "realWorldApplication": "Think about a huge train. The locomotive (the engine at the front) is incredibly heavy to increase traction on the smooth steel tracks. The couplers between each carriage are made of reinforced steel to handle the massive torque needed to pull thousands of tons of cargo.",
          "logicExploration": "When your Sphero drives inside the cup, it is using its internal motor to rotate its weight. The friction between the Sphero and the floor is what pushes the whole vehicle. If you add weight to your robot, you increase its traction, allowing it to pull a much heavier cart!"
        },
        "quiz": [
          { "id": 7, "question": "What is the 'Horse' in our chariot?", "options": ["The Cart", "The Sphero", "The Cup"], "answer": 1 },
          { "id": 8, "question": "Traction means...", "options": ["Speed", "Grip", "Color"], "answer": 1 },
          { "id": 9, "question": "Why cut the bottom out of the cup?", "options": ["Reduce weight", "Fit the robot", "Let light out"], "answer": 1 },
          { "id": 10, "question": "A Coupler is a...", "options": ["Wheel", "Connector", "Brake"], "answer": 1 },
          { "id": 11, "question": "The Sphero must touch...", "options": ["The cart only", "The floor", "The air"], "answer": 1 },
          { "id": 12, "question": "Force is required to...", "options": ["Change motion", "Change color", "Stop time"], "answer": 0 }
        ]
      },
      "tweak": {
        "intro": "Upgrade your Chariot! Choose up to 3 options total.",
        "options": [
          { "id": "p1", "title": "Soft Suspension", "description": "Add foam bits to the coupler bridge.", "icon": "Droplets" },
          { "id": "p2", "title": "Extended Coupler", "description": "Increase distance for wider turns.", "icon": "Maximize" },
          { "id": "p3", "title": "Weight Ballast", "description": "Add blue-tack to the robot for grip.", "icon": "Weight" },
          { "id": "p4", "title": "Cart Armor", "description": "Add side panels for stability.", "icon": "Shield" },
          { "id": "p5", "title": "Tread Upgrade", "description": "Add rubber bands around Sphero.", "icon": "Zap" },
          { "id": "p6", "title": "Dual Link", "description": "Add a second coupler for strength.", "icon": "Link" }
        ]
      },
      "test": {
        "intro": "Test your chariot's strength!",
        "methods": [
          { "title": "Pull Test", "description": "Can your chariot pull a load of 100g up a small slope?", "icon": "Weight" },
          { "title": "Surface Grip Test", "description": "Test driving on carpet vs. smooth floor. Where does the robot slip?", "icon": "Zap" },
          { "title": "Coupling Stress Test", "description": "Perform a sharp 180-degree manual turn. Does the cardboard bridge tear or hold?", "icon": "Link" }
        ]
      },
      "teacherSupport": {
        "outcomes": [
          { "cat": "Systems Architecture", "outcome": "Design a coupling system that transfers energy without restricting robot rotation.", "method": "Observe robot shell spinning inside the cup while the cart moves." },
          { "cat": "Physics (Force)", "outcome": "Explain how traction affects the ability of a powered vehicle to move a load.", "method": "Oral explanation during 'Surface Grip' test." }
        ],
        "vocab": [
          { "t": "Traction", "d": "The grip between a tire/wheel and the ground." },
          { "t": "Coupler", "d": "The mechanical bridge connecting the motor unit to the trailer." },
          { "t": "Torque", "d": "Twisting force that causes rotation." },
          { "t": "Horsepower", "d": "A measure of the power produced by an engine or motor." }
        ],
        "pedagogy": [
          { "title": "Collaborative Design", "icon": "Settings2", "subtitle": "Partner Stabilizing", "strategy": "Peer-holding during cup cutting.", "focus": "Safety and accuracy.", "action": "Prompt: 'How can you help your partner get a straight cut on their cup?'" },
          { "title": "Predictive Testing", "icon": "Target", "subtitle": "Grip Prediction", "strategy": "Pre-test hypothesis.", "focus": "Scientific method.", "action": "Ask: 'Which floor in the classroom will be the hardest for your robot to grip?'" }
        ],
        "rubric": [
          { "criteria": "Coupling Integrity", "dev": "Coupler bridge is weak and tears under the weight of the robot.", "prof": "Coupler securely connects cup to cart and allows robot to pull a load.", "adv": "Coupler is ergonomically shaped to allow 90-degree turns without binding." }
        ],
        "misconceptions": [
          { "error": "The robot should be taped directly to the cart.", "fix": "The robot needs to rotate its shell freely inside the cup to generate force." },
          { "error": "Heavier carts are always harder to pull.", "fix": "Heavier loads can actually increase traction for the robot, up to a certain point." }
        ],
        "checklist": [
          "Is the cup bottom fully removed?",
          "Does the robot touch the floor through the cup?",
          "Is the bridge tape strong enough for a 'Tug' test?"
        ]
      }
    },
    {
      "id": "cycle-3",
      "key": "CYCLE 3: AUTOMATED DRIVING",
      "title": "Village Algorithm!",
      "theme": "Automated Driving",
      "svgSchematic": `<svg viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="450" fill="#F8FAFC"/>
        <path d="M300 60 L500 60 L510 70 L510 100 L500 110 L300 110 L290 100 L290 70 Z" fill="#2A3339"/>
        <text x="400" y="90" text-anchor="middle" font-family="Montserrat" font-weight="bold" font-size="12" fill="white">ON START PROGRAM</text>
        <rect x="300" y="120" width="200" height="50" rx="8" fill="#3B82F6"/>
        <text x="320" y="150" font-family="Montserrat" font-weight="bold" font-size="12" fill="white">AIM (HEADING 0°)</text>
        <rect x="300" y="180" width="200" height="50" rx="8" fill="#6366F1"/>
        <text x="320" y="210" font-family="Montserrat" font-weight="bold" font-size="10" fill="white">ROLL 0° AT 60 FOR 2s</text>
        <rect x="300" y="240" width="200" height="50" rx="8" fill="#F59E0B"/>
        <text x="320" y="270" font-family="Montserrat" font-weight="bold" font-size="12" fill="white">DELAY 1s</text>
        <rect x="300" y="300" width="200" height="50" rx="8" fill="#8B5CF6"/>
        <text x="320" y="330" font-family="Montserrat" font-weight="bold" font-size="12" fill="white">SPIN 90° OVER 1s</text>
        <path d="M400 360 L400 380" stroke="#94A3B8" stroke-width="2" marker-end="url(#arrow)"/>
        <text x="400" y="410" text-anchor="middle" font-family="Montserrat" font-weight="bold" font-size="14" fill="#64748B">ALGORITHM LOGIC FLOW</text>
      </svg>`,
      "make": {
        "dailyGoal": "Today, we are learning how to create an automated algorithm to drive our vehicles through the village.",
        "description": "Code the cart to drive through the village automatically!",
        "materials": ["Powered Chariot", "iPad", "Sphero Edu App"],
        "steps": [
          { "id": "ad1", "title": "Power Up", "description": "Turn on your Sphero robot and pair it with your iPad in the Sphero Edu app.", "icon": "Zap" },
          { "id": "ad2", "title": "Launch App", "description": "Open the Sphero Edu app and start a new 'Blocks' project named 'Village Mission'.", "icon": "Code" },
          { "id": "ad3", "title": "Calibrate (Aim)", "description": "Tap the 'Aim' button. Rotate the blue tail light until it points directly at you.", "icon": "Target" },
          { "id": "ad4", "title": "The First Algorithm", "description": "Drag a 'Roll' block into the workspace. Set heading to 0° and speed to 60.", "icon": "AlignJustify" },
          { "id": "ad5", "title": "Automated Roll", "description": "Press 'Start' and watch your cart move automatically! Does it drive straight?", "icon": "Play" },
          { "id": "ad6", "title": "Sequence Logic", "description": "Add a 'Delay' block then another 'Roll' block to program a 90° automated turn.", "icon": "RefreshCw" },
          { "id": "ad7", "title": "The Village Run", "description": "Complete your full algorithm so your cart follows the path through the village map.", "icon": "Flag" }
        ],
        "resources": [
          { "title": "Logic Guide 1: Start/Stop", "type": "Template", "id": "LOGIC_GUIDE_1" },
          { "title": "Logic Guide 2: Turns", "type": "Template", "id": "LOGIC_GUIDE_2" }
        ]
      },
      "thynk": {
        "concepts": [
          { "title": "Algorithm Logic", "description": "An algorithm is a set of precise rules. If the order (sequence) is wrong, the robot will fail the mission, even if the individual blocks are correct.", "icon": "Code" },
          { "title": "Computational Precision", "description": "Physical variables (floor grip, battery power) mean 90° in code isn't always 90° in reality. We must 'calibrate' our code for the real world.", "icon": "Target" },
          { "title": "Debugging Sequence", "description": "Debugging is the analytical process of isolating where an instruction set breaks down and predicting the result of a fix.", "icon": "Settings" },
          { "title": "Conditional Timing", "description": "Duration blocks (seconds) are just as important as speed. Speed multiplied by time equals distance traveled.", "icon": "AlignJustify" }
        ],
        "explanation": { "title": "Thinking in Steps", "text": "Computers need precise commands: Heading, Speed, and Duration." },
        "deepDive": {
          "heading": "The Power of Prediction: Thinking in Algorithms",
          "whyItMatters": "An algorithm is just a 'recipe' for a computer. If you skip a step or do them in the wrong order, the result is a disaster. In automation, we use sequences to handle boring or dangerous tasks so humans don't have to!",
          "realWorldApplication": "Self-driving cars like Teslas use massive algorithms every millisecond. If the car 'sees' a person, the algorithm triggers a 'Stop' block immediately. This logic keeps people safe on the road.",
          "logicExploration": "When you use a 'Roll' block, you are setting three variables: Heading (Direction), Speed (Power), and Duration (Time). By stringing these together, you are creating a timeline of events. Debugging is simply finding which part of the timeline is wrong."
        },
        "quiz": [
          { "id": 13, "question": "What is an Algorithm?", "options": ["A robot name", "Step-by-step instructions", "A battery"], "answer": 1 },
          { "id": 14, "question": "What does a Loop do?", "options": ["Stops code", "Repeats code", "Clears code"], "answer": 1 },
          { "id": 15, "question": "Heading 0° means...", "options": ["Turn right", "Forward", "Backward"], "answer": 1 },
          { "id": 16, "question": "What does 'Aim' do?", "options": ["Shoots a laser", "Calibrates forward", "Speeds up"], "answer": 1 },
          { "id": 17, "question": "A Delay block...", "options": ["Speeds up", "Stops for a time", "Turns right"], "answer": 1 },
          { "id": 18, "question": "Code is used to...", "options": ["Automate tasks", "Bake cakes", "Wash dishes"], "answer": 0 }
        ]
      },
      "tweak": {
        "intro": "Optimize your mission code! Choose up to 3 options total.",
        "options": [
          { "id": "a1", "title": "Color Warning", "description": "LED turns Red when turning.", "icon": "Zap" },
          { "id": "a2", "title": "Voice Alert", "description": "Play a sound before moving.", "icon": "Volume2" },
          { "id": "a3", "title": "Loop Logic", "description": "Use a loop to repeat the trip.", "icon": "RefreshCw" },
          { "id": "a4", "title": "Speed Ramp", "description": "Start slow, then go fast.", "icon": "TrendingDown" },
          { "id": "a5", "title": "Collision Stop", "description": "On-bump stop program.", "icon": "Shield" },
          { "id": "a6", "title": "Spin Arrival", "description": "360° spin at the end.", "icon": "RefreshCw" }
        ]
      },
      "test": {
        "intro": "Debugging is testing your code!",
        "methods": [
          { "title": "The Square Challenge", "description": "Can you program your chariot to drive in a perfect 1-meter square and return to the start?", "icon": "Target" },
          { "title": "Precision Stop", "description": "Place a target 2 meters away. Can your code stop the cart exactly on the line?", "icon": "CheckCircle2" },
          { "title": "Reliability Test", "description": "Run your program 3 times. Does it finish in the same spot every time? If not, why?", "icon": "RefreshCw" }
        ]
      },
      "teacherSupport": {
        "outcomes": [
          { "cat": "Computing", "outcome": "Design, write and debug programs that control or simulate physical systems.", "method": "Verification of block code project 'Village Mission'." },
          { "cat": "Mathematics", "outcome": "Use angles (degrees) to describe navigation and turns.", "method": "Successful execution of 90-degree turns on mission map." }
        ],
        "vocab": [
          { "t": "Algorithm", "d": "A set of rules or instructions to be followed by a computer." },
          { "t": "Debugging", "d": "Finding and removing errors from software." },
          { "t": "Sequence", "d": "The specific order in which instructions are executed." },
          { "t": "Calibration", "d": "The process of setting a robot's forward heading (Aiming)." }
        ],
        "pedagogy": [
          { "title": "Computational Thinking", "icon": "Code", "subtitle": "Sequence Logic", "strategy": "Block decomposition.", "focus": "Order of operations.", "action": "Ask: 'If the delay block comes AFTER the spin, what will happen at the corner?'" },
          { "title": "Debugging Support", "icon": "Settings", "subtitle": "Logic Tracing", "strategy": "Finger-tracing code.", "focus": "Syntax and logic.", "action": "Prompt: 'Follow your blocks with your finger as the robot moves. Where does the code stop working?'" }
        ],
        "rubric": [
          { "criteria": "Algorithmic Logic", "dev": "Robot moves randomly or code has significant gaps.", "prof": "Program includes Start, Roll, and Stop blocks in a logical sequence.", "adv": "Program uses variables or nested loops to handle complex multi-stage movement." }
        ],
        "misconceptions": [
          { "error": "The robot knows where to go automatically.", "fix": "Robots only follow exactly what is in the code. We must calibrate 'Aim' first." },
          { "error": "Increasing speed will always make the trip faster.", "fix": "High speeds often cause wheel slip, making the cart less accurate." }
        ],
        "checklist": [
          "Is the robot aimed correctly?",
          "Does the sequence follow Start -> Move -> Turn -> Stop?",
          "Are durations long enough for the distance required?"
        ]
      }
    },
    {
      "id": "cycle-4",
      "key": "CYCLE 4: THE THYNK TANK",
      "title": "Makerspace Mission!",
      "theme": "The Thynk Tank",
      "svgSchematic": `<svg viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="450" fill="#F8FAFC"/>
        <circle cx="150" cy="250" r="40" fill="white" stroke="#6366F1" stroke-width="2"/>
        <path d="M100 280 L200 280 L185 190 L115 190 Z" fill="#6366F1" opacity="0.1" stroke="#6366F1" stroke-width="1"/>
        <path d="M200 220 L350 220" stroke="#7C3AED" stroke-width="10" stroke-linecap="round"/>
        <rect x="350" y="160" width="300" height="150" rx="8" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2"/>
        <circle cx="400" cy="310" r="30" fill="#1E293B"/>
        <circle cx="600" cy="310" r="30" fill="#1E293B"/>
        <text x="500" y="235" text-anchor="middle" font-family="Montserrat" font-weight="bold" font-size="14" fill="#64748B">INTEGRATED MISSION VEHICLE</text>
        <rect x="400" y="140" width="40" height="20" fill="#F59E0B" rx="2"/>
        <rect x="450" y="140" width="40" height="20" fill="#F59E0B" rx="2"/>
        <rect x="500" y="140" width="40" height="20" fill="#F59E0B" rx="2"/>
        <text x="475" y="130" text-anchor="middle" font-family="Montserrat" font-weight="bold" font-size="10" fill="#F59E0B">CARGO (GRAIN)</text>
      </svg>`,
      "make": {
        "dailyGoal": "Today, we are applying everything we have learned to complete the ultimate village delivery mission.",
        "description": "Combine all your skills for the final delivery challenge across the village map!",
        "challenge": {
          "title": "The Great Anglo-Saxon Delivery",
          "description": "Culmination Challenge: Your final mission is to transport a heavy load of grain from the village gates to the Great Hall without manual intervention. Use the official Village Mission Map to plan your path.",
          "requirements": [
            "Mechanics: Must use your stable Wheel & Axle chassis (Cycle 1).",
            "Coupling: Must use a secure Coupler system with the Sphero (Cycle 2).",
            "Logic: Must be controlled by a fully automated Algorithm (Cycle 3).",
            "Precision: Must include a 5-second 'Unloading' stop at the Hall destination.",
            "Navigation: Must handle at least one 90-degree turn during the mission."
          ]
        },
        "materials": ["Full Vehicle", "iPad", "Sphero Edu App", "Village Map", "Cargo Weights (Grain)"],
        "steps": [
          { "id": "tt1", "title": "Mission Briefing", "description": "Study the Village Mission Map. Measure the distance from the West Gates to the Hall.", "icon": "Target" },
          { "id": "tt2", "title": "Chassis Inspection", "description": "Check your Cycle 1 chassis. Tighten any tape and make sure wheels are spinning freely.", "icon": "Settings" },
          { "id": "tt3", "title": "Coupler Check", "description": "Secure your Cycle 2 coupler. Ensure the Sphero is sitting correctly for maximum traction.", "icon": "Link" },
          { "id": "tt4", "title": "Draft the Plan", "description": "Using your iPad and Sphero Edu app, write the full automated sequence for your delivery trip.", "icon": "PenTool" },
          { "id": "tt5", "title": "Program Update", "description": "Open your project in the app. Update your code to include the mandatory 90° turn and stop.", "icon": "Code" },
          { "id": "tt6", "title": "Weight Test", "description": "Load the grain (cargo). Does the vehicle move straight? Adjust speed in code if needed.", "icon": "Weight" },
          { "id": "tt7", "title": "The Great Delivery", "description": "Run the final program on the map! Deliver the cargo to the Great Hall automatically.", "icon": "Rocket" }
        ],
        "resources": [
          { "title": "Logic Guide 1: Start/Stop", "type": "Template", "id": "LOGIC_GUIDE_1" },
          { "title": "Logic Guide 2: Turns", "type": "Template", "id": "LOGIC_GUIDE_2" },
          { "title": "Village Mission Map", "type": "Template", "id": "ROUTE_MAP" },
          { "title": "Mission Scoring Sheet", "type": "Template", "id": "MISSION_SCORING_SHEET" }
        ]
      },
      "thynk": {
        "concepts": [
          { "title": "Systems Integration", "description": "A successful mission depends on three systems working perfectly together: Mechanics (the cart), Power (the Sphero), and Logic (the code). If one fails, the whole system fails.", "icon": "Cpu" },
          { "title": "Iterative Optimization", "description": "Makers don't build once. They build, test, find a flaw, and optimize. This cycle is how real-world engineers solve complex problems like space travel.", "icon": "RefreshCw" },
          { "title": "Failure Analysis", "description": "When a mission fails, we use data to find the root cause. Was it high friction (mechanics), poor traction (power), or a sequence error (logic)?", "icon": "Lightbulb" },
          { "title": "Efficiency & Load", "description": "The 'Grain Load' changes the physics. Heavier mass increases momentum but reduces acceleration. We must optimize our speed blocks to handle this extra weight.", "icon": "Weight" }
        ],
        "explanation": { "title": "The Master Plan", "text": "Great engineering comes from testing, failing, and trying again." },
        "deepDive": {
          "heading": "Holistic Engineering: Solving the Big Picture",
          "whyItMatters": "In the 'Thynk Tank', we stop looking at just the wheels or just the code. We look at the Integrated System. Engineers call this 'Systems Thinking'. It's important because in the real world, everything is connected. Changing the weight of your cargo affects your traction, which means you have to change your code!",
          "realWorldApplication": "NASA's Mars Rovers (like Curiosity) are the ultimate example. Their wheels must work in freezing cold, their motors must pull heavy scientific tools, and their code must be 100% automated because it takes 20 minutes for a radio signal to reach Earth. They use exactly the same iterative cycle you are using today!",
          "logicExploration": "When your vehicle carries 'Grain' (weights), it has more Inertia. This means it takes more force to start, but also more force to stop. If your cart keeps crashing into the Hall, it's not a 'bug' in the code—it's a change in physics! You must optimize your code to 'Brake' earlier."
        },
        "quiz": [
          { "id": 19, "question": "What is Iteration?", "options": ["Quitting", "Trying again to improve", "A type of wheel"], "answer": 1 },
          { "id": 20, "question": "Debugging means...", "options": ["Adding bugs", "Finding and fixing errors", "Using a broom"], "answer": 1 },
          { "id": 21, "question": "Engineering is a...", "options": ["Cycle", "Line", "Dot"], "answer": 0 },
          { "id": 22, "question": "A Prototype is a...", "options": ["Finished product", "Test version", "Drawing"], "answer": 1 },
          { "id": 23, "question": "Success requires...", "options": ["Luck", "Testing and Iteration", "Money"], "answer": 1 },
          { "id": 24, "question": "Who is a Maker?", "options": ["Only teachers", "Everyone who solves problems", "Nobody"], "answer": 1 }
        ]
      },
      "tweak": {
        "intro": "Synthesize and optimize your final vehicle! Choose up to 3 options total.",
        "options": [
          { "id": "tt_t1", "title": "Precision Calibration", "description": "Adjust code for ultra-precise stops.", "icon": "Target" },
          { "id": "tt_t2", "title": "Traction Boosters", "description": "Add grip to wheels for high-load starts.", "icon": "Zap" },
          { "id": "tt_t3", "title": "Bespoke Branding", "description": "Decorate with team colors and name.", "icon": "PenTool" },
          { "id": "tt_t4", "title": "Sensor Integration", "description": "Plan for future sensor upgrades.", "icon": "Cpu" },
          { "id": "tt_t5", "title": "Chassis Streamlining", "description": "Remove excess weight for efficiency.", "icon": "TrendingDown" },
          { "id": "tt_t6", "title": "Load Balancing", "description": "Shift weight for better balance.", "icon": "Weight" }
        ]
      },
      "test": {
        "intro": "Prove your vehicle is mission-ready.",
        "methods": [
          { "title": "Full Mission Run", "description": "Execute the complete village delivery path.", "icon": "Flag" },
          { "title": "Stability Under Load", "description": "Check if turns stay stable with full cargo.", "icon": "Shield" },
          { "title": "Target Accuracy", "description": "Measure distance from center of target area.", "icon": "Target" }
        ]
      },
      "teacherSupport": {
        "outcomes": [
          { "cat": "Integrated Engineering", "outcome": "Evaluate a physical system and improve its reliability through iteration.", "method": "Review of the Final Lab Report reflection section." },
          { "cat": "Project Management", "outcome": "Work through a multi-stage mission plan to achieve a specific target.", "method": "Successful delivery to the Great Hall on the Village Map." }
        ],
        "vocab": [
          { "t": "Iteration", "d": "Improving a design through repeated cycles of testing." },
          { "t": "Prototype", "d": "An early sample or model of a product built to test a concept." },
          { "t": "Synthesis", "d": "Combining different parts (Mechanics + Code) to form a whole system." },
          { "t": "Optimization", "d": "Making a system as effective or functional as possible." }
        ],
        "pedagogy": [
          { "title": "Project-Based Learning", "icon": "Rocket", "subtitle": "Mission Delivery", "strategy": "End-to-end execution.", "focus": "Critical path analysis.", "action": "Prompt: 'Which part of the mission is the most likely to fail? How can you protect against that?'" },
          { "title": "Iterative Thinking", "icon": "RefreshCw", "subtitle": "Failure as Data", "strategy": "Error log tracking.", "focus": "Growth mindset.", "action": "Ask: 'If the robot missed the Hall, was it the code or the wheels? How can we test both?'" }
        ],
        "rubric": [
          { "criteria": "Mission Success", "dev": "Vehicle fails to move or requires manual intervention during the trip.", "prof": "Vehicle completes the course autonomously but misses the exact Hall target.", "adv": "Vehicle completes the full course, stops for exactly 5s at the Hall, and remains stable with cargo." }
        ],
        "misconceptions": [
          { "error": "Once the code works once, it will work every time.", "fix": "Physical variables like battery level and floor dust change. Iteration is key." },
          { "error": "Decoration is more important than stability.", "fix": "A beautiful cart that falls over fails the mission. Function must come first." }
        ],
        "checklist": [
          "Is the mission map correctly measured?",
          "Does the final lab report include a photo of the vehicle?",
          "Are all team members clear on their mission roles?"
        ]
      }
    }
  ]
};
