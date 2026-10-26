/* =====================================================================
   ch01.js  -  CHAPTER 1: Engineering Mathematics and Unit Conversion
   ---------------------------------------------------------------------
   This file is a template for every other chapter. To write a new chapter:
     1. Copy this file and rename it (for example ch05.js).
     2. Change the number in  window.CHAPTERS[1]  to your chapter number.
     3. Replace the text inside the quotes (the text uses backticks `like this`).
     4. Add  <script src="ch05.js" defer></script>  to index.html.
   Do not use the backtick character ` or the two characters $ and { together
   inside your text. HTML such as <sub>x</sub> and <sup>2</sup> is allowed.
   ===================================================================== */
window.CHAPTERS = window.CHAPTERS || {};

window.CHAPTERS[1] = {

  /* 1. TOPIC DEFINITION */
  def: `Engineering mathematics provides the algebra, trigonometry and geometry that turn a design problem into numbers. Unit conversion is the discipline of expressing every quantity in one consistent system of units before calculating. This handbook uses the SI system (metre, kilogram, second, newton, pascal) and the practical strength-of-materials set of <strong>N, mm and MPa</strong>.`,

  /* 2. PURPOSE AND APPLICATIONS */
  purpose: [
    `Resolve forces into components and find link angles, bracket geometry and cable directions.`,
    `Calculate areas, centroids and second moments of area (section properties) used in stress and deflection formulas.`,
    `Convert between metric drawings and imperial drawings, and between catalogue data given in hp, psi, kgf or rpm and SI values.`,
    `Check any calculation by unit analysis: if the units on both sides of an equation do not match, the equation is wrong.`,
    `Industrial use: selecting a motor and gearbox from a catalogue, reading supplier data sheets, updating legacy drawings and checking CAD mass or section properties.`
  ],

  /* 3. TERMINOLOGY */
  terms: [
    [`SI (International System of Units)`, `The worldwide standard system built on seven base units. Mechanical design mainly uses metre (m), kilogram (kg) and second (s).`],
    [`Base unit and derived unit`, `A base unit is defined independently (m, kg, s). A derived unit is built from base units, for example newton N = kg·m/s² and pascal Pa = N/m².`],
    [`SI prefix`, `A multiplier placed before a unit: kilo (k) = 10<sup>3</sup>, mega (M) = 10<sup>6</sup>, giga (G) = 10<sup>9</sup>, milli (m) = 10<sup>-3</sup>, micro (µ) = 10<sup>-6</sup>.`],
    [`Dimensional analysis`, `Checking that both sides of an equation have the same units. It catches most formula and conversion mistakes.`],
    [`Mass and weight`, `Mass (kg) is the amount of matter and does not change. Weight is a force: W = m·g, where g = 9.81 m/s² on Earth. A 1 kg mass weighs about 9.81 N.`],
    [`Radian`, `The SI unit of angle. One full turn = 2π rad = 360°, so 1 rad = 57.296°.`],
    [`Significant figures`, `The digits that carry real meaning. Keep extra digits during the calculation and round only the final answer, usually to 3 or 4 significant figures.`],
    [`Section properties`, `Geometric values of a cross-section: area A, centroid, second moment of area I, polar second moment J and section modulus Z.`]
  ],

  /* 4. SI UNITS AND CONVERSIONS */
  units: {
    intro: `Memorise this table. Almost every conversion in mechanical design comes from it.`,
    head: [`Quantity`, `SI unit`, `Symbol`, `Useful conversions`],
    rows: [
      [`Length`, `metre`, `m`, `1 in = 25.4 mm (exact); 1 ft = 0.3048 m`],
      [`Mass`, `kilogram`, `kg`, `1 lb = 0.45359 kg`],
      [`Force`, `newton`, `N`, `1 kgf = 9.80665 N; 1 lbf = 4.44822 N; 1 kN = 1000 N`],
      [`Moment / torque`, `newton metre`, `N·m`, `1 kgf·m = 9.80665 N·m; 1 lbf·ft = 1.35582 N·m`],
      [`Stress / pressure`, `pascal`, `Pa = N/m²`, `1 MPa = 1 N/mm²; 1 bar = 10<sup>5</sup> Pa; 1 psi = 6894.76 Pa`],
      [`Energy / work`, `joule`, `J = N·m`, `1 kWh = 3.6 MJ`],
      [`Power`, `watt`, `W = J/s`, `1 hp (mechanical) = 745.7 W; 1 PS (metric hp) = 735.5 W`],
      [`Angular speed`, `radian per second`, `rad/s`, `1 rpm = 2π/60 = 0.10472 rad/s`],
      [`Angle`, `radian`, `rad`, `180° = π rad`]
    ],
    notes: [
      `<strong>Practical rule:</strong> if force is in N and length in mm, then stress comes out directly in N/mm² = MPa. Mixing m and mm is the most common source of errors.`,
      `Temperature differences: 1 K = 1 °C. Temperature values are not converted by multiplication alone (K = °C + 273.15).`
    ]
  },

  /* 5-9. FORMULAS (name, formula, symbols with SI units, assumptions) */
  formulas: [
    {
      name: `Unit conversion by conversion factor`,
      eq: `X<sub>new</sub> = X<sub>old</sub> × k`,
      note: `Write the factor as a fraction so the old unit cancels, for example 3500 psi × (6894.76 Pa / 1 psi).`,
      symbols: [
        [`X<sub>old</sub>`, `Value in the original unit`, `original unit`],
        [`k`, `Conversion factor (new units per one old unit)`, `new unit / old unit`],
        [`X<sub>new</sub>`, `Value in the required unit`, `new unit`]
      ],
      assumptions: [
        `Use exact factors where they exist (1 in = 25.4 mm exactly) and keep extra digits until the final answer.`,
        `Valid only for units that differ by a fixed ratio. Temperature scales also have an offset.`
      ]
    },
    {
      name: `Angular speed from rotational speed`,
      eq: `ω = 2πN / 60`,
      symbols: [
        [`ω`, `Angular speed`, `rad/s`],
        [`N`, `Rotational speed (revolutions per minute)`, `rpm`],
        [`2π`, `Radians in one revolution`, `rad/rev`]
      ],
      assumptions: [`Constant speed.`, `For speeds given in rev/s multiply by 2π instead; no division by 60 is needed.`]
    },
    {
      name: `Power, torque and speed relation`,
      eq: `P = T·ω = 2πNT / 60 &nbsp;&nbsp; or &nbsp;&nbsp; T ≈ 9550 · P / N`,
      note: `Shortcut form: T in N·m, P in kW, N in rpm (exact constant is 9549.3).`,
      symbols: [
        [`P`, `Power transmitted (in the shortcut form, in kW)`, `W (kW)`],
        [`T`, `Torque on the shaft`, `N·m`],
        [`ω`, `Angular speed`, `rad/s`],
        [`N`, `Rotational speed`, `rpm`]
      ],
      assumptions: [
        `Steady rotation and transmitted power at the shaft; gear, belt and bearing losses are not included.`,
        `This gives the nominal torque. For design, multiply by a service factor for shocks and starting loads.`
      ]
    },
    {
      name: `Resolution of a force into components`,
      eq: `F<sub>x</sub> = F cos θ &nbsp;&nbsp; F<sub>y</sub> = F sin θ &nbsp;&nbsp; F = √(F<sub>x</sub>² + F<sub>y</sub>²)`,
      symbols: [
        [`F`, `Force magnitude`, `N`],
        [`θ`, `Angle of the force measured from the x-axis`, `degree or rad`],
        [`F<sub>x</sub>, F<sub>y</sub>`, `Horizontal and vertical components`, `N`]
      ],
      assumptions: [`θ must be measured from the x-axis; if measured from the y-axis, sine and cosine swap.`, `Set the calculator to degree mode.`]
    },
    {
      name: `Section properties of a solid circular section`,
      eq: `A = πd²/4 &nbsp;&nbsp; I = πd⁴/64 &nbsp;&nbsp; J = πd⁴/32 &nbsp;&nbsp; Z = πd³/32`,
      note: `Z is the section modulus for bending. For torsion the polar section modulus is Z<sub>p</sub> = πd³/16.`,
      symbols: [
        [`d`, `Diameter`, `mm`],
        [`A`, `Cross-sectional area`, `mm²`],
        [`I`, `Second moment of area about a diameter`, `mm⁴`],
        [`J`, `Polar second moment of area`, `mm⁴`],
        [`Z`, `Section modulus (Z = I / c, c = d/2)`, `mm³`]
      ],
      assumptions: [`Solid circular section.`, `For a hollow shaft use the difference of two circles: replace d⁴ by (d<sub>o</sub>⁴ − d<sub>i</sub>⁴).`]
    },
    {
      name: `Section properties of a rectangular section`,
      eq: `A = b·h &nbsp;&nbsp; I = b·h³/12 &nbsp;&nbsp; Z = b·h²/6`,
      symbols: [
        [`b`, `Width (parallel to the neutral axis)`, `mm`],
        [`h`, `Depth (in the direction of the bending load)`, `mm`],
        [`I`, `Second moment of area about the centroidal axis`, `mm⁴`],
        [`Z`, `Section modulus`, `mm³`]
      ],
      assumptions: [`Axis passes through the centroid and is parallel to the width b.`, `Turning the section on its side swaps b and h and changes I by a large factor.`]
    }
  ],

  /* DIAGRAM (inline SVG - no image file needed) */
  diagram: {
    caption: `Solid circular section: centroid, centroidal axes and the section properties used in later chapters.`,
    svg: `<svg viewBox="0 0 560 270" role="img" aria-label="Circular cross-section with diameter d, centroidal axes x and y, and formulas for area, second moment, polar moment and section modulus">
      <defs><marker id="ah1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#566178"/></marker></defs>
      <circle cx="140" cy="125" r="90" class="dg-fill"/>
      <line x1="25" y1="125" x2="255" y2="125" class="dg-dash"/>
      <line x1="140" y1="10" x2="140" y2="240" class="dg-dash"/>
      <circle cx="140" cy="125" r="5" class="dg-dot"/>
      <text x="258" y="130" class="dg-tx">x</text>
      <text x="146" y="16" class="dg-tx">y</text>
      <line x1="50" y1="252" x2="230" y2="252" class="dg-thin" marker-start="url(#ah1)" marker-end="url(#ah1)"/>
      <text x="132" y="266" class="dg-tx">d</text>
      <text x="152" y="148" class="dg-tx-sm">centroid</text>
      <text x="320" y="60" class="dg-tx-or">A = πd² / 4</text>
      <text x="320" y="100" class="dg-tx-or">I = πd⁴ / 64</text>
      <text x="320" y="140" class="dg-tx-or">J = πd⁴ / 32</text>
      <text x="320" y="180" class="dg-tx-or">Z = πd³ / 32</text>
      <text x="320" y="215" class="dg-tx-sm">d in mm gives A in mm², I and J in mm⁴, Z in mm³</text>
    </svg>`
  },

  /* 10. DERIVATION */
  derivation: {
    title: `torque–power–speed relation`,
    steps: [
      `A constant torque T turns a shaft through an angle θ (in radians). The work done is W = T·θ. Units: N·m = J.`,
      `Power is work per unit time: P = W / t = T·θ / t.`,
      `The ratio θ / t is the angular speed ω. Therefore <strong>P = T·ω</strong>.`,
      `One revolution is 2π rad. A shaft turning at N revolutions per minute turns through 2πN rad every 60 s, so <strong>ω = 2πN / 60</strong>.`,
      `Combine: P = 2πNT / 60, so T = 60P / (2πN).`,
      `If P is given in kW, multiply by 1000 to get watts: T = 60 × 1000 × P / (2πN) = 9549.3 × P / N. This is the familiar shortcut T ≈ 9550 P / N with T in N·m, P in kW and N in rpm.`
    ]
  },

  /* 11-12. SOLVED EXAMPLES (at least two) */
  examples: [
    {
      title: `Converting a pressure from psi to MPa`,
      given: [`A hydraulic line is rated at 3500 psi.`],
      convert: [`1 psi = 6894.76 Pa and 1 MPa = 10<sup>6</sup> Pa.`],
      find: `The rating in MPa (and in bar).`,
      formula: `X<sub>new</sub> = X<sub>old</sub> × k`,
      steps: [
        `Pressure in pascal = 3500 × 6894.76 = 24 131 660 Pa.`,
        `Pressure in MPa = 24 131 660 / 1 000 000 = 24.13 MPa.`,
        `Pressure in bar = 24 131 660 / 100 000 = 241.3 bar.`
      ],
      result: `3500 psi ≈ 24.13 MPa ≈ 241.3 bar`,
      interpretation: `A quick check: 1 MPa is about 145 psi, so 3500 psi should be about 24 MPa. The answer agrees. Always do this kind of rough check.`
    },
    {
      title: `Torque delivered by an electric motor`,
      given: [`Motor power P = 7.5 kW.`, `Speed N = 1440 rpm.`],
      convert: [`P = 7.5 kW = 7500 W.`, `ω = 2π × 1440 / 60 = 150.80 rad/s.`],
      find: `The shaft torque T in N·m (and in kgf·m).`,
      formula: `T = P / ω`,
      steps: [
        `ω = 2π × 1440 / 60 = 150.796 rad/s.`,
        `T = 7500 / 150.796 = 49.74 N·m.`,
        `Check with the shortcut: T = 9550 × 7.5 / 1440 = 49.74 N·m. ✔`,
        `In kgf·m: 49.74 / 9.80665 = 5.07 kgf·m.`
      ],
      result: `T ≈ 49.7 N·m (≈ 5.07 kgf·m)`,
      interpretation: `This is the nominal torque at the motor shaft. A gearbox with a 5:1 reduction would raise it to about 5 × 49.74 = 249 N·m before losses. A service factor must be applied for shock loads.`
    },
    {
      title: `Section properties of a 40 mm solid shaft`,
      given: [`Solid round shaft, diameter d = 40 mm.`],
      convert: [`All lengths are already in mm, so A is in mm², I and J in mm⁴, Z in mm³.`],
      find: `A, I, J and Z.`,
      formula: `A = πd²/4, I = πd⁴/64, J = πd⁴/32, Z = πd³/32`,
      steps: [
        `A = π × 40² / 4 = π × 400 = 1256.6 mm².`,
        `I = π × 40⁴ / 64 = π × 2 560 000 / 64 = π × 40 000 = 125 664 mm⁴.`,
        `J = 2I = 251 327 mm⁴.`,
        `Z = π × 40³ / 32 = π × 64 000 / 32 = 6283.2 mm³.`
      ],
      result: `A = 1257 mm², I = 1.257 × 10<sup>5</sup> mm⁴, J = 2.513 × 10<sup>5</sup> mm⁴, Z = 6283 mm³`,
      interpretation: `Because I and J grow with d⁴, a small increase in diameter gives a large gain in stiffness: raising d from 40 mm to 44 mm (+10%) increases I by about 46%.`
    },
    {
      title: `Stress in a plate given in imperial units`,
      given: [`Steel strap 0.5 in wide × 0.25 in thick.`, `Tensile load 1200 lbf.`],
      convert: [`Width = 0.5 × 25.4 = 12.7 mm; thickness = 0.25 × 25.4 = 6.35 mm.`, `Force = 1200 × 4.44822 = 5337.9 N.`],
      find: `The tensile stress in MPa.`,
      formula: `σ = F / A`,
      steps: [
        `A = 12.7 × 6.35 = 80.65 mm².`,
        `σ = 5337.9 / 80.65 = 66.19 MPa.`,
        `Cross-check in psi: 1200 / (0.5 × 0.25) = 9600 psi, and 9600 × 6894.76 = 66.19 MPa. ✔`
      ],
      result: `σ ≈ 66.2 MPa`,
      interpretation: `Converting force and area to N and mm² gives the stress directly in MPa. Compare the result with the allowable stress of the strap material (see Chapter 3).`
    }
  ],

  /* 13. PRACTICAL INDUSTRIAL APPLICATION */
  application: [
    `<strong>Motor and gearbox selection:</strong> catalogues give power in kW or hp and speed in rpm. Converting to torque is the first step to checking shaft, key and coupling sizes.`,
    `<strong>Legacy drawings:</strong> imported inch drawings must be converted to mm before tolerance, fit and stress checks. A single wrong factor can scrap a batch of parts.`,
    `<strong>CAD verification:</strong> a quick hand calculation of area, volume and mass confirms that a SolidWorks model and its mass-properties report are using the correct units.`
  ],

  /* 14. COMMON MISTAKES */
  mistakes: [
    `Mixing m and mm in one formula. Convert everything first, or use N, mm, MPa throughout.`,
    `Using rpm directly as rad/s. Multiply by 2π/60 first.`,
    `Confusing kg with N. Mass in kg must be multiplied by 9.81 to get weight in N. A "kgf" rating is a force, not a mass.`,
    `Rounding early. Keep 5 or 6 digits through the steps and round only the answer.`,
    `Confusing bar and MPa: 1 MPa = 10 bar. Confusing mechanical hp (745.7 W) with metric PS (735.5 W).`
  ],

  /* 15. INTERVIEW QUESTIONS */
  interview: [
    [`What is the difference between mass and weight?`, `Mass is the quantity of matter, measured in kg, and is the same everywhere. Weight is the gravitational force on that mass, W = m·g, measured in newtons. On Earth 1 kg weighs about 9.81 N.`],
    [`How many N/mm² are there in 1 MPa?`, `Exactly one. 1 MPa = 10<sup>6</sup> N/m² = 1 N/mm². This is why N and mm give stress directly in MPa.`],
    [`How do you convert rpm to rad/s?`, `Multiply by 2π/60. For example 1440 rpm = 150.8 rad/s.`],
    [`What is the quick formula for torque from power and speed?`, `T (N·m) = 9550 × P (kW) / N (rpm). It comes from T = P/ω with ω = 2πN/60.`],
    [`Why is unit consistency important in design calculations?`, `A mismatch such as using m for one length and mm for another gives an answer wrong by a factor of 1000 or more, and the error is not obvious in the number. Checking units on both sides of the equation catches it.`]
  ],

  /* 16. PRACTICE PROBLEMS WITH ANSWERS */
  practice: [
    [`1. Convert a 2.5 in bolt length to mm.`, `2.5 × 25.4 = <strong>63.5 mm</strong>.`],
    [`2. A 15 hp (mechanical) motor is fitted. What is its power in kW?`, `15 × 745.7 = 11 185.5 W = <strong>11.19 kW</strong>.`],
    [`3. Find the torque of a 5.5 kW motor running at 960 rpm.`, `ω = 2π × 960 / 60 = 100.53 rad/s. T = 5500 / 100.53 = <strong>54.7 N·m</strong>. (Shortcut: 9550 × 5.5 / 960 = 54.7 N·m.)`],
    [`4. Convert a torque of 250 N·m to lbf·ft.`, `1 N·m = 0.737562 lbf·ft, so 250 × 0.737562 = <strong>184.4 lbf·ft</strong>.`],
    [`5. A round bar has d = 30 mm. Find A and I.`, `A = π × 30² / 4 = <strong>706.9 mm²</strong>. I = π × 30⁴ / 64 = π × 810 000 / 64 = <strong>39 761 mm⁴</strong>.`]
  ]
};
