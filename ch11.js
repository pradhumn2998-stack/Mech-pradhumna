/* =====================================================================
   ch11.js  -  CHAPTER 11: Bearings and Bearing Life
   (Same structure as ch01.js - see the comments there.)
   ===================================================================== */
window.CHAPTERS = window.CHAPTERS || {};

window.CHAPTERS[11] = {

  def: `A bearing supports a rotating (or moving) part, carries the load between it and the housing, and lets it move with little friction. <strong>Rolling-contact bearings</strong> (ball and roller bearings) use balls or rollers between an inner and an outer ring. They fail by fatigue of the rolling surfaces, so their size is chosen from a calculated <strong>life</strong>: the number of revolutions or hours that a bearing reaches before the first signs of fatigue appear.`,

  purpose: [
    `Select a bearing size and type that carries the radial and axial loads of a shaft for the required life.`,
    `Calculate the equivalent load on a bearing from combined radial and axial loads.`,
    `Predict the basic rating life L<sub>10</sub> in million revolutions and in hours, and adjust it for reliability and varying loads.`,
    `Choose between ball, roller, tapered roller and thrust bearings according to load direction, speed and misalignment.`,
    `Industrial use: motors, gearboxes, pumps, fans, machine-tool spindles, wheels, conveyor rollers and vehicle axles.`
  ],

  terms: [
    [`Radial load (F<sub>r</sub>) and axial (thrust) load (F<sub>a</sub>)`, `The radial load acts perpendicular to the shaft axis, and the axial load acts along it.`],
    [`Basic dynamic load rating (C)`, `A catalogue value: the constant load that a bearing can carry for a basic rating life of one million revolutions. It is given in newtons or kilonewtons.`],
    [`Basic static load rating (C<sub>0</sub>)`, `A catalogue value related to permanent deformation of the contact surfaces when the bearing is stationary or turns very slowly.`],
    [`Equivalent dynamic load (P)`, `A single constant radial load that has the same effect on the bearing life as the real combination of radial and axial loads.`],
    [`Basic rating life (L<sub>10</sub>)`, `The life that 90% of a large group of identical bearings reach or exceed before fatigue appears. It is quoted in million revolutions (or hours).`],
    [`Life exponent (p)`, `p = 3 for ball bearings and p = 10/3 for roller bearings.`],
    [`Reliability`, `The percentage of bearings that reach the life. L<sub>10</sub> corresponds to 90% reliability.`],
    [`Deep groove ball bearing`, `The most common type. It carries radial load and a moderate axial load in both directions at high speed.`],
    [`Angular contact and tapered roller bearings`, `Bearings that carry combined loads. They are mounted in pairs to take axial load in both directions, and they can be preloaded.`],
    [`Cylindrical and spherical roller bearings`, `Roller bearings with a high radial capacity. Spherical roller bearings also tolerate misalignment.`],
    [`Thrust bearing`, `A bearing designed to carry mainly axial load.`]
  ],

  units: {
    intro: `Load ratings are in N or kN, and life is counted in revolutions. Be careful with the million-revolution unit.`,
    head: [`Quantity`, `Unit`, `Symbol`, `Useful conversions`],
    rows: [
      [`Radial and axial load`, `newton or kilonewton`, `F<sub>r</sub>, F<sub>a</sub>`, `1 kN = 1000 N`],
      [`Dynamic and static ratings`, `kilonewton`, `C, C<sub>0</sub>`, `Taken from the bearing catalogue`],
      [`Equivalent load`, `kilonewton`, `P`, `Same unit as C`],
      [`Life`, `million revolutions`, `L<sub>10</sub>`, `1 Mrev = 10<sup>6</sup> revolutions`],
      [`Life in hours`, `hour`, `L<sub>10h</sub>`, `Revolutions = 60 × n × hours`],
      [`Speed`, `revolutions per minute`, `n`, `n in rpm`]
    ],
    notes: [`C and P must be in the same unit (both in kN or both in N). The ratio C/P has no unit.`, `Do not mix the exponent p = 3 (ball) with p = 10/3 (roller).`]
  },

  formulas: [
    {
      name: `Basic rating life`,
      eq: `L<sub>10</sub> = ( C / P )<sup>p</sup> &nbsp;&nbsp; L<sub>10h</sub> = [ 10<sup>6</sup> / (60·n) ] · ( C / P )<sup>p</sup>`,
      note: `L<sub>10</sub> is in million revolutions and L<sub>10h</sub> is in hours. p = 3 for ball bearings and p = 10/3 for roller bearings.`,
      symbols: [
        [`L<sub>10</sub>`, `Basic rating life`, `million revolutions`],
        [`L<sub>10h</sub>`, `Basic rating life in hours`, `h`],
        [`C`, `Basic dynamic load rating (from the catalogue)`, `kN`],
        [`P`, `Equivalent dynamic load`, `kN`],
        [`p`, `Life exponent (3 for balls, 10/3 for rollers)`, `dimensionless`],
        [`n`, `Rotational speed`, `rpm`]
      ],
      assumptions: [`Constant load and speed, correct mounting and lubrication, and clean conditions.`, `90% reliability. For a higher reliability or special materials and lubrication, adjust the life (see below).`, `Valid for loads that are not so high that the bearing deforms permanently.`]
    },
    {
      name: `Equivalent dynamic load for combined radial and axial load`,
      eq: `P = F<sub>r</sub> if F<sub>a</sub>/F<sub>r</sub> ≤ e &nbsp;&nbsp; P = X·F<sub>r</sub> + Y·F<sub>a</sub> if F<sub>a</sub>/F<sub>r</sub> > e`,
      note: `e, X and Y are given in the bearing catalogue for the bearing type and the ratio F<sub>a</sub>/C<sub>0</sub>. For a simple radial bearing under pure radial load P = F<sub>r</sub>.`,
      symbols: [
        [`P`, `Equivalent dynamic load`, `kN`],
        [`F<sub>r</sub>`, `Radial load`, `kN`],
        [`F<sub>a</sub>`, `Axial load`, `kN`],
        [`e`, `Limiting ratio of axial to radial load (from the catalogue)`, `dimensionless`],
        [`X, Y`, `Radial and axial load factors (from the catalogue)`, `dimensionless`]
      ],
      assumptions: [`The values of e, X and Y are catalogue data and differ for each bearing type. The examples use assumed values.`, `For tapered roller and angular contact bearings, the axial load of the opposite bearing and the induced thrust must be included.`]
    },
    {
      name: `Required dynamic load rating`,
      eq: `L<sub>10</sub> = 60·n·L<sub>10h</sub> / 10<sup>6</sup> &nbsp;&nbsp; C<sub>req</sub> = P · L<sub>10</sub><sup>1/p</sup>`,
      note: `Select a bearing whose catalogue C is equal to or greater than C<sub>req</sub>, and check the bore and the dimensions.`,
      symbols: [
        [`L<sub>10h</sub>`, `Required life in hours`, `h`],
        [`L<sub>10</sub>`, `Required life in million revolutions`, `million revolutions`],
        [`n`, `Speed`, `rpm`],
        [`C<sub>req</sub>`, `Minimum required dynamic load rating`, `kN`],
        [`P`, `Equivalent load`, `kN`]
      ],
      assumptions: [`Typical design lives depend on the machine: for example, about 10 000 to 25 000 hours for general industrial machines, but follow your standard or catalogue.`]
    },
    {
      name: `Equivalent load for varying loads`,
      eq: `P<sub>m</sub> = ( q<sub>1</sub>·P<sub>1</sub><sup>p</sup> + q<sub>2</sub>·P<sub>2</sub><sup>p</sup> + … )<sup>1/p</sup>`,
      note: `q<sub>i</sub> is the fraction of the total revolutions run at load P<sub>i</sub> (the fractions add up to 1). Use P<sub>m</sub> in place of P in the life formula.`,
      symbols: [
        [`P<sub>m</sub>`, `Equivalent constant load for the whole duty cycle`, `kN`],
        [`P<sub>i</sub>`, `Load in phase i`, `kN`],
        [`q<sub>i</sub>`, `Fraction of the revolutions in phase i`, `dimensionless`],
        [`p`, `Life exponent`, `dimensionless`]
      ],
      assumptions: [`The damage adds up linearly (Palmgren–Miner rule).`, `The fractions must be fractions of revolutions, not of time. If the speed changes between phases, convert the time fractions to revolution fractions first.`]
    },
    {
      name: `Life for a different reliability`,
      eq: `L<sub>n</sub> = a<sub>1</sub> · L<sub>10</sub>`,
      note: `a<sub>1</sub> is the life adjustment factor for reliability (see the table).`,
      symbols: [
        [`L<sub>n</sub>`, `Life at the chosen reliability`, `million revolutions`],
        [`a<sub>1</sub>`, `Reliability factor (1 for 90%)`, `dimensionless`],
        [`L<sub>10</sub>`, `Basic rating life`, `million revolutions`]
      ],
      assumptions: [`Values of a<sub>1</sub> are given in the table of this chapter (from ISO 281). Newer methods also use factors for lubrication, contamination and fatigue limit.`]
    },
    {
      name: `Static load safety factor`,
      eq: `s<sub>0</sub> = C<sub>0</sub> / P<sub>0</sub>`,
      note: `P<sub>0</sub> is the equivalent static load. The required s<sub>0</sub> depends on the duty: shocks and the need for smooth, quiet running need larger values. Take s<sub>0</sub> from the catalogue guidance.`,
      symbols: [
        [`s<sub>0</sub>`, `Static safety factor`, `dimensionless`],
        [`C<sub>0</sub>`, `Basic static load rating`, `kN`],
        [`P<sub>0</sub>`, `Equivalent static load`, `kN`]
      ],
      assumptions: [`Applies to stationary bearings, to very slow rotation and to bearings with heavy shock loads.`]
    }
  ],

  reference: {
    title: `Reliability factor a<sub>1</sub> (ISO 281)`,
    intro: `Multiply the basic rating life L<sub>10</sub> by a<sub>1</sub> to get the life at a higher reliability.`,
    head: [`Reliability`, `90%`, `95%`, `96%`, `97%`, `98%`, `99%`],
    rows: [
      [`Factor a<sub>1</sub>`, `1.00`, `0.64`, `0.55`, `0.47`, `0.37`, `0.25`]
    ],
    note: `Choosing a bearing type: deep groove ball (radial plus some axial, high speed); angular contact ball (combined load, precision, in pairs); cylindrical roller (high radial load, no axial); tapered roller (combined heavy loads, in pairs); spherical roller (heavy loads and misalignment); thrust ball (axial load only).`
  },

  diagram: {
    caption: `Cross-section of a deep groove ball bearing under a radial load P. The balls carry the load between the inner and outer rings. The life depends on the ratio of the dynamic rating C to the equivalent load P, raised to the power p.`,
    svg: `<svg viewBox="0 0 600 275" role="img" aria-label="Deep groove ball bearing with inner ring, outer ring and balls, a radial load P and the life formula L10 equals C over P to the power p">
      <defs>
        <marker id="ah11" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ff7a1a"/></marker>
      </defs>
      <circle cx="150" cy="140" r="90" class="dg-fill"/>
      <circle cx="150" cy="140" r="72" fill="#ffffff" stroke="#0a1a33" stroke-width="2.2"/>
      <circle cx="150" cy="140" r="52" class="dg-fill"/>
      <circle cx="150" cy="140" r="34" fill="#ffffff" stroke="#0a1a33" stroke-width="2.2"/>
      <g class="dg-dot">
        <circle cx="212" cy="140" r="9"/>
        <circle cx="193.9" cy="183.9" r="9"/>
        <circle cx="150" cy="202" r="9"/>
        <circle cx="106.1" cy="183.9" r="9"/>
        <circle cx="88" cy="140" r="9"/>
        <circle cx="106.1" cy="96.1" r="9"/>
        <circle cx="150" cy="78" r="9"/>
        <circle cx="193.9" cy="96.1" r="9"/>
      </g>
      <line x1="150" y1="14" x2="150" y2="48" class="dg-or" stroke-width="3.5" marker-end="url(#ah11)"/>
      <text x="162" y="34" class="dg-tx-or">P</text>
      <text x="120" y="144" class="dg-tx-sm">shaft</text>
      <text x="248" y="150" class="dg-tx-sm">outer ring</text>
      <text x="236" y="190" class="dg-tx-sm">inner ring</text>
      <text x="320" y="56" class="dg-tx">Rating life of the bearing</text>
      <text x="320" y="98" class="dg-tx-or">L₁₀ = (C / P)^p</text>
      <text x="320" y="134" class="dg-tx-or">L₁₀h = 10⁶ / (60 n) · (C / P)^p</text>
      <text x="320" y="172" class="dg-tx-sm">p = 3 for ball bearings, 10/3 for roller bearings</text>
      <text x="320" y="194" class="dg-tx-sm">L₁₀ in million revolutions (90% reliability)</text>
      <text x="320" y="216" class="dg-tx-sm">C and P in the same unit (kN)</text>
    </svg>`
  },

  derivation: {
    title: `rating life L<sub>10</sub> = (C/P)<sup>p</sup> and the equivalent load for varying loads`,
    steps: [
      `Fatigue tests on many bearings show that the life (in revolutions) is inversely proportional to the load raised to a power p: L ∝ 1 / P<sup>p</sup>. The exponent is p = 3 for point contact (balls) and p = 10/3 for line contact (rollers).`,
      `To use this in a catalogue, one reference load is defined: the dynamic rating C is the load for which the basic rating life is exactly one million revolutions.`,
      `Compare any load P with that reference: L<sub>10</sub> / 1 = (C / P)<sup>p</sup>, so <strong>L<sub>10</sub> = (C / P)<sup>p</sup></strong> million revolutions.`,
      `The number of revolutions in h hours at n rpm is 60·n·h. Dividing by 10<sup>6</sup> gives the life in millions: L<sub>10</sub> = 60·n·L<sub>10h</sub> / 10<sup>6</sup>. Hence <strong>L<sub>10h</sub> = 10<sup>6</sup> / (60·n) · (C/P)<sup>p</sup></strong>.`,
      `For varying loads, let a fraction q<sub>i</sub> of all revolutions be run at load P<sub>i</sub>. The life at that load alone would be L<sub>i</sub> = (C/P<sub>i</sub>)<sup>p</sup>, so the fatigue damage per revolution is 1 / L<sub>i</sub> = (P<sub>i</sub>/C)<sup>p</sup>.`,
      `By the linear damage rule, the damage per revolution of the mixed duty is Σ q<sub>i</sub>·(P<sub>i</sub>/C)<sup>p</sup>. Setting this equal to (P<sub>m</sub>/C)<sup>p</sup> for a constant load P<sub>m</sub> gives <strong>P<sub>m</sub> = (Σ q<sub>i</sub>·P<sub>i</sub><sup>p</sup>)<sup>1/p</sup></strong>.`
    ]
  },

  examples: [
    {
      title: `Life of a deep groove ball bearing under radial load`,
      given: [`Deep groove ball bearing with dynamic rating C = 25.5 kN (assumed catalogue value).`, `Pure radial load F<sub>r</sub> = 3.0 kN.`, `Speed n = 1440 rpm.`],
      convert: [`Pure radial load, so P = F<sub>r</sub> = 3.0 kN. C and P are both in kN. p = 3 for a ball bearing.`],
      find: `The rating life in million revolutions and in hours.`,
      formula: `L<sub>10</sub> = (C/P)<sup>p</sup>, &nbsp; L<sub>10h</sub> = 10<sup>6</sup> L<sub>10</sub> / (60 n)`,
      steps: [
        `C / P = 25.5 / 3.0 = 8.5.`,
        `L<sub>10</sub> = 8.5<sup>3</sup> = 614.1 million revolutions.`,
        `L<sub>10h</sub> = 614.1 × 10<sup>6</sup> / (60 × 1440) = 614.1 × 10<sup>6</sup> / 86 400 = 7108 hours.`
      ],
      result: `L<sub>10</sub> ≈ 614 million revolutions ≈ 7100 hours`,
      interpretation: `About 7100 hours is only about 10 months of continuous running, which is short for an industrial motor. A bearing with a higher C, or a lower load, would be needed for a life of 20 000 hours or more. Because the life varies with the cube of C/P, a 26% increase of C doubles the life.`
    },
    {
      title: `Choosing a bearing for a required life`,
      given: [`Radial load F<sub>r</sub> = 4.5 kN (no axial load), ball bearing.`, `Speed n = 960 rpm.`, `Required life L<sub>10h</sub> = 20 000 hours.`],
      convert: [`P = F<sub>r</sub> = 4.5 kN. p = 3.`],
      find: `The minimum dynamic load rating C of the bearing.`,
      formula: `L<sub>10</sub> = 60 n L<sub>10h</sub> / 10<sup>6</sup>, &nbsp; C<sub>req</sub> = P·L<sub>10</sub><sup>1/p</sup>`,
      steps: [
        `L<sub>10</sub> = 60 × 960 × 20 000 / 10<sup>6</sup> = 1152 million revolutions.`,
        `L<sub>10</sub><sup>1/3</sup> = 1152<sup>1/3</sup> = 10.48.`,
        `C<sub>req</sub> = 4.5 × 10.48 = 47.2 kN.`
      ],
      result: `C<sub>req</sub> ≈ 47.2 kN. Select a bearing with C of at least 47.2 kN`,
      interpretation: `Look in the catalogue for a bearing of the right bore with C ≥ 47.2 kN. If the standard size with that rating is too big for the shaft or the housing, a roller bearing or a bearing from a heavier series may be needed. Always check the speed limit and the static rating as well.`
    },
    {
      title: `Combined radial and axial load`,
      given: [`The bearing of Example 1 (C = 25.5 kN) at n = 1000 rpm.`, `Radial load F<sub>r</sub> = 3.0 kN and axial load F<sub>a</sub> = 1.5 kN.`, `Catalogue factors for this load ratio (assumed): e = 0.28, and for F<sub>a</sub>/F<sub>r</sub> > e: X = 0.56, Y = 1.55.`],
      convert: [`All loads in kN.`],
      find: `The equivalent load P and the life.`,
      formula: `P = X F<sub>r</sub> + Y F<sub>a</sub> (if F<sub>a</sub>/F<sub>r</sub> > e), &nbsp; L<sub>10</sub> = (C/P)<sup>3</sup>`,
      steps: [
        `F<sub>a</sub> / F<sub>r</sub> = 1.5 / 3.0 = 0.50, which is greater than e = 0.28, so the axial load must be included.`,
        `P = 0.56 × 3.0 + 1.55 × 1.5 = 1.68 + 2.325 = 4.005 kN.`,
        `L<sub>10</sub> = (25.5 / 4.005)<sup>3</sup> = 6.367<sup>3</sup> = 258.1 million revolutions.`,
        `L<sub>10h</sub> = 258.1 × 10<sup>6</sup> / (60 × 1000) = 4302 hours.`
      ],
      result: `P ≈ 4.0 kN; L<sub>10</sub> ≈ 258 million revolutions ≈ 4300 hours`,
      interpretation: `The axial load of 1.5 kN raises the equivalent load by a third (from 3.0 to 4.0 kN) and cuts the life to less than half of the radial-only case. This is why axial loads from helical gears and from thrust must be carried by a bearing that is selected for them.`
    },
    {
      title: `Equivalent load for a varying duty`,
      given: [`A ball bearing runs for 60% of its revolutions at P<sub>1</sub> = 2 kN and 40% at P<sub>2</sub> = 5 kN.`],
      convert: [`q<sub>1</sub> = 0.6, q<sub>2</sub> = 0.4 (fractions of revolutions). p = 3.`],
      find: `The equivalent constant load P<sub>m</sub>.`,
      formula: `P<sub>m</sub> = (q<sub>1</sub>P<sub>1</sub><sup>p</sup> + q<sub>2</sub>P<sub>2</sub><sup>p</sup>)<sup>1/p</sup>`,
      steps: [
        `P<sub>1</sub><sup>3</sup> = 8 and P<sub>2</sub><sup>3</sup> = 125.`,
        `Sum = 0.6 × 8 + 0.4 × 125 = 4.8 + 50 = 54.8.`,
        `P<sub>m</sub> = 54.8<sup>1/3</sup> = 3.80 kN.`
      ],
      result: `P<sub>m</sub> ≈ 3.80 kN`,
      interpretation: `The simple average load would be 0.6 × 2 + 0.4 × 5 = 3.2 kN, which underestimates the damage. The heavy phase, which runs only 40% of the time, causes 91% of the fatigue damage (50 out of 54.8), because the life depends on the cube of the load. Peaks must not be averaged out.`
    }
  ],

  application: [`<strong>Electric motors and gearboxes:</strong> deep groove ball bearings on the motor shaft, and tapered roller or angular contact bearings on gearbox shafts where helical gears produce thrust.`,
    `<strong>Pumps and fans:</strong> bearing life is chosen for 20 000 to 40 000 hours or more with a high reliability, since the downtime of a pump is costly.`,
    `<strong>Machine-tool spindles:</strong> pairs of angular contact bearings with a preload give the stiffness and accuracy needed for cutting.`],

  mistakes: [
    `Using the radial load only and ignoring the axial load, which gives a life that is too long.`,
    `Mixing the exponents: p = 3 for balls and p = 10/3 for rollers.`,
    `Using C in kN and P in N, or the other way round. Both must be in the same unit.`,
    `Averaging the loads instead of using the cubic mean. The peaks dominate the damage.`,
    `Overlooking poor mounting and lubrication: wrong fits, misalignment, contamination and lack of lubricant shorten the life more than the calculation shows.`,
    `Forgetting that L<sub>10</sub> is for 90% reliability. One bearing in ten fails before it, so critical machines need a higher reliability or a longer life.`
  ],

  interview: [
    [`What is the basic rating life L<sub>10</sub>?`, `The life that 90% of a group of identical bearings reach or exceed under the same conditions, before fatigue of the rolling surfaces appears. It is given in million revolutions or in hours.`],
    [`What is the relation between bearing life and load?`, `L<sub>10</sub> = (C/P)<sup>p</sup>, with p = 3 for ball bearings and 10/3 for roller bearings. Doubling the load reduces the life of a ball bearing by a factor of 8.`],
    [`What is the dynamic load rating C?`, `The constant load that a bearing can carry for a life of one million revolutions at 90% reliability. It is a catalogue value for each bearing.`],
    [`How do you handle combined radial and axial loads?`, `Find the equivalent dynamic load P = X·F<sub>r</sub> + Y·F<sub>a</sub>, using the catalogue factors for the bearing, unless the axial-to-radial ratio is below the limit e, when P = F<sub>r</sub>.`],
    [`When would you choose a roller bearing instead of a ball bearing?`, `For higher radial loads and shocks, because the line contact of rollers carries more load than the point contact of balls of the same size. Balls are better for high speeds and low friction. Tapered rollers carry combined loads.`],
    [`Why are angular contact and tapered roller bearings usually used in pairs?`, `A single bearing carries axial load in one direction only and creates an internal thrust. A pair, mounted back-to-back or face-to-face, takes axial load in both directions and allows the correct preload or clearance to be set.`]
  ],

  practice: [
    [`1. A ball bearing has C = 14 kN and carries a radial load of 2 kN. Find L<sub>10</sub>.`, `L<sub>10</sub> = (14 / 2)<sup>3</sup> = 7<sup>3</sup> = <strong>343 million revolutions</strong>.`],
    [`2. The bearing of Problem 1 runs at 1800 rpm. Find the life in hours.`, `L<sub>10h</sub> = 343 × 10<sup>6</sup> / (60 × 1800) = <strong>3176 hours</strong>.`],
    [`3. A roller bearing has C = 40 kN and carries a radial load of 10 kN. Find L<sub>10</sub>.`, `p = 10/3. L<sub>10</sub> = 4<sup>10/3</sup> = <strong>101.6 million revolutions</strong>.`],
    [`4. Find the life of the bearing in Problem 1 for a 95% reliability.`, `a<sub>1</sub> = 0.64. L = 0.64 × 343 = <strong>219.5 million revolutions</strong>.`],
    [`5. A bearing carries F<sub>r</sub> = 2.5 kN and F<sub>a</sub> = 1.0 kN. If F<sub>a</sub>/F<sub>r</sub> exceeds e, with X = 0.56 and Y = 1.6, find P.`, `P = 0.56 × 2.5 + 1.6 × 1.0 = 1.4 + 1.6 = <strong>3.0 kN</strong>.`]
  ]
};
