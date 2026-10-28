/* =====================================================================
   ch10.js  -  CHAPTER 10: Belt, Chain, and Pulley Design
   (Same structure as ch01.js - see the comments there.)
   ===================================================================== */
window.CHAPTERS = window.CHAPTERS || {};

window.CHAPTERS[10] = {

  def: `Belt and chain drives transmit power between shafts that are too far apart for gears. A <strong>belt drive</strong> uses a flexible belt that runs over pulleys and transmits power by friction (flat and V-belts) or by teeth (toothed or synchronous belts). A <strong>chain drive</strong> uses a roller chain that meshes with toothed sprockets, so it is a positive drive with no slip. Design means choosing the pulley or sprocket sizes, the length and the number of belts or the size of the chain for the power, speed and centre distance.`,

  purpose: [
    `Calculate belt speed, speed ratio and the effect of slip on the output speed.`,
    `Find the belt length, the angle of lap and the tensions on the tight and slack sides.`,
    `Find the power a belt can transmit and the number of V-belts needed.`,
    `Calculate chain speed, sprocket pitch diameters, chain length and chain pull.`,
    `Industrial use: fans and blowers, compressors, pumps, machine-tool spindles, conveyors, agricultural machinery, engine timing drives and bicycles or motorcycles.`
  ],

  terms: [
    [`Flat belt and V-belt`, `A flat belt is a thin strip running on smooth pulleys. A V-belt has a trapezoidal section and wedges into a groove, so it transmits more power for the same tension.`],
    [`Synchronous (toothed) belt`, `A belt with teeth that mesh with a toothed pulley. It does not slip and is used for timing.`],
    [`Tight side and slack side`, `The tight side carries the larger tension T<sub>1</sub> and the slack side carries the smaller tension T<sub>2</sub>. The difference T<sub>1</sub> − T<sub>2</sub> is the effective pull that transmits power.`],
    [`Angle of lap (θ)`, `The angle of the pulley circumference that the belt touches. It is always taken for the smaller pulley, which limits the power.`],
    [`Slip and creep`, `Slip is a loss of motion between belt and pulley when the friction is exceeded. Creep is a small elastic movement that always occurs. Together they reduce the output speed by about 1% to 3%.`],
    [`Initial tension`, `The tension in the belt at rest, which gives the pressure needed on the pulleys.`],
    [`Centrifugal tension (T<sub>c</sub>)`, `The tension caused by the belt's own mass as it goes round the pulleys at speed. It reduces the pressure on the pulley and the power capacity at high speed.`],
    [`Roller chain and sprocket`, `A chain made of rollers, pins and plates, and the toothed wheel that engages it. The distance between two roller centres is the pitch p.`],
    [`Polygonal (chordal) action`, `The speed fluctuation of a chain drive because the chain wraps a sprocket as a polygon. It is larger for sprockets with few teeth.`],
    [`Service factor (K<sub>s</sub>)`, `A multiplier that allows for shock, uneven loads and long running hours (see Chapter 8).`]
  ],

  units: {
    intro: `Use mm for diameters, centre distance and pitch, N for tensions, and m/s for speeds.`,
    head: [`Quantity`, `Unit`, `Symbol`, `Useful conversions`],
    rows: [
      [`Pulley or sprocket diameter`, `millimetre`, `d, D`, `Use the pitch diameter for V-belts and chains`],
      [`Centre distance`, `millimetre`, `C`, `1 m = 1000 mm`],
      [`Belt or chain speed`, `metre per second`, `v`, `v = π d N / 60 000 (d in mm, N in rpm)`],
      [`Belt tension`, `newton`, `T<sub>1</sub>, T<sub>2</sub>, T<sub>c</sub>`, `1 kN = 1000 N`],
      [`Belt mass per metre`, `kilogram per metre`, `m`, `T<sub>c</sub> = m·v² gives newton`],
      [`Angle of lap`, `radian (degree)`, `θ`, `θ (rad) = θ (deg) × π / 180`],
      [`Power`, `watt`, `P`, `P = (T<sub>1</sub> − T<sub>2</sub>)·v in W`],
      [`Chain pitch`, `millimetre (inch)`, `p`, `1 in = 25.4 mm`]
    ],
    notes: [`The angle in e<sup>μθ</sup> must be in radians, not degrees. This is the most common mistake in belt problems.`]
  },

  formulas: [
    {
      name: `Belt speed and output speed with slip`,
      eq: `v = π·d<sub>1</sub>·N<sub>1</sub> / 60 000 &nbsp;&nbsp; N<sub>2</sub> = N<sub>1</sub>·(d<sub>1</sub> / d<sub>2</sub>)·(1 − s)`,
      note: `With no slip, i = N<sub>1</sub> / N<sub>2</sub> = d<sub>2</sub> / d<sub>1</sub>. Slip s is a decimal (2% = 0.02).`,
      symbols: [
        [`v`, `Belt speed`, `m/s`],
        [`d<sub>1</sub>, d<sub>2</sub>`, `Diameters of the driver and driven pulleys`, `mm`],
        [`N<sub>1</sub>, N<sub>2</sub>`, `Speeds of the driver and driven pulleys`, `rpm`],
        [`s`, `Total slip and creep`, `dimensionless (decimal)`]
      ],
      assumptions: [`Belt thickness is neglected. For flat belts use d + t, where t is the thickness.`, `For toothed belts and chains s = 0.`]
    },
    {
      name: `Open belt length and angle of lap`,
      eq: `L = 2C + π(d<sub>1</sub> + d<sub>2</sub>)/2 + (d<sub>2</sub> − d<sub>1</sub>)² / (4C) &nbsp;&nbsp; θ<sub>1</sub> = π − 2·sin<sup>-1</sup>[ (d<sub>2</sub> − d<sub>1</sub>) / (2C) ]`,
      note: `d<sub>1</sub> is the smaller pulley. θ<sub>1</sub> is the angle of lap on the smaller pulley, in radians.`,
      symbols: [
        [`L`, `Length of the belt`, `mm`],
        [`C`, `Centre distance`, `mm`],
        [`d<sub>1</sub>, d<sub>2</sub>`, `Small and large pulley diameters`, `mm`],
        [`θ<sub>1</sub>`, `Angle of lap on the smaller pulley`, `rad`]
      ],
      assumptions: [`Open belt drive with parallel shafts.`, `The length is approximate. Choose the nearest standard belt length and recalculate C.`, `For a crossed belt the lap is the same on both pulleys.`]
    },
    {
      name: `Belt tension ratio (Euler's belt friction)`,
      eq: `T<sub>1</sub> / T<sub>2</sub> = e<sup>μθ</sup> &nbsp;&nbsp; V-belt: T<sub>1</sub> / T<sub>2</sub> = e<sup>μθ / sin β</sup> &nbsp;&nbsp; with centrifugal tension: (T<sub>1</sub> − T<sub>c</sub>) / (T<sub>2</sub> − T<sub>c</sub>) = e<sup>μθ</sup>`,
      note: `T<sub>c</sub> = m·v². For a V-belt, β is half the groove angle, and the wedge action raises the effective friction.`,
      symbols: [
        [`T<sub>1</sub>, T<sub>2</sub>`, `Tensions on the tight and slack sides`, `N`],
        [`μ`, `Coefficient of friction between belt and pulley`, `dimensionless`],
        [`θ`, `Angle of lap on the pulley with the lower grip (the smaller pulley)`, `rad`],
        [`β`, `Half of the groove angle of a V-pulley`, `degree`],
        [`T<sub>c</sub>`, `Centrifugal tension`, `N`],
        [`m`, `Mass of the belt per metre of length`, `kg/m`],
        [`v`, `Belt speed`, `m/s`]
      ],
      assumptions: [`The belt is on the point of slipping, so the friction is fully used.`, `The coefficient μ depends on the materials, the condition of the surfaces and the speed. Use catalogue values.`]
    },
    {
      name: `Power and torque transmitted by a belt`,
      eq: `P = (T<sub>1</sub> − T<sub>2</sub>)·v &nbsp;&nbsp; T = (T<sub>1</sub> − T<sub>2</sub>)·d / 2 &nbsp;&nbsp; shaft load ≈ T<sub>1</sub> + T<sub>2</sub>`,
      note: `For T in N·m use d in m. The load on the shaft and bearings is about the sum of the tensions, which is larger than the torque alone suggests.`,
      symbols: [
        [`P`, `Power transmitted`, `W`],
        [`T<sub>1</sub> − T<sub>2</sub>`, `Effective pull`, `N`],
        [`v`, `Belt speed`, `m/s`],
        [`T`, `Torque on the pulley`, `N·m`],
        [`d`, `Pulley diameter`, `m`]
      ],
      assumptions: [`Steady running with no shocks. Apply a service factor for real drives.`, `The sum of the tensions is a good estimate of the shaft load for an open belt with a small angle between the strands.`]
    },
    {
      name: `Number of V-belts`,
      eq: `n = K<sub>s</sub>·P / ( P<sub>r</sub>·K<sub>θ</sub>·K<sub>L</sub> )`,
      note: `Round up to the next whole number. P<sub>r</sub>, K<sub>θ</sub> and K<sub>L</sub> come from the belt manufacturer's catalogue for the chosen section, pulley size and speed.`,
      symbols: [
        [`n`, `Number of belts`, `dimensionless (whole number)`],
        [`K<sub>s</sub>`, `Service factor`, `dimensionless`],
        [`P`, `Power to be transmitted`, `kW`],
        [`P<sub>r</sub>`, `Rated power of one belt at the given speed and small-pulley diameter`, `kW`],
        [`K<sub>θ</sub>`, `Arc-of-contact (lap) correction factor`, `dimensionless`],
        [`K<sub>L</sub>`, `Belt length correction factor`, `dimensionless`]
      ],
      assumptions: [`The rating values are from the catalogue and differ between manufacturers and sections. The example in this chapter uses assumed values.`, `Keep all belts of a set matched in length.`]
    },
    {
      name: `Roller chain: pitch diameter, speed and pull`,
      eq: `D = p / sin(180° / z) &nbsp;&nbsp; v = z·p·N / 60 000 &nbsp;&nbsp; F = P / v`,
      symbols: [
        [`D`, `Pitch diameter of the sprocket`, `mm`],
        [`p`, `Chain pitch`, `mm`],
        [`z`, `Number of teeth of the sprocket`, `dimensionless`],
        [`v`, `Mean chain speed`, `m/s`],
        [`N`, `Sprocket speed`, `rpm`],
        [`F`, `Chain pull (tension in the loaded strand)`, `N`],
        [`P`, `Power transmitted`, `W`]
      ],
      assumptions: [`The chain speed is the mean value. It varies slightly because of polygonal action.`, `Select the chain by comparing the design power with the manufacturer's power rating chart, and also check the tensile strength with a safety factor.`]
    },
    {
      name: `Roller chain length`,
      eq: `L<sub>p</sub> = 2C / p + (z<sub>1</sub> + z<sub>2</sub>) / 2 + [ (z<sub>2</sub> − z<sub>1</sub>) / (2π) ]² · p / C`,
      note: `L<sub>p</sub> is the number of pitches (links). Round it up to the next even whole number to avoid an offset link, then recalculate the centre distance.`,
      symbols: [
        [`L<sub>p</sub>`, `Chain length in pitches`, `dimensionless`],
        [`C`, `Approximate centre distance`, `mm`],
        [`p`, `Chain pitch`, `mm`],
        [`z<sub>1</sub>, z<sub>2</sub>`, `Teeth on the small and large sprockets`, `dimensionless`]
      ],
      assumptions: [`Two sprockets, horizontal or inclined drive.`, `A chain needs a slight sag on the slack side and a tensioner or adjustable centres.`, `Chain length in mm is L<sub>p</sub> × p.`]
    }
  ],

  reference: {
    title: `Standard roller chain pitches`,
    intro: `The pitch is a standard size. The first two columns give the common chain numbers (single strand). Check the manufacturer's data for power ratings.`,
    head: [`ANSI chain no.`, `ISO (B series) no.`, `Pitch (mm)`, `Pitch (in)`],
    rows: [
      [`40`, `08B`, `12.70`, `1/2`],
      [`50`, `10B`, `15.875`, `5/8`],
      [`60`, `12B`, `19.05`, `3/4`],
      [`80`, `16B`, `25.40`, `1`],
      [`100`, `20B`, `31.75`, `1-1/4`],
      [`120`, `24B`, `38.10`, `1-1/2`]
    ],
    note: `ANSI and ISO B chains have the same pitch for these numbers but are not identical in roller diameter and width, so do not mix them.`
  },

  diagram: {
    caption: `Open belt drive. The tight side carries T<sub>1</sub> and the slack side T<sub>2</sub>. The angle of lap is smaller on the small pulley, so it limits the power that the drive can transmit.`,
    svg: `<svg viewBox="0 0 600 295" role="img" aria-label="Open belt drive with a small and a large pulley, belt, tight side tension T1, slack side tension T2, pulley diameters d1 and d2 and centre distance C">
      <defs>
        <marker id="ah10" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#566178"/></marker>
      </defs>
      <circle cx="130" cy="120" r="40" class="dg-fill"/>
      <circle cx="400" cy="120" r="75" class="dg-fill"/>
      <path d="M124.82 80.34 L390.28 45.63 A75 75 0 1 1 390.28 194.37 L124.82 159.66 A40 40 0 0 1 124.82 80.34 Z" class="dg-or" stroke-width="4"/>
      <circle cx="130" cy="120" r="4" class="dg-dot"/>
      <circle cx="400" cy="120" r="4" class="dg-dot"/>
      <text x="116" y="124" class="dg-tx-sm">d₁</text>
      <text x="386" y="124" class="dg-tx-sm">d₂</text>
      <text x="228" y="40" class="dg-tx-or">T₁ (tight side)</text>
      <text x="226" y="198" class="dg-tx-or">T₂ (slack side)</text>
      <line x1="130" y1="214" x2="400" y2="214" class="dg-thin" marker-start="url(#ah10)" marker-end="url(#ah10)"/>
      <text x="258" y="232" class="dg-tx">C</text>
      <text x="40" y="262" class="dg-tx-or">T₁ / T₂ = e^(μθ)     P = (T₁ − T₂) · v</text>
      <text x="40" y="284" class="dg-tx-sm">L ≈ 2C + π(d₁ + d₂)/2 + (d₂ − d₁)² / (4C);  θ in radians</text>
    </svg>`
  },

  derivation: {
    title: `Euler's belt friction equation T<sub>1</sub>/T<sub>2</sub> = e<sup>μθ</sup>`,
    steps: [
      `Take a small element of the belt on the pulley, subtending a small angle dθ at the centre. The tension is T on one end and T + dT on the other.`,
      `Resolve the forces along the radius. The two tensions give a net inward force T·dθ (using sin(dθ/2) ≈ dθ/2). This is balanced by the normal reaction of the pulley, so dN = T·dθ (centrifugal effect is neglected here).`,
      `Resolve along the tangent. The change in tension is balanced by the friction force when the belt is about to slip: dT = μ·dN.`,
      `Substitute dN: dT = μ·T·dθ, so dT / T = μ·dθ.`,
      `Integrate from the slack side (tension T<sub>2</sub>, angle 0) to the tight side (tension T<sub>1</sub>, angle θ): ln(T<sub>1</sub> / T<sub>2</sub>) = μ·θ, so <strong>T<sub>1</sub> / T<sub>2</sub> = e<sup>μθ</sup></strong>.`,
      `Including the centrifugal tension T<sub>c</sub> = m·v², which acts all round the belt, every tension is reduced by T<sub>c</sub> in the friction equation: <strong>(T<sub>1</sub> − T<sub>c</sub>) / (T<sub>2</sub> − T<sub>c</sub>) = e<sup>μθ</sup></strong>. The transmitted power is P = (T<sub>1</sub> − T<sub>2</sub>)·v.`
    ]
  },

  examples: [
    {
      title: `Geometry of an open belt drive`,
      given: [`Small pulley d<sub>1</sub> = 150 mm, large pulley d<sub>2</sub> = 450 mm.`, `Centre distance C = 1000 mm.`, `Motor (small pulley) speed N<sub>1</sub> = 1440 rpm, slip 2%.`],
      convert: [`All lengths in mm. The angle of lap will be found in radians and then converted to degrees.`],
      find: `The belt length, the angle of lap on the small pulley, the belt speed and the driven speed.`,
      formula: `L = 2C + π(d<sub>1</sub>+d<sub>2</sub>)/2 + (d<sub>2</sub>−d<sub>1</sub>)²/(4C), &nbsp; θ = π − 2 sin<sup>-1</sup>[(d<sub>2</sub>−d<sub>1</sub>)/(2C)]`,
      steps: [
        `L = 2 × 1000 + π × (150 + 450) / 2 + (450 − 150)² / (4 × 1000) = 2000 + 942.5 + 22.5 = 2965 mm.`,
        `sin<sup>-1</sup>(300 / 2000) = sin<sup>-1</sup>(0.15) = 0.1506 rad, so θ = 3.1416 − 2 × 0.1506 = 2.840 rad = 162.7°.`,
        `v = π × 150 × 1440 / 60 000 = 11.31 m/s.`,
        `No slip: N<sub>2</sub> = 1440 × 150 / 450 = 480 rpm. With 2% slip: N<sub>2</sub> = 480 × 0.98 = 470.4 rpm.`
      ],
      result: `L ≈ 2965 mm; θ = 2.84 rad (162.7°); v = 11.31 m/s; N<sub>2</sub> ≈ 470 rpm`,
      interpretation: `A belt speed of 11.3 m/s is in the normal range for V-belts and flat belts. The lap of 162.7° on the small pulley is acceptable (about 120° is the usual minimum). The nearest standard belt length would be selected and the centre distance adjusted.`
    },
    {
      title: `Power transmitted by a flat belt (with centrifugal tension)`,
      given: [`The drive of Example 1 (v = 11.31 m/s, θ = 2.840 rad).`, `Coefficient of friction μ = 0.3 (assumed).`, `Maximum permitted tension on the tight side T<sub>1</sub> = 1200 N.`, `Belt mass per metre m = 0.4 kg/m (assumed).`],
      convert: [`Tensions in N, speed in m/s, so power comes out in W.`],
      find: `The centrifugal tension, the slack-side tension, the power and the torque on the small pulley.`,
      formula: `T<sub>c</sub> = m v², &nbsp; (T<sub>1</sub> − T<sub>c</sub>)/(T<sub>2</sub> − T<sub>c</sub>) = e<sup>μθ</sup>, &nbsp; P = (T<sub>1</sub> − T<sub>2</sub>) v`,
      steps: [
        `T<sub>c</sub> = 0.4 × 11.31² = 0.4 × 127.9 = 51.2 N.`,
        `μθ = 0.3 × 2.840 = 0.852, so e<sup>μθ</sup> = 2.345.`,
        `T<sub>2</sub> = T<sub>c</sub> + (T<sub>1</sub> − T<sub>c</sub>) / 2.345 = 51.2 + (1200 − 51.2) / 2.345 = 51.2 + 490.0 = 541.1 N.`,
        `P = (1200 − 541.1) × 11.31 = 658.9 × 11.31 = 7451 W = 7.45 kW.`,
        `Torque on the small pulley = (T<sub>1</sub> − T<sub>2</sub>) × d<sub>1</sub> / 2 = 658.9 × 0.075 = 49.4 N·m.`
      ],
      result: `T<sub>c</sub> ≈ 51 N; T<sub>2</sub> ≈ 541 N; P ≈ 7.45 kW; torque ≈ 49.4 N·m`,
      interpretation: `Ignoring the centrifugal tension would give 7.78 kW, which is about 4% too high. The error grows quickly with belt speed since T<sub>c</sub> rises with v². The shaft load is about T<sub>1</sub> + T<sub>2</sub> = 1741 N, which the shaft and bearings of the motor must also be designed for.`
    },
    {
      title: `Number of V-belts for a motor drive`,
      given: [`Motor power P = 11 kW.`, `Service factor K<sub>s</sub> = 1.3 (assumed).`, `Rated power of one belt at this speed and pulley size P<sub>r</sub> = 3.2 kW (assumed catalogue value).`, `Arc correction K<sub>θ</sub> = 0.95 and length correction K<sub>L</sub> = 1.0 (assumed).`],
      convert: [`Everything in kW.`],
      find: `The number of belts.`,
      formula: `n = K<sub>s</sub>·P / (P<sub>r</sub>·K<sub>θ</sub>·K<sub>L</sub>)`,
      steps: [
        `Design power = 1.3 × 11 = 14.3 kW.`,
        `Corrected rating of one belt = 3.2 × 0.95 × 1.0 = 3.04 kW.`,
        `n = 14.3 / 3.04 = 4.70.`,
        `Round up to a whole number: n = 5 belts.`
      ],
      result: `Use 5 V-belts (a matched set)`,
      interpretation: `Round up, never down. Five belts share the load, and if one belt is replaced the whole set should be replaced, so that the belts stay of equal length and share the load equally. The catalogue values in your own design must come from the belt manufacturer for the chosen section.`
    },
    {
      title: `Roller chain drive: sprockets, speed, pull and length`,
      given: [`Chain pitch p = 19.05 mm (ANSI 60 / ISO 12B).`, `Driver sprocket z<sub>1</sub> = 19 teeth at N<sub>1</sub> = 720 rpm; driven sprocket z<sub>2</sub> = 57 teeth.`, `Power P = 7.5 kW.`, `Approximate centre distance C = 800 mm.`],
      convert: [`P = 7500 W. All lengths in mm.`],
      find: `The pitch diameters, the driven speed, the chain speed, the chain pull and the number of pitches.`,
      formula: `D = p / sin(180°/z), &nbsp; v = z p N / 60 000, &nbsp; F = P/v, &nbsp; L<sub>p</sub> = 2C/p + (z<sub>1</sub>+z<sub>2</sub>)/2 + [(z<sub>2</sub>−z<sub>1</sub>)/2π]² p/C`,
      steps: [
        `D<sub>1</sub> = 19.05 / sin(180° / 19) = 19.05 / sin 9.474° = 19.05 / 0.1646 = 115.7 mm.`,
        `D<sub>2</sub> = 19.05 / sin(180° / 57) = 19.05 / sin 3.158° = 19.05 / 0.05508 = 345.8 mm.`,
        `N<sub>2</sub> = 720 × 19 / 57 = 240 rpm.`,
        `v = 19 × 19.05 × 720 / 60 000 = 4.343 m/s.`,
        `F = 7500 / 4.343 = 1727 N.`,
        `L<sub>p</sub> = 2 × 800 / 19.05 + (19 + 57)/2 + [(57 − 19) / (2π)]² × 19.05 / 800 = 83.99 + 38 + 36.58 × 0.02381 = 83.99 + 38 + 0.87 = 122.86 pitches.`,
        `Round up to the next even number: 124 pitches (length = 124 × 19.05 = 2362 mm). The centre distance for 124 pitches is about 811 mm.`
      ],
      result: `D<sub>1</sub> = 115.7 mm, D<sub>2</sub> = 345.8 mm; N<sub>2</sub> = 240 rpm; v = 4.34 m/s; F ≈ 1727 N; 124 pitches`,
      interpretation: `A chain speed of 4.3 m/s is moderate. With a service factor the chain is chosen from the manufacturer's power chart (the pull of 1727 N must be well below the chain's tensile strength, with a large safety factor). The slack of the chain needs a tensioner or adjustable centres. With 19 teeth on the small sprocket the speed fluctuation is small.`
    }
  ],

  application: [
    `<strong>Fans, blowers and compressors:</strong> V-belts reduce the motor speed, absorb start-up shock and allow the ratio to be changed by changing the pulleys.`,
    `<strong>Conveyors and agricultural machines:</strong> roller chains carry the high torque at low speed, in dusty or oily conditions where belts would slip.`,
    `<strong>Timing and positioning:</strong> toothed belts and chains give an exact ratio for engine camshafts, printers and packaging machines.`
  ],

  mistakes: [
    `Using degrees for θ in e<sup>μθ</sup>. The angle must be in radians.`,
    `Taking the lap angle of the large pulley. The small pulley governs the power because its lap is smaller.`,
    `Ignoring the centrifugal tension at high belt speed, which overestimates the power capacity.`,
    `Forgetting the service factor, or using fewer belts than the rounded-up value.`,
    `Using an odd number of chain pitches, which needs an offset link. The ratio also should not make the sprockets mesh with the same teeth repeatedly if wear is a concern.`,
    `Underestimating the shaft load. The belt pull on the shaft is about T<sub>1</sub> + T<sub>2</sub>, not just the torque divided by the radius.`
  ],

  interview: [
    [`What is the condition for a belt to transmit the maximum power?`, `The belt is just about to slip, so the ratio of tensions is T<sub>1</sub>/T<sub>2</sub> = e<sup>μθ</sup> on the pulley with the smaller grip (usually the smaller pulley). The power is P = (T<sub>1</sub> − T<sub>2</sub>)·v. The maximum power per unit tension occurs at an optimum belt speed because the centrifugal tension rises with v².`],
    [`Why is the angle of lap important and which pulley limits it?`, `Friction acts only on the part of the pulley the belt touches, so a larger lap gives a larger tension ratio. The smaller pulley has the smaller lap, so it decides the slipping limit.`],
    [`Why does a V-belt transmit more power than a flat belt at the same tension?`, `The wedge shape in the groove increases the normal force on the sides of the belt, so the effective friction coefficient is μ / sin β. This gives a higher tension ratio.`],
    [`What is slip and creep in a belt drive?`, `Creep is the small elastic stretch and contraction of the belt as it passes from the tight to the slack side. Slip is a real loss of motion when friction is exceeded. Both lower the driven speed, typically by 1% to 3%.`],
    [`Compare a belt drive with a chain drive.`, `Belts are quiet, cheap and absorb shock, but slip and have lower capacity per width. Chains are positive with no slip and carry larger loads at low speeds but are noisy, need lubrication and show speed fluctuation from polygonal action.`],
    [`Why should the chain have an even number of pitches?`, `With an even number each end of the chain is an inner link and an outer link, so the chain closes with a standard connecting link. An odd number needs an offset link, which is weaker.`]
  ],

  practice: [
    [`1. A pulley of 100 mm diameter runs at 1200 rpm. Find the belt speed.`, `v = π × 100 × 1200 / 60 000 = <strong>6.28 m/s</strong>.`],
    [`2. A 120 mm motor pulley at 1440 rpm drives a 360 mm pulley. Find the driven speed without slip and with 1.5% slip.`, `Without slip: N<sub>2</sub> = 1440 × 120 / 360 = <strong>480 rpm</strong>. With slip: 480 × 0.985 = <strong>472.8 rpm</strong>.`],
    [`3. Find the tension ratio for μ = 0.25 and an angle of lap of 180°.`, `θ = π rad. T<sub>1</sub>/T<sub>2</sub> = e<sup>0.25π</sup> = e<sup>0.785</sup> = <strong>2.19</strong>.`],
    [`4. A belt has T<sub>1</sub> = 800 N and T<sub>2</sub> = 300 N at 10 m/s on a 200 mm pulley. Find the power and the torque on the pulley.`, `P = (800 − 300) × 10 = <strong>5000 W (5 kW)</strong>. Torque = 500 × 0.1 = <strong>50 N·m</strong>.`],
    [`5. A 21-tooth sprocket with a 12.7 mm pitch chain runs at 900 rpm. Find the chain speed.`, `v = 21 × 12.7 × 900 / 60 000 = <strong>4.0 m/s</strong>.`]
  ]
};
