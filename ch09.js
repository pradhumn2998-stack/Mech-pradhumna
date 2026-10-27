/* =====================================================================
   ch09.js  -  CHAPTER 9: Spur, Helical, Bevel, and Worm Gears
   (Same structure as ch01.js - see the comments there.)
   ===================================================================== */
window.CHAPTERS = window.CHAPTERS || {};

window.CHAPTERS[9] = {

  def: `A gear is a toothed wheel that transmits motion and torque to another toothed part by the meshing of teeth, with a fixed speed ratio. <strong>Spur gears</strong> have straight teeth on parallel shafts. <strong>Helical gears</strong> have teeth cut at an angle (the helix angle) on parallel shafts. <strong>Bevel gears</strong> have conical pitch surfaces and connect intersecting shafts, usually at 90°. <strong>Worm gears</strong> use a screw-like worm to drive a wheel on a shaft at 90° (non-intersecting), giving a very high ratio in one stage.`,

  purpose: [
    `Change speed and torque with an exact, positive ratio and high efficiency.`,
    `Calculate gear geometry: pitch diameter, centre distance, outside and root diameters.`,
    `Find the tooth forces (tangential, radial and axial) that load the shafts, keys and bearings.`,
    `Check the tooth bending stress as a first design check, and find the efficiency of a worm drive.`,
    `Industrial use: gearboxes, machine tools, automotive transmissions, hoists and lifts, printing machines, robots and turbines.`
  ],

  terms: [
    [`Module (m)`, `The size of a gear tooth, equal to the pitch diameter divided by the number of teeth, m = d / z (in mm). Two gears must have the same module to mesh. Standard values include 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10 mm.`],
    [`Pitch circle and pitch diameter (d)`, `The imaginary circles of two meshing gears that roll on each other without slipping. d = m·z.`],
    [`Pressure angle (φ)`, `The angle between the line of action of the tooth force and the common tangent to the pitch circles. The standard value is 20°.`],
    [`Addendum and dedendum`, `The height of a tooth above (addendum) and below (dedendum) the pitch circle. For standard 20° full-depth teeth, addendum = m and dedendum = 1.25 m.`],
    [`Centre distance (a)`, `The distance between the centres of two meshing gears, a = (d<sub>1</sub> + d<sub>2</sub>) / 2.`],
    [`Face width (b)`, `The length of the tooth along the axis of the gear.`],
    [`Helix angle (β)`, `The angle of the teeth of a helical gear relative to its axis. It gives smooth, quiet meshing and an axial thrust.`],
    [`Pitch cone angle (δ)`, `The half angle of the cone of a bevel gear. For 90° shafts, tan δ<sub>1</sub> = z<sub>1</sub> / z<sub>2</sub>.`],
    [`Lead angle (λ) of a worm`, `The angle of the worm thread. A small lead angle gives high reduction and self-locking but low efficiency.`],
    [`Backlash`, `The small clearance between the teeth of meshing gears. It prevents jamming but causes a little lost motion.`],
    [`Undercutting and minimum teeth`, `A cutter removes the root of a tooth if too few teeth are used. For 20° full-depth teeth at least about 17 teeth are needed to avoid undercut (z<sub>min</sub> = 2 / sin²φ = 17.1).`]
  ],

  units: {
    intro: `Gear calculations are done in mm and N. Keep all lengths in mm and the torque in N·mm.`,
    head: [`Quantity`, `Unit used`, `Symbol`, `Notes`],
    rows: [
      [`Module`, `millimetre`, `m`, `Preferred standard series`],
      [`Pitch diameter and face width`, `millimetre`, `d, b`, `d = m·z`],
      [`Torque`, `newton millimetre`, `T`, `1 N·m = 1000 N·mm`],
      [`Tooth force`, `newton`, `F<sub>t</sub>, F<sub>r</sub>, F<sub>a</sub>`, `Tangential, radial and axial`],
      [`Bending stress`, `megapascal`, `σ`, `N/mm²`],
      [`Pitch line velocity`, `metre per second`, `v`, `v = π d N / 60 000 (d in mm, N in rpm)`],
      [`Angles`, `degree`, `φ, β, δ, λ`, `Set the calculator to degree mode`]
    ],
    notes: [`The torque in F<sub>t</sub> = 2T/d must be in N·mm if d is in mm, so that F<sub>t</sub> comes out in N.`, `Module is for metric gears. For imperial gears, diametral pitch P<sub>d</sub> = 25.4 / m (teeth per inch).`]
  },

  formulas: [
    {
      name: `Spur gear geometry (standard 20° full-depth teeth)`,
      eq: `d = m·z &nbsp;&nbsp; a = m(z<sub>1</sub> + z<sub>2</sub>)/2 &nbsp;&nbsp; d<sub>a</sub> = m(z + 2) &nbsp;&nbsp; d<sub>f</sub> = m(z − 2.5) &nbsp;&nbsp; p = π·m`,
      symbols: [
        [`m`, `Module`, `mm`],
        [`z`, `Number of teeth`, `dimensionless`],
        [`d`, `Pitch diameter`, `mm`],
        [`a`, `Centre distance`, `mm`],
        [`d<sub>a</sub>`, `Outside (tip) diameter`, `mm`],
        [`d<sub>f</sub>`, `Root diameter`, `mm`],
        [`p`, `Circular pitch (arc distance between teeth on the pitch circle)`, `mm`]
      ],
      assumptions: [`Standard, non-shifted teeth with addendum m and dedendum 1.25 m. Profile-shifted gears use different values.`, `The two gears must have the same module and pressure angle.`]
    },
    {
      name: `Gear ratio and pitch line velocity`,
      eq: `i = z<sub>2</sub> / z<sub>1</sub> = N<sub>1</sub> / N<sub>2</sub> = d<sub>2</sub> / d<sub>1</sub> &nbsp;&nbsp; v = π·d·N / 60 000`,
      symbols: [
        [`i`, `Gear ratio (driven teeth ÷ driver teeth)`, `dimensionless`],
        [`z<sub>1</sub>, z<sub>2</sub>`, `Teeth of the pinion (driver) and gear (driven)`, `dimensionless`],
        [`N<sub>1</sub>, N<sub>2</sub>`, `Speeds of pinion and gear`, `rpm`],
        [`v`, `Pitch line velocity`, `m/s`],
        [`d`, `Pitch diameter (mm) of the gear whose speed N is used`, `mm`]
      ],
      assumptions: [`External gears turn in opposite directions. Each additional gear in the train adds a reversal.`, `The ratio is exact for gears because there is no slip.`]
    },
    {
      name: `Spur gear tooth forces`,
      eq: `F<sub>t</sub> = 2T / d = P / v &nbsp;&nbsp; F<sub>r</sub> = F<sub>t</sub>·tan φ &nbsp;&nbsp; F<sub>n</sub> = F<sub>t</sub> / cos φ`,
      note: `F<sub>t</sub> transmits the torque. F<sub>r</sub> pushes the gears apart and loads the bearings. F<sub>n</sub> is the resultant force along the line of action.`,
      symbols: [
        [`F<sub>t</sub>`, `Tangential force at the pitch circle`, `N`],
        [`T`, `Torque on the gear`, `N·mm`],
        [`d`, `Pitch diameter`, `mm`],
        [`P`, `Power transmitted`, `W`],
        [`v`, `Pitch line velocity`, `m/s`],
        [`φ`, `Pressure angle (20°)`, `degree`],
        [`F<sub>r</sub>, F<sub>n</sub>`, `Radial force and normal (total) tooth force`, `N`]
      ],
      assumptions: [`Friction between the teeth is neglected, and the load is shared by one pair of teeth.`, `Real gears also have dynamic loads that depend on speed and accuracy (apply a dynamic factor from the standard).`]
    },
    {
      name: `Helical gear geometry and forces`,
      eq: `d = m<sub>n</sub>·z / cos β &nbsp;&nbsp; F<sub>t</sub> = 2T / d &nbsp;&nbsp; F<sub>a</sub> = F<sub>t</sub>·tan β &nbsp;&nbsp; F<sub>r</sub> = F<sub>t</sub>·tan φ<sub>n</sub> / cos β`,
      note: `m<sub>n</sub> is the normal module (the cutter module). The transverse module is m<sub>t</sub> = m<sub>n</sub> / cos β. Parallel helical gears must have equal and opposite helix angles.`,
      symbols: [
        [`m<sub>n</sub>`, `Normal module`, `mm`],
        [`β`, `Helix angle`, `degree`],
        [`d`, `Pitch diameter`, `mm`],
        [`F<sub>t</sub>`, `Tangential force`, `N`],
        [`F<sub>a</sub>`, `Axial (thrust) force, carried by the bearings`, `N`],
        [`F<sub>r</sub>`, `Radial force`, `N`],
        [`φ<sub>n</sub>`, `Normal pressure angle (20°)`, `degree`]
      ],
      assumptions: [`Typical helix angles are about 15° to 30°. A larger β gives smoother running but more thrust.`, `Double helical (herringbone) gears cancel the axial thrust.`]
    },
    {
      name: `Bevel gear (90° shafts): cone angles and forces on the pinion`,
      eq: `tan δ<sub>1</sub> = z<sub>1</sub> / z<sub>2</sub> &nbsp;&nbsp; F<sub>t</sub> = 2T / d<sub>m</sub> &nbsp;&nbsp; F<sub>a</sub> = F<sub>t</sub>·tan φ·sin δ<sub>1</sub> &nbsp;&nbsp; F<sub>r</sub> = F<sub>t</sub>·tan φ·cos δ<sub>1</sub>`,
      note: `Forces act at the mean pitch diameter d<sub>m</sub>, not the large end. On the gear the axial and radial forces swap roles with the pinion's radial and axial forces.`,
      symbols: [
        [`δ<sub>1</sub>`, `Pitch cone angle of the pinion (δ<sub>1</sub> + δ<sub>2</sub> = 90°)`, `degree`],
        [`z<sub>1</sub>, z<sub>2</sub>`, `Teeth on pinion and gear`, `dimensionless`],
        [`d<sub>m</sub>`, `Mean pitch diameter of the pinion`, `mm`],
        [`F<sub>t</sub>, F<sub>a</sub>, F<sub>r</sub>`, `Tangential, axial and radial forces on the pinion`, `N`],
        [`φ`, `Pressure angle (20°)`, `degree`]
      ],
      assumptions: [`Straight bevel gears with shafts at 90°.`, `Spiral bevel gears also have a spiral-angle term in the force equations; use the standard for those.`]
    },
    {
      name: `Worm gear: ratio, lead angle and efficiency`,
      eq: `i = z<sub>g</sub> / z<sub>w</sub> &nbsp;&nbsp; tan λ = z<sub>w</sub>·m / d<sub>w</sub> &nbsp;&nbsp; η = (cos φ<sub>n</sub> − μ·tan λ) / (cos φ<sub>n</sub> + μ / tan λ)`,
      note: `Here m is the axial module of the worm (equal to the transverse module of the wheel), and z<sub>w</sub> is the number of starts of the worm. The lead is L = z<sub>w</sub>·π·m. The efficiency is for the meshing only; bearing and churning losses lower it further.`,
      symbols: [
        [`i`, `Gear ratio of the pair`, `dimensionless`],
        [`z<sub>g</sub>`, `Number of teeth of the worm wheel`, `dimensionless`],
        [`z<sub>w</sub>`, `Number of starts (threads) on the worm`, `dimensionless`],
        [`m`, `Axial module of the worm`, `mm`],
        [`d<sub>w</sub>`, `Pitch diameter of the worm`, `mm`],
        [`λ`, `Lead angle of the worm`, `degree`],
        [`μ`, `Coefficient of friction of the meshing teeth`, `dimensionless`],
        [`φ<sub>n</sub>`, `Normal pressure angle (20°)`, `degree`],
        [`η`, `Efficiency of the worm drive when the worm drives`, `dimensionless`]
      ],
      assumptions: [`The worm drives the wheel. When the wheel drives the worm, the efficiency is lower.`, `The drive is self-locking when tan λ is below about μ / cos φ<sub>n</sub> (typically for λ under about 5° to 6°), and then the efficiency is below 50%.`]
    },
    {
      name: `Lewis bending equation (first check of a spur tooth)`,
      eq: `σ<sub>b</sub> = F<sub>t</sub> / (b·m·Y)`,
      note: `Y is the Lewis form factor, which depends on the number of teeth. The result should be less than the allowable bending stress of the gear material after dividing by the factors of the design standard.`,
      symbols: [
        [`σ<sub>b</sub>`, `Bending stress at the tooth root`, `MPa`],
        [`F<sub>t</sub>`, `Tangential force`, `N`],
        [`b`, `Face width`, `mm`],
        [`m`, `Module`, `mm`],
        [`Y`, `Lewis form factor (20° full-depth teeth)`, `dimensionless`]
      ],
      assumptions: [`Treats the tooth as a cantilever with the full load at the tip, so it is a conservative and simple check.`, `A final design uses a standard (for example AGMA or ISO 6336) with dynamic, overload, load-distribution and life factors, and also checks the contact (pitting) stress.`]
    }
  ],

  reference: {
    title: `Approximate Lewis form factor Y and gear type comparison`,
    intro: `Approximate Y for 20° full-depth teeth (confirm exact values in your data book):`,
    head: [`Teeth z`, `15`, `20`, `30`, `50`, `100`],
    rows: [
      [`Lewis form factor Y`, `about 0.290`, `about 0.322`, `about 0.359`, `about 0.409`, `about 0.447`]
    ],
    note: `Typical comparison of gear types: spur (parallel shafts, simple, noisy at high speed, no axial thrust); helical (parallel shafts, smoother and quieter, axial thrust); bevel (intersecting shafts, usually at 90°); worm (shafts crossed at 90°, high ratio, quiet, lower efficiency, can self-lock).`
  },

  diagram: {
    caption: `Forces on a spur gear tooth at the pitch point. The normal force F<sub>n</sub> acts along the line of action at the pressure angle φ to the common tangent. Its tangential part F<sub>t</sub> transmits the torque, and its radial part F<sub>r</sub> pushes the gears apart.`,
    svg: `<svg viewBox="0 0 600 275" role="img" aria-label="Two meshing spur gears with tangential, radial and normal tooth forces at the pitch point and the pressure angle phi">
      <defs>
        <marker id="ah9" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ff7a1a"/></marker>
      </defs>
      <circle cx="130" cy="170" r="50" class="dg-fill"/>
      <circle cx="255" cy="170" r="75" class="dg-fill"/>
      <circle cx="130" cy="170" r="4" class="dg-dot"/>
      <circle cx="255" cy="170" r="4" class="dg-dot"/>
      <circle cx="180" cy="170" r="4.5" class="dg-dot"/>
      <line x1="180" y1="40" x2="180" y2="250" class="dg-dash"/>
      <g class="dg-or" stroke-width="3">
        <line x1="180" y1="170" x2="180" y2="94" marker-end="url(#ah9)"/>
        <line x1="180" y1="170" x2="152" y2="170" marker-end="url(#ah9)"/>
        <line x1="180" y1="170" x2="152" y2="94" marker-end="url(#ah9)" stroke-dasharray="7 4"/>
      </g>
      <text x="186" y="118" class="dg-tx-or">F<tspan font-size="11" dy="4">t</tspan></text>
      <text x="128" y="190" class="dg-tx-or">F<tspan font-size="11" dy="4">r</tspan></text>
      <text x="108" y="94" class="dg-tx-or">F<tspan font-size="11" dy="4">n</tspan></text>
      <text x="166" y="118" class="dg-tx-sm">φ</text>
      <text x="76" y="236" class="dg-tx-sm">pinion</text>
      <text x="232" y="262" class="dg-tx-sm">gear</text>
      <text x="186" y="34" class="dg-tx-sm">common tangent</text>
      <text x="360" y="62" class="dg-tx">Spur gear tooth forces</text>
      <text x="360" y="102" class="dg-tx-or">F<tspan font-size="11" dy="4">t</tspan><tspan dy="-4"> = 2T / d</tspan></text>
      <text x="360" y="136" class="dg-tx-or">F<tspan font-size="11" dy="4">r</tspan><tspan dy="-4"> = F</tspan><tspan font-size="11" dy="4">t</tspan><tspan dy="-4"> tan φ</tspan></text>
      <text x="360" y="170" class="dg-tx-or">F<tspan font-size="11" dy="4">n</tspan><tspan dy="-4"> = F</tspan><tspan font-size="11" dy="4">t</tspan><tspan dy="-4"> / cos φ</tspan></text>
      <text x="360" y="204" class="dg-tx-or">d = m z</text>
      <text x="360" y="236" class="dg-tx-sm">T in N·mm and d in mm give F in N</text>
    </svg>`
  },

  derivation: {
    title: `tooth forces F<sub>t</sub> = 2T/d, F<sub>r</sub> = F<sub>t</sub> tan φ and F<sub>t</sub> = P/v`,
    steps: [
      `The pinion carries a torque T. The tooth force at the pitch point acts at the pitch radius r = d/2. Its component along the tangent to the pitch circle, F<sub>t</sub>, is the part that produces torque: T = F<sub>t</sub>·(d/2).`,
      `Solve for the tangential force: <strong>F<sub>t</sub> = 2T / d</strong>.`,
      `The total tooth force F<sub>n</sub> acts along the line of action, tilted at the pressure angle φ from the common tangent (ignoring friction). Resolve it: F<sub>t</sub> = F<sub>n</sub>·cos φ and F<sub>r</sub> = F<sub>n</sub>·sin φ.`,
      `Eliminate F<sub>n</sub> by dividing: F<sub>r</sub> / F<sub>t</sub> = tan φ, so <strong>F<sub>r</sub> = F<sub>t</sub>·tan φ</strong>, and <strong>F<sub>n</sub> = F<sub>t</sub> / cos φ</strong>.`,
      `Link to power: the torque is T = P / ω with ω = 2v/d (since v = ω·d/2). Substituting, F<sub>t</sub> = 2T/d = 2P / (ω·d) = P / (ω·d/2) = <strong>P / v</strong>.`,
      `Check the idea on a helical gear: the tooth force is also tilted by the helix angle β, which adds an axial component F<sub>a</sub> = F<sub>t</sub>·tan β.`
    ]
  },

  examples: [
    {
      title: `Geometry of a spur gear pair`,
      given: [`Module m = 3 mm.`, `Pinion z<sub>1</sub> = 20 teeth and gear z<sub>2</sub> = 60 teeth, 20° full-depth teeth.`, `Pinion speed 1440 rpm.`],
      convert: [`All dimensions already in mm and rpm.`],
      find: `The pitch, outside and root diameters, centre distance, circular pitch, gear speed and pitch line velocity.`,
      formula: `d = m·z, &nbsp; d<sub>a</sub> = m(z + 2), &nbsp; d<sub>f</sub> = m(z − 2.5), &nbsp; a = (d<sub>1</sub> + d<sub>2</sub>)/2`,
      steps: [
        `d<sub>1</sub> = 3 × 20 = 60 mm; d<sub>2</sub> = 3 × 60 = 180 mm.`,
        `Centre distance a = (60 + 180) / 2 = 120 mm.`,
        `Outside diameters: d<sub>a1</sub> = 3 × 22 = 66 mm; d<sub>a2</sub> = 3 × 62 = 186 mm.`,
        `Root diameters: d<sub>f1</sub> = 3 × 17.5 = 52.5 mm; d<sub>f2</sub> = 3 × 57.5 = 172.5 mm.`,
        `Circular pitch p = π × 3 = 9.425 mm.`,
        `Ratio i = 60 / 20 = 3, so the gear speed is 1440 / 3 = 480 rpm.`,
        `Pitch line velocity v = π × 60 × 1440 / 60 000 = 4.52 m/s.`
      ],
      result: `d = 60 / 180 mm; a = 120 mm; d<sub>a</sub> = 66 / 186 mm; d<sub>f</sub> = 52.5 / 172.5 mm; gear 480 rpm; v = 4.52 m/s`,
      interpretation: `A pitch line velocity of 4.5 m/s is moderate. Gears in this range are usually cut accurately (milled or hobbed) and run well with oil bath lubrication. The centre distance of 120 mm fixes the housing and bearing positions.`
    },
    {
      title: `Tooth forces and Lewis bending stress of the pinion`,
      given: [`The pinion of Example 1 transmits P = 7.5 kW at 1440 rpm.`, `Face width b = 30 mm, module m = 3 mm, z = 20, φ = 20°.`, `Lewis form factor for z = 20: Y = 0.322.`],
      convert: [`T = 9549.3 × 7.5 / 1440 = 49.74 N·m = 49 740 N·mm.`, `d = 60 mm.`],
      find: `The forces F<sub>t</sub>, F<sub>r</sub> and F<sub>n</sub>, and the bending stress at the tooth root.`,
      formula: `F<sub>t</sub> = 2T/d, &nbsp; F<sub>r</sub> = F<sub>t</sub> tan φ, &nbsp; F<sub>n</sub> = F<sub>t</sub> / cos φ, &nbsp; σ<sub>b</sub> = F<sub>t</sub> / (b·m·Y)`,
      steps: [
        `F<sub>t</sub> = 2 × 49 740 / 60 = 1658 N.`,
        `Check using the power: F<sub>t</sub> = P / v = 7500 / 4.524 = 1658 N. ✔`,
        `F<sub>r</sub> = 1658 × tan 20° = 1658 × 0.3640 = 603.5 N.`,
        `F<sub>n</sub> = 1658 / cos 20° = 1658 / 0.9397 = 1764 N.`,
        `σ<sub>b</sub> = 1658 / (30 × 3 × 0.322) = 1658 / 28.98 = 57.2 MPa.`
      ],
      result: `F<sub>t</sub> = 1658 N, F<sub>r</sub> ≈ 604 N, F<sub>n</sub> ≈ 1764 N; σ<sub>b</sub> ≈ 57.2 MPa`,
      interpretation: `The shaft carrying the pinion must be designed for the radial and tangential force together (resultant about 1764 N). The Lewis stress of 57 MPa is a basic value that must be multiplied by the dynamic and overload factors of the standard and compared with the allowable bending stress of the gear material. It does not check surface (contact) fatigue.`
    },
    {
      title: `Helical gear forces and pitch diameter`,
      given: [`Helical pinion, normal module m<sub>n</sub> = 4 mm, z = 24 teeth.`, `Helix angle β = 15°, normal pressure angle φ<sub>n</sub> = 20°.`, `Torque T = 150 N·m.`],
      convert: [`T = 150 N·m = 150 000 N·mm.`],
      find: `The pitch diameter and the forces F<sub>t</sub>, F<sub>a</sub> and F<sub>r</sub>.`,
      formula: `d = m<sub>n</sub>z/cos β, &nbsp; F<sub>t</sub> = 2T/d, &nbsp; F<sub>a</sub> = F<sub>t</sub> tan β, &nbsp; F<sub>r</sub> = F<sub>t</sub> tan φ<sub>n</sub> / cos β`,
      steps: [
        `d = 4 × 24 / cos 15° = 96 / 0.9659 = 99.39 mm.`,
        `F<sub>t</sub> = 2 × 150 000 / 99.39 = 3018.5 N.`,
        `F<sub>a</sub> = 3018.5 × tan 15° = 3018.5 × 0.2679 = 808.8 N.`,
        `F<sub>r</sub> = 3018.5 × tan 20° / cos 15° = 3018.5 × 0.3640 / 0.9659 = 1137.4 N.`
      ],
      result: `d = 99.4 mm, F<sub>t</sub> ≈ 3018 N, F<sub>a</sub> ≈ 809 N, F<sub>r</sub> ≈ 1137 N`,
      interpretation: `The helix makes the pitch diameter larger than m<sub>n</sub>·z (96 mm). The 809 N axial thrust must be carried by thrust-capable bearings (tapered roller or angular contact), which is an extra cost of helical gears. Double helical gears or two opposed helical gears on one shaft cancel the thrust.`
    },
    {
      title: `Worm gear ratio, lead angle and efficiency`,
      given: [`Worm: 2 starts (z<sub>w</sub> = 2), axial module m = 5 mm, pitch diameter d<sub>w</sub> = 50 mm.`, `Worm wheel: z<sub>g</sub> = 40 teeth.`, `Worm speed 1440 rpm, φ<sub>n</sub> = 20°, friction coefficient μ = 0.05 (assumed).`],
      convert: [`All dimensions in mm. The wheel pitch diameter d<sub>g</sub> = m·z<sub>g</sub> = 5 × 40 = 200 mm.`],
      find: `The ratio, wheel speed, centre distance, lead, lead angle, efficiency and whether the drive is self-locking.`,
      formula: `i = z<sub>g</sub>/z<sub>w</sub>, &nbsp; tan λ = z<sub>w</sub>m/d<sub>w</sub>, &nbsp; η = (cos φ<sub>n</sub> − μ tan λ) / (cos φ<sub>n</sub> + μ/tan λ)`,
      steps: [
        `i = 40 / 2 = 20, so the wheel speed is 1440 / 20 = 72 rpm.`,
        `Centre distance a = (50 + 200) / 2 = 125 mm.`,
        `Lead L = z<sub>w</sub>·π·m = 2 × π × 5 = 31.42 mm.`,
        `tan λ = 2 × 5 / 50 = 0.20, so λ = 11.31°.`,
        `η = (0.9397 − 0.05 × 0.20) / (0.9397 + 0.05 / 0.20) = 0.9297 / 1.1897 = 0.781.`,
        `Self-locking check: μ / cos φ<sub>n</sub> = 0.05 / 0.9397 = 0.053, while tan λ = 0.20 is much larger, so the drive is not self-locking.`
      ],
      result: `i = 20, wheel 72 rpm, a = 125 mm, λ = 11.3°, η ≈ 78%, not self-locking`,
      interpretation: `About 22% of the input power is lost as heat (more once bearing and churning losses are added). The drive can be back-driven, so a brake is needed if the load must be held. A single-start worm of the same module and diameter would have tan λ = 0.10 (λ = 5.7°) and an efficiency of about 65%. With μ = 0.05 it would still not be self-locking, because that needs tan λ below about 0.053 (λ about 3°).`
    }
  ],

  application: [
    `<strong>Gearboxes:</strong> spur and helical stages for general reduction, with the tooth forces used to size shafts, keys and bearings (Chapters 11 and 12).`,
    `<strong>Right-angle drives:</strong> bevel gears turn the drive through 90° (differentials, hand drills, machine heads), while worm drives give large reduction in small space (lifts, rotary tables, conveyors).`,
    `<strong>Holding loads:</strong> a self-locking worm drive helps to hold a load in a hoist or a lift, but it must not be the only safety device.`
  ],

  mistakes: [
    `Using a different module on the two gears. They will not mesh. The module and the pressure angle must match.`,
    `Using N·m in F<sub>t</sub> = 2T/d with d in mm. Convert T to N·mm.`,
    `Using the pitch diameter as the outside diameter when drawing the gear, or the wrong tip and root diameters.`,
    `Ignoring the axial thrust of helical, bevel and worm gears when selecting bearings.`,
    `Choosing fewer than about 17 teeth on a standard 20° gear, which gives undercutting and a weak tooth.`,
    `Relying on the Lewis equation alone. Real gear design also checks contact (pitting) stress, dynamic loads, lubrication and temperature.`
  ],

  interview: [
    [`What is the module of a gear?`, `The size of the tooth, m = d / z in mm. Two gears can mesh only if they have the same module and pressure angle. The standard module values are chosen from a preferred series.`],
    [`What is the pressure angle and what is its standard value?`, `The angle between the line of action of the tooth force and the common tangent to the pitch circles. The standard is 20°, which gives a strong tooth and a reasonable radial force.`],
    [`Why are helical gears quieter than spur gears?`, `The teeth engage gradually along their length at an angle, so more than one tooth pair share the load and there is no sudden full-width impact. The price is an axial thrust that needs thrust bearings.`],
    [`What is the difference between spur, helical, bevel and worm gears?`, `Spur: straight teeth, parallel shafts. Helical: angled teeth, parallel shafts. Bevel: conical gears for intersecting shafts. Worm: a screw-like worm and wheel for crossed shafts at 90° with high reduction.`],
    [`When is a worm gear self-locking?`, `When the lead angle is small, so that tan λ is below about μ / cos φ (typically λ under 5° to 6°). Then the wheel cannot drive the worm, but the efficiency is low, often under 50%.`],
    [`What is the minimum number of teeth to avoid undercutting for a 20° pressure angle?`, `About 17 teeth (z<sub>min</sub> = 2 / sin²φ = 17.1). Fewer teeth need profile shift to avoid undercut and a weak tooth root.`]
  ],

  practice: [
    [`1. A spur gear has module 2.5 mm and 32 teeth. Find the pitch, outside and root diameters.`, `d = 2.5 × 32 = <strong>80 mm</strong>. d<sub>a</sub> = 2.5 × 34 = <strong>85 mm</strong>. d<sub>f</sub> = 2.5 × 29.5 = <strong>73.75 mm</strong>.`],
    [`2. A pinion of 18 teeth drives a gear of 72 teeth with module 4 mm. Find the ratio and the centre distance.`, `i = 72 / 18 = <strong>4</strong>. a = 4 × (18 + 72) / 2 = <strong>180 mm</strong>.`],
    [`3. A pinion with a pitch diameter of 100 mm transmits a torque of 200 N·m (20° teeth). Find F<sub>t</sub> and F<sub>r</sub>.`, `T = 200 000 N·mm. F<sub>t</sub> = 2 × 200 000 / 100 = <strong>4000 N</strong>. F<sub>r</sub> = 4000 × tan 20° = <strong>1456 N</strong>.`],
    [`4. A gear of 120 mm pitch diameter runs at 900 rpm. Find the pitch line velocity.`, `v = π × 120 × 900 / 60 000 = <strong>5.65 m/s</strong>.`],
    [`5. A 90° bevel pair has 20 and 40 teeth. The pinion transmits 100 N·m at a mean pitch diameter of 80 mm (φ = 20°). Find the cone angle of the pinion and the forces on it.`, `δ<sub>1</sub> = tan<sup>-1</sup>(20/40) = <strong>26.57°</strong> (δ<sub>2</sub> = 63.43°). F<sub>t</sub> = 2 × 100 000 / 80 = <strong>2500 N</strong>. F<sub>a</sub> = 2500 × tan 20° × sin 26.57° = <strong>407 N</strong>. F<sub>r</sub> = 2500 × tan 20° × cos 26.57° = <strong>814 N</strong>.`],
    [`6. A single-start worm drives a 30-tooth wheel. Find the ratio and the wheel speed for a 1450 rpm worm.`, `i = 30 / 1 = <strong>30</strong>. N = 1450 / 30 = <strong>48.3 rpm</strong>.`]
  ]
};
