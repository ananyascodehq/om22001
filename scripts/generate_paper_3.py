import json
import os

base_dir = r"d:\OM22001\om22001-stats-hub"
content_sem = os.path.join(base_dir, "content", "sem")

paper3 = {
  "id": "2025-dec-sem6-133554",
  "title": "B.E. / B.Tech. Degree Examinations, DEC 2025",
  "subjectCode": "OM22001",
  "subjectName": "Statistical Methods for Engineers",
  "regulation": "2022",
  "semester": 6,
  "qCode": "133554",
  "examMonthYear": "Dec 2025",
  "departments": "Common to BT, CE, CH, CS, EC, EE, IT, ME & MN",
  "duration": "3 Hours",
  "maxMarks": 100,
  "pdfUrl": "/papers/sem/2025-dec-sem6-133554/question-paper.pdf",
  "questions": [
    {
      "id": "2025-dec-sem6-q1",
      "paperId": "2025-dec-sem6-133554",
      "part": "A",
      "number": "1",
      "marks": 2,
      "co": 1,
      "rbt": 2,
      "unit": 1,
      "topic": "Arithmetic Mean",
      "questionText": "The pass result of 50 students who took a class test is given below:\nMarks: 40, 50, 60, 70, 80, 90\nNumber of students: 8, 10, 9, 6, 4, 3\nIf the mean marks for all the students was 51.6 find out the mean marks of the students who failed.",
      "tables": [
        {
          "title": "Pass Results",
          "headers": ["Marks", "40", "50", "60", "70", "80", "90"],
          "rows": [
            ["Number of students", "8", "10", "9", "6", "4", "3"]
          ]
        }
      ],
      "answer": {
        "status": "complete",
        "steps": [
          "Number of students who passed $n_1 = 8 + 10 + 9 + 6 + 4 + 3 = 40$.",
          "Total marks scored by passed students: $\\sum x_1 = 8(40) + 10(50) + 9(60) + 6(70) + 4(80) + 3(90) = 320 + 500 + 540 + 420 + 320 + 270 = 2370$.",
          "Total students $N = 50 \\implies$ Number of failed students $n_2 = 50 - 40 = 10$.",
          "Total marks of all 50 students: $\\sum x_{total} = 50 \\times 51.6 = 2580$.",
          "Total marks of failed students: $\\sum x_2 = 2580 - 2370 = 210$.",
          "Mean marks of failed students $\\bar{x}_2 = \\frac{210}{10} = 21.0$."
        ],
        "finalAnswer": "Mean marks of failed students = 21.0",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["combined-mean", "arithmetic-mean", "descriptive-statistics"]
    },
    {
      "id": "2025-dec-sem6-q2",
      "paperId": "2025-dec-sem6-133554",
      "part": "A",
      "number": "2",
      "marks": 2,
      "co": 1,
      "rbt": 2,
      "unit": 1,
      "topic": "Harmonic Mean and Geometric Mean",
      "questionText": "Find the harmonic mean of the following distribution of data:\nDividend yield (percent): 2–6, 6–10, 10–14\nNumber of companies: 10, 12, 18",
      "tables": [
        {
          "title": "Dividend Yield",
          "headers": ["Dividend yield (percent)", "2–6", "6–10", "10–14"],
          "rows": [
            ["Number of companies", "10", "12", "18"]
          ]
        }
      ],
      "answer": {
        "status": "complete",
        "steps": [
          "Class midpoints ($m$): $2-6 \\implies m = 4$; $6-10 \\implies m = 8$; $10-14 \\implies m = 12$.",
          "Compute $\\frac{f}{m}$ for each class:",
          "$2-6: f = 10, f/m = 10/4 = 2.50$",
          "$6-10: f = 12, f/m = 12/8 = 1.50$",
          "$10-14: f = 18, f/m = 18/12 = 1.50$",
          "Total frequency $N = 10 + 12 + 18 = 40$.",
          "Sum of $\\frac{f}{m} = 2.50 + 1.50 + 1.50 = 5.50$.",
          "Harmonic Mean $H = \\frac{N}{\\sum (f/m)} = \\frac{40}{5.50} = \\frac{80}{11} \\approx 7.27\\%$."
        ],
        "finalAnswer": "$H = 7.27\\%$",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["harmonic-mean", "central-tendency", "repeated-question"]
    },
    {
      "id": "2025-dec-sem6-q3",
      "paperId": "2025-dec-sem6-133554",
      "part": "A",
      "number": "3",
      "marks": 2,
      "co": 1,
      "rbt": 2,
      "unit": 1,
      "topic": "Quartiles and Quartile Deviation",
      "questionText": "The daily wages (in rupees) of 7 workers are 300, 350, 400, 425, 450, 500 and 600. Compute the first and third quartiles.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Given ordered wage data ($n = 7$): 300, 350, 400, 425, 450, 500, 600.",
          "$Q_1 = \\text{value of } \\frac{n+1}{4}\\text{th item} = \\frac{8}{4}\\text{th} = 2\\text{nd item} = 350$.",
          "$Q_3 = \\text{value of } \\frac{3(n+1)}{4}\\text{th item} = 6\\text{th item} = 500$."
        ],
        "finalAnswer": "$Q_1 = \\text{Rs. } 350, Q_3 = \\text{Rs. } 500$",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["quartiles", "descriptive-statistics"]
    },
    {
      "id": "2025-dec-sem6-q4",
      "paperId": "2025-dec-sem6-133554",
      "part": "A",
      "number": "4",
      "marks": 2,
      "co": 1,
      "rbt": 2,
      "unit": 1,
      "topic": "Kurtosis and Moments",
      "questionText": "The first four central moments of a distribution are 0, 2.5, 0.7 and 18.75. Test the kurtosis of the distribution.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Given central moments: $\\mu_1 = 0, \\mu_2 = 2.5, \\mu_3 = 0.7, \\mu_4 = 18.75$.",
          "Coefficient of kurtosis $\\beta_2 = \\frac{\\mu_4}{\\mu_2^2} = \\frac{18.75}{(2.5)^2} = \\frac{18.75}{6.25} = 3.0$.",
          "Excess kurtosis $\\gamma_2 = \\beta_2 - 3 = 3.0 - 3.0 = 0$.",
          "Interpretation: Since $\\beta_2 = 3$ ($\r\n\\gamma_2 = 0$), the distribution is mesokurtic (identical peakness to a standard normal distribution)."
        ],
        "finalAnswer": "$\\beta_2 = 3.0$ (Mesokurtic / Normal)",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["kurtosis", "central-moments", "mesokurtic"]
    },
    {
      "id": "2025-dec-sem6-q5",
      "paperId": "2025-dec-sem6-133554",
      "part": "A",
      "number": "5",
      "marks": 2,
      "co": 2,
      "rbt": 2,
      "unit": 2,
      "topic": "Test of Significance for Single Proportion (Z-test)",
      "questionText": "In a large consignment of oranges a random sample of 64 oranges revealed that 14 oranges were bad. Is it reasonable to assume that 20% of the oranges were bad?",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Hypotheses: $H_0: P = 0.20$ vs $H_1: P \\neq 0.20$ (two-tailed test at $\\alpha = 0.05$).",
          "Sample size $n = 64$, observed bad oranges $x = 14 \\implies p = \\frac{14}{64} = 0.21875$.",
          "Standard error $SE = \\sqrt{\\frac{P(1-P)}{n}} = \\sqrt{\\frac{0.20 \\times 0.80}{64}} = \\sqrt{\\frac{0.16}{64}} = \\sqrt{0.0025} = 0.05$.",
          "Test statistic $Z = \\frac{p - P}{SE} = \\frac{0.21875 - 0.20}{0.05} = \\frac{0.01875}{0.05} = 0.375$.",
          "Critical Value: At $\\alpha = 0.05$, $Z_{critical} = 1.96$.",
          "Decision: Since $|Z_{cal}| = 0.375 < 1.96$, accept $H_0$. It is completely reasonable to assume 20% of the oranges are bad."
        ],
        "finalAnswer": "Accept $H_0$ ($|Z| = 0.375 < 1.96$); reasonable to assume 20% bad.",
        "tableValuesUsed": "Two-tailed $Z$ at 5% = 1.96",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["z-test", "single-proportion", "large-sample"]
    },
    {
      "id": "2025-dec-sem6-q6",
      "paperId": "2025-dec-sem6-133554",
      "part": "A",
      "number": "6",
      "marks": 2,
      "co": 2,
      "rbt": 2,
      "unit": 2,
      "topic": "Test of Significance for Single Proportion (Z-test)",
      "questionText": "In a sample of 1,000 people in Maharashtra, 540 are rice eaters and the rest are wheat eaters. Compute the test statistic.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Hypotheses: $H_0: P = 0.50$ (rice and wheat equally preferred) vs $H_1: P \\neq 0.50$.",
          "Sample size $n = 1000$, rice eaters $x = 540 \\implies p = \\frac{540}{1000} = 0.54$.",
          "Standard error $SE = \\sqrt{\\frac{P(1-P)}{n}} = \\sqrt{\\frac{0.50 \\times 0.50}{1000}} = \\sqrt{0.00025} \\approx 0.01581$.",
          "Test statistic $Z = \\frac{p - P}{SE} = \\frac{0.54 - 0.50}{0.01581} = \\frac{0.04}{0.01581} \\approx 2.530$."
        ],
        "finalAnswer": "$Z = 2.53$",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["z-test", "single-proportion", "test-statistic"]
    },
    {
      "id": "2025-dec-sem6-q7",
      "paperId": "2025-dec-sem6-133554",
      "part": "A",
      "number": "7",
      "marks": 2,
      "co": 2,
      "rbt": 2,
      "unit": 2,
      "topic": "Standard Error",
      "questionText": "A pharmaceutical company claims that the average recovery time for patients taking a new drug is 14 days. A sample of 50 patients showed an average recovery time of 13.5 days with a standard deviation of 2 days. Calculate the standard error.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Given: $n = 50$, sample standard deviation $s = 2$ days.",
          "Formula for standard error of the sample mean: $SE = \\frac{s}{\\sqrt{n}}$.",
          "$SE = \\frac{2}{\\sqrt{50}} = \\frac{2}{7.0711} \\approx 0.2828$ days."
        ],
        "finalAnswer": "$SE = 0.283$ days",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["standard-error", "sample-mean", "sampling-distributions"]
    },
    {
      "id": "2025-dec-sem6-q8",
      "paperId": "2025-dec-sem6-133554",
      "part": "A",
      "number": "8",
      "marks": 2,
      "co": 2,
      "rbt": 2,
      "unit": 2,
      "topic": "Test of Significance for Single Mean (Z-test)",
      "questionText": "A school claims that the average score of its students in a national exam is 75. A random sample of 200 students had an average score of 73 with a standard deviation of 10. Calculate the Z-value.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Given: $\\mu = 75$, $n = 200$, $\\bar{x} = 73$, $s = 10$.",
          "Formula: $Z = \\frac{\\bar{x} - \\mu}{s / \\sqrt{n}}$.",
          "$Z = \\frac{73 - 75}{10 / \\sqrt{200}} = \\frac{-2}{10 / 14.142} = \\frac{-2}{0.7071} \\approx -2.828$."
        ],
        "finalAnswer": "$Z = -2.828$",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["z-test", "single-mean", "test-statistic"]
    },
    {
      "id": "2025-dec-sem6-q9",
      "paperId": "2025-dec-sem6-133554",
      "part": "A",
      "number": "9",
      "marks": 2,
      "co": 3,
      "rbt": 3,
      "unit": 3,
      "topic": "Student's t-Test for Single Mean",
      "questionText": "A company advertises that their batteries last an average of 30 hours. You select a random sample of 20 batteries and find that the sample mean battery life is 28.5 hours with a sample standard deviation of 2.5 hours. Test the company's claim at the 5% significance level.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Hypotheses: $H_0: \\mu = 30$ vs $H_1: \\mu < 30$ (one-tailed) or $H_1: \\mu \\neq 30$ (two-tailed).",
          "Given: $\\mu = 30$, $n = 20 < 30$, $\\bar{x} = 28.5$, $s = 2.5$.",
          "Test statistic $t = \\frac{\\bar{x} - \\mu}{s / \\sqrt{n}} = \\frac{28.5 - 30}{2.5 / \\sqrt{20}} = \\frac{-1.5}{2.5 / 4.4721} = \\frac{-1.5}{0.5590} = -2.683$.",
          "Degrees of freedom: $df = n - 1 = 19$.",
          "Critical value: Two-tailed $t_{0.05, 19} = 2.093$ (one-tailed $t_{0.05, 19} = -1.729$).",
          "Decision: Since $|t_{cal}| = 2.683 > 2.093$, reject $H_0$. The battery life is significantly lower than claimed."
        ],
        "finalAnswer": "Reject $H_0$ ($|t| = 2.683 > t_{0.05, 19} = 2.093$); company's claim is rejected.",
        "tableValuesUsed": "$t$ at 5% with $df=19$ is 2.093",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["t-test", "single-mean", "small-sample"]
    },
    {
      "id": "2025-dec-sem6-q10",
      "paperId": "2025-dec-sem6-133554",
      "part": "A",
      "number": "10",
      "marks": 2,
      "co": 3,
      "rbt": 2,
      "unit": 3,
      "topic": "Student's t-Test for Single Mean",
      "questionText": "A shoe manufacturer claims that the average durability of its shoes is 500 miles. A sample of 9 pairs of shoes shows a mean durability of 480 miles with a standard deviation of 15 miles. Calculate the t-value.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Given: $\\mu = 500$, $n = 9$, $\\bar{x} = 480$, $s = 15$.",
          "Formula: $t = \\frac{\\bar{x} - \\mu}{s / \\sqrt{n}}$.",
          "$t = \\frac{480 - 500}{15 / \\sqrt{9}} = \\frac{-20}{15 / 3} = \\frac{-20}{5} = -4.0$."
        ],
        "finalAnswer": "$t = -4.0$",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["t-test", "single-mean", "small-sample"]
    },
    {
      "id": "2025-dec-sem6-q11",
      "paperId": "2025-dec-sem6-133554",
      "part": "A",
      "number": "11",
      "marks": 2,
      "co": 3,
      "rbt": 2,
      "unit": 3,
      "topic": "F-Test for Equality of Two Variances",
      "questionText": "A service manager wants to test if the variance in repair times for Service Center X (Sample size = 25) is different from that for Service Center Y (Sample size = 30). The sample variance for Service Center X is 64, and for Service Center Y, it is 81. Calculate the F-value.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Given: $n_1 = 25, s_X^2 = 64$ and $n_2 = 30, s_Y^2 = 81$.",
          "Formula: $F = \\frac{s_{larger}^2}{s_{smaller}^2} = \\frac{s_Y^2}{s_X^2} = \\frac{81}{64} = 1.2656$.",
          "Degrees of freedom: $\\nu_1 = 30 - 1 = 29$, $\\nu_2 = 25 - 1 = 24$."
        ],
        "finalAnswer": "$F = 1.266$",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["f-test", "variance-ratio", "repeated-question"]
    },
    {
      "id": "2025-dec-sem6-q12",
      "paperId": "2025-dec-sem6-133554",
      "part": "A",
      "number": "12",
      "marks": 2,
      "co": 3,
      "rbt": 2,
      "unit": 3,
      "topic": "Chi-Square Test for Goodness of Fit",
      "questionText": "In a nature reserve, a biologist observed 80 animals of four different species: Species X: 20, Species Y: 25, Species Z: 15, Species W: 20. If the expected distribution of these species is equal. Calculate the Chi-square value.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Total animals $N = 80$. Since species are equally distributed across $k = 4$ species, expected frequency $E = \\frac{80}{4} = 20$ for each species.",
          "Observed frequencies: $O_X = 20, O_Y = 25, O_Z = 15, O_W = 20$.",
          "Calculate $\\chi^2 = \\sum \\frac{(O - E)^2}{E}$:",
          "$\\chi^2 = \\frac{(20 - 20)^2}{20} + \\frac{(25 - 20)^2}{20} + \\frac{(15 - 20)^2}{20} + \\frac{(20 - 20)^2}{20} = \\frac{0 + 25 + 25 + 0}{20} = \\frac{50}{20} = 2.50$."
        ],
        "finalAnswer": "$\\chi^2 = 2.50$",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["chi-square", "goodness-of-fit", "small-sample"]
    },
    {
      "id": "2025-dec-sem6-q13",
      "paperId": "2025-dec-sem6-133554",
      "part": "A",
      "number": "13",
      "marks": 2,
      "co": 4,
      "rbt": 2,
      "unit": 4,
      "topic": "Principles of Design of Experiments",
      "questionText": "In which situation would you use an ANOVA instead of a t-test?",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Use ANOVA when comparing the means of three or more groups ($k \\ge 3$).",
          "If multiple pairwise t-tests were used instead, the family-wise probability of committing a Type I error would rapidly accumulate: $\\alpha_{overall} = 1 - (1 - \\alpha)^c$.",
          "ANOVA evaluates all treatment groups simultaneously via a single omnibus F-test."
        ],
        "finalAnswer": "When comparing 3 or more group means, to control the experiment-wise Type I error rate.",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["anova", "t-test", "design-of-experiments", "repeated-question"]
    },
    {
      "id": "2025-dec-sem6-q14",
      "paperId": "2025-dec-sem6-133554",
      "part": "A",
      "number": "14",
      "marks": 2,
      "co": 4,
      "rbt": 2,
      "unit": 4,
      "topic": "ANOVA Table Construction and F-Ratio Interpretation",
      "questionText": "In one way ANOVA, given SSC = 2580, SSE = 1656, h = 4, N = 20, what is the value of the F-ratio?",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Given: $SSC = 2580$, $SSE = 1656$, number of groups $k = 4$, total observations $N = 20$.",
          "Degrees of freedom: Between Columns $df_C = k - 1 = 4 - 1 = 3$; Error $df_E = N - k = 20 - 4 = 16$.",
          "Mean Squares: $MSC = \\frac{SSC}{df_C} = \\frac{2580}{3} = 860.0$.",
          "Mean Square Error: $MSE = \\frac{SSE}{df_E} = \\frac{1656}{16} = 103.5$.",
          "F-ratio: $F = \\frac{MSC}{MSE} = \\frac{860}{103.5} \\approx 8.309$."
        ],
        "finalAnswer": "$F = 8.309$",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["anova", "f-ratio", "one-way", "repeated-question"]
    },
    {
      "id": "2025-dec-sem6-q15",
      "paperId": "2025-dec-sem6-133554",
      "part": "A",
      "number": "15",
      "marks": 2,
      "co": 4,
      "rbt": 2,
      "unit": 4,
      "topic": "Degrees of Freedom Calculation",
      "questionText": "In a two way classification, with 3 levels of factor A and 4 levels of factor B, the sum of squares for error (SSE) is 1200, and the sum of squares for factor A is 1800. If the total number of observations is 48, calculate the degrees of freedom for factor A, factor B and error.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Levels of Factor A: $a = 3 \\implies df_A = a - 1 = 3 - 1 = 2$.",
          "Levels of Factor B: $b = 4 \\implies df_B = b - 1 = 4 - 1 = 3$.",
          "Total observations $N = 48$.",
          "In a two-way classification with replications (cell count $n = 48 / 12 = 4$): $df_{Error} = N - ab = 48 - 12 = 36$ (or $(a-1)(b-1) = 6$ if without replication)."
        ],
        "finalAnswer": "$df_A = 2, df_B = 3, df_{Error} = 36$ (with replication)",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["anova", "two-way", "degrees-of-freedom", "repeated-question"]
    },
    {
      "id": "2025-dec-sem6-q16",
      "paperId": "2025-dec-sem6-133554",
      "part": "A",
      "number": "16",
      "marks": 2,
      "co": 4,
      "rbt": 2,
      "unit": 4,
      "topic": "Latin Square Design (LSD)",
      "questionText": "In a Latin Square Design with 4 levels of factor A and 4 levels of factor B, how many treatments are there, and how is the layout typically structured?",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "In an $m \\times m$ Latin Square Design, the number of treatments must equal the number of levels of the two blocking factors: $m = 4$ treatments (e.g., A, B, C, D).",
          "Layout Structure: It is arranged in a $4 \\times 4$ grid (16 experimental units) such that each treatment appears exactly once in every row and exactly once in every column."
        ],
        "finalAnswer": "4 treatments; arranged in a 4x4 grid where each treatment occurs once per row and column.",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["latin-square", "experimental-design"]
    },
    {
      "id": "2025-dec-sem6-q17",
      "paperId": "2025-dec-sem6-133554",
      "part": "A",
      "number": "17",
      "marks": 2,
      "co": 5,
      "rbt": 2,
      "unit": 5,
      "topic": "Control Charts for Variables: Range Chart (R chart)",
      "questionText": "What does the \"R\" in an R-chart represent, and why is it important?",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "\"R\" represents the Subgroup Range, calculated as the difference between the largest and smallest observations within a rational subgroup: $R = X_{max} - X_{min}$.",
          "Importance: It monitors short-term within-subgroup process variability (dispersion). Establishing that the R-chart is in control is a mathematical prerequisite before the $\\bar{X}$-chart can be reliably interpreted."
        ],
        "finalAnswer": "R represents the sample range ($X_{max} - X_{min}$); monitors process variability.",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["r-chart", "range", "sqc", "variability"]
    },
    {
      "id": "2025-dec-sem6-q18",
      "paperId": "2025-dec-sem6-133554",
      "part": "A",
      "number": "18",
      "marks": 2,
      "co": 5,
      "rbt": 2,
      "unit": 5,
      "topic": "Control Charts for Attributes: Number of Defectives Chart (np-chart)",
      "questionText": "Based on 15 sub-groups of size 200 taken at intervals of 45 minutes from a manufacturing process the average fraction defective was found to be 0.068. Calculate the value of central line, upper and lower control limits for np-chart.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Given: Subgroup size $n = 200$, average fraction defective $\\bar{p} = 0.068$.",
          "Center Line $CL = n\\bar{p} = 200 \\times 0.068 = 13.6$.",
          "Standard deviation $\\sigma_{np} = \\sqrt{n\\bar{p}(1 - \\bar{p})} = \\sqrt{200 \\times 0.068 \\times 0.932} = \\sqrt{13.6 \\times 0.932} = \\sqrt{12.6752} \\approx 3.560$.",
          "$UCL = n\\bar{p} + 3\\sigma_{np} = 13.6 + 3(3.560) = 13.6 + 10.68 = 24.28$.",
          "$LCL = n\\bar{p} - 3\\sigma_{np} = 13.6 - 10.68 = 2.92$."
        ],
        "finalAnswer": "$CL = 13.6$, $UCL = 24.28$, $LCL = 2.92$",
        "tableValuesUsed": "3-sigma limits",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["np-chart", "control-limits", "sqc", "repeated-question"]
    },
    {
      "id": "2025-dec-sem6-q19",
      "paperId": "2025-dec-sem6-133554",
      "part": "A",
      "number": "19",
      "marks": 2,
      "co": 5,
      "rbt": 2,
      "unit": 5,
      "topic": "Control Charts for Attributes: Fraction Defective Chart (p-chart)",
      "questionText": "For 25 sub-groups of size 500, the average fraction defective is found to be 0.05. Calculate the CL, UCL, and LCL for the p-chart.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Given: $n = 500$, average fraction defective $\\bar{p} = 0.05$.",
          "Center Line $CL = \\bar{p} = 0.05$.",
          "Standard error $\\sigma_p = \\sqrt{\\frac{\\bar{p}(1 - \\bar{p})}{n}} = \\sqrt{\\frac{0.05 \\times 0.95}{500}} = \\sqrt{\\frac{0.0475}{500}} = \\sqrt{0.000095} \\approx 0.009747$.",
          "$UCL = \\bar{p} + 3\\sigma_p = 0.05 + 3(0.009747) = 0.05 + 0.02924 = 0.07924$.",
          "$LCL = \\bar{p} - 3\\sigma_p = 0.05 - 0.02924 = 0.02076$."
        ],
        "finalAnswer": "$CL = 0.05$, $UCL = 0.0792$, $LCL = 0.0208$",
        "tableValuesUsed": "3-sigma limits",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["p-chart", "control-limits", "sqc"]
    },
    {
      "id": "2025-dec-sem6-q20",
      "paperId": "2025-dec-sem6-133554",
      "part": "A",
      "number": "20",
      "marks": 2,
      "co": 5,
      "rbt": 2,
      "unit": 5,
      "topic": "Control Charts for Attributes: Number of Defects Chart (c-chart)",
      "questionText": "Over a period of time, 12 samples are taken from a process, and the average number of defects per unit is 3. Calculate the central line, UCL, and LCL for the c-chart.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Given: Average defects per unit $\\bar{c} = 3.0$.",
          "Center Line $CL = \\bar{c} = 3.0$.",
          "$UCL = \\bar{c} + 3\\sqrt{\\bar{c}} = 3.0 + 3\\sqrt{3.0} = 3.0 + 3(1.732) = 3.0 + 5.196 = 8.196$.",
          "$LCL = \\bar{c} - 3\\sqrt{\\bar{c}} = 3.0 - 5.196 = -2.196 \\implies LCL = 0$ (defects cannot be negative)."
        ],
        "finalAnswer": "$CL = 3.0$, $UCL = 8.20$, $LCL = 0$",
        "tableValuesUsed": "3-sigma Poisson limits",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["c-chart", "control-limits", "sqc", "repeated-question"]
    },
    {
      "id": "2025-dec-sem6-q21a",
      "paperId": "2025-dec-sem6-133554",
      "part": "B",
      "number": "21(a)",
      "marks": 10,
      "co": 1,
      "rbt": 3,
      "unit": 1,
      "topic": "Quartiles and Quartile Deviation",
      "questionText": "The marks of 80 students in an examination are given below. Calculate (i) the lower quartile (ii) upper quartiles (iii) inter quartile range and (iv) coefficient of quartile deviation.\nMarks: 0-10, 10-20, 20-40, 40-60, 60-80, 80-100\nNo. of students: 8, 10, 22, 25, 10, 5",
      "tables": [
        {
          "title": "Examination Marks",
          "headers": ["Marks", "0-10", "10-20", "20-40", "40-60", "60-80", "80-100"],
          "rows": [
            ["No. of students", "8", "10", "22", "25", "10", "5"]
          ]
        }
      ],
      "answer": {
        "status": "complete",
        "steps": [
          "Construct cumulative frequency table ($N = 80$):",
          "Class 0-10: $f = 8, cf = 8$",
          "Class 10-20: $f = 10, cf = 18$",
          "Class 20-40: $f = 22, cf = 40$",
          "Class 40-60: $f = 25, cf = 65$",
          "Class 60-80: $f = 10, cf = 75$",
          "Class 80-100: $f = 5, cf = 80$",
          "(i) Lower Quartile $Q_1$: Position $= N/4 = 80/4 = 20$. Lies in class 20-40 ($L = 20, cf = 18, f = 22, h = 20$).",
          "$Q_1 = L + \\frac{N/4 - cf}{f} \\times h = 20 + \\frac{20 - 18}{22} \\times 20 = 20 + \\frac{40}{22} = 20 + 1.818 = 21.82$.",
          "(ii) Upper Quartile $Q_3$: Position $= 3N/4 = 3(80)/4 = 60$. Lies in class 40-60 ($L = 40, cf = 40, f = 25, h = 20$).",
          "$Q_3 = L + \\frac{3N/4 - cf}{f} \\times h = 40 + \\frac{60 - 40}{25} \\times 20 = 40 + \\frac{20}{25} \\times 20 = 40 + 16 = 56.0$.",
          "(iii) Interquartile Range $IQR = Q_3 - Q_1 = 56.0 - 21.82 = 34.18$.",
          "(iv) Coefficient of Quartile Deviation $= \\frac{Q_3 - Q_1}{Q_3 + Q_1} = \\frac{56.0 - 21.82}{56.0 + 21.82} = \\frac{34.18}{77.82} \\approx 0.4392$."
        ],
        "finalAnswer": "(i) $Q_1 = 21.82$, (ii) $Q_3 = 56.0$, (iii) $IQR = 34.18$, (iv) Coeff of $QD = 0.439$",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["quartiles", "interquartile-range", "quartile-deviation"]
    },
    {
      "id": "2025-dec-sem6-q21b",
      "paperId": "2025-dec-sem6-133554",
      "part": "B",
      "number": "21(b)",
      "marks": 10,
      "co": 1,
      "rbt": 3,
      "unit": 1,
      "topic": "Coefficient of Variation",
      "questionText": "The weekly sales of two products A and B were recorded as given below:\nProduct A: 59, 75, 27, 63, 27, 28, 56\nProduct B: 150, 200, 125, 310, 330, 250, 225\nFind out which of the two shows greater fluctuation in sales.",
      "tables": [
        {
          "title": "Weekly Sales",
          "headers": ["Week", "1", "2", "3", "4", "5", "6", "7"],
          "rows": [
            ["Product A", "59", "75", "27", "63", "27", "28", "56"],
            ["Product B", "150", "200", "125", "310", "330", "250", "225"]
          ]
        }
      ],
      "answer": {
        "status": "complete",
        "steps": [
          "For Product A ($n = 7$):",
          "$\\sum x_A = 59 + 75 + 27 + 63 + 27 + 28 + 56 = 335$.",
          "Mean $\\bar{x}_A = 335 / 7 \\approx 47.857$.",
          "$\\sum x_A^2 = 59^2 + 75^2 + 27^2 + 63^2 + 27^2 + 28^2 + 56^2 = 3481 + 5625 + 729 + 3969 + 729 + 784 + 3136 = 18453$.",
          "$\\sigma_A^2 = \\frac{18453}{7} - (47.857)^2 = 2636.14 - 2290.30 = 345.84 \\implies \\sigma_A = 18.597$.",
          "Coefficient of Variation $CV_A = \\frac{18.597}{47.857} \\times 100 = 38.86\\%$.",
          "For Product B ($n = 7$):",
          "$\\sum x_B = 150 + 200 + 125 + 310 + 330 + 250 + 225 = 1590$.",
          "Mean $\\bar{x}_B = 1590 / 7 \\approx 227.143$.",
          "$\\sum x_B^2 = 150^2 + 200^2 + 125^2 + 310^2 + 330^2 + 250^2 + 225^2 = 22500 + 40000 + 15625 + 96100 + 108900 + 62500 + 50625 = 396250$.",
          "$\\sigma_B^2 = \\frac{396250}{7} - (227.143)^2 = 56607.14 - 51593.94 = 5013.20 \\implies \\sigma_B = 70.804$.",
          "Coefficient of Variation $CV_B = \\frac{70.804}{227.143} \\times 100 = 31.17\\%$.",
          "Conclusion: Since $CV_A (38.86\\%) > CV_B (31.17\\%)$, Product A exhibits higher relative dispersion and therefore shows greater fluctuation in sales."
        ],
        "finalAnswer": "Product A shows greater fluctuation ($CV_A = 38.86\\% > CV_B = 31.17\\%$).",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["coefficient-of-variation", "fluctuation", "consistency", "repeated-question"]
    },
    {
      "id": "2025-dec-sem6-q22a",
      "paperId": "2025-dec-sem6-133554",
      "part": "B",
      "number": "22(a)",
      "marks": 10,
      "co": 2,
      "rbt": 3,
      "unit": 2,
      "topic": "Test of Significance for Difference of Proportions (Z-test)",
      "questionText": "A survey was conducted to compare the proportion of college graduates between two cities, A and B. In City A, 480 out of 800 adults surveyed were college graduates. In City B, 450 out of 700 adults surveyed were college graduates. Test at the 5% significance level whether the proportion of college graduates differs between the two cities.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Hypotheses: $H_0: P_1 = P_2$ vs $H_1: P_1 \\neq P_2$ (two-tailed test at $\\alpha = 0.05$).",
          "City A: $n_1 = 800, x_1 = 480 \\implies p_1 = 480/800 = 0.60$.",
          "City B: $n_2 = 700, x_2 = 450 \\implies p_2 = 450/700 = 0.64286$.",
          "Pooled proportion: $P = \\frac{x_1 + x_2}{n_1 + n_2} = \\frac{480 + 450}{800 + 700} = \\frac{930}{1500} = 0.62$, $Q = 1 - P = 0.38$.",
          "Standard error: $SE = \\sqrt{PQ \\left(\\frac{1}{n_1} + \\frac{1}{n_2}\\right)} = \\sqrt{0.62 \\times 0.38 \\times \\left(\\frac{1}{800} + \\frac{1}{700}\\right)} = \\sqrt{0.2356 \\times 0.0026786} = \\sqrt{0.00063107} \\approx 0.02512$.",
          "Test statistic $Z = \\frac{p_1 - p_2}{SE} = \\frac{0.60 - 0.64286}{0.02512} = \\frac{-0.04286}{0.02512} \\approx -1.706$.",
          "Critical Value: At $\\alpha = 0.05$ (two-tailed), $Z_{critical} = 1.96$.",
          "Decision: Since $|Z_{cal}| = 1.706 < 1.96$, accept $H_0$. There is no significant difference in the proportion of college graduates between the two cities."
        ],
        "finalAnswer": "Accept $H_0$ ($|Z| = 1.706 < 1.96$); proportion of graduates does not differ significantly.",
        "tableValuesUsed": "Two-tailed $Z$ at 5% = 1.96",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["z-test", "difference-of-proportions", "large-sample"]
    },
    {
      "id": "2025-dec-sem6-q22b",
      "paperId": "2025-dec-sem6-133554",
      "part": "B",
      "number": "22(b)",
      "marks": 10,
      "co": 2,
      "rbt": 3,
      "unit": 2,
      "topic": "Test of Significance for Difference of Means (Z-test)",
      "questionText": "An agricultural experiment compares the mean yield of two fertilizers. Fertilizer A resulted in an average yield of 30 tons per hectare with a standard deviation of 5 tons from 40 plots, while Fertilizer B resulted in an average yield of 28 tons per hectare with a standard deviation of 4 tons from 50 plots. Test at the 5% significance level if Fertilizer A is more effective.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Hypotheses: $H_0: \\mu_A = \\mu_B$ vs $H_1: \\mu_A > \\mu_B$ (right-tailed test at $\\alpha = 0.05$).",
          "Fertilizer A: $n_1 = 40, \\bar{x}_1 = 30, s_1 = 5$. Fertilizer B: $n_2 = 50, \\bar{x}_2 = 28, s_2 = 4$.",
          "Standard error: $SE = \\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}} = \\sqrt{\\frac{25}{40} + \\frac{16}{50}} = \\sqrt{0.625 + 0.320} = \\sqrt{0.945} \\approx 0.9721$.",
          "Test statistic $Z = \\frac{\\bar{x}_1 - \\bar{x}_2}{SE} = \\frac{30 - 28}{0.9721} = \\frac{2}{0.9721} \\approx 2.057$.",
          "Critical value: For right-tailed test at $\\alpha = 0.05$, $Z_{critical} = 1.645$.",
          "Decision: Since $Z_{cal} = 2.057 > 1.645$, reject $H_0$. Fertilizer A produces significantly higher yield."
        ],
        "finalAnswer": "Reject $H_0$ ($Z = 2.057 > 1.645$); Fertilizer A is significantly more effective.",
        "tableValuesUsed": "One-tailed $Z$ at 5% = 1.645",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["z-test", "difference-of-means", "large-sample"]
    },
    {
      "id": "2025-dec-sem6-q23a",
      "paperId": "2025-dec-sem6-133554",
      "part": "B",
      "number": "23(a)",
      "marks": 10,
      "co": 3,
      "rbt": 3,
      "unit": 3,
      "topic": "Student's t-Test for Difference of Two Means",
      "questionText": "The nicotine content in milligrams of two samples of tobacco were found to be as follows:\nSample A: 24, 27, 26, 21, 25\nSample B: 27, 30, 28, 31, 22, 36\nCan it be said that two samples come from normal populations having the same mean.",
      "tables": [
        {
          "title": "Nicotine Content",
          "headers": ["Sample", "Values"],
          "rows": [
            ["Sample A", "24, 27, 26, 21, 25"],
            ["Sample B", "27, 30, 28, 31, 22, 36"]
          ]
        }
      ],
      "answer": {
        "status": "complete",
        "steps": [
          "Hypotheses: $H_0: \\mu_1 = \\mu_2$ vs $H_1: \\mu_1 \\neq \\mu_2$ (two-tailed test at $\\alpha = 0.05$).",
          "Sample A ($n_1 = 5$): $\\sum x_1 = 123 \\implies \\bar{x}_1 = 24.6$. Sum of squares of deviations $\\sum(x_1 - \\bar{x}_1)^2 = 21.2$.",
          "Sample B ($n_2 = 6$): $\\sum x_2 = 174 \\implies \\bar{x}_2 = 29.0$. Sum of squares of deviations $\\sum(x_2 - \\bar{x}_2)^2 = 108.0$.",
          "Pooled variance: $S^2 = \\frac{21.2 + 108.0}{5 + 6 - 2} = \\frac{129.2}{9} = 14.3556 \\implies S = 3.7889$.",
          "Standard error $SE = S \\sqrt{\\frac{1}{n_1} + \\frac{1}{n_2}} = 3.7889 \\sqrt{\\frac{1}{5} + \\frac{1}{6}} = 3.7889 \\times 0.60553 = 2.2942$.",
          "Test statistic $t = \\frac{\\bar{x}_1 - \\bar{x}_2}{SE} = \\frac{24.6 - 29.0}{2.2942} = \\frac{-4.4}{2.2942} \\approx -1.918$.",
          "Degrees of freedom: $df = 5 + 6 - 2 = 9$.",
          "Critical value: Two-tailed $t_{0.05, 9} = 2.262$.",
          "Decision: Since $|t_{cal}| = 1.918 < 2.262$, accept $H_0$. The samples can be regarded as coming from populations with the same mean."
        ],
        "finalAnswer": "Accept $H_0$ ($|t| = 1.918 < t_{0.05, 9} = 2.262$); no significant difference in mean nicotine content.",
        "tableValuesUsed": "$t$ at 5% with $df=9$ is 2.262",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["t-test", "difference-of-means", "small-sample", "repeated-question"]
    },
    {
      "id": "2025-dec-sem6-q23b",
      "paperId": "2025-dec-sem6-133554",
      "part": "B",
      "number": "23(b)",
      "marks": 10,
      "co": 3,
      "rbt": 3,
      "unit": 3,
      "topic": "Chi-Square Test for Independence of Attributes",
      "questionText": "An analysis was conducted on voting preferences based on gender. The results are:\nMale: Candidate X: 50, Candidate Y: 30, Candidate Z: 20\nFemale: Candidate X: 45, Candidate Y: 35, Candidate Z: 20\nTest if voting preference is independent of gender at the 0.05 significance level.",
      "tables": [
        {
          "title": "Voting Preferences by Gender",
          "headers": ["Gender", "Candidate X", "Candidate Y", "Candidate Z", "Total"],
          "rows": [
            ["Male", "50", "30", "20", "100"],
            ["Female", "45", "35", "20", "100"],
            ["Total", "95", "65", "40", "200"]
          ]
        }
      ],
      "answer": {
        "status": "complete",
        "steps": [
          "Hypotheses: $H_0$: Voting preference is independent of gender. $H_1$: Preference depends on gender.",
          "Row totals: $R_1 = 100, R_2 = 100$. Column totals: $C_1 = 95, C_2 = 65, C_3 = 40$. Total $N = 200$.",
          "Expected frequencies $E_{ij} = \\frac{R_i C_j}{N}$:",
          "Male: $E_{11} = 47.5, E_{12} = 32.5, E_{13} = 20.0$. Female: $E_{21} = 47.5, E_{22} = 32.5, E_{23} = 20.0$.",
          "Calculate $\\chi^2 = \\sum \\frac{(O - E)^2}{E}$:",
          "$\\chi^2 = \\frac{(50-47.5)^2}{47.5} + \\frac{(30-32.5)^2}{32.5} + \\frac{(20-20)^2}{20} + \\frac{(45-47.5)^2}{47.5} + \\frac{(35-32.5)^2}{32.5} + \\frac{(20-20)^2}{20}$.",
          "$\\chi^2 = 2 \\times [\\frac{6.25}{47.5} + \\frac{6.25}{32.5} + 0] = 2 \\times [0.13158 + 0.19231] = 2 \\times 0.32389 = 0.6478$.",
          "Degrees of freedom: $df = (2 - 1)(3 - 1) = 2$.",
          "Critical value: $\\chi^2_{0.05, 2} = 5.991$.",
          "Decision: Since $\\chi^2_{cal} = 0.648 < 5.991$, accept $H_0$. Voting preference is independent of gender."
        ],
        "finalAnswer": "Accept $H_0$ ($\\chi^2 = 0.648 < \\chi^2_{0.05, 2} = 5.991$); voting preference is independent of gender.",
        "tableValuesUsed": "$\\chi^2$ at 5% with $df=2$ is 5.991",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["chi-square", "independence-of-attributes", "repeated-question"]
    },
    {
      "id": "2025-dec-sem6-q24a",
      "paperId": "2025-dec-sem6-133554",
      "part": "B",
      "number": "24(a)",
      "marks": 10,
      "co": 4,
      "rbt": 3,
      "unit": 4,
      "topic": "One-Way Classification ANOVA",
      "questionText": "Suppose 3 drying formulas for curing a glue are studied and the following times observed.\nFormula A: 13, 10, 8, 11, 8\nFormula B: 13, 11, 14, 14\nFormula C: 4, 1, 3, 4, 2, 4\nPerform an analysis of variance to test at the 0.05 level of significance whether the differences among the sample means at the 3 formulas are significant.",
      "tables": [
        {
          "title": "Curing Times of 3 Formulas",
          "headers": ["Formula", "Obs 1", "Obs 2", "Obs 3", "Obs 4", "Obs 5", "Obs 6", "Total"],
          "rows": [
            ["Formula A", "13", "10", "8", "11", "8", "-", "50"],
            ["Formula B", "13", "11", "14", "14", "-", "-", "52"],
            ["Formula C", "4", "1", "3", "4", "2", "4", "18"],
            ["Total", "", "", "", "", "", "", "120"]
          ]
        }
      ],
      "answer": {
        "status": "complete",
        "steps": [
          "Group sizes: $n_1 = 5, n_2 = 4, n_3 = 6$. Total observations $N = 5 + 4 + 6 = 15$.",
          "Group totals: $T_A = 13+10+8+11+8 = 50$; $T_B = 13+11+14+14 = 52$; $T_C = 4+1+3+4+2+4 = 18$.",
          "Grand total $G = 50 + 52 + 18 = 120$.",
          "Correction factor $CF = \\frac{120^2}{15} = \\frac{14400}{15} = 960$.",
          "Sum of squares of all values $\\sum x^2 = (169+100+64+121+64) + (169+121+196+196) + (16+1+9+16+4+16) = 518 + 682 + 62 = 1262$.",
          "Total $TSS = 1262 - 960 = 302$.",
          "Between Formulas $SST = \\frac{50^2}{5} + \\frac{52^2}{4} + \\frac{18^2}{6} - 960 = 500 + 676 + 54 - 960 = 1230 - 960 = 270$.",
          "Error $SSE = TSS - SST = 302 - 270 = 32$.",
          "Degrees of freedom: Treatments $df_T = 3 - 1 = 2$, Error $df_E = 15 - 3 = 12$.",
          "Mean Squares: $MST = 270 / 2 = 135.0$, $MSE = 32 / 12 = 2.667$.",
          "Test statistic $F = \\frac{MST}{MSE} = \\frac{135.0}{2.667} = 50.625$.",
          "Critical value: $F_{0.05}(2, 12) = 3.89$.",
          "Decision: Since $F_{cal} = 50.625 > 3.89$, reject $H_0$. The difference among drying formula times is highly significant."
        ],
        "finalAnswer": "Reject $H_0$ ($F = 50.63 > F_{0.05}(2, 12) = 3.89$); drying times differ significantly.",
        "tableValuesUsed": "$F(2, 12)$ at 5% = 3.89",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["anova", "one-way", "unequal-sample-sizes", "f-test"]
    },
    {
      "id": "2025-dec-sem6-q24b",
      "paperId": "2025-dec-sem6-133554",
      "part": "B",
      "number": "24(b)",
      "marks": 10,
      "co": 4,
      "rbt": 3,
      "unit": 4,
      "topic": "Latin Square Design (LSD)",
      "questionText": "In a Latin square experiment given below, the yield is quintals per acre on the paddy crop carried out for testing the effect of five fertilizers A, B, C, D, E. Calculate TSS, SSR, SSC, SST and SSE.\nRow 1: A16, B10, C11, D9, E9\nRow 2: E10, C9, A14, B12, D11\nRow 3: B15, D8, E8, C10, A18\nRow 4: D12, E6, B13, A13, C12\nRow 5: C13, A11, D10, E7, B14",
      "tables": [
        {
          "title": "5x5 Latin Square Layout",
          "headers": ["Row / Col", "Col 1", "Col 2", "Col 3", "Col 4", "Col 5", "Total"],
          "rows": [
            ["Row 1", "A(16)", "B(10)", "C(11)", "D(9)", "E(9)", "55"],
            ["Row 2", "E(10)", "C(9)", "A(14)", "B(12)", "D(11)", "56"],
            ["Row 3", "B(15)", "D(8)", "E(8)", "C(10)", "A(18)", "59"],
            ["Row 4", "D(12)", "E(6)", "B(13)", "A(13)", "C(12)", "56"],
            ["Row 5", "C(13)", "A(11)", "D(10)", "E(7)", "B(14)", "55"],
            ["Total", "66", "44", "56", "51", "64", "281"]
          ]
        }
      ],
      "answer": {
        "status": "complete",
        "steps": [
          "Latin Square dimension $m = 5$, total observations $N = 25$.",
          "Row totals ($R_i$): $R_1 = 55, R_2 = 56, R_3 = 59, R_4 = 56, R_5 = 55$.",
          "Column totals ($C_j$): $C_1 = 66, C_2 = 44, C_3 = 56, C_4 = 51, C_5 = 64$.",
          "Treatment totals ($T_k$):",
          "A: $16 + 14 + 18 + 13 + 11 = 72$",
          "B: $10 + 12 + 15 + 13 + 14 = 64$",
          "C: $11 + 9 + 10 + 12 + 13 = 55$",
          "D: $9 + 11 + 8 + 12 + 10 = 50$",
          "E: $9 + 10 + 8 + 6 + 7 = 40$",
          "Grand total $G = 281$. Correction factor $CF = \\frac{281^2}{25} = \\frac{78961}{25} = 3158.44$.",
          "Sum of squares of all 25 values $\\sum x^2 = 256+100+121+81+81 + 100+81+196+144+121 + 225+64+64+100+324 + 144+36+169+169+144 + 169+121+100+49+196 = 3395$.",
          "Total $TSS = 3395 - 3158.44 = 236.56$.",
          "Rows $SSR = \\frac{55^2 + 56^2 + 59^2 + 56^2 + 55^2}{5} - 3158.44 = \\frac{3025 + 3136 + 3481 + 3136 + 3025}{5} - 3158.44 = \\frac{15803}{5} - 3158.44 = 3160.60 - 3158.44 = 2.16$.",
          "Columns $SSC = \\frac{66^2 + 44^2 + 56^2 + 51^2 + 64^2}{5} - 3158.44 = \\frac{4356 + 1936 + 3136 + 2601 + 4096}{5} - 3158.44 = \\frac{16125}{5} - 3158.44 = 3225.00 - 3158.44 = 66.56$.",
          "Treatments $SST = \\frac{72^2 + 64^2 + 55^2 + 50^2 + 40^2}{5} - 3158.44 = \\frac{5184 + 4096 + 3025 + 2500 + 1600}{5} - 3158.44 = \\frac{16405}{5} - 3158.44 = 3281.00 - 3158.44 = 122.56$.",
          "Error $SSE = TSS - SSR - SSC - SST = 236.56 - 2.16 - 66.56 - 122.56 = 45.28$."
        ],
        "finalAnswer": "$TSS = 236.56, SSR = 2.16, SSC = 66.56, SST = 122.56, SSE = 45.28$",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["latin-square", "lsd", "anova-sums"]
    },
    {
      "id": "2025-dec-sem6-q25a",
      "paperId": "2025-dec-sem6-133554",
      "part": "B",
      "number": "25(a)",
      "marks": 10,
      "co": 5,
      "rbt": 3,
      "unit": 5,
      "topic": "Control Charts for Variables: Mean Chart (X-bar chart)",
      "questionText": "Given 10 samples of size 4, with the following data:\nSample No: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, Total\nSample Mean: 85, 89, 84, 83, 88, 86, 87, 85, 88, 86, Total = 861\nSample Range: 5, 7, 4, 5, 6, 8, 5, 7, 4, 6, Total = 57\nConstruct control charts for the mean and range.",
      "tables": [
        {
          "title": "Sample Means and Ranges",
          "headers": ["Sample No.", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Total"],
          "rows": [
            ["Sample Mean", "85", "89", "84", "83", "88", "86", "87", "85", "88", "86", "861"],
            ["Sample Range", "5", "7", "4", "5", "6", "8", "5", "7", "4", "6", "57"]
          ]
        }
      ],
      "answer": {
        "status": "complete",
        "steps": [
          "Number of subgroups $k = 10$, subgroup size $n = 4$.",
          "Grand Mean $\\bar{\\bar{X}} = \\frac{\\sum \\bar{X}}{10} = \\frac{861}{10} = 86.1$.",
          "Average Range $\\bar{R} = \\frac{\\sum R}{10} = \\frac{57}{10} = 5.7$.",
          "Factors for $n = 4$: $A_2 = 0.729, D_3 = 0, D_4 = 2.282$.",
          "Mean Chart ($\\bar{X}$-chart):",
          "Center Line $CL = \\bar{\\bar{X}} = 86.1$.",
          "$UCL = \\bar{\\bar{X}} + A_2 \\bar{R} = 86.1 + (0.729 \\times 5.7) = 86.1 + 4.155 = 90.255 \\approx 90.26$.",
          "$LCL = \\bar{\\bar{X}} - A_2 \\bar{R} = 86.1 - 4.155 = 81.945 \\approx 81.95$.",
          "Range Chart ($R$-chart):",
          "Center Line $CL = \\bar{R} = 5.7$.",
          "$UCL = D_4 \\bar{R} = 2.282 \\times 5.7 = 13.007 \\approx 13.01$.",
          "$LCL = D_3 \\bar{R} = 0 \\times 5.7 = 0$.",
          "State of Control: All sample means (83 to 89) fall between 81.95 and 90.26, and all ranges (4 to 8) fall between 0 and 13.01. The process is in a state of statistical control."
        ],
        "finalAnswer": "$\\bar{X}$-Chart: $CL=86.1, UCL=90.26, LCL=81.95$. $R$-Chart: $CL=5.7, UCL=13.01, LCL=0$. Process is in control.",
        "tableValuesUsed": "For $n=4$: $A_2 = 0.729, D_3 = 0, D_4 = 2.282$",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["x-bar-chart", "r-chart", "control-limits", "sqc", "repeated-question"]
    },
    {
      "id": "2025-dec-sem6-q25b",
      "paperId": "2025-dec-sem6-133554",
      "part": "B",
      "number": "25(b)",
      "marks": 10,
      "co": 5,
      "rbt": 3,
      "unit": 5,
      "topic": "Control Charts for Attributes: Number of Defects Chart (c-chart)",
      "questionText": "The following data shows the number of defects found in a product during inspection. Each sample represents the inspection of one unit. Construct a c-chart to verify if the process is in control.\nSample No: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10\nNo. of Defects: 5, 4, 6, 5, 7, 8, 6, 5, 7, 4",
      "tables": [
        {
          "title": "Defects in 10 Inspected Units",
          "headers": ["Sample No.", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          "rows": [
            ["No. of Defects", "5", "4", "6", "5", "7", "8", "6", "5", "7", "4"]
          ]
        }
      ],
      "answer": {
        "status": "complete",
        "steps": [
          "Number of units inspected $k = 10$.",
          "Total number of defects $\\sum c = 5 + 4 + 6 + 5 + 7 + 8 + 6 + 5 + 7 + 4 = 57$.",
          "Average number of defects per unit $\\bar{c} = \\frac{\\sum c}{k} = \\frac{57}{10} = 5.7$.",
          "Center Line $CL = \\bar{c} = 5.7$.",
          "$UCL = \\bar{c} + 3\\sqrt{\\bar{c}} = 5.7 + 3\\sqrt{5.7} = 5.7 + 3(2.3875) = 5.7 + 7.162 = 12.862 \\approx 12.86$.",
          "$LCL = \\bar{c} - 3\\sqrt{\\bar{c}} = 5.7 - 7.162 = -1.462 \\implies LCL = 0$ (defect count cannot be negative).",
          "Evaluation: Observed defects are 5, 4, 6, 5, 7, 8, 6, 5, 7, 4.",
          "Every observation lies well inside $[LCL = 0, UCL = 12.86]$ (max is 8, min is 4).",
          "Conclusion: The process is in a state of statistical control."
        ],
        "finalAnswer": "$CL = 5.7, UCL = 12.86, LCL = 0$. The process is in statistical control.",
        "tableValuesUsed": "3-sigma Poisson limits",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["c-chart", "attributes", "poisson", "sqc"]
    },
    {
      "id": "2025-dec-sem6-q26",
      "paperId": "2025-dec-sem6-133554",
      "part": "C",
      "number": "26",
      "marks": 10,
      "co": 3,
      "rbt": 3,
      "unit": 3,
      "topic": "Student's t-Test for Difference of Two Means",
      "questionText": "A university wants to test whether there is a difference in the average GPA of students from two different academic programs. A sample of 20 students from Program A has an average GPA of 3.4 with a standard deviation of 0.5, and a sample of 22 students from Program B has an average GPA of 3.6 with a standard deviation of 0.6. At a 5% significance level, can you conclude that there is a significant difference in the average GPA between the two programs?",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Hypotheses: $H_0: \\mu_A = \\mu_B$ vs $H_1: \\mu_A \\neq \\mu_B$ (two-tailed test at $\\alpha = 0.05$).",
          "Given: $n_1 = 20, \\bar{x}_1 = 3.4, s_1 = 0.5$; $n_2 = 22, \\bar{x}_2 = 3.6, s_2 = 0.6$.",
          "Pooled variance: $S_p^2 = \\frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1 + n_2 - 2} = \\frac{19(0.25) + 21(0.36)}{20 + 22 - 2} = \\frac{4.75 + 7.56}{40} = \\frac{12.31}{40} = 0.30775$.",
          "Pooled standard deviation: $S_p = \\sqrt{0.30775} \\approx 0.55475$.",
          "Standard error: $SE = S_p \\sqrt{\\frac{1}{n_1} + \\frac{1}{n_2}} = 0.55475 \\sqrt{\\frac{1}{20} + \\frac{1}{22}} = 0.55475 \\times 0.30896 \\approx 0.1714$.",
          "Test statistic $t = \\frac{\\bar{x}_1 - \\bar{x}_2}{SE} = \\frac{3.4 - 3.6}{0.1714} = \\frac{-0.2}{0.1714} \\approx -1.167$.",
          "Degrees of freedom: $df = 20 + 22 - 2 = 40$.",
          "Critical value: Two-tailed $t_{0.05, 40} = 2.021$.",
          "Decision: Since $|t_{cal}| = 1.167 < 2.021$, accept $H_0$. There is no statistically significant difference in the average GPA between Program A and Program B at the 5% level."
        ],
        "finalAnswer": "Accept $H_0$ ($|t| = 1.167 < t_{0.05, 40} = 2.021$); no significant difference in average GPA.",
        "tableValuesUsed": "$t$ at 5% with $df=40$ is 2.021",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["t-test", "difference-of-means", "small-sample", "compulsory"]
    }
  ]
}

out3 = os.path.join(content_sem, "2025-dec-sem6-133554.json")
with open(out3, "w", encoding="utf-8") as f:
  json.dump(paper3, f, indent=2)

print(f"Generated 2025-dec-sem6-133554.json: {len(paper3['questions'])} questions.")

