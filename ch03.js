/* =====================================================================
   ch03.js  -  CHAPTER 3: Strength of Materials
   (Same structure as ch01.js - see the comments there.)
   ===================================================================== */
window.CHAPTERS = window.CHAPTERS || {};

window.CHAPTERS[3] = {

  def: `Strength of materials studies how solid bodies resist loads without breaking or deforming too much. It links the <strong>external load</strong> on a part to the <strong>internal stress</strong> inside it, and compares that stress with what the material can safely carry. The basic idea of the whole subject: <em>stress in the part must stay below the allowable stress of the material.</em>`,

  purpose: [
    `Calculate the stress in rods, pins, bolts, rivets, plates and brackets under tension, compression and shear.`,
    `Choose a size (diameter, thickness, area) so that the stress stays within a safe limit.`,
    `Compare different materials by yield strength, ultimate strength and factor of safety.`,
    `Decide which failure is most likely: breaking the bar, shearing the pin or crushing the hole.`,
    `Industrial use: sizing tie rods, clevis pins, shear pins, lifting lugs, fastened plates and machine frames.`
  ],

  terms: [
    [`Stress (σ, τ)`, `Internal force per unit area. Normal stress σ acts perpendicular to the section; shear stress τ acts along (parallel to) the section. Unit: MPa = N/mm².`],
    [`Tension and compression`, `Axial loads that pull a member apart (tension) or squeeze it together (compression).`],
    [`Shear`, `Loading that tends to slide one part of a body past the neighbouring part, such as a pin cut between two plates.`],
    [`Single shear and double shear`, `A pin or bolt resists the load across one cross-section (single shear) or across two sections (double shear). Double shear carries twice the load for the same stress.`],
    [`Bearing stress`, `Contact pressure between a pin or bolt and the wall of its hole, based on the projected area d × t.`],
    [`Yield strength (σ<sub>y</sub>)`, `The stress at which a ductile material starts to deform permanently.`],
    [`Ultimate tensile strength (σ<sub>u</sub>)`, `The maximum stress a material reaches in a tensile test before it fractures.`],
    [`Allowable stress`, `The stress permitted in design, equal to the strength divided by the factor of safety.`],
    [`Factor of safety (FOS)`, `Ratio of the strength of the material to the stress actually expected in service. It covers uncertainty in load, material and manufacturing.`],
    [`Stiffness and strength`, `Strength is how much load a part can carry before failing. Stiffness is how little it deflects under load (see Chapter 4).`]
  ],

  units: {
    intro: `Stress is force per area. With force in N and area in mm², the result is directly in MPa.`,
    head: [`Quantity`, `SI unit`, `Symbol`, `Notes`],
    rows: [
      [`Force`, `newton`, `N`, `1 kN = 1000 N`],
      [`Area`, `square millimetre (practical)`, `mm²`, `1 m² = 10<sup>6</sup> mm²`],
      [`Stress`, `pascal (practical: megapascal)`, `Pa, MPa`, `1 MPa = 1 N/mm² = 10<sup>6</sup> Pa`],
      [`Pressure on a surface`, `pascal`, `Pa`, `1 bar = 0.1 MPa; 1 psi = 0.006895 MPa`],
      [`Factor of safety`, `none`, `FOS`, `Dimensionless`]
    ],
    notes: [`Convert diameters in m or inches to mm before using the formulas.`]
  },

  formulas: [
    {
      name: `Normal stress (tension or compression)`,
      eq: `σ = F / A`,
      symbols: [
        [`σ`, `Normal stress`, `MPa (N/mm²)`],
        [`F`, `Axial force, acting through the centroid`, `N`],
        [`A`, `Cross-sectional area perpendicular to the force (for a round bar A = πd²/4)`, `mm²`]
      ],
      assumptions: [
        `Load acts along the axis through the centroid of the section; stress is uniform over the section.`,
        `Valid away from the ends and away from holes, notches and shoulders where stress concentrations raise the local stress.`,
        `For long slender compression members, buckling may govern, not σ = F/A.`
      ]
    },
    {
      name: `Average shear stress`,
      eq: `τ = F / A<sub>s</sub>`,
      note: `Single shear: A<sub>s</sub> = πd²/4. Double shear: A<sub>s</sub> = 2 × πd²/4.`,
      symbols: [
        [`τ`, `Average shear stress`, `MPa`],
        [`F`, `Shear force`, `N`],
        [`A<sub>s</sub>`, `Area resisting the shear (sum of all sheared sections)`, `mm²`]
      ],
      assumptions: [`Stress is assumed uniform across the sheared area; the real maximum is higher.`, `Pin and bolt joints with a clearance fit or a tight fit may share load differently.`]
    },
    {
      name: `Bearing stress`,
      eq: `σ<sub>b</sub> = F / (d × t)`,
      symbols: [
        [`σ<sub>b</sub>`, `Bearing (contact) stress`, `MPa`],
        [`F`, `Load transferred by the pin or bolt`, `N`],
        [`d`, `Pin or bolt diameter`, `mm`],
        [`t`, `Thickness of the plate that bears on the pin`, `mm`]
      ],
      assumptions: [`Uses the projected area d × t and assumes uniform pressure.`, `Check against the allowable bearing stress of the weaker of the two materials.`]
    },
    {
      name: `Factor of safety and allowable stress`,
      eq: `FOS = σ<sub>strength</sub> / σ<sub>working</sub> &nbsp;&nbsp; σ<sub>allow</sub> = σ<sub>y</sub> / FOS`,
      note: `Use yield strength σ<sub>y</sub> for ductile materials and ultimate strength σ<sub>u</sub> for brittle materials such as cast iron.`,
      symbols: [
        [`FOS`, `Factor of safety`, `dimensionless`],
        [`σ<sub>y</sub>`, `Yield strength of the material`, `MPa`],
        [`σ<sub>allow</sub>`, `Allowable stress`, `MPa`],
        [`σ<sub>working</sub>`, `Calculated stress under service load`, `MPa`]
      ],
      assumptions: [`Choice of FOS depends on certainty of loads, consequence of failure and the code or standard that applies.`, `Static loading only. Repeated loading needs fatigue analysis (Chapter 19).`]
    },
    {
      name: `Required area for a given load`,
      eq: `A<sub>req</sub> = F / σ<sub>allow</sub> &nbsp;&nbsp; d<sub>req</sub> = √(4A<sub>req</sub> / π)`,
      symbols: [
        [`A<sub>req</sub>`, `Minimum cross-sectional area`, `mm²`],
        [`d<sub>req</sub>`, `Minimum diameter of a solid round bar`, `mm`],
        [`F`, `Design load`, `N`],
        [`σ<sub>allow</sub>`, `Allowable stress`, `MPa`]
      ],
      assumptions: [`Round the result up to the next standard size, never down.`, `Remember to check the net area if a hole or thread reduces the section.`]
    }
  ],

  diagram: {
    caption: `A bar in tension. Cutting it at section A–A shows that the internal force equals F and is spread over the area A, giving σ = F / A.`,
    svg: `<svg viewBox="0 0 580 230" role="img" aria-label="A bar loaded in tension with a section cut A-A showing internal stress sigma equals F over A">
      <defs><marker id="ah3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ff7a1a"/></marker></defs>
      <rect x="150" y="70" width="280" height="46" class="dg-fill"/>
      <line x1="30" y1="93" x2="148" y2="93" class="dg-or" marker-end="url(#ah3)" transform="translate(0 0)"/>
      <line x1="432" y1="93" x2="550" y2="93" class="dg-or" marker-end="url(#ah3)"/>
      <text x="80" y="82" class="dg-tx-or">F</text>
      <text x="488" y="82" class="dg-tx-or">F</text>
      <line x1="290" y1="45" x2="290" y2="142" class="dg-dash"/>
      <text x="270" y="38" class="dg-tx">A – A</text>
      <g class="dg-or">
        <line x1="290" y1="80" x2="316" y2="80" marker-end="url(#ah3)"/>
        <line x1="290" y1="93" x2="316" y2="93" marker-end="url(#ah3)"/>
        <line x1="290" y1="106" x2="316" y2="106" marker-end="url(#ah3)"/>
      </g>
      <text x="300" y="168" class="dg-tx">area A</text>
      <text x="196" y="200" class="dg-tx-or">σ = F / A</text>
      <text x="196" y="218" class="dg-tx-sm">F in N, A in mm², σ in MPa</text>
      <text x="408" y="150" class="dg-tx-sm">bar</text>
    </svg>`
  },

  derivation: {
    title: `why σ = F / A and how to size a bar`,
    steps: [
      `Take a bar in equilibrium under an axial pull F at each end.`,
      `Cut the bar with an imaginary plane perpendicular to its axis. Each piece must also be in equilibrium.`,
      `For the left piece, equilibrium along the axis needs an internal force on the cut face equal to F.`,
      `If that internal force is spread uniformly over the cut area A (valid away from the ends, by Saint-Venant's principle), the force per unit area is <strong>σ = F / A</strong>.`,
      `For safe design require σ ≤ σ<sub>allow</sub>. Rearranging gives the minimum area <strong>A = F / σ<sub>allow</sub></strong>.`,
      `For a solid round bar A = πd²/4, so the minimum diameter is <strong>d = √(4A / π)</strong>.`
    ]
  },

  examples: [
    {
      title: `Tensile stress in a tie rod`,
      given: [`Round tie rod, diameter d = 20 mm.`, `Axial tensile load F = 50 kN.`],
      convert: [`F = 50 kN = 50 000 N. d = 20 mm (already mm).`],
      find: `The tensile stress σ in MPa.`,
      formula: `σ = F / A, &nbsp; A = πd²/4`,
      steps: [
        `A = π × 20² / 4 = 314.16 mm².`,
        `σ = 50 000 / 314.16 = 159.15 MPa.`
      ],
      result: `σ ≈ 159 MPa`,
      interpretation: `For mild steel with yield strength about 250 MPa this gives a factor of safety of 250 / 159.15 = 1.57, which is low for most designs. A larger rod or stronger steel would normally be chosen (see Example 3).`
    },
    {
      title: `Shear stress in a clevis pin (single and double shear)`,
      given: [`Pin diameter d = 12 mm.`, `Shear force F = 8 kN.`],
      convert: [`F = 8 kN = 8000 N.`],
      find: `The shear stress when the pin is in (a) single shear and (b) double shear.`,
      formula: `τ = F / A<sub>s</sub>`,
      steps: [
        `Pin area = π × 12² / 4 = 113.10 mm².`,
        `(a) Single shear: A<sub>s</sub> = 113.10 mm², so τ = 8000 / 113.10 = 70.74 MPa.`,
        `(b) Double shear: A<sub>s</sub> = 2 × 113.10 = 226.19 mm², so τ = 8000 / 226.19 = 35.37 MPa.`
      ],
      result: `(a) τ ≈ 70.7 MPa &nbsp;&nbsp; (b) τ ≈ 35.4 MPa`,
      interpretation: `Moving from single to double shear halves the stress. This is why clevis joints, with a pin passing through two ears, are preferred over single lap joints for heavy loads.`
    },
    {
      title: `Sizing a rod with a factor of safety`,
      given: [`Axial load F = 50 kN.`, `Rod material yield strength σ<sub>y</sub> = 250 MPa.`, `Required factor of safety FOS = 2.`],
      convert: [`F = 50 000 N, σ<sub>y</sub> = 250 N/mm².`],
      find: `The minimum rod diameter and the actual factor of safety for a standard rod size.`,
      formula: `σ<sub>allow</sub> = σ<sub>y</sub>/FOS, &nbsp; A = F/σ<sub>allow</sub>, &nbsp; d = √(4A/π)`,
      steps: [
        `σ<sub>allow</sub> = 250 / 2 = 125 MPa.`,
        `A<sub>req</sub> = 50 000 / 125 = 400 mm².`,
        `d<sub>req</sub> = √(4 × 400 / π) = √509.3 = 22.57 mm.`,
        `Choose the next standard size, 24 mm. A = π × 24² / 4 = 452.4 mm².`,
        `Actual σ = 50 000 / 452.4 = 110.5 MPa, so actual FOS = 250 / 110.5 = 2.26.`
      ],
      result: `d<sub>min</sub> = 22.6 mm; use a 24 mm rod (actual FOS ≈ 2.26)`,
      interpretation: `Rounding up to a standard size always gives a factor of safety slightly above the target. If the rod is threaded at the ends, the smaller thread root area must also be checked.`
    },
    {
      title: `Bearing stress of a pin in a plate`,
      given: [`Pin diameter d = 16 mm in a plate of thickness t = 10 mm.`, `Load F = 12 kN.`],
      convert: [`F = 12 000 N.`],
      find: `The bearing stress between the pin and the plate.`,
      formula: `σ<sub>b</sub> = F / (d × t)`,
      steps: [
        `Projected area = d × t = 16 × 10 = 160 mm².`,
        `σ<sub>b</sub> = 12 000 / 160 = 75 MPa.`
      ],
      result: `σ<sub>b</sub> = 75 MPa`,
      interpretation: `Compare 75 MPa with the allowable bearing stress of the plate and the pin material. If it is too high, use a thicker plate, a larger pin or a bushing; otherwise the hole will elongate in service.`
    }
  ],

  application: [
    `<strong>Lifting lugs and tie rods:</strong> sized from σ = F/A with a factor of safety set by the lifting code or company standard.`,
    `<strong>Shear pins and clevis joints:</strong> pins are checked in shear and the holes in bearing; double shear halves the shear stress.`,
    `<strong>Overload protection:</strong> a deliberately weak shear pin protects a gearbox. The pin is sized so that it shears at a chosen torque.`
  ],

  mistakes: [
    `Using the wrong area: the net area at a hole or thread root is smaller than the gross area.`,
    `Forgetting that single and double shear use different areas.`,
    `Using ultimate strength for ductile materials in a static design that should be based on yield.`,
    `Checking only the rod and ignoring the pin in shear and the hole in bearing. The weakest link governs.`,
    `Rounding the diameter down to a standard size. Always round up.`
  ],

  interview: [
    [`What is the difference between stress and strength?`, `Stress is the internal load per unit area caused by the applied load. Strength is the maximum stress a material can withstand. Design requires stress < strength / factor of safety.`],
    [`What is single shear and double shear?`, `In single shear, the pin is cut across one section. In double shear it is cut across two sections, so the resisting area doubles and the shear stress halves for the same load.`],
    [`Why is bearing stress checked in pin joints?`, `The load passes from pin to plate through the contact area. If the bearing stress is too high the hole deforms and the joint becomes loose, even though the pin is not sheared.`],
    [`How do you choose a factor of safety?`, `From the certainty of the loads and material data, the consequence of failure, and the applicable standard. Typical static values for steel are about 1.5 to 3, higher for lifting equipment or when loads are uncertain.`],
    [`Why use yield strength for ductile materials but ultimate strength for brittle ones?`, `A ductile part becomes unusable once it yields, which happens well before it breaks. A brittle material gives no yield warning and fails at its ultimate strength.`]
  ],

  practice: [
    [`1. A 25 mm × 10 mm flat bar carries 30 kN in tension. Find the stress.`, `A = 25 × 10 = 250 mm². σ = 30 000 / 250 = <strong>120 MPa</strong>.`],
    [`2. A 10 mm rivet in single shear has an allowable shear stress of 60 MPa. What is the maximum load?`, `A = π × 10² / 4 = 78.54 mm². F = 60 × 78.54 = 4712 N = <strong>4.71 kN</strong>.`],
    [`3. A 16 mm bolt in double shear carries 40 kN. Find the shear stress.`, `A<sub>s</sub> = 2 × π × 16² / 4 = 2 × 201.06 = 402.12 mm². τ = 40 000 / 402.12 = <strong>99.5 MPa</strong>.`],
    [`4. A 20 mm pin passes through an 8 mm thick plate and transmits 20 kN. Find the bearing stress.`, `σ<sub>b</sub> = 20 000 / (20 × 8) = <strong>125 MPa</strong>.`],
    [`5. A rod carries 30 kN. Material σ<sub>y</sub> = 300 MPa, FOS = 2.5. Find the minimum diameter.`, `σ<sub>allow</sub> = 300 / 2.5 = 120 MPa. A = 30 000 / 120 = 250 mm². d = √(4 × 250 / π) = <strong>17.84 mm</strong> (use 18 mm).`]
  ]
};
