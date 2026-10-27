/* =====================================================================
   ch08.js  -  CHAPTER 8: Mechanical Power Transmission
   (Same structure as ch01.js - see the comments there.)
   ===================================================================== */
window.CHAPTERS = window.CHAPTERS || {};

window.CHAPTERS[8] = {

  def: `Mechanical power transmission is the transfer of power from a prime mover (an electric motor, engine or turbine) to a machine that does the work, using shafts, gears, belts, chains, couplings and clutches. The transmission usually changes the <strong>speed and torque</strong> to suit the machine while the power stays almost constant, apart from <strong>losses</strong> that are given by the efficiency.`,

  purpose: [
    `Match the speed and torque of a motor to the speed and torque the machine needs.`,
    `Calculate the output speed, torque and power of a drive, including the efficiency of each stage.`,
    `Choose a drive type (gears, belts, chains, couplings) for the distance between shafts, ratio, noise, cost and accuracy.`,
    `Estimate the power lost as heat, which determines the cooling and lubrication needed.`,
    `Industrial use: conveyors, pumps, fans, mixers, machine tools, cranes, lifts, rolling mills and vehicle drivelines.`
  ],

  terms: [
    [`Prime mover and driven machine`, `The prime mover supplies power (for example a motor). The driven machine uses it (for example a pump or a conveyor).`],
    [`Speed ratio (i)`, `The ratio of input speed to output speed, i = N<sub>in</sub> / N<sub>out</sub>. A ratio above 1 is a speed reduction, which increases torque.`],
    [`Reduction and step-up drives`, `A reduction drive slows the output and multiplies torque. A step-up drive increases speed and lowers torque.`],
    [`Efficiency (η)`, `The ratio of output power to input power. The rest of the input power is lost, mainly as heat, in friction and churning of oil.`],
    [`Positive and friction drives`, `Gears and toothed (synchronous) belts and chains are positive drives with a fixed ratio. Flat and V-belts depend on friction and can slip.`],
    [`Service factor (K<sub>s</sub>)`, `A multiplier applied to the power to allow for shock, uneven loads, starting torque and the hours of running per day. Values come from a standard or from the drive manufacturer.`],
    [`Design power (P<sub>d</sub>)`, `The power used to select a drive, equal to the service factor times the required power.`],
    [`Gear train`, `A set of gears connected in series. In a compound train two gears are fixed on one shaft.`],
    [`Slip`, `The small loss of speed in friction drives (such as belts) because the belt creeps on the pulley.`],
    [`Overload protection`, `A shear pin, slip clutch or torque limiter that protects the drive from excessive torque.`]
  ],

  units: {
    intro: `Keep power in watts, torque in N·m and speed in rpm or rad/s, and convert carefully between them.`,
    head: [`Quantity`, `SI unit`, `Symbol`, `Useful conversions`],
    rows: [
      [`Power`, `watt`, `W`, `1 kW = 1000 W; 1 hp (mechanical) = 745.7 W`],
      [`Torque`, `newton metre`, `N·m`, `1 N·m = 1000 N·mm`],
      [`Rotational speed`, `revolution per minute`, `rpm`, `ω = 2πN / 60 rad/s`],
      [`Linear speed`, `metre per second`, `m/s`, `v = π d N / 60 000 (d in mm, N in rpm)`],
      [`Force`, `newton`, `N`, `P = F·v with v in m/s gives P in W`],
      [`Efficiency`, `none`, `η`, `Often given as a percentage: 95% = 0.95`],
      [`Energy`, `joule or kilowatt-hour`, `J, kWh`, `1 kWh = 3.6 MJ`]
    ],
    notes: [`The speed ratio has no unit, and you must state clearly whether it is input over output or output over input. In this handbook i = input speed / output speed.`]
  },

  formulas: [
    {
      name: `Power, torque and speed (rotating and linear)`,
      eq: `P = T·ω = 2π·N·T / 60 &nbsp;&nbsp; P = F·v`,
      note: `For a quick answer with P in kW, N in rpm and T in N·m: T ≈ 9549 · P / N.`,
      symbols: [
        [`P`, `Power`, `W`],
        [`T`, `Torque`, `N·m`],
        [`ω`, `Angular speed`, `rad/s`],
        [`N`, `Rotational speed`, `rpm`],
        [`F`, `Force acting along the direction of motion`, `N`],
        [`v`, `Speed of the force's point of application`, `m/s`]
      ],
      assumptions: [`Steady speed and torque.`, `The formula gives the power at the shaft or at the load; losses between components are handled with efficiency.`]
    },
    {
      name: `Speed ratio (velocity ratio)`,
      eq: `i = N<sub>1</sub> / N<sub>2</sub> = ω<sub>1</sub> / ω<sub>2</sub> &nbsp;&nbsp; Gears: i = z<sub>2</sub> / z<sub>1</sub> &nbsp;&nbsp; Belts and chains: i ≈ d<sub>2</sub> / d<sub>1</sub> or z<sub>2</sub> / z<sub>1</sub>`,
      note: `Subscript 1 is the driver (input) and subscript 2 is the driven (output) element.`,
      symbols: [
        [`i`, `Speed ratio (reduction ratio if above 1)`, `dimensionless`],
        [`N<sub>1</sub>, N<sub>2</sub>`, `Input and output speeds`, `rpm`],
        [`z<sub>1</sub>, z<sub>2</sub>`, `Numbers of teeth on driver and driven`, `dimensionless`],
        [`d<sub>1</sub>, d<sub>2</sub>`, `Pitch diameters of the driver and driven pulleys`, `mm`]
      ],
      assumptions: [`Positive drives (gears, chains, toothed belts) hold the ratio exactly.`, `For V-belts and flat belts, slip of about 1% to 3% lowers the output speed slightly.`]
    },
    {
      name: `Efficiency and power loss`,
      eq: `η = P<sub>out</sub> / P<sub>in</sub> &nbsp;&nbsp; η<sub>overall</sub> = η<sub>1</sub>·η<sub>2</sub>·η<sub>3</sub>… &nbsp;&nbsp; P<sub>loss</sub> = P<sub>in</sub>(1 − η)`,
      symbols: [
        [`η`, `Efficiency of a stage`, `dimensionless (0 to 1)`],
        [`P<sub>in</sub>, P<sub>out</sub>`, `Input and output power`, `W`],
        [`η<sub>overall</sub>`, `Product of the efficiencies of all stages in series`, `dimensionless`],
        [`P<sub>loss</sub>`, `Power lost, mostly as heat`, `W`]
      ],
      assumptions: [`Efficiency is not constant. It depends on load, speed, lubrication and temperature. Use manufacturer values for the operating point.`, `Stages in series multiply their efficiencies.`]
    },
    {
      name: `Output speed and output torque of a drive`,
      eq: `N<sub>out</sub> = N<sub>in</sub> / i &nbsp;&nbsp; T<sub>out</sub> = T<sub>in</sub> · i · η`,
      note: `A reduction drive (i above 1) multiplies the torque by i but reduces it by the efficiency. Power does not increase.`,
      symbols: [
        [`N<sub>out</sub>`, `Output speed`, `rpm`],
        [`T<sub>in</sub>, T<sub>out</sub>`, `Input and output torque`, `N·m`],
        [`i`, `Speed ratio (input ÷ output)`, `dimensionless`],
        [`η`, `Efficiency of the drive`, `dimensionless`]
      ],
      assumptions: [`Steady running. At start-up the torque needed to accelerate the load can be much higher.`, `Friction in bearings and seals is included in η.`]
    },
    {
      name: `Multi-stage and compound gear trains`,
      eq: `i<sub>total</sub> = i<sub>1</sub>·i<sub>2</sub>·i<sub>3</sub>… &nbsp;&nbsp; Compound: i = (z<sub>2</sub>·z<sub>4</sub>) / (z<sub>1</sub>·z<sub>3</sub>)`,
      note: `In a compound train z<sub>1</sub> and z<sub>3</sub> are the driving gears, and z<sub>2</sub> and z<sub>4</sub> are the driven gears.`,
      symbols: [
        [`i<sub>total</sub>`, `Overall speed ratio`, `dimensionless`],
        [`i<sub>1</sub>, i<sub>2</sub>`, `Ratios of each stage`, `dimensionless`],
        [`z`, `Number of teeth of each gear`, `dimensionless`]
      ],
      assumptions: [`Idler gears change the direction of rotation but not the ratio.`, `Each stage adds its own losses, so the overall efficiency drops with more stages.`]
    },
    {
      name: `Design power with service factor`,
      eq: `P<sub>d</sub> = K<sub>s</sub> · P`,
      note: `Take K<sub>s</sub> from the drive manufacturer's table or the relevant standard. It depends on the load type (smooth, moderate shock or heavy shock), the prime mover and the daily running hours.`,
      symbols: [
        [`P<sub>d</sub>`, `Design power used to select the drive`, `W or kW`],
        [`K<sub>s</sub>`, `Service factor`, `dimensionless`],
        [`P`, `Required (nominal) power of the machine`, `W or kW`]
      ],
      assumptions: [`The service factor values are not universal. Do not copy a number from one drive type to another.`]
    },
    {
      name: `Linear speed and force at a pulley, drum or wheel`,
      eq: `v = π·d·N / 60 000 &nbsp;&nbsp; F = 2·T / d`,
      symbols: [
        [`v`, `Linear (surface) speed`, `m/s`],
        [`d`, `Diameter of the pulley, drum or wheel`, `mm`],
        [`N`, `Rotational speed`, `rpm`],
        [`F`, `Tangential force at the surface`, `N`],
        [`T`, `Torque (use N·mm so F comes out in N)`, `N·mm`]
      ],
      assumptions: [`No slip between the surface and the belt, rope or ground.`, `Use the pitch diameter for belts and chains, and the effective diameter for a rope on a drum.`]
    }
  ],

  reference: {
    title: `Comparison of common transmission drives`,
    intro: `Approximate typical values for a first selection. Always confirm with the manufacturer's data and the relevant standard.`,
    head: [`Drive`, `Typical efficiency`, `Ratio and distance`, `Main features`],
    rows: [
      [`Spur or helical gears`, `about 96% – 99% per stage`, `ratio up to roughly 6 – 10 per stage; short centre distance`, `Positive, compact, exact ratio, needs good lubrication and alignment`],
      [`Worm gears`, `about 40% – 90%, depends on ratio and lead angle`, `high ratio (about 5 – 60 or more) in one stage`, `Quiet, can be self-locking, but loses more power as heat`],
      [`V-belts`, `about 90% – 95%`, `ratio up to about 7; longer centre distance`, `Cheap, absorbs shock, slip protects the drive but gives an inexact ratio`],
      [`Roller chains`, `about 95% – 98%`, `ratio up to about 6 – 7; medium centre distance`, `Positive drive, handles high torque, needs lubrication, noisy at high speed`],
      [`Toothed (synchronous) belts`, `about 95% – 98%`, `ratio up to about 8; medium centre distance`, `Positive and quiet, no lubrication, used for timing`],
      [`Flexible or rigid coupling`, `close to 100%`, `ratio 1:1, shafts in line`, `Joins two shafts directly; see Chapter 12`]
    ],
    note: `The efficiency ranges are typical and vary with size, load and lubrication.`
  },

  diagram: {
    caption: `Basic transmission: motor, speed-changing drive and driven machine. Power is almost the same on both sides, but speed and torque change by the ratio i, and the loss is P<sub>in</sub>(1 − η).`,
    svg: `<svg viewBox="0 0 600 265" role="img" aria-label="Block diagram of a motor, a drive with ratio i and efficiency eta, and a driven machine, with input and output speed and torque and the formulas for ratio, output torque and power loss">
      <defs>
        <marker id="ah8" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ff7a1a"/></marker>
      </defs>
      <rect x="25" y="60" width="115" height="76" rx="10" class="dg-fill"/>
      <text x="56" y="92" class="dg-tx">Motor</text>
      <text x="40" y="116" class="dg-tx-sm">P<tspan font-size="10" dy="3">in</tspan><tspan dy="-3"> = T₁ ω₁</tspan></text>
      <rect x="240" y="48" width="120" height="100" rx="10" class="dg-fill"/>
      <text x="262" y="86" class="dg-tx">Drive</text>
      <text x="262" y="110" class="dg-tx-sm">ratio i</text>
      <text x="262" y="128" class="dg-tx-sm">efficiency η</text>
      <rect x="460" y="60" width="115" height="76" rx="10" class="dg-fill"/>
      <text x="480" y="92" class="dg-tx">Machine</text>
      <text x="474" y="116" class="dg-tx-sm">P<tspan font-size="10" dy="3">out</tspan><tspan dy="-3"> = T₂ ω₂</tspan></text>
      <line x1="140" y1="98" x2="240" y2="98" class="dg-ln" stroke-width="4"/>
      <line x1="360" y1="98" x2="460" y2="98" class="dg-ln" stroke-width="4"/>
      <line x1="150" y1="40" x2="228" y2="40" class="dg-or" marker-end="url(#ah8)"/>
      <line x1="372" y1="40" x2="448" y2="40" class="dg-or" marker-end="url(#ah8)"/>
      <text x="152" y="30" class="dg-tx-sm">N₁ , T₁</text>
      <text x="374" y="30" class="dg-tx-sm">N₂ , T₂</text>
      <text x="40" y="188" class="dg-tx-or">i = N₁ / N₂ = ω₁ / ω₂</text>
      <text x="40" y="216" class="dg-tx-or">T₂ = T₁ · i · η</text>
      <text x="40" y="244" class="dg-tx-or">P<tspan font-size="11" dy="4">loss</tspan><tspan dy="-4"> = P</tspan><tspan font-size="11" dy="4">in</tspan><tspan dy="-4"> (1 − η)</tspan></text>
      <text x="340" y="196" class="dg-tx-sm">T in N·m, N in rpm,</text>
      <text x="340" y="214" class="dg-tx-sm">P in W (ω = 2πN / 60)</text>
      <text x="340" y="244" class="dg-tx-sm">i above 1: speed down, torque up</text>
    </svg>`
  },

  derivation: {
    title: `output torque T<sub>out</sub> = T<sub>in</sub>·i·η and overall efficiency`,
    steps: [
      `Efficiency is defined as output power divided by input power: P<sub>out</sub> = η·P<sub>in</sub>.`,
      `Write each power as torque times angular speed (P = T·ω): T<sub>out</sub>·ω<sub>out</sub> = η·T<sub>in</sub>·ω<sub>in</sub>.`,
      `Divide both sides by ω<sub>out</sub>: T<sub>out</sub> = η·T<sub>in</sub>·(ω<sub>in</sub> / ω<sub>out</sub>).`,
      `The ratio ω<sub>in</sub> / ω<sub>out</sub> is the speed ratio i, so <strong>T<sub>out</sub> = T<sub>in</sub>·i·η</strong>.`,
      `For stages in series, the output of one stage is the input of the next. Stage 1 gives P<sub>1</sub> = η<sub>1</sub>·P<sub>in</sub>, stage 2 gives P<sub>2</sub> = η<sub>2</sub>·P<sub>1</sub>, and stage 3 gives P<sub>out</sub> = η<sub>3</sub>·P<sub>2</sub>.`,
      `Substituting: P<sub>out</sub> = η<sub>1</sub>·η<sub>2</sub>·η<sub>3</sub>·P<sub>in</sub>, so <strong>η<sub>overall</sub> = η<sub>1</sub>·η<sub>2</sub>·η<sub>3</sub></strong>. In the same way the overall ratio is the product of the stage ratios.`
    ]
  },

  examples: [
    {
      title: `Output speed, torque and power of a single-stage gearbox`,
      given: [`Motor 7.5 kW at 1440 rpm.`, `Gearbox ratio i = 10 (reduction).`, `Gearbox efficiency η = 0.95.`],
      convert: [`P<sub>in</sub> = 7.5 kW = 7500 W. N<sub>in</sub> = 1440 rpm.`],
      find: `The output speed, the input torque, the output torque and the output power.`,
      formula: `N<sub>out</sub> = N<sub>in</sub>/i, &nbsp; T<sub>out</sub> = T<sub>in</sub>·i·η`,
      steps: [
        `N<sub>out</sub> = 1440 / 10 = 144 rpm.`,
        `T<sub>in</sub> = 9549.3 × 7.5 / 1440 = 49.74 N·m.`,
        `T<sub>out</sub> = 49.74 × 10 × 0.95 = 472.5 N·m.`,
        `P<sub>out</sub> = η·P<sub>in</sub> = 0.95 × 7.5 = 7.125 kW.`,
        `Check: P<sub>out</sub> = T<sub>out</sub>·ω<sub>out</sub> = 472.5 × (2π × 144 / 60) = 472.5 × 15.08 = 7125 W. ✔`
      ],
      result: `N<sub>out</sub> = 144 rpm, T<sub>out</sub> ≈ 472.5 N·m, P<sub>out</sub> = 7.125 kW (loss 0.375 kW)`,
      interpretation: `The gearbox gives 9.5 times the motor torque at one-tenth of the speed. The torque rises by less than the ratio because of the 5% loss. The 0.375 kW lost appears as heat in the gearbox oil.`
    },
    {
      title: `Two-stage reduction drive`,
      given: [`Motor 11 kW at 1450 rpm.`, `Stage 1: i<sub>1</sub> = 3.5, η<sub>1</sub> = 0.97.`, `Stage 2: i<sub>2</sub> = 4, η<sub>2</sub> = 0.97.`],
      convert: [`P<sub>in</sub> = 11 kW; N<sub>in</sub> = 1450 rpm.`],
      find: `The overall ratio and efficiency, output speed, output power and output torque.`,
      formula: `i = i<sub>1</sub>i<sub>2</sub>, &nbsp; η = η<sub>1</sub>η<sub>2</sub>, &nbsp; T<sub>out</sub> = T<sub>in</sub>·i·η`,
      steps: [
        `i = 3.5 × 4 = 14.`,
        `η = 0.97 × 0.97 = 0.9409.`,
        `N<sub>out</sub> = 1450 / 14 = 103.57 rpm.`,
        `P<sub>out</sub> = 0.9409 × 11 = 10.35 kW (loss 0.65 kW).`,
        `T<sub>in</sub> = 9549.3 × 11 / 1450 = 72.44 N·m, so T<sub>out</sub> = 72.44 × 14 × 0.9409 = 954.3 N·m.`,
        `Check with T = 9549.3 × 10.35 / 103.57 = 954.3 N·m. ✔`
      ],
      result: `i = 14, η = 94.1%, N<sub>out</sub> = 103.6 rpm, P<sub>out</sub> = 10.35 kW, T<sub>out</sub> ≈ 954 N·m`,
      interpretation: `Two stages of 97% each give 94.1% overall. Every extra stage costs a few percent of power, so a single high-ratio stage is not always worse. The output shaft and everything after it must be designed for 954 N·m, not for the 72 N·m of the motor.`
    },
    {
      title: `Selecting a drive for a belt conveyor`,
      given: [`Conveyor belt pull F = 2.5 kN at a belt speed v = 0.8 m/s.`, `Drum diameter 300 mm.`, `Drive efficiency η = 0.90 (assumed).`, `Service factor K<sub>s</sub> = 1.25 (assumed for the example; take the real value from the supplier).`, `Motor speed 1440 rpm.`],
      convert: [`F = 2500 N. Drum diameter d = 0.3 m = 300 mm.`],
      find: `The power at the load, the motor power, the design power, the drum speed, the drum torque and the required ratio.`,
      formula: `P = F·v, &nbsp; P<sub>motor</sub> = P / η, &nbsp; P<sub>d</sub> = K<sub>s</sub>·P<sub>motor</sub>, &nbsp; N = 60 000·v / (π·d)`,
      steps: [
        `Power at the belt: P = 2500 × 0.8 = 2000 W = 2.0 kW.`,
        `Motor power: P<sub>motor</sub> = 2000 / 0.90 = 2222 W.`,
        `Design power: P<sub>d</sub> = 1.25 × 2222 = 2778 W ≈ 2.78 kW, so select a standard motor of 3 kW.`,
        `Drum speed: N = 60 × 0.8 / (π × 0.3) = 50.93 rpm.`,
        `Drum torque: T = F × (d/2) = 2500 × 0.15 = 375 N·m. Check: 375 × (2π × 50.93 / 60) = 2000 W. ✔`,
        `Required ratio: i = 1440 / 50.93 = 28.3.`
      ],
      result: `P<sub>load</sub> = 2.0 kW; P<sub>d</sub> ≈ 2.78 kW (use a 3 kW motor); drum 50.9 rpm and 375 N·m; i ≈ 28.3`,
      interpretation: `A ratio near 28 would be done in two stages (for example a worm or a helical gearbox with an additional belt or chain stage). The drive components (gearbox, coupling, shaft) must be rated for the drum torque with the service factor included.`
    },
    {
      title: `Heat from drive losses: helical gearbox compared with worm gearbox`,
      given: [`Input power 15 kW.`, `Helical gearbox efficiency 0.96.`, `Worm gearbox efficiency 0.70 (a high-ratio worm drive).`, `Running time 8 hours.`],
      convert: [`P<sub>in</sub> = 15 kW. Energy: 1 kWh = 3.6 MJ.`],
      find: `The power lost as heat in each case and the energy lost in 8 hours for the helical drive.`,
      formula: `P<sub>loss</sub> = P<sub>in</sub>(1 − η)`,
      steps: [
        `Helical: P<sub>loss</sub> = 15 × (1 − 0.96) = 0.6 kW = 600 W. Output = 14.4 kW.`,
        `Worm: P<sub>loss</sub> = 15 × (1 − 0.70) = 4.5 kW = 4500 W. Output = 10.5 kW.`,
        `Ratio of losses: 4.5 / 0.6 = 7.5 times.`,
        `Energy lost by the helical drive in 8 hours: 0.6 × 8 = 4.8 kWh = 17.3 MJ.`
      ],
      result: `Helical: 0.6 kW lost. Worm: 4.5 kW lost (7.5 times more heat)`,
      interpretation: `A worm drive with 4.5 kW of loss will need a large housing, fins, a fan or oil cooling, and its running cost is higher. The loss also reduces the useful output power by 30%. A worm drive is chosen for its high ratio, quiet running or self-locking, not for efficiency.`
    }
  ],

  application: [
    `<strong>Conveyor and mixer drives:</strong> the drum or paddle speed and torque set the ratio and the gearbox size, with a service factor for starting and shock loads.`,
    `<strong>Machine tools and presses:</strong> belt or gear stages step the motor speed to spindle speeds, and a flywheel or clutch handles the load changes.`,
    `<strong>Heat and lubrication:</strong> the power loss P<sub>in</sub>(1 − η) decides whether a gearbox needs forced cooling or a larger oil sump.`
  ],

  mistakes: [
    `Forgetting efficiency: using T<sub>out</sub> = T<sub>in</sub>·i and ignoring η, which gives a torque that is too high.`,
    `Mixing up the ratio direction: i = input speed / output speed. If the ratio is written inverted, the speed and torque come out wrong by a large factor.`,
    `Sizing the motor for the load power only. The drive losses and the service factor must be added.`,
    `Adding stage efficiencies instead of multiplying them.`,
    `Assuming the ratio of a V-belt is exact. Slip lowers the output speed a little, so use a positive drive where timing matters.`,
    `Designing the output shaft for the motor torque instead of the much larger output torque after a reduction.`
  ],

  interview: [
    [`What is the relationship between power, torque and speed?`, `P = T·ω = 2πNT/60. At constant power, if the speed drops the torque rises in the same proportion. That is how a reduction gearbox multiplies torque.`],
    [`Why does a reduction gearbox increase torque?`, `Power stays nearly constant (apart from losses). If the output speed is lower by a factor i, the output torque must be higher by about the same factor, T<sub>out</sub> = T<sub>in</sub>·i·η.`],
    [`What is a service factor and why is it used?`, `A multiplier on the nominal power that covers shocks, uneven loads, starting torque and long running hours. It makes sure that the selected drive can survive the real conditions and not just the nominal power.`],
    [`Compare gear, belt and chain drives.`, `Gears are compact and positive with high efficiency but need accurate alignment and lubrication. V-belts are cheap, quiet and absorb shock but slip. Chains are positive and carry high torque at moderate speeds but need lubrication and are noisier.`],
    [`How do you find the overall efficiency of a multi-stage drive?`, `Multiply the efficiencies of all stages in series, η = η<sub>1</sub>·η<sub>2</sub>·η<sub>3</sub>… For example three stages at 97% give 0.97³ = 91.3%.`],
    [`Why can a worm gear be self-locking and what is the drawback?`, `A low lead angle makes the friction between the worm and the wheel large enough that the wheel cannot drive the worm. The drawback is low efficiency (often below 50% when it self-locks), so much of the input power turns into heat.`]
  ],

  practice: [
    [`1. A 5.5 kW motor at 960 rpm drives a gearbox with i = 4 and η = 0.96. Find the output speed and output torque.`, `N<sub>out</sub> = 960 / 4 = <strong>240 rpm</strong>. T<sub>in</sub> = 9549.3 × 5.5 / 960 = 54.71 N·m. T<sub>out</sub> = 54.71 × 4 × 0.96 = <strong>210.1 N·m</strong>.`],
    [`2. Three gear stages each have an efficiency of 0.97. What is the overall efficiency?`, `η = 0.97³ = <strong>0.913 (91.3%)</strong>.`],
    [`3. A conveyor belt has a pull of 1.2 kN at a speed of 1.5 m/s. Find the power at the belt.`, `P = F·v = 1200 × 1.5 = 1800 W = <strong>1.8 kW</strong>.`],
    [`4. A drum of 400 mm diameter turns at 60 rpm. What is the belt speed?`, `v = π × 400 × 60 / 60 000 = <strong>1.257 m/s</strong>.`],
    [`5. A compound gear train has driving gears of 20 and 30 teeth and driven gears of 60 and 90 teeth. Find the overall ratio and the output speed for a 1800 rpm input.`, `i = (60 × 90) / (20 × 30) = 5400 / 600 = <strong>9</strong>. N<sub>out</sub> = 1800 / 9 = <strong>200 rpm</strong>.`]
  ]
};
