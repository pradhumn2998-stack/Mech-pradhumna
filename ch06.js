/* =====================================================================
   ch06.js  -  CHAPTER 6: Torsion and Shaft Design
   (Same structure as ch01.js - see the comments there.)
   ===================================================================== */
window.CHAPTERS = window.CHAPTERS || {};

window.CHAPTERS[6] = {

  def: `Torsion is the twisting of a member by a torque (twisting moment) acting about its own axis. A shaft is a rotating member, usually of circular section, that transmits power by carrying torque and often bending as well. <strong>Shaft design</strong> means choosing the diameter (and solid or hollow form) so that the shear stress stays below the allowable value and the angle of twist stays within the limit needed for the machine to work.`,

  purpose: [
    `Calculate the torque carried by a shaft from the power and speed of a motor, engine or turbine.`,
    `Find the shear stress produced by that torque and compare it with the allowable shear stress.`,
    `Find the angle of twist, which matters for positioning accuracy, synchronised drives and torsional vibration.`,
    `Choose between a solid and a hollow shaft for strength, weight and stiffness.`,
    `Industrial use: motor and gearbox shafts, propeller and drive shafts, pump and fan shafts, spindles, torsion bars and screwdriver or spanner shanks.`
  ],

  terms: [
    [`Torque (T)`, `The twisting moment about the shaft axis. Unit: N·m (use N·mm in stress formulas).`],
    [`Torsional shear stress (τ)`, `The shear stress in the cross-section caused by torque. It is zero at the centre and maximum at the outer surface of a circular shaft.`],
    [`Polar second moment of area (J)`, `A geometric property of a circular section that measures its resistance to twisting. For a solid shaft J = πd⁴/32. Unit: mm⁴.`],
    [`Polar section modulus (Z<sub>p</sub>)`, `J divided by the outer radius, Z<sub>p</sub> = J / (d/2). The shear stress is τ<sub>max</sub> = T / Z<sub>p</sub>.`],
    [`Angle of twist (θ)`, `The relative rotation of two sections of the shaft, in radians (1 rad = 57.30°).`],
    [`Shear modulus (G)`, `The stiffness of the material in shear. For steel it is roughly 77 – 80 GPa and for aluminium roughly 26 GPa.`],
    [`Torsional stiffness`, `The torque needed per unit angle of twist, k<sub>t</sub> = G·J / L, in N·mm/rad.`],
    [`Hollow shaft`, `A shaft with an outer diameter d<sub>o</sub> and an inner diameter d<sub>i</sub>. It has most of its material where the stress is highest, so it is more efficient than a solid one.`],
    [`Equivalent torque`, `A single torque that has the same shear-stress effect as a combination of bending moment and torque acting together.`],
    [`Stress concentration`, `A local rise in stress at a keyway, shoulder, hole or fillet. Real shafts must allow for it (see Chapter 19).`]
  ],

  units: {
    intro: `Most shaft mistakes come from the unit of torque and the unit of angle.`,
    head: [`Quantity`, `SI unit`, `Symbol`, `Useful conversions`],
    rows: [
      [`Torque`, `newton metre`, `N·m`, `1 N·m = 1000 N·mm; 1 kgf·m = 9.80665 N·m`],
      [`Power`, `watt`, `W`, `1 kW = 1000 W; 1 hp (mechanical) = 745.7 W`],
      [`Speed`, `revolutions per minute`, `rpm`, `ω (rad/s) = 2πN / 60`],
      [`Shear stress`, `megapascal`, `MPa`, `N·mm / mm³ = N/mm² = MPa`],
      [`Polar moment J`, `millimetre to the fourth`, `mm⁴`, `1 cm⁴ = 10⁴ mm⁴`],
      [`Shear modulus G`, `gigapascal`, `GPa`, `1 GPa = 1000 MPa; steel G ≈ 80 000 MPa`],
      [`Angle of twist`, `radian`, `rad`, `1 rad = 57.2958°; θ (deg) = θ (rad) × 180/π`]
    ],
    notes: [
      `<strong>Rule:</strong> in τ = 16T/(πd³) put T in N·mm and d in mm, and the answer is in MPa. Do not use N·m with mm.`,
      `The angle of twist formula θ = TL/(GJ) gives radians. Convert to degrees only at the end, and compare with the degree limit per metre if your standard gives one.`
    ]
  },

  formulas: [
    {
      name: `Torque from power and speed`,
      eq: `T = 60·P / (2π·N) &nbsp;&nbsp; or &nbsp;&nbsp; T ≈ 9549 · P<sub>kW</sub> / N<sub>rpm</sub>`,
      note: `With P in watts the first form gives T in N·m. The second form uses P in kW and N in rpm and also gives T in N·m. Multiply by 1000 for N·mm.`,
      symbols: [
        [`T`, `Torque transmitted by the shaft`, `N·m`],
        [`P`, `Power transmitted`, `W (kW in the shortcut)`],
        [`N`, `Rotational speed`, `rpm`]
      ],
      assumptions: [`Steady transmission of power at the stated speed.`, `The result is the nominal torque. The design torque must include a service factor for shocks, starting torque and overloads.`]
    },
    {
      name: `Torsion equation`,
      eq: `T / J = τ / r = G·θ / L`,
      note: `Three relations in one: shear stress at radius r, and angle of twist over length L.`,
      symbols: [
        [`T`, `Torque`, `N·mm`],
        [`J`, `Polar second moment of area`, `mm⁴`],
        [`τ`, `Shear stress at radius r`, `MPa`],
        [`r`, `Radius at which stress is found (r = d/2 at the surface)`, `mm`],
        [`G`, `Shear modulus`, `MPa`],
        [`θ`, `Angle of twist over length L`, `rad`],
        [`L`, `Length of shaft under the torque`, `mm`]
      ],
      assumptions: [`Circular shaft (solid or hollow), uniform section along the length.`, `Linear elastic material and a small angle of twist, with plane sections staying plane.`, `Does not apply to non-circular sections such as square or keyed shafts without correction.`]
    },
    {
      name: `Solid shaft: shear stress and minimum diameter`,
      eq: `τ<sub>max</sub> = 16·T / (π·d³) &nbsp;&nbsp; d = [ 16·T / (π·τ<sub>allow</sub>) ]<sup>1/3</sup>`,
      note: `The shear stress rises with 1/d³, so a small increase in diameter gives a big reduction in stress.`,
      symbols: [
        [`τ<sub>max</sub>`, `Maximum shear stress at the surface`, `MPa`],
        [`T`, `Design torque`, `N·mm`],
        [`d`, `Shaft diameter`, `mm`],
        [`τ<sub>allow</sub>`, `Allowable shear stress of the shaft material`, `MPa`]
      ],
      assumptions: [`Pure torque only. If bending is also present, use the combined formula below.`, `Round the calculated diameter up to the next standard size, and check the key, keyway and shoulders.`]
    },
    {
      name: `Hollow shaft: stress and polar properties`,
      eq: `J = π(d<sub>o</sub>⁴ − d<sub>i</sub>⁴) / 32 &nbsp;&nbsp; τ<sub>max</sub> = 16·T·d<sub>o</sub> / [ π(d<sub>o</sub>⁴ − d<sub>i</sub>⁴) ]`,
      symbols: [
        [`d<sub>o</sub>`, `Outer diameter`, `mm`],
        [`d<sub>i</sub>`, `Inner (bore) diameter`, `mm`],
        [`J`, `Polar second moment of area`, `mm⁴`],
        [`τ<sub>max</sub>`, `Maximum shear stress at the outer surface`, `MPa`],
        [`T`, `Torque`, `N·mm`]
      ],
      assumptions: [`Thick enough wall that the tube does not buckle (very thin walls can wrinkle under torque).`, `Uniform wall thickness and a concentric bore.`]
    },
    {
      name: `Angle of twist`,
      eq: `θ = T·L / (G·J) &nbsp;&nbsp; θ<sub>deg</sub> = θ × 180 / π`,
      note: `For a solid shaft J = πd⁴/32. The torsional stiffness is k<sub>t</sub> = G·J / L.`,
      symbols: [
        [`θ`, `Angle of twist`, `rad`],
        [`T`, `Torque`, `N·mm`],
        [`L`, `Length of the shaft`, `mm`],
        [`G`, `Shear modulus`, `MPa`],
        [`J`, `Polar second moment of area`, `mm⁴`]
      ],
      assumptions: [`Constant torque and constant section over the length L. For a stepped shaft add the twist of each length.`, `Elastic range only.`]
    },
    {
      name: `Combined bending and torsion (equivalent torque)`,
      eq: `T<sub>e</sub> = √[ (K<sub>b</sub>·M)² + (K<sub>t</sub>·T)² ] &nbsp;&nbsp; d = [ 16·T<sub>e</sub> / (π·τ<sub>allow</sub>) ]<sup>1/3</sup>`,
      note: `K<sub>b</sub> and K<sub>t</sub> are shock and fatigue factors. Use 1.0 for gradually applied steady loads and take larger values for shock, fatigue or heavy starting loads from your design data book or standard.`,
      symbols: [
        [`T<sub>e</sub>`, `Equivalent torque`, `N·mm`],
        [`M`, `Bending moment at the critical section (from Chapter 5)`, `N·mm`],
        [`T`, `Torque at the same section`, `N·mm`],
        [`K<sub>b</sub>, K<sub>t</sub>`, `Combined shock and fatigue factors for bending and torsion`, `dimensionless`],
        [`τ<sub>allow</sub>`, `Allowable shear stress`, `MPa`]
      ],
      assumptions: [`Solid circular ductile shaft, based on the maximum shear stress theory (Chapter 19).`, `Stress concentration at keyways and shoulders, and fatigue, require a separate check for rotating shafts.`]
    }
  ],

  reference: {
    title: `Polar section properties of circular shafts`,
    intro: `Use these with T in N·mm and diameters in mm.`,
    head: [`Section`, `J (mm⁴)`, `Z<sub>p</sub> = J / c (mm³)`, `τ<sub>max</sub> (MPa)`],
    rows: [
      [`Solid, diameter d`, `π d⁴ / 32`, `π d³ / 16`, `16 T / (π d³)`],
      [`Hollow, d<sub>o</sub> and d<sub>i</sub>`, `π (d<sub>o</sub>⁴ − d<sub>i</sub>⁴) / 32`, `π (d<sub>o</sub>⁴ − d<sub>i</sub>⁴) / (16 d<sub>o</sub>)`, `16 T d<sub>o</sub> / [π (d<sub>o</sub>⁴ − d<sub>i</sub>⁴)]`]
    ],
    note: `c is the outer radius. Typical shear modulus values: steel about 77 – 80 GPa, aluminium about 26 GPa. Use the datasheet for your grade.`
  },

  diagram: {
    caption: `Torsion of a solid circular shaft. The shear stress is zero at the centre and grows linearly to τ<sub>max</sub> at the outer surface, so the material near the centre is lightly stressed.`,
    svg: `<svg viewBox="0 0 600 275" role="img" aria-label="Circular shaft cross-section showing shear stress growing linearly from zero at the centre to maximum at the surface, with torsion formulas">
      <defs>
        <marker id="ah6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ff7a1a"/></marker>
        <marker id="ah6g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#566178"/></marker>
      </defs>
      <circle cx="150" cy="130" r="95" class="dg-fill"/>
      <circle cx="150" cy="130" r="4" class="dg-dot"/>
      <line x1="150" y1="130" x2="245" y2="130" class="dg-dash"/>
      <g class="dg-or" stroke-width="2.6">
        <line x1="182" y1="130" x2="182" y2="106" marker-end="url(#ah6)"/>
        <line x1="214" y1="130" x2="214" y2="83" marker-end="url(#ah6)"/>
        <line x1="245" y1="130" x2="245" y2="60" marker-end="url(#ah6)"/>
      </g>
      <line x1="150" y1="130" x2="245" y2="60" class="dg-thin"/>
      <text x="255" y="70" class="dg-tx-or">τ<tspan font-size="11" dy="4">max</tspan></text>
      <text x="112" y="156" class="dg-tx-sm">τ = 0</text>
      <line x1="55" y1="248" x2="245" y2="248" class="dg-thin" marker-start="url(#ah6g)" marker-end="url(#ah6g)"/>
      <text x="146" y="266" class="dg-tx">d</text>
      <text x="340" y="48" class="dg-tx">Solid shaft carrying torque T</text>
      <text x="340" y="90" class="dg-tx-or">τ<tspan font-size="11" dy="4">max</tspan><tspan dy="-4"> = 16 T / (π d³)</tspan></text>
      <text x="340" y="128" class="dg-tx-or">J = π d⁴ / 32</text>
      <text x="340" y="166" class="dg-tx-or">θ = T L / (G J)</text>
      <text x="340" y="204" class="dg-tx-sm">T in N·mm and d in mm give τ in MPa</text>
      <text x="340" y="224" class="dg-tx-sm">θ is in radians (× 57.3 for degrees)</text>
    </svg>`
  },

  derivation: {
    title: `torsion formula τ = T·r / J`,
    steps: [
      `Take a shaft of length L and radius R twisted through an angle θ. A line on the surface, originally straight along the axis, becomes slanted by a shear strain γ. For a small angle, the arc length gives γ·L = R·θ, so <strong>γ = R·θ / L</strong>. At any radius r the shear strain is γ = r·θ / L, which grows in proportion to r.`,
      `Apply Hooke's law in shear, τ = G·γ. At radius r: <strong>τ = G·r·θ / L</strong>. Stress also varies linearly with r: zero at the centre and maximum at the surface.`,
      `Consider a thin ring of area dA at radius r. The force on it is τ·dA and its moment about the axis is τ·dA·r. The total internal torque is the sum of these moments: T = ∫ τ·r·dA.`,
      `Substitute τ = G·θ·r / L: T = (G·θ / L) ∫ r²·dA. The integral ∫ r²·dA is the polar second moment of area J, so <strong>T = G·θ·J / L</strong>.`,
      `Rearranging gives θ = T·L / (G·J) and G·θ / L = T / J. Substitute into τ = G·θ·r / L to get <strong>τ = T·r / J</strong>.`,
      `At the surface r = d/2 and J = πd⁴/32, so τ<sub>max</sub> = T·(d/2) / (πd⁴/32) = <strong>16·T / (π·d³)</strong>.`
    ]
  },

  examples: [
    {
      title: `Diameter of a motor shaft from power and speed`,
      given: [`Motor power P = 15 kW at N = 720 rpm.`, `Allowable shear stress of the shaft material τ<sub>allow</sub> = 40 MPa.`, `Pure torque (no bending), steady load.`],
      convert: [`P = 15 kW; use T ≈ 9549 × P<sub>kW</sub> / N<sub>rpm</sub> in N·m.`, `T will be converted to N·mm by multiplying by 1000.`],
      find: `The torque and the minimum shaft diameter, then a standard size and the actual stress.`,
      formula: `T = 9549·P / N, &nbsp; d = [16·T / (π·τ<sub>allow</sub>)]<sup>1/3</sup>`,
      steps: [
        `T = 9549.3 × 15 / 720 = 198.94 N·m = 198 940 N·mm.`,
        `d³ = 16 × 198 940 / (π × 40) = 3 183 040 / 125.66 = 25 330 mm³.`,
        `d = (25 330)<sup>1/3</sup> = 29.37 mm.`,
        `Choose the next standard size, d = 30 mm.`,
        `Actual stress: τ = 16 × 198 940 / (π × 30³) = 3 183 040 / 84 823 = 37.53 MPa.`
      ],
      result: `T ≈ 198.9 N·m; d<sub>min</sub> = 29.4 mm; use 30 mm (τ ≈ 37.5 MPa < 40 MPa)`,
      interpretation: `The 30 mm shaft is only just below the allowable stress. The keyway weakens the shaft, and the real torque may exceed the nominal value at starting, so in practice a service factor or a larger shaft (for example 32 or 35 mm) would be selected.`
    },
    {
      title: `Shear stress and angle of twist of a shaft`,
      given: [`Solid steel shaft, d = 40 mm, length L = 1 m.`, `Torque T = 300 N·m.`, `G = 80 GPa.`],
      convert: [`T = 300 N·m = 300 000 N·mm. L = 1000 mm. G = 80 000 MPa.`],
      find: `The maximum shear stress and the angle of twist.`,
      formula: `τ = 16T / (πd³), &nbsp; θ = T·L / (G·J), &nbsp; J = πd⁴/32`,
      steps: [
        `τ<sub>max</sub> = 16 × 300 000 / (π × 40³) = 4 800 000 / 201 062 = 23.87 MPa.`,
        `J = π × 40⁴ / 32 = π × 2 560 000 / 32 = 251 327 mm⁴.`,
        `θ = 300 000 × 1000 / (80 000 × 251 327) = 3 × 10<sup>8</sup> / 2.0106 × 10<sup>10</sup> = 0.01492 rad.`,
        `θ in degrees = 0.01492 × 180 / π = 0.855°.`
      ],
      result: `τ<sub>max</sub> ≈ 23.9 MPa; θ ≈ 0.0149 rad ≈ 0.86° over 1 m`,
      interpretation: `The stress is low, and the twist is about 0.86° per metre. For a precision positioning drive or a long line shaft this may be too much even though the stress is safe, so stiffness can govern the design instead of strength.`
    },
    {
      title: `Solid shaft against hollow shaft of the same outer diameter`,
      given: [`Both shafts have outer diameter 50 mm.`, `The hollow shaft has an inner diameter of 40 mm.`, `Torque T = 500 N·m.`],
      convert: [`T = 500 N·m = 500 000 N·mm. All diameters in mm.`],
      find: `The maximum shear stress in each shaft and the weight saving of the hollow one.`,
      formula: `Z<sub>p</sub> = J / c, &nbsp; τ = T / Z<sub>p</sub>`,
      steps: [
        `Solid: Z<sub>p</sub> = π × 50³ / 16 = 24 544 mm³, so τ = 500 000 / 24 544 = 20.37 MPa.`,
        `Hollow: J = π × (50⁴ − 40⁴) / 32 = π × 3 690 000 / 32 = 362 265 mm⁴.`,
        `Hollow: Z<sub>p</sub> = J / 25 = 14 491 mm³, so τ = 500 000 / 14 491 = 34.51 MPa.`,
        `Cross-sectional areas: solid = π × 50² / 4 = 1963.5 mm²; hollow = π × (50² − 40²) / 4 = 706.9 mm², which is 36% of the solid.`
      ],
      result: `Solid: 20.4 MPa. Hollow: 34.5 MPa. The hollow shaft uses 36% of the material`,
      interpretation: `The hollow shaft carries the same torque at a stress about 69% higher but with 64% less material, so it is much more efficient per kilogram. It costs more to manufacture and needs a check for end fittings, keyways and buckling of a thin wall.`
    },
    {
      title: `Shaft under combined bending and torque`,
      given: [`Bending moment at the critical section M = 250 N·m.`, `Torque T = 400 N·m.`, `Steady load, so K<sub>b</sub> = K<sub>t</sub> = 1.0.`, `τ<sub>allow</sub> = 45 MPa.`],
      convert: [`M = 250 000 N·mm; T = 400 000 N·mm.`],
      find: `The equivalent torque and the minimum diameter.`,
      formula: `T<sub>e</sub> = √[(K<sub>b</sub>M)² + (K<sub>t</sub>T)²], &nbsp; d = [16·T<sub>e</sub> / (π·τ<sub>allow</sub>)]<sup>1/3</sup>`,
      steps: [
        `T<sub>e</sub> = √(250² + 400²) = √222 500 = 471.7 N·m = 471 700 N·mm.`,
        `d³ = 16 × 471 700 / (π × 45) = 7 547 200 / 141.37 = 53 386 mm³.`,
        `d = (53 386)<sup>1/3</sup> = 37.66 mm.`,
        `Choose the standard size, d = 40 mm.`,
        `Check: τ<sub>e</sub> = 16 × 471 700 / (π × 40³) = 7 547 200 / 201 062 = 37.54 MPa < 45 MPa.`
      ],
      result: `T<sub>e</sub> ≈ 471.7 N·m; d<sub>min</sub> ≈ 37.7 mm; use 40 mm`,
      interpretation: `Using torque alone (T = 400 N·m) would have given d = 35.6 mm. Ignoring the bending moment under-sizes the shaft by about 2 mm in diameter. The moment M comes from the shear force and bending moment diagrams of the shaft between bearings (Chapter 5).`
    }
  ],

  application: [
    `<strong>Gearbox and motor shafts:</strong> the shaft diameter is set by the torque from the power rating, then checked for bending from gear and belt loads, keyways and fatigue.`,
    `<strong>Drive shafts and propeller shafts:</strong> hollow tubes carry the torque at a much lower weight than solid bars.`,
    `<strong>Torsion bars and screwdrivers:</strong> a torsion bar acts as a spring in torsion (stiffness GJ/L). A screwdriver shank must resist the twisting torque without yielding.`
  ],

  mistakes: [
    `Using N·m together with mm. Convert the torque to N·mm before applying τ = 16T/(πd³).`,
    `Calculating the twist in radians and quoting it as degrees (or the other way round).`,
    `Using the solid-shaft formula for a hollow shaft, or subtracting diameters instead of the fourth powers d<sup>4</sup>.`,
    `Ignoring the bending moment from gears, belts and pulleys, which often matters as much as torque.`,
    `Forgetting keyways, shoulders and fatigue. Rotating shafts see fully reversed bending, so a static torsion check is not enough.`,
    `Applying the circular-shaft formulas to non-circular sections such as square or rectangular bars.`
  ],

  interview: [
    [`What is the torque transmitted by a shaft in terms of power and speed?`, `T = P / ω = 60P / (2πN). With P in kW and N in rpm, T (N·m) ≈ 9549 P / N.`],
    [`How does the shear stress vary across a circular shaft in torsion?`, `Linearly with radius: zero at the centre and maximum at the outer surface, τ = T·r / J. This is why a hollow shaft makes better use of material than a solid one.`],
    [`Why is a hollow shaft stronger per unit weight?`, `The highly stressed material is at the outer surface, while the centre contributes little to J. Removing the centre reduces weight a lot but reduces J only a little, so strength and stiffness per kg are higher.`],
    [`What is torsional rigidity?`, `G·J, the product of the shear modulus and the polar second moment of area. The torque needed per unit angle of twist per unit length. A larger G·J means a stiffer shaft.`],
    [`Why is a shaft also checked for bending?`, `Gears, pulleys and the weight of the parts load a shaft as a beam between bearings. Combined bending and torsion produce a higher shear stress than torsion alone, so the equivalent torque, or a failure theory, must be used.`],
    [`If you double the diameter of a shaft, how much more torque can it carry for the same stress?`, `Eight times, because τ<sub>max</sub> = 16T/(πd³) means T is proportional to d³.`]
  ],

  practice: [
    [`1. Find the torque transmitted by an 11 kW motor running at 1450 rpm.`, `T = 9549.3 × 11 / 1450 = <strong>72.4 N·m</strong>.`],
    [`2. A solid shaft of 30 mm diameter carries 150 N·m. Find the maximum shear stress.`, `T = 150 000 N·mm. τ = 16 × 150 000 / (π × 30³) = 2 400 000 / 84 823 = <strong>28.3 MPa</strong>.`],
    [`3. Find the minimum diameter of a solid shaft to carry 500 N·m with τ<sub>allow</sub> = 50 MPa.`, `d³ = 16 × 500 000 / (π × 50) = 8 000 000 / 157.08 = 50 930 mm³, so d = <strong>37.1 mm</strong> (use 38 or 40 mm).`],
    [`4. A 30 mm solid steel shaft (G = 80 GPa) is 800 mm long and carries 200 N·m. Find the angle of twist.`, `J = π × 30⁴ / 32 = 79 522 mm⁴. θ = 200 000 × 800 / (80 000 × 79 522) = 0.02515 rad = <strong>1.44°</strong>.`],
    [`5. A shaft has T<sub>e</sub> = 300 N·m with τ<sub>allow</sub> = 40 MPa. Find the minimum diameter if it is a solid shaft.`, `d³ = 16 × 300 000 / (π × 40) = 4 800 000 / 125.66 = 38 197 mm³, so d = <strong>33.7 mm</strong> (use 35 mm).`]
  ]
};
