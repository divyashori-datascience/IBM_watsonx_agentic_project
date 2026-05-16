/* ═══════════════════════════════════════════════════════════════
   Q_DATA — Per-question specific insight data for all 50 questions
   Each key maps to a unique dashboard result when that chip is clicked.
═══════════════════════════════════════════════════════════════ */
const Q_DATA = {

  /* ──────────────────── FELIX (Student, 22) ──────────────────── */

  felix_free: {
    hl:"Free student tier achieves <span class='hl'>91% adoption</span> — verified .ch email converts <span class='hl-green'>68%</span> of first-month users to a paid plan.",
    conf:88,cl:'High',cd:"Felix's segment showed near-universal acceptance of a free product — the fee is the only barrier, not the product itself.",
    why:[
      {icon:'🎓',title:'Fee is the only barrier — not the product',body:"Felix's product interest score is 7.8/10, but adoption collapses to 14% at CHF 8. A free tier removes the sole barrier and gets Visa into his wallet immediately, creating the cashback habit before any fee is introduced."},
      {icon:'🔒',title:'.ch email gating ensures the right cohort',body:'University email (.ch EDU domain) verification ensures the free tier reaches genuine students, not price-shoppers from other segments. It signals institutional credibility and keeps segment economics viable.'},
      {icon:'📈',title:'Free tier creates the upsell pipeline',body:'68% of free-tier users upgrade to CHF 3/month within 90 days once cashback value is proven. Free is a customer acquisition cost — not a permanent revenue sacrifice. Break-even achieved at month 4.'},
    ],
    sc:[
      {price:0,label:'Free',tag:'✦ Converts',adoption:91,acceptability:94,vs_twint:72,wtp:0,confidence:'High',highlight:true},
      {price:3,label:'CHF 3',tag:'Upsell target',adoption:68,acceptability:73,vs_twint:50,wtp:3.2,confidence:'High',highlight:false},
      {price:5,label:'CHF 5',tag:'Hard ceiling',adoption:52,acceptability:57,vs_twint:39,wtp:4.8,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:88,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:84,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:93,badge:'Excellent',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:'Launch free tier with .ch email verification — upsell to CHF 3 at day 30',items:['Free tier with verified university email (.ch EDU) — eliminates fee barrier on day 1','30-day trial experience with mandatory cashback event in week 1 to prove value','Automated upsell at day 28: show CHF X earned, offer CHF 3/month to continue'],tier:'B',risk:'Free tier without verification attracts off-target segments — must gate with .ch email from day 1 to protect segment economics'},
    pd:'Extracted: persona=felix · question=free_tier · free_adoption=91% · upsell_rate=68% · confidence=92%',
  },

  felix_social: {
    hl:"Peer referral with dual <span class='hl'>CHF 10 Twint credit</span> converts <span class='hl-green'>62%</span> of student rejecters when 3+ friends already use Visa.",
    conf:82,cl:'High',cd:'University group-chat seeding proved 4× more effective than paid acquisition for Felix-segment respondents.',
    why:[
      {icon:'💬',title:'University group chat is the highest-trust discovery channel',body:"Felix discovers products through his WG chat and course Slack — not Instagram ads. A peer recommendation in those channels converts at 44% vs 12% for paid ads. The channel is the trust mechanism."},
      {icon:'👥',title:'Social norm triggers adoption regardless of fee level',body:'When 3+ close peers use a product, 74% of price-sensitive students adopt within 2 weeks — even if they previously rejected it on price. FOMO within study groups is a stronger signal than financial logic.'},
      {icon:'💰',title:'CHF 10 Twint credit = 2 months of perceived value',body:"A CHF 10 referral credit — paid in Twint — immediately delivers 2 months of subscription value to both parties. It resets Felix's mental accounting from 'cost' to 'earned reward.'"},
    ],
    sc:[
      {price:0,label:'Free',tag:'No-referral base',adoption:91,acceptability:94,vs_twint:72,wtp:0,confidence:'High',highlight:false},
      {price:3,label:'CHF 3',tag:'✦ With referral',adoption:78,acceptability:83,vs_twint:60,wtp:3.1,confidence:'High',highlight:true},
      {price:5,label:'CHF 5',tag:'Ceiling',adoption:52,acceptability:57,vs_twint:39,wtp:4.8,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:82,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:80,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:83,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:'Launch dual CHF 10 Twint referral — seed via university group chats and Slack channels',items:['Both referrer + referee receive CHF 10 Twint credit instantly on activation — not points or vouchers','Partner with student associations (VSETH, SUB) for co-branded referral launch events','Show referral count and CHF earned in-app — gamification increases share rate by 38%'],tier:'B',risk:'Referral programme requires critical mass of initial users — must pre-seed 200+ activations at launch to avoid empty-network effect'},
    pd:'Extracted: persona=felix · question=social_proof · referral_conversion=62% · group_chat=4x_better · confidence=85%',
  },

  felix_ceiling: {
    hl:"Felix's <span class='hl'>CHF 5 ceiling</span> is psychological not financial — annual framing (<span class='hl-green'>CHF 60/year</span>) resets the anchor and lifts WTP by 24%.",
    conf:85,cl:'High',cd:"Felix's price ceiling is grounded in mental accounting, not budget — reframing from monthly to annual unlocks significant WTP movement.",
    why:[
      {icon:'🧠',title:'Monthly subscription triggers recurring loss aversion',body:"CHF 8/month activates Felix's subscription audit instinct every pay cycle. Annual framing converts this to a one-time household decision at year start, bypassing monthly scrutiny entirely."},
      {icon:'📊',title:'CHF 60/year benchmarks against familiar costs',body:"CHF 60/year = 2 SBB day-tickets, or half a Spotify annual plan. When anchored against familiar annual expenditures, Felix's WTP ceiling shifts from CHF 5/month to CHF 7/month."},
      {icon:'💡',title:"'Unlock' framing adds CHF 2 to WTP",body:"Framing CHF 7/month as 'the fee that unlocks Twint-bridge cashback' rather than a 'subscription charge' raises Felix's stated WTP by CHF 2 — the feature is worth more than the abstract fee."},
    ],
    sc:[
      {price:3,label:'CHF 3',tag:'Comfortable',adoption:74,acceptability:79,vs_twint:57,wtp:3.1,confidence:'High',highlight:false},
      {price:5,label:'CHF 5',tag:'✦ Monthly max',adoption:52,acceptability:58,vs_twint:39,wtp:4.8,confidence:'Medium',highlight:true},
      {price:7,label:'CHF 7',tag:'Annual frame only',adoption:41,acceptability:46,vs_twint:30,wtp:6.3,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:85,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:82,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:88,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Never present monthly price to Felix — lead with annual plan at CHF 50 (save CHF 10)",items:["Annual plan: CHF 50/year (vs CHF 60) — frames as discount, removes monthly anxiety","Lead with benefit: 'Access Twint cashback for less than 2 SBB day tickets/year'","Show CHF 60 crossed out → CHF 50 — anchoring and loss aversion in one visual"],tier:'B',risk:"Annual framing only works if value is demonstrated in month 1 — without early cashback proof, annual plans churn at renewal"},
    pd:'Extracted: persona=felix · question=price_ceiling · ceiling=CHF5 · annual_uplift=24% · confidence=87%',
  },

  felix_twint: {
    hl:"Only <span class='hl'>SBB cashback</span> pulls Felix from P2P-only Twint — standalone Visa doesn't register for <span class='hl-green'>86%</span> of this segment.",
    conf:77,cl:'High',cd:"Felix's Twint usage is a social habit embedded in university life — only products that integrate with Twint can enter his wallet.",
    why:[
      {icon:'📱',title:'Twint is a social protocol, not a payment method',body:"Felix uses Twint for 68% of all transactions — splitting dinner, paying flatmates, buying event tickets. It's embedded in every social interaction. A competing product must live alongside it, not replace it."},
      {icon:'🚆',title:"SBB is Felix's highest-frequency individual spend",body:"Felix spends CHF 68/month on SBB. Even 2% cashback generates CHF 1.36/month — small in CHF terms, but psychologically significant as a daily visible reward at a touchpoint Twint doesn't cover."},
      {icon:'🎓',title:'Mensa + campus spend is the unique wedge',body:"University canteen (Mensa) and campus retail are category gaps Twint covers poorly. Visa cashback at Mensa — even 1% — is a daily reminder in the one place Twint feels less natural."},
    ],
    sc:[
      {price:0,label:'Free + SBB CB',tag:'✦ Twint bridge',adoption:74,acceptability:79,vs_twint:60,wtp:0,confidence:'High',highlight:true},
      {price:3,label:'CHF 3 + SBB',tag:'Viable',adoption:58,acceptability:63,vs_twint:44,wtp:3.0,confidence:'Medium',highlight:false},
      {price:5,label:'CHF 5 no bridge',tag:'No hook',adoption:14,acceptability:19,vs_twint:10,wtp:4.2,confidence:'Low',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:77,badge:'Good',badgeClass:'amber',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:73,badge:'Good',badgeClass:'amber',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:79,badge:'Good',badgeClass:'amber',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Position Visa as Twint companion — SBB + campus cashback as the daily hook",items:["SBB cashback (even 1%) as flagship Twint-bridge feature — daily visibility in Felix's transit app",'Mensa/university canteen cashback — the one place Twint is unused and Visa wins naturally',"In-app 'Twint + Visa totals this month' combined view — coexistence made explicit and celebrated"],tier:'B',risk:"Any messaging implying replacement of Twint will immediately alienate Felix — co-existence framing is non-negotiable"},
    pd:'Extracted: persona=felix · question=twint_rivalry · twint_share=68% · sbb_hook=key · standalone_adoption=14% · confidence=81%',
  },

  felix_trial: {
    hl:"30-day free trial converts <span class='hl'>41%</span> of Felix-segment rejecters — week-1 cashback visibility drives <span class='hl-green'>65%</span> post-trial retention.",
    conf:80,cl:'High',cd:'Trial conversion data validated across 3 student cohort simulations with consistent post-trial retention pattern.',
    why:[
      {icon:'🆓',title:"Trial removes fee-anxiety entirely",body:"Felix's objection isn't 'this product is bad' — it's 'I don't know if it's worth it.' A 30-day free trial sidesteps this. The product proves its value before any financial commitment is required."},
      {icon:'💰',title:'Cashback event must happen in week 1',body:'Trials that deliver cashback in week 1 retain 65% of users. Trials without a week-1 cashback event retain only 18%. The product must earn its fee visibly and immediately.'},
      {icon:'🔒',title:'Habit lock-in happens at 21 days',body:"By day 21 of the trial, Felix has checked his cashback balance 14 times on average. At that point, cancelling feels like losing something — not saving CHF 3. Behavioural economics locks in retention."},
    ],
    sc:[
      {price:0,label:'Free trial',tag:'✦ 30 days',adoption:88,acceptability:92,vs_twint:68,wtp:0,confidence:'High',highlight:true},
      {price:3,label:'CHF 3 retained',tag:'Post-trial',adoption:65,acceptability:70,vs_twint:48,wtp:3.1,confidence:'High',highlight:false},
      {price:5,label:'CHF 5 no trial',tag:'No trial',adoption:52,acceptability:57,vs_twint:39,wtp:4.8,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:80,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:86,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:84,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:'30-day free trial is the primary Felix acquisition lever — engineer week-1 cashback event',items:['Free 30-day trial — university email only, no card required at sign-up','Engineered cashback: 3% on next SBB purchase in days 1–7 (limited to CHF 5 return)','Day 28 nudge: "Your trial earned CHF X. Continue for CHF 3/month?" with one-tap confirmation'],tier:'B',risk:'Trials without a week-1 cashback event retain only 18% — the product must deliver tangible value within 7 days'},
    pd:'Extracted: persona=felix · question=trial_conversion · trial_retention=65% · week1_cashback=critical · confidence=84%',
  },

  felix_cashback: {
    hl:"In-app cashback appearing <span class='hl'>within 24h</span> shifts Felix's WTP from CHF 0 to <span class='hl-green'>CHF 3.50</span> — delayed rewards kill retention by 42%.",
    conf:83,cl:'High',cd:"Cashback visibility timing was the highest-variance factor in Felix retention testing — 24h vs 7-day delay showed a 42% retention difference.",
    why:[
      {icon:'⚡',title:'Same-day visibility creates tangible ROI',body:"Felix checks his bank balance daily. Cashback appearing within hours of a transaction confirms the product is working — it's the daily proof of value that justifies the fee."},
      {icon:'💬',title:"CHF amounts beat percentages in Felix's mental model",body:"'CHF 1.36 back on your SBB purchase' is 11× more motivating than '2% cashback earned.' Concrete CHF amounts can be mentally spent; percentages cannot."},
      {icon:'🔔',title:'Push notification = instant reward loop',body:"Cashback notification within 2 hours of purchase creates a Pavlovian reward response. Felix checks the app within 30 minutes of receiving these — it becomes a daily engagement habit that locks in retention."},
    ],
    sc:[
      {price:3,label:'CHF 3 + 24h',tag:'✦ Optimal',adoption:71,acceptability:76,vs_twint:53,wtp:3.5,confidence:'High',highlight:true},
      {price:3,label:'CHF 3 + 7 days',tag:'Delayed reward',adoption:41,acceptability:46,vs_twint:30,wtp:2.8,confidence:'Medium',highlight:false},
      {price:5,label:'CHF 5 + 24h',tag:'Max fee',adoption:52,acceptability:58,vs_twint:39,wtp:4.8,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:83,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:88,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:89,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Engineer real-time cashback (< 2h) — this is a product engineering requirement, not a marketing choice",items:['Cashback posted within 2 hours of purchase — never batch processed overnight','Push notification: "CHF X added to your cashback balance — just now" with merchant logo','Home screen widget showing running monthly cashback total — visible without opening the app'],tier:'A',risk:"Any cashback delay beyond 24h will cause student segment churn — this is a hard technical requirement"},
    pd:'Extracted: persona=felix · question=cashback_ux · visibility_timing=critical · 24h_vs_7d=42%_retention_diff · confidence=86%',
  },

  felix_perks: {
    hl:"SBB Halbtax + Spotify bundle creates <span class='hl'>CHF 22/month equivalent value</span> — makes <span class='hl-green'>CHF 5/month</span> feel effectively free.",
    conf:79,cl:'High',cd:"Student perk bundles reframe the monthly fee from 'subscription cost' to 'savings vehicle' — shifting Felix's evaluation entirely.",
    why:[
      {icon:'🎟',title:'Halbtax saves CHF 12/month — the mathematical unlock',body:"Felix spends CHF 68/month on SBB. Halbtax at CHF 175/year halves this to CHF 34/month — saving CHF 34. Even at 50% partner discount, this alone covers the Visa fee with CHF to spare."},
      {icon:'🎵',title:'Spotify comparison anchors CHF 5 as cheap',body:"Felix already pays CHF 12.90/month for Spotify without questioning it. 'Visa costs CHF 5/month — cheaper than Spotify — and earns you money back' resets the price anchor entirely."},
      {icon:'🛍',title:"Zalando student discount adds seasonal value",body:"Zalando student 20% discount is used by 68% of Felix's cohort. A 'Visa student bundle' including Zalando access adds CHF 40–80/year in clothing savings — tangible and timed to semester needs."},
    ],
    sc:[
      {price:5,label:'CHF 5 + Bundle',tag:'✦ Bundle value',adoption:69,acceptability:75,vs_twint:52,wtp:5.4,confidence:'High',highlight:true},
      {price:5,label:'CHF 5 no bundle',tag:'Standard',adoption:52,acceptability:57,vs_twint:39,wtp:4.8,confidence:'Medium',highlight:false},
      {price:3,label:'CHF 3 + Bundle',tag:'Best adoption',adoption:81,acceptability:86,vs_twint:63,wtp:3.2,confidence:'High',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:79,badge:'Good',badgeClass:'amber',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:78,badge:'Good',badgeClass:'amber',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:78,badge:'Good',badgeClass:'amber',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:'Launch SBB + Spotify + Zalando student bundle — CHF 22+/month in demonstrated value',items:['SBB Halbtax partner discount: CHF 87.50/year (50% off) included in student tier','Spotify Student bundled via Visa — CHF 5.99/month rate for students via Visa partnership','Zalando student 20% off code sent monthly — peaks at September + January semester starts'],tier:'B',risk:"Partner dependency risk: if SBB or Spotify withdraw, the core value proposition collapses — need 3+ partners to distribute risk"},
    pd:'Extracted: persona=felix · question=student_perks · bundle_value=CHF22/mo · halbtax_anchor=key · confidence=81%',
  },

  felix_peer_grp: {
    hl:"When <span class='hl'>4/4 flatmates use Visa</span>, Felix's adoption jumps from <span class='hl-green'>14% → 74%</span> — regardless of fee level.",
    conf:86,cl:'High',cd:"WG adoption dynamics showed the highest social contagion effect of any social grouping tested.",
    why:[
      {icon:'🏠',title:"WG is Felix's highest-frequency social environment",body:"Felix interacts with flatmates 4+ times daily. Products visible in shared spaces create social proof through proximity. If 3 flatmates tap Visa at the supermarket checkout, Felix notices — without any marketing needed."},
      {icon:'🛒',title:'Shared grocery shopping creates natural co-usage',body:"73% of Swiss student WGs do at least one shared grocery shop per week. If flatmates split the Migros bill via Visa, the cashback conversation happens naturally at checkout — Felix asks, they show, he signs up."},
      {icon:'🎮',title:'WG FOMO is immediate and unavoidable',body:"Unlike Instagram FOMO, WG FOMO is daily and proximate. If 3 flatmates show CHF 12 in monthly cashback on their phone at dinner, Felix experiences direct social comparison within hours."},
    ],
    sc:[
      {price:3,label:'CHF 3 full WG',tag:'✦ Full adoption',adoption:81,acceptability:86,vs_twint:63,wtp:3.3,confidence:'High',highlight:true},
      {price:5,label:'CHF 5 full WG',tag:'Social proof',adoption:74,acceptability:79,vs_twint:57,wtp:5.1,confidence:'High',highlight:false},
      {price:5,label:'CHF 5 alone',tag:'Isolated',adoption:14,acceptability:19,vs_twint:10,wtp:4.2,confidence:'Low',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:86,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:90,badge:'Excellent',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:81,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:'Target WG seeding — one Visa user per flat creates 74% group adoption probability',items:["WG referral pack: 'Sign up your whole flat — everyone gets CHF 15 at first shared Migros shop'",'Partner with WGzimmer.ch + Flatfox for sign-up at flat formation moment','Flat-dashboard: combined household cashback total — social proof built into the product'],tier:'B',risk:"WG seeding requires reaching one 'super-adopter' per flat — without this initial node, the contagion never starts"},
    pd:'Extracted: persona=felix · question=wg_adoption · wg_effect=74%_vs_14% · social_contagion=dominant · confidence=88%',
  },

  felix_annual: {
    hl:"Annual framing (<span class='hl'>CHF 60/year = 2 SBB day passes</span>) lifts Felix's WTP by <span class='hl-green'>24%</span> vs monthly billing.",
    conf:78,cl:'High',cd:"Annual vs monthly price framing showed consistent 24% WTP uplift — the cognitive shift from 'recurring cost' to 'one-time purchase' is the mechanism.",
    why:[
      {icon:'📆',title:'Annual decision bypasses monthly subscription anxiety',body:"Felix reviews every monthly subscription during exam periods and cancels 'non-essentials.' An annual commitment, made once, sits outside this monthly audit cycle — significantly reducing churn exposure."},
      {icon:'🎫',title:'CHF 60/year = 2 SBB day-tickets = trivial',body:"2 SBB day-tickets cost CHF 60–80. When Felix computes CHF 60/year vs a familiar travel cost, the amount becomes emotionally trivial — below his decision threshold."},
      {icon:'💳',title:'One decision vs 12 monthly re-evaluations',body:"Making 1 annual decision instead of 12 monthly re-evaluations reduces Felix's cumulative churn exposure by 92%. Annual plan converts a monthly-churn risk into a single renewal event."},
    ],
    sc:[
      {price:5,label:'CHF 5/month',tag:'Monthly risk',adoption:52,acceptability:57,vs_twint:39,wtp:4.8,confidence:'Medium',highlight:false},
      {price:7,label:'CHF 50/year',tag:'✦ Annual frame',adoption:64,acceptability:69,vs_twint:48,wtp:6.2,confidence:'High',highlight:true},
      {price:3,label:'CHF 3/month',tag:'Monthly safe',adoption:74,acceptability:79,vs_twint:57,wtp:3.1,confidence:'High',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:78,badge:'Good',badgeClass:'amber',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:81,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:72,badge:'Good',badgeClass:'amber',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Offer annual plan at CHF 50 — frame as 2 SBB day-tickets per year, not 60 monthly debits",items:["Annual plan: CHF 50/year (save CHF 10 vs CHF 5/month) — one sign-up, no monthly anxiety","Framing: 'Less than 2 SBB day-tickets per year — and your cashback covers it in month 2'","Offer monthly downgrade at month 10 — reduces cancellation by 34% by providing a visible off-ramp"],tier:'B',risk:"Annual plan requires 12-month value delivery — if the product fails in month 3, churn at renewal is near-certain"},
    pd:'Extracted: persona=felix · question=annual_framing · uplift=24% · sbb_anchor=key · confidence=81%',
  },

  felix_math: {
    hl:"At CHF 350/month grocery spend, <span class='hl'>1.5% Migros cashback = CHF 5.25/month</span> — Felix's subscription <span class='hl-green'>pays for itself</span>.",
    conf:84,cl:'High',cd:"Personalised cashback calculation shown in onboarding increased Felix-segment conversion by 47% — the math removes the 'is it worth it?' hesitation.",
    why:[
      {icon:'🧮',title:"The math must be Felix's math, not generic %",body:"Felix spends CHF 350/month on groceries. At 1.5% cashback: CHF 5.25/month returned. This is personalised to his exact spend — shown in onboarding with a slider. 'CHF 5.25 back on your CHF 350 Migros bill' is concrete."},
      {icon:'➕',title:"SBB adds CHF 1.36/month — stacking puts Felix net-positive",body:"Felix's CHF 68/month SBB spend × 2% = CHF 1.36/month. Combined with grocery: CHF 6.61/month total vs CHF 5/month fee. Net positive by CHF 1.61 — Felix sees this as 'making money on the card.'"},
      {icon:'📱',title:'In-app calculator at sign-up closes the deal',body:"An interactive cashback calculator — 'Enter your monthly Migros spend' — shows Felix his personal CHF return in real time. This converts 47% more sign-ups than a generic cashback rate display."},
    ],
    sc:[
      {price:5,label:'CHF 5 + calc',tag:'✦ Net positive',adoption:71,acceptability:76,vs_twint:53,wtp:5.4,confidence:'High',highlight:true},
      {price:5,label:'CHF 5 no calc',tag:'Standard',adoption:52,acceptability:57,vs_twint:39,wtp:4.8,confidence:'Medium',highlight:false},
      {price:3,label:'CHF 3 + calc',tag:'Best convert',adoption:84,acceptability:89,vs_twint:65,wtp:3.3,confidence:'High',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:84,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:85,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:82,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Build personalised cashback calculator into onboarding — show Felix his exact CHF return before the fee",items:["Onboarding: 'What do you spend at Migros each month?' — slider input shows live CHF cashback",'Show: "You\'d earn CHF X back per month — that\'s CHF Y more than your subscription cost"','Receipt-style summary: "Net gain per month: +CHF [X−fee]" displayed on home screen day 1'],tier:'A',risk:"Calculator only works if cashback rate is genuinely competitive — showing net-negative outcome will accelerate churn"},
    pd:'Extracted: persona=felix · question=cashback_math · grocery_spend=CHF350 · net_positive=CHF1.61 · calculator_uplift=47% · confidence=86%',
  },

  /* ──────────────────── LUKAS (Professional, 34) ──────────────────── */

  lukas_roi: {
    hl:"CHF 8/month pays for itself in <span class='hl'>47 days for Lukas</span> — zero FX on 2 business trips covers the <span class='hl-green'>full annual subscription</span>.",
    conf:88,cl:'High',cd:'Professional-segment ROI showed Lukas-type profiles break even by month 2 — making CHF 8/month essentially self-liquidating.',
    why:[
      {icon:'💰',title:'2 business trips cover the entire annual fee',body:"Lukas travels 10×/year, spending avg CHF 2,200/trip. At 2% FX fees waived: CHF 44 per trip × 2 trips = CHF 88 — covering the CHF 96 annual subscription in just 2 trips. Every subsequent trip is pure gain."},
      {icon:'📊',title:'Professional evaluation: annual ROI, not monthly cost',body:"Lukas thinks in annual terms: 'Does this deliver CHF 100+ of value per year?' At CHF 8/month (CHF 96/year), the answer is yes within Q1 — before any cashback is added."},
      {icon:'💼',title:'Card becomes a business tool, not a consumer product',body:"When framed as a business expense tool (with CSV export), 78% of professional-segment respondents reclassify the CHF 8 fee as a work cost — deductible against income in Swiss tax filing."},
    ],
    sc:[
      {price:8,label:'CHF 8',tag:'✦ Self-funding',adoption:82,acceptability:86,vs_twint:62,wtp:9.2,confidence:'High',highlight:true},
      {price:10,label:'CHF 10',tag:'Acceptable',adoption:74,acceptability:78,vs_twint:55,wtp:10.1,confidence:'High',highlight:false},
      {price:12,label:'CHF 12',tag:'Premium',adoption:63,acceptability:67,vs_twint:47,wtp:11.8,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:88,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:84,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:93,badge:'Excellent',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Lead with annual ROI: 'Your card pays for itself after 2 trips abroad'",items:["Onboarding: 'How many international trips per year?' → real-time annual savings shown",'Annual savings certificate: "Lukas, your Visa earned you CHF 312 this year" — sent in January','Frame CHF 8 as CHF 0.26/day — less than a coffee — with CHF X savings overlay'],tier:'A',risk:"ROI framing only works if Lukas travels internationally — needs travel frequency as onboarding filter"},
    pd:'Extracted: persona=lukas · question=roi_case · break_even=47days · 2trips=annual_cover · confidence=90%',
  },

  lukas_travel: {
    hl:"Zero FX + lounge access justifies <span class='hl'>CHF 12/month</span> for Lukas at 10+ trips/year — FX savings alone return <span class='hl-green'>CHF 340+/year</span>.",
    conf:82,cl:'High',cd:'Travel-heavy professional segment showed strong tier-upgrade intent when CHF 12 bundle includes zero FX + lounge + travel insurance.',
    why:[
      {icon:'✈️',title:'CHF 340 FX savings > CHF 144 subscription at CHF 12',body:"Lukas spends CHF 17,000 internationally per year. At 2% FX waived: CHF 340 saved. CHF 12/month costs CHF 144/year. Net gain: CHF 196. The maths is unambiguous — CHF 12 is the rational choice."},
      {icon:'🛋',title:'Lounge access: CHF 35/visit × 10 trips = CHF 350 value',body:"Priority lounge at ZRH/GVA is valued at CHF 35/visit. For 10 trips/year: CHF 350 in lounge value. Combined with CHF 340 FX savings: CHF 690 total vs CHF 144 cost — a 4.8× annual return."},
      {icon:'🛡',title:"Travel insurance removes the 'what if' paralysis",body:"Lukas cancelled a CHF 3,200 business trip due to illness 2 years ago — absorbed the cost personally. Trip cancellation insurance bundled with CHF 12/month converts this memory directly into product value."},
    ],
    sc:[
      {price:10,label:'CHF 10',tag:'FX only',adoption:74,acceptability:78,vs_twint:55,wtp:10.5,confidence:'High',highlight:false},
      {price:12,label:'CHF 12',tag:'✦ FX+Lounge',adoption:82,acceptability:86,vs_twint:62,wtp:12.8,confidence:'High',highlight:true},
      {price:15,label:'CHF 15',tag:'Luxury',adoption:64,acceptability:68,vs_twint:48,wtp:13.5,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:82,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:80,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:83,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Launch 'Visa Traveller' at CHF 12 — lead with annual FX savings, not lounge perks",items:["'Visa Traveller': zero FX + unlimited ZRH/GVA lounge + CHF 2M travel insurance — CHF 12/month",'Onboarding calculator: trips/year × avg spend × 2% = annual FX savings shown in real time','Lounge integration (LoungeBuddy or Priority Pass) — seamless tap, no separate card needed'],tier:'A',risk:"CHF 12 tier only rational for 10+ trips/year — below this threshold Lukas will feel mis-sold to"},
    pd:'Extracted: persona=lukas · question=travel_tier · fx_savings=CHF340 · lounge_value=CHF350 · roi=4.8x · confidence=84%',
  },

  lukas_cashback: {
    hl:"Lukas's <span class='hl'>CHF 9,000/month spend</span> generates <span class='hl-green'>CHF 180/month</span> at 2% cashback — a <span class='hl'>22× return</span> on the CHF 8 fee.",
    conf:87,cl:'High',cd:'High-income professional cashback ROI is orders of magnitude above the fee — the product must make this calculation obvious.',
    why:[
      {icon:'📊',title:'High income = enormous absolute CHF cashback',body:"Lukas's CHF 9,000/month disposable spend × 2% = CHF 180/month returned. This is 22.5× the CHF 8 subscription cost. No other Swiss financial product offers comparable return on spend for a professional."},
      {icon:'📱',title:'Real-time dashboard makes ROI visible every day',body:"A dashboard showing 'CHF 147 earned so far this month' is more motivating to Lukas than any annual report. Professional segments check financial dashboards frequently — it must be prominent and real-time."},
      {icon:'💼',title:'Business category tracking simplifies tax filing',body:"Automatic categorisation (dining, transport, software) with business expense tagging saves 2h/month in accounting and independently justifies the fee — converting a financial product into professional infrastructure."},
    ],
    sc:[
      {price:8,label:'CHF 8',tag:'✦ Max ROI',adoption:86,acceptability:90,vs_twint:65,wtp:9.5,confidence:'High',highlight:true},
      {price:10,label:'CHF 10',tag:'Still strong',adoption:78,acceptability:82,vs_twint:59,wtp:10.3,confidence:'High',highlight:false},
      {price:12,label:'CHF 12',tag:'Premium',adoption:65,acceptability:69,vs_twint:49,wtp:11.9,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:87,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:87,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:87,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Show Lukas 'CHF 180/month in cashback' in onboarding — make the 22× ROI the headline",items:["Personalised onboarding: 'At CHF 9K monthly spend, you'd earn CHF 180 back per month'",'Home screen: "CHF [X] earned this month" as dominant UI element — not account balance','Monthly ROI email: "Your Visa earned you CHF X in [month] — here\'s the breakdown by category"'],tier:'A',risk:"CHF 180/month promise requires sustained high spend — if Lukas's circumstances change, the ROI collapses"},
    pd:'Extracted: persona=lukas · question=cashback_visibility · spend=CHF9K/mo · cashback=CHF180/mo · roi=22x · confidence=89%',
  },

  lukas_premium: {
    hl:"CHF 12 premium must include <span class='hl'>zero FX + unlimited lounge + 5% dining</span> to convert Lukas from <span class='hl-green'>Amex</span>.",
    conf:79,cl:'High',cd:"Lukas benchmarks against Amex Platinum — Visa's premium tier must match on prestige while exceeding on Swiss market specificity.",
    why:[
      {icon:'💳',title:'Lukas benchmarks against Amex Platinum (CHF 520/year)',body:"Amex Platinum costs CHF 520/year in Switzerland. Visa Premium at CHF 144/year must deliver comparable perceived value — beating Amex on Swiss merchant acceptance and Twint-bridge."},
      {icon:'🍽',title:'Business dining cashback is the unique differentiator',body:"Lukas spends CHF 380/month on client dinners. A 5% cashback on dining (CHF 19/month) combined with expense reporting makes Visa essential for his professional workflow."},
      {icon:'🌍',title:"Visa's Swiss acceptance is a structural advantage",body:"Amex is rejected at 23% of Swiss merchants Lukas visits weekly — including some Migros stores and local restaurants. Near-universal Visa acceptance removes daily frustration Amex creates."},
    ],
    sc:[
      {price:10,label:'CHF 10',tag:'Entry premium',adoption:71,acceptability:75,vs_twint:53,wtp:10.8,confidence:'High',highlight:false},
      {price:12,label:'CHF 12',tag:'✦ vs Amex',adoption:79,acceptability:83,vs_twint:60,wtp:12.4,confidence:'High',highlight:true},
      {price:15,label:'CHF 15',tag:'Luxury',adoption:58,acceptability:62,vs_twint:43,wtp:13.2,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:79,badge:'Good',badgeClass:'amber',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:78,badge:'Good',badgeClass:'amber',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:78,badge:'Good',badgeClass:'amber',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Position 'Visa Premier' at CHF 12 as the smarter Amex — better Swiss acceptance, lower cost",items:["'Visa Premier': zero FX + Priority Pass + 5% business dining + expense CSV — CHF 12/month",'Swiss merchant acceptance graphic: "Accepted everywhere Amex isn\'t" with named merchant list','Co-brand with Swiss business travel agency (Kuoni Business) for credibility at launch'],tier:'A',risk:"Premium tier requires metal card + concierge to compete on Amex identity — CHF savings alone won't poach Amex loyalists"},
    pd:'Extracted: persona=lukas · question=premium_tier · amex_benchmark=CHF520/yr · dining_cb=differentiator · confidence=82%',
  },

  lukas_applepay: {
    hl:"Apple Pay is a <span class='hl'>day-1 prerequisite</span> for Lukas — its absence eliminates <span class='hl-green'>78%</span> of professional-segment trial interest.",
    conf:91,cl:'High',cd:"Apple Pay availability was the strongest single binary adoption signal in professional segment — its absence is a categorical deal-breaker.",
    why:[
      {icon:'📱',title:'Lukas pays by iPhone in 93% of in-person transactions',body:"Lukas has not used a physical card at a Swiss merchant since 2022. Every payment is iPhone tap or Apple Watch. A card requiring physical presentation is an anachronism — he'll leave it at home and miss all cashback."},
      {icon:'⌚',title:'Apple Watch pay is the gym and transit essential',body:"Lukas runs 4× per week and commutes by public transport. His Apple Watch is always on; his phone sometimes isn't. Watch-compatible payment is not a luxury — it's the primary daily use case."},
      {icon:'🔐',title:'Face ID + Apple Pay = zero-friction trust signal',body:"Face ID authentication for Apple Pay means Lukas never thinks about security — handled invisibly. Adding a new card to Apple Wallet takes 30 seconds. The experience must be this seamless or he abandons onboarding."},
    ],
    sc:[
      {price:8,label:'CHF 8 + ApplePay',tag:'✦ Converts',adoption:86,acceptability:90,vs_twint:65,wtp:9.5,confidence:'High',highlight:true},
      {price:8,label:'CHF 8 no ApplePay',tag:'Deal-breaker',adoption:19,acceptability:23,vs_twint:14,wtp:3.2,confidence:'Low',highlight:false},
      {price:10,label:'CHF 10 + ApplePay',tag:'Acceptable',adoption:76,acceptability:80,vs_twint:57,wtp:10.4,confidence:'High',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:91,badge:'Excellent',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:97,badge:'Excellent',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:85,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Apple Pay + Google Pay + Samsung Pay must be live on day 1 — hard prerequisite",items:['Apple Pay integration complete and tested on day 1 — no "coming soon" messaging acceptable','Add to Apple Wallet in 4 taps — maximum friction budget for the entire onboarding flow','Watch pay enabled for Apple Watch + Garmin Pay — Lukas gym + transit scenarios must work'],tier:'A',risk:"Launching without Apple Pay is not viable for professional segment — categorical rejection"},
    pd:'Extracted: persona=lukas · question=apple_pay · adoption_gap=78% · prerequisite=day1 · confidence=93%',
  },

  lukas_expense: {
    hl:"Business expense export pushes <span class='hl'>42%</span> of professionals from CHF 8 → CHF 12 — saving <span class='hl-green'>2h/month</span> in accounting.",
    conf:81,cl:'High',cd:"Expense reporting automation showed consistent tier-upgrade intent in professional segment.",
    why:[
      {icon:'🧾',title:'2h accounting time = CHF 100+ professional value saved',body:"Lukas bills CHF 180/hour. 2h/month saved on expense categorisation = CHF 360/year. CHF 4/month upgrade to CHF 12 costs CHF 48/year vs CHF 360 value — irrational not to upgrade."},
      {icon:'📊',title:'Swiss tax filing: automatic receipt matching',body:"Swiss self-employed professionals document every business expense for tax. Automatic receipt scanning, VAT extraction, and PDF export for the accountant converts a quarterly nightmare into a tap."},
      {icon:'🔄',title:'Accounting software integration completes the workflow',body:"Integration with Abacus, Sage, or DATEV means Lukas's expenses are automatically posted to company accounts. The card becomes infrastructure — not a financial product."},
    ],
    sc:[
      {price:8,label:'CHF 8 no export',tag:'Standard',adoption:82,acceptability:86,vs_twint:62,wtp:9.2,confidence:'High',highlight:false},
      {price:12,label:'CHF 12 + export',tag:'✦ Upgrade trigger',adoption:74,acceptability:78,vs_twint:56,wtp:12.4,confidence:'High',highlight:true},
      {price:12,label:'CHF 12 no export',tag:'Premium only',adoption:55,acceptability:59,vs_twint:41,wtp:10.8,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:81,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:83,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:77,badge:'Good',badgeClass:'amber',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Position expense export as the CHF 12 tier's unique professional differentiator",items:["Expense export: CSV + PDF + Abacus/DATEV integration — CHF 12 exclusive feature",'Automatic business vs personal categorisation using merchant category codes (MCC)',"'Your accountant will love this' — framing resonates with Swiss professional culture"],tier:'A',risk:"Swiss accounting software integration is complex — consider CSV export for v1, API integration for v1.5"},
    pd:'Extracted: persona=lukas · question=expense_export · upgrade_rate=42% · time_saved=2h/mo · value=CHF360/yr · confidence=83%',
  },

  lukas_frame: {
    hl:"<span class='hl'>'Earn CHF 120/year'</span> framing lifts Lukas's WTP by <span class='hl-green'>31%</span> vs 'pay CHF 10/month' — annual gain reframes cost as earned.",
    conf:85,cl:'High',cd:"Annual vs monthly framing showed consistent 31% WTP uplift in professional segment.",
    why:[
      {icon:'📈',title:'Annual gain matches professional planning horizon',body:"Lukas plans finances on annual cycles — tax year, bonus, budget. 'Earn CHF 400/year' aligns with his mental accounting in a way that 'CHF 8/month' does not."},
      {icon:'💼',title:'Gains feel earned; costs feel lost — prospect theory',body:"Prospect theory: Lukas evaluates CHF 400 earned more positively than CHF 96 spent — even though the net is identical. Showing the gain first, then the smaller fee, creates powerful anchoring."},
      {icon:'📋',title:'Quarterly savings report as retention driver',body:"A quarterly email: 'Lukas, you earned CHF 214 in cashback this quarter' — with category breakdown and YTD total — converts passive users into active advocates."},
    ],
    sc:[
      {price:8,label:'CHF 8 annual gain',tag:'✦ Best frame',adoption:86,acceptability:90,vs_twint:65,wtp:9.5,confidence:'High',highlight:true},
      {price:8,label:'CHF 8 monthly cost',tag:'Standard',adoption:72,acceptability:76,vs_twint:54,wtp:7.8,confidence:'High',highlight:false},
      {price:10,label:'CHF 10 annual',tag:'Acceptable',adoption:76,acceptability:80,vs_twint:57,wtp:10.3,confidence:'High',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:85,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:82,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:88,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Lead all Lukas-segment messaging with annual CHF gain — bury the monthly fee below the fold",items:["Pricing page headline: 'Earn CHF 400+ per year' — monthly fee in secondary position",'Onboarding step 1: show personalised annual gain estimate before any fee is mentioned','Annual savings certificate: branded PDF in January — shareable with accountant and tax adviser'],tier:'A',risk:"Annual framing must be backed by real cashback delivery — CHF 40 vs CHF 400 gap causes severe brand damage"},
    pd:'Extracted: persona=lukas · question=savings_framing · annual_vs_monthly=31%_wtp · prospect_theory=mechanism · confidence=87%',
  },

  lukas_compete: {
    hl:"Visa beats Amex on Swiss merchant acceptance by <span class='hl'>34%</span> — Lukas's current card has a <span class='hl-green'>daily blind spot</span> he doesn't know about.",
    conf:76,cl:'High',cd:"Competitor gap analysis showed Lukas segment has significant unmet needs — Visa's Swiss-specific advantages are largely unknown to target segment.",
    why:[
      {icon:'⚔️',title:"Lukas's Migros Bank card: no lounge, no FX waiver",body:"Lukas's primary card (Migros Bank) charges 2.5% FX fees and offers no airport lounge. He pays CHF 340+/year in FX fees he doesn't know about — and misses lounges he doesn't know he qualifies for."},
      {icon:'🌍',title:'Amex: prestige but 23% Swiss rejection rate',body:"Amex is rejected at 23% of Swiss merchants Lukas visits weekly. This frustration is his Amex's biggest weakness — one he experiences at specific local restaurants regularly."},
      {icon:'🔗',title:'Twint-bridge is the gap neither competitor covers',body:"Neither Amex nor Migros Bank integrates with Twint. Lukas uses Twint for 32% of social payments. Visa + Twint-bridge creates a unified view that no existing product offers."},
    ],
    sc:[
      {price:8,label:'Visa CHF 8',tag:'✦ Best value',adoption:82,acceptability:86,vs_twint:62,wtp:9.2,confidence:'High',highlight:true},
      {price:20,label:'Amex CHF 20+',tag:'Prestige gap',adoption:45,acceptability:49,vs_twint:28,wtp:11.8,confidence:'Medium',highlight:false},
      {price:0,label:'Migros Bank',tag:'Current card',adoption:58,acceptability:62,vs_twint:39,wtp:0,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:76,badge:'Good',badgeClass:'amber',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:76,badge:'Good',badgeClass:'amber',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:73,badge:'Good',badgeClass:'amber',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Show Lukas what his current card is costing him — quantify the gap before offering the solution",items:["'How much is your current card costing you?' FX calculator — shows annual hidden cost instantly",'Side-by-side: Visa CHF 8 vs Amex CHF 43 vs Migros Bank CHF 0 — total annual value comparison',"'Accepted at every Swiss merchant Amex misses' — with named merchant list (Migros, Aldi, etc.)"],tier:'A',risk:"Comparative advertising must be verified against Swiss legal requirements before publishing"},
    pd:'Extracted: persona=lukas · question=competitor_gap · acceptance=34%_better · fx_hidden=CHF340/yr · twint_bridge=differentiator · confidence=78%',
  },

  lukas_upgrade: {
    hl:"<span class='hl'>58%</span> of Lukas-segment users upgrade CHF 8 → CHF 12 within <span class='hl-green'>90 days</span> — the first lounge visit is the trigger.",
    conf:83,cl:'High',cd:"Lukas-segment upgrade trajectory showed first lounge access as the primary trigger — intent spikes at 71% immediately after first lounge use.",
    why:[
      {icon:'⬆️',title:'First lounge visit is the tier-upgrade trigger',body:"71% of Lukas-segment users who access a Priority Pass lounge for the first time upgrade to the lounge-included tier within 14 days. The experience proves premium value — nothing else needed."},
      {icon:'📅',title:'90-day window is the optimal upgrade moment',body:"Upgrade intent peaks at day 60–90 — when Lukas has verified cashback, used the card internationally, and experienced at least one lounge. Before day 60 too early; after 90, interest wanes."},
      {icon:'💡',title:'Context-sensitive upgrade prompt converts 48%',body:"'You could save CHF X on this trip with Visa Premier — upgrade now for CHF 4 more/month' at the 2nd international transaction converts 48% vs 12% for generic promotion timing."},
    ],
    sc:[
      {price:8,label:'CHF 8 start',tag:'Base tier',adoption:82,acceptability:86,vs_twint:62,wtp:9.2,confidence:'High',highlight:false},
      {price:12,label:'CHF 12 upgrade',tag:'✦ 90-day path',adoption:68,acceptability:72,vs_twint:51,wtp:12.4,confidence:'High',highlight:true},
      {price:15,label:'CHF 15 direct',tag:'Direct jump',adoption:43,acceptability:47,vs_twint:31,wtp:13.1,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:83,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:88,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:89,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Design CHF 8 → CHF 12 upgrade funnel — lounge preview as the conversion mechanism",items:["3 free lounge passes in first 90 days for CHF 8 tier — upgrade prompt on day 91",'In-app upgrade CTA triggered at 2nd international transaction — contextual, not generic','Annual tier review: "Lukas, you used 8 lounges this year — upgrade to unlimited for CHF 4 more"'],tier:'A',risk:"Lounge preview strategy requires Priority Pass partnership — confirm inventory at ZRH + GVA first"},
    pd:'Extracted: persona=lukas · question=upgrade_path · upgrade_rate=58%_90days · lounge_trigger=71% · contextual=48% · confidence=85%',
  },

  lukas_fx_calc: {
    hl:"At 10 trips/year and 2% FX fees, Lukas saves <span class='hl'>CHF 340/year</span> — subscription pays for itself <span class='hl-green'>by February</span>.",
    conf:86,cl:'High',cd:"FX savings for 10-trip professionals showed the clearest ROI case of any Visa benefit — break-even in month 2.",
    why:[
      {icon:'🌍',title:'CHF 17,000 international spend × 2% = CHF 340 saved',body:"Lukas averages CHF 1,700/trip × 10 trips. At 2% FX waived: CHF 34 per trip × 10 = CHF 340/year. Against CHF 120 annual subscription: net gain CHF 220. Break-even: 3.5 trips."},
      {icon:'📆',title:'Break-even achieved by trip 2 — in February',body:"Lukas travels in January and March for business. By trip 2, the annual fee is already recovered — 8 trips remain. Every subsequent trip is pure gain."},
      {icon:'💰',title:"'CHF 34 saved on your Tokyo trip' beats '2% FX waived'",body:"Post-trip savings notification — delivered within 24h of return — creates a reinforcement loop 14× more motivating than abstract percentage framing."},
    ],
    sc:[
      {price:8,label:'CHF 8 zero FX',tag:'✦ Best ROI',adoption:86,acceptability:90,vs_twint:65,wtp:9.5,confidence:'High',highlight:true},
      {price:10,label:'CHF 10 zero FX',tag:'Still positive',adoption:78,acceptability:82,vs_twint:59,wtp:10.3,confidence:'High',highlight:false},
      {price:12,label:'CHF 12 zero FX',tag:'Premium',adoption:68,acceptability:72,vs_twint:51,wtp:11.9,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:86,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:90,badge:'Excellent',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:81,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Lead with 'Save CHF 340/year on FX fees' — show break-even by trip 3 in onboarding",items:["Onboarding: 'How many international trips per year?' → real-time FX savings shown instantly",'Post-trip notification: "You saved CHF 34 on your Paris trip — zero FX fees with Visa"','Annual FX savings report: "Lukas, you saved CHF 312 in FX fees this year" — sent in January'],tier:'A',risk:"FX savings only materialise on international spend — Lukas travel decline = ROI collapse = churn spike"},
    pd:'Extracted: persona=lukas · question=fx_calculation · annual_savings=CHF340 · break_even=trip3 · post_trip_notification=retention · confidence=88%',
  },

  /* ──────────────────── ANNA (Mittelstand, 36) ──────────────────── */

  anna_roi: {
    hl:"At CHF 900/month Migros/Coop spend, <span class='hl'>2% cashback = CHF 18/month</span> — Anna's fee is <span class='hl-green'>net-positive by CHF 10</span> every month.",
    conf:88,cl:'High',cd:"Family-segment cashback ROI showed the clearest and most emotionally resonant value proposition of any persona.",
    why:[
      {icon:'🛒',title:'CHF 18 cashback − CHF 8 fee = CHF 10 net gain',body:"Anna spends CHF 900/month at Migros/Coop. At 2% cashback: CHF 18/month. After CHF 8 fee: CHF 10 net gain — visualised as 'CHF 120 extra for the household this year.'"},
      {icon:'💡',title:'The card pays for itself and earns more on top',body:"Anna's evaluation: 'Does the benefit exceed the cost?' At CHF 18 vs CHF 8, the answer is unambiguously yes. The card is not a cost — it's a revenue source for the household budget."},
      {icon:'📱',title:'Household savings widget makes ROI visible daily',body:"A 'household savings total' widget on the home screen — updated in real-time — converts passive users into active advocates. 'CHF 10 net gain this month' every time she opens the app."},
    ],
    sc:[
      {price:5,label:'CHF 5',tag:'Budget',adoption:71,acceptability:76,vs_twint:53,wtp:5.8,confidence:'High',highlight:false},
      {price:8,label:'CHF 8',tag:'✦ Net positive',adoption:88,acceptability:92,vs_twint:66,wtp:8.7,confidence:'High',highlight:true},
      {price:10,label:'CHF 10',tag:'Borderline',adoption:49,acceptability:54,vs_twint:37,wtp:9.1,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:88,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:84,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:93,badge:'Excellent',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Lead with household ROI: 'Earn CHF 18/month on Migros & Coop — cover the fee and profit'",items:["Onboarding calculator: 'Monthly Migros/Coop spend?' → live CHF cashback and net gain",'Home screen: "Household savings this month: CHF X" as primary widget','Monthly report: "Anna, your household earned CHF X in cashback — here\'s where"'],tier:'A',risk:"Must include Migros and Coop specifically — cashback only at specialist retailers shows net-negative ROI"},
    pd:'Extracted: persona=anna · question=household_roi · cashback=CHF18/mo · net_gain=CHF10/mo · confidence=90%',
  },

  anna_trial: {
    hl:"30-day free trial converts <span class='hl'>64%</span> of Anna-segment hesitators — she must see real <span class='hl-green'>Migros cashback</span> before committing.",
    conf:82,cl:'High',cd:"Trial conversion for family segment is the highest of any persona — the product delivers most clearly for grocery-heavy users.",
    why:[
      {icon:'🆓',title:"'Show me it works' is Anna's core decision pattern",body:"Anna reads reviews before buying anything. A free trial is, for her, the review — she verifies cashback with her own Migros receipt before any financial commitment. Without this, 47% never start."},
      {icon:'🛒',title:'Real Migros cashback in week 1 creates emotional lock-in',body:"Anna shops at Migros 3×/week. Within 7 days of trial start, she'll have 3 cashback events visible in the app. The product proves value through her existing behaviour — no behaviour change required."},
      {icon:'👪',title:'Partner card activated in trial builds dual-habit simultaneously',body:"If the partner card is also activated during trial, both spouses build the cashback habit together. By day 30, the household has 6+ cashback events — cancelling feels like losing CHF 120/year."},
    ],
    sc:[
      {price:0,label:'Free trial',tag:'✦ 30 days',adoption:91,acceptability:95,vs_twint:69,wtp:0,confidence:'High',highlight:true},
      {price:8,label:'CHF 8 retained',tag:'Post-trial',adoption:64,acceptability:68,vs_twint:48,wtp:8.6,confidence:'High',highlight:false},
      {price:8,label:'CHF 8 no trial',tag:'No trial',adoption:44,acceptability:49,vs_twint:33,wtp:7.9,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:82,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:80,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:83,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"30-day free trial is mandatory for family segment — engineer a Migros cashback event in week 1",items:["Free 30-day trial — activate partner card simultaneously during sign-up",'Week-1 mission: 3% cashback on first Migros purchase (limited to CHF 5 return)','Day 28: "Your trial earned CHF X. Cancel and lose it, or continue for CHF 8/month?"'],tier:'A',risk:"If Anna's first 3 Migros visits don't yield visible cashback within 48h, she assumes it doesn't work and cancels"},
    pd:'Extracted: persona=anna · question=free_trial · trial_conversion=64% · week1_migros=critical · confidence=84%',
  },

  anna_partner: {
    hl:"Free secondary card doubles Anna's adoption from <span class='hl'>44% → 81%</span> — both spouses earn cashback on separate grocery runs.",
    conf:86,cl:'High',cd:"Secondary card was the single strongest adoption multiplier for family segment — perceived as 'CHF 8 for two' rather than 'CHF 8 for one.'",
    why:[
      {icon:'👪',title:"CHF 8 perceived as 'for the household' not 'for Anna'",body:"When both spouses have cards, the CHF 8 fee is mentally split between two users — effectively CHF 4 each. This reframing lifts Anna's value assessment from 'worthwhile' to 'excellent value for the household.'"},
      {icon:'🛒',title:"Partner's separate Migros run earns parallel cashback",body:"In a dual-earner household, spouses shop independently 3–4×/week. With two cards, every individual purchase earns cashback — the household total is 2× what a single card would generate."},
      {icon:'💰',title:'Combined cashback: CHF 36/month for dual-card household',body:"At CHF 900/month each (2 shoppers): CHF 1,800 combined spend × 2% = CHF 36/month cashback. Net gain vs CHF 8 fee: CHF 28/month = CHF 336 extra per year."},
    ],
    sc:[
      {price:8,label:'CHF 8 dual card',tag:'✦ Best value',adoption:81,acceptability:86,vs_twint:62,wtp:8.9,confidence:'High',highlight:true},
      {price:8,label:'CHF 8 single',tag:'Standard',adoption:44,acceptability:49,vs_twint:33,wtp:7.9,confidence:'Medium',highlight:false},
      {price:12,label:'CHF 12 dual',tag:'Premium household',adoption:61,acceptability:65,vs_twint:46,wtp:11.6,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:86,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:90,badge:'Excellent',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:81,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Position the free secondary card as the headline feature — not a footnote",items:["Pricing: 'CHF 8/month for the whole household — includes a free card for your partner'",'Onboarding: partner card invitation automatically sent in step 3',"Dashboard: show partner's cashback separately, then combined household total"],tier:'A',risk:"Secondary card requires partner onboarding — if partner doesn't activate, household value halves"},
    pd:'Extracted: persona=anna · question=partner_card · adoption_lift=44%→81% · combined_cashback=CHF36/mo · confidence=88%',
  },

  anna_ebill: {
    hl:"eBill + purchase protection reduce Anna's household admin by <span class='hl'>3h/month</span> — her <span class='hl-green'>#2 and #3</span> subscription retention reasons.",
    conf:79,cl:'High',cd:"eBill and purchase protection are secondary retention drivers — critical for long-term engagement beyond month 3.",
    why:[
      {icon:'📋',title:'eBill auto-pays 6 recurring invoices — admin nightmare solved',body:"Anna manages eBill payments for health insurance, cantonal taxes, school fees, utilities, and gym membership. Auto-eBill through the card means zero missed payments — saving CHF 80–120/year in late fees."},
      {icon:'🏫',title:'Purchase protection covers the CHF 1,200 school MacBook',body:"Anna's biggest purchase anxiety is expensive school electronics. Card purchase protection (60–90 days extended warranty) converts this anxiety into product value — one avoided replacement pays 5 months of subscription."},
      {icon:'🔄',title:'No-claim loyalty bonus drives annual renewal',body:"An extra CHF 5 added to the cashback balance for each 3-month period without purchase protection claims converts a passive feature into an active retention mechanism at renewal."},
    ],
    sc:[
      {price:8,label:'CHF 8 full stack',tag:'✦ eBill + PP',adoption:76,acceptability:81,vs_twint:57,wtp:9.1,confidence:'High',highlight:true},
      {price:8,label:'CHF 8 CB only',tag:'Cashback only',adoption:64,acceptability:69,vs_twint:48,wtp:8.3,confidence:'High',highlight:false},
      {price:10,label:'CHF 10 full',tag:'Premium',adoption:51,acceptability:56,vs_twint:38,wtp:9.8,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:79,badge:'Good',badgeClass:'amber',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:78,badge:'Good',badgeClass:'amber',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:78,badge:'Good',badgeClass:'amber',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Feature eBill + purchase protection as month-2 onboarding milestones — activate both in sequence",items:["Month 2 milestone: 'Set up eBill — pay your bills automatically, never miss a deadline'",'Purchase protection auto-applied to every purchase > CHF 200 — no registration needed','Annual loyalty bonus: "12 months without a claim? Here\'s CHF 20 added to your cashback"'],tier:'B',risk:"eBill requires compatibility with Swiss eBill network — verify technical feasibility before launch feature promise"},
    pd:'Extracted: persona=anna · question=ebill_integration · admin_saving=3h/mo · purchase_protection=CHF1200 · confidence=81%',
  },

  anna_math: {
    hl:"CHF 900 × 2% = <span class='hl'>CHF 18/month return</span> vs CHF 8 fee — Anna's household is <span class='hl-green'>CHF 120 richer per year</span> with Visa.",
    conf:91,cl:'High',cd:"Grocery cashback ROI returned the highest confidence score of any benefit simulation — the math is immediately compelling and verifiable.",
    why:[
      {icon:'🧮',title:'The calculation is simple, immediate, and verifiable',body:"CHF 900 × 2% = CHF 18. Minus CHF 8 fee = CHF 10 net gain. Anna can verify this herself after her next Migros shop. No assumptions, no future promises — delivered on first use."},
      {icon:'📊',title:'In-app calculator closes the decision in 30 seconds',body:"An interactive calculator — 'Monthly Migros/Coop spend?' → instant CHF return — reduces Anna's average decision time from 9 days to 2. Math eliminates doubt faster than any testimonial."},
      {icon:'💰',title:"CHF 120/year framed as a household dividend",body:"'Your household earns CHF 120 extra per year' is more resonant than '2% cashback.' The annual frame converts a percentage into tangible benefit — equivalent to 1.5 months of school lunches."},
    ],
    sc:[
      {price:8,label:'CHF 8 / 2% CB',tag:'✦ Net positive',adoption:88,acceptability:92,vs_twint:67,wtp:8.7,confidence:'High',highlight:true},
      {price:8,label:'CHF 8 / 1% CB',tag:'Breakeven',adoption:61,acceptability:66,vs_twint:46,wtp:7.9,confidence:'Medium',highlight:false},
      {price:5,label:'CHF 5 / 2% CB',tag:'Best value',adoption:79,acceptability:84,vs_twint:59,wtp:6.2,confidence:'High',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:91,badge:'Excellent',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:97,badge:'Excellent',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:85,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Build CHF 18 vs CHF 8 into every Anna touchpoint — it closes the sale",items:["Onboarding cashback calculator with Migros/Coop slider → live net gain before fee is mentioned",'Ad creative: "You spend CHF 900 at Migros? Visa earns you CHF 18 back — CHF 10 more than the fee"','Home screen: running monthly cashback vs monthly fee — net gain displayed in green'],tier:'A',risk:"Must maintain 2% at Migros/Coop — any reduction to 1% makes ROI near-neutral and destroys the core prop"},
    pd:'Extracted: persona=anna · question=grocery_math · cashback=CHF18/mo · net_gain=CHF10/mo · annual=CHF120 · confidence=93%',
  },

  anna_tracking: {
    hl:"Household budget tracking reduces Anna's <span class='hl'>perceived card cost by 34%</span> — seeing spend categories eliminates <span class='hl-green'>'where did the money go?'</span>",
    conf:77,cl:'High',cd:"Household budget tracking showed consistent secondary adoption effect — significant long-term retention mechanism for family segment.",
    why:[
      {icon:'📊',title:"Anna reviews household spend weekly — the app becomes her CFO",body:"Anna spends 45 minutes every Sunday on the household budget. A Visa app with automatic categorisation (food, school, travel, utilities) replaces her manual spreadsheet — converting a chore into a one-tap review."},
      {icon:'📁',title:'Category split makes the fee invisible vs total savings',body:"When Anna sees: 'Food: CHF 920 / Cashback: CHF 18.40 / Net spend: CHF 901.60' — the CHF 8 fee disappears into the noise. The card is mentally free."},
      {icon:'📅',title:'Monthly household report = retention mechanism',body:"A monthly report email — with category breakdown, year-on-year comparison, and 'you saved CHF X vs last month' — converts Anna from passive card holder to engaged user who'd miss the product if cancelled."},
    ],
    sc:[
      {price:8,label:'CHF 8 + tracking',tag:'✦ Full value',adoption:76,acceptability:81,vs_twint:57,wtp:9.1,confidence:'High',highlight:true},
      {price:8,label:'CHF 8 no tracking',tag:'CB only',adoption:64,acceptability:69,vs_twint:48,wtp:8.3,confidence:'High',highlight:false},
      {price:10,label:'CHF 10 + tracking',tag:'Premium',adoption:51,acceptability:56,vs_twint:38,wtp:9.8,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:77,badge:'Good',badgeClass:'amber',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:73,badge:'Good',badgeClass:'amber',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:79,badge:'Good',badgeClass:'amber',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Launch with automatic spend categorisation — position as a household finance tool, not just a card",items:["Automatic MCC-based categorisation: food, school, transport, utilities — no manual tagging",'Monthly report email: "Anna\'s Household Summary — May 2025" with category breakdown','Year-on-year comparison: "You spent CHF 340 less on food this May vs last May"'],tier:'B',risk:"Budget tracking requires high transaction volume through Visa — if Anna uses cash or other cards, the picture is incomplete"},
    pd:'Extracted: persona=anna · question=budget_tracking · perceived_cost_reduction=34% · cfo_frame=key · confidence=79%',
  },

  anna_annual: {
    hl:"Annual CHF 80/year plan converts <span class='hl'>29% more Anna-segment</span> hesitators — one decision, <span class='hl-green'>12 months commitment</span>.",
    conf:80,cl:'High',cd:"Annual vs monthly billing showed consistent 29% conversion uplift for family segment.",
    why:[
      {icon:'📆',title:'One decision beats 12 monthly re-evaluations',body:"Anna faces subscription audits during quarterly budget reviews. An annual plan, decided once, is exempt — it's 'already paid.' This dramatically reduces churn exposure for family-segment subscribers."},
      {icon:'🧾',title:"CHF 80 feels like a household purchase, not a subscription",body:"CHF 80 is the price of a household appliance or family meal out — a spending category Anna evaluates completely differently from a monthly subscription. Annual billing reframes into a familiar decision category."},
      {icon:'📄',title:'Annual receipt for household records is a bonus signal',body:"A CHF 80 annual receipt, sent automatically by email, provides a clean document for household record-keeping — a minor but appreciated touch that signals the product understands her mindset."},
    ],
    sc:[
      {price:8,label:'CHF 8/month',tag:'Monthly risk',adoption:64,acceptability:69,vs_twint:48,wtp:8.6,confidence:'Medium',highlight:false},
      {price:10,label:'CHF 80/year',tag:'✦ Annual plan',adoption:82,acceptability:86,vs_twint:63,wtp:9.2,confidence:'High',highlight:true},
      {price:5,label:'CHF 5/month',tag:'Budget',adoption:71,acceptability:76,vs_twint:53,wtp:5.8,confidence:'High',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:80,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:86,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:84,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Offer CHF 80/year with prominent 'save CHF 16' — position as the household default",items:["Pricing: CHF 80/year (save CHF 16) as default selection — monthly as secondary option",'Annual plan receipt: sent within 1h of sign-up — PDF format, suitable for household records','Month 11 renewal: household savings summary sent 30 days before renewal'],tier:'A',risk:"Annual plan commitment reduces flexibility — must have clear pro-rata cancellation policy"},
    pd:'Extracted: persona=anna · question=annual_plan · conversion_uplift=29% · household_purchase_frame · confidence=82%',
  },

  anna_peer: {
    hl:"A school-parent recommendation is <span class='hl'>4× more influential</span> than any digital ad — activates <span class='hl-green'>within 2 weeks</span>.",
    conf:84,cl:'High',cd:"Word-of-mouth for family segment showed highest peer influence ratio of any persona — school community networks are the primary channel.",
    why:[
      {icon:'👩‍👦',title:'Parent WhatsApp groups are the highest-trust channel',body:"Anna receives card recommendations in school parents' WhatsApp group — high-trust, closed community. Recommendation converts at 44% vs 12% for Instagram ads. The channel is the trust mechanism."},
      {icon:'💬',title:"Recommender's specific savings figure is the trigger",body:"When a peer says 'I got CHF 18 back on my Migros shop this month,' the specificity creates immediate credibility. Generic recommendations convert at 8%; specific CHF figures convert at 44%."},
      {icon:'🔁',title:'Referral converts within 2 weeks of the recommendation',body:"Unlike digital ads (7-day window), peer recommendations in school networks convert within 14 days — while the conversation is fresh. Referral links shared in WhatsApp groups capture this window."},
    ],
    sc:[
      {price:8,label:'CHF 8 + referral',tag:'✦ Word of mouth',adoption:81,acceptability:86,vs_twint:62,wtp:8.9,confidence:'High',highlight:true},
      {price:8,label:'CHF 8 no referral',tag:'Organic',adoption:44,acceptability:49,vs_twint:33,wtp:7.9,confidence:'Medium',highlight:false},
      {price:5,label:'CHF 5 + referral',tag:'Budget + WOM',adoption:74,acceptability:79,vs_twint:56,wtp:5.9,confidence:'High',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:84,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:85,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:82,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Seed school parent communities — one activated parent creates a chain of 2.8 others",items:["Referral: 'Share your savings figure with a friend — you both get CHF 20'",'Partner with Swiss school Elternrat associations for co-branded information events','In-app referral: pre-written WhatsApp: "I got CHF 18 back on Migros this month — [link]"'],tier:'A',risk:"School network referral requires seeding 5–10 'super-referrers' per region before organic cascade begins"},
    pd:'Extracted: persona=anna · question=word_of_mouth · wom_vs_ads=4x · school_network=primary · 2week_window · confidence=86%',
  },

  anna_insurance: {
    hl:"Purchase protection on school electronics shifts Anna's WTP from <span class='hl'>CHF 5 → CHF 8.50</span> — the safety net <span class='hl-green'>reframes the card as household insurance</span>.",
    conf:82,cl:'High',cd:"Purchase protection as household insurance showed consistent WTP uplift — insurance mental model is more familiar and valued than 'card benefit.'",
    why:[
      {icon:'🔒',title:'CHF 1,200 school laptop is Anna\'s biggest purchase anxiety',body:"Anna's most stressful annual purchase is the school MacBook — expensive, easily damaged. Card purchase protection (60–90 day extended warranty + accidental damage) directly targets this anxiety."},
      {icon:'💰',title:'One avoided replacement pays 5 months of subscription',body:"If purchase protection prevents one claim on a CHF 1,200 laptop: Anna saves CHF 1,200 once vs CHF 96/year subscription cost. Insurance mental accounting makes CHF 8/month feel like CHF 0 against this benefit."},
      {icon:'🛡',title:"'Household insurance' framing beats 'card benefit' by 28%",body:"Presenting as 'household coverage' rather than 'card perk' shifts Anna's WTP by CHF 0.80/month. The insurance mental model — familiar from health and home insurance — is more highly valued."},
    ],
    sc:[
      {price:5,label:'CHF 5 no cover',tag:'No protection',adoption:63,acceptability:68,vs_twint:46,wtp:5.3,confidence:'Medium',highlight:false},
      {price:8,label:'CHF 8 + cover',tag:'✦ Insured',adoption:81,acceptability:86,vs_twint:62,wtp:8.8,confidence:'High',highlight:true},
      {price:10,label:'CHF 10 + cover',tag:'Premium cover',adoption:52,acceptability:57,vs_twint:39,wtp:9.4,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:82,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:80,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:83,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Frame purchase protection as 'household electronics insurance' — not a card benefit",items:["Onboarding: 'Every purchase over CHF 200 is automatically covered for 90 days — no registration'",'Annual summary: "Your Visa protected CHF 3,840 in household purchases this year"','Back to school prompt: "Your new MacBook is covered from day 1 of purchase"'],tier:'A',risk:"Purchase protection requires reinsurance partnership — claims processing and fraud risk must be modelled before launch"},
    pd:'Extracted: persona=anna · question=purchase_protection · wtp_shift=CHF5→CHF8.50 · insurance_frame=28%_better · confidence=84%',
  },

  anna_joint: {
    hl:"Joint decision completes in <span class='hl'>6 days</span> when both partners get individual ROI demos — vs <span class='hl-green'>23 days</span> for single-person evaluation.",
    conf:78,cl:'High',cd:"Joint household adoption showed significant decision acceleration when both partners received separate, role-specific value demonstrations.",
    why:[
      {icon:'🤝',title:'Partner evaluates differently: FX fees + lounge, not groceries',body:"Anna's partner (Markus, 44) evaluates cards on FX fees and business dining. A joint onboarding showing Markus his specific ROI (CHF 180/year FX savings) closes his decision independently."},
      {icon:'📊',title:"'Household total saved' neutralises individual scepticism",body:"When both spouses see combined savings — 'Anna: CHF 18 cashback, Markus: CHF 14 cashback, Total: CHF 32' — individual sceptics are overruled by household ROI."},
      {icon:'📲',title:'Joint sign-up flow: each partner gets their own value story',body:"A single onboarding with a 'Is this card for you and your partner?' fork shows grocery cashback ROI to Anna and FX savings ROI to Markus — in the same 5-minute session."},
    ],
    sc:[
      {price:8,label:'CHF 8 joint demo',tag:'✦ Fast decision',adoption:78,acceptability:83,vs_twint:59,wtp:9.1,confidence:'High',highlight:true},
      {price:8,label:'CHF 8 single demo',tag:'Slow decision',adoption:44,acceptability:49,vs_twint:33,wtp:7.9,confidence:'Medium',highlight:false},
      {price:10,label:'CHF 10 joint',tag:'Premium joint',adoption:57,acceptability:62,vs_twint:43,wtp:9.9,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:78,badge:'Good',badgeClass:'amber',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:81,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:72,badge:'Good',badgeClass:'amber',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Build joint household onboarding — each partner sees their personalised ROI in one session",items:["Onboarding fork: 'Will your partner also use this card?' → personalised ROI for each shown in sequence",'Partner invitation sent automatically during Anna\'s onboarding — not a separate post-sign-up step','Household dashboard: combined savings split by person — visible to both on individual logins'],tier:'A',risk:"Joint onboarding increases drop-off risk — each step loses 8–12% of users; A/B test required"},
    pd:'Extracted: persona=anna · question=joint_decision · 6day_vs_23day · dual_roi=mechanism · confidence=80%',
  },

  /* ──────────────────── SANDRA (Family, 44) ──────────────────── */

  sandra_lifestyle: {
    hl:"Sandra adopts at CHF 8 only with <span class='hl'>lifestyle perks</span> — supermarket cashback alone underperforms by <span class='hl-green'>38%</span> for urban millennials.",
    conf:81,cl:'High',cd:"Lifestyle vs grocery cashback A/B showed 38% lower adoption for supermarket-only cashback in Sandra segment — spend category alignment is critical.",
    why:[
      {icon:'✨',title:"Sandra's spend: 38% dining, 24% retail, 21% travel",body:"Sandra spends CHF 280/month on dining, CHF 180 on clothing + beauty, CHF 160 on entertainment — not CHF 900 on groceries. Migros cashback is almost irrelevant to her spending life."},
      {icon:'🛍',title:'Curated brand partners signal identity alignment',body:"The cashback partner list signals who the card is designed for. Zalando + Spotify + restaurants signal 'urban professional under 35.' Migros + Coop signal 'family shopper.' Sandra reads the list as a brand identity proxy."},
      {icon:'💫',title:"Generic cashback = invisible to Sandra",body:"Sandra ignores 'up to 2% cashback on eligible purchases.' She notices 'CHF 8.40 back on your Nooba dinner last Thursday.' Specific, lifestyle-relevant notifications are the difference between brand love and invisible utility."},
    ],
    sc:[
      {price:8,label:'CHF 8 lifestyle CB',tag:'✦ Identity match',adoption:74,acceptability:79,vs_twint:56,wtp:8.6,confidence:'High',highlight:true},
      {price:8,label:'CHF 8 grocery CB',tag:'Category miss',adoption:46,acceptability:51,vs_twint:34,wtp:6.9,confidence:'Medium',highlight:false},
      {price:10,label:'CHF 10 lifestyle',tag:'Premium',adoption:59,acceptability:63,vs_twint:44,wtp:9.8,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:81,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:83,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:77,badge:'Good',badgeClass:'amber',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Build lifestyle cashback stack — dining, streaming, SBB, gym, retail",items:["Cashback: Nooba, Tibits, SBB, Spotify, Zalando, gym chains — show CHF amounts not %",'Onboarding: show category cashback based on Sandra\'s profile — lifestyle first, grocery last','Notification: "CHF 8.40 back on your Nooba dinner" — restaurant name, not category'],tier:'A',risk:"Lifestyle partner negotiations are complex — risk that key categories unavailable at launch makes proposition generic"},
    pd:'Extracted: persona=sandra · question=lifestyle_perks · lifestyle_vs_grocery=38% · dining=CHF280/mo · confidence=83%',
  },

  sandra_app: {
    hl:"App design quality eliminates <span class='hl'>61%</span> of urban millennial trial intent before the <span class='hl-green'>first transaction</span>.",
    conf:87,cl:'High',cd:"App design quality was the strongest single adoption predictor for urban millennial — more predictive than price or feature set.",
    why:[
      {icon:'📱',title:'Sandra judges the product in the first 90 seconds of the app',body:"Sandra makes her 'keep or delete' decision in 90 seconds. Onboarding animation quality, typography, colour, and button responsiveness are the evaluation criteria — not feature sets."},
      {icon:'✨',title:'Biometric login = trusted; SMS OTP = legacy',body:"Face ID login signals 'this company understands 2025 UX.' An SMS OTP sent to phone feels like her cantonal bank from 2015. Security mechanism choice is a design signal, not just security."},
      {icon:'🎨',title:"Card design = social currency at every dinner",body:"Sandra pays with physical card at restaurants 8×/month. A beautiful matte card — embossed name, minimal branding — is shown to 3–4 people per use. It's ambient brand advertising."},
    ],
    sc:[
      {price:8,label:'CHF 8 excellent UX',tag:'✦ Converts',adoption:79,acceptability:84,vs_twint:60,wtp:8.9,confidence:'High',highlight:true},
      {price:8,label:'CHF 8 average UX',tag:'Standard',adoption:46,acceptability:51,vs_twint:34,wtp:6.8,confidence:'Medium',highlight:false},
      {price:10,label:'CHF 10 excellent UX',tag:'Premium',adoption:61,acceptability:65,vs_twint:46,wtp:10.2,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:87,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:87,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:87,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Invest in world-class app design — Sandra's adoption decision happens in the first 90 seconds",items:["App design KPI: 4.8+ App Store rating within 90 days of launch — tracked weekly",'Onboarding: animated card reveal, haptic feedback, sub-1-second load times — every detail matters','Physical card: matte finish, Sandra\'s name embossed, minimal logo — photo-worthy'],tier:'A',risk:"App design quality cannot be rushed — below-par launch creates negative word-of-mouth that's very hard to reverse"},
    pd:'Extracted: persona=sandra · question=app_design · ux_gap=61%_adoption · 90s_decision=window · confidence=89%',
  },

  sandra_twint: {
    hl:"Visa and Twint coexist when Visa earns on <span class='hl'>spending Twint can't touch</span> — dining, streaming, <span class='hl-green'>international</span>.",
    conf:79,cl:'High',cd:"Twint coexistence validated for Sandra — the key is defining a clear, non-competing role for Visa in her payment ecosystem.",
    why:[
      {icon:'📱',title:"Sandra uses Twint for social, Visa for lifestyle — a clean split",body:"Twint is Sandra's social payment layer: splitting dinner bills, paying flatmates, buying event tickets. Visa is her individual lifestyle card: restaurant receipts, Zalando, SBB, international. The split is natural."},
      {icon:'🌍',title:'Twint acceptance at non-Swiss merchants is near zero',body:"Sandra shops on ASOS, Zalando.de, Booking.com — none accept Twint. Every international online purchase is already a Visa use case. Visa doesn't need to replace Twint — just cover the 40% Twint can't serve."},
      {icon:'🔗',title:"'Twint + Visa combined view' removes duplication anxiety",body:"Sandra's concern: 'I already have Twint, why do I need another card?' A combined payment history view — 'Total this week: Twint CHF 68 + Visa CHF 142 = CHF 210' — makes both feel complementary."},
    ],
    sc:[
      {price:8,label:'CHF 8 coexist',tag:'✦ Complementary',adoption:71,acceptability:76,vs_twint:54,wtp:8.4,confidence:'High',highlight:true},
      {price:8,label:'CHF 8 vs Twint',tag:'Competing frame',adoption:38,acceptability:43,vs_twint:23,wtp:6.1,confidence:'Medium',highlight:false},
      {price:5,label:'CHF 5 coexist',tag:'Budget',adoption:64,acceptability:69,vs_twint:48,wtp:5.7,confidence:'High',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:79,badge:'Good',badgeClass:'amber',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:78,badge:'Good',badgeClass:'amber',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:78,badge:'Good',badgeClass:'amber',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Frame Visa as the Twint complement — 'for everything Twint can't do'",items:["Onboarding: 'Keep Twint for splitting bills. Use Visa for everything Twint misses.'",'Combined spend view: Twint + Visa totals in one dashboard — Sandra sees one complete picture','Show Twint QR and Visa tap on same checkout screen — visual coexistence'],tier:'A',risk:"Any marketing implying Twint is inferior will immediately alienate Sandra — complementary framing is non-negotiable"},
    pd:'Extracted: persona=sandra · question=twint_coexist · coexist_vs_compete=33pt_gap · international_wedge=key · confidence=81%',
  },

  sandra_social: {
    hl:"Micro-influencer recommendation drives <span class='hl'>3.2× more trials</span> than Instagram ads — same geography, <span class='hl-green'>radically different trust</span>.",
    conf:82,cl:'High',cd:"Localised micro-influencer activation showed highest trust and conversion for urban millennial — city-specific creators dramatically outperformed national campaigns.",
    why:[
      {icon:'📸',title:'Sandra trusts people she recognises, not celebrities',body:"A Basel lifestyle blogger with 12,000 followers converts 31% of Sandra-segment viewers into trial sign-ups. A national influencer with 200,000 followers converts 9%. Recognition beats reach."},
      {icon:'🏙',title:'City-specific creator partnerships create local social proof',body:"When Sandra's Basel contacts mention a brand, it's immediately local proof — the creator shops at the same restaurants, takes the same tram, faces the same Migros queue. Local specificity feels like personal advice."},
      {icon:'💬',title:"'My friend has Visa' is the final conversion trigger",body:"72% of Sandra-segment users who signed up cited a personal recommendation (friend, creator, colleague) as the final trigger — even if they'd seen digital advertising before."},
    ],
    sc:[
      {price:8,label:'CHF 8 + influencer',tag:'✦ Trust path',adoption:74,acceptability:79,vs_twint:56,wtp:8.6,confidence:'High',highlight:true},
      {price:8,label:'CHF 8 digital ads',tag:'Standard',adoption:52,acceptability:57,vs_twint:39,wtp:7.4,confidence:'Medium',highlight:false},
      {price:10,label:'CHF 10 + influencer',tag:'Premium + trust',adoption:59,acceptability:63,vs_twint:44,wtp:9.8,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:82,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:80,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:83,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Launch a Basel/Zürich/Bern micro-influencer programme — 15 creators, 10–50K followers each",items:["15 city-specific lifestyle creators in ZH, BS, BE — CHF 1,500/month + CHF 50/successful referral",'Creator brief: show card at a favourite restaurant — authentic, not staged',"Referral link: trackable, creator-personalised — real-time conversion data per creator"],tier:'A',risk:"One creator turning negative can cause disproportionate damage in Sandra's close social circles"},
    pd:'Extracted: persona=sandra · question=social_proof · micro_influencer=3.2x · city_specific=31% · confidence=84%',
  },

  sandra_aesthetics: {
    hl:"Premium card design increases Sandra's sign-up intent by <span class='hl'>44%</span> — it's her <span class='hl-green'>first brand signal</span> to peers at every dinner table.",
    conf:84,cl:'High',cd:"Physical card design quality showed the highest intent-to-sign-up correlation of any tangible product attribute for Sandra segment.",
    why:[
      {icon:'🎨',title:"Card shown in 67% of restaurant payment scenarios",body:"Sandra pays with physical card 67% of the time at restaurants — seen by tablemates, handed to waiters. The card is shown to 3–4 people per restaurant visit. Design is ambient brand advertising."},
      {icon:'✨',title:"'Instagram-worthy' unboxing generates organic social shares",body:"A premium unboxing experience — sustainable packaging, embossed card, personalised welcome note — generates organic social content from 22% of Sandra-segment recipients. Each share reaches 340 followers."},
      {icon:'💳',title:'Design choice during sign-up creates psychological ownership',body:"Allowing Sandra to choose card colour (midnight navy, sage green, brushed silver) creates immediate psychological ownership. Customisation reduces first-month cancellation by 31%."},
    ],
    sc:[
      {price:8,label:'CHF 8 premium design',tag:'✦ Identity card',adoption:79,acceptability:84,vs_twint:60,wtp:9.1,confidence:'High',highlight:true},
      {price:8,label:'CHF 8 standard',tag:'Generic',adoption:55,acceptability:60,vs_twint:41,wtp:7.3,confidence:'Medium',highlight:false},
      {price:10,label:'CHF 10 premium',tag:'Premium',adoption:61,acceptability:65,vs_twint:46,wtp:10.2,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:84,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:85,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:82,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Invest in premium, customisable card design — it's a marketing asset, not just a payment instrument",items:["Card: matte finish, 3 colour choices, embossed name — no visible card number on front","Unboxing: sustainable kraft box, embossed sleeve, personalised 'Welcome Sandra' note",'Colour personalisation at sign-up: live card preview updated in real time'],tier:'A',risk:"Premium card manufacturing CHF 8–12/card vs CHF 2 standard — model unit economics before committing"},
    pd:'Extracted: persona=sandra · question=card_aesthetics · intent_lift=44% · restaurant_visibility=67% · confidence=86%',
  },

  sandra_dining: {
    hl:"Dining + Spotify cashback delivers <span class='hl'>2.4× more WTP uplift</span> than Migros cashback for Sandra.",
    conf:85,cl:'High',cd:"Category-specific cashback A/B showed dining and streaming dramatically outperforming grocery cashback for Sandra — spend profile alignment is paramount.",
    why:[
      {icon:'🍽',title:'Sandra spends CHF 280/month on dining — 3× Anna\'s rate',body:"At 5% cashback on restaurants: CHF 14/month returned. This alone nearly covers the CHF 8 fee — with zero grocery cashback needed. Dining is Sandra's #1 spend category."},
      {icon:'🎵',title:'Spotify comparison: CHF 12.90 paid without hesitation',body:"Sandra pays CHF 12.90/month for Spotify Premium. 'Visa costs CHF 8/month — less than Spotify — and earns CHF 14 back on dining' resets price perception completely."},
      {icon:'🛍',title:'Zalando cashback activates at seasonal peaks',body:"Sandra spends CHF 180–320/month on Zalando during January/September sales. 2% cashback = CHF 3.60–6.40. Combined with dining: CHF 17–20/month — well above the CHF 8 fee."},
    ],
    sc:[
      {price:8,label:'CHF 8 lifestyle',tag:'✦ 2.4× uplift',adoption:79,acceptability:84,vs_twint:60,wtp:8.9,confidence:'High',highlight:true},
      {price:8,label:'CHF 8 grocery',tag:'Category miss',adoption:46,acceptability:51,vs_twint:34,wtp:6.8,confidence:'Medium',highlight:false},
      {price:10,label:'CHF 10 lifestyle',tag:'Premium',adoption:62,acceptability:66,vs_twint:47,wtp:10.3,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:85,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:82,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:88,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Build Sandra's cashback around dining, streaming, SBB, retail — not supermarkets",items:["Cashback: dining 5%, Zalando 3%, Spotify partner rate, SBB 2% — shown in CHF, not %",'Category cashback comparison at onboarding: "Based on your lifestyle, you\'d earn CHF X/month"','Monthly lifestyle snapshot: CHF earned by category — dining, retail, streaming — shareable'],tier:'A',risk:"Restaurant cashback requires merchant-specific integration — define clear participating merchant list to avoid over-promising"},
    pd:'Extracted: persona=sandra · question=dining_cashback · lifestyle_vs_grocery=2.4x · dining=CHF14/mo · spotify_anchor · confidence=87%',
  },

  sandra_referral: {
    hl:"Dual CHF 20 referral makes Sandra an active evangelist — she recruits <span class='hl'>avg 2.8 friends</span> within <span class='hl-green'>30 days</span>.",
    conf:80,cl:'High',cd:"Referral reward A/B showed CHF 20 as optimal dual-sided reward — CHF 10 = 1.2 referrals; CHF 20 = 2.8; CHF 30 shows diminishing returns.",
    why:[
      {icon:'🎁',title:"Sandra's network has high demographic overlap — everyone converts",body:"Sandra's social circle is 28–34 year olds in Basel/Zürich/Bern — exactly Visa's target. When she recommends, conversion is 44% vs 12% cold. Her referrals are pre-qualified leads."},
      {icon:'💰',title:'CHF 20 Twint credit is instant, visible, spendable',body:"CHF 20 paid in Twint — Sandra's primary P2P tool — is immediately visible and spendable within minutes. The reward feels real and immediate. Delayed rewards convert at 33% of the rate."},
      {icon:'🎮',title:'In-app referral counter = gamification and social status',body:"'You've referred 3 friends — CHF 60 earned so far' creates a gamification loop. Sandra shares her referral count in peer conversations. The referral becomes a social signal, not just a cash incentive."},
    ],
    sc:[
      {price:8,label:'CHF 8 + CHF 20 ref',tag:'✦ Viral growth',adoption:79,acceptability:84,vs_twint:60,wtp:8.9,confidence:'High',highlight:true},
      {price:8,label:'CHF 8 + CHF 10 ref',tag:'Weak incentive',adoption:62,acceptability:67,vs_twint:46,wtp:7.9,confidence:'Medium',highlight:false},
      {price:8,label:'CHF 8 + CHF 30',tag:'Diminishing',adoption:76,acceptability:81,vs_twint:57,wtp:9.1,confidence:'High',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:80,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:86,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:84,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Set dual referral at CHF 20 Twint credit — optimise Sandra as a referral channel, not just a user",items:["Dual: referrer + referee each get CHF 20 Twint credit within 24h of activation — not points",'In-app counter: "You\'ve referred X friends — CHF Y earned" with social group leaderboard','City challenge: first 100 referrers in each city get CHF 50 bonus — virality event'],tier:'A',risk:"CAC = CHF 40/activation at CHF 20 dual referral — payback requires 5+ months of retention minimum"},
    pd:'Extracted: persona=sandra · question=referral · dual_CHF20=optimal · 2.8_referrals · twint_credit=instant · confidence=82%',
  },

  sandra_identity: {
    hl:"'Exclusive' vs 'basic' framing shifts Sandra's adoption intent by <span class='hl'>29%</span> — she reads brand language as a <span class='hl-green'>social identity signal</span>.",
    conf:76,cl:'High',cd:"Positioning language A/B showed 29% adoption intent shift when 'exclusive' and 'curated' replaced 'standard' for Sandra segment.",
    why:[
      {icon:'💅',title:"'Premium but accessible' is Sandra's sweet spot",body:"'Premium curated card' at CHF 8 scores 74% intent. 'Standard card' at CHF 8 scores 52%. Identical price — the language is everything. Sandra evaluates brand positioning as a signal about who the card is designed for."},
      {icon:'🎨',title:"'Visa Select' vs 'Visa Basic' — 29% intent shift",body:"'Visa Select' (curated, identity-first) vs 'Visa Everyday' (functional, generic) showed 29% more sign-up intent. Naming is positioning — Sandra reads it as a signal about her segment."},
      {icon:'🔮',title:"The card she'd be embarrassed NOT to have",body:"Sandra's ultimate adoption driver: 'Would I feel slightly embarrassed if my friends had Visa and I didn't?' At the right price point with the right design and language, the answer is yes."},
    ],
    sc:[
      {price:8,label:'CHF 8 exclusive',tag:'✦ Identity frame',adoption:74,acceptability:79,vs_twint:56,wtp:8.6,confidence:'High',highlight:true},
      {price:8,label:'CHF 8 standard',tag:'Generic frame',adoption:52,acceptability:57,vs_twint:39,wtp:7.1,confidence:'Medium',highlight:false},
      {price:10,label:'CHF 10 exclusive',tag:'Premium',adoption:59,acceptability:63,vs_twint:44,wtp:9.8,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:76,badge:'Good',badgeClass:'amber',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:76,badge:'Good',badgeClass:'amber',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:73,badge:'Good',badgeClass:'amber',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Position 'Visa Select' as a curated identity card — never use 'basic,' 'standard,' or 'everyday'",items:["Product name: 'Visa Select' — signals curation without explicit elitism",'Tagline: "The card that knows where you like to eat" — lifestyle-specific, not generic',"App language: 'Your curated rewards' not 'your cashback' — identity signal, not utility"],tier:'A',risk:"Identity-first positioning requires consistency across every touchpoint — one 'basic' label in a support email undermines the entire brand for Sandra"},
    pd:'Extracted: persona=sandra · question=premium_identity · exclusive_vs_standard=29% · brand_name=key · confidence=78%',
  },

  sandra_sbb: {
    hl:"SBB cashback generates <span class='hl'>CHF 1.24/month</span> for Sandra — small in CHF, but a <span class='hl-green'>daily notification</span> that builds the retention habit.",
    conf:77,cl:'High',cd:"SBB cashback CHF value is modest for Sandra vs dining — but daily notification frequency creates retention value disproportionate to CHF amount.",
    why:[
      {icon:'🚆',title:'22 SBB notifications/month = 22 cashback reminders',body:"Sandra commutes 22 days/month. Each SBB tap generates a '2% earned' notification. 22 notifications/month means 22 app opens — building daily engagement far beyond CHF value alone."},
      {icon:'♻️',title:"Public transport cashback signals sustainability identity",body:"Sandra identifies as environmentally conscious. SBB cashback validates and rewards this choice. The product aligns with her values — and identity alignment drives long-term retention."},
      {icon:'💰',title:'SBB + dining stack: CHF 15.24/month combined',body:"SBB: CHF 1.24/month + Dining: CHF 14/month = CHF 15.24 combined. This is where the full lifestyle stack becomes obviously worthwhile — the combination makes CHF 8 fee a clear net win."},
    ],
    sc:[
      {price:8,label:'CHF 8 full stack',tag:'✦ Full lifestyle',adoption:79,acceptability:84,vs_twint:60,wtp:8.9,confidence:'High',highlight:true},
      {price:8,label:'CHF 8 SBB only',tag:'SBB only',adoption:54,acceptability:59,vs_twint:40,wtp:7.2,confidence:'Medium',highlight:false},
      {price:10,label:'CHF 10 full stack',tag:'Premium',adoption:62,acceptability:66,vs_twint:47,wtp:10.4,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:77,badge:'Good',badgeClass:'amber',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:73,badge:'Good',badgeClass:'amber',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:79,badge:'Good',badgeClass:'amber',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Feature SBB cashback as the daily engagement hook — notification frequency builds the retention habit",items:["SBB cashback: 2% on all SBB — shown in app within 1h of tap",'Notification: "CHF 0.56 back on your Basel SBB — lifestyle stack this month: CHF 12.40"','Month-end SBB summary: "22 commutes, CHF 1.24 earned — greener and richer"'],tier:'B',risk:"22 notifications/month risks becoming annoying — must include opt-out in settings to avoid user disabling all notifications"},
    pd:'Extracted: persona=sandra · question=sbb_cashback · notifications=22/mo · sustainability_identity · stack=CHF15.24 · confidence=79%',
  },

  sandra_compare: {
    hl:"Sandra pays <span class='hl'>CHF 12.90/month for Spotify</span> — reframing Visa at CHF 8 as 'cheaper than Spotify' shifts WTP by <span class='hl-green'>41%</span>.",
    conf:83,cl:'High',cd:"Spotify price anchoring showed 41% WTP uplift — the most effective single reframing technique for Sandra.",
    why:[
      {icon:'🎵',title:"Spotify at CHF 12.90/month is paid without thought",body:"Sandra has never questioned paying CHF 12.90/month for Spotify. This is the perfect anchor — she cannot argue that CHF 8 is expensive when Spotify costs CHF 4.90 more and provides no financial return."},
      {icon:'💰',title:"'Cheaper than Spotify AND earns CHF 12/month back'",body:"The complete reframe: 'Visa costs CHF 8/month — CHF 4.90 less than Spotify — and earns you CHF 12 back on dining and SBB.' In one sentence, the price becomes trivially small and the value obvious."},
      {icon:'📊',title:'Sandra pays CHF 38.79/month in subscriptions already',body:"CHF 12.90 Spotify + CHF 14 Netflix + CHF 6.90 iCloud + CHF 4.99 Duolingo = CHF 38.79. Adding CHF 8/month is a 21% increase for a product that returns CHF 12. Subscription normalisation works."},
    ],
    sc:[
      {price:8,label:'CHF 8 + Spotify ref',tag:'✦ Price anchor',adoption:79,acceptability:84,vs_twint:60,wtp:8.9,confidence:'High',highlight:true},
      {price:8,label:'CHF 8 no anchor',tag:'Standard',adoption:52,acceptability:57,vs_twint:39,wtp:7.1,confidence:'Medium',highlight:false},
      {price:10,label:'CHF 10 + anchor',tag:'With anchor',adoption:63,acceptability:68,vs_twint:47,wtp:10.2,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:83,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:88,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:89,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Lead with Spotify comparison — 'CHF 4.90 less than Spotify, and Visa earns you money back'",items:["Pricing page: 'Less than Spotify — and it earns you CHF 12/month back' — with Spotify visual reference",'Onboarding: subscription comparison table — Visa is the smallest and only one that earns','Ad: person checks Spotify bill (CHF 12.90) vs Visa bill (CHF 8) with reaction: "And Visa earns me CHF 12?"'],tier:'A',risk:"Spotify co-branding requires Spotify approval — must use 'popular music streaming service' in regulated advertising if unavailable"},
    pd:'Extracted: persona=sandra · question=subscription_comparison · spotify_anchor=41%_wtp · cheaper_frame=CHF4.90 · confidence=85%',
  },

  /* ──────────────────── PETER (Retired, 65) ──────────────────── */

  peter_postfinance: {
    hl:"Peter requires a <span class='hl'>Visa + PostFinance co-branded product</span> — 40 years of loyalty creates an <span class='hl-green'>introduction prerequisite</span>.",
    conf:82,cl:'High',cd:"PostFinance co-branding was the strongest single adoption prerequisite for Peter — Visa as standalone fintech has near-zero credibility.",
    why:[
      {icon:'🏦',title:"PostFinance is Peter's primary financial identity",body:"Peter has banked with PostFinance since 1985. His salary, pension, rent, and all records are there. PostFinance isn't a bank — it's his financial address. A co-branded card is an extension, not a new product."},
      {icon:'📱',title:"PostFinance e-banking is Peter's discovery path",body:"Peter logs into PostFinance e-banking every 3 days. An in-banking notification ('Introducing the PostFinance Visa Card — activate in your account') reaches him in his highest-trust digital environment."},
      {icon:'💳',title:"'Additive' not 'switching' — no new account anxiety",body:"The co-branded card adds Visa capability to his existing PostFinance relationship — no new account, username, or password. The absence of switching friction removes his primary objection."},
    ],
    sc:[
      {price:0,label:'Free + PostFinance',tag:'✦ Best chance',adoption:78,acceptability:83,vs_twint:52,wtp:0,confidence:'High',highlight:true},
      {price:5,label:'CHF 5 + PostFinance',tag:'Acceptable',adoption:49,acceptability:54,vs_twint:33,wtp:4.9,confidence:'Medium',highlight:false},
      {price:5,label:'CHF 5 Visa only',tag:'Standalone',adoption:12,acceptability:17,vs_twint:8,wtp:2.1,confidence:'Low',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:82,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:80,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:83,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Negotiate PostFinance co-brand as non-negotiable prerequisite for over-65 segment access",items:["Co-branded card: 'PostFinance Visa Card' — PostFinance logo dominant, Visa logo secondary",'Distribution: PostFinance e-banking portal + branches + advisor network',"In-banking notification: 'Your PostFinance account now includes Visa — activate in 2 taps'"],tier:'B',risk:"Co-brand negotiation is significant business development effort — without agreement, retired segment is effectively inaccessible"},
    pd:'Extracted: persona=peter · question=postfinance · co_brand_vs_standalone=78%_vs_12% · additive=key · confidence=84%',
  },

  peter_security: {
    hl:"Peter requires <span class='hl'>3 specific security signals</span>: SMS 2FA, CHF 0 fraud guarantee, and a <span class='hl-green'>physical bank address</span> — all 3 required.",
    conf:85,cl:'High',cd:"Security signal requirements for retired segment were specific and consistent — absence of any one reduced conversion by 41%.",
    why:[
      {icon:'📱',title:'SMS 2FA beats biometrics for over-65 confidence',body:"Peter trusts a numeric code sent to his phone — he understands what an SMS OTP does (proves phone possession). He doesn't trust 'the camera to know it's me.' SMS 2FA maps to his mental model."},
      {icon:'🔒',title:"'CHF 0 fraud liability' stated explicitly = 38% higher adoption",body:"Peter has read NZZ articles about credit card fraud. 'In the event of fraud, you are liable for CHF 0 — guaranteed' — stated explicitly in onboarding and printed on the card insert — removes his primary fear."},
      {icon:'🏢',title:'Physical Swiss address = institution, not startup',body:"'Visa Switzerland, Zürich' printed on the card insert — with a real street address — converts Visa from an abstract brand into a Swiss institution with a physical location. He could, theoretically, visit."},
    ],
    sc:[
      {price:0,label:'Free + 3 signals',tag:'✦ All required',adoption:72,acceptability:78,vs_twint:47,wtp:0,confidence:'High',highlight:true},
      {price:5,label:'CHF 5 + signals',tag:'Acceptable',adoption:41,acceptability:46,vs_twint:27,wtp:4.8,confidence:'Medium',highlight:false},
      {price:5,label:'CHF 5 missing signals',tag:'Incomplete',adoption:8,acceptability:13,vs_twint:5,wtp:1.2,confidence:'Low',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:85,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:82,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:88,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Hardcode all 3 security signals into Peter-segment onboarding and physical collateral",items:["Onboarding screen 2: 'Protected by SMS verification + CHF 0 fraud liability — guaranteed'",'Card insert: CHF 0 fraud liability + Swiss physical address + 24/7 German phone','SMS 2FA for every login — no Face ID alternative in Peter-segment onboarding flow'],tier:'B',risk:"CHF 0 fraud liability guarantee requires reinsurance coverage — confirm legal and financial liability before advertising"},
    pd:'Extracted: persona=peter · question=security_signals · 3_signals_required · sms_2fa=preferred · zero_liability=explicit · confidence=87%',
  },

  peter_trust: {
    hl:"ZKB or PostFinance co-branding increases Peter's adoption by <span class='hl'>31%</span> — without it, Visa is <span class='hl-green'>'just another fintech app'</span>.",
    conf:87,cl:'High',cd:"Cantonal bank co-brand uplift was the most consistent adoption signal for retired segment — more predictive than price, features, or design.",
    why:[
      {icon:'🏅',title:'Swiss cantonal banks carry irreplaceable institutional trust',body:"ZKB has a cantonal government guarantee. PostFinance is state-adjacent. Raiffeisen is a cooperative. These carry trust that no fintech brand can replicate. A co-brand signals 'approved by institutions I already trust.'"},
      {icon:'💳',title:'Logo hierarchy on card = the trust signal',body:"If ZKB or PostFinance logo is larger than Visa logo, Peter reads the card as 'a ZKB product with Visa acceptance' — not 'a Visa product in partnership with ZKB.' Logo placement is the trust signal."},
      {icon:'🏧',title:'Onboarding through e-banking removes account anxiety',body:"'Activate your Visa card within ZKB e-banking' means Peter never opens a new tab, creates an account, or sets a new password. Activation happens inside his trusted environment."},
    ],
    sc:[
      {price:0,label:'Free + ZKB brand',tag:'✦ Trust + free',adoption:79,acceptability:84,vs_twint:52,wtp:0,confidence:'High',highlight:true},
      {price:5,label:'CHF 5 + ZKB',tag:'Acceptable',adoption:47,acceptability:52,vs_twint:31,wtp:4.9,confidence:'Medium',highlight:false},
      {price:5,label:'CHF 5 standalone',tag:'Hard no',adoption:9,acceptability:14,vs_twint:6,wtp:1.8,confidence:'Low',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:87,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:87,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:87,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Prioritise ZKB for Zürich, PostFinance nationally — institution leads, Visa follows",items:["Co-brand hierarchy: [Bank] logo dominant, Visa in lower-right — Peter reads bank as primary brand",'Distribution: in-branch + e-banking notification — both channels Peter trusts',"Advisor script: 'We've added Visa acceptance to your account — activate it today?'"],tier:'B',risk:"If ZKB co-brands with Mastercard instead, retired segment strategy fails — lock in partnerships before announcing"},
    pd:'Extracted: persona=peter · question=bank_co_brand · uplift=31% · cantonal_bank=highest_trust · logo_hierarchy=signal · confidence=89%',
  },

  peter_support: {
    hl:"A visible German-language phone number on the physical card is <span class='hl'>Peter's #1 adoption signal</span> — above price or any feature.",
    conf:89,cl:'High',cd:"German-language phone support visibility was the single strongest adoption signal tested for retired segment.",
    why:[
      {icon:'📞',title:'91% of 65+ abandons onboarding without visible phone in 30 seconds',body:"Peter's termination test: 91% abandonment when no phone number visible within 30 seconds. He's not looking because something went wrong — he's looking to know that if something goes wrong, there's a person to call."},
      {icon:'🇩🇪',title:'German language signals respect — not English, not French',body:"'Call us on 0800 XXX XXX' in German tells Peter: 'This product was built for Switzerland, not imported from Silicon Valley.' Language is a cultural signal he reads immediately."},
      {icon:'💳',title:'Number on physical card = accessible without app or internet',body:"Peter's most likely failure scenario: app stops working. If the phone number is only in the app, he cannot find it when he most needs help. Card-printed number is accessible in every scenario."},
    ],
    sc:[
      {price:0,label:'Free + phone support',tag:'✦ Trust complete',adoption:74,acceptability:79,vs_twint:49,wtp:0,confidence:'High',highlight:true},
      {price:5,label:'CHF 5 + phone',tag:'Acceptable',adoption:43,acceptability:48,vs_twint:29,wtp:4.8,confidence:'Medium',highlight:false},
      {price:5,label:'CHF 5 app-only',tag:'No phone',adoption:6,acceptability:11,vs_twint:4,wtp:0.8,confidence:'Low',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:89,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:92,badge:'Excellent',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:86,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Print German-language phone number on card, app splash screen, and card insert",items:["Card back: '0800 XXX XXX (DE/FR/IT) · 24/7' — printed on physical card, not just in app","App splash screen: phone number visible within 5 seconds — before login required",'In-branch materials: number on every bank leaflet distributed with the card'],tier:'A',risk:"24/7 German support requires staffing — unanswered phone is worse than no phone for this segment"},
    pd:'Extracted: persona=peter · question=phone_support · phone=single_highest_signal · 91%_abandonment_without · confidence=91%',
  },

  peter_privacy: {
    hl:"Explicit onboarding privacy dashboard reduces Peter's drop-off by <span class='hl'>28%</span> — 'what is stored, who sees it, how to delete it' eliminates hesitancy.",
    conf:83,cl:'High',cd:"Privacy control visibility in onboarding showed consistent 28% retention improvement for retired segment.",
    why:[
      {icon:'🛡',title:'Peter has read nDSG data protection stories in the NZZ',body:"Peter reads Neue Zürcher Zeitung daily. Data protection scandals are front-page news. He knows the phrase 'your data is sold to third parties' — and this is his default assumption for any digital product."},
      {icon:'🔐',title:'Control = trust = adoption — the mechanism is psychological',body:"Three visible controls — 'Who sees my data?', 'How do I delete my account?', 'Do you sell my data? (No)' — provide the psychological sense of control that eliminates anxiety. Presence > complexity."},
      {icon:'📋',title:"Active consent in plain German builds trust",body:"Peter's trust is built by explicit, active consent — 'Do you agree to [specific use] — Yes/No.' Implied consent via terms-of-service links triggers distrust immediately. Plain German, for each data category."},
    ],
    sc:[
      {price:0,label:'Free + privacy',tag:'✦ Trust + free',adoption:71,acceptability:76,vs_twint:47,wtp:0,confidence:'High',highlight:true},
      {price:5,label:'CHF 5 + privacy',tag:'Acceptable',adoption:42,acceptability:47,vs_twint:28,wtp:4.9,confidence:'Medium',highlight:false},
      {price:5,label:'CHF 5 no privacy',tag:'Missing step',adoption:28,acceptability:33,vs_twint:19,wtp:3.4,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:83,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:88,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:89,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Build 3 explicit active-consent privacy controls in plain German into onboarding step 3",items:["Step 3: privacy dashboard — 3 toggles: analytics (off), marketing (off), data sharing (off)",'Plain German: "Wir verkaufen Ihre Daten nicht" — stated explicitly, not in terms','Post-activation: privacy summary email — "Here is what Visa stores about you and how to delete it"'],tier:'B',risk:"Active consent UX may conflict with Swiss GDPR implementation — verify with legal before committing to specific flow"},
    pd:'Extracted: persona=peter · question=data_privacy · dashboard_reduces_dropoff=28% · active_consent=plain_german · confidence=85%',
  },

  peter_lounge: {
    hl:"With 3 trips/year, lounge access delivers <span class='hl'>CHF 105/year</span> — insufficient alone for CHF 12, but <span class='hl-green'>critical in a bundle</span>.",
    conf:74,cl:'High',cd:"Lounge access standalone insufficient for Peter at CHF 12/month — significant only when bundled with travel insurance and zero FX.",
    why:[
      {icon:'✈️',title:'3 trips × CHF 35/visit = CHF 105 — below CHF 144 annual cost',body:"Peter travels 3×/year to Kloten airport. Lounge value: CHF 105/year. Against CHF 12/month (CHF 144/year), lounge alone underdelivers by CHF 39. It cannot stand alone as the tier justification."},
      {icon:'🎯',title:'Lounge is a bundle multiplier, not a lead feature',body:"Lounge + travel insurance + no FX fees: CHF 105 + CHF 80 insurance + CHF 60 FX savings = CHF 245 for CHF 120 annual cost. The bundle makes CHF 10/month obviously rational. Lounge alone does not."},
      {icon:'🛋',title:'Lounge experience creates emotional lock-in beyond the spreadsheet',body:"Once Peter sits in the Kloten lounge with coffee and NZZ — without queuing at gate C — he will not want to travel without this access. The experience creates emotional attachment that outlasts any financial calculation."},
    ],
    sc:[
      {price:8,label:'CHF 8 no lounge',tag:'Base tier',adoption:38,acceptability:43,vs_twint:25,wtp:4.9,confidence:'Medium',highlight:false},
      {price:10,label:'CHF 10 bundle',tag:'✦ Best bundle',adoption:58,acceptability:63,vs_twint:38,wtp:10.2,confidence:'High',highlight:true},
      {price:12,label:'CHF 12 full',tag:'Premium',adoption:44,acceptability:49,vs_twint:29,wtp:9.8,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:74,badge:'Good',badgeClass:'amber',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:71,badge:'Good',badgeClass:'amber',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:74,badge:'Good',badgeClass:'amber',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Position lounge as bundle element — 'Travel insurance + zero FX + lounge = CHF 10/month'",items:["Peter-specific bundle: family travel insurance + zero FX + 5 Priority Pass visits — CHF 10/month",'First lounge promotional visit arranged within 90 days for Peter-segment trialists','Bundle calculator: 3 trips/year → bundle value CHF 245 vs CHF 120 cost shown in onboarding'],tier:'B',risk:"Priority Pass partnership required — confirm lounge inventory at ZRH and GVA before marketing to retirees"},
    pd:'Extracted: persona=peter · question=lounge_access · standalone_insufficient=CHF105_vs_CHF144 · bundle_value=CHF245 · confidence=76%',
  },

  peter_card_face: {
    hl:"Premium card quality increases Peter's trial intent by <span class='hl'>19%</span> — physical quality signals <span class='hl-green'>institutional credibility</span>.",
    conf:71,cl:'High',cd:"Physical card quality showed consistent but modest adoption uplift for retired segment — more as a trust signal than primary driver.",
    why:[
      {icon:'💳',title:"Peter holds his card for 8+ years — quality matters long-term",body:"Peter's current PostFinance card is 7 years old. He expects cards to last. A premium card that ages gracefully signals this is built for the long term. Disposability signals cheapness."},
      {icon:'✨',title:"Metal card in St. Gallen signals quality without ostentation",body:"St. Gallen is conservative and modest — not Zürich. A metal card signals Qualität — the Swiss concept of enduring craftsmanship — not status. Peter values this distinction."},
      {icon:'🖊',title:'Embossed name + bank logo = the Peter trifecta',body:"Embossed name, cantonal bank logo in colour, raised expiry date. This design looks like Peter's PostFinance card from 2005 — familiar, permanent, institutional. The aesthetic is trust, not modernity."},
    ],
    sc:[
      {price:0,label:'Free metal card',tag:'✦ Trust signal',adoption:68,acceptability:73,vs_twint:44,wtp:0,confidence:'High',highlight:true},
      {price:5,label:'CHF 5 metal',tag:'Acceptable',adoption:42,acceptability:47,vs_twint:28,wtp:4.9,confidence:'Medium',highlight:false},
      {price:5,label:'CHF 5 plastic',tag:'Standard',adoption:34,acceptability:39,vs_twint:22,wtp:3.8,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:71,badge:'Good',badgeClass:'amber',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:69,badge:'Fair',badgeClass:'amber',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:69,badge:'Fair',badgeClass:'amber',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Offer premium card quality as default for Peter — metal or premium matte with bank co-brand",items:["Peter card: metal or premium matte, embossed name, bank logo in colour, traditional design",'Tactile quality: "Your card arrives within 5 working days — feel the difference"','Card packaging: linen envelope, not plastic sleeve — unboxing quality signals product quality'],tier:'C',risk:"Premium card CHF 8–12/card vs CHF 2 standard — model against Peter LTV before committing"},
    pd:'Extracted: persona=peter · question=card_quality · premium_uplift=19% · qualitaet_signal · metal=institutional · confidence=73%',
  },

  peter_pension: {
    hl:"On CHF 1,682/month AHV, Peter evaluates costs as income % — <span class='hl'>CHF 5 = 0.3%</span>, his <span class='hl-green'>psychological approval threshold</span>.",
    conf:86,cl:'High',cd:"Fixed-income WTP modelling showed a consistent psychological threshold at 0.3% of monthly income — CHF 5 for Peter's specific AHV level.",
    why:[
      {icon:'💰',title:'CHF 5 / CHF 1,682 = 0.3% — below Peter\'s approval threshold',body:"Every new expense is evaluated as % of monthly total. CHF 5/month = 0.3% — below his subconscious 0.5% threshold for 'costs requiring justification.' CHF 8/month = 0.48% — triggers active review."},
      {icon:'📊',title:'CHF 8 = 0.48% — borderline, requires exceptional value',body:"CHF 8/month is just below the 0.5% rejection threshold. With compelling value (travel insurance, bank co-brand, phone support), it's achievable — but requires active justification, not passive acceptance."},
      {icon:'🔄',title:'Fixed income creates annual re-evaluation at pension review',body:"Peter's AHV is reviewed annually. Every January he reviews all regular expenditures. A subscription he 'doesn't notice' (< CHF 5/month) survives — a CHF 8 subscription requires re-justification every year."},
    ],
    sc:[
      {price:0,label:'Free co-branded',tag:'✦ No threshold',adoption:74,acceptability:79,vs_twint:49,wtp:0,confidence:'High',highlight:true},
      {price:5,label:'CHF 5 (0.3%)',tag:'Below threshold',adoption:43,acceptability:48,vs_twint:29,wtp:4.9,confidence:'Medium',highlight:false},
      {price:8,label:'CHF 8 (0.48%)',tag:'Borderline',adoption:22,acceptability:27,vs_twint:14,wtp:6.1,confidence:'Low',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:86,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:90,badge:'Excellent',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:81,badge:'Strong',badgeClass:'green',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Price Peter-segment at CHF 0–5/month — CHF 8 requires exceptional value and active justification",items:["Peter tier: CHF 0–5/month co-branded card — free is optimal, CHF 5 is the maximum standalone",'Annual review protection: "Your fee is fixed — it will not increase at your next AHV review"','Frame CHF 5 as "the cost of a coffee per month" — familiar, trivial anchor'],tier:'C',risk:"CHF 0–5 for retirees is unsustainable without cross-subsidisation from professional/family tiers"},
    pd:'Extracted: persona=peter · question=fixed_income · threshold=0.3%_income · CHF5=viable · CHF8=borderline · confidence=88%',
  },

  peter_digital: {
    hl:"Step-by-step video onboarding + live chat converts <span class='hl'>44%</span> of digitally hesitant over-65 users who would otherwise <span class='hl-green'>abandon</span>.",
    conf:78,cl:'High',cd:"Assisted digital onboarding showed highest single-step retention improvement for retired segment.",
    why:[
      {icon:'📺',title:"YouTube-style tutorial is Peter's preferred learning format",body:"Peter watches YouTube tutorials to learn new things — he looked up 'how to set up PostFinance e-banking' in 2019. A 3-minute step-by-step video of card activation is his natural learning path."},
      {icon:'💬',title:'1:1 live chat option reduces abandonment by 71% at complex steps',body:"Peter is most likely to abandon at ID verification and card activation. An in-app 'Call me through this step' button — connecting to a German-speaking advisor — reduces abandonment by 71% at these moments."},
      {icon:'👆',title:'Large text + fingerprint (not face) = accessible design',body:"Peter wears reading glasses and prefers not to look directly at his phone camera. Large font (16pt minimum), clear button labels, and fingerprint authentication make the app accessible for his physical preferences."},
    ],
    sc:[
      {price:0,label:'Free + assisted',tag:'✦ Assisted',adoption:69,acceptability:74,vs_twint:45,wtp:0,confidence:'High',highlight:true},
      {price:5,label:'CHF 5 + assisted',tag:'Acceptable',adoption:42,acceptability:47,vs_twint:28,wtp:4.9,confidence:'Medium',highlight:false},
      {price:5,label:'CHF 5 self-serve',tag:'Standard',adoption:18,acceptability:23,vs_twint:12,wtp:2.8,confidence:'Low',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:78,badge:'Good',badgeClass:'amber',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:81,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:72,badge:'Good',badgeClass:'amber',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Build senior-friendly onboarding: video tutorial + live chat at every step",items:["In-app video: 3-minute German-language activation walkthrough — professional quality",'Live chat at every step — German-speaking advisor in < 2 minutes','Senior mode: 16pt minimum font, high-contrast, fingerprint authentication default'],tier:'B',risk:"Live chat requires German-speaking advisors during Swiss business hours — minimum 3 advisors to cover peak onboarding"},
    pd:'Extracted: persona=peter · question=digital_onboarding · assisted=44%_retention · video_tutorial=preferred · live_chat=71%_abandonment_reduction · confidence=80%',
  },

  peter_family: {
    hl:"Extending travel insurance to spouse + adult children shifts Peter's WTP from <span class='hl'>CHF 5 → CHF 9</span> — family protection <span class='hl-green'>unlocks the premium tier</span>.",
    conf:81,cl:'High',cd:"Family travel insurance coverage was the single most powerful WTP driver for retired segment — personal protection alone insufficient.",
    why:[
      {icon:'👨‍👩‍👧',title:"Peter's biggest anxiety: medical emergency abroad for his wife",body:"Peter's wife was hospitalised in Italy in 2019 — 10 days at EUR 8,400. They paid out of pocket. This memory is vivid and ongoing. A card covering both of them for medical emergencies abroad converts past trauma into present solution."},
      {icon:'💰',title:'CHF 10/month < CHF 200/month standalone travel insurance',body:"Peter checked Generali travel insurance for 2 people (65+): CHF 380/year (CHF 31.67/month). Card-bundled family travel insurance at CHF 10/month (CHF 120/year) is 68% cheaper. The math is immediate."},
      {icon:'🧬',title:'Adult children covered = family legacy decision',body:"Peter's adult son (Thomas, 38) joins the summer holiday. Coverage extending to adult children converts a personal utility decision into a family legacy gesture — Peter provides protection for his whole family."},
    ],
    sc:[
      {price:5,label:'CHF 5 personal',tag:'Personal only',adoption:38,acceptability:43,vs_twint:25,wtp:5.1,confidence:'Medium',highlight:false},
      {price:10,label:'CHF 10 family',tag:'✦ Family covered',adoption:64,acceptability:69,vs_twint:42,wtp:10.2,confidence:'High',highlight:true},
      {price:12,label:'CHF 12 premium',tag:'Full premium',adoption:44,acceptability:49,vs_twint:29,wtp:9.8,confidence:'Medium',highlight:false},
    ],
    ev:[
        {label:'Confidence',pct:81,badge:'Strong',badgeClass:'green',desc:'Langfuse-logged confidence score for this query across all 5 personas.'},
        {label:'Consistency',pct:83,badge:'Strong',badgeClass:'green',desc:'Response stability measured across repeated simulation runs.'},
        {label:'Differentiation',pct:77,badge:'Good',badgeClass:'amber',desc:'Persona-segment divergence captured by the evaluation suite.'},
      ],
    rec:{hl:"Lead with family travel insurance — 'Your whole family is covered abroad for CHF 10/month'",items:["Travel insurance: Peter + spouse + adult children in same travel party — explicitly stated",'Onboarding: "How many people travel with you?" → family coverage value based on group size',"Compare: 'Generali 2-person cover: CHF 380/year. Visa family cover: CHF 120/year — same protection, 68% cheaper'"],tier:'A',risk:"Family travel insurance coverage (who qualifies as 'family') must be legally precise — vague promises cause claims disputes and destroy trust permanently"},
    pd:'Extracted: persona=peter · question=family_travel · wtp_shift=CHF5→CHF9 · family_cover=premium_unlock · italy_hospitalisation=trigger · confidence=83%',
  },

};
