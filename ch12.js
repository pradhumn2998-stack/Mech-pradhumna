/* =====================================================================
   ch12.js  -  CHAPTER 12: Keys, Splines, Couplings, and Shafts
   (Same structure as ch01.js - see the comments there.)
   ===================================================================== */
window.CHAPTERS = window.CHAPTERS || {};

window.CHAPTERS[12] = {

  def: `A shaft carries rotating parts and transmits torque. To pass the torque between a shaft and a gear, pulley, sprocket or hub, a <strong>key</strong> (a small block set in a keyway), a <strong>spline</strong> (several teeth cut along the shaft) or a friction joint (an interference or clamped fit) is used. A <strong>coupling</strong> joins two shafts end to end so that torque passes from one to the other. This chapter shows how to size keys, splines and flange couplings, and how to check that the shaft does not run at a critical speed.`,

  purpose: [
    `Select the key size from the shaft diameter and calculate the key length required for the torque.`,
    `Check the key for shear and for crushing (bearing) stress.`,
    `Estimate the torque capacity of a splined joint and of an interference-fit joint.`,
    `Size the bolts of a rigid flange coupling and choose the type of coupling.`,
    `Estimate the critical speed of a shaft so that the machine does not run in resonance.`,
    `Industrial use: gear and pulley hubs, motor-to-pump couplings, gearbox input and output shafts, machine-tool spindles and vehicle drivelines.`
  ],

  terms: [
    [`Key and keyway`, `A key is a small piece, usually rectangular, that fits partly in a groove in the shaft and partly in the hub, so that the two turn together. The grooves are called keyways.`],
    [`Parallel (feather) key`, `A key of constant cross-section. It transmits torque by its side faces. A feather key lets the hub slide along the shaft.`],
    [`Woodruff key`, `A semicircular key that fits a round keyway. It is easy to assemble and self-aligning, but it weakens the shaft more.`],
    [`Spline`, `Several keys (teeth) machined as a part of the shaft, with matching grooves in the hub. It transmits more torque than a single key and allows the hub to slide.`],
    [`Shear and crushing of a key`, `The two failure modes. The key may be cut (shear) across its length-width area, or the side faces may crush against the shaft or the hub (bearing stress).`],
    [`Interference (press) fit`, `A joint in which the hub bore is slightly smaller than the shaft. The contact pressure produces friction that transmits the torque without a key.`],
    [`Coupling`, `A device that joins two shafts. A rigid coupling needs aligned shafts. A flexible coupling allows small misalignment, absorbs shock and vibration.`],
    [`Flange coupling`, `Two flanged hubs bolted together at a bolt circle diameter. The bolts carry the torque in shear.`],
    [`Critical speed`, `The rotational speed that equals a natural frequency of the shaft. Near it the shaft whirls and vibrates strongly (resonance).`],
    [`Static deflection (δ<sub>st</sub>)`, `The deflection of the shaft under the weight of the mounted parts. It determines the first critical speed.`]
  ],

  units: {
    intro: `Use N, mm and MPa for the key, spline and bolt formulas, and keep the torque in N·mm.`,
    head: [`Quantity`, `Unit`, `Symbol`, `Useful conversions`],
    rows: [
      [`Torque`, `newton millimetre`, `T`, `1 N·m = 1000 N·mm`],
      [`Shaft diameter`, `millimetre`, `d`, `Nominal size`],
      [`Key width, height and length`, `millimetre`, `b, h, L`, `Standard sizes from tables`],
      [`Force on the key`, `newton`, `F`, `F = 2T / d`],
      [`Shear and crushing stress`, `megapascal`, `τ, σ<sub>c</sub>`, `N/mm²`],
      [`Critical speed`, `revolutions per minute`, `N<sub>c</sub>`, `ω<sub>c</sub> in rad/s = 2π N<sub>c</sub> / 60`],
      [`Static deflection`, `millimetre`, `δ<sub>st</sub>`, `Use mm in the formula given here`]
    ],
    notes: [`The torque in N·mm divided by the shaft diameter in mm gives the force in N.`]
  },

  formulas: [
    {
      name: `Force on a key`,
      eq: `F = 2·T / d`,
      note: `The torque is transmitted as a tangential force at the surface of the shaft. Distance from the axis is d/2.`,
      symbols: [
        [`F`, `Tangential force on the key`, `N`],
        [`T`, `Torque transmitted`, `N·mm`],
        [`d`, `Shaft diameter at the key`, `mm`]
      ],
      assumptions: [`Torque taken by one key. For two keys at 90° or 180° apart, the capacity is not simply double. Use a factor of about 1.5 for two keys unless a standard says otherwise.`, `Use the design torque with the service factor, not the nominal value.`]
    },
    {
      name: `Shear stress and crushing stress of a parallel key`,
      eq: `τ = F / (b·L) = 2T / (d·b·L) &nbsp;&nbsp; σ<sub>c</sub> = F / ((h/2)·L) = 4T / (d·h·L)`,
      note: `Half of the key height is in the hub, and half in the shaft, so the bearing area on one side is (h/2)·L.`,
      symbols: [
        [`τ`, `Shear stress in the key`, `MPa`],
        [`σ<sub>c</sub>`, `Crushing (bearing) stress on the key side`, `MPa`],
        [`b`, `Key width`, `mm`],
        [`h`, `Key height`, `mm`],
        [`L`, `Effective key length`, `mm`],
        [`T`, `Torque`, `N·mm`],
        [`d`, `Shaft diameter`, `mm`]
      ],
      assumptions: [`The load is distributed uniformly along the key length, and half of the height bears on the hub.`, `The stress must be compared with the allowable values for the weakest of the key, shaft and hub materials.`]
    },
    {
      name: `Required key length`,
      eq: `L<sub>shear</sub> = 2T / (d·b·τ<sub>allow</sub>) &nbsp;&nbsp; L<sub>crush</sub> = 4T / (d·h·σ<sub>c,allow</sub>) &nbsp;&nbsp; L = larger of the two`,
      note: `Round up to a standard key length. The key length is normally not more than about 1.5 times the shaft diameter, and it must not be longer than the hub.`,
      symbols: [
        [`L`, `Minimum key length`, `mm`],
        [`τ<sub>allow</sub>`, `Allowable shear stress of the key material`, `MPa`],
        [`σ<sub>c,allow</sub>`, `Allowable crushing stress of the weakest part`, `MPa`]
      ],
      assumptions: [`The width b and height h are taken from the standard table for the shaft diameter (see the table of this chapter).`, `If the length needed is too long, use a larger key, two keys, or a spline.`]
    },
    {
      name: `Torque capacity of a spline`,
      eq: `T = η<sub>s</sub> · z · h · L · r<sub>m</sub> · p`,
      note: `Here h·L is the bearing area of one tooth, r<sub>m</sub> is the mean radius at which the force acts, and η<sub>s</sub> allows for the fact that not all teeth carry the load equally (a typical value is about 0.75 for accurately made splines, but follow your standard).`,
      symbols: [
        [`T`, `Torque capacity`, `N·mm`],
        [`η<sub>s</sub>`, `Load-sharing factor`, `dimensionless`],
        [`z`, `Number of spline teeth`, `dimensionless`],
        [`h`, `Radial height of the tooth in contact`, `mm`],
        [`L`, `Length of the spline engagement`, `mm`],
        [`r<sub>m</sub>`, `Mean radius of the spline`, `mm`],
        [`p`, `Allowable bearing pressure on the teeth`, `MPa`]
      ],
      assumptions: [`The allowable pressure depends on whether the joint slides under load and on the surface hardness. Take it from your standard or data book.`, `Splines also need a check of the shear at the root and of the torsion of the shaft.`]
    },
    {
      name: `Torque capacity of an interference (friction) fit`,
      eq: `T = μ · p · π · d² · L / 2`,
      note: `p is the contact pressure produced by the interference. The torque is the friction force μ·p·(π·d·L) times the radius d/2.`,
      symbols: [
        [`T`, `Torque that the joint can transmit`, `N·mm`],
        [`μ`, `Coefficient of friction of the surfaces`, `dimensionless`],
        [`p`, `Contact pressure at the interface`, `MPa`],
        [`d`, `Nominal diameter of the joint`, `mm`],
        [`L`, `Length of the joint`, `mm`]
      ],
      assumptions: [`The pressure is uniform and the friction is fully used (about to slip), so use a safety factor.`, `The pressure depends on the interference, on the materials and on the hub thickness, and is found from fit calculations (see Chapter 16).`]
    },
    {
      name: `Flange coupling: bolt size from torque`,
      eq: `T = n · (π/4)·d<sub>b</sub>² · τ · (D<sub>b</sub> / 2) &nbsp;&nbsp; d<sub>b</sub> = √[ 8T / (n·π·τ<sub>allow</sub>·D<sub>b</sub>) ]`,
      symbols: [
        [`T`, `Design torque`, `N·mm`],
        [`n`, `Number of bolts`, `dimensionless`],
        [`d<sub>b</sub>`, `Bolt diameter in shear (shank diameter)`, `mm`],
        [`τ<sub>allow</sub>`, `Allowable shear stress of the bolt material`, `MPa`],
        [`D<sub>b</sub>`, `Pitch circle (bolt circle) diameter`, `mm`]
      ],
      assumptions: [`Fitted (turned) bolts that carry the torque in shear and not by friction, with all bolts sharing the load equally.`, `The bolts must also be checked in bearing on the flange, and the hubs, keys and shafts also need their own checks.`]
    },
    {
      name: `Critical speed of a shaft with a single mass`,
      eq: `ω<sub>c</sub> = √( g / δ<sub>st</sub> ) &nbsp;&nbsp; N<sub>c</sub> = (60 / 2π)·√( 9810 / δ<sub>st</sub> ) ≈ 946 / √δ<sub>st</sub>`,
      note: `For the last form δ<sub>st</sub> is in mm and N<sub>c</sub> is in rpm. Keep the operating speed well away from N<sub>c</sub>.`,
      symbols: [
        [`ω<sub>c</sub>`, `Critical angular speed`, `rad/s`],
        [`N<sub>c</sub>`, `Critical speed`, `rpm`],
        [`g`, `Gravitational acceleration (9810 mm/s² when δ is in mm)`, `mm/s²`],
        [`δ<sub>st</sub>`, `Static deflection of the shaft under the weight of the mass`, `mm`]
      ],
      assumptions: [`A single concentrated mass on a light shaft, and the bearings are rigid. Real shafts have several critical speeds, and the stiffness of the bearings lowers the first one.`, `As a rule of thumb the operating speed is kept at least 20% to 30% below, or above, the critical speed. Follow the standard for your machine.`]
    }
  ],

  reference: {
    title: `Standard parallel key sizes for shaft diameters (ISO 773 / DIN 6885)`,
    intro: `Width b and height h of a parallel key for a given shaft diameter range. Confirm in your standard or data book.`,
    head: [`Shaft diameter d (mm), over – up to`, `Key width b (mm)`, `Key height h (mm)`],
    rows: [
      [`6 – 8`, `2`, `2`],
      [`8 – 10`, `3`, `3`],
      [`10 – 12`, `4`, `4`],
      [`12 – 17`, `5`, `5`],
      [`17 – 22`, `6`, `6`],
      [`22 – 30`, `8`, `7`],
      [`30 – 38`, `10`, `8`],
      [`38 – 44`, `12`, `8`],
      [`44 – 50`, `14`, `9`],
      [`50 – 58`, `16`, `10`],
      [`58 – 65`, `18`, `11`],
      [`65 – 75`, `20`, `12`],
      [`75 – 85`, `22`, `14`],
      [`85 – 95`, `25`, `14`]
    ],
    note: `Types of couplings: rigid (sleeve, flange) for exactly aligned shafts; flexible (jaw, elastomer, gear, disc) for small misalignment and shock; universal joints for larger angles; clutches for connecting and disconnecting under control.`
  },

  diagram: {
    caption: `Parallel key between a shaft and a hub. The torque produces a tangential force F = 2T/d on the key. The key can fail by shear across b × L, or by crushing of its side over the area (h/2) × L.`,
    svg: `<svg viewBox="0 0 600 275" role="img" aria-label="Shaft and hub cross-section with a rectangular key, showing torque T, key force F, key width b and height h, with formulas for shear and crushing stress">
      <defs>
        <marker id="ah12" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ff7a1a"/></marker>
        <marker id="ah12g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#566178"/></marker>
      </defs>
      <circle cx="150" cy="135" r="105" class="dg-fill"/>
      <circle cx="150" cy="135" r="65" fill="#ffffff" stroke="#0a1a33" stroke-width="2.2"/>
      <path d="M150 70 L150 62 L170 62 L170 70 Z" fill="#ffffff" stroke="#0a1a33" stroke-width="2"/>
      <rect x="134" y="53" width="20" height="30" fill="#fff3e8" stroke="#ff7a1a" stroke-width="3"/>
      <circle cx="150" cy="135" r="4" class="dg-dot"/>
      <line x1="150" y1="135" x2="150" y2="53" class="dg-dash"/>
      <line x1="108" y1="64" x2="132" y2="64" class="dg-or" marker-end="url(#ah12)"/>
      <text x="70" y="62" class="dg-tx-or">F</text>
      <text x="175" y="145" class="dg-tx-sm">shaft</text>
      <text x="196" y="206" class="dg-tx-sm">hub</text>
      <line x1="134" y1="236" x2="154" y2="236" class="dg-thin" marker-start="url(#ah12g)" marker-end="url(#ah12g)"/>
      <text x="136" y="254" class="dg-tx-sm">b</text>
      <text x="158" y="76" class="dg-tx-sm">h</text>
      <text x="310" y="52" class="dg-tx">Parallel key</text>
      <text x="310" y="92" class="dg-tx-or">F = 2T / d</text>
      <text x="310" y="130" class="dg-tx-or">τ = F / (b L)</text>
      <text x="310" y="168" class="dg-tx-or">σ<tspan font-size="11" dy="4">c</tspan><tspan dy="-4"> = F / (h/2 · L)</tspan></text>
      <text x="310" y="204" class="dg-tx-sm">T in N·mm, lengths in mm → stress in MPa</text>
      <text x="310" y="226" class="dg-tx-sm">size b × h from the shaft diameter</text>
    </svg>`
  },

  derivation: {
    title: `key stresses τ = 2T/(d b L) and σ<sub>c</sub> = 4T/(d h L)`,
    steps: [
      `The torque T is transmitted between the shaft and the hub through the key. Assume that the force acts at the surface of the shaft, at radius d/2.`,
      `The force on the key is the tangential force F. Taking moments about the shaft axis: T = F·(d/2), so <strong>F = 2T / d</strong>.`,
      `The key is cut along the interface between the shaft and the hub. The area that resists shear is the width times the length, b·L. Therefore the shear stress is <strong>τ = F / (b·L) = 2T / (d·b·L)</strong>.`,
      `The same force presses the side face of the key against the shaft keyway on one side and against the hub keyway on the other side. About half of the key height is in each part, so the bearing area on one side is (h/2)·L.`,
      `The crushing (bearing) stress is <strong>σ<sub>c</sub> = F / ((h/2)·L) = 4T / (d·h·L)</strong>.`,
      `For the design, set τ = τ<sub>allow</sub> and σ<sub>c</sub> = σ<sub>c,allow</sub> and solve for L in each case. The key length must be the larger of the two values, rounded up to a standard length.`
    ]
  },

  examples: [
    {
      title: `Key design for a gear hub`,
      given: [`Shaft diameter d = 40 mm, design torque T = 300 N·m.`, `Standard key for 40 mm: b = 12 mm, h = 8 mm.`, `Allowable shear stress of the key τ<sub>allow</sub> = 60 MPa (assumed).`, `Allowable crushing stress σ<sub>c,allow</sub> = 100 MPa (assumed).`],
      convert: [`T = 300 N·m = 300 000 N·mm.`],
      find: `The tangential force, the minimum key length for shear and for crushing, and the stresses for a standard length of 40 mm.`,
      formula: `F = 2T/d, &nbsp; L<sub>shear</sub> = F/(b τ<sub>allow</sub>), &nbsp; L<sub>crush</sub> = F/((h/2) σ<sub>c,allow</sub>)`,
      steps: [
        `F = 2 × 300 000 / 40 = 15 000 N.`,
        `L<sub>shear</sub> = 15 000 / (12 × 60) = 20.8 mm.`,
        `L<sub>crush</sub> = 15 000 / (4 × 100) = 37.5 mm. (h/2 = 4 mm.)`,
        `Crushing governs, so L ≥ 37.5 mm. Choose a standard length of 40 mm.`,
        `Check with L = 40 mm: τ = 15 000 / (12 × 40) = 31.3 MPa; σ<sub>c</sub> = 15 000 / (4 × 40) = 93.8 MPa.`
      ],
      result: `Key 12 × 8 × 40 mm; τ = 31.3 MPa; σ<sub>c</sub> = 93.8 MPa`,
      interpretation: `The key is far stronger in shear than in bearing, which is normal for a key. The hub must be at least 40 mm long. If the hub is shorter, use a harder material for the key and hub, a larger key size, or a spline. The keyway itself weakens the shaft, which needs a stress concentration check.`
    },
    {
      title: `Torque capacity of a splined shaft`,
      given: [`Spline with z = 6 teeth, tooth height in contact h = 3 mm, engagement length L = 40 mm.`, `Mean radius r<sub>m</sub> = 20 mm.`, `Allowable bearing pressure p = 60 MPa (assumed).`, `Load-sharing factor η<sub>s</sub> = 0.75.`],
      convert: [`All dimensions in mm and p in MPa, so T will be in N·mm.`],
      find: `The torque capacity of the spline.`,
      formula: `T = η<sub>s</sub>·z·h·L·r<sub>m</sub>·p`,
      steps: [
        `Bearing area of one tooth = h × L = 3 × 40 = 120 mm².`,
        `Force per tooth at p = 60 MPa: 120 × 60 = 7200 N.`,
        `T = 0.75 × 6 × 7200 × 20 = 648 000 N·mm.`
      ],
      result: `T ≈ 648 000 N·mm = 648 N·m`,
      interpretation: `This spline can carry more than twice the 300 N·m torque of the key in Example 1, in a shorter space, and it also lets the hub slide. The price is the cost of cutting the spline. The root of the spline teeth must also be checked in shear and torsion.`
    },
    {
      title: `Bolts of a rigid flange coupling`,
      given: [`Design torque T = 500 N·m.`, `n = 6 fitted bolts on a bolt circle of diameter D<sub>b</sub> = 120 mm.`, `Allowable shear stress of the bolt τ<sub>allow</sub> = 30 MPa (assumed).`],
      convert: [`T = 500 N·m = 500 000 N·mm.`],
      find: `The minimum bolt diameter, and the shear stress for the standard size chosen.`,
      formula: `d<sub>b</sub> = √[8T / (n π τ<sub>allow</sub> D<sub>b</sub>)]`,
      steps: [
        `Force at the bolt circle: F = 2T / D<sub>b</sub> = 2 × 500 000 / 120 = 8333 N, shared by 6 bolts: 1389 N each.`,
        `d<sub>b</sub>² = 8 × 500 000 / (6 × π × 30 × 120) = 4 000 000 / 67 858 = 58.9 mm².`,
        `d<sub>b</sub> = 7.68 mm. Choose the next standard size, 8 mm.`,
        `Check: τ = 1389 / (π × 8² / 4) = 1389 / 50.27 = 27.6 MPa < 30 MPa. ✔`
      ],
      result: `Use six 8 mm fitted bolts (τ = 27.6 MPa)`,
      interpretation: `The bolts are small because the bolt circle is large, since the force at the bolt circle is smaller than the force at the shaft. The coupling bolts must also be checked in bearing on the flange holes, and the flange hubs and keys need to be checked for the same torque.`
    },
    {
      title: `Critical speed of a shaft with a central disc`,
      given: [`A shaft carries a heavy central disc, and the static deflection under its weight is δ<sub>st</sub> = 0.4 mm (from a beam calculation, Chapter 7).`, `The operating speed is 1440 rpm.`],
      convert: [`δ<sub>st</sub> = 0.4 mm. Use N<sub>c</sub> = (60 / 2π)·√(9810 / δ<sub>st</sub>) with δ in mm.`],
      find: `The critical speed, the ratio of operating speed to critical speed, and the effect of a stiffer shaft with δ<sub>st</sub> = 0.1 mm.`,
      formula: `N<sub>c</sub> = (60/2π)·√(9810/δ<sub>st</sub>)`,
      steps: [
        `√(9810 / 0.4) = √24 525 = 156.6 rad/s.`,
        `N<sub>c</sub> = 156.6 × 60 / (2π) = 1495 rpm.`,
        `Ratio: 1440 / 1495 = 0.963, so the shaft runs only about 4% below its critical speed.`,
        `Stiffer shaft: δ<sub>st</sub> = 0.1 mm gives N<sub>c</sub> = 946 / √0.1 = 2991 rpm, and the ratio is 1440 / 2991 = 0.48.`
      ],
      result: `N<sub>c</sub> ≈ 1495 rpm (ratio 0.96, unsafe); with δ<sub>st</sub> = 0.1 mm, N<sub>c</sub> ≈ 2991 rpm (ratio 0.48)`,
      interpretation: `The first design runs almost exactly at resonance and would vibrate violently. A stiffer shaft, such as one with a larger diameter (which increases I and reduces δ), raises the critical speed to twice the running speed. The shaft in the first design should not be used.`
    }
  ],

  application: [
    `<strong>Gear and pulley hubs:</strong> a parallel key transmits the torque, and a set screw or a locking collar holds the hub in position along the shaft.`,
    `<strong>Motor-to-machine connections:</strong> a flexible coupling (jaw or elastomer) joins the motor shaft to a pump or gearbox shaft, allowing small misalignment and absorbing shock.`,
    `<strong>Sliding gears and splined drivelines:</strong> splines carry high torque and let the gear slide on the shaft for gear changing in a gearbox or for the length change of a propeller shaft.`
  ],

  mistakes: [
    `Using N·m with mm in F = 2T/d. Convert T to N·mm.`,
    `Checking the key in shear only. Crushing usually governs the key length.`,
    `Taking the crushing area as h·L instead of (h/2)·L.`,
    `Using a key that is longer than the hub, or longer than about 1.5 times the shaft diameter.`,
    `Forgetting that a keyway weakens the shaft and causes a stress concentration, which matters in fatigue.`,
    `Running a shaft near a critical speed, or using a rigid coupling for shafts that are not accurately aligned.`
  ],

  interview: [
    [`What are the two ways in which a key can fail?`, `By shear across the area b·L, and by crushing (bearing failure) of its side face over the area (h/2)·L. In most designs the crushing stress decides the key length.`],
    [`What is the difference between a key and a spline?`, `A key is a separate piece in a single keyway. A spline is a set of teeth cut on the shaft itself, with matching grooves in the hub. A spline carries more torque, shares the load among its teeth, and allows axial sliding.`],
    [`How is the torque transmitted in a flange coupling?`, `Through the bolts on the bolt circle, which carry the torque in shear (fitted bolts) or by the friction on the faces (clamped bolts). Each bolt carries 2T/(n·D<sub>b</sub>).`],
    [`What is a critical speed?`, `The speed at which the rotation frequency equals a natural frequency of the shaft. There the shaft whirls with large deflection and vibration. Operation should be kept well above or below it, and the shaft design aims to put the critical speed away from the running speed.`],
    [`Why use a flexible coupling?`, `It allows small misalignment between shafts, absorbs shock and torsional vibration, and protects bearings and the connected machines. A rigid coupling is used only when the shafts can be aligned accurately.`],
    [`How can the critical speed of a shaft be raised?`, `By increasing its stiffness (a larger diameter, a shorter span, closer bearings) and reducing the mounted mass, which reduces the static deflection δ<sub>st</sub>. Because N<sub>c</sub> ∝ 1/√δ<sub>st</sub>, halving the deflection raises N<sub>c</sub> by 41%.`]
  ],

  practice: [
    [`1. A shaft of d = 30 mm carries T = 100 N·m with a key 8 × 7 × 30 mm. Find the shear and crushing stresses.`, `F = 2 × 100 000 / 30 = 6667 N. τ = 6667 / (8 × 30) = <strong>27.8 MPa</strong>. σ<sub>c</sub> = 6667 / (3.5 × 30) = <strong>63.5 MPa</strong>.`],
    [`2. Find the minimum key length for shear if T = 200 N·m, d = 35 mm, b = 10 mm, τ<sub>allow</sub> = 50 MPa.`, `L = 2T / (d b τ) = 2 × 200 000 / (35 × 10 × 50) = <strong>22.9 mm</strong>.`],
    [`3. A spline has z = 8 teeth, h = 2 mm, L = 30 mm, r<sub>m</sub> = 15 mm, p = 50 MPa and η<sub>s</sub> = 0.75. Find the torque capacity.`, `T = 0.75 × 8 × 2 × 30 × 15 × 50 = 270 000 N·mm = <strong>270 N·m</strong>.`],
    [`4. An interference fit has d = 30 mm, L = 40 mm, contact pressure p = 25 MPa and μ = 0.1. Find the torque capacity.`, `T = μ p π d² L / 2 = 0.1 × 25 × π × 900 × 40 / 2 = 141 372 N·mm = <strong>141 N·m</strong>.`],
    [`5. A shaft has a static deflection of 0.25 mm under its load. Estimate the critical speed.`, `N<sub>c</sub> = 946 / √0.25 = 946 / 0.5 = <strong>1892 rpm</strong>.`]
  ]
};
