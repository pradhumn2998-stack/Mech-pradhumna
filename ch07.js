/* =====================================================================
   ch07.js  -  CHAPTER 7: Beam Design and Deflection
   (Same structure as ch01.js - see the comments there.)
   ===================================================================== */
window.CHAPTERS = window.CHAPTERS || {};

window.CHAPTERS[7] = {

  def: `<strong>Beam design</strong> is the selection of a section shape, size and material so that a beam is both <em>strong enough</em> (bending and shear stress below the allowable values) and <em>stiff enough</em> (deflection below a limit). <strong>Deflection</strong> is the vertical displacement of the beam axis under load, and the <strong>slope</strong> is the angle that the axis makes with its original position. A beam can be safe against breaking yet unusable because it sags too much, so both checks are needed.`,

  purpose: [
    `Predict how much a beam, shaft, arm or frame member bends under load so that parts stay aligned.`,
    `Choose the smallest section that satisfies both stress and deflection limits.`,
    `Check shaft slope at bearings and gears. Too much slope at a bearing reduces its life and spoils gear contact.`,
    `Compare sections and materials by stiffness (E·I), not just by strength.`,
    `Industrial use: machine-tool beds and columns, spindles, lifting beams, conveyor frames, robot arms, press frames and shafts between bearings.`
  ],

  terms: [
    [`Deflection (δ)`, `The displacement of a point on the beam axis from its original position, measured perpendicular to the beam. Unit: mm.`],
    [`Slope (θ)`, `The angle between the deflected axis and the original axis at a point, in radians. For small deflections θ ≈ dy/dx.`],
    [`Elastic curve`, `The deflected shape of the beam axis.`],
    [`Flexural rigidity (E·I)`, `The product of Young's modulus and the second moment of area. The bigger E·I is, the stiffer the beam. Unit: N·mm².`],
    [`Serviceability limit`, `The maximum deflection allowed for the beam to work properly, for example to keep gears meshing, avoid contact with other parts or avoid visible sag.`],
    [`Double integration method`, `Finding slope and deflection by integrating the bending moment equation twice and using boundary conditions.`],
    [`Boundary conditions`, `Known values of deflection or slope at supports, for example zero deflection at a pin, or zero slope and deflection at a fixed end.`],
    [`Superposition`, `For a linear elastic beam, the deflection from several loads equals the sum of the deflections from each load acting alone.`],
    [`Macaulay's method`, `A way of writing one bending moment equation for the whole beam, even with several point loads, so that double integration is simpler.`],
    [`Statically indeterminate beam`, `A beam with more reactions than the equations of equilibrium can solve (for example fixed at both ends). The deflection conditions are needed as extra equations.`]
  ],

  units: {
    intro: `Use N, mm and MPa throughout so that the deflection comes out in millimetres.`,
    head: [`Quantity`, `Use`, `Symbol`, `Useful conversions`],
    rows: [
      [`Load`, `newton`, `P`, `1 kN = 1000 N`],
      [`Distributed load`, `newton per millimetre`, `w`, `1 kN/m = 1 N/mm`],
      [`Length and span`, `millimetre`, `L`, `1 m = 1000 mm`],
      [`Young's modulus`, `megapascal`, `E`, `1 GPa = 1000 MPa; steel E ≈ 200 000 MPa`],
      [`Second moment of area`, `millimetre to the fourth`, `I`, `1 cm⁴ = 10⁴ mm⁴`],
      [`Deflection`, `millimetre`, `δ`, `Result of the formulas`],
      [`Slope`, `radian`, `θ`, `1 rad = 57.30°`]
    ],
    notes: [
      `<strong>Common error:</strong> in δ = PL³/(48EI) every term must be in N and mm. If L is in m, convert to mm first, because L is raised to the third or fourth power.`,
      `Deflection depends on the cube or the fourth power of the span, so a small error in L gives a large error in δ.`
    ]
  },

  formulas: [
    {
      name: `Differential equation of the elastic curve`,
      eq: `E·I · d²y/dx² = M(x)`,
      note: `Integrate once for the slope (E·I·dy/dx) and twice for the deflection (E·I·y). Constants are found from the boundary conditions. With sagging moment positive and y measured upward, a downward deflection comes out negative; the answers are quoted as magnitudes.`,
      symbols: [
        [`E`, `Young's modulus`, `MPa`],
        [`I`, `Second moment of area about the neutral axis`, `mm⁴`],
        [`y`, `Deflection at distance x`, `mm`],
        [`x`, `Distance along the beam`, `mm`],
        [`M(x)`, `Bending moment as a function of x`, `N·mm`]
      ],
      assumptions: [`Small deflections (slope much less than 1), so the curvature is d²y/dx².`, `Linear elastic material and a prismatic beam (constant E·I). For a varying section, E·I stays inside the integral.`, `Deflection due to shear is ignored, which is acceptable for slender beams (span at least about 10 times the depth).`]
    },
    {
      name: `Simply supported beam: central point load`,
      eq: `δ<sub>max</sub> = P·L³ / (48·E·I) &nbsp;&nbsp; θ<sub>end</sub> = P·L² / (16·E·I)`,
      note: `δ<sub>max</sub> is at midspan; the maximum slope is at the supports.`,
      symbols: [
        [`P`, `Load at midspan`, `N`],
        [`L`, `Span`, `mm`],
        [`E·I`, `Flexural rigidity`, `N·mm²`],
        [`δ<sub>max</sub>`, `Maximum deflection`, `mm`],
        [`θ<sub>end</sub>`, `Slope at each support`, `rad`]
      ],
      assumptions: [`Load at the exact centre. Beam weight neglected or included in P.`, `Rigid, frictionless supports.`]
    },
    {
      name: `Simply supported beam: uniformly distributed load`,
      eq: `δ<sub>max</sub> = 5·w·L⁴ / (384·E·I) &nbsp;&nbsp; θ<sub>end</sub> = w·L³ / (24·E·I)`,
      symbols: [
        [`w`, `Load per unit length (N/mm)`, `N/mm`],
        [`L`, `Span`, `mm`],
        [`E·I`, `Flexural rigidity`, `N·mm²`],
        [`δ<sub>max</sub>`, `Maximum deflection at midspan`, `mm`]
      ],
      assumptions: [`UDL over the whole span.`, `The beam's own weight is also a UDL (mass per metre × 9.81) and can be added to w.`]
    },
    {
      name: `Cantilever: end load`,
      eq: `δ<sub>max</sub> = P·L³ / (3·E·I) &nbsp;&nbsp; θ<sub>max</sub> = P·L² / (2·E·I)`,
      note: `The maximum deflection and slope are at the free end.`,
      symbols: [
        [`P`, `Load at the free end`, `N`],
        [`L`, `Length of the cantilever`, `mm`],
        [`δ<sub>max</sub>`, `Deflection at the free end`, `mm`],
        [`θ<sub>max</sub>`, `Slope at the free end`, `rad`]
      ],
      assumptions: [`Fixed end is perfectly rigid. A real support rotates slightly and increases the tip deflection.`]
    },
    {
      name: `Cantilever: uniformly distributed load`,
      eq: `δ<sub>max</sub> = w·L⁴ / (8·E·I) &nbsp;&nbsp; θ<sub>max</sub> = w·L³ / (6·E·I)`,
      symbols: [
        [`w`, `Load per unit length`, `N/mm`],
        [`L`, `Length of the cantilever`, `mm`],
        [`δ<sub>max</sub>`, `Deflection at the free end`, `mm`],
        [`θ<sub>max</sub>`, `Slope at the free end`, `rad`]
      ],
      assumptions: [`UDL over the full length.`, `For combined loads, add the deflections of each case (superposition).`]
    },
    {
      name: `Design requirements: strength and stiffness`,
      eq: `Z<sub>req</sub> = M<sub>max</sub> / σ<sub>allow</sub> &nbsp;&nbsp; I<sub>req</sub> = P·L³ / (48·E·δ<sub>allow</sub>)`,
      note: `The second form is for a simply supported beam with a central load. For other cases use the matching deflection formula, solved for I. The larger required value governs.`,
      symbols: [
        [`Z<sub>req</sub>`, `Minimum section modulus for strength`, `mm³`],
        [`M<sub>max</sub>`, `Maximum bending moment (Chapter 5)`, `N·mm`],
        [`σ<sub>allow</sub>`, `Allowable bending stress`, `MPa`],
        [`I<sub>req</sub>`, `Minimum second moment of area for stiffness`, `mm⁴`],
        [`δ<sub>allow</sub>`, `Allowed deflection`, `mm`]
      ],
      assumptions: [`Deflection limits depend on the application: building floors often use a rule of thumb such as L/360, while machine-tool and precision parts need much tighter limits. Take the value from your standard, data book or the function of the machine.`, `Always calculate both requirements and use the section that satisfies the larger one.`]
    }
  ],

  reference: {
    title: `Maximum deflection and slope of standard beam cases`,
    intro: `E·I is constant. Use N and mm. The beam weight is neglected.`,
    head: [`Beam and loading`, `Maximum deflection`, `Where`, `Maximum slope`],
    rows: [
      [`Simply supported, central point load P`, `P L³ / (48 E I)`, `midspan`, `P L² / (16 E I) at supports`],
      [`Simply supported, UDL w`, `5 w L⁴ / (384 E I)`, `midspan`, `w L³ / (24 E I) at supports`],
      [`Cantilever, end load P`, `P L³ / (3 E I)`, `free end`, `P L² / (2 E I) at free end`],
      [`Cantilever, UDL w`, `w L⁴ / (8 E I)`, `free end`, `w L³ / (6 E I) at free end`]
    ],
    note: `Deflection grows with L³ or L⁴ and falls with the product E·I. Doubling the span multiplies the deflection of a beam with a central load by 8.`
  },

  diagram: {
    caption: `Deflected shape of a simply supported beam with a central load P (deflection exaggerated). The maximum deflection δ<sub>max</sub> is at midspan, and the maximum slope θ is at the supports.`,
    svg: `<svg viewBox="0 0 600 270" role="img" aria-label="Simply supported beam with a central load, dashed original axis, curved deflected shape with maximum deflection at midspan, and slope at the support">
      <defs>
        <marker id="ah7" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ff7a1a"/></marker>
        <marker id="ah7g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#566178"/></marker>
      </defs>
      <line x1="300" y1="26" x2="300" y2="104" class="dg-or" marker-end="url(#ah7)"/>
      <text x="312" y="48" class="dg-tx-or">P</text>
      <line x1="60" y1="110" x2="540" y2="110" class="dg-dash"/>
      <path d="M60 110 Q300 190 540 110" class="dg-ln" stroke-width="5"/>
      <path d="M60 110 L46 134 L74 134 Z" class="dg-fill"/>
      <path d="M540 110 L526 134 L554 134 Z" class="dg-fill"/>
      <circle cx="540" cy="139" r="5" class="dg-fill"/>
      <line x1="30" y1="146" x2="90" y2="146" class="dg-ln"/>
      <line x1="510" y1="148" x2="570" y2="148" class="dg-ln"/>
      <line x1="60" y1="110" x2="170" y2="147" class="dg-or" stroke-dasharray="6 4"/>
      <text x="118" y="116" class="dg-tx-or">θ</text>
      <line x1="338" y1="110" x2="338" y2="150" class="dg-thin" marker-start="url(#ah7g)" marker-end="url(#ah7g)"/>
      <text x="346" y="136" class="dg-tx">δ<tspan font-size="11" dy="4">max</tspan></text>
      <line x1="60" y1="174" x2="540" y2="174" class="dg-thin" marker-start="url(#ah7g)" marker-end="url(#ah7g)"/>
      <text x="296" y="190" class="dg-tx">L</text>
      <text x="60" y="222" class="dg-tx-or">δ<tspan font-size="11" dy="4">max</tspan><tspan dy="-4"> = P L³ / (48 E I)</tspan></text>
      <text x="340" y="222" class="dg-tx-or">θ = P L² / (16 E I)</text>
      <text x="60" y="250" class="dg-tx-sm">E I is the flexural rigidity (N·mm²). Use N and mm so δ comes out in mm.</text>
    </svg>`
  },

  derivation: {
    title: `deflection of a cantilever with an end load by double integration`,
    steps: [
      `Fix the beam at x = 0 and let the load P act downward at the free end x = L. The bending moment at a section x is hogging: <strong>M(x) = −P·(L − x)</strong>.`,
      `Write the elastic curve equation: E·I·d²y/dx² = −P·(L − x).`,
      `Integrate once: E·I·dy/dx = −P·(L·x − x²/2) + C<sub>1</sub>. At the fixed end the slope is zero, dy/dx = 0 at x = 0, so C<sub>1</sub> = 0.`,
      `Integrate again: E·I·y = −P·(L·x²/2 − x³/6) + C<sub>2</sub>. At the fixed end the deflection is zero, y = 0 at x = 0, so C<sub>2</sub> = 0.`,
      `At the free end x = L: E·I·y = −P·(L³/2 − L³/6) = −P·L³/3. So y = −P·L³ / (3·E·I). The minus sign means downward; the magnitude is <strong>δ<sub>max</sub> = P·L³ / (3·E·I)</strong>.`,
      `The slope at the free end is dy/dx = −P·(L² − L²/2) / (E·I) = −P·L² / (2·E·I), so the magnitude is <strong>θ<sub>max</sub> = P·L² / (2·E·I)</strong>.`
    ]
  },

  examples: [
    {
      title: `Deflection and stress of a simply supported rectangular beam`,
      given: [`Steel beam, span L = 3 m, central point load P = 10 kN.`, `Rectangular section b = 50 mm, h = 100 mm (h is the depth).`, `E = 200 GPa.`],
      convert: [`P = 10 000 N. L = 3000 mm. E = 200 000 MPa.`, `I = b·h³/12 = 50 × 100³ / 12 = 4.1667 × 10<sup>6</sup> mm⁴.`],
      find: `The maximum deflection, the deflection-to-span ratio and the bending stress.`,
      formula: `δ<sub>max</sub> = P·L³ / (48·E·I), &nbsp; σ = M / Z, &nbsp; M = P·L / 4`,
      steps: [
        `L³ = 3000³ = 2.7 × 10<sup>10</sup> mm³. P·L³ = 10 000 × 2.7 × 10<sup>10</sup> = 2.7 × 10<sup>14</sup>.`,
        `48·E·I = 48 × 200 000 × 4.1667 × 10<sup>6</sup> = 4.0 × 10<sup>13</sup>.`,
        `δ<sub>max</sub> = 2.7 × 10<sup>14</sup> / 4.0 × 10<sup>13</sup> = 6.75 mm.`,
        `L / δ = 3000 / 6.75 = 444, so δ = L/444.`,
        `M = P·L/4 = 10 000 × 3000 / 4 = 7.5 × 10<sup>6</sup> N·mm. Z = 50 × 100² / 6 = 83 333 mm³. σ = 7.5 × 10<sup>6</sup> / 83 333 = 90 MPa.`
      ],
      result: `δ<sub>max</sub> = 6.75 mm (L/444); σ = 90 MPa`,
      interpretation: `The stress is moderate for steel and the sag is within a general-purpose limit such as L/360, but 6.75 mm would be far too much for a machine bed or a shaft. The deflection check can govern even when the stress is safe.`
    },
    {
      title: `Cantilever shaft arm with a UDL`,
      given: [`Steel cantilever, solid round, d = 50 mm, length L = 1 m.`, `UDL w = 1 kN/m.`, `E = 200 GPa.`],
      convert: [`L = 1000 mm. w = 1 kN/m = 1 N/mm. E = 200 000 MPa.`, `I = π d⁴ / 64 = π × 50⁴ / 64 = 306 796 mm⁴.`],
      find: `The tip deflection, the slope at the free end and the maximum bending stress.`,
      formula: `δ = w·L⁴ / (8·E·I), &nbsp; θ = w·L³ / (6·E·I), &nbsp; σ = M / Z`,
      steps: [
        `δ = 1 × 1000⁴ / (8 × 200 000 × 306 796) = 1 × 10<sup>12</sup> / 4.9087 × 10<sup>11</sup> = 2.04 mm.`,
        `θ = 1 × 1000³ / (6 × 200 000 × 306 796) = 1 × 10<sup>9</sup> / 3.6816 × 10<sup>11</sup> = 0.002716 rad = 0.156°.`,
        `M<sub>max</sub> = w·L²/2 = 1 × 1000² / 2 = 500 000 N·mm.`,
        `Z = π × 50³ / 32 = 12 272 mm³. σ = 500 000 / 12 272 = 40.7 MPa.`
      ],
      result: `δ ≈ 2.04 mm; θ ≈ 0.0027 rad (0.16°); σ ≈ 40.7 MPa`,
      interpretation: `The stress is low, but 2 mm at the tip may still matter for an alignment-critical arm. Halving the length would reduce the tip deflection 16 times (L⁴), a far bigger effect than any change in material.`
    },
    {
      title: `Sizing a beam for a deflection limit`,
      given: [`Simply supported steel beam, L = 2 m, central load P = 8 kN.`, `Allowed deflection δ<sub>allow</sub> = 1 mm.`, `Rectangular section with b = 40 mm.`, `E = 200 GPa and σ<sub>allow</sub> = 120 MPa.`],
      convert: [`P = 8000 N. L = 2000 mm. E = 200 000 MPa.`],
      find: `The minimum depth h that meets the deflection limit, and then the bending stress check.`,
      formula: `I<sub>req</sub> = P·L³ / (48·E·δ<sub>allow</sub>), &nbsp; h = (12·I / b)<sup>1/3</sup>`,
      steps: [
        `I<sub>req</sub> = 8000 × 2000³ / (48 × 200 000 × 1) = 6.4 × 10<sup>13</sup> / 9.6 × 10<sup>6</sup> = 6.667 × 10<sup>6</sup> mm⁴.`,
        `h³ = 12 × I / b = 12 × 6.667 × 10<sup>6</sup> / 40 = 2.0 × 10<sup>6</sup> mm³, so h = 126 mm. Choose h = 130 mm.`,
        `Actual I = 40 × 130³ / 12 = 7.323 × 10<sup>6</sup> mm⁴. Actual δ = 6.4 × 10<sup>13</sup> / (9.6 × 10<sup>6</sup> × 7.323 × 10<sup>6</sup>) = 0.91 mm.`,
        `Strength check: M = P·L/4 = 8000 × 2000 / 4 = 4 × 10<sup>6</sup> N·mm. Z = 40 × 130² / 6 = 112 667 mm³. σ = 4 × 10<sup>6</sup> / 112 667 = 35.5 MPa.`
      ],
      result: `Use h = 130 mm: δ = 0.91 mm (limit 1 mm), σ = 35.5 MPa (limit 120 MPa)`,
      interpretation: `Stiffness governs. A section chosen for strength alone would need Z = 4 × 10<sup>6</sup> / 120 = 33 333 mm³, giving h of only about 71 mm. That beam would deflect about 5.6 mm, more than five times the allowed value. Always check both.`
    },
    {
      title: `Same beam in steel and aluminium`,
      given: [`The beam of Example 1 (L = 3000 mm, P = 10 000 N, I = 4.1667 × 10<sup>6</sup> mm⁴).`, `Aluminium alloy with E = 70 GPa instead of steel (200 GPa).`],
      convert: [`E<sub>Al</sub> = 70 000 MPa.`],
      find: `The deflection and stress in aluminium, compared with steel.`,
      formula: `δ = P·L³ / (48·E·I), &nbsp; σ = M / Z`,
      steps: [
        `δ<sub>Al</sub> = 2.7 × 10<sup>14</sup> / (48 × 70 000 × 4.1667 × 10<sup>6</sup>) = 2.7 × 10<sup>14</sup> / 1.4 × 10<sup>13</sup> = 19.29 mm.`,
        `Ratio to steel: 19.29 / 6.75 = 2.86 = 200 / 70.`,
        `Stress does not depend on E: σ = M / Z = 90 MPa, the same as in steel.`
      ],
      result: `δ<sub>Al</sub> ≈ 19.3 mm (2.86 times the steel beam); σ = 90 MPa for both`,
      interpretation: `Deflection is inversely proportional to E, while stress depends only on the loads and the section. An aluminium beam must be made deeper (the depth enters as h³) to match the stiffness of steel. Matching 6.75 mm needs I about 2.86 times larger, or h about 42% greater.`
    }
  ],

  application: [
    `<strong>Machine tool beds, columns and spindles:</strong> deflection of the structure, not stress, decides the cutting accuracy. The design aims at a required E·I.`,
    `<strong>Shafts with gears and bearings:</strong> the slope at the bearings and the deflection at the gears are checked against limits so that the gears mesh properly and the bearings do not carry edge loads.`,
    `<strong>Lifting beams, conveyors and frames:</strong> a deflection limit such as a fraction of the span avoids visible sag, vibration and binding of moving parts.`
  ],

  mistakes: [
    `Mixing units: using m for L and mm for I, or kN with MPa. Convert everything to N and mm.`,
    `Forgetting that L is cubed or raised to the fourth power. A small error in the span becomes a large error in deflection.`,
    `Checking stress only. A beam can be safe against yielding but too flexible for the application.`,
    `Using the wrong formula for the loading, for example the point-load formula for a UDL. Check the load type and support type first.`,
    `Using b and h the wrong way round in I = b·h³/12. The depth h is measured in the direction of the load.`,
    `Ignoring the weight of the beam itself, or the flexibility of the supports, which both increase the deflection.`
  ],

  interview: [
    [`What is the difference between deflection and slope?`, `Deflection is the vertical displacement of a point on the beam axis. Slope is the angle between the deflected axis and the original axis at that point. For small deflections the slope is dy/dx.`],
    [`What is flexural rigidity?`, `E·I, the product of Young's modulus (material stiffness) and the second moment of area (section stiffness). Deflection is inversely proportional to E·I.`],
    [`How can you reduce the deflection of a beam?`, `Shorten the span, increase the depth of the section (I grows with h³), add a support, use a material with higher E, or change the loading. The depth and span have by far the largest effect.`],
    [`Name the methods for finding beam deflection.`, `Double integration (with Macaulay's method for several loads), the moment-area method, the conjugate beam method, superposition of standard cases, and energy methods such as Castigliano's theorem.`],
    [`Why can the deflection limit govern the design of a machine part?`, `Parts such as spindles, shafts and machine beds must stay aligned. A stress-safe section may still deflect too much for accuracy, bearing life or gear mesh, so the section is sized for the required stiffness.`],
    [`If a simply supported beam with a central load has its span doubled, how does the maximum deflection change?`, `It increases 8 times, because δ<sub>max</sub> = PL³/(48EI) is proportional to L³ (assuming the same load and section).`]
  ],

  practice: [
    [`1. A simply supported beam carries 6 kN at midspan. L = 2 m, E = 200 GPa and I = 2 × 10<sup>6</sup> mm⁴. Find the maximum deflection.`, `δ = P L³ / (48 E I) = 6000 × 2000³ / (48 × 200 000 × 2 × 10<sup>6</sup>) = 4.8 × 10<sup>13</sup> / 1.92 × 10<sup>13</sup> = <strong>2.5 mm</strong>.`],
    [`2. A cantilever 500 mm long carries 1 kN at the free end. E = 200 GPa and I = 8 × 10<sup>4</sup> mm⁴. Find the tip deflection.`, `δ = P L³ / (3 E I) = 1000 × 500³ / (3 × 200 000 × 8 × 10<sup>4</sup>) = 1.25 × 10<sup>11</sup> / 4.8 × 10<sup>10</sup> = <strong>2.60 mm</strong>.`],
    [`3. A simply supported beam (L = 1500 mm) carries a UDL of 2 N/mm. E = 200 000 MPa, I = 3 × 10<sup>6</sup> mm⁴. Find the maximum deflection.`, `δ = 5 w L⁴ / (384 E I) = 5 × 2 × 1500⁴ / (384 × 200 000 × 3 × 10<sup>6</sup>) = 5.0625 × 10<sup>13</sup> / 2.304 × 10<sup>14</sup> = <strong>0.22 mm</strong>.`],
    [`4. For a simply supported beam with a central load, by what factor does the deflection change if the depth h of a rectangular section is doubled?`, `I = b h³/12, so doubling h makes I eight times larger and the deflection <strong>8 times smaller</strong> (δ ∝ 1/I).`],
    [`5. A simply supported steel beam (L = 1.5 m, P = 5 kN at midspan, E = 200 GPa) must deflect no more than 0.5 mm. Find the required I.`, `I = P L³ / (48 E δ) = 5000 × 1500³ / (48 × 200 000 × 0.5) = 1.6875 × 10<sup>13</sup> / 4.8 × 10<sup>6</sup> = <strong>3.52 × 10<sup>6</sup> mm⁴</strong> (about 352 cm⁴).`]
  ]
};
