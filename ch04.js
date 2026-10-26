/* =====================================================================
   ch04.js  -  CHAPTER 4: Stress, Strain, and Elasticity
   (Same structure as ch01.js - see the comments there.)
   ===================================================================== */
window.CHAPTERS = window.CHAPTERS || {};

window.CHAPTERS[4] = {

  def: `Strain is the deformation of a body per unit of its original size, and elasticity is the ability of a material to return to its original shape when the load is removed. Within the elastic range, stress and strain are proportional (<strong>Hooke's law</strong>), and the constant of proportionality is the modulus of elasticity E. This chapter connects loads to deformations and to the stresses acting on different planes inside a part.`,

  purpose: [
    `Calculate how much a rod, bolt or link stretches or shortens under load.`,
    `Check that deflections stay within the limits needed for fit, alignment and function.`,
    `Use Poisson's ratio to predict how the cross-section changes when a part is stretched.`,
    `Find the maximum normal and shear stress in a part loaded in more than one direction (principal stresses).`,
    `Industrial use: bolt stretch in preloaded joints, lead-screw and tie-rod elongation, strain-gauge load cells and stress checks in shafts and brackets.`
  ],

  terms: [
    [`Normal strain (ε)`, `Change in length divided by original length. It is dimensionless. It is often quoted in percent or in microstrain (µε = 10<sup>-6</sup>).`],
    [`Shear strain (γ)`, `The change in angle (in radians) between two lines that were originally at right angles.`],
    [`Elastic and plastic behaviour`, `In the elastic range the part returns to its shape when unloaded. Beyond the yield point permanent (plastic) deformation remains.`],
    [`Young's modulus (E)`, `The slope of the straight part of the stress–strain curve: stiffness in tension and compression. Unit: GPa.`],
    [`Shear modulus (G)`, `Ratio of shear stress to shear strain in the elastic range.`],
    [`Bulk modulus (K)`, `Ratio of pressure to volumetric strain; the resistance of a material to uniform compression.`],
    [`Poisson's ratio (ν)`, `Ratio of lateral strain to axial strain, taken as a positive number. A bar that is stretched gets thinner.`],
    [`Proportional limit and yield point`, `The proportional limit is the end of the straight line on the stress–strain curve. The yield point is where permanent deformation begins.`],
    [`Principal stresses`, `The maximum and minimum normal stresses at a point, acting on planes where the shear stress is zero.`],
    [`Isotropic material`, `A material with the same properties in all directions (steel and aluminium are treated as isotropic).`]
  ],

  units: {
    intro: `Strain has no unit. E and G have the same unit as stress.`,
    head: [`Quantity`, `SI unit`, `Symbol`, `Notes`],
    rows: [
      [`Strain`, `none (m/m)`, `ε`, `0.001 = 0.1% = 1000 µε`],
      [`Modulus of elasticity`, `pascal (practical: GPa)`, `GPa`, `1 GPa = 1000 MPa = 1000 N/mm². E<sub>steel</sub> ≈ 200 GPa = 200 000 MPa`],
      [`Deformation`, `millimetre`, `mm`, `1 mm = 0.001 m`],
      [`Stress`, `megapascal`, `MPa`, `1 MPa = 1 N/mm²`],
      [`Angle`, `radian`, `rad`, `Shear strain γ is measured in radians`]
    ],
    notes: [`<strong>Watch out:</strong> E is usually given in GPa but stress in MPa. Convert 200 GPa to 200 000 MPa before dividing.`]
  },

  formulas: [
    {
      name: `Normal strain`,
      eq: `ε = δ / L`,
      symbols: [
        [`ε`, `Normal strain`, `dimensionless`],
        [`δ`, `Change in length (elongation positive)`, `mm`],
        [`L`, `Original length`, `mm`]
      ],
      assumptions: [`Strain is assumed uniform along the length.`, `For large strains the true strain differs from δ/L, but design strains are small.`]
    },
    {
      name: `Hooke's law`,
      eq: `σ = E · ε`,
      symbols: [
        [`σ`, `Normal stress`, `MPa`],
        [`E`, `Young's modulus (modulus of elasticity)`, `MPa (GPa × 1000)`],
        [`ε`, `Normal strain`, `dimensionless`]
      ],
      assumptions: [`Only valid below the proportional limit (the elastic range).`, `Material is homogeneous and isotropic. E changes with temperature.`]
    },
    {
      name: `Axial deformation of a uniform bar`,
      eq: `δ = F·L / (A·E)`,
      symbols: [
        [`δ`, `Elongation or shortening`, `mm`],
        [`F`, `Axial force`, `N`],
        [`L`, `Original length`, `mm`],
        [`A`, `Cross-sectional area`, `mm²`],
        [`E`, `Young's modulus`, `MPa`]
      ],
      assumptions: [`Uniform cross-section, constant axial force and linear elastic material.`, `For a stepped bar or varying force, calculate each portion separately and add the deformations.`, `Compression members must also be checked for buckling.`]
    },
    {
      name: `Poisson's ratio`,
      eq: `ν = − ε<sub>lateral</sub> / ε<sub>axial</sub>`,
      note: `So the lateral strain is ε<sub>lateral</sub> = −ν · ε<sub>axial</sub>.`,
      symbols: [
        [`ν`, `Poisson's ratio (about 0.3 for steel, 0.33 for aluminium)`, `dimensionless`],
        [`ε<sub>axial</sub>`, `Strain along the load`, `dimensionless`],
        [`ε<sub>lateral</sub>`, `Strain perpendicular to the load`, `dimensionless`]
      ],
      assumptions: [`Elastic range, isotropic material.`, `For stable isotropic materials ν lies between 0 and 0.5.`]
    },
    {
      name: `Relations between the elastic constants`,
      eq: `G = E / [2(1 + ν)] &nbsp;&nbsp; K = E / [3(1 − 2ν)]`,
      symbols: [
        [`G`, `Shear modulus`, `GPa`],
        [`K`, `Bulk modulus`, `GPa`],
        [`E`, `Young's modulus`, `GPa`],
        [`ν`, `Poisson's ratio`, `dimensionless`]
      ],
      assumptions: [`Isotropic, linearly elastic material.`, `Only two of E, G, K and ν are independent.`]
    },
    {
      name: `Principal stresses and maximum shear stress (2D)`,
      eq: `σ<sub>1,2</sub> = (σ<sub>x</sub> + σ<sub>y</sub>)/2 ± √[ ((σ<sub>x</sub> − σ<sub>y</sub>)/2)² + τ<sub>xy</sub>² ]`,
      note: `Maximum shear: τ<sub>max</sub> = √[ ((σ<sub>x</sub> − σ<sub>y</sub>)/2)² + τ<sub>xy</sub>² ] &nbsp;&nbsp; Principal angle: tan 2θ<sub>p</sub> = 2τ<sub>xy</sub> / (σ<sub>x</sub> − σ<sub>y</sub>)`,
      symbols: [
        [`σ<sub>x</sub>, σ<sub>y</sub>`, `Normal stresses on the x and y faces (tension positive)`, `MPa`],
        [`τ<sub>xy</sub>`, `Shear stress on the x and y faces`, `MPa`],
        [`σ<sub>1</sub>, σ<sub>2</sub>`, `Maximum and minimum principal stresses`, `MPa`],
        [`τ<sub>max</sub>`, `Maximum in-plane shear stress`, `MPa`],
        [`θ<sub>p</sub>`, `Angle from the x-axis to the plane of σ<sub>1</sub>`, `degree`]
      ],
      assumptions: [`Plane stress (no stress in the third direction).`, `Use sign convention consistently: tension positive.`, `These stresses are compared with the yield strength using a failure theory (Chapter 19).`]
    }
  ],

  reference: {
    title: `Typical elastic constants of common materials`,
    intro: `Approximate room-temperature values for quick calculations.`,
    head: [`Material`, `E (GPa)`, `ν`, `Notes`],
    rows: [
      [`Mild / structural steel`, `about 200`, `0.27 – 0.30`, `Most alloy steels are also about 200 – 210 GPa`],
      [`Stainless steel (304)`, `about 193`, `about 0.29`, ``],
      [`Aluminium alloys`, `about 69 – 70`, `about 0.33`, `About one-third of steel's stiffness`],
      [`Brass`, `about 100`, `about 0.34`, ``],
      [`Grey cast iron`, `about 100 – 170`, `0.21 – 0.26`, `Varies strongly with grade`],
      [`Titanium alloy (Ti-6Al-4V)`, `about 114`, `about 0.34`, ``]
    ],
    note: `These are typical values only. Use the datasheet or standard for the exact grade you are designing with.`
  },

  diagram: {
    caption: `Engineering stress–strain curve of a ductile steel. The straight part has slope E; the yield point marks the start of permanent deformation.`,
    svg: `<svg viewBox="0 0 580 320" role="img" aria-label="Stress strain curve for ductile steel showing elastic region with slope E, yield point, ultimate tensile strength and fracture">
      <line x1="60" y1="270" x2="540" y2="270" class="dg-ln"/>
      <line x1="60" y1="270" x2="60" y2="24" class="dg-ln"/>
      <path d="M60 270 L150 120 C158 112 164 136 186 136 C240 134 320 78 392 56 C424 54 444 70 474 112" class="dg-or"/>
      <circle cx="150" cy="120" r="5" class="dg-dot"/>
      <circle cx="392" cy="56" r="5" class="dg-dot"/>
      <circle cx="474" cy="112" r="5" class="dg-dot"/>
      <line x1="150" y1="120" x2="60" y2="120" class="dg-dash"/>
      <line x1="392" y1="56" x2="60" y2="56" class="dg-dash"/>
      <text x="300" y="304" class="dg-tx">Strain  ε  (dimensionless)</text>
      <text x="14" y="40" class="dg-tx" transform="rotate(-90 14 150)">Stress  σ  (MPa)</text>
      <text x="168" y="108" class="dg-tx">Yield point (σ<tspan font-size="11" dy="4">y</tspan><tspan dy="-4">)</tspan></text>
      <text x="300" y="46" class="dg-tx">Ultimate strength (σ<tspan font-size="11" dy="4">u</tspan><tspan dy="-4">)</tspan></text>
      <text x="482" y="124" class="dg-tx">Fracture</text>
      <text x="64" y="212" class="dg-tx-or" transform="rotate(-57 64 212)">slope = E</text>
      <text x="200" y="168" class="dg-tx-sm">plastic region</text>
      <text x="70" y="250" class="dg-tx-sm">elastic</text>
    </svg>`
  },

  derivation: {
    title: `axial deformation δ = FL / (AE)`,
    steps: [
      `A bar of length L and area A carries an axial force F. The normal stress is σ = F / A.`,
      `In the elastic range Hooke's law gives the strain: ε = σ / E = F / (A·E).`,
      `Strain is elongation per unit length, ε = δ / L, so δ = ε · L.`,
      `Substitute ε: <strong>δ = F·L / (A·E)</strong>.`,
      `The quantity A·E / L is the axial stiffness k of the bar (force per unit elongation). A short, thick, stiff-material bar is stiffer than a long, thin, flexible one.`
    ]
  },

  examples: [
    {
      title: `Elongation of a steel rod`,
      given: [`Steel rod, diameter d = 20 mm, length L = 2 m.`, `Axial tensile load F = 50 kN.`, `E = 200 GPa.`],
      convert: [`F = 50 000 N. L = 2 m = 2000 mm. E = 200 GPa = 200 000 MPa (N/mm²).`],
      find: `The stress σ, the strain ε and the elongation δ.`,
      formula: `σ = F/A, &nbsp; ε = σ/E, &nbsp; δ = ε·L`,
      steps: [
        `A = π × 20² / 4 = 314.16 mm².`,
        `σ = 50 000 / 314.16 = 159.15 MPa.`,
        `ε = 159.15 / 200 000 = 7.958 × 10<sup>-4</sup>.`,
        `δ = ε × L = 7.958 × 10<sup>-4</sup> × 2000 = 1.592 mm.`,
        `Check with δ = FL/(AE) = 50 000 × 2000 / (314.16 × 200 000) = 1.592 mm. ✔`
      ],
      result: `σ = 159.2 MPa, ε = 7.96 × 10<sup>-4</sup> (about 0.08%), δ ≈ 1.59 mm`,
      interpretation: `The rod stretches about 1.6 mm over 2 m. If the assembly allows only 1 mm of movement, a larger diameter is needed: stiffness grows with area, so d would have to rise to about 25 mm.`
    },
    {
      title: `Change in diameter of a stretched bar (Poisson's ratio)`,
      given: [`Aluminium bar, diameter d = 25 mm.`, `Axial tensile strain ε<sub>axial</sub> = 0.001.`, `ν = 0.33.`],
      convert: [`Strain is dimensionless; d = 25 mm.`],
      find: `The lateral strain and the change in diameter.`,
      formula: `ε<sub>lateral</sub> = −ν · ε<sub>axial</sub>, &nbsp; Δd = ε<sub>lateral</sub> · d`,
      steps: [
        `ε<sub>lateral</sub> = −0.33 × 0.001 = −3.3 × 10<sup>-4</sup>.`,
        `Δd = −3.3 × 10<sup>-4</sup> × 25 = −0.00825 mm.`,
        `New diameter = 25 − 0.00825 = 24.99175 mm.`
      ],
      result: `ε<sub>lateral</sub> = −3.3 × 10<sup>-4</sup>; diameter reduces by 0.008 mm`,
      interpretation: `The reduction is tiny, but it matters for press fits, where clamping force depends on a few micrometres of interference, and for strain-gauge measurements.`
    },
    {
      title: `Shear modulus and bulk modulus of steel`,
      given: [`E = 200 GPa.`, `ν = 0.30.`],
      convert: [`All values already in GPa.`],
      find: `The shear modulus G and bulk modulus K.`,
      formula: `G = E / [2(1 + ν)], &nbsp; K = E / [3(1 − 2ν)]`,
      steps: [
        `G = 200 / [2 × (1 + 0.30)] = 200 / 2.6 = 76.92 GPa.`,
        `K = 200 / [3 × (1 − 0.60)] = 200 / 1.2 = 166.67 GPa.`
      ],
      result: `G ≈ 76.9 GPa, K ≈ 166.7 GPa`,
      interpretation: `G is used for torsion of shafts and springs (Chapters 6 and 14). Steel is much stiffer against uniform compression (K) than against shear (G).`
    },
    {
      title: `Principal stresses at a point`,
      given: [`σ<sub>x</sub> = 80 MPa, σ<sub>y</sub> = 20 MPa, τ<sub>xy</sub> = 30 MPa (all tension positive).`],
      convert: [`All stresses already in MPa.`],
      find: `The principal stresses σ<sub>1</sub>, σ<sub>2</sub>, the maximum shear stress and the principal angle.`,
      formula: `σ<sub>1,2</sub> = (σ<sub>x</sub> + σ<sub>y</sub>)/2 ± √[((σ<sub>x</sub> − σ<sub>y</sub>)/2)² + τ<sub>xy</sub>²]`,
      steps: [
        `Average stress = (80 + 20) / 2 = 50 MPa.`,
        `Radius R = √[((80 − 20)/2)² + 30²] = √(900 + 900) = 42.43 MPa.`,
        `σ<sub>1</sub> = 50 + 42.43 = 92.43 MPa.`,
        `σ<sub>2</sub> = 50 − 42.43 = 7.57 MPa.`,
        `τ<sub>max</sub> = R = 42.43 MPa.`,
        `tan 2θ<sub>p</sub> = 2 × 30 / (80 − 20) = 1, so 2θ<sub>p</sub> = 45° and θ<sub>p</sub> = 22.5°.`
      ],
      result: `σ<sub>1</sub> = 92.4 MPa, σ<sub>2</sub> = 7.6 MPa, τ<sub>max</sub> = 42.4 MPa, θ<sub>p</sub> = 22.5°`,
      interpretation: `The largest tensile stress (92.4 MPa) is higher than either applied normal stress. Design checks must use the principal stresses, compared with yield strength through a failure theory (Chapter 19).`
    }
  ],

  application: [
    `<strong>Bolted joints:</strong> the stretch of a bolt, δ = FL/(AE), sets how much clamp force the joint keeps as the parts settle.`,
    `<strong>Load cells and strain gauges:</strong> a gauge measures strain; the load is then F = ε·E·A.`,
    `<strong>Press fits and shrink fits:</strong> Poisson's ratio and E are used to compute the contact pressure and the change in diameter.`
  ],

  mistakes: [
    `Mixing GPa and MPa. 200 GPa is 200 000 MPa; using 200 gives an answer 1000 times too large.`,
    `Applying Hooke's law above the yield strength. Beyond yield, stress is no longer proportional to strain.`,
    `Using δ = FL/(AE) for a stepped bar as if it had one area. Add each segment separately.`,
    `Forgetting that stress concentrations at holes and shoulders raise the local stress well above F/A.`,
    `Treating percent strain as a decimal: 0.2% strain is 0.002, not 0.2.`
  ],

  interview: [
    [`What is Young's modulus and what does it tell you?`, `It is the ratio of stress to strain in the elastic range, the slope of the straight part of the stress–strain curve. A higher E means a stiffer material that deflects less under the same stress.`],
    [`What is Poisson's ratio?`, `The ratio of lateral strain to axial strain. For steel it is about 0.3: when stretched in length, the bar contracts sideways by about 0.3 times the axial strain.`],
    [`Difference between elastic and plastic deformation?`, `Elastic deformation disappears when the load is removed. Plastic deformation remains as permanent change of shape once the yield point has been exceeded.`],
    [`Why does a stiffer material not mean a stronger material?`, `Stiffness (E) controls deflection; strength (yield or ultimate stress) controls failure. For example, aluminium alloys can be as strong as some steels but have only one third of the stiffness.`],
    [`Why can Poisson's ratio not exceed 0.5 for an isotropic material?`, `Because K = E / [3(1 − 2ν)] would become negative (or infinite at 0.5), meaning the material would expand under uniform pressure, which is not physically stable. ν = 0.5 corresponds to an incompressible material such as rubber.`]
  ],

  practice: [
    [`1. A 1.5 m steel rod (E = 210 GPa) of 16 mm diameter carries 20 kN in tension. Find the elongation.`, `A = π × 16² / 4 = 201.06 mm². σ = 20 000 / 201.06 = 99.47 MPa. ε = 99.47 / 210 000 = 4.737 × 10<sup>-4</sup>. δ = 4.737 × 10<sup>-4</sup> × 1500 = <strong>0.71 mm</strong>.`],
    [`2. Aluminium has E = 70 GPa and ν = 0.33. Find G.`, `G = 70 / [2 × 1.33] = 70 / 2.66 = <strong>26.3 GPa</strong>.`],
    [`3. A 250 mm bar stretches 0.5 mm. Find the strain, and the stress predicted by Hooke's law if E = 200 GPa. Is the result valid for mild steel?`, `ε = 0.5 / 250 = <strong>0.002 (0.2%)</strong>. σ = 200 000 × 0.002 = 400 MPa. This is above the yield strength of mild steel (about 250 MPa), so <strong>Hooke's law does not apply</strong>: the bar has yielded and the actual stress is close to yield, not 400 MPa.`],
    [`4. Find the principal stresses for σ<sub>x</sub> = 100 MPa, σ<sub>y</sub> = −40 MPa, τ<sub>xy</sub> = 40 MPa.`, `Average = 30 MPa. R = √(70² + 40²) = √6500 = 80.62 MPa. σ<sub>1</sub> = <strong>110.6 MPa</strong>, σ<sub>2</sub> = <strong>−50.6 MPa</strong>, τ<sub>max</sub> = <strong>80.6 MPa</strong>.`],
    [`5. A 2 m long bar of area 400 mm² (E = 200 GPa) must stretch no more than 1 mm. What is the maximum axial load?`, `F = δ·A·E / L = 1 × 400 × 200 000 / 2000 = 40 000 N = <strong>40 kN</strong>.`]
  ]
};
