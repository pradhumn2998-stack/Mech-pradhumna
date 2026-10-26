/* =====================================================================
   ch05.js  -  CHAPTER 5: Bending Moment and Shear Force
   (Same structure as ch01.js - see the comments there.)
   ===================================================================== */
window.CHAPTERS = window.CHAPTERS || {};

window.CHAPTERS[5] = {

  def: `When a beam carries loads, every cross-section inside it must transmit two internal actions to keep the beam in equilibrium. The <strong>shear force (V)</strong> is the internal force that tries to slide one side of the section past the other. The <strong>bending moment (M)</strong> is the internal turning effect that tries to bend the beam. Shear force and bending moment diagrams (SFD and BMD) show how V and M change along the length, and they identify the critical section where a beam is most likely to fail.`,

  purpose: [
    `Find the maximum bending moment, which sets the bending stress and therefore the size of the beam (Chapter 7 uses it for deflection).`,
    `Find the maximum shear force, which is needed to check pins, welds, webs and bolts at supports.`,
    `Locate the critical section, the point where M is largest, so the design check is done at the right place.`,
    `Find points where the moment changes sign (points of contraflexure), which affect where reinforcement or stiffeners are needed.`,
    `Industrial use: sizing machine-frame beams, crane and hoist girders, lifting beams, shafts between bearings, brackets and overhanging arms in fixtures.`
  ],

  terms: [
    [`Beam`, `A slender member that carries loads perpendicular to its axis and resists them mainly by bending.`],
    [`Shear force (V)`, `The algebraic sum of the vertical forces on one side of a section. Unit: N or kN.`],
    [`Bending moment (M)`, `The algebraic sum of the moments of the forces on one side of a section, taken about that section. Unit: N·m or kN·m.`],
    [`Sagging and hogging`, `Sagging (positive) moment bends the beam like a smile, so the bottom fibres are in tension. Hogging (negative) moment bends it like a frown, so the top fibres are in tension.`],
    [`Sign convention used here`, `Shear is positive when the left part of the beam tends to move up relative to the right part. Moment is positive when sagging. Always state your convention.`],
    [`Concentrated (point) load`, `A load applied at one point, in N or kN.`],
    [`Uniformly distributed load (UDL)`, `A load spread evenly along the length, in N/m or kN/m. Its total is w × length, acting at the middle of the loaded length.`],
    [`Simply supported, cantilever and overhanging beams`, `A simply supported beam rests on a pin and a roller. A cantilever is fixed at one end and free at the other. An overhanging beam extends beyond one or both supports.`],
    [`Point of contraflexure`, `The point where the bending moment changes sign (passes through zero).`],
    [`Critical section`, `The cross-section with the largest stress: usually where M is a maximum, which occurs where V = 0 or changes sign.`]
  ],

  units: {
    intro: `The most common error in beam work is the unit of the moment. Study this table.`,
    head: [`Quantity`, `SI unit`, `Symbol`, `Useful conversions`],
    rows: [
      [`Point load`, `newton`, `N`, `1 kN = 1000 N`],
      [`Distributed load`, `newton per metre`, `N/m`, `1 kN/m = 1000 N/m = 1 N/mm`],
      [`Shear force`, `newton`, `N`, `1 kN = 1000 N`],
      [`Bending moment`, `newton metre`, `N·m`, `1 kN·m = 1000 N·m = 10<sup>6</sup> N·mm`],
      [`Section modulus`, `cubic millimetre (practical)`, `mm³`, `1 cm³ = 1000 mm³`],
      [`Bending stress`, `megapascal`, `MPa`, `N·mm divided by mm³ gives N/mm² = MPa`]
    ],
    notes: [
      `<strong>Rule for stress calculations:</strong> convert the bending moment to N·mm before dividing by the section modulus in mm³. For example 18 kN·m = 18 × 10<sup>6</sup> N·mm.`,
      `A distributed load of 1 kN/m is the same number as 1 N/mm, which is convenient when working in N and mm.`
    ]
  },

  formulas: [
    {
      name: `Shear force and bending moment at a section`,
      eq: `V = ΣF<sub>y</sub> (one side) &nbsp;&nbsp; M = ΣM (one side, about the section)`,
      note: `Work from the left side: upward forces to the left of the section add to V, and each upward force F at a distance d to the left adds F·d to M (sagging positive).`,
      symbols: [
        [`V`, `Shear force at the section`, `N`],
        [`M`, `Bending moment at the section`, `N·m`],
        [`ΣF<sub>y</sub>`, `Algebraic sum of vertical forces on one side of the section`, `N`]
      ],
      assumptions: [`Beam is in equilibrium, so reactions must be found first (Chapter 2).`, `Use the same side for both V and M, and check with the other side.`]
    },
    {
      name: `Relation between load, shear force and bending moment`,
      eq: `dV/dx = −w &nbsp;&nbsp; dM/dx = V`,
      note: `Downward load w (N/m) reduces V. The slope of the BMD at any point equals the shear force there, so M is a maximum where V = 0.`,
      symbols: [
        [`w`, `Distributed load intensity (downward positive)`, `N/m`],
        [`V`, `Shear force`, `N`],
        [`M`, `Bending moment`, `N·m`],
        [`x`, `Distance along the beam from the left end`, `m`]
      ],
      assumptions: [`Beam loaded in a vertical plane with a continuous distribution of load.`, `A point load makes V jump suddenly; an applied couple makes M jump.`]
    },
    {
      name: `Simply supported beam: central point load`,
      eq: `R<sub>A</sub> = R<sub>B</sub> = P/2 &nbsp;&nbsp; V<sub>max</sub> = P/2 &nbsp;&nbsp; M<sub>max</sub> = P·L / 4`,
      note: `M<sub>max</sub> occurs under the load, at midspan.`,
      symbols: [
        [`P`, `Point load at midspan`, `N`],
        [`L`, `Span between supports`, `m`],
        [`R<sub>A</sub>, R<sub>B</sub>`, `Support reactions`, `N`],
        [`M<sub>max</sub>`, `Maximum bending moment`, `N·m`]
      ],
      assumptions: [`Weight of the beam is neglected or already included in the load.`, `For a load not at the centre use M<sub>max</sub> = P·a·b / L under the load.`]
    },
    {
      name: `Simply supported beam: uniformly distributed load`,
      eq: `R<sub>A</sub> = R<sub>B</sub> = wL/2 &nbsp;&nbsp; V(x) = w(L/2 − x) &nbsp;&nbsp; M(x) = w·x(L − x)/2 &nbsp;&nbsp; M<sub>max</sub> = wL² / 8`,
      note: `M<sub>max</sub> is at midspan (x = L/2), where V = 0.`,
      symbols: [
        [`w`, `Load per unit length`, `N/m`],
        [`L`, `Span`, `m`],
        [`x`, `Distance from support A`, `m`],
        [`V(x), M(x)`, `Shear force and moment at distance x`, `N, N·m`]
      ],
      assumptions: [`Load covers the whole span uniformly.`, `The beam's own weight, if included, is a UDL equal to mass per metre × 9.81.`]
    },
    {
      name: `Cantilever beam: end load and UDL`,
      eq: `End load P: V = P, M<sub>max</sub> = P·L &nbsp;&nbsp; UDL w: V<sub>max</sub> = wL, M<sub>max</sub> = wL² / 2`,
      note: `For both cases the maximum values occur at the fixed support. The moment there is hogging.`,
      symbols: [
        [`P`, `Point load at the free end`, `N`],
        [`w`, `UDL over the full length`, `N/m`],
        [`L`, `Length of the cantilever`, `m`],
        [`V<sub>max</sub>, M<sub>max</sub>`, `Maximum shear force and moment (at the wall)`, `N, N·m`]
      ],
      assumptions: [`Support is perfectly rigid (a real support may rotate or deflect).`, `Loads add: for combined loads, add the shear forces and moments of each load (superposition).`]
    },
    {
      name: `Flexure formula (bending stress)`,
      eq: `σ<sub>b</sub> = M·y / I = M / Z`,
      note: `Maximum stress is at the outer fibre: y = c, so σ<sub>max</sub> = M·c / I = M / Z, where Z = I / c.`,
      symbols: [
        [`σ<sub>b</sub>`, `Bending stress`, `MPa`],
        [`M`, `Bending moment at the section`, `N·mm`],
        [`y`, `Distance from the neutral axis to the point considered`, `mm`],
        [`I`, `Second moment of area about the neutral axis`, `mm⁴`],
        [`Z`, `Section modulus`, `mm³`]
      ],
      assumptions: [`Straight beam, elastic material, plane sections stay plane, load in a plane of symmetry.`, `Not valid very near supports, point loads or sharp changes of section where stress concentrations occur.`, `Use the full details in Chapter 7 and the stress limits in Chapter 19.`]
    },
    {
      name: `Shear stress in a beam`,
      eq: `τ = V·Q / (I·b) &nbsp;&nbsp; Rectangular section: τ<sub>max</sub> = 3V / (2A)`,
      note: `The maximum shear stress is at the neutral axis and is 1.5 times the average shear stress V/A for a rectangle.`,
      symbols: [
        [`τ`, `Shear stress at the level considered`, `MPa`],
        [`V`, `Shear force at the section`, `N`],
        [`Q`, `First moment of area of the part above the level considered`, `mm³`],
        [`I`, `Second moment of area of the whole section`, `mm⁴`],
        [`b`, `Width of the section at the level considered`, `mm`],
        [`A`, `Cross-sectional area`, `mm²`]
      ],
      assumptions: [`Elastic beam, shear force acts through the shear centre.`, `For a solid round section τ<sub>max</sub> = 4V / (3A). For an I-beam most of the shear is carried by the web.`]
    }
  ],

  reference: {
    title: `Standard beam cases (reactions, maximum shear and maximum moment)`,
    intro: `Use these results for quick checks. L is the span or length, and the beam weight is neglected.`,
    head: [`Beam and loading`, `Reactions`, `V<sub>max</sub>`, `M<sub>max</sub> and where`],
    rows: [
      [`Simply supported, point load P at the centre`, `P/2 at each support`, `P/2`, `PL/4 at midspan`],
      [`Simply supported, point load P at distance a from A (b = L − a)`, `R<sub>A</sub> = Pb/L, R<sub>B</sub> = Pa/L`, `larger reaction`, `Pab/L under the load`],
      [`Simply supported, UDL w over the full span`, `wL/2 at each support`, `wL/2`, `wL²/8 at midspan`],
      [`Cantilever, end load P`, `P and moment PL at the wall`, `P`, `PL at the wall`],
      [`Cantilever, UDL w over the full length`, `wL and moment wL²/2 at the wall`, `wL`, `wL²/2 at the wall`]
    ],
    note: `Combined loads can be handled by superposition: add the shear forces and bending moments from each load at the same section.`
  },

  diagram: {
    caption: `Simply supported beam with a uniformly distributed load w, with its shear force diagram (SFD) and bending moment diagram (BMD). The moment is largest at midspan, where the shear force passes through zero.`,
    svg: `<svg viewBox="0 0 600 370" role="img" aria-label="Simply supported beam with uniformly distributed load, shear force diagram falling linearly from plus wL over 2 to minus wL over 2, and a parabolic bending moment diagram with maximum wL squared over 8 at midspan">
      <defs>
        <marker id="ah5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ff7a1a"/></marker>
        <marker id="ah5g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#566178"/></marker>
      </defs>
      <g class="dg-or" stroke-width="2.4">
        <line x1="80" y1="26" x2="80" y2="64" marker-end="url(#ah5)"/>
        <line x1="130" y1="26" x2="130" y2="64" marker-end="url(#ah5)"/>
        <line x1="180" y1="26" x2="180" y2="64" marker-end="url(#ah5)"/>
        <line x1="230" y1="26" x2="230" y2="64" marker-end="url(#ah5)"/>
        <line x1="280" y1="26" x2="280" y2="64" marker-end="url(#ah5)"/>
        <line x1="330" y1="26" x2="330" y2="64" marker-end="url(#ah5)"/>
        <line x1="380" y1="26" x2="380" y2="64" marker-end="url(#ah5)"/>
        <line x1="430" y1="26" x2="430" y2="64" marker-end="url(#ah5)"/>
        <line x1="480" y1="26" x2="480" y2="64" marker-end="url(#ah5)"/>
        <line x1="520" y1="26" x2="520" y2="64" marker-end="url(#ah5)"/>
      </g>
      <line x1="62" y1="24" x2="538" y2="24" class="dg-or" stroke-width="2"/>
      <text x="546" y="30" class="dg-tx-or">w</text>
      <rect x="60" y="66" width="480" height="12" class="dg-fill"/>
      <path d="M60 78 L46 100 L74 100 Z" class="dg-fill"/>
      <path d="M540 78 L526 100 L554 100 Z" class="dg-fill"/>
      <circle cx="540" cy="105" r="5" class="dg-fill"/>
      <text x="40" y="118" class="dg-tx-sm">A</text>
      <text x="548" y="118" class="dg-tx-sm">B</text>
      <line x1="60" y1="124" x2="540" y2="124" class="dg-thin" marker-start="url(#ah5g)" marker-end="url(#ah5g)"/>
      <text x="294" y="140" class="dg-tx">L</text>
      <line x1="300" y1="82" x2="300" y2="340" class="dg-dash"/>
      <line x1="60" y1="190" x2="540" y2="190" class="dg-thin"/>
      <path d="M60 190 L60 148 L540 232 L540 190" class="dg-fill" style="fill:#fff3e8;stroke:#ff7a1a;stroke-width:2.4"/>
      <text x="548" y="194" class="dg-tx-sm">SFD</text>
      <text x="64" y="142" class="dg-tx-or">+wL/2</text>
      <text x="470" y="252" class="dg-tx-or">−wL/2</text>
      <text x="306" y="182" class="dg-tx-sm">V = 0</text>
      <line x1="60" y1="335" x2="540" y2="335" class="dg-thin"/>
      <path d="M60 335 Q300 195 540 335 Z" class="dg-fill" style="fill:#e6edfa;stroke:#0a1a33;stroke-width:2.4"/>
      <text x="548" y="339" class="dg-tx-sm">BMD</text>
      <text x="312" y="262" class="dg-tx-or">M<tspan font-size="11" dy="4">max</tspan><tspan dy="-4"> = wL² / 8</tspan></text>
      <text x="312" y="356" class="dg-tx-sm">sagging (+): tension at the bottom fibre</text>
    </svg>`
  },

  derivation: {
    title: `dV/dx = −w, dM/dx = V and M<sub>max</sub> = wL²/8`,
    steps: [
      `Cut a very small element of length dx from a beam carrying a downward distributed load w. On its left face act shear V and moment M; on its right face act V + dV and M + dM.`,
      `Vertical equilibrium of the element: V − w·dx − (V + dV) = 0, so <strong>dV/dx = −w</strong>. The shear force falls when a downward load is applied.`,
      `Moments about the right-hand face: M + V·dx − w·dx·(dx/2) − (M + dM) = 0. The term with dx² is far smaller than the others and is neglected, so <strong>dM/dx = V</strong>.`,
      `Therefore the bending moment is largest where its slope is zero, that is, where V = 0 (or changes sign).`,
      `Apply to a simply supported beam with a UDL: R<sub>A</sub> = wL/2, so V(x) = wL/2 − w·x. Setting V = 0 gives x = L/2.`,
      `Moment at x = L/2: M = (wL/2)(L/2) − w(L/2)(L/4) = wL²/4 − wL²/8 = <strong>wL²/8</strong>.`
    ]
  },

  examples: [
    {
      title: `Simply supported beam with a central point load`,
      given: [`Span L = 6 m.`, `Point load P = 12 kN at midspan.`],
      convert: [`Keep P in kN and L in m; M comes out in kN·m (1 kN·m = 10<sup>6</sup> N·mm for stress later).`],
      find: `The reactions, V<sub>max</sub> and M<sub>max</sub>.`,
      formula: `R = P/2, &nbsp; M<sub>max</sub> = P·L / 4`,
      steps: [
        `R<sub>A</sub> = R<sub>B</sub> = P/2 = 12 / 2 = 6 kN.`,
        `V = +6 kN from A up to the load, and −6 kN from the load to B.`,
        `M<sub>max</sub> = P·L/4 = 12 × 6 / 4 = 18 kN·m at midspan.`,
        `Check using the left side: M = R<sub>A</sub> × 3 m = 6 × 3 = 18 kN·m. ✔`
      ],
      result: `R<sub>A</sub> = R<sub>B</sub> = 6 kN, V<sub>max</sub> = 6 kN, M<sub>max</sub> = 18 kN·m`,
      interpretation: `The beam must be designed for 18 kN·m at midspan. The shear force changes sign at the load, which is the signal that the moment is a maximum there. This moment is used again in Example 4 for the stress.`
    },
    {
      title: `Simply supported beam with a uniformly distributed load`,
      given: [`Span L = 4 m.`, `UDL w = 5 kN/m over the whole span.`],
      convert: [`Total load = w × L = 5 × 4 = 20 kN. Units stay in kN and m.`],
      find: `The reactions, M<sub>max</sub>, and V and M at 1 m from support A.`,
      formula: `R = wL/2, &nbsp; M<sub>max</sub> = wL²/8, &nbsp; V(x) = w(L/2 − x), &nbsp; M(x) = w·x(L − x)/2`,
      steps: [
        `R<sub>A</sub> = R<sub>B</sub> = wL/2 = 5 × 4 / 2 = 10 kN.`,
        `M<sub>max</sub> = wL²/8 = 5 × 4² / 8 = 5 × 16 / 8 = 10 kN·m at x = 2 m.`,
        `At x = 1 m: V = 5 × (2 − 1) = 5 kN.`,
        `At x = 1 m: M = 5 × 1 × (4 − 1) / 2 = 7.5 kN·m.`,
        `Check M at x = 1 m by the left side: R<sub>A</sub>·x − w·x²/2 = 10 × 1 − 5 × 1 / 2 = 7.5 kN·m. ✔`
      ],
      result: `R<sub>A</sub> = R<sub>B</sub> = 10 kN, M<sub>max</sub> = 10 kN·m; at x = 1 m: V = 5 kN, M = 7.5 kN·m`,
      interpretation: `The shear force falls in a straight line from +10 kN to −10 kN, and the moment follows a parabola with its peak at midspan. A UDL gives only half the maximum moment of the same total load (20 kN) placed at the centre (20 × 4 / 4 = 20 kN·m), which shows why spreading a load helps.`
    },
    {
      title: `Cantilever with a UDL and an end load`,
      given: [`Cantilever length L = 1.5 m, fixed at the left end.`, `UDL w = 4 kN/m over the full length.`, `Point load P = 6 kN at the free end.`],
      convert: [`Use kN and m. Superposition: add the effects of the two loads.`],
      find: `The shear force and bending moment at the fixed end.`,
      formula: `V = P + wL, &nbsp; M = P·L + wL²/2`,
      steps: [
        `Total UDL = w × L = 4 × 1.5 = 6 kN.`,
        `V<sub>max</sub> = P + wL = 6 + 6 = 12 kN.`,
        `Moment from the end load: P·L = 6 × 1.5 = 9 kN·m.`,
        `Moment from the UDL: wL²/2 = 4 × 1.5² / 2 = 4 × 2.25 / 2 = 4.5 kN·m.`,
        `M<sub>max</sub> = 9 + 4.5 = 13.5 kN·m (hogging, at the wall).`
      ],
      result: `V<sub>max</sub> = 12 kN, M<sub>max</sub> = 13.5 kN·m at the fixed end`,
      interpretation: `The wall support, bolts or welds must resist a 12 kN shear and a 13.5 kN·m moment. Doubling the length would more than double the moment for the same loads, because M grows with L and with L².`
    },
    {
      title: `Bending stress and shear stress in a rectangular beam`,
      given: [`The beam of Example 1 (M<sub>max</sub> = 18 kN·m, V<sub>max</sub> = 6 kN).`, `Rectangular section: width b = 60 mm, depth h = 150 mm (load acts along the depth).`, `Material yield strength 250 MPa.`],
      convert: [`M = 18 kN·m = 18 × 10<sup>6</sup> N·mm. V = 6 kN = 6000 N.`],
      find: `The maximum bending stress, the maximum shear stress and the factor of safety on bending.`,
      formula: `σ = M / Z, &nbsp; Z = b·h²/6, &nbsp; τ<sub>max</sub> = 3V / (2A)`,
      steps: [
        `Z = b·h² / 6 = 60 × 150² / 6 = 60 × 22 500 / 6 = 225 000 mm³.`,
        `σ<sub>max</sub> = M / Z = 18 × 10<sup>6</sup> / 225 000 = 80 MPa.`,
        `A = 60 × 150 = 9000 mm². τ<sub>max</sub> = 3 × 6000 / (2 × 9000) = 18 000 / 18 000 = 1.0 MPa.`,
        `FOS on bending = 250 / 80 = 3.125.`
      ],
      result: `σ<sub>max</sub> = 80 MPa, τ<sub>max</sub> = 1.0 MPa, FOS ≈ 3.1`,
      interpretation: `The shear stress is very small compared with the bending stress, which is typical for beams that are long compared with their depth. Bending therefore governs the size of the beam. If the 150 mm depth is turned on its side (h = 60, b = 150), Z falls to 90 000 mm³ and the stress rises to 200 MPa, so orientation matters.`
    }
  ],

  application: [
    `<strong>Machine frames and lifting beams:</strong> M<sub>max</sub> is found first, then the section is chosen so that M/Z stays below the allowable stress.`,
    `<strong>Shafts between bearings:</strong> a shaft with gears or pulleys is treated as a beam. Its bending moment diagram, combined with torque (Chapter 6), sizes the shaft.`,
    `<strong>Fixture arms and brackets:</strong> a cantilever carries its maximum moment at the wall. This is where the weld, bolts or section change must be checked.`
  ],

  mistakes: [
    `Using kN·m directly in σ = M/Z. Convert to N·mm (× 10<sup>6</sup>) when Z is in mm³.`,
    `Skipping the reactions, or calculating them incorrectly, so the diagrams do not close to zero at the free end or at the supports.`,
    `Changing sign convention in the middle of a problem. Draw V and M diagrams with a fixed convention and check that M = 0 at a pin or roller.`,
    `Placing M<sub>max</sub> at the wrong place. Find where V = 0 or changes sign instead of guessing midspan.`,
    `Using b and h the wrong way round in Z = b·h²/6. The depth h is measured along the load direction.`
  ],

  interview: [
    [`What is shear force and what is bending moment?`, `Shear force is the algebraic sum of vertical forces on one side of a section, and it tends to slide the section. Bending moment is the algebraic sum of the moments of the forces on one side about the section, and it tends to bend the beam.`],
    [`Where does the maximum bending moment occur?`, `Where the shear force is zero or changes sign, because dM/dx = V. In a simply supported beam with a central load it is at the load; with a UDL it is at midspan; in a cantilever it is at the fixed end.`],
    [`What is the point of contraflexure?`, `The point where the bending moment changes sign, passing through zero. The curvature of the beam changes there from sagging to hogging or the reverse.`],
    [`How does the shear force diagram change under a point load and under a UDL?`, `Under a point load the shear force makes a sudden jump equal to the load. Under a UDL it changes linearly with a slope equal to −w. The moment diagram is then a straight line (between point loads) or a parabola (under a UDL).`],
    [`Why is the beam section more important than the material for bending strength?`, `Bending stress σ = M/Z depends on the section modulus Z, which grows with the square of the depth (for a rectangle Z = b h²/6). Deepening a beam is far more effective than using a stronger material of the same shape; this is why I-beams place material far from the neutral axis.`]
  ],

  practice: [
    [`1. A simply supported beam of span 8 m carries a UDL of 3 kN/m. Find the reactions and the maximum bending moment.`, `Total load = 3 × 8 = 24 kN. Reactions = <strong>12 kN</strong> each. M<sub>max</sub> = wL²/8 = 3 × 64 / 8 = <strong>24 kN·m</strong>.`],
    [`2. A cantilever 2 m long carries a 5 kN load at the free end. Find V and M<sub>max</sub>.`, `V = <strong>5 kN</strong> everywhere. M<sub>max</sub> = P·L = 5 × 2 = <strong>10 kN·m</strong> at the fixed end.`],
    [`3. A simply supported beam has L = 5 m and a 20 kN load at 2 m from A. Find the reactions and the moment under the load.`, `b = 3 m. R<sub>A</sub> = 20 × 3 / 5 = <strong>12 kN</strong>. R<sub>B</sub> = 20 × 2 / 5 = <strong>8 kN</strong>. M = P·a·b / L = 20 × 2 × 3 / 5 = <strong>24 kN·m</strong> (check: 12 × 2 = 24).`],
    [`4. A solid round beam of d = 80 mm carries a bending moment of 5 kN·m. Find the maximum bending stress.`, `Z = πd³/32 = π × 80³ / 32 = π × 512 000 / 32 = 50 265 mm³. M = 5 × 10<sup>6</sup> N·mm. σ = 5 × 10<sup>6</sup> / 50 265 = <strong>99.5 MPa</strong>.`],
    [`5. A beam must resist M = 18 kN·m with an allowable bending stress of 120 MPa. Find the minimum section modulus in cm³.`, `Z = M / σ<sub>allow</sub> = 18 × 10<sup>6</sup> / 120 = 150 000 mm³ = <strong>150 cm³</strong>. Select a standard section with Z at least this large.`]
  ]
};
