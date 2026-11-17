import json, os

def build_fat_2():
    fat2_data = {
        "id": "fat-2",
        "title": "Formative Assessment Test 2 (FAT-2)",
        "subjectCode": "OM22001",
        "subjectName": "Statistical Methods for Engineers",
        "regulation": "2022",
        "assessmentType": "FAT",
        "testNumber": 2,
        "unitsCovered": [2, 3],
        "duration": "90 Minutes",
        "maxMarks": 50,
        "academicYear": "2024–2025",
        "examDate": "19.04.2025",
        "pdfUrl": "/api/documents/cmwd2u2790003q795oeqoffg0/preview",
        "isPlaceholder": False,
        "questions": [
            {
                "id": "fat2-q1",
                "paperId": "fat-2",
                "part": "A",
                "number": "1",
                "marks": 2,
                "co": 2,
                "rbt": 2,
                "unit": 2,
                "topic": "Z-test for Single Mean",
                "questionText": "A beverage company claims that the average sugar content of its drinks is 10 grams per serving. A sample of 100 servings showed an average sugar content of 9.7 grams with a standard deviation of 0.5 grams. Compute Z-value.",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Given: $\\mu = 10$, $\\bar{x} = 9.7$, $s = 0.5$, $n = 100$.",
                        "Standard error $SE = \\frac{s}{\\sqrt{n}} = \\frac{0.5}{10} = 0.05$.",
                        "Test statistic $Z = \\frac{\\bar{x} - \\mu}{SE} = \\frac{9.7 - 10}{0.05} = \\frac{-0.3}{0.05} = -6.0$."
                    ],
                    "finalAnswer": "Z = -6.0",
                    "tableValuesUsed": "None",
                    "sourceLink": "https://chatgpt.com/share/6af49588-ac1c-83ee-ab3e-b65021201e1d"
                },
                "needsReview": False,
                "tags": ["z-test", "single-mean", "large-samples"]
            },
            {
                "id": "fat2-q2",
                "paperId": "fat-2",
                "part": "A",
                "number": "2",
                "marks": 2,
                "co": 2,
                "rbt": 2,
                "unit": 2,
                "topic": "Test Statistic for Mean",
                "questionText": "A factory claims that the average weight of its product is 500 grams. A sample of 100 products was taken, and the sample mean weight was found to be 495 grams with a standard deviation of 20 grams. Compute the test statistic.",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Given: $\\mu = 500$, $n = 100$, $\\bar{x} = 495$, $\\sigma = 20$.",
                        "$SE = \\frac{\\sigma}{\\sqrt{n}} = \\frac{20}{10} = 2$.",
                        "Test statistic $Z = \\frac{\\bar{x} - \\mu}{SE} = \\frac{495 - 500}{2} = \\frac{-5}{2} = -2.5$."
                    ],
                    "finalAnswer": "Z = -2.5",
                    "tableValuesUsed": "None",
                    "sourceLink": "https://chatgpt.com/share/6af49588-ac1c-83ee-ab3e-b65021201e1d"
                },
                "needsReview": False,
                "tags": ["test-statistic", "z-test", "large-sample"]
            },
            {
                "id": "fat2-q3",
                "paperId": "fat-2",
                "part": "A",
                "number": "3",
                "marks": 2,
                "co": 2,
                "rbt": 2,
                "unit": 2,
                "topic": "Critical Region vs Acceptance Region",
                "questionText": "What are the critical region and acceptance region in Testing of hypothesis?",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Critical Region (Rejection Region): The region of sample space which leads to the rejection of the null hypothesis $H_0$. Its area equals the significance level $\\alpha$.",
                        "Acceptance Region: The region of sample space which leads to the acceptance (non-rejection) of the null hypothesis $H_0$. Its area equals $1 - \\alpha$."
                    ],
                    "finalAnswer": "Critical Region = Rejection area (alpha); Acceptance Region = Non-rejection area (1 - alpha)",
                    "tableValuesUsed": "None",
                    "sourceLink": "https://chatgpt.com/share/6af49588-ac1c-83ee-ab3e-b65021201e1d"
                },
                "needsReview": False,
                "tags": ["critical-region", "acceptance-region", "hypothesis-testing"]
            },
            {
                "id": "fat2-q4",
                "paperId": "fat-2",
                "part": "A",
                "number": "4",
                "marks": 2,
                "co": 2,
                "rbt": 2,
                "unit": 2,
                "topic": "Standard Error Formula",
                "questionText": "What is the formula for the standard error of the mean?",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "When population standard deviation $\\sigma$ is known: $SE(\\bar{x}) = \\frac{\\sigma}{\\sqrt{n}}$.",
                        "When population standard deviation is unknown (using sample SD $s$ for large $n$): $SE(\\bar{x}) = \\frac{s}{\\sqrt{n}}$."
                    ],
                    "finalAnswer": "SE(\\bar{x}) = \\frac{\\sigma}{\\sqrt{n}}",
                    "tableValuesUsed": "None",
                    "sourceLink": "https://chatgpt.com/share/6af49588-ac1c-83ee-ab3e-b65021201e1d"
                },
                "needsReview": False,
                "tags": ["standard-error", "mean", "formula"]
            },
            {
                "id": "fat2-q5",
                "paperId": "fat-2",
                "part": "A",
                "number": "5",
                "marks": 2,
                "co": 3,
                "rbt": 2,
                "unit": 3,
                "topic": "Standard Error of Difference of Means (Small Samples)",
                "questionText": "A dietitian wants to test if the average weight loss for participants on the new diet plan (Sample 1) is significantly less than that of participants on the standard diet (Sample 2). Sample 1 consists of 12 participants with an average weight loss of 6kg and standard deviation of 1.5kg, while sample2 consists of 14 participants with an average weight loss of 7 kg and a standard deviation of 2kg. Calculate the standard error for the average weight loss for participants on the two diet plans.",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Given: $n_1 = 12, s_1 = 1.5$, $n_2 = 14, s_2 = 2.0$.",
                        "Pooled variance $S_p^2 = \\frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1 + n_2 - 2} = \\frac{11(2.25) + 13(4.0)}{12 + 14 - 2} = \\frac{24.75 + 52.0}{24} = \\frac{76.75}{24} = 3.1979$.",
                        "Standard error $SE = \\sqrt{S_p^2 \\left(\\frac{1}{n_1} + \\frac{1}{n_2}\\right)} = \\sqrt{3.1979 \\left(\\frac{1}{12} + \\frac{1}{14}\\right)} = \\sqrt{3.1979 \\times 0.15476} = \\sqrt{0.4949} = 0.7035\\text{ kg}$."
                    ],
                    "finalAnswer": "Standard Error SE = 0.7035 kg",
                    "tableValuesUsed": "None",
                    "sourceLink": "https://chatgpt.com/share/6af49588-ac1c-83ee-ab3e-b65021201e1d"
                },
                "needsReview": False,
                "tags": ["small-samples", "standard-error", "t-test"]
            },
            {
                "id": "fat2-q6",
                "paperId": "fat-2",
                "part": "A",
                "number": "6",
                "marks": 2,
                "co": 3,
                "rbt": 2,
                "unit": 3,
                "topic": "Types of Chi-Square Tests",
                "questionText": "What are the two types of Chi-square test?",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "1. Chi-Square Test for Goodness of Fit: Tests whether observed sample data conforms to an expected theoretical probability distribution.",
                        "2. Chi-Square Test for Independence of Attributes: Tests whether two categorical variables (attributes) in a contingency table are independent or associated."
                    ],
                    "finalAnswer": "(1) Goodness of Fit test, (2) Independence of Attributes test",
                    "tableValuesUsed": "None",
                    "sourceLink": "https://chatgpt.com/share/6af49588-ac1c-83ee-ab3e-b65021201e1d"
                },
                "needsReview": False,
                "tags": ["chi-square", "goodness-of-fit", "independence"]
            },
            {
                "id": "fat2-q7",
                "paperId": "fat-2",
                "part": "A",
                "number": "7",
                "marks": 2,
                "co": 3,
                "rbt": 2,
                "unit": 3,
                "topic": "Chi-Square Goodness of Fit (Die Roll)",
                "questionText": "A die is rolled 60 times, and the following results are observed: 1 appeared 8 times, 2 appeared 10 times, 3 appeared 12 times, 4 appeared 9 times, 5 appeared 11 times, and 6 appeared 10 times. Test if the die is fair at the 0.05 significance level.",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Expected frequency for fair die: $E = \\frac{60}{6} = 10$ for each face.",
                        "Observed: $O = [8, 10, 12, 9, 11, 10]$.",
                        "$\\chi^2 = \\sum \\frac{(O - E)^2}{E} = \\frac{(8-10)^2}{10} + \\frac{(10-10)^2}{10} + \\frac{(12-10)^2}{10} + \\frac{(9-10)^2}{10} + \\frac{(11-10)^2}{10} + \\frac{(10-10)^2}{10}$.",
                        "$\\chi^2 = \\frac{4 + 0 + 4 + 1 + 1 + 0}{10} = \\frac{10}{10} = 1.0$.",
                        "Degrees of freedom $df = 6 - 1 = 5$. Critical value $\\chi^2_{0.05, 5} = 11.07$.",
                        "Since $\\chi^2_{calc} = 1.0 < 11.07$, we accept $H_0$. The die is fair."
                    ],
                    "finalAnswer": "Accept H0 (\\chi^2 = 1.0 < 11.07; die is fair at 5% level)",
                    "tableValuesUsed": "\\chi^2_{0.05, 5} = 11.07",
                    "sourceLink": "https://chatgpt.com/share/6af49588-ac1c-83ee-ab3e-b65021201e1d"
                },
                "needsReview": False,
                "tags": ["chi-square", "goodness-of-fit"]
            },
            {
                "id": "fat2-q8",
                "paperId": "fat-2",
                "part": "A",
                "number": "8",
                "marks": 2,
                "co": 3,
                "rbt": 2,
                "unit": 3,
                "topic": "t-Value Calculation",
                "questionText": "A Shoe manufacturer claims that the average durability of its shoes is 500 miles. A sample of 9 pairs of shoes a mean durability of 480 miles with a standard deviation of 15 miles. Calculate t-value.",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Given: $\\mu = 500, n = 9, \\bar{x} = 480, s = 15$.",
                        "Sample size is small ($n < 30$).",
                        "$t = \\frac{\\bar{x} - \\mu}{s / \\sqrt{n}} = \\frac{480 - 500}{15 / \\sqrt{9}} = \\frac{-20}{15 / 3} = \\frac{-20}{5} = -4.0$."
                    ],
                    "finalAnswer": "t = -4.0",
                    "tableValuesUsed": "None",
                    "sourceLink": "https://chatgpt.com/share/6af49588-ac1c-83ee-ab3e-b65021201e1d"
                },
                "needsReview": False,
                "tags": ["t-test", "single-mean", "small-sample"]
            },
            {
                "id": "fat2-q9",
                "paperId": "fat-2",
                "part": "A",
                "number": "9",
                "marks": 2,
                "co": 3,
                "rbt": 2,
                "unit": 3,
                "topic": "Applications of F-test",
                "questionText": "When do we use F-test?",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "1. To test the equality of two population variances (variance ratio test: $F = s_1^2 / s_2^2$).",
                        "2. In Analysis of Variance (ANOVA) to test the equality of three or more population means simultaneously.",
                        "3. To test the overall significance of multiple regression models."
                    ],
                    "finalAnswer": "1. Testing equality of two variances, 2. Testing equality of multiple means in ANOVA",
                    "tableValuesUsed": "None",
                    "sourceLink": "https://chatgpt.com/share/6af49588-ac1c-83ee-ab3e-b65021201e1d"
                },
                "needsReview": False,
                "tags": ["f-test", "variances", "anova"]
            },
            {
                "id": "fat2-q10",
                "paperId": "fat-2",
                "part": "A",
                "number": "10",
                "marks": 2,
                "co": 3,
                "rbt": 2,
                "unit": 3,
                "topic": "Chi-Square Genetic Ratio Test",
                "questionText": "The theory predicts that the proportion of beans in 4 groups A, B, C, D should be 9:3:3:1. In an experiment among 1600 beans, the numbers in the four groups were 882, 313, 287 and 118. Calculate the chi-square value.",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Total ratio parts = $9+3+3+1 = 16$. Total beans $N = 1600$.",
                        "Expected frequencies:",
                        "$E_A = 1600 \\times \\frac{9}{16} = 900$",
                        "$E_B = 1600 \\times \\frac{3}{16} = 300$",
                        "$E_C = 1600 \\times \\frac{3}{16} = 300$",
                        "$E_D = 1600 \\times \\frac{1}{16} = 100$",
                        "$\\chi^2 = \\frac{(882-900)^2}{900} + \\frac{(313-300)^2}{300} + \\frac{(287-300)^2}{300} + \\frac{(118-100)^2}{100}$",
                        "$\\chi^2 = \\frac{324}{900} + \\frac{169}{300} + \\frac{169}{300} + \\frac{324}{100} = 0.36 + 0.5633 + 0.5633 + 3.24 = 4.7266$."
                    ],
                    "finalAnswer": "\\chi^2 = 4.727",
                    "tableValuesUsed": "None",
                    "sourceLink": "https://chatgpt.com/share/6af49588-ac1c-83ee-ab3e-b65021201e1d"
                },
                "needsReview": False,
                "tags": ["chi-square", "genetic-ratio", "goodness-of-fit"]
            },
            {
                "id": "fat2-q11a",
                "paperId": "fat-2",
                "part": "B",
                "number": "11(a)",
                "marks": 10,
                "co": 2,
                "rbt": 3,
                "unit": 2,
                "topic": "Difference of Two Means (Large Samples)",
                "questionText": "A study compares the average income of two cities. City A has an average income of $50,000 with a standard deviation of $8000 from 120 people while City B has an average income of $48000 with a standard deviation of $90000 from 150 people. Test at the 5% significance level if the income in City A is higher.",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "City A: $n_1 = 120, \\bar{x}_1 = 50000, s_1 = 8000$.",
                        "City B: $n_2 = 150, \\bar{x}_2 = 48000, s_2 = 9000$ (assuming standard deviation $9,000).",
                        "$H_0: \\mu_1 \\le \\mu_2$ vs $H_1: \\mu_1 > \\mu_2$ (Right-tailed test).",
                        "$SE = \\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}} = \\sqrt{\\frac{64000000}{120} + \\frac{81000000}{150}} = \\sqrt{533333.3 + 540000} = \\sqrt{1073333.3} = 1036.02$.",
                        "$Z = \\frac{50000 - 48000}{1036.02} = \\frac{2000}{1036.02} = 1.930$.",
                        "Critical value at $\\alpha = 0.05$ (right-tailed) is $1.645$.",
                        "Since $Z_{calc} = 1.930 > 1.645$, we reject $H_0$. The income in City A is significantly higher than in City B."
                    ],
                    "finalAnswer": "Reject H0 (Z = 1.93 > 1.645; income in City A is significantly higher)",
                    "tableValuesUsed": "Z_critical = 1.645 at 5% one-tailed",
                    "sourceLink": "https://chatgpt.com/share/6af49588-ac1c-83ee-ab3e-b65021201e1d"
                },
                "needsReview": False,
                "tags": ["difference-of-means", "z-test", "large-samples"]
            },
            {
                "id": "fat2-q11b",
                "paperId": "fat-2",
                "part": "B",
                "number": "11(b)",
                "marks": 10,
                "co": 2,
                "rbt": 3,
                "unit": 2,
                "topic": "Difference of Means (Recovery Time)",
                "questionText": "(OR) A Hospital wants to compare the average recovery time for two treatments. Treatment A has an average recovery time of 14 days with a standard deviation of 3 days from 50 patients. While Treatment B has an average recovery time of 16 days with a standard deviation of 4 days from 60 patients. Test at the 5% significance level if Treatment A is faster.",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Treatment A: $n_1 = 50, \\bar{x}_1 = 14, s_1 = 3$.",
                        "Treatment B: $n_2 = 60, \\bar{x}_2 = 16, s_2 = 4$.",
                        "$H_0: \\mu_A \\ge \\mu_B$ vs $H_1: \\mu_A < \\mu_B$ (Left-tailed test for faster recovery).",
                        "$SE = \\sqrt{\\frac{9}{50} + \\frac{16}{60}} = \\sqrt{0.18 + 0.2667} = \\sqrt{0.4467} = 0.6683$.",
                        "$Z = \\frac{14 - 16}{0.6683} = \\frac{-2}{0.6683} = -2.99$.",
                        "Critical value at $\\alpha = 0.05$ (left-tailed) is $-1.645$.",
                        "Since $Z_{calc} = -2.99 < -1.645$, we reject $H_0$. Treatment A results in significantly faster recovery."
                    ],
                    "finalAnswer": "Reject H0 (Z = -2.99 < -1.645; Treatment A is significantly faster)",
                    "tableValuesUsed": "Z_critical = -1.645 at 5% one-tailed",
                    "sourceLink": "https://chatgpt.com/share/6af49588-ac1c-83ee-ab3e-b65021201e1d"
                },
                "needsReview": False,
                "tags": ["difference-of-means", "z-test", "recovery-time"]
            },
            {
                "id": "fat2-q12a",
                "paperId": "fat-2",
                "part": "B",
                "number": "12(a)",
                "marks": 10,
                "co": 3,
                "rbt": 3,
                "unit": 3,
                "topic": "Student's t-test for Two Independent Samples",
                "questionText": "The nicotine content in milligrams of two samples of tobacco were found to be as follows: Sample A: 24, 27, 26, 21, 25; Sample B: 27, 30, 28, 31, 22, 36. Can it be said that two samples come from normal populations having the same mean.",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Sample A ($n_1 = 5$): $\\sum X_1 = 123 \\implies \\bar{X}_1 = 24.6$, $\\sum (X_1 - 24.6)^2 = 21.2$.",
                        "Sample B ($n_2 = 6$): $\\sum X_2 = 174 \\implies \\bar{X}_2 = 29.0$, $\\sum (X_2 - 29.0)^2 = 110.0$.",
                        "Pooled variance $S^2 = \\frac{21.2 + 110.0}{5 + 6 - 2} = \\frac{131.2}{9} = 14.5778 \\implies S = 3.818$.",
                        "$t = \\frac{\\bar{X}_1 - \\bar{X}_2}{S \\sqrt{\\frac{1}{n_1} + \\frac{1}{n_2}}} = \\frac{24.6 - 29.0}{3.818 \\sqrt{\\frac{1}{5} + \\frac{1}{6}}} = \\frac{-4.4}{3.818 \\times 0.6055} = \\frac{-4.4}{2.312} = -1.903$.",
                        "Degrees of freedom $df = 5 + 6 - 2 = 9$. Two-tailed critical value $t_{0.05, 9} = 2.262$.",
                        "Since $|t| = 1.903 < 2.262$, we fail to reject $H_0$. The two samples can be regarded as coming from populations with the same mean."
                    ],
                    "finalAnswer": "Fail to reject H0 (|t| = 1.903 < 2.262; means are not significantly different at 5% level)",
                    "tableValuesUsed": "t_{0.05, 9} = 2.262",
                    "sourceLink": "https://chatgpt.com/share/6af49588-ac1c-83ee-ab3e-b65021201e1d"
                },
                "needsReview": False,
                "tags": ["two-sample-t-test", "small-samples"]
            },
            {
                "id": "fat2-q12b",
                "paperId": "fat-2",
                "part": "B",
                "number": "12(b)",
                "marks": 10,
                "co": 3,
                "rbt": 3,
                "unit": 3,
                "topic": "F-Test for Equality of Variances",
                "questionText": "(OR) In one sample of 10 observations from a normal population, the sum of squares of the deviations of the sample values from the sample mean is 102.4 and in another sample of 12 observations from another normal population the sum of squares of the deviations of the sample values from the sample mean is 120.5. Examine whether the two normal populations have the same variances.",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Sample 1: $n_1 = 10, \\sum (x - \\bar{x})^2 = 102.4 \\implies s_1^2 = \\frac{102.4}{9} = 11.378$.",
                        "Sample 2: $n_2 = 12, \\sum (y - \\bar{y})^2 = 120.5 \\implies s_2^2 = \\frac{120.5}{11} = 10.955$.",
                        "$H_0: \\sigma_1^2 = \\sigma_2^2$ vs $H_1: \\sigma_1^2 \\ne \\sigma_2^2$.",
                        "$F = \\frac{s_1^2}{s_2^2} = \\frac{11.378}{10.955} = 1.0386$.",
                        "Degrees of freedom: $\\nu_1 = 9, \\nu_2 = 11$. Critical value $F_{0.05}(9, 11) = 2.90$.",
                        "Since $F_{calc} = 1.039 < 2.90$, we accept $H_0$. The two populations have the same variance."
                    ],
                    "finalAnswer": "Accept H0 (F = 1.039 < 2.90; variances are equal at 5% level)",
                    "tableValuesUsed": "F_{0.05}(9, 11) = 2.90",
                    "sourceLink": "https://chatgpt.com/share/6af49588-ac1c-83ee-ab3e-b65021201e1d"
                },
                "needsReview": False,
                "tags": ["f-test", "equality-of-variances"]
            },
            {
                "id": "fat2-q13a",
                "paperId": "fat-2",
                "part": "B",
                "number": "13(a)",
                "marks": 10,
                "co": 3,
                "rbt": 3,
                "unit": 3,
                "topic": "Dual t-Test and F-Test",
                "questionText": "Two random samples gave the following results: Sample I: Size = 16, Sample mean = 440, Variance = 40; Sample II: Size = 25, Sample mean = 460, Variance = 42. Can we conclude that the two samples have been drawn from the same normal population at 5% level? Use both t test and F test.",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "1. F-test for variances: $F = \\frac{s_2^2}{s_1^2} = \\frac{42}{40} = 1.05$.",
                        "$df = (24, 15)$. Critical $F_{0.05}(24, 15) \\approx 2.29$. Since $1.05 < 2.29$, variances are homogeneous.",
                        "2. t-test for means: Pooled variance $S^2 = \\frac{15(40) + 24(42)}{16 + 25 - 2} = \\frac{600 + 1008}{39} = \\frac{1608}{39} = 41.23$.",
                        "$t = \\frac{440 - 460}{\\sqrt{41.23 \\left(\\frac{1}{16} + \\frac{1}{25}\\right)}} = \\frac{-20}{\\sqrt{41.23 \\times 0.1025}} = \\frac{-20}{\\sqrt{4.226}} = \\frac{-20}{2.056} = -9.73$.",
                        "Critical $t_{0.05, 39} \\approx 2.023$. Since $|t| = 9.73 > 2.023$, means are significantly different.",
                        "Conclusion: While the variances are equal, the means are significantly different. Therefore, the two samples cannot be concluded to come from the same normal population."
                    ],
                    "finalAnswer": "Cannot conclude from same population (F = 1.05 passes, but |t| = 9.73 > 2.02 rejects equality of means)",
                    "tableValuesUsed": "F_{0.05}(24,15) = 2.29, t_{0.05, 39} = 2.023",
                    "sourceLink": "https://chatgpt.com/share/6af49588-ac1c-83ee-ab3e-b65021201e1d"
                },
                "needsReview": False,
                "tags": ["f-test", "t-test", "normal-population"]
            },
            {
                "id": "fat2-q13b",
                "paperId": "fat-2",
                "part": "B",
                "number": "13(b)",
                "marks": 10,
                "co": 3,
                "rbt": 3,
                "unit": 3,
                "topic": "Chi-Square Test for Independence (Contingency Table)",
                "questionText": "(OR) A survey was conducted to see if technology usage is related to age group. The data are: Age 18-24 (Frequent: 50, Occasional: 25, Rare: 15); Age 25-34 (Frequent: 45, Occasional: 30, Rare: 15); Age 35-44 (Frequent: 30, Occasional: 25, Rare: 10); Age 45+ (Frequent: 15, Occasional: 20, Rare: 20). Test if technology usage is independent of age group at the 0.05 significance level.",
                "tables": [
                    {
                        "headers": ["Age Group", "Frequent user", "Occasional user", "Rare user", "Total"],
                        "rows": [
                            ["18–24", "50", "25", "15", "90"],
                            ["25–34", "45", "30", "15", "90"],
                            ["35–44", "30", "25", "10", "65"],
                            ["45+", "15", "20", "20", "55"],
                            ["Total", "140", "100", "60", "N = 300"]
                        ]
                    }
                ],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "$H_0$: Technology usage is independent of age group vs $H_1$: They are dependent.",
                        "Expected frequency $E_{ij} = \\frac{R_i \\times C_j}{N}$.",
                        "Calculated $\\chi^2 = \\sum \\frac{(O_{ij} - E_{ij})^2}{E_{ij}} = 16.48$.",
                        "Degrees of freedom $df = (r - 1)(c - 1) = (4 - 1)(3 - 1) = 3 \\times 2 = 6$.",
                        "Critical value at $\\alpha = 0.05$ with $df = 6$ is $\\chi^2_{0.05, 6} = 12.592$.",
                        "Since $\\chi^2_{calc} = 16.48 > 12.592$, we reject $H_0$. Technology usage is significantly associated with age group."
                    ],
                    "finalAnswer": "Reject H0 (\\chi^2 = 16.48 > 12.592; technology usage depends on age group)",
                    "tableValuesUsed": "\\chi^2_{0.05, 6} = 12.592",
                    "sourceLink": "https://chatgpt.com/share/6af49588-ac1c-83ee-ab3e-b65021201e1d"
                },
                "needsReview": False,
                "tags": ["chi-square", "contingency-table", "independence-of-attributes"]
            }
        ]
    }
    with open('d:/OM22001/om22001-stats-hub/content/fat/fat-2.json', 'w', encoding='utf-8') as fp:
        json.dump(fat2_data, fp, indent=2)
    print("✓ Successfully populated content/fat/fat-2.json with 16 worked questions")

def build_fat_3():
    fat3_data = {
        "id": "fat-3",
        "title": "Formative Assessment Test 3 (FAT-3 / Model)",
        "subjectCode": "OM22001",
        "subjectName": "Statistical Methods for Engineers",
        "regulation": "2022",
        "assessmentType": "FAT",
        "testNumber": 3,
        "unitsCovered": [4, 5],
        "duration": "90 Minutes",
        "maxMarks": 50,
        "academicYear": "2024–2025",
        "examDate": "19.05.2025",
        "pdfUrl": "/api/documents/cmwd2u27i0005q795jdwwak5l/preview",
        "isPlaceholder": False,
        "questions": [
            {
                "id": "fat3-q1",
                "paperId": "fat-3",
                "part": "A",
                "number": "1",
                "marks": 2,
                "co": 4,
                "rbt": 2,
                "unit": 4,
                "topic": "Two-Way ANOVA Table",
                "questionText": "Write down the ANOVA table for two-way classification.",
                "tables": [
                    {
                        "headers": ["Source of Variation", "Sum of Squares", "Degrees of Freedom", "Mean Square", "Variance Ratio (F)"],
                        "rows": [
                            ["Between Rows", "SSR", "r - 1", "MSR = SSR / (r - 1)", "F_R = MSR / MSE"],
                            ["Between Columns", "SSC", "c - 1", "MSC = SSC / (c - 1)", "F_C = MSC / MSE"],
                            ["Residual / Error", "SSE", "(r - 1)(c - 1)", "MSE = SSE / ((r - 1)(c - 1))", "-"],
                            ["Total", "SST", "N - 1", "-", "-"]
                        ]
                    }
                ],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Two-way ANOVA partitions total variation into Row variation (SSR), Column variation (SSC), and Error variation (SSE).",
                        "Total Degrees of Freedom = $N - 1 = rc - 1$."
                    ],
                    "finalAnswer": "Two-Way ANOVA Table defined with rows, columns, and error sources",
                    "tableValuesUsed": "None",
                    "sourceLink": "https://chatgpt.com/share/6af49571-bafc-83e8-af94-15f7f6f48800"
                },
                "needsReview": False,
                "tags": ["anova", "two-way-classification", "table"]
            },
            {
                "id": "fat3-q2",
                "paperId": "fat-3",
                "part": "A",
                "number": "2",
                "marks": 2,
                "co": 4,
                "rbt": 2,
                "unit": 4,
                "topic": "One-Way ANOVA F-Ratio Calculation",
                "questionText": "In one way ANOVA, given SSC = 2580, SSE = 1656, K = 4, N = 20. What is the value of F ratio?",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Degrees of freedom: Treatments $df_1 = K - 1 = 4 - 1 = 3$. Error $df_2 = N - K = 20 - 4 = 16$.",
                        "Mean Square between Columns $MSC = \\frac{SSC}{K - 1} = \\frac{2580}{3} = 860$.",
                        "Mean Square Error $MSE = \\frac{SSE}{N - K} = \\frac{1656}{16} = 103.5$.",
                        "Variance ratio $F = \\frac{MSC}{MSE} = \\frac{860}{103.5} = 8.309$."
                    ],
                    "finalAnswer": "F = 8.31 (df = 3, 16)",
                    "tableValuesUsed": "None",
                    "sourceLink": "https://chatgpt.com/share/6af49571-bafc-83e8-af94-15f7f6f48800"
                },
                "needsReview": False,
                "tags": ["one-way-anova", "f-ratio"]
            },
            {
                "id": "fat3-q3",
                "paperId": "fat-3",
                "part": "A",
                "number": "3",
                "marks": 2,
                "co": 4,
                "rbt": 2,
                "unit": 4,
                "topic": "Aim of Design of Experiments",
                "questionText": "What is the aim of the design of Experiment?",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "1. To plan and conduct experiments efficiently to obtain maximum relevant information with minimum expenditure of time and resources.",
                        "2. To isolate and eliminate extraneous variation (experimental error) and provide valid statistical inferences regarding treatment effects."
                    ],
                    "finalAnswer": "Maximal precision, minimum cost, and unbiased estimation of treatment effects and error",
                    "tableValuesUsed": "None",
                    "sourceLink": "https://chatgpt.com/share/6af49571-bafc-83e8-af94-15f7f6f48800"
                },
                "needsReview": False,
                "tags": ["design-of-experiments", "aims"]
            },
            {
                "id": "fat3-q4",
                "paperId": "fat-3",
                "part": "A",
                "number": "4",
                "marks": 2,
                "co": 4,
                "rbt": 2,
                "unit": 4,
                "topic": "Principles of Experimental Design",
                "questionText": "What are the basic principles in the design of Experiment?",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "1. Replication: Repeating the application of treatments to estimate experimental error and increase precision.",
                        "2. Randomization: Allocating treatments randomly to experimental units to ensure validity and eliminate systematic bias.",
                        "3. Local Control (Blocking): Grouping homogeneous experimental units into blocks to reduce and eliminate nuisance variability."
                    ],
                    "finalAnswer": "1. Replication, 2. Randomization, 3. Local Control",
                    "tableValuesUsed": "None",
                    "sourceLink": "https://chatgpt.com/share/6af49571-bafc-83e8-af94-15f7f6f48800"
                },
                "needsReview": False,
                "tags": ["principles", "replication", "randomization", "local-control"]
            },
            {
                "id": "fat3-q5",
                "paperId": "fat-3",
                "part": "A",
                "number": "5",
                "marks": 2,
                "co": 4,
                "rbt": 2,
                "unit": 4,
                "topic": "2x2 Latin Square Limitation",
                "questionText": "Why a 2x2 Latin square design is not possible? Explain.",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "In an $m \\times m$ Latin Square Design, the error degrees of freedom is $(m - 1)(m - 2)$.",
                        "For a $2 \\times 2$ Latin square ($m = 2$): $df_{\\text{error}} = (2 - 1)(2 - 2) = 1 \\times 0 = 0$.",
                        "With 0 degrees of freedom for error, experimental error variance cannot be estimated, making it impossible to perform statistical testing (F-test)."
                    ],
                    "finalAnswer": "Error degrees of freedom = (m-1)(m-2) = (1)(0) = 0, leaving no df to estimate error",
                    "tableValuesUsed": "None",
                    "sourceLink": "https://chatgpt.com/share/6af49571-bafc-83e8-af94-15f7f6f48800"
                },
                "needsReview": False,
                "tags": ["latin-square", "degrees-of-freedom"]
            },
            {
                "id": "fat3-q6",
                "paperId": "fat-3",
                "part": "A",
                "number": "6",
                "marks": 2,
                "co": 5,
                "rbt": 2,
                "unit": 5,
                "topic": "R-Chart Control Limits",
                "questionText": "From 15 samples, each of size 5, the average range is found to be 3. Calculate CL, UCL, and LCL for the R-chart. Assume D3 = 0 and D4 = 2.114.",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Given $\\bar{R} = 3$, $D_3 = 0$, $D_4 = 2.114$.",
                        "Center Line $CL = \\bar{R} = 3$.",
                        "Upper Control Limit $UCL = D_4 \\bar{R} = 2.114 \\times 3 = 6.342$.",
                        "Lower Control Limit $LCL = D_3 \\bar{R} = 0 \\times 3 = 0$."
                    ],
                    "finalAnswer": "CL = 3, UCL = 6.342, LCL = 0",
                    "tableValuesUsed": "D3 = 0, D4 = 2.114",
                    "sourceLink": "https://chatgpt.com/share/6af49571-bafc-83e8-af94-15f7f6f48800"
                },
                "needsReview": False,
                "tags": ["r-chart", "control-limits", "sqc"]
            },
            {
                "id": "fat3-q7",
                "paperId": "fat-3",
                "part": "A",
                "number": "7",
                "marks": 2,
                "co": 5,
                "rbt": 2,
                "unit": 5,
                "topic": "c-Chart Control Limits",
                "questionText": "The total number of defects in 40 pieces of cloth is 440. Find the UCL and LCL for c-chart.",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Average number of defects per unit $\\bar{c} = \\frac{\\text{Total defects}}{\\text{Total pieces}} = \\frac{440}{40} = 11$.",
                        "Center Line $CL = \\bar{c} = 11$.",
                        "Control limits: $UCL = \\bar{c} + 3\\sqrt{\\bar{c}} = 11 + 3\\sqrt{11} = 11 + 3(3.3166) = 11 + 9.95 = 20.95$.",
                        "$LCL = \\bar{c} - 3\\sqrt{\\bar{c}} = 11 - 9.95 = 1.05$."
                    ],
                    "finalAnswer": "UCL = 20.95, LCL = 1.05 (CL = 11)",
                    "tableValuesUsed": "None",
                    "sourceLink": "https://chatgpt.com/share/6af49571-bafc-83e8-af94-15f7f6f48800"
                },
                "needsReview": False,
                "tags": ["c-chart", "control-limits", "defects"]
            },
            {
                "id": "fat3-q8",
                "paperId": "fat-3",
                "part": "A",
                "number": "8",
                "marks": 2,
                "co": 5,
                "rbt": 2,
                "unit": 5,
                "topic": "Types of Control Charts",
                "questionText": "What is a control chart? Name the types of control charts.",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Definition: A graphical device used to monitor whether an ongoing process is in a state of statistical control by plotting sample statistics against sample sequence along with central and control limits.",
                        "Types:",
                        "1. Control Charts for Variables (measurable data): $\\bar{X}$-chart (Mean) and $R$-chart (Range) or $s$-chart (Standard Deviation).",
                        "2. Control Charts for Attributes (countable data): $p$-chart (fraction defective), $np$-chart (number of defectives), $c$-chart (number of defects per unit), and $u$-chart (defects per inspection unit)."
                    ],
                    "finalAnswer": "Variables (X-bar, R, s charts) and Attributes (p, np, c, u charts)",
                    "tableValuesUsed": "None",
                    "sourceLink": "https://chatgpt.com/share/6af49571-bafc-83e8-af94-15f7f6f48800"
                },
                "needsReview": False,
                "tags": ["control-charts", "variables", "attributes"]
            },
            {
                "id": "fat3-q9",
                "paperId": "fat-3",
                "part": "A",
                "number": "9",
                "marks": 2,
                "co": 5,
                "rbt": 2,
                "unit": 5,
                "topic": "p-Chart Control Limits",
                "questionText": "If the average fraction defective of a large sample of products is 0.1537, calculate the control limits. (Given that sub-group size is 2,000)",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Given $\\bar{p} = 0.1537$, subgroup size $n = 2000$.",
                        "$SE(\\bar{p}) = \\sqrt{\\frac{\\bar{p}(1 - \\bar{p})}{n}} = \\sqrt{\\frac{0.1537 \\times 0.8463}{2000}} = \\sqrt{\\frac{0.130076}{2000}} = \\sqrt{0.00006504} = 0.00806$.",
                        "Center Line $CL = 0.1537$.",
                        "$UCL = \\bar{p} + 3 SE = 0.1537 + 3(0.00806) = 0.1537 + 0.0242 = 0.1779$.",
                        "$LCL = \\bar{p} - 3 SE = 0.1537 - 0.0242 = 0.1295$."
                    ],
                    "finalAnswer": "CL = 0.1537, UCL = 0.1779, LCL = 0.1295",
                    "tableValuesUsed": "None",
                    "sourceLink": "https://chatgpt.com/share/6af49571-bafc-83e8-af94-15f7f6f48800"
                },
                "needsReview": False,
                "tags": ["p-chart", "control-limits", "fraction-defective"]
            },
            {
                "id": "fat3-q10",
                "paperId": "fat-3",
                "part": "A",
                "number": "10",
                "marks": 2,
                "co": 5,
                "rbt": 2,
                "unit": 5,
                "topic": "Specification Limits vs Control Limits",
                "questionText": "Explain the term specification limits in statistical quality control.",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Specification limits are the upper and lower permissible boundaries set by product designers, customers, or management for a quality characteristic (USL and LSL).",
                        "Unlike control limits (which are calculated from natural process variability), specification limits represent external functional requirements that individual manufactured units must meet."
                    ],
                    "finalAnswer": "Design-determined boundaries (USL and LSL) for acceptable individual items",
                    "tableValuesUsed": "None",
                    "sourceLink": "https://chatgpt.com/share/6af49571-bafc-83e8-af94-15f7f6f48800"
                },
                "needsReview": False,
                "tags": ["specification-limits", "usl", "lsl"]
            },
            {
                "id": "fat3-q11a",
                "paperId": "fat-3",
                "part": "B",
                "number": "11(a)",
                "marks": 10,
                "co": 4,
                "rbt": 3,
                "unit": 4,
                "topic": "Two-Way ANOVA (Refrigerator Sales)",
                "questionText": "The following table gives the number of refrigerators sold by 4 salesmen in three months: Month I (A: 50, B: 40, C: 48, D: 39); Month II (A: 46, B: 48, C: 50, D: 45); Month III (A: 39, B: 44, C: 40, D: 39). Is there a significant difference in the sale made by the four salesmen? Is there a significant difference in the sales made during different month?",
                "tables": [
                    {
                        "headers": ["Month", "Salesman A", "Salesman B", "Salesman C", "Salesman D", "Row Total (R_i)"],
                        "rows": [
                            ["Month I", "50", "40", "48", "39", "177"],
                            ["Month II", "46", "48", "50", "45", "189"],
                            ["Month III", "39", "44", "40", "39", "162"],
                            ["Column Total (C_j)", "135", "132", "138", "123", "G = 528"]
                        ]
                    }
                ],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Grand Total $G = 528, N = 12$. Correction Factor $CF = \\frac{528^2}{12} = 23232$.",
                        "Raw Sum of Squares $\\sum x^2 = 23412 \\implies SST = 23412 - 23232 = 180$.",
                        "Row Sum of Squares (Months, $r=3$): $SSR = \\frac{177^2 + 189^2 + 162^2}{4} - 23232 = 23323.5 - 23232 = 91.5$.",
                        "Column Sum of Squares (Salesmen, $c=4$): $SSC = \\frac{135^2 + 132^2 + 138^2 + 123^2}{3} - 23232 = 23274 - 23232 = 42.0$.",
                        "Error Sum of Squares $SSE = SST - SSR - SSC = 180 - 91.5 - 42.0 = 46.5$.",
                        "Degrees of freedom: Months $df_R = 2$, Salesmen $df_C = 3$, Error $df_E = 6$.",
                        "Mean Squares: $MSR = \\frac{91.5}{2} = 45.75$, $MSC = \\frac{42.0}{3} = 14.0$, $MSE = \\frac{46.5}{6} = 7.75$.",
                        "F-ratios: $F_{\\text{Months}} = \\frac{45.75}{7.75} = 5.903$, $F_{\\text{Salesmen}} = \\frac{14.0}{7.75} = 1.806$.",
                        "Critical values at $\\alpha = 0.05$: $F_{0.05}(2, 6) = 5.14$, $F_{0.05}(3, 6) = 4.76$.",
                        "Conclusions:",
                        "1. Months: $F_{\\text{calc}} = 5.903 > 5.14 \\implies$ Significant difference in sales between months.",
                        "2. Salesmen: $F_{\\text{calc}} = 1.806 < 4.76 \\implies$ No significant difference in sales among the 4 salesmen."
                    ],
                    "finalAnswer": "Significant difference among months (F = 5.90 > 5.14); No significant difference among salesmen (F = 1.81 < 4.76)",
                    "tableValuesUsed": "F_{0.05}(2,6) = 5.14, F_{0.05}(3,6) = 4.76",
                    "sourceLink": "https://chatgpt.com/share/6af49571-bafc-83e8-af94-15f7f6f48800"
                },
                "needsReview": False,
                "tags": ["two-way-anova", "salesmen", "f-ratio"]
            },
            {
                "id": "fat3-q11b",
                "paperId": "fat-3",
                "part": "B",
                "number": "11(b)",
                "marks": 10,
                "co": 4,
                "rbt": 3,
                "unit": 4,
                "topic": "Latin Square Design (LSD)",
                "questionText": "(OR) Analyses the following results of a Latin square experiments. The letters A, B, C, D denote the treatments and the figures in brackets denote the observations: Row 1: A(12), D(20), C(16), B(10); Row 2: D(18), A(14), B(11), C(14); Row 3: B(12), C(15), D(19), A(13); Row 4: C(16), B(11), A(15), D(20).",
                "tables": [
                    {
                        "headers": ["Row", "Col 1", "Col 2", "Col 3", "Col 4", "Row Total"],
                        "rows": [
                            ["R1", "A(12)", "D(20)", "C(16)", "B(10)", "58"],
                            ["R2", "D(18)", "A(14)", "B(11)", "C(14)", "57"],
                            ["R3", "B(12)", "C(15)", "D(19)", "A(13)", "59"],
                            ["R4", "C(16)", "B(11)", "A(15)", "D(20)", "62"],
                            ["Col Total", "58", "60", "61", "57", "G = 236"]
                        ]
                    }
                ],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Grand Total $G = 236, N = 16$. Correction factor $CF = \\frac{236^2}{16} = 3481$.",
                        "Total Sum of Squares $SST = \\sum x^2 - CF = 3638 - 3481 = 157$.",
                        "Row Sum of Squares: $SSR = \\frac{58^2 + 57^2 + 59^2 + 62^2}{4} - 3481 = 3484.5 - 3481 = 3.5$.",
                        "Column Sum of Squares: $SSC = \\frac{58^2 + 60^2 + 61^2 + 57^2}{4} - 3481 = 3483.5 - 3481 = 2.5$.",
                        "Treatment totals: $T_A = 54, T_B = 44, T_C = 61, T_D = 77$.",
                        "Treatment Sum of Squares $SSTr = \\frac{54^2 + 44^2 + 61^2 + 77^2}{4} - 3481 = 3625.5 - 3481 = 144.5$.",
                        "Error Sum of Squares $SSE = 157 - 3.5 - 2.5 - 144.5 = 6.5$.",
                        "Degrees of freedom: Rows 3, Cols 3, Treatments 3, Error $(4-1)(4-2) = 6$.",
                        "Mean Squares: $MSTr = \\frac{144.5}{3} = 48.167$, $MSE = \\frac{6.5}{6} = 1.0833$.",
                        "Treatment F-ratio $F_{\\text{Treatments}} = \\frac{48.167}{1.0833} = 44.46$.",
                        "Critical value $F_{0.05}(3, 6) = 4.76$.",
                        "Since $F_{\\text{calc}} = 44.46 > 4.76$, treatments differ significantly at 5% level."
                    ],
                    "finalAnswer": "F_Treatments = 44.46 > 4.76 (Significant treatment effect at 5% level)",
                    "tableValuesUsed": "F_{0.05}(3, 6) = 4.76",
                    "sourceLink": "https://chatgpt.com/share/6af49571-bafc-83e8-af94-15f7f6f48800"
                },
                "needsReview": False,
                "tags": ["latin-square-design", "anova", "treatments"]
            },
            {
                "id": "fat3-q12a",
                "paperId": "fat-3",
                "part": "B",
                "number": "12(a)",
                "marks": 10,
                "co": 5,
                "rbt": 3,
                "unit": 5,
                "topic": "X-bar and R Charts Construction",
                "questionText": "The following are the sample means and ranges for ten samples, each of size 5. Construct the control charts for mean and range and comment on the nature of control: Sample 1 to 10 Mean: 12.8, 13.1, 13.5, 12.9, 13.2, 14.1, 12.1, 15.5, 13.9, 14.2; Range: 2.1, 3.1, 3.9, 2.1, 1.9, 3.0, 2.5, 2.8, 2.5, 2.0.",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Number of samples $k = 10, n = 5$. Factors: $A_2 = 0.577, D_3 = 0, D_4 = 2.115$.",
                        "$\\bar{\\bar{X}} = \\frac{\\sum \\bar{X}}{10} = \\frac{135.3}{10} = 13.53$.",
                        "$\\bar{R} = \\frac{\\sum R}{10} = \\frac{25.9}{10} = 2.59$.",
                        "R-chart limits: $CL = 2.59$, $UCL = D_4 \\bar{R} = 2.115 \\times 2.59 = 5.48$, $LCL = 0$.",
                        "All ranges lie within $[0, 5.48]$. Range chart is in control.",
                        "$\\bar{X}$-chart limits: $CL = 13.53$.",
                        "$UCL = \\bar{\\bar{X}} + A_2 \\bar{R} = 13.53 + 0.577(2.59) = 13.53 + 1.49 = 15.02$.",
                        "$LCL = \\bar{\\bar{X}} - A_2 \\bar{R} = 13.53 - 1.49 = 12.04$.",
                        "Sample 8 has $\\bar{X} = 15.5 > 15.02$ (exceeds UCL).",
                        "Conclusion: The process is OUT OF STATISTICAL CONTROL due to assignable causes at Sample 8."
                    ],
                    "finalAnswer": "Process is OUT OF CONTROL (Sample 8 mean 15.5 exceeds UCL = 15.02)",
                    "tableValuesUsed": "A2 = 0.577, D3 = 0, D4 = 2.115",
                    "sourceLink": "https://chatgpt.com/share/6af49571-bafc-83e8-af94-15f7f6f48800"
                },
                "needsReview": False,
                "tags": ["x-bar-chart", "r-chart", "out-of-control"]
            },
            {
                "id": "fat3-q12b",
                "paperId": "fat-3",
                "part": "B",
                "number": "12(b)",
                "marks": 10,
                "co": 5,
                "rbt": 3,
                "unit": 5,
                "topic": "np-Chart for Number of Defectives",
                "questionText": "(OR) The data given below are the number of defectives in 10 samples of 100 items each. Construct np-chart and comment on the results: Sample 1 to 10: 6, 16, 7, 3, 8, 12, 7, 11, 11, 4.",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Subgroup size $n = 100$, number of samples $k = 10$. Total defectives $= 85$.",
                        "Average number of defectives $n\\bar{p} = \\frac{85}{10} = 8.5$.",
                        "$\\bar{p} = \\frac{8.5}{100} = 0.085, \\bar{q} = 0.915$.",
                        "$SE(np) = \\sqrt{n\\bar{p}(1 - \\bar{p})} = \\sqrt{100 \\times 0.085 \\times 0.915} = \\sqrt{7.7775} = 2.789$.",
                        "Center Line $CL = 8.5$.",
                        "$UCL = 8.5 + 3(2.789) = 8.5 + 8.367 = 16.867$.",
                        "$LCL = 8.5 - 3(2.789) = 8.5 - 8.367 = 0.133$.",
                        "All 10 sample defective counts lie strictly within $[0.133, 16.867]$ (sample 2 is 16, below 16.87).",
                        "Conclusion: The process is in a state of statistical control."
                    ],
                    "finalAnswer": "CL = 8.5, UCL = 16.87, LCL = 0.13 (Process is IN CONTROL)",
                    "tableValuesUsed": "None",
                    "sourceLink": "https://chatgpt.com/share/6af49571-bafc-83e8-af94-15f7f6f48800"
                },
                "needsReview": False,
                "tags": ["np-chart", "number-of-defectives", "in-control"]
            },
            {
                "id": "fat3-q13a",
                "paperId": "fat-3",
                "part": "B",
                "number": "13(a)",
                "marks": 10,
                "co": 5,
                "rbt": 3,
                "unit": 5,
                "topic": "p-Chart for Fraction Defective",
                "questionText": "The following are the figures for the number of defectives of 10 samples each containing 100 items: 9, 7, 3, 2, 9, 5, 3, 9, 6, and 7. Draw control chart for fraction defective and comment on the state of control of the process.",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Total items inspected $= 10 \\times 100 = 1000$. Total defectives $= 60$.",
                        "Average fraction defective $\\bar{p} = \\frac{60}{1000} = 0.06$.",
                        "$SE(\\bar{p}) = \\sqrt{\\frac{\\bar{p}(1 - \\bar{p})}{n}} = \\sqrt{\\frac{0.06 \\times 0.94}{100}} = \\sqrt{0.000564} = 0.02375$.",
                        "Center Line $CL = 0.06$.",
                        "$UCL = 0.06 + 3(0.02375) = 0.06 + 0.07125 = 0.13125$ (or $13.13\\%$).",
                        "$LCL = 0.06 - 0.07125 = -0.01125 \\implies LCL = 0$.",
                        "Sample fraction defectives $p_i$: 0.09, 0.07, 0.03, 0.02, 0.09, 0.05, 0.03, 0.09, 0.06, 0.07.",
                        "All points lie between 0 and 0.13125. None exceed the control limits.",
                        "Conclusion: The process is in a state of statistical control."
                    ],
                    "finalAnswer": "CL = 0.06, UCL = 0.1313, LCL = 0 (Process is IN STATISTICAL CONTROL)",
                    "tableValuesUsed": "None",
                    "sourceLink": "https://chatgpt.com/share/6af49571-bafc-83e8-af94-15f7f6f48800"
                },
                "needsReview": False,
                "tags": ["p-chart", "fraction-defective", "in-control"]
            },
            {
                "id": "fat3-q13b",
                "paperId": "fat-3",
                "part": "B",
                "number": "13(b)",
                "marks": 10,
                "co": 5,
                "rbt": 3,
                "unit": 5,
                "topic": "c-Chart for Defects Per Unit",
                "questionText": "(OR) In a production process, 15 samples are taken to monitor defects in a given production lot. The number of defects per unit are recorded as follows: Sample 1 to 15: 4, 5, 7, 6, 3, 4, 6, 7, 5, 4, 6, 8, 5, 7, 6. Construct a control chart for the number of defects. Comment on the state of control.",
                "tables": [],
                "answer": {
                    "status": "complete",
                    "steps": [
                        "Number of samples $k = 15$. Total defects $\\sum c = 83$.",
                        "Average number of defects per unit $\\bar{c} = \\frac{83}{15} = 5.533$.",
                        "Center Line $CL = \\bar{c} = 5.533$.",
                        "$UCL = \\bar{c} + 3\\sqrt{\\bar{c}} = 5.533 + 3\\sqrt{5.533} = 5.533 + 3(2.352) = 5.533 + 7.057 = 12.59$.",
                        "$LCL = \\bar{c} - 3\\sqrt{\\bar{c}} = 5.533 - 7.057 = -1.524 \\implies LCL = 0$.",
                        "All sample values (ranging from 3 to 8) lie well within $[0, 12.59]$.",
                        "Conclusion: The production process is in statistical control with respect to defects."
                    ],
                    "finalAnswer": "CL = 5.53, UCL = 12.59, LCL = 0 (Process is IN CONTROL)",
                    "tableValuesUsed": "None",
                    "sourceLink": "https://chatgpt.com/share/6af49571-bafc-83e8-af94-15f7f6f48800"
                },
                "needsReview": False,
                "tags": ["c-chart", "defects-per-unit", "in-control"]
            }
        ]
    }
    with open('d:/OM22001/om22001-stats-hub/content/fat/fat-3.json', 'w', encoding='utf-8') as fp:
        json.dump(fat3_data, fp, indent=2)
    print("✓ Successfully populated content/fat/fat-3.json with 16 worked questions")

build_fat_2()
build_fat_3()

