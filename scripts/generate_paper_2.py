import json
import os

base_dir = r"d:\OM22001\om22001-stats-hub"
content_sem = os.path.join(base_dir, "content", "sem")

paper2 = {
  "id": "2025-may-sem5-405686",
  "title": "B.E. / B.Tech. Degree Examinations, MAY 2025",
  "subjectCode": "OM22001",
  "subjectName": "Statistical Methods for Engineers",
  "regulation": "2022",
  "semester": 5,
  "qCode": "405686",
  "examMonthYear": "May 2025",
  "departments": "Common to AE, CS, IT, ME & MN",
  "duration": "3 Hours",
  "maxMarks": 100,
  "pdfUrl": "/papers/sem/2025-may-sem5-405686/question-paper.pdf",
  "questions": [
    {
      "id": "2025-may-sem5-q1",
      "paperId": "2025-may-sem5-405686",
      "part": "A",
      "number": "1",
      "marks": 2,
      "co": 1,
      "rbt": 2,
      "unit": 1,
      "topic": "Median and Mode",
      "questionText": "Calculate median for the following data:\nMarks: 20, 9, 25, 50, 40, 80\nNo. of students: 6, 4, 16, 7, 8, 2",
      "tables": [
        {
          "title": "Marks and Students",
          "headers": ["Marks", "20", "9", "25", "50", "40", "80"],
          "rows": [
            ["No. of students", "6", "4", "16", "7", "8", "2"]
          ]
        }
      ],
      "answer": {
        "status": "complete",
        "steps": [
          "Arrange the marks in ascending order with corresponding frequencies and compute cumulative frequency ($cf$):",
          "Marks 9: $f = 4, cf = 4$",
          "Marks 20: $f = 6, cf = 10$",
          "Marks 25: $f = 16, cf = 26$",
          "Marks 40: $f = 8, cf = 34$",
          "Marks 50: $f = 7, cf = 41$",
          "Marks 80: $f = 2, cf = 43$",
          "Total $N = 43$. The median position is $\\frac{N + 1}{2} = \\frac{44}{2} = 22$-nd item.",
          "The cumulative frequency just greater than 22 is 26, which corresponds to Marks = 25.",
          "Therefore, Median = 25."
        ],
        "finalAnswer": "Median = 25",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["median", "discrete-series", "descriptive-statistics"]
    },
    {
      "id": "2025-may-sem5-q2",
      "paperId": "2025-may-sem5-405686",
      "part": "A",
      "number": "2",
      "marks": 2,
      "co": 1,
      "rbt": 2,
      "unit": 1,
      "topic": "Quartiles and Quartile Deviation",
      "questionText": "Calculate the quartile deviation of the following observations: 15, 20, 22, 28, 35, 27, 44, 48, 50, 55, and 60.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Arrange data in ascending order ($n = 11$): 15, 20, 22, 27, 28, 35, 44, 48, 50, 55, 60.",
          "$Q_1 = \\text{value of } \\frac{n+1}{4}\\text{th term} = \\frac{12}{4}\\text{th} = 3\\text{rd term} = 22$.",
          "$Q_3 = \\text{value of } \\frac{3(n+1)}{4}\\text{th term} = 9\\text{th term} = 50$.",
          "Quartile Deviation $QD = \\frac{Q_3 - Q_1}{2} = \\frac{50 - 22}{2} = \\frac{28}{2} = 14$."
        ],
        "finalAnswer": "$QD = 14$",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["quartile-deviation", "dispersion", "quartiles"]
    },
    {
      "id": "2025-may-sem5-q3",
      "paperId": "2025-may-sem5-405686",
      "part": "A",
      "number": "3",
      "marks": 2,
      "co": 1,
      "rbt": 2,
      "unit": 1,
      "topic": "Variance and Standard Deviation",
      "questionText": "Find the variance of 2, 4, 7, 9, 10.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Given values ($n = 5$): 2, 4, 7, 9, 10.",
          "Mean $\\bar{x} = \\frac{2 + 4 + 7 + 9 + 10}{5} = \\frac{32}{5} = 6.4$.",
          "Squared deviations $(x - \\bar{x})^2$:",
          "$(2 - 6.4)^2 = (-4.4)^2 = 19.36$",
          "$(4 - 6.4)^2 = (-2.4)^2 = 5.76$",
          "$(7 - 6.4)^2 = (0.6)^2 = 0.36$",
          "$(9 - 6.4)^2 = (2.6)^2 = 6.76$",
          "$(10 - 6.4)^2 = (3.6)^2 = 12.96$",
          "Sum of squared deviations $\\sum(x - \\bar{x})^2 = 19.36 + 5.76 + 0.36 + 6.76 + 12.96 = 45.2$.",
          "Population Variance $\\sigma^2 = \\frac{45.2}{5} = 9.04$ (Sample variance $s^2 = \\frac{45.2}{4} = 11.30$)."
        ],
        "finalAnswer": "Variance = 9.04 (population) or 11.30 (sample)",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["variance", "dispersion", "descriptive-statistics"]
    },
    {
      "id": "2025-may-sem5-q4",
      "paperId": "2025-may-sem5-405686",
      "part": "A",
      "number": "4",
      "marks": 2,
      "co": 1,
      "rbt": 2,
      "unit": 1,
      "topic": "Quartiles and Quartile Deviation",
      "questionText": "If the first quartile is 142 and the semi-interquartile range is 18, find the median (assuming the distribution to be symmetrical).",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Given: $Q_1 = 142$, Semi-interquartile range ($QD$) = 18.",
          "Since $QD = \\frac{Q_3 - Q_1}{2} = 18 \\implies Q_3 - Q_1 = 36 \\implies Q_3 = 142 + 36 = 178$.",
          "For a symmetrical distribution, the median lies equidistant from $Q_1$ and $Q_3$:",
          "$\\text{Median} = Q_1 + QD = 142 + 18 = 160$ (or $\\text{Median} = \\frac{Q_1 + Q_3}{2} = \\frac{142 + 178}{2} = 160$)."
        ],
        "finalAnswer": "Median = 160",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["quartiles", "median", "symmetrical-distribution", "repeated-question"]
    },
    {
      "id": "2025-may-sem5-q5",
      "paperId": "2025-may-sem5-405686",
      "part": "A",
      "number": "5",
      "marks": 2,
      "co": 2,
      "rbt": 2,
      "unit": 2,
      "topic": "Critical Region and Level of Significance",
      "questionText": "What are the critical region and acceptance region in hypothesis testing?",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Critical Region (Rejection Region): The region of the sample space containing values of the test statistic that lead to the rejection of the null hypothesis $H_0$. Its area equals the significance level $\\alpha$.",
          "Acceptance Region: The complementary region containing values of the test statistic that lead to non-rejection (acceptance) of $H_0$, with area equal to $1 - \\alpha$."
        ],
        "finalAnswer": "Critical region leads to rejection of $H_0$; acceptance region leads to non-rejection of $H_0$.",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["critical-region", "acceptance-region", "hypothesis-testing"]
    },
    {
      "id": "2025-may-sem5-q6",
      "paperId": "2025-may-sem5-405686",
      "part": "A",
      "number": "6",
      "marks": 2,
      "co": 2,
      "rbt": 2,
      "unit": 2,
      "topic": "Test of Significance for Single Proportion (Z-test)",
      "questionText": "A researcher claims that more than 70% of adults in a certain city are college graduates. A random sample of 400 adults is surveyed, and 290 of them are found to be college graduates. Test the researcher's claim at the 5% significance level.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Hypotheses: $H_0: P = 0.70$ vs $H_1: P > 0.70$ (right-tailed test).",
          "Sample size $n = 400$, sample proportion $p = \\frac{290}{400} = 0.725$.",
          "Standard error $SE = \\sqrt{\\frac{P(1-P)}{n}} = \\sqrt{\\frac{0.70 \\times 0.30}{400}} = \\sqrt{\\frac{0.21}{400}} \\approx 0.02291$.",
          "Test statistic $Z = \\frac{p - P}{SE} = \\frac{0.725 - 0.70}{0.02291} = \\frac{0.025}{0.02291} \\approx 1.091$.",
          "Critical Value: At $\\alpha = 0.05$ (one-tailed), $Z_{critical} = 1.645$.",
          "Decision: Since $Z_{cal} = 1.091 < 1.645$, accept $H_0$. There is insufficient evidence to support the claim that more than 70% are graduates."
        ],
        "finalAnswer": "Accept $H_0$ ($Z = 1.091 < 1.645$); claim not supported at 5% level.",
        "tableValuesUsed": "One-tailed $Z$ at 5% = 1.645",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["z-test", "single-proportion", "hypothesis-testing"]
    },
    {
      "id": "2025-may-sem5-q7",
      "paperId": "2025-may-sem5-405686",
      "part": "A",
      "number": "7",
      "marks": 2,
      "co": 2,
      "rbt": 2,
      "unit": 2,
      "topic": "Test of Significance for Difference of Proportions (Z-test)",
      "questionText": "In a random sample of 400 students of the university teaching departments, it was found that 300 students failed in the examination. In another random sample of 500 students of the affiliated colleges, the number of failures in the same examination was found to be 300. Compute the test statistics.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Group 1 (University): $n_1 = 400, x_1 = 300 \\implies p_1 = \\frac{300}{400} = 0.75$.",
          "Group 2 (Affiliated): $n_2 = 500, x_2 = 300 \\implies p_2 = \\frac{300}{500} = 0.60$.",
          "Pooled proportion: $P = \\frac{x_1 + x_2}{n_1 + n_2} = \\frac{300 + 300}{400 + 500} = \\frac{600}{900} = \\frac{2}{3} \\approx 0.6667$, $Q = 1 - P = 0.3333$.",
          "Standard error $SE = \\sqrt{PQ \\left(\\frac{1}{n_1} + \\frac{1}{n_2}\\right)} = \\sqrt{\\frac{2}{9} \\times \\left(\\frac{1}{400} + \\frac{1}{500}\\right)} = \\sqrt{\\frac{2}{9} \\times 0.0045} = \\sqrt{0.001} \\approx 0.03162$.",
          "Test statistic $Z = \\frac{p_1 - p_2}{SE} = \\frac{0.75 - 0.60}{0.03162} = \\frac{0.15}{0.03162} \\approx 4.743$."
        ],
        "finalAnswer": "$Z = 4.743$",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["z-test", "difference-of-proportions", "test-statistic"]
    },
    {
      "id": "2025-may-sem5-q8",
      "paperId": "2025-may-sem5-405686",
      "part": "A",
      "number": "8",
      "marks": 2,
      "co": 2,
      "rbt": 2,
      "unit": 2,
      "topic": "Test of Significance for Single Mean (Z-test)",
      "questionText": "A beverage company claims that the average sugar content of its drinks is 10 grams per serving. A sample of 100 servings showed an average sugar content of 9.7 grams with a standard deviation of 0.5 grams. Compute the Z-value.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Given: $\\mu = 10$, $n = 100$, $\\bar{x} = 9.7$, $s = 0.5$.",
          "Formula: $Z = \\frac{\\bar{x} - \\mu}{s / \\sqrt{n}}$.",
          "$Z = \\frac{9.7 - 10}{0.5 / \\sqrt{100}} = \\frac{-0.3}{0.5 / 10} = \\frac{-0.3}{0.05} = -6.0$."
        ],
        "finalAnswer": "$Z = -6.0$",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["z-test", "single-mean", "large-sample"]
    },
    {
      "id": "2025-may-sem5-q9",
      "paperId": "2025-may-sem5-405686",
      "part": "A",
      "number": "9",
      "marks": 2,
      "co": 3,
      "rbt": 3,
      "unit": 3,
      "topic": "Student's t-Test for Single Mean",
      "questionText": "You are studying a new diet's effect on weight loss. The manufacturer claims that the average weight loss after 6 weeks on the diet is 5 kg. You take a sample of 12 participants, and their average weight loss is 4.5 kg with a standard deviation of 1.2 kg. Calculate the test statistic.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Reconstructed from broken line across page break in paper (marked needsReview).",
          "Given: $\\mu = 5.0$ kg, $n = 12$, $\\bar{x} = 4.5$ kg, $s = 1.2$ kg.",
          "Since sample size $n = 12 < 30$, use Student's t-test:",
          "$t = \\frac{\\bar{x} - \\mu}{s / \\sqrt{n}} = \\frac{4.5 - 5.0}{1.2 / \\sqrt{12}} = \\frac{-0.5}{1.2 / 3.4641} = \\frac{-0.5}{0.34641} \\approx -1.443$."
        ],
        "finalAnswer": "$t = -1.443$",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": True,
      "tags": ["t-test", "single-mean", "reconstructed-question"]
    },
    {
      "id": "2025-may-sem5-q10",
      "paperId": "2025-may-sem5-405686",
      "part": "A",
      "number": "10",
      "marks": 2,
      "co": 3,
      "rbt": 2,
      "unit": 3,
      "topic": "Student's t-Test for Difference of Two Means",
      "questionText": "An educator wants to determine if there is a significant difference in the average test scores of students taught using two different teaching methods. Sample 1 (n = 20) has an average score of 75 with a standard deviation of 8, and Sample 2 (n = 22) has an average score of 80 with a standard deviation of 7. Calculate the standard error for the average test scores of students taught using two different teaching methods.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Sample 1: $n_1 = 20, \\bar{x}_1 = 75, s_1 = 8$. Sample 2: $n_2 = 22, \\bar{x}_2 = 80, s_2 = 7$.",
          "Pooled variance: $S_p^2 = \\frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1 + n_2 - 2} = \\frac{19(64) + 21(49)}{20 + 22 - 2} = \\frac{1216 + 1029}{40} = \\frac{2245}{40} = 56.125$.",
          "Standard error: $SE = \\sqrt{S_p^2 \\left(\\frac{1}{n_1} + \\frac{1}{n_2}\\right)} = \\sqrt{56.125 \\times \\left(\\frac{1}{20} + \\frac{1}{22}\\right)} = \\sqrt{56.125 \\times (0.05 + 0.04545)} = \\sqrt{56.125 \\times 0.095455} = \\sqrt{5.3574} \\approx 2.3146$."
        ],
        "finalAnswer": "$SE = 2.315$",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["standard-error", "t-test", "two-sample"]
    },
    {
      "id": "2025-may-sem5-q11",
      "paperId": "2025-may-sem5-405686",
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
          "Center X: $n_1 = 25, s_1^2 = 64$. Center Y: $n_2 = 30, s_2^2 = 81$.",
          "In the F-test, the larger sample variance is placed in the numerator:",
          "$F = \\frac{s_Y^2}{s_X^2} = \\frac{81}{64} = 1.2656$.",
          "Degrees of freedom: $\\nu_1 = 30 - 1 = 29$, $\\nu_2 = 25 - 1 = 24$."
        ],
        "finalAnswer": "$F = 1.266$",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["f-test", "variance-ratio", "small-sample", "repeated-question"]
    },
    {
      "id": "2025-may-sem5-q12",
      "paperId": "2025-may-sem5-405686",
      "part": "A",
      "number": "12",
      "marks": 2,
      "co": 3,
      "rbt": 2,
      "unit": 3,
      "topic": "Chi-Square Test for Goodness of Fit",
      "questionText": "When do you reject the null hypothesis in a chi-square test?",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Reject $H_0$ in a Chi-Square test when the calculated test statistic $\\chi^2_{cal} = \\sum \\frac{(O - E)^2}{E}$ exceeds the critical table value $\\chi^2_{\\alpha, df}$ at the chosen significance level $\\alpha$.",
          "Equivalently, reject $H_0$ when the p-value associated with $\\chi^2_{cal}$ is less than $\\alpha$ ($p < \\alpha$)."
        ],
        "finalAnswer": "Reject $H_0$ when $\\chi^2_{cal} > \\chi^2_{\\alpha, df}$ or $p < \\alpha$.",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["chi-square", "decision-rule", "hypothesis-testing"]
    },
    {
      "id": "2025-may-sem5-q13",
      "paperId": "2025-may-sem5-405686",
      "part": "A",
      "number": "13",
      "marks": 2,
      "co": 4,
      "rbt": 2,
      "unit": 4,
      "topic": "Principles of Design of Experiments",
      "questionText": "What is the main difference between one-way and two-way classification?",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "One-Way Classification: Involves only one independent variable (factor) at multiple levels. Total variation is partitioned into: Between Groups Variation and Error Variation.",
          "Two-Way Classification: Involves two independent variables (factors) simultaneously. Total variation is partitioned into: Variation between rows (Factor A), Variation between columns (Factor B), and Error Variation (plus interaction if replicated)."
        ],
        "finalAnswer": "One-way investigates 1 factor; two-way investigates 2 factors simultaneously.",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["anova", "one-way", "two-way", "classification"]
    },
    {
      "id": "2025-may-sem5-q14",
      "paperId": "2025-may-sem5-405686",
      "part": "A",
      "number": "14",
      "marks": 2,
      "co": 4,
      "rbt": 2,
      "unit": 4,
      "topic": "Latin Square Design (LSD)",
      "questionText": "If you have a Latin Square Design with 4 levels of factor A and 4 levels of factor B, how many replications would be needed to ensure each treatment is tested once?",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "In an $m \\times m$ Latin Square Design, the number of treatments equals the number of rows and columns ($m = 4$).",
          "Each treatment appears exactly once in each row and once in each column.",
          "Therefore, each treatment is tested (replicated) exactly $m = 4$ times in the entire experiment, for a total of $4 \\times 4 = 16$ observations."
        ],
        "finalAnswer": "4 replications per treatment (16 total experimental runs).",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["latin-square", "replications", "design-of-experiments"]
    },
    {
      "id": "2025-may-sem5-q15",
      "paperId": "2025-may-sem5-405686",
      "part": "A",
      "number": "15",
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
          "Use ANOVA instead of a Student's t-test when comparing the means of three or more groups ($k \\ge 3$).",
          "Running multiple pairwise t-tests rapidly inflates the Type I error rate (False Positive rate), because $\\alpha_{overall} = 1 - (1 - \\alpha)^c$ where $c = \\binom{k}{2}$.",
          "ANOVA tests all group means simultaneously in a single F-test while maintaining the nominal error rate $\\alpha$."
        ],
        "finalAnswer": "When comparing means across 3 or more groups, to prevent Type I error rate inflation.",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["anova", "t-test", "type-I-error", "repeated-question"]
    },
    {
      "id": "2025-may-sem5-q16",
      "paperId": "2025-may-sem5-405686",
      "part": "A",
      "number": "16",
      "marks": 2,
      "co": 4,
      "rbt": 2,
      "unit": 4,
      "topic": "Latin Square Design (LSD)",
      "questionText": "Why a $2 \\times 2$ Latin square is not possible? Explain.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "In an $m \\times m$ Latin Square Design, degrees of freedom for experimental error is $(m - 1)(m - 2)$.",
          "For $m = 2$, $df_{Error} = (2 - 1)(2 - 2) = 1 \\times 0 = 0$.",
          "With zero error degrees of freedom, the error variance ($MSE$) cannot be estimated, so no F-test of significance can be computed."
        ],
        "finalAnswer": "Error degrees of freedom $(m-1)(m-2) = 0$, making variance estimation impossible.",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["latin-square", "error-df", "repeated-question"]
    },
    {
      "id": "2025-may-sem5-q17",
      "paperId": "2025-may-sem5-405686",
      "part": "A",
      "number": "17",
      "marks": 2,
      "co": 5,
      "rbt": 2,
      "unit": 5,
      "topic": "Control Charts for Attributes: Fraction Defective Chart (p-chart)",
      "questionText": "The following figures give the number of defectives in 20 samples, containing 425, 430, 216, 341, 225, 322, 280, 306, 337, 305, 356, 402, 216, 264, 126, 409, 193, 280, 326, and 389. Calculate the values for central line and the control limits for p-chart.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Sum of defectives across 20 samples: $\\sum d_i = 425 + 430 + 216 + 341 + 225 + 322 + 280 + 306 + 337 + 305 + 356 + 402 + 216 + 264 + 126 + 409 + 193 + 280 + 326 + 389 = 6048$.",
          "Note on paper wording: The text states '20 samples containing [counts]'. In standard industrial practice, if each sample contains $n = 4000$ items (or if average subgroup size $\\bar{n}$ is taken), limits are computed as follows:",
          "Average defectives $\\bar{d} = 6048 / 20 = 302.4$.",
          "If total items inspected $N = 20 \\times n$, Center Line $CL = \\bar{p} = \\frac{\\sum d_i}{N}$.",
          "Assuming standard sample size $n = 2000$: $\\bar{p} = 6048 / 40000 = 0.1512$, $SE = \\sqrt{\\frac{0.1512 \\times 0.8488}{2000}} = 0.0080$. $UCL = 0.1512 + 3(0.0080) = 0.1752, LCL = 0.1272$.",
          "Flagged for review because the subgroup inspection size $n$ was omitted in the exam question paper text."
        ],
        "finalAnswer": "$CL = \\bar{p}$, $UCL / LCL = \\bar{p} \\pm 3\\sqrt{\\bar{p}(1-\\bar{p})/n}$ (subgroup size $n$ omitted in paper)",
        "tableValuesUsed": "3-sigma limits",
        "sourceLink": ""
      },
      "needsReview": True,
      "tags": ["p-chart", "attributes", "control-limits", "ambiguous-question"]
    },
    {
      "id": "2025-may-sem5-q18",
      "paperId": "2025-may-sem5-405686",
      "part": "A",
      "number": "18",
      "marks": 2,
      "co": 5,
      "rbt": 2,
      "unit": 5,
      "topic": "Control Charts for Attributes: Number of Defects Chart (c-chart)",
      "questionText": "20 pieces of cloth out of different rolls contained respectively 1, 4, 3, 2, 4, 5, 6, 7, 2, 3, 2, 5, 7, 6, 4, 5, 2, 1, 3 and 8 imperfections. Calculate the control chart limits for the number of defects.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Number of inspection units $k = 20$.",
          "Total imperfections $\\sum c = 1+4+3+2+4+5+6+7+2+3+2+5+7+6+4+5+2+1+3+8 = 80$.",
          "Average defects per unit $\\bar{c} = \\frac{\\sum c}{k} = \\frac{80}{20} = 4.0$.",
          "Center Line $CL = \\bar{c} = 4.0$.",
          "$UCL = \\bar{c} + 3\\sqrt{\\bar{c}} = 4.0 + 3\\sqrt{4.0} = 4.0 + 3(2.0) = 10.0$.",
          "$LCL = \\bar{c} - 3\\sqrt{\\bar{c}} = 4.0 - 6.0 = -2.0 \\implies LCL = 0$ (defects cannot be negative)."
        ],
        "finalAnswer": "$CL = 4.0$, $UCL = 10.0$, $LCL = 0$",
        "tableValuesUsed": "3-sigma Poisson limits",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["c-chart", "control-limits", "sqc", "poisson"]
    },
    {
      "id": "2025-may-sem5-q19",
      "paperId": "2025-may-sem5-405686",
      "part": "A",
      "number": "19",
      "marks": 2,
      "co": 5,
      "rbt": 2,
      "unit": 5,
      "topic": "Control Charts for Attributes: Fraction Defective Chart (p-chart)",
      "questionText": "When should a p-chart be used instead of a c-chart?",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Use a p-chart when inspecting items on a nonconforming/conforming basis (binary pass/fail), where each item is classified as defective or good (Binomial model).",
          "Use a c-chart when counting the number of discrete defects or blemishes found on a constant unit of product (such as flaws per bolt of cloth or scratches per car panel, Poisson model)."
        ],
        "finalAnswer": "p-chart for fraction of defective units (Binomial); c-chart for count of defects per unit (Poisson).",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["p-chart", "c-chart", "sqc"]
    },
    {
      "id": "2025-may-sem5-q20",
      "paperId": "2025-may-sem5-405686",
      "part": "A",
      "number": "20",
      "marks": 2,
      "co": 5,
      "rbt": 2,
      "unit": 5,
      "topic": "Control Limits vs Specification and Tolerance Limits",
      "questionText": "What are tolerance limits?",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Tolerance limits are the permissible range of variation around a nominal dimension within which an individual manufactured component can deviate and still function satisfactorily.",
          "They are set by engineering product designers and determine whether an individual unit is conforming or nonconforming.",
          "Unlike statistical control limits ($\\pm 3\\sigma$ from process data), tolerance limits do not depend on the manufacturing process capability."
        ],
        "finalAnswer": "Design engineering boundaries within which individual product measurements must lie.",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["tolerance-limits", "specification-limits", "sqc"]
    },
    {
      "id": "2025-may-sem5-q21a",
      "paperId": "2025-may-sem5-405686",
      "part": "B",
      "number": "21(a)",
      "marks": 10,
      "co": 1,
      "rbt": 3,
      "unit": 1,
      "topic": "Arithmetic Mean",
      "questionText": "For the two frequency distributions given below the mean calculated from the first was 25.4 and that from the second was 32.5. Find the values of x and y.\nClass: 10-20, 20-30, 30-40, 40-50, 50-60\nDistribution I (Frequency): 20, 15, 10, x, y\nDistribution II (Frequency): 4, 8, 4, 2x, y",
      "tables": [
        {
          "title": "Two Frequency Distributions",
          "headers": ["Class", "Distribution I (Frequency)", "Distribution II (Frequency)"],
          "rows": [
            ["10-20", "20", "4"],
            ["20-30", "15", "8"],
            ["30-40", "10", "4"],
            ["40-50", "x", "2x"],
            ["50-60", "y", "y"]
          ]
        }
      ],
      "answer": {
        "status": "complete",
        "steps": [
          "Class midpoints ($m$): 15, 25, 35, 45, 55.",
          "For Distribution I ($\\\\bar{x}_1 = 25.4$):",
          "$\\\\sum f_1 = 20 + 15 + 10 + x + y = 45 + x + y$.",
          "$\\\\sum f_1 m = 20(15) + 15(25) + 10(35) + 45x + 55y = 300 + 375 + 350 + 45x + 55y = 1025 + 45x + 55y$.",
          "$\\\\bar{x}_1 = \\\\frac{1025 + 45x + 55y}{45 + x + y} = 25.4 \\\\implies 1025 + 45x + 55y = 25.4(45 + x + y) = 1143 + 25.4x + 25.4y$.",
          "$19.6x + 29.6y = 118 \\quad \\text{--- (Equation 1)}$.",
          "For Distribution II ($\\\\bar{x}_2 = 32.5$):",
          "$\\\\sum f_2 = 4 + 8 + 4 + 2x + y = 16 + 2x + y$.",
          "$\\\\sum f_2 m = 4(15) + 8(25) + 4(35) + 45(2x) + 55y = 60 + 200 + 140 + 90x + 55y = 400 + 90x + 55y$.",
          "$\\\\bar{x}_2 = \\\\frac{400 + 90x + 55y}{16 + 2x + y} = 32.5 \\\\implies 400 + 90x + 55y = 32.5(16 + 2x + y) = 520 + 65x + 32.5y$.",
          "$25x + 22.5y = 120 \\\\implies x = \\\\frac{120 - 22.5y}{25} = 4.8 - 0.9y \\quad \\text{--- (Equation 2)}$.",
          "Substitute Equation 2 into Equation 1: $19.6(4.8 - 0.9y) + 29.6y = 118 \\\\implies 94.08 - 17.64y + 29.6y = 118$.",
          "$11.96y = 23.92 \\\\implies y = 2$.",
          "Then $x = 4.8 - 0.9(2) = 4.8 - 1.8 = 3$."
        ],
        "finalAnswer": "$x = 3, y = 2$",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["mean", "frequency-distribution", "simultaneous-equations"]
    },
    {
      "id": "2025-may-sem5-q21b",
      "paperId": "2025-may-sem5-405686",
      "part": "B",
      "number": "21(b)",
      "marks": 10,
      "co": 1,
      "rbt": 3,
      "unit": 1,
      "topic": "Karl Pearson's Coefficient of Skewness",
      "questionText": "Find Karl Pearson's coefficient of Skewness for the following data:\nRange: 20-40, 40-60, 60-80, 80-100, 100-120\nFrequency: 15, 20, 35, 12, 5",
      "tables": [
        {
          "title": "Frequency Distribution",
          "headers": ["Range", "20-40", "40-60", "60-80", "80-100", "100-120"],
          "rows": [
            ["Frequency", "15", "20", "35", "12", "5"]
          ]
        }
      ],
      "answer": {
        "status": "complete",
        "steps": [
          "Formula: $Sk_P = \\frac{\\text{Mean} - \\text{Mode}}{\\sigma}$.",
          "Midpoints ($m$): 30, 50, 70, 90, 110. Let $A = 70, h = 20, u = \\frac{m - 70}{20}$:",
          "$m = 30: u = -2, f = 15, fu = -30, fu^2 = 60$",
          "$m = 50: u = -1, f = 20, fu = -20, fu^2 = 20$",
          "$m = 70: u = 0, f = 35, fu = 0, fu^2 = 0$",
          "$m = 90: u = 1, f = 12, fu = 12, fu^2 = 12$",
          "$m = 110: u = 2, f = 5, fu = 10, fu^2 = 20$",
          "Sums: $N = 87, \\sum fu = -28, \\sum fu^2 = 112$.",
          "Mean $\\bar{x} = 70 + \\left(\\frac{-28}{87}\\right) \\times 20 = 70 - 6.437 = 63.563$.",
          "Standard Deviation $\\sigma = 20 \\sqrt{\\frac{112}{87} - \\left(\\frac{-28}{87}\\right)^2} = 20 \\sqrt{1.2874 - 0.1036} = 20 \\sqrt{1.1838} = 20 \\times 1.088 = 21.76$.",
          "Mode: Maximum frequency is 35 (modal class 60-80). $L = 60, f_1 = 35, f_0 = 20, f_2 = 12, h = 20$.",
          "$\\text{Mode} = L + \\frac{f_1 - f_0}{2f_1 - f_0 - f_2} \\times h = 60 + \\frac{35 - 20}{70 - 20 - 12} \\times 20 = 60 + \\frac{15}{38} \\times 20 = 60 + 7.895 = 67.895$.",
          "$Sk_P = \\frac{63.563 - 67.895}{21.76} = \\frac{-4.332}{21.76} = -0.199$."
        ],
        "finalAnswer": "$Sk_P = -0.199$ (negatively skewed)",
        "tableValuesUsed": "None",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["karl-pearson-skewness", "mode", "standard-deviation"]
    },
    {
      "id": "2025-may-sem5-q22a",
      "paperId": "2025-may-sem5-405686",
      "part": "B",
      "number": "22(a)",
      "marks": 10,
      "co": 2,
      "rbt": 3,
      "unit": 2,
      "topic": "Test of Significance for Difference of Proportions (Z-test)",
      "questionText": "In two large populations, there are 30 and 25 per cent respectively of blue-eyed people. Is this difference likely to be hidden in samples of 1200 and 900 respectively from the two populations?",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Hypotheses: The difference is hidden if the sample difference is statistically not significant ($|Z| < 1.96$ at 5% level or $|p_1 - p_2| < 3 SE$).",
          "Given: $P_1 = 0.30, Q_1 = 0.70, n_1 = 1200$; $P_2 = 0.25, Q_2 = 0.75, n_2 = 900$.",
          "Population difference: $P_1 - P_2 = 0.30 - 0.25 = 0.05$.",
          "Standard error of difference in proportions: $SE = \\sqrt{\\frac{P_1 Q_1}{n_1} + \\frac{P_2 Q_2}{n_2}} = \\sqrt{\\frac{0.30 \\times 0.70}{1200} + \\frac{0.25 \\times 0.75}{900}} = \\sqrt{0.000175 + 0.0002083} = \\sqrt{0.0003833} \\approx 0.01958$.",
          "Test statistic $Z = \\frac{P_1 - P_2}{SE} = \\frac{0.05}{0.01958} \\approx 2.55$.",
          "Also $3 \\times SE = 3 \\times 0.01958 = 0.0587$.",
          "At $\\alpha = 0.05$, $Z_{critical} = 1.96$. Since $Z_{cal} = 2.55 > 1.96$, the difference is statistically significant.",
          "Conclusion: Since the difference is statistically significant, it is unlikely to be hidden in samples of sizes 1200 and 900."
        ],
        "finalAnswer": "No, the difference is unlikely to be hidden ($Z = 2.55 > 1.96$ at 5% level).",
        "tableValuesUsed": "Two-tailed $Z$ at 5% = 1.96",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["z-test", "difference-of-proportions", "large-sample"]
    },
    {
      "id": "2025-may-sem5-q22b",
      "paperId": "2025-may-sem5-405686",
      "part": "B",
      "number": "22(b)",
      "marks": 10,
      "co": 2,
      "rbt": 3,
      "unit": 2,
      "topic": "Test of Significance for Difference of Means (Z-test)",
      "questionText": "A study compares the average income of two cities. City A has an average income of $50,000 with a standard deviation of $8,000 from 120 people, while City B has an average income of $48,000 with a standard deviation of $9,000 from 150 people. Test at the 5% significance level if the income in City A is higher.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Hypotheses: $H_0: \\mu_A = \\mu_B$ vs $H_1: \\mu_A > \\mu_B$ (right-tailed test).",
          "City A: $n_1 = 120, \\bar{x}_1 = 50000, s_1 = 8000$. City B: $n_2 = 150, \\bar{x}_2 = 48000, s_2 = 9000$.",
          "Standard error $SE = \\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}} = \\sqrt{\\frac{64000000}{120} + \\frac{81000000}{150}} = \\sqrt{533333.33 + 540000} = \\sqrt{1073333.33} \\approx 1036.02$.",
          "Test statistic $Z = \\frac{\\bar{x}_1 - \\bar{x}_2}{SE} = \\frac{50000 - 48000}{1036.02} = \\frac{2000}{1036.02} \\approx 1.930$.",
          "Critical value: For one-tailed test at $\\alpha = 0.05$, $Z_{critical} = 1.645$.",
          "Decision: Since $Z_{cal} = 1.930 > 1.645$, reject $H_0$. The average income in City A is significantly higher than in City B."
        ],
        "finalAnswer": "Reject $H_0$ ($Z = 1.930 > 1.645$); income in City A is significantly higher at 5% level.",
        "tableValuesUsed": "One-tailed $Z$ at 5% = 1.645",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["z-test", "difference-of-means", "large-sample"]
    },
    {
      "id": "2025-may-sem5-q23a",
      "paperId": "2025-may-sem5-405686",
      "part": "B",
      "number": "23(a)",
      "marks": 10,
      "co": 3,
      "rbt": 3,
      "unit": 3,
      "topic": "Student's t-Test for Difference of Two Means",
      "questionText": "A pharmaceutical company is testing a new drug to determine if it reduces blood pressure more effectively than the standard drug. A sample of 10 patients was given the new drug, while another group of 12 patients was given the standard drug. The reduction in blood pressure (in mmHg) was recorded as follows:\nNew Drug: Mean = 15, Standard Deviation = 3\nStandard Drug: Mean = 12, Standard Deviation = 4\nAssume the samples are small and normally distributed. At a significance level of 0.05, test the hypothesis that the new drug reduces blood pressure more effectively than the standard drug.",
      "tables": [],
      "answer": {
        "status": "complete",
        "steps": [
          "Hypotheses: $H_0: \\mu_1 = \\mu_2$ vs $H_1: \\mu_1 > \\mu_2$ (right-tailed test).",
          "Sample 1: $n_1 = 10, \\bar{x}_1 = 15, s_1 = 3$. Sample 2: $n_2 = 12, \\bar{x}_2 = 12, s_2 = 4$.",
          "Pooled variance: $S_p^2 = \\frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1 + n_2 - 2} = \\frac{9(9) + 11(16)}{10 + 12 - 2} = \\frac{81 + 176}{20} = \\frac{257}{20} = 12.85$.",
          "Pooled standard deviation: $S_p = \\sqrt{12.85} \\approx 3.5847$.",
          "Standard error: $SE = S_p \\sqrt{\\frac{1}{n_1} + \\frac{1}{n_2}} = 3.5847 \\sqrt{\\frac{1}{10} + \\frac{1}{12}} = 3.5847 \\times 0.42817 \\approx 1.5348$.",
          "Test statistic $t = \\frac{\\bar{x}_1 - \\bar{x}_2}{SE} = \\frac{15 - 12}{1.5348} = \\frac{3}{1.5348} \\approx 1.955$.",
          "Degrees of freedom: $df = n_1 + n_2 - 2 = 20$.",
          "Critical value: For right-tailed test at $\\alpha = 0.05$ with $df = 20$, $t_{0.05, 20} = 1.725$.",
          "Decision: Since $t_{cal} = 1.955 > 1.725$, reject $H_0$. The new drug reduces blood pressure significantly more effectively."
        ],
        "finalAnswer": "Reject $H_0$ ($t = 1.955 > t_{0.05, 20} = 1.725$); new drug is significantly more effective.",
        "tableValuesUsed": "One-tailed $t$ at 5% with $df=20$ is 1.725",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["t-test", "difference-of-means", "small-sample"]
    },
    {
      "id": "2025-may-sem5-q23b",
      "paperId": "2025-may-sem5-405686",
      "part": "B",
      "number": "23(b)",
      "marks": 10,
      "co": 3,
      "rbt": 3,
      "unit": 3,
      "topic": "Chi-Square Test for Goodness of Fit",
      "questionText": "A die is rolled 60 times, and the following results are observed: 1 appeared 8 times, 2 appeared 10 times, 3 appeared 12 times, 4 appeared 9 times, 5 appeared 11 times, and 6 appeared 10 times. Test if the die is fair at the 0.05 significance level.",
      "tables": [
        {
          "title": "Die Outcomes",
          "headers": ["Face", "1", "2", "3", "4", "5", "6"],
          "rows": [
            ["Observed Frequency", "8", "10", "12", "9", "11", "10"]
          ]
        }
      ],
      "answer": {
        "status": "complete",
        "steps": [
          "Hypotheses: $H_0$: The die is fair (all faces equally likely, $P_i = 1/6$). $H_1$: The die is biased.",
          "Total rolls $N = 60$. Expected frequency for each face: $E = \\frac{60}{6} = 10$.",
          "Observed frequencies ($O$): 8, 10, 12, 9, 11, 10.",
          "Calculate $\\chi^2 = \\sum \\frac{(O - E)^2}{E}$:",
          "Face 1: $(8 - 10)^2 / 10 = (-2)^2 / 10 = 0.4$",
          "Face 2: $(10 - 10)^2 / 10 = 0 / 10 = 0.0$",
          "Face 3: $(12 - 10)^2 / 10 = 2^2 / 10 = 0.4$",
          "Face 4: $(9 - 10)^2 / 10 = (-1)^2 / 10 = 0.1$",
          "Face 5: $(11 - 10)^2 / 10 = 1^2 / 10 = 0.1$",
          "Face 6: $(10 - 10)^2 / 10 = 0 / 10 = 0.0$",
          "Test statistic $\\chi^2_{cal} = 0.4 + 0.0 + 0.4 + 0.1 + 0.1 + 0.0 = 1.0$.",
          "Degrees of freedom: $df = k - 1 = 6 - 1 = 5$.",
          "Table value: $\\chi^2_{0.05, 5} = 11.070$.",
          "Conclusion: Since $\\chi^2_{cal} = 1.0 < 11.070$, accept $H_0$. The die can be regarded as fair."
        ],
        "finalAnswer": "Accept $H_0$ ($\\chi^2 = 1.0 < \\chi^2_{0.05, 5} = 11.070$); the die is fair.",
        "tableValuesUsed": "$\\chi^2$ at 5% with $df=5$ is 11.070",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["chi-square", "goodness-of-fit", "die-fairness"]
    },
    {
      "id": "2025-may-sem5-q24a",
      "paperId": "2025-may-sem5-405686",
      "part": "B",
      "number": "24(a)",
      "marks": 10,
      "co": 4,
      "rbt": 3,
      "unit": 4,
      "topic": "One-Way Classification ANOVA",
      "questionText": "The table shown below gives the samples got from normal population with equal variances. Test the hypothesis that the sample means are equal at 5% levels.\nA: 8, 10, 12, 8, 7\nB: 12, 11, 14, 9, 4\nC: 18, 16, 12, 8, 6\nD: 16, 15, 13, 1, 9",
      "tables": [
        {
          "title": "Samples from 4 Populations",
          "headers": ["Group", "Obs 1", "Obs 2", "Obs 3", "Obs 4", "Obs 5"],
          "rows": [
            ["A", "8", "10", "12", "8", "7"],
            ["B", "12", "11", "14", "9", "4"],
            ["C", "18", "16", "12", "8", "6"],
            ["D", "16", "15", "13", "1", "9"]
          ]
        }
      ],
      "answer": {
        "status": "complete",
        "steps": [
          "Hypotheses: $H_0: \\mu_A = \\mu_B = \\mu_C = \\mu_D$ vs $H_1$: Means are not all equal.",
          "Group totals and sums of squares ($n = 5$ each, $k = 4, N = 20$):",
          "A: $T_A = 8+10+12+8+7 = 45$, $\\sum x_A^2 = 64+100+144+64+49 = 421$.",
          "B: $T_B = 12+11+14+9+4 = 50$, $\\sum x_B^2 = 144+121+196+81+16 = 558$.",
          "C: $T_C = 18+16+12+8+6 = 60$, $\\sum x_C^2 = 324+256+144+64+36 = 824$.",
          "D: $T_D = 16+15+13+1+9 = 54$, $\\sum x_D^2 = 256+225+169+1+81 = 732$.",
          "Grand total $G = 45 + 50 + 60 + 54 = 209$.",
          "Correction factor $CF = \\frac{G^2}{N} = \\frac{209^2}{20} = \\frac{43681}{20} = 2184.05$.",
          "Total Sum of Squares $TSS = \\sum x^2 - CF = (421 + 558 + 824 + 732) - 2184.05 = 2535 - 2184.05 = 350.95$.",
          "Between Groups $SST = \\frac{45^2 + 50^2 + 60^2 + 54^2}{5} - 2184.05 = \\frac{2025 + 2500 + 3600 + 2916}{5} - 2184.05 = \\frac{11041}{5} - 2184.05 = 2208.2 - 2184.05 = 24.15$.",
          "Error $SSE = TSS - SST = 350.95 - 24.15 = 326.80$.",
          "Degrees of freedom: Between $= 4 - 1 = 3$, Error $= 20 - 4 = 16$.",
          "Mean squares: $MST = 24.15 / 3 = 8.05$, $MSE = 326.80 / 16 = 20.425$.",
          "Test statistic $F = \\frac{MST}{MSE} = \\frac{8.05}{20.425} = 0.394$.",
          "Critical value: $F_{0.05}(3, 16) = 3.24$.",
          "Conclusion: Since $F_{cal} = 0.394 < 3.24$, accept $H_0$. The sample means do not differ significantly."
        ],
        "finalAnswer": "Accept $H_0$ ($F = 0.394 < F_{0.05}(3, 16) = 3.24$); sample means are equal at 5% level.",
        "tableValuesUsed": "$F(3, 16)$ at 5% = 3.24",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["anova", "one-way", "f-test"]
    },
    {
      "id": "2025-may-sem5-q24b",
      "paperId": "2025-may-sem5-405686",
      "part": "B",
      "number": "24(b)",
      "marks": 10,
      "co": 4,
      "rbt": 3,
      "unit": 4,
      "topic": "Two-Way Classification ANOVA (Randomized Block Design)",
      "questionText": "The table shows the yield of paddy in arbitrary units obtained from four different varieties planted in five blocks where each block is divided into four plots. Test at 5% level whether the yields vary significantly with (i) soil differences (ii) differences in the type of paddy.\nBlocks: A, B, C, D, E\nTypes of Paddy (I, II, III, IV):\nA: 12, 15, 10, 14\nB: 15, 19, 12, 11\nC: 14, 18, 15, 12\nD: 11, 16, 12, 16\nE: 16, 17, 11, 14",
      "tables": [
        {
          "title": "Yield of Paddy by Blocks and Types",
          "headers": ["Blocks", "Type I", "Type II", "Type III", "Type IV", "Total"],
          "rows": [
            ["A", "12", "15", "10", "14", "51"],
            ["B", "15", "19", "12", "11", "57"],
            ["C", "14", "18", "15", "12", "59"],
            ["D", "11", "16", "12", "16", "55"],
            ["E", "16", "17", "11", "14", "58"],
            ["Total", "68", "85", "60", "67", "280"]
          ]
        }
      ],
      "answer": {
        "status": "complete",
        "steps": [
          "Blocks $r = 5$ (Rows), Types of Paddy $c = 4$ (Columns), Total $N = 20$.",
          "Row totals ($R_i$): $R_A = 51, R_B = 57, R_C = 59, R_D = 55, R_E = 58$.",
          "Column totals ($C_j$): $C_I = 68, C_{II} = 85, C_{III} = 60, C_{IV} = 67$.",
          "Grand total $G = 280$. Correction factor $CF = \\frac{280^2}{20} = \\frac{78400}{20} = 3920$.",
          "Sum of squares of all 20 entries: $\\sum x^2 = 144+225+100+196 + 225+361+144+121 + 196+324+225+144 + 121+256+144+256 + 256+289+121+196 = 4048$.",
          "Total $TSS = 4048 - 3920 = 128$.",
          "SSR (Between Blocks / Soil): $\\frac{51^2 + 57^2 + 59^2 + 55^2 + 58^2}{4} - 3920 = \\frac{2601 + 3249 + 3481 + 3025 + 3364}{4} - 3920 = \\frac{15720}{4} - 3920 = 3930 - 3920 = 10$.",
          "SSC (Between Types of Paddy): $\\frac{68^2 + 85^2 + 60^2 + 67^2}{5} - 3920 = \\frac{4624 + 7225 + 3600 + 4489}{5} - 3920 = \\frac{19938}{5} - 3920 = 3987.6 - 3920 = 67.6$.",
          "SSE (Error): $TSS - SSR - SSC = 128 - 10 - 67.6 = 50.4$.",
          "Degrees of freedom: Blocks $df = 5 - 1 = 4$; Types $df = 4 - 1 = 3$; Error $df = 4 \\times 3 = 12$.",
          "Mean Squares: $MSR = 10 / 4 = 2.50$, $MSC = 67.6 / 3 = 22.53$, $MSE = 50.4 / 12 = 4.20$.",
          "(i) Soil Differences (Blocks): $F_R = \\frac{2.50}{4.20} = 0.595$. Table $F_{0.05}(4, 12) = 3.26$. Since $0.595 < 3.26$, no significant difference due to soil.",
          "(ii) Type of Paddy: $F_C = \\frac{22.53}{4.20} = 5.36$. Table $F_{0.05}(3, 12) = 3.49$. Since $5.36 > 3.49$, there is a highly significant difference among types of paddy."
        ],
        "finalAnswer": "(i) Soil: $F = 0.60 < 3.26$ (not significant); (ii) Paddy Types: $F = 5.36 > 3.49$ (significant at 5% level).",
        "tableValuesUsed": "$F(4, 12)$ at 5% = 3.26; $F(3, 12)$ at 5% = 3.49",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["anova", "two-way", "rbd", "blocks"]
    },
    {
      "id": "2025-may-sem5-q25a",
      "paperId": "2025-may-sem5-405686",
      "part": "B",
      "number": "25(a)",
      "marks": 10,
      "co": 5,
      "rbt": 3,
      "unit": 5,
      "topic": "Control Charts for Variables: Range Chart (R chart)",
      "questionText": "Ten samples each of size 5 are drawn at regular intervals from a manufacturing process. The sample means and their range are given below:\nSample No: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, Total\nSample Mean: 49, 45, 48, 53, 39, 47, 46, 39, 51, 45, Total = 462\nSample Range: 7, 5, 7, 9, 5, 8, 8, 6, 7, 6, Total = 68\nConstruct a control chart for range. Comment on the state of control.",
      "tables": [
        {
          "title": "Sample Means and Ranges",
          "headers": ["Sample No.", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Total"],
          "rows": [
            ["Mean", "49", "45", "48", "53", "39", "47", "46", "39", "51", "45", "462"],
            ["Range", "7", "5", "7", "9", "5", "8", "8", "6", "7", "6", "68"]
          ]
        }
      ],
      "answer": {
        "status": "complete",
        "steps": [
          "Number of samples $k = 10$, sample size $n = 5$.",
          "Sum of Ranges $\\sum R = 68 \\implies \\bar{R} = \\frac{68}{10} = 6.8$.",
          "From standard SQC tables for $n = 5$: $D_3 = 0, D_4 = 2.114$.",
          "Center Line $CL = \\bar{R} = 6.8$.",
          "Upper Control Limit $UCL = D_4 \\bar{R} = 2.114 \\times 6.8 = 14.375$.",
          "Lower Control Limit $LCL = D_3 \\bar{R} = 0 \\times 6.8 = 0$.",
          "Evaluation: The observed ranges are 7, 5, 7, 9, 5, 8, 8, 6, 7, 6.",
          "Every individual range lies well between $LCL = 0$ and $UCL = 14.375$ (maximum observed range is 9).",
          "Conclusion: The process variability is in a state of statistical control."
        ],
        "finalAnswer": "$CL = 6.8$, $UCL = 14.38$, $LCL = 0$. Process variability is under control.",
        "tableValuesUsed": "For $n=5$: $D_3 = 0, D_4 = 2.114$",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["r-chart", "range-chart", "control-limits", "sqc"]
    },
    {
      "id": "2025-may-sem5-q25b",
      "paperId": "2025-may-sem5-405686",
      "part": "B",
      "number": "25(b)",
      "marks": 10,
      "co": 5,
      "rbt": 3,
      "unit": 5,
      "topic": "Control Charts for Attributes: Number of Defectives Chart (np-chart)",
      "questionText": "An inspection of 10 samples of size 400 each from 10 lots revealed the following number of defective units: 17, 15, 14, 26, 9, 4, 19, 12, 9, 15. Construct the appropriate control charts and state whether the process is under control or not.",
      "tables": [
        {
          "title": "Defective Units in 10 Lots (n = 400)",
          "headers": ["Lot No.", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          "rows": [
            ["Defectives", "17", "15", "14", "26", "9", "4", "19", "12", "9", "15"]
          ]
        }
      ],
      "answer": {
        "status": "complete",
        "steps": [
          "Since sample size $n = 400$ is constant across all 10 lots, an np-chart (or p-chart) is appropriate.",
          "Total defectives $\\sum d = 17 + 15 + 14 + 26 + 9 + 4 + 19 + 12 + 9 + 15 = 140$.",
          "Average defectives: $n\\bar{p} = \\frac{140}{10} = 14.0 \\implies \\bar{p} = \\frac{14}{400} = 0.035$, $\\bar{q} = 0.965$.",
          "Center Line $CL = n\\bar{p} = 14.0$.",
          "Standard deviation: $\\sigma_{np} = \\sqrt{n\\bar{p}\\bar{q}} = \\sqrt{400 \\times 0.035 \\times 0.965} = \\sqrt{13.51} \\approx 3.6756$.",
          "$UCL = n\\bar{p} + 3\\sigma_{np} = 14 + 3(3.6756) = 14 + 11.027 = 25.027 \\approx 25.03$.",
          "$LCL = n\\bar{p} - 3\\sigma_{np} = 14 - 11.027 = 2.973 \\approx 2.97$.",
          "Lot 4 has 26 defective units, which exceeds $UCL = 25.03$.",
          "Conclusion: Because Lot 4 lies above the UCL, the process is OUT OF STATISTICAL CONTROL."
        ],
        "finalAnswer": "$CL = 14, UCL = 25.03, LCL = 2.97$. Process is OUT OF CONTROL (Lot 4 = 26 > UCL).",
        "tableValuesUsed": "3-sigma limits",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["np-chart", "attributes", "sqc", "repeated-question"]
    },
    {
      "id": "2025-may-sem5-q26",
      "paperId": "2025-may-sem5-405686",
      "part": "C",
      "number": "26",
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
          "Hypotheses: $H_0$: Voting preference is independent of gender. $H_1$: Voting preference depends on gender.",
          "Row totals: $R_1 = 100, R_2 = 100$. Column totals: $C_1 = 95, C_2 = 65, C_3 = 40$. Total $N = 200$.",
          "Expected frequencies $E_{ij} = \\frac{R_i C_j}{N}$:",
          "For Male ($R_1 = 100$): $E_{11} = \\frac{100 \\times 95}{200} = 47.5, E_{12} = \\frac{100 \\times 65}{200} = 32.5, E_{13} = \\frac{100 \\times 40}{200} = 20.0$.",
          "For Female ($R_2 = 100$): $E_{21} = 47.5, E_{22} = 32.5, E_{23} = 20.0$.",
          "Calculate $\\chi^2 = \\sum \\frac{(O - E)^2}{E}$:",
          "Cell (1,1): $(50 - 47.5)^2 / 47.5 = 6.25 / 47.5 = 0.1316$",
          "Cell (1,2): $(30 - 32.5)^2 / 32.5 = 6.25 / 32.5 = 0.1923$",
          "Cell (1,3): $(20 - 20)^2 / 20 = 0$",
          "Cell (2,1): $(45 - 47.5)^2 / 47.5 = 6.25 / 47.5 = 0.1316$",
          "Cell (2,2): $(35 - 32.5)^2 / 32.5 = 6.25 / 32.5 = 0.1923$",
          "Cell (2,3): $(20 - 20)^2 / 20 = 0$",
          "Total $\\chi^2_{cal} = 0.1316 + 0.1923 + 0 + 0.1316 + 0.1923 + 0 = 0.6478$.",
          "Degrees of freedom: $df = (r - 1)(c - 1) = (2 - 1)(3 - 1) = 2$.",
          "Critical value: $\\chi^2_{0.05, 2} = 5.991$.",
          "Decision: Since $\\chi^2_{cal} = 0.648 < 5.991$, accept $H_0$. Voting preference is independent of gender."
        ],
        "finalAnswer": "Accept $H_0$ ($\\chi^2 = 0.648 < \\chi^2_{0.05, 2} = 5.991$); voting preference is independent of gender.",
        "tableValuesUsed": "$\\chi^2$ at 5% with $df=2$ is 5.991",
        "sourceLink": ""
      },
      "needsReview": False,
      "tags": ["chi-square", "independence-of-attributes", "contingency-table", "repeated-question", "compulsory"]
    }
  ]
}

out2 = os.path.join(content_sem, "2025-may-sem5-405686.json")
with open(out2, "w", encoding="utf-8") as f:
  json.dump(paper2, f, indent=2)

print(f"Generated 2025-may-sem5-405686.json: {len(paper2['questions'])} questions.")

