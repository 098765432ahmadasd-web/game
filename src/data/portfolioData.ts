export interface CarModel {
  id: string;
  name: string;
  badge: string;
  category: string;
  engine: string;
  horsepower: number;
  torque: string;
  topSpeed: number;
  zeroToSixty: number;
  drivetrain: string;
  curbWeight: string;
  soundType: 'v12' | 'inline6' | 'v6tt' | 'v8flat' | 'v8tt';
  image: string;
  accentColor: string;
  quote: string;
  description: string;
  tuningDefaults: {
    camber: number;
    downforce: number;
    gearRatio: number;
    tireCompound: 'Soft Slick' | 'Medium Compound' | 'Rain Tread';
  };
}

export const PORTFOLIO_DESCRIPTION_TEXT = `ASD Racing Hub was forged at the volatile intersection of authentic motorsport obsession and next-generation competitive play. Designed for purists who can feel the micro-slip of rear tires on entry and investors seeking an enduring, community-driven racing ecosystem, the title strips away arcade artificiality to deliver pure mechanical drama.

Every chassis operates on a true-to-life physics foundation where suspension geometry, downforce aero loads, and tire compound temperatures dictate each braking point. Players don't just drive; they engineer their destiny. Step into deep mechanical workshops to calibrate differential lockups, gear ratios, and bespoke aero kits, transforming showroom icons into bespoke track weapons.

The grid reflects motorsport royalty, engineered with intimate automotive reverence. Feel the surge of the tuned Toyota Supra as twin turbochargers spool through third gear. Unleash the surgical, all-wheel grip of the Nissan GT-R to claw through rain-drenched hairpins. Experience the spine-tingling crescendo of a Lamborghini V12 revving toward redline, or carve apexes with the razor-sharp chassis balance of a BMW M-Division coupe. Master the thunderous rear-drive torque of an AMG Mercedes-Benz on sweeping high-speed straights, and tap into the featherweight carbon-tub precision of McLaren active aerodynamics around technical downhill bends.

From neon-drenched Tokyo expressways and alpine hairpins to sun-bleached desert endurance circuits, ASD Racing Hub challenges drivers across dynamic weather systems and day-night transitions that alter track grip in real time. Beyond solo perfection lies our competitive pulse: zero-latency multiplayer, seasonal syndicates, weekly time-attack championships, and a driver-governed paddock marketplace.

ASD Racing Hub isn't just another grid—it's an exclusive sanctuary for drivers who treat pavement as a canvas and telemetry as an art form. Secure your seat in the paddock, dial in your telemetry, and etch your legacy into the world’s most demanding asphalt.`;

export const CAR_MODELS: CarModel[] = [
  {
    id: 'supra',
    name: 'Toyota Supra RZ Heritage Spec',
    badge: 'Supra',
    category: 'Twin-Turbo JDM Icon',
    engine: '3.0L Twin-Turbo 2JZ/B58 Tuned Inline-6',
    horsepower: 640,
    torque: '585 lb-ft',
    topSpeed: 204,
    zeroToSixty: 3.1,
    drivetrain: 'Rear-Wheel Drive (Mechanical LSD)',
    curbWeight: '3,310 lbs',
    soundType: 'inline6',
    image: '/src/assets/images/car_supra_garage_1793266884780.jpg',
    accentColor: '#3B82F6',
    quote: 'Feel the boost swell through third gear as the rear tires hunt for asphalt grip.',
    description: 'A cult legend reborn with staggered wheel fitment, adjustable wastegate mapping, and classic Japanese rear-drive poise. Built for drivers who master progressive countersteering.',
    tuningDefaults: {
      camber: -2.4,
      downforce: 65,
      gearRatio: 3.45,
      tireCompound: 'Soft Slick',
    },
  },
  {
    id: 'gtr',
    name: 'Nissan GT-R Nismo Track Spec',
    badge: 'GT-R',
    category: 'AWD All-Weather Weapon',
    engine: '3.8L Twin-Turbo VR38DETT V6',
    horsepower: 710,
    torque: '630 lb-ft',
    topSpeed: 215,
    zeroToSixty: 2.6,
    drivetrain: 'ATTESA E-TS All-Wheel Drive',
    curbWeight: '3,780 lbs',
    soundType: 'v6tt',
    image: '/src/assets/images/hero_racing_grid_1793266886223.jpg',
    accentColor: '#EF4444',
    quote: 'Surgical all-wheel traction claws out of drenched apexes with unyielding composure.',
    description: 'Godzilla in its ultimate form. Independent transaxle AWD with real-time yaw sensors ensures catastrophic corner-exit acceleration even in torrential downpours.',
    tuningDefaults: {
      camber: -3.0,
      downforce: 82,
      gearRatio: 3.70,
      tireCompound: 'Medium Compound',
    },
  },
  {
    id: 'lamborghini',
    name: 'Lamborghini Revuelto V12 HPEV',
    badge: 'Lamborghini',
    category: 'Atmospheric Hypercar',
    engine: '6.5L Naturally Aspirated V12 + Tri-Motor',
    horsepower: 1001,
    torque: '793 lb-ft',
    topSpeed: 221,
    zeroToSixty: 2.4,
    drivetrain: 'Electric Torque Vectoring e-AWD',
    curbWeight: '3,905 lbs',
    soundType: 'v12',
    image: '/src/assets/images/car_lamborghini_track_1793266885722.jpg',
    accentColor: '#F59E0B',
    quote: 'An unhinged 9,500 RPM symphonic wail matched with instantaneous electric pull.',
    description: 'Sant’Agata Bolognese’s purest emotional statement. Carbon monofuselage construction houses a high-revving naturally aspirated V12 that screams through alpine switchbacks.',
    tuningDefaults: {
      camber: -2.8,
      downforce: 90,
      gearRatio: 3.25,
      tireCompound: 'Soft Slick',
    },
  },
  {
    id: 'bmw',
    name: 'BMW M4 GT3 Competition',
    badge: 'BMW',
    category: 'Precision Apex Hunter',
    engine: '3.0L BMW M TwinPower S58 Twin-Turbo I6',
    horsepower: 590,
    torque: '516 lb-ft',
    topSpeed: 198,
    zeroToSixty: 3.3,
    drivetrain: 'Rear-Wheel Drive (50:50 Balance)',
    curbWeight: '3,080 lbs',
    soundType: 'inline6',
    image: '/src/assets/images/hero_racing_grid_1793266886223.jpg',
    accentColor: '#06B6D4',
    quote: 'Razor-sharp front axle bite and telepathic steering feedback through quick transitions.',
    description: 'Engineered around ideal weight distribution. The M4 GT3 chassis communicates every pebble through the virtual rack, rewarding drivers who value mid-corner composure.',
    tuningDefaults: {
      camber: -3.4,
      downforce: 78,
      gearRatio: 3.62,
      tireCompound: 'Soft Slick',
    },
  },
  {
    id: 'mercedes',
    name: 'Mercedes-AMG GT Black Series',
    badge: 'Mercedes-Benz',
    category: 'V8 Circuit Sledgehammer',
    engine: '4.0L Biturbo Flat-Plane Crank M178 V8',
    horsepower: 720,
    torque: '590 lb-ft',
    topSpeed: 202,
    zeroToSixty: 2.9,
    drivetrain: 'Rear-Wheel Drive with 9-Stage Traction',
    curbWeight: '3,450 lbs',
    soundType: 'v8flat',
    image: '/src/assets/images/car_supra_garage_1793266884780.jpg',
    accentColor: '#10B981',
    quote: 'Thunderous flat-plane crank fury with colossal aerodynamic downforce.',
    description: 'Affalterbach’s pinnacle track weapon. Dual-plane carbon rear wing and nine-position rotary traction control deliver brutal stopping power and high-speed stability.',
    tuningDefaults: {
      camber: -3.1,
      downforce: 95,
      gearRatio: 3.50,
      tireCompound: 'Medium Compound',
    },
  },
  {
    id: 'mclaren',
    name: 'McLaren 720S Aero GT',
    badge: 'McLaren',
    category: 'Carbon Monocell Hypercar',
    engine: '4.0L Twin-Turbo M840T V8',
    horsepower: 755,
    torque: '568 lb-ft',
    topSpeed: 212,
    zeroToSixty: 2.7,
    drivetrain: 'Mid-Engine Rear-Wheel Drive',
    curbWeight: '3,130 lbs',
    soundType: 'v8tt',
    image: '/src/assets/images/car_mclaren_aero_1793266885467.jpg',
    accentColor: '#F97316',
    quote: 'Aerospace-grade active airbrake and featherweight carbon agility on demanding asphalt.',
    description: 'Woking aerodynamics at their sharpest. Monocell carbon fiber tub paired with proactive hydraulic suspension delivers unmatched braking stability from 200 mph.',
    tuningDefaults: {
      camber: -2.9,
      downforce: 88,
      gearRatio: 3.33,
      tireCompound: 'Soft Slick',
    },
  },
];

export const CORE_PILLARS = [
  {
    id: 'physics',
    title: 'True-to-Life Chassis Kinematics',
    subtitle: 'Mechanical Integrity',
    description: 'Calculates dynamic tire patch slip angles, aerodynamic downforce balance, and anti-dive brake geometry in 360Hz real-time sub-cycles.',
    metric: '360 Hz',
    metricLabel: 'Physics Sub-cycle Frequency',
  },
  {
    id: 'customization',
    title: 'Deep Mechanical Calibration',
    subtitle: 'Paddock Tuning',
    description: 'Tune differential preload, ramp angles, camber angles, turbo boost mapping, and damper valving to fit individual driving nuances.',
    metric: '48+',
    metricLabel: 'Tunable Chassis Parameters',
  },
  {
    id: 'environments',
    title: 'Living Dynamic Circuits',
    subtitle: 'Weather & Surface Transitions',
    description: 'From rain-slicked Tokyo C1 expressways to technical alpine hairpins, track temperatures and rubber accumulation shift grip dynamically.',
    metric: '3 Dynamic',
    metricLabel: 'Circuit Biomes & Micro-Climates',
  },
  {
    id: 'multiplayer',
    title: 'Deterministic Sub-Frame Netcode',
    subtitle: 'Esports Racing Paddock',
    description: 'Zero-rubberbanding collision modeling, syndicated driver clubs, global time-attack telemetry ghost battles, and driver-governed livery auctions.',
    metric: '< 18ms',
    metricLabel: 'Target Server Roundtrip Latency',
  },
];

export const INVESTOR_METRICS = [
  {
    label: 'Addressable Racing TAM',
    value: '$22.4B',
    detail: 'Global racing & automotive simulation market growing at 8.7% CAGR.',
  },
  {
    label: 'Target Day-30 Retention',
    value: '38%',
    detail: 'Driven by weekly time-attack seasons and syndicated paddock clubs.',
  },
  {
    label: 'UGC Ecosystem',
    value: '100% Paddock-Owned',
    detail: 'Player-crafted liveries, setup files, and tournament organizers.',
  },
  {
    label: 'Multiplatform Netcode',
    value: 'Cross-Grid Ready',
    detail: 'Unified physics server authoritative rollback across PC, Console, and Cloud.',
  },
];
