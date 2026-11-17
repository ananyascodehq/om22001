const fs = require('fs');
const path = require('path');

const formulaSheets = [
  {
    unitNumber: 1,
    unitTitle: "Descriptive Statistics",
    coNumber: "CO1",
    description: "Measures of Central Tendency, Dispersion, Moments, Skewness and Kurtosis",
    sections: [
      {
        title: "Measures of Central Tendency",
        items: [
          {
            name: "Arithmetic Mean (Raw & Grouped)",
            latex: "\\bar{x} = \\frac{\\sum x_i}{n} = \\frac{\\sum f_i x_i}{N}, \\quad N = \\sum f_i",
            notes: "Corrected Mean: \\bar{x}_{correct} = \\frac{\\sum x_{wrong} - x_{incorrect} + x_{correct}}{n}"
          },
          {
            name: "Combined Mean of Two Groups",
            latex: "\\bar{x}_{12} = \\frac{n_1 \\bar{x}_1 + n_2 \\bar{x}_2}{n_1 + n_2}",
            notes: "Weighted arithmetic mean for pooled samples"
          },
          {
            name: "Geometric Mean (G.M.)",
            latex: "GM = \\left( \\prod_{i=1}^n x_i \\right)^{1/n} = \\text{antilog}\\left( \\frac{\\sum f_i \\log x_i}{N} \\right)",
            notes: "Used for ratios, percentages, index numbers"
          },
          {
            name: "Harmonic Mean (H.M.)",
            latex: "HM = \\frac{n}{\\sum \\frac{1}{x_i}} = \\frac{N}{\\sum \\frac{f_i}{x_i}}",
            notes: "Used for rates and speeds. Relationship: AM \\ge GM \\ge HM"
          },
          {
            name: "Median and Mode (Empirical Relationship)",
            latex: "\\text{Mode} \\approx 3(\\text{Median}) - 2(\\text{Mean})",
            notes: "For moderately skewed distributions"
          }
        ]
      },
      {
        title: "Measures of Dispersion",
        items: [
          {
            name: "Standard Deviation (\\sigma or s)",
            latex: "\\sigma = \\sqrt{\\frac{\\sum f_i(x_i - \\bar{x})^2}{N}} = \\sqrt{\\frac{\\sum f_i x_i^2}{N} - \\bar{x}^2}",
            notes: "Sample standard deviation uses divisor (n - 1)"
          },
          {
            name: "Combined Variance of Two Groups",
            latex: "\\sigma_{12}^2 = \\frac{n_1(\\sigma_1^2 + d_1^2) + n_2(\\sigma_2^2 + d_2^2)}{n_1 + n_2}, \\quad d_1 = \\bar{x}_1 - \\bar{x}_{12}, \\ d_2 = \\bar{x}_2 - \\bar{x}_{12}",
            notes: "Combined standard deviation is \\sigma_{12} = \\sqrt{\\sigma_{12}^2}"
          },
          {
            name: "Coefficient of Variation (C.V.)",
            latex: "C.V. = \\frac{\\sigma}{\\bar{x}} \\times 100\\%",
            notes: "Measures relative variability; lower C.V. denotes greater consistency"
          }
        ]
      },
      {
        title: "Moments, Skewness and Kurtosis",
        items: [
          {
            name: "Central Moments from Raw Moments",
            latex: "\\mu_2 = \\mu_2' - (\\mu_1')^2 = \\sigma^2, \\quad \\mu_3 = \\mu_3' - 3\\mu_2'\\mu_1' + 2(\\mu_1')^3, \\quad \\mu_4 = \\mu_4' - 4\\mu_3'\\mu_1' + 6\\mu_2'(\\mu_1')^2 - 3(\\mu_1')^4",
            notes: "\\mu_1' = \\frac{\\sum f_i(x_i - A)}{N}, \\ \\mu_r' = \\text{raw moment about origin } A"
          },
          {
            name: "Karl Pearson Coefficient of Skewness",
            latex: "S_k = \\frac{\\text{Mean} - \\text{Mode}}{\\sigma} = \\frac{3(\\text{Mean} - \\text{Median})}{\\sigma}",
            notes: "-3 \\le S_k \\le +3. Zero for symmetric distributions"
          },
          {
            name: "Moment Measures of Skewness and Kurtosis",
            latex: "\\beta_1 = \\frac{\\mu_3^2}{\\mu_2^3}, \\quad \\gamma_1 = \\sqrt{\\beta_1}; \\qquad \\beta_2 = \\frac{\\mu_4}{\\mu_2^2}, \\quad \\gamma_2 = \\beta_2 - 3",
            notes: "\\beta_2 = 3: Mesokurtic (Normal); \\beta_2 > 3: Leptokurtic; \\beta_2 < 3: Platykurtic"
          }
        ]
      }
    ]
  },
  {
    unitNumber: 2,
    unitTitle: "Testing of Hypothesis: Large Samples",
    coNumber: "CO2",
    description: "Sampling Distributions, Standard Errors, Large Sample Z-Tests (n >= 30)",
    sections: [
      {
        title: "Test for Single Mean",
        items: [
          {
            name: "Z-Test Statistic for Single Mean",
            latex: "Z = \\frac{\\bar{x} - \\mu_0}{\\sigma / \\sqrt{n}} \\approx \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}}",
            notes: "H_0: \\mu = \\mu_0. Used when n \\ge 30"
          },
          {
            name: "95% and 99% Confidence Intervals for Population Mean",
            latex: "\\bar{x} - Z_{\\alpha/2} \\frac{\\sigma}{\\sqrt{n}} \\le \\mu \\le \\bar{x} + Z_{\\alpha/2} \\frac{\\sigma}{\\sqrt{n}}",
            notes: "For 95%: Z_{0.025} = 1.96. For 99%: Z_{0.005} = 2.58"
          }
        ]
      },
      {
        title: "Test for Difference of Two Means",
        items: [
          {
            name: "Z-Test Statistic for Two Independent Means",
            latex: "Z = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{\\frac{\\sigma_1^2}{n_1} + \\frac{\\sigma_2^2}{n_2}}} \\approx \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}}",
            notes: "H_0: \\mu_1 = \\mu_2 (\\mu_1 - \\mu_2 = 0)"
          }
        ]
      },
      {
        title: "Tests for Proportions",
        items: [
          {
            name: "Z-Test for Single Proportion",
            latex: "Z = \\frac{p - P}{\\sqrt{\\frac{P(1-P)}{n}}}, \\quad p = \\frac{x}{n}",
            notes: "H_0: P = P_0. Sample proportion p = x/n, Q = 1 - P"
          },
          {
            name: "Z-Test for Difference of Two Proportions",
            latex: "Z = \\frac{p_1 - p_2}{\\sqrt{\\hat{P}\\hat{Q}\\left( \\frac{1}{n_1} + \\frac{1}{n_2} \\right)}}, \\quad \\hat{P} = \\frac{n_1 p_1 + n_2 p_2}{n_1 + n_2} = \\frac{x_1 + x_2}{n_1 + n_2}",
            notes: "H_0: P_1 = P_2. Pooled proportion \\hat{P}, \\hat{Q} = 1 - \\hat{P}"
          }
        ]
      },
      {
        title: "Critical Values (Two-Tailed vs One-Tailed)",
        items: [
          {
            name: "Standard Normal Critical Table Values",
            latex: "\\begin{array}{|c|c|c|c|} \\hline \\text{Level of Significance } (\\alpha) & 10\\% & 5\\% & 1\\% \\\\ \\hline \\text{Two-Tailed Test } (|Z| > Z_{\\alpha/2}) & 1.645 & 1.960 & 2.576 \\\\ \\hline \\text{One-Tailed Test } (Z > Z_\\alpha) & 1.282 & 1.645 & 2.326 \\\\ \\hline \\end{array}",
            notes: "Reject H_0 if |Z_{cal}| > Z_{critical}"
          }
        ]
      }
    ]
  },
  {
    unitNumber: 3,
    unitTitle: "Testing of Hypotheses: Small Samples",
    coNumber: "CO3",
    description: "Student's t-Distribution, Snedecor's F-Distribution, and Chi-Square Tests (n < 30)",
    sections: [
      {
        title: "Student's t-Tests",
        items: [
          {
            name: "t-Test for Single Population Mean",
            latex: "t = \\frac{\\bar{x} - \\mu_0}{s / \\sqrt{n}}, \\quad s = \\sqrt{\\frac{\\sum(x_i - \\bar{x})^2}{n - 1}}, \\quad \\text{d.f.} = n - 1",
            notes: "H_0: \\mu = \\mu_0. Degrees of freedom \\nu = n - 1"
          },
          {
            name: "t-Test for Difference of Two Means (Equal Variances)",
            latex: "t = \\frac{\\bar{x}_1 - \\bar{x}_2}{S_p \\sqrt{\\frac{1}{n_1} + \\frac{1}{n_2}}}, \\quad S_p = \\sqrt{\\frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1 + n_2 - 2}}, \\quad \\text{d.f.} = n_1 + n_2 - 2",
            notes: "Pooled sample standard deviation S_p"
          },
          {
            name: "Paired t-Test for Dependent Samples (Before / After)",
            latex: "t = \\frac{\\bar{d}}{s_d / \\sqrt{n}}, \\quad d_i = x_i - y_i, \\quad \\bar{d} = \\frac{\\sum d_i}{n}, \\quad s_d = \\sqrt{\\frac{\\sum (d_i - \\bar{d})^2}{n - 1}}",
            notes: "d.f. = n - 1. Used for matched pairs and treatment comparison"
          }
        ]
      },
      {
        title: "Snedecor's F-Test for Equality of Variances",
        items: [
          {
            name: "F-Test Statistic",
            latex: "F = \\frac{S_1^2}{S_2^2} \\quad (\\text{with } S_1^2 > S_2^2), \\quad S_1^2 = \\frac{n_1 s_1^2}{n_1 - 1}, \\ S_2^2 = \\frac{n_2 s_2^2}{n_2 - 1}",
            notes: "d.f. = (\\nu_1 = n_1 - 1, \\ \\nu_2 = n_2 - 1). Always put larger variance in numerator"
          }
        ]
      },
      {
        title: "Chi-Square (\\chi^2) Tests",
        items: [
          {
            name: "Chi-Square Test for Goodness of Fit",
            latex: "\\chi^2 = \\sum_{i=1}^k \\frac{(O_i - E_i)^2}{E_i}, \\quad \\text{d.f.} = k - 1 - m",
            notes: "O_i = observed frequency, E_i = expected frequency (\\sum O_i = \\sum E_i). E_i \\ge 5 for each class"
          },
          {
            name: "Chi-Square Test for Independence in r x c Contingency Table",
            latex: "E_{ij} = \\frac{R_i \\times C_j}{N}, \\quad \\chi^2 = \\sum_{i=1}^r \\sum_{j=1}^c \\frac{(O_{ij} - E_{ij})^2}{E_{ij}}, \\quad \\text{d.f.} = (r - 1)(c - 1)",
            notes: "R_i = row total, C_j = column total, N = grand total"
          },
          {
            name: "2 x 2 Contingency Table Shortcut Formula",
            latex: "\\chi^2 = \\frac{N(ad - bc)^2}{(a+b)(c+d)(a+c)(b+d)}, \\quad \\text{d.f.} = 1",
            notes: "Table: [[a, b], [c, d]], N = a + b + c + d"
          }
        ]
      }
    ]
  },
  {
    unitNumber: 4,
    unitTitle: "Analysis of Variance (ANOVA)",
    coNumber: "CO4",
    description: "One-Way ANOVA (CRD), Two-Way ANOVA (RBD), and Latin Square Design (LSD)",
    sections: [
      {
        title: "Basic Quantities & Correction Factor",
        items: [
          {
            name: "Grand Total and Correction Factor (C.F.)",
            latex: "G = \\sum_{i=1}^k \\sum_{j=1}^{n_i} y_{ij}, \\quad C.F. = \\frac{G^2}{N}, \\quad N = \\sum n_i",
            notes: "Used across all ANOVA models as baseline adjustment"
          },
          {
            name: "Total Sum of Squares (TSS)",
            latex: "TSS = \\sum_{i=1}^k \\sum_{j=1}^{n_i} y_{ij}^2 - C.F., \\quad \\text{d.f.} = N - 1",
            notes: "Total variation of all observations about grand mean"
          }
        ]
      },
      {
        title: "One-Way Classification ANOVA (CRD)",
        items: [
          {
            name: "Sum of Squares Between Treatments (SSB) & Within (SSW)",
            latex: "SSB = \\sum_{i=1}^k \\frac{T_i^2}{n_i} - C.F. \\quad (\\text{d.f.} = k - 1); \\qquad SSW = TSS - SSB \\quad (\\text{d.f.} = N - k)",
            notes: "T_i = sum of i-th treatment. MSB = SSB / (k - 1), MSW = SSW / (N - k)"
          },
          {
            name: "One-Way F-Ratio",
            latex: "F = \\frac{MSB}{MSW} \\sim F(k - 1, \\ N - k)",
            notes: "Reject H_0 (all treatment means equal) if F_{cal} > F_{table}(k-1, N-k)"
          }
        ]
      },
      {
        title: "Two-Way Classification ANOVA (RBD)",
        items: [
          {
            name: "SSR (Rows/Blocks), SSC (Columns/Treatments), SSE (Error)",
            latex: "SSR = \\sum_{i=1}^r \\frac{R_i^2}{c} - C.F. \\ (\\text{d.f.}=r-1), \\quad SSC = \\sum_{j=1}^c \\frac{C_j^2}{r} - C.F. \\ (\\text{d.f.}=c-1), \\quad SSE = TSS - SSR - SSC \\ (\\text{d.f.}=(r-1)(c-1))",
            notes: "Total observations N = r \\times c"
          },
          {
            name: "Two-Way F-Ratios",
            latex: "F_R = \\frac{MSR}{MSE} \\sim F(r-1, \\ (r-1)(c-1)); \\qquad F_C = \\frac{MSC}{MSE} \\sim F(c-1, \\ (r-1)(c-1))",
            notes: "MSR = SSR/(r-1), MSC = SSC/(c-1), MSE = SSE/((r-1)(c-1))"
          }
        ]
      },
      {
        title: "Latin Square Design (LSD - m x m)",
        items: [
          {
            name: "LSD Partition of Sum of Squares (m x m)",
            latex: "SSR = \\sum \\frac{R_i^2}{m} - C.F., \\quad SSC = \\sum \\frac{C_j^2}{m} - C.F., \\quad SST = \\sum \\frac{T_k^2}{m} - C.F., \\quad SSE = TSS - SSR - SSC - SST",
            notes: "Degrees of freedom: Rows = m-1, Columns = m-1, Treatments = m-1, Error = (m-1)(m-2), Total = m^2-1"
          }
        ]
      }
    ]
  },
  {
    unitNumber: 5,
    unitTitle: "Statistical Quality Control",
    coNumber: "CO5",
    description: "Control Charts for Variables (X-bar, R) and Attributes (p, np, c)",
    sections: [
      {
        title: "Control Charts for Variables: Mean Chart (\\bar{X}-Chart)",
        items: [
          {
            name: "Center Line & 3-\\sigma Control Limits for \\bar{X}",
            latex: "CL = \\bar{\\bar{X}} = \\frac{\\sum \\bar{X}_i}{k}, \\quad UCL = \\bar{\\bar{X}} + A_2 \\bar{R}, \\quad LCL = \\bar{\\bar{X}} - A_2 \\bar{R}",
            notes: "When standard \\sigma is unknown. A_2 is factor based on sample size n"
          },
          {
            name: "Limits when Population Standard Deviation \\sigma is Known",
            latex: "UCL = \\mu_0 + 3 \\frac{\\sigma}{\\sqrt{n}} = \\mu_0 + A \\sigma, \\quad LCL = \\mu_0 - 3 \\frac{\\sigma}{\\sqrt{n}} = \\mu_0 - A \\sigma",
            notes: "A = 3 / \\sqrt{n}"
          }
        ]
      },
      {
        title: "Control Charts for Variables: Range Chart (R-Chart)",
        items: [
          {
            name: "Center Line & Control Limits for R-Chart",
            latex: "CL = \\bar{R} = \\frac{\\sum R_i}{k}, \\quad UCL = D_4 \\bar{R}, \\quad LCL = D_3 \\bar{R}",
            notes: "For n < 7, D_3 = 0 so LCL = 0. Factors D_3, D_4 depend on subgroup size n"
          },
          {
            name: "Estimation of Process Standard Deviation",
            latex: "\\hat{\\sigma} = \\frac{\\bar{R}}{d_2}",
            notes: "d_2 is Hartley's constant based on sample size n"
          }
        ]
      },
      {
        title: "Control Charts for Attributes (p, np, c)",
        items: [
          {
            name: "Fraction Defective Chart (p-Chart)",
            latex: "CL = \\bar{p} = \\frac{\\sum d_i}{\\sum n_i}, \\quad UCL = \\bar{p} + 3 \\sqrt{\\frac{\\bar{p}(1-\\bar{p})}{n}}, \\quad LCL = \\max\\left(0, \\ \\bar{p} - 3 \\sqrt{\\frac{\\bar{p}(1-\\bar{p})}{n}}\\right)",
            notes: "d_i = defectives in sample i. LCL is set to 0 if calculated value is negative"
          },
          {
            name: "Number of Defectives Chart (np-Chart)",
            latex: "CL = n\\bar{p}, \\quad UCL = n\\bar{p} + 3 \\sqrt{n\\bar{p}(1-\\bar{p})}, \\quad LCL = \\max\\left(0, \\ n\\bar{p} - 3 \\sqrt{n\\bar{p}(1-\\bar{p})}\\right)",
            notes: "Applicable only when sample size n is constant across all subgroups"
          },
          {
            name: "Number of Defects Chart (c-Chart - Poisson Model)",
            latex: "CL = \\bar{c} = \\frac{\\sum c_i}{k}, \\quad UCL = \\bar{c} + 3 \\sqrt{\\bar{c}}, \\quad LCL = \\max\\left(0, \\ \\bar{c} - 3 \\sqrt{\\bar{c}}\\right)",
            notes: "Used for counts of non-conformities per unit product"
          }
        ]
      }
    ]
  }
];

const targetPath = path.join(__dirname, '..', 'content', 'materials', 'formula-sheets.json');
fs.writeFileSync(targetPath, JSON.stringify(formulaSheets, null, 2), 'utf8');
console.log('✓ Successfully generated', targetPath);

