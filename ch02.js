/* =====================================================================
   ch02.js  -  CHAPTER 2: Engineering Mechanics and Statics
   (Same structure as ch01.js - see the comments there.)
   ===================================================================== */
window.CHAPTERS = window.CHAPTERS || {};

window.CHAPTERS[2] = {

  def: `Statics is the branch of engineering mechanics that studies bodies at rest (or moving at constant velocity) under the action of forces. A body is in <strong>static equilibrium</strong> when the sum of all forces and the sum of all moments acting on it are zero. Statics gives the support reactions and internal loads that every later strength calculation starts from.`,

  purpose: [
    `Find support reactions of beams, brackets, frames and shafts before calculating stress or deflection.`,
    `Find the force carried by a pin, bolt, cable or link in a mechanism.`,
    `Locate the centroid of a cross-section, which fixes the neutral axis used in bending calculations.`,
    `Check friction-based designs such as clamps, brakes, friction clutches, jacks and conveyors.`,
    `Industrial use: sizing pins and clevises, checking crane and hoist brackets, verifying fixture clamping force and checking the stability of machine frames.`
  ],

  terms: [
    [`Force`, `A push or pull. It is a vector with magnitude, direction and point of application. Unit: newton (N).`],
    [`Moment (torque)`, `The turning effect of a force about a point: force × perpendicular distance. Unit: N·m.`],
    [`Couple`, `Two equal, opposite, parallel forces that do not share a line of action. A couple produces pure rotation and no net force.`],
    [`Free-body diagram (FBD)`, `A sketch of one body isolated from its surroundings, showing every external force and reaction on it. Always draw it first.`],
    [`Equilibrium`, `The state in which ΣF = 0 and ΣM = 0, so the body does not accelerate.`],
    [`Reaction`, `The force or moment a support exerts on a body. A roller gives 1 reaction (perpendicular to the surface), a pin gives 2 (horizontal and vertical), a fixed support gives 3 (two forces and a moment) in 2D.`],
    [`Resultant`, `A single force that has the same effect as a system of forces.`],
    [`Centroid`, `The geometric centre of an area. The neutral axis of a symmetric bending section passes through it.`],
    [`Static and kinetic friction`, `Static friction resists the start of sliding up to a limit μ<sub>s</sub>N. Once sliding, kinetic friction μ<sub>k</sub>N acts, usually slightly lower.`],
    [`Coefficient of friction (μ)`, `Dimensionless ratio of the limiting friction force to the normal force between two surfaces.`]
  ],

  units: {
    intro: `Statics works with a small set of SI quantities.`,
    head: [`Quantity`, `SI unit`, `Symbol`, `Notes`],
    rows: [
      [`Force`, `newton`, `N`, `1 kN = 1000 N`],
      [`Moment`, `newton metre`, `N·m`, `1 N·m = 1000 N·mm`],
      [`Distributed load`, `newton per metre`, `N/m`, `1 kN/m = 1000 N/m. A uniform load w over length L has total load w × L.`],
      [`Mass to weight`, `kilogram to newton`, `kg to N`, `W = m × 9.81 (g = 9.81 m/s²)`],
      [`Area`, `square metre (use mm²)`, `mm²`, `1 m² = 10<sup>6</sup> mm²`],
      [`Coefficient of friction`, `none`, `μ`, `Dimensionless`],
      [`Angle`, `degree or radian`, `° or rad`, `180° = π rad`]
    ],
    notes: [`Take g = 9.81 m/s² (9.80665 for exact work).`, `Keep a consistent sign convention: for example counter-clockwise moments positive.`]
  },

  formulas: [
    {
      name: `Equations of static equilibrium (2D)`,
      eq: `ΣF<sub>x</sub> = 0 &nbsp;&nbsp; ΣF<sub>y</sub> = 0 &nbsp;&nbsp; ΣM<sub>O</sub> = 0`,
      note: `Three independent equations in 2D, so up to three unknown reactions can be found.`,
      symbols: [
        [`ΣF<sub>x</sub>, ΣF<sub>y</sub>`, `Sum of force components in x and y`, `N`],
        [`ΣM<sub>O</sub>`, `Sum of moments about any chosen point O`, `N·m`]
      ],
      assumptions: [`Rigid body, no acceleration.`, `If more than three unknowns exist the problem is statically indeterminate and deformation must also be considered.`]
    },
    {
      name: `Moment of a force`,
      eq: `M = F × d`,
      note: `d is the perpendicular distance from the point to the line of action of the force.`,
      symbols: [
        [`M`, `Moment about the point`, `N·m`],
        [`F`, `Force`, `N`],
        [`d`, `Perpendicular distance (lever arm)`, `m`]
      ],
      assumptions: [`d must be perpendicular to the force. For an inclined force use its perpendicular component instead.`]
    },
    {
      name: `Resultant of concurrent forces`,
      eq: `R<sub>x</sub> = ΣF<sub>x</sub> &nbsp;&nbsp; R<sub>y</sub> = ΣF<sub>y</sub> &nbsp;&nbsp; R = √(R<sub>x</sub>² + R<sub>y</sub>²) &nbsp;&nbsp; θ = tan<sup>-1</sup>(R<sub>y</sub> / R<sub>x</sub>)`,
      symbols: [
        [`R`, `Resultant force`, `N`],
        [`R<sub>x</sub>, R<sub>y</sub>`, `Sums of components along x and y`, `N`],
        [`θ`, `Direction of R from the x-axis`, `degree`]
      ],
      assumptions: [`Forces meet at one point.`, `Check the quadrant: use signs of R<sub>x</sub> and R<sub>y</sub> to place the angle correctly.`]
    },
    {
      name: `Reactions of a simply supported beam with one point load`,
      eq: `R<sub>A</sub> = P·b / L &nbsp;&nbsp; R<sub>B</sub> = P·a / L`,
      symbols: [
        [`P`, `Point load (acting downward)`, `N`],
        [`a`, `Distance from support A to the load`, `m`],
        [`b`, `Distance from the load to support B (b = L − a)`, `m`],
        [`L`, `Span between supports`, `m`],
        [`R<sub>A</sub>, R<sub>B</sub>`, `Vertical reactions at A and B`, `N`]
      ],
      assumptions: [`Vertical load only, beam weight neglected.`, `Check: R<sub>A</sub> + R<sub>B</sub> must equal P.`]
    },
    {
      name: `Dry friction and angle of friction`,
      eq: `F<sub>max</sub> = μ·N &nbsp;&nbsp; φ = tan<sup>-1</sup> μ`,
      note: `A block on an incline of angle α just begins to slide when α = φ.`,
      symbols: [
        [`F<sub>max</sub>`, `Maximum (limiting) friction force`, `N`],
        [`μ`, `Coefficient of friction`, `dimensionless`],
        [`N`, `Normal force between the surfaces`, `N`],
        [`φ`, `Angle of friction (angle of repose)`, `degree`]
      ],
      assumptions: [`F = μN applies only at the point of impending sliding. Below that limit friction equals the applied force, not μN.`, `μ depends on materials, surface finish, lubrication and temperature; use tested values.`]
    },
    {
      name: `Centroid of a composite area`,
      eq: `x̄ = Σ(A<sub>i</sub>·x<sub>i</sub>) / ΣA<sub>i</sub> &nbsp;&nbsp; ȳ = Σ(A<sub>i</sub>·y<sub>i</sub>) / ΣA<sub>i</sub>`,
      symbols: [
        [`A<sub>i</sub>`, `Area of each simple part`, `mm²`],
        [`x<sub>i</sub>, y<sub>i</sub>`, `Centroid coordinates of each part from a chosen origin`, `mm`],
        [`x̄, ȳ`, `Centroid of the whole shape from the same origin`, `mm`]
      ],
      assumptions: [`Measure all x<sub>i</sub>, y<sub>i</sub> from the same origin.`, `A hole is treated as a negative area.`]
    }
  ],

  diagram: {
    caption: `Simply supported beam of span L with a point load P at distance a from support A. The reactions R<sub>A</sub> and R<sub>B</sub> are found from moment equilibrium.`,
    svg: `<svg viewBox="0 0 600 250" role="img" aria-label="Simply supported beam with point load P at distance a from the left support and reactions RA and RB">
      <defs>
        <marker id="ah2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ff7a1a"/></marker>
        <marker id="ah2g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#566178"/></marker>
      </defs>
      <rect x="60" y="104" width="480" height="14" class="dg-fill"/>
      <path d="M60 118 L40 150 L80 150 Z" class="dg-fill"/>
      <path d="M540 118 L520 150 L560 150 Z" class="dg-fill"/>
      <circle cx="540" cy="156" r="6" class="dg-fill"/>
      <line x1="25" y1="162" x2="95" y2="162" class="dg-ln"/>
      <line x1="510" y1="164" x2="570" y2="164" class="dg-ln"/>
      <line x1="240" y1="30" x2="240" y2="100" class="dg-or" marker-end="url(#ah2)"/>
      <text x="252" y="48" class="dg-tx-or">P</text>
      <line x1="60" y1="215" x2="60" y2="170" class="dg-or" marker-end="url(#ah2)"/>
      <text x="70" y="200" class="dg-tx-or">R<tspan font-size="11" dy="4">A</tspan></text>
      <line x1="540" y1="215" x2="540" y2="172" class="dg-or" marker-end="url(#ah2)"/>
      <text x="550" y="200" class="dg-tx-or">R<tspan font-size="11" dy="4">B</tspan></text>
      <line x1="60" y1="22" x2="240" y2="22" class="dg-thin" marker-start="url(#ah2g)" marker-end="url(#ah2g)"/>
      <text x="144" y="16" class="dg-tx">a</text>
      <line x1="240" y1="22" x2="540" y2="22" class="dg-thin" marker-start="url(#ah2g)" marker-end="url(#ah2g)"/>
      <text x="386" y="16" class="dg-tx">b</text>
      <line x1="60" y1="236" x2="540" y2="236" class="dg-thin" marker-start="url(#ah2g)" marker-end="url(#ah2g)"/>
      <text x="294" y="248" class="dg-tx">L</text>
      <text x="22" y="130" class="dg-tx-sm">pin</text>
      <text x="560" y="130" class="dg-tx-sm">roller</text>
    </svg>`
  },

  derivation: {
    title: `reactions of a simply supported beam`,
    steps: [
      `Draw the free-body diagram: load P at distance a from A, reactions R<sub>A</sub> (at A) and R<sub>B</sub> (at B), both upward.`,
      `Take moments about A so that R<sub>A</sub> drops out: ΣM<sub>A</sub> = 0 gives R<sub>B</sub>·L − P·a = 0.`,
      `Solve: <strong>R<sub>B</sub> = P·a / L</strong>.`,
      `Vertical equilibrium: ΣF<sub>y</sub> = 0 gives R<sub>A</sub> + R<sub>B</sub> − P = 0, so R<sub>A</sub> = P − P·a/L = P(L − a)/L.`,
      `Since L − a = b: <strong>R<sub>A</sub> = P·b / L</strong>.`,
      `The reaction is larger at the support nearer to the load. Check: R<sub>A</sub> + R<sub>B</sub> = P(b + a)/L = P. ✔`
    ]
  },

  examples: [
    {
      title: `Reactions of a simply supported beam`,
      given: [`Span L = 4 m.`, `Point load P = 10 kN, 1.5 m from support A.`],
      convert: [`a = 1.5 m, so b = L − a = 2.5 m. Keep P in kN; the reactions then come out in kN.`],
      find: `Reactions R<sub>A</sub> and R<sub>B</sub>.`,
      formula: `R<sub>A</sub> = P·b / L, &nbsp; R<sub>B</sub> = P·a / L`,
      steps: [
        `R<sub>A</sub> = 10 × 2.5 / 4 = 6.25 kN.`,
        `R<sub>B</sub> = 10 × 1.5 / 4 = 3.75 kN.`,
        `Check forces: 6.25 + 3.75 = 10 kN = P. ✔`,
        `Check moments about B: R<sub>A</sub> × 4 − P × 2.5 = 25 − 25 = 0. ✔`
      ],
      result: `R<sub>A</sub> = 6.25 kN, R<sub>B</sub> = 3.75 kN`,
      interpretation: `Support A is closer to the load and carries 62.5% of it. The bearing, bracket or wall at A must be designed for the larger reaction.`
    },
    {
      title: `Force needed to start sliding a block`,
      given: [`Block mass m = 50 kg on a horizontal steel table.`, `Static coefficient of friction μ = 0.3.`],
      convert: [`Weight = normal force N = m·g = 50 × 9.81 = 490.5 N.`],
      find: `The horizontal force P that just starts the block moving.`,
      formula: `F<sub>max</sub> = μ·N`,
      steps: [
        `N = 50 × 9.81 = 490.5 N (horizontal push, so N equals the weight).`,
        `P = F<sub>max</sub> = 0.3 × 490.5 = 147.15 N.`
      ],
      result: `P ≈ 147 N`,
      interpretation: `Any push smaller than 147 N leaves the block at rest. Once it slides, the force needed is usually a little lower because kinetic friction is lower than static friction. Designs should use the safer (higher) value when friction is helpful and the lower value when it is harmful.`
    },
    {
      title: `Centroid of an L-shaped section`,
      given: [`Equal-leg angle 100 mm × 100 mm with thickness 20 mm.`],
      convert: [`Origin at the outer corner. Split into a vertical leg (20 × 100 mm) and a horizontal leg (80 × 20 mm).`],
      find: `Centroid position x̄ and ȳ from the outer corner.`,
      formula: `x̄ = ΣA<sub>i</sub>x<sub>i</sub> / ΣA<sub>i</sub>, &nbsp; ȳ = ΣA<sub>i</sub>y<sub>i</sub> / ΣA<sub>i</sub>`,
      steps: [
        `Part 1 (vertical leg): A<sub>1</sub> = 20 × 100 = 2000 mm²; x<sub>1</sub> = 10 mm; y<sub>1</sub> = 50 mm.`,
        `Part 2 (horizontal leg): A<sub>2</sub> = 80 × 20 = 1600 mm²; x<sub>2</sub> = 20 + 40 = 60 mm; y<sub>2</sub> = 10 mm.`,
        `ΣA = 2000 + 1600 = 3600 mm².`,
        `x̄ = (2000 × 10 + 1600 × 60) / 3600 = 116 000 / 3600 = 32.22 mm.`,
        `ȳ = (2000 × 50 + 1600 × 10) / 3600 = 116 000 / 3600 = 32.22 mm.`
      ],
      result: `x̄ = ȳ = 32.2 mm from the outer faces`,
      interpretation: `The two values are equal because the angle has equal legs. In bending about the horizontal axis, the neutral axis lies 32.2 mm from the bottom face, so the top fibre is farther from it than the bottom fibre.`
    },
    {
      title: `Resultant of two cable forces`,
      given: [`Cable 1 pulls 300 N along the x-axis.`, `Cable 2 pulls 400 N along the y-axis.`],
      convert: [`Both forces already in N and the angle between them is 90°.`],
      find: `Magnitude and direction of the resultant force on the eye-bolt.`,
      formula: `R = √(R<sub>x</sub>² + R<sub>y</sub>²), &nbsp; θ = tan<sup>-1</sup>(R<sub>y</sub>/R<sub>x</sub>)`,
      steps: [
        `R<sub>x</sub> = 300 N, R<sub>y</sub> = 400 N.`,
        `R = √(300² + 400²) = √250 000 = 500 N.`,
        `θ = tan<sup>-1</sup>(400 / 300) = 53.13° measured from the 300 N cable.`
      ],
      result: `R = 500 N at 53.1° from the x-axis`,
      interpretation: `The eye-bolt must be rated for at least 500 N, not 300 N or 400 N, and the load direction should be considered for the thread and the supporting plate.`
    }
  ],

  application: [
    `<strong>Bracket and hook design:</strong> reactions from statics become the pin, bolt and weld loads that are checked in later chapters.`,
    `<strong>Fixture clamping:</strong> friction force μN decides whether a clamped part resists the cutting force; check with the lowest realistic μ.`,
    `<strong>Section properties in CAD:</strong> hand-calculated centroids are a fast check on the values reported by SolidWorks.`
  ],

  mistakes: [
    `Skipping the free-body diagram. Most statics errors come from a missing force or reaction.`,
    `Using the wrong lever arm. The distance must be perpendicular to the line of action of the force.`,
    `Treating F = μN as always true. It is only the limit; friction can be anything from zero up to μN.`,
    `Inconsistent sign convention for moments, or mixing kN and N in one equation.`,
    `Measuring centroid distances from different origins for different parts.`
  ],

  interview: [
    [`State the conditions of static equilibrium in 2D.`, `ΣF<sub>x</sub> = 0, ΣF<sub>y</sub> = 0 and ΣM = 0 about any point. A body satisfying all three is not accelerating or rotating.`],
    [`What is a free-body diagram and why is it needed?`, `It is a sketch of the isolated body with all external forces and reactions. It shows exactly which forces to include in the equilibrium equations and prevents missing loads.`],
    [`What reactions does a pin support, a roller support and a fixed support provide in 2D?`, `Pin: two force components. Roller: one force perpendicular to the supporting surface. Fixed: two force components and a moment.`],
    [`Difference between a moment and a couple?`, `A moment is the turning effect of a single force about a point. A couple is a pair of equal, opposite, parallel forces; it has a moment but no resultant force, and that moment is the same about every point.`],
    [`What is the angle of repose?`, `The steepest slope at which a block stays at rest on an inclined surface. It equals the angle of friction φ = tan<sup>-1</sup> μ.`]
  ],

  practice: [
    [`1. A 500 N force acts perpendicular to a spanner 0.35 m from the bolt centre. Find the moment about the bolt.`, `M = F × d = 500 × 0.35 = <strong>175 N·m</strong>.`],
    [`2. A simply supported beam has L = 6 m and a point load of 18 kN at 2 m from A. Find the reactions.`, `b = 4 m. R<sub>A</sub> = 18 × 4 / 6 = <strong>12 kN</strong>. R<sub>B</sub> = 18 × 2 / 6 = <strong>6 kN</strong>. Check: 12 + 6 = 18 kN.`],
    [`3. Find the angle of repose for a surface pair with μ = 0.5.`, `φ = tan<sup>-1</sup>(0.5) = <strong>26.57°</strong>.`],
    [`4. Two perpendicular forces of 200 N and 150 N act at a point. Find the resultant.`, `R = √(200² + 150²) = <strong>250 N</strong>. Angle from the 200 N force = tan<sup>-1</sup>(150/200) = <strong>36.87°</strong>.`],
    [`5. A 120 kg crate rests on a floor with μ = 0.4. Find the horizontal force needed to start it sliding.`, `N = 120 × 9.81 = 1177.2 N. F = 0.4 × 1177.2 = <strong>470.9 N</strong>.`]
  ]
};
