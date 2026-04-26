"""
RAG Knowledge Base — Swiss Consumer Data Chunks
Sources:
  - SNB Payment Methods Survey 2024
  - Swiss Payment Monitor 2025 (ZHAW / HSG)
  - BFS Population by Age 2024
  - BFS Household Budget Survey 2022-2023

Each chunk includes:
  - id:          unique identifier
  - text:        the data fact (one sentence)
  - source:      human-readable source name
  - topic:       semantic category
  - personas:    which personas this chunk is relevant to
"""

CHUNKS = [

    # ── SNB Payment Survey 2024 ───────────────────────────────────────────────

    {
        "id":          "snb_01",
        "text":        "Debit card is now the most frequently used payment method at physical points of sale (POS) in Switzerland as of 2024, replacing cash for the first time.",
        "source":      "SNB Payment Survey 2024",        "topic":       "payment_behavior",
        "personas":    ["all"],
    },
    {
        "id":          "snb_02",
        "text":        "Mobile payment apps are used for almost 1 in 5 payments at physical POS in Switzerland (2024), and are still growing in popularity.",
        "source":      "SNB Payment Survey 2024",        "topic":       "mobile_payment",
        "personas":    ["student", "professional"],
    },
    {
        "id":          "snb_03",
        "text":        "95% of the Swiss population want cash to continue to be available as a payment method. Only a very small proportion are in favour of abolishing cash.",
        "source":      "SNB Payment Survey 2024",        "topic":       "cash_attitude",
        "personas":    ["retired", "family"],
    },
    {
        "id":          "snb_04",
        "text":        "Swiss respondents own a variety of payment methods and make regular use of an average of 3 different payment methods in everyday life.",
        "source":      "SNB Payment Survey 2024",        "topic":       "payment_behavior",
        "personas":    ["all"],
    },
    {
        "id":          "snb_05",
        "text":        "Cash is used most often by people over the age of 55 and those with lower incomes in Switzerland. Cash users especially appreciate spending overview and privacy.",
        "source":      "SNB Payment Survey 2024",        "topic":       "cash_usage_by_age",
        "personas":    ["retired"],
    },
    {
        "id":          "snb_06",
        "text":        "For in-person transactions by age group: respondents aged 15-34 use mobile payment apps most frequently. Respondents aged 55+ have the highest cash usage.",
        "source":      "SNB Payment Survey 2024",        "topic":       "payment_by_age",
        "personas":    ["student", "retired"],
    },
    {
        "id":          "snb_07",
        "text":        "For in-person transactions by income: households earning CHF 10,000+ per month show lower cash usage and higher digital payment adoption compared to lower income groups.",
        "source":      "SNB Payment Survey 2024",        "topic":       "payment_by_income",
        "personas":    ["professional", "family"],
    },
    {
        "id":          "snb_08",
        "text":        "At large retailers (e.g. Migros, Coop), debit cards are the most frequently used payment method. At small retailers, cafes and eating out, cash remains most common.",
        "source":      "SNB Payment Survey 2024",        "topic":       "payment_by_location",
        "personas":    ["family", "retired", "student"],
    },
    {
        "id":          "snb_09",
        "text":        "Public transport tickets in Switzerland are predominantly paid with mobile payment apps (e.g. Twint, SBB app).",
        "source":      "SNB Payment Survey 2024",        "topic":       "mobile_payment_transport",
        "personas":    ["student", "professional"],
    },
    {
        "id":          "snb_10",
        "text":        "For amounts between CHF 20 and CHF 200, the debit card is the most frequently used payment method in Switzerland. For amounts over CHF 200, online banking dominates.",
        "source":      "SNB Payment Survey 2024",        "topic":       "payment_by_amount",
        "personas":    ["family", "professional"],
    },
    {
        "id":          "snb_11",
        "text":        "For very small amounts (under CHF 20), cash remains the most common payment method in Switzerland, although mobile apps are growing in this segment.",
        "source":      "SNB Payment Survey 2024",        "topic":       "payment_small_amounts",
        "personas":    ["student", "retired"],
    },
    {
        "id":          "snb_12",
        "text":        "Twint is the most frequently used payment service provider in Swiss online shops and apps. For in-person payments, international card organisations (Visa, Mastercard) dominate.",
        "source":      "SNB Payment Survey 2024",        "topic":       "payment_providers",
        "personas":    ["all"],
    },
    {
        "id":          "snb_13",
        "text":        "When a payment method is not accepted, cash is the most commonly used fallback for Swiss consumers. Around 50% of respondents experienced a payment not accepted in the last 12 months.",
        "source":      "SNB Payment Survey 2024",        "topic":       "cash_as_backup",
        "personas":    ["all"],
    },
    {
        "id":          "snb_14",
        "text":        "98% of Swiss respondents are satisfied or mostly satisfied with the acceptance of cash in Switzerland.",
        "source":      "SNB Payment Survey 2024",        "topic":       "cash_acceptance",
        "personas":    ["retired", "family"],
    },
    {
        "id":          "snb_15",
        "text":        "Remote transactions (online shopping, bill payments) in Switzerland are dominated by mobile payment apps. Twint is the most used provider in online shops. Bills are predominantly paid via bank transfers.",
        "source":      "SNB Payment Survey 2024",        "topic":       "online_payment",
        "personas":    ["student", "professional", "family"],
    },
    {
    "id":       "snb_16",
    "text":     "Swiss consumers aged 35-44 show balanced payment behavior: debit card dominant at supermarkets, Twint for P2P transfers, moderate credit card use for larger purchases.",
    "source":   "SNB Payment Survey 2024",
    "topic":    "payment_behavior_mittelstand",
    "personas": ["mittelstand"],
    },

    # ── Swiss Payment Monitor 2025 ────────────────────────────────────────────

    {
        "id":          "spm_01",
        "text":        "Mobile payment (broad definition) is the most used payment method in Switzerland with 30.7% of transactions in 2024, ahead of debit card (24.4%) and cash (24.2%).",
        "source":      "Swiss Payment Monitor 2025",        "topic":       "market_shares",
        "personas":    ["all"],
    },
    {
        "id":          "spm_02",
        "text":        "14% of the Swiss population are mobile payers — meaning they make more than 75% of their payments via mobile device. This share has nearly doubled in two years.",
        "source":      "Swiss Payment Monitor 2025",        "topic":       "mobile_payers",
        "personas":    ["student", "professional"],
    },
    {
        "id":          "spm_03",
        "text":        "Payment type breakdown in Switzerland (2024): 58.7% mixed payers, 14.4% mobile payers, 10.5% debit card payers, 9.4% cash payers, 7% credit card payers.",
        "source":      "Swiss Payment Monitor 2025",        "topic":       "payment_types",
        "personas":    ["all"],
    },
    {
        "id":          "spm_04",
        "text":        "Twint holds 66.7% share of all mobile payment transactions in Switzerland. Apple Pay is second with 16.4% and growing, driven by new-generation debit cards.",
        "source":      "Swiss Payment Monitor 2025",        "topic":       "mobile_providers",
        "personas":    ["student", "professional", "family"],
    },
    {
        "id":          "spm_05",
        "text":        "The most common reasons Swiss consumers choose cashless payment: habit (60%), speed (36%), merchant preference (30%), amount (29%).",
        "source":      "Swiss Payment Monitor 2025",        "topic":       "payment_reasons",
        "personas":    ["all"],
    },
    {
        "id":          "spm_06",
        "text":        "The most common reasons Swiss consumers choose cash: transaction amount (45%), habit (37%), merchant type (30%), cash-only acceptance (13%).",
        "source":      "Swiss Payment Monitor 2025",        "topic":       "cash_reasons",
        "personas":    ["retired", "student"],
    },
    {
        "id":          "spm_07",
        "text":        "Mobile payment dominates the mobility, parking and transport category with 62.2% of transactions. It is also high for leisure (35.5%) and durable goods (35.1%).",
        "source":      "Swiss Payment Monitor 2025",        "topic":       "mobile_by_location",
        "personas":    ["student", "professional"],
    },
    {
        "id":          "spm_08",
        "text":        "Cash proportion is highest at vending machines (42.1%), bars and clubs (40.9%), and kiosks/bakeries (38.9%). It is lowest for clothing purchases (8.1%).",
        "source":      "Swiss Payment Monitor 2025",        "topic":       "cash_by_location",
        "personas":    ["retired", "student"],
    },
    {
        "id":          "spm_09",
        "text":        "Credit card (non-mobile) is used most frequently in restaurants (21.8% share), petrol stations (18.4%), and for purchases over CHF 500 (27.1% share).",
        "source":      "Swiss Payment Monitor 2025",        "topic":       "credit_card_usage",
        "personas":    ["professional", "family"],
    },
    {
        "id":          "spm_10",
        "text":        "Average transaction amounts by payment method in Switzerland: invoice CHF 217, credit card CHF 71, debit card CHF 44, mobile payment CHF 38, cash CHF 22.",
        "source":      "Swiss Payment Monitor 2025",        "topic":       "transaction_amounts",
        "personas":    ["all"],
    },
    {
        "id":          "spm_11",
        "text":        "For amounts under CHF 5, mobile payment is now the most used method (36.6%), surpassing cash (33.3%) for the first time in Switzerland.",
        "source":      "Swiss Payment Monitor 2025",        "topic":       "small_amount_payment",
        "personas":    ["student"],
    },
    {
        "id":          "spm_12",
        "text":        "Median cash held in wallet by Swiss consumers: CHF 50. Median cash kept at home: CHF 200. 13.7% carry no cash at all in their wallet.",
        "source":      "Swiss Payment Monitor 2025",        "topic":       "cash_reserves",
        "personas":    ["all"],
    },
    {
        "id":          "spm_13",
        "text":        "70.4% of Swiss respondents are against abolishing cash — a new high. Cash is used less but valued by a growing proportion of the population.",
        "source":      "Swiss Payment Monitor 2025",        "topic":       "cash_attitude",
        "personas":    ["retired", "family"],
    },
    {
        "id":          "spm_14",
        "text":        "39.1% of Swiss respondents have used at least one neobank. Revolut leads (17.1%), followed by Neon (11.4%) and Yuh (11.1%). Neobanks are mainly used as a supplement to traditional banking.",
        "source":      "Swiss Payment Monitor 2025",        "topic":       "neobanks",
        "personas":    ["student", "professional"],
    },
    {
        "id":          "spm_15",
        "text":        "In distance selling (online), mobile payment accounts for 69.1% of transactions. Twint is accepted by approximately 80% of Swiss merchants.",
        "source":      "Swiss Payment Monitor 2025",        "topic":       "online_mobile",
        "personas":    ["student", "professional", "family"],
    },
    {
        "id":          "spm_16",
        "text":        "Debit card payers in Switzerland use debit for 75%+ of their transactions. They represent 10.5% of the population — typical profile matches family segment.",
        "source":      "Swiss Payment Monitor 2025",        "topic":       "debit_payers",
        "personas":    ["family"],
    },
    {
        "id":          "spm_17",
        "text":        "Cash payers (75%+ cash transactions) represent 9.4% of Swiss population. This group skews older and lower income — consistent with retired persona.",
        "source":      "Swiss Payment Monitor 2025",        "topic":       "cash_payers",
        "personas":    ["retired"],
    },
    {
    "id":       "spm_18",
    "text":     "Debit card payers represent 10.5% of Swiss population — the mittelstand median earner segment predominantly uses debit card for 45% of transactions, particularly at large retailers.",
    "source":   "Swiss Payment Monitor 2025",
    "topic":    "debit_card_mittelstand",
    "personas": ["mittelstand"],
    },
    {
    "id":       "spm_19",
    "text":     "Revolut is used by 17.1% of Swiss respondents, primarily as a supplement to traditional banking for travel and foreign currency — relevant for median earner segment aged 28-42.",
    "source":   "Swiss Payment Monitor 2025",
    "topic":    "neobank_mittelstand",
    "personas": ["mittelstand"],
    },
    # ── BFS Population Data 2024 ──────────────────────────────────────────────

    {
        "id":          "bfs_pop_01",
        "text":        "Total Swiss permanent resident population as of 31.12.2024: 9,051,029 people.",
        "source":      "BFS Population by Age and Region 2024",        "topic":       "population_total",
        "personas":    ["all"],
    },
    {
        "id":          "bfs_pop_02",
        "text":        "Swiss population aged 18-34 (Student persona segment): 1,862,952 people, representing 20.6% of the total population (2024).",
        "source":      "BFS Population by Age and Region 2024",        "topic":       "population_student",
        "personas":    ["student"],
    },
    {
        "id":          "bfs_pop_03",
        "text":        "Swiss population aged 35-54 (Family persona segment): 2,545,227 people, representing 28.1% of the total population (2024).",
        "source":      "BFS Population by Age and Region 2024",        "topic":       "population_family",
        "personas":    ["family"],
    },
    {
        "id":          "bfs_pop_04",
        "text":        "Swiss population aged 25-54 (Professional persona segment): 3,752,330 people, representing 41.5% of the total population (2024).",
        "source":      "BFS Population by Age and Region 2024",        "topic":       "population_professional",
        "personas":    ["professional"],
    },
    {
        "id":          "bfs_pop_05",
        "text":        "Swiss population aged 65 and over (Retired persona segment): 1,769,253 people, representing 19.5% of the total population (2024).",
        "source":      "BFS Population by Age and Region 2024",        "topic":       "population_retired",
        "personas":    ["retired"],
    },
    {
    "id":       "bfs_pop_06",
    "text":     "Swiss population aged 28-42 at median income (Mittelstand segment, Anna): approximately 1,400,000 adults, representing the largest swing segment for consumer financial product adoption.",
    "source":   "BFS Population by Age and Region 2024",
    "topic":    "population_mittelstand",
    "personas": ["mittelstand"],
    },

    # ── BFS Household Budget Survey 2022-2023 ─────────────────────────────────

    {
        "id":          "bfs_hh_01",
        "text":        "Average Swiss household gross income (Bruttoeinkommen): CHF 9,927/month (2022) and CHF 10,341/month (2023). Average household size: 2.08 persons.",
        "source":      "BFS Household Budget Survey 2022-2023",        "topic":       "gross_income",
        "personas":    ["all"],
    },
    {
        "id":          "bfs_hh_02",
        "text":        "Average Swiss household disposable income (Verfügbares Einkommen) after taxes and mandatory deductions: CHF 6,902/month (2022) and CHF 7,186/month (2023).",
        "source":      "BFS Household Budget Survey 2022-2023",        "topic":       "disposable_income",
        "personas":    ["all"],
    },
    {
        "id":          "bfs_hh_03",
        "text":        "Average Swiss household savings (Sparbetrag): CHF 1,546/month (2022) and CHF 1,736/month (2023).",
        "source":      "BFS Household Budget Survey 2022-2023",        "topic":       "savings",
        "personas":    ["family", "professional"],
    },
    {
        "id":          "bfs_hh_04",
        "text":        "Average monthly food and non-alcoholic drinks spending per Swiss household: CHF 629 (2022). This is the largest single consumption category after housing.",
        "source":      "BFS Household Budget Survey 2022-2023",        "topic":       "food_spending",
        "personas":    ["family", "retired", "student"],
    },
    {
        "id":          "bfs_hh_05",
        "text":        "Average monthly housing and energy costs per Swiss household: CHF 1,374 (2022). This is the largest monthly expense for Swiss households.",
        "source":      "BFS Household Budget Survey 2022-2023",        "topic":       "housing_costs",
        "personas":    ["family", "retired", "professional"],
    },
    {
        "id":          "bfs_hh_06",
        "text":        "Average monthly transport spending per Swiss household: CHF 761 (2022), including public transport, car costs and fuel.",
        "source":      "BFS Household Budget Survey 2022-2023",        "topic":       "transport_spending",
        "personas":    ["family", "professional", "student"],
    },
    {
        "id":          "bfs_hh_07",
        "text":        "Average monthly health spending per Swiss household: CHF 221 (2022), excluding mandatory health insurance premiums.",
        "source":      "BFS Household Budget Survey 2022-2023",        "topic":       "health_spending",
        "personas":    ["retired", "family"],
    },
    {
        "id":          "bfs_hh_08",
        "text":        "Average monthly mandatory health insurance premium (basic, Grundversicherung) per Swiss household: CHF 660 (2022).",
        "source":      "BFS Household Budget Survey 2022-2023",        "topic":       "health_insurance",
        "personas":    ["all"],
    },
    {
        "id":          "bfs_hh_09",
        "text":        "Average monthly tax burden per Swiss household: CHF 1,206 (2022). Social insurance contributions: CHF 1,027/month (2022).",
        "source":      "BFS Household Budget Survey 2022-2023",        "topic":       "taxes",
        "personas":    ["professional", "family"],
    },
    {
        "id":          "bfs_hh_10",
        "text":        "Average monthly restaurant and accommodation spending per Swiss household: CHF 540 (2022).",
        "source":      "BFS Household Budget Survey 2022-2023",        "topic":       "restaurant_spending",
        "personas":    ["professional", "student"],
    },
    {
        "id":          "bfs_hh_11",
        "text":        "Average monthly entertainment, leisure and culture spending per Swiss household: CHF 484 (2022).",
        "source":      "BFS Household Budget Survey 2022-2023",        "topic":       "leisure_spending",
        "personas":    ["student", "professional", "family"],
    },
    {
        "id":          "bfs_hh_12",
        "text":        "Total average monthly consumption spending per Swiss household: CHF 4,949 (2022), covering all categories including food, housing, transport, health, and leisure.",
        "source":      "BFS Household Budget Survey 2022-2023",        "topic":       "total_consumption",
        "personas":    ["all"],
    },
    {
        "id":          "bfs_hh_13",
        "text":        "Average monthly AHV/IV pension (1st pillar) income per Swiss household: CHF 951 (2022). Occupational pension (2nd pillar): CHF 721/month (2022).",
        "source":      "BFS Household Budget Survey 2022-2023",        "topic":       "pension_income",
        "personas":    ["retired"],
    },
    {
    "id":       "bfs_hh_14",
    "text":     "Swiss median net household income (single earner): CHF 5,600/month (2024), based on BFS median gross wage of CHF 6,788/month minus taxes and social contributions.",
    "source":   "BFS Household Budget Survey 2022-2023",
    "topic":    "median_income",
    "personas": ["mittelstand"],
    },
    {
    "id":       "bfs_hh_15",
    "text":     "Average Swiss single-person household monthly fixed costs: rent CHF 1,400-1,650, health insurance CHF 380-460, transport CHF 200-300, groceries CHF 450-600 — total approximately CHF 2,640-3,330/month.",
    "source":   "BFS Household Budget Survey 2022-2023",
    "topic":    "fixed_costs_mittelstand",
    "personas": ["mittelstand"],
    },
    {
    "id":       "bfs_hh_16",
    "text":     "Swiss median earner disposable income after fixed costs: CHF 2,070-2,960/month — sufficient for discretionary spending but requires careful budget management.",
    "source":   "BFS Household Budget Survey 2022-2023",
    "topic":    "disposable_income_mittelstand",
    "personas": ["mittelstand"],
    },
]
