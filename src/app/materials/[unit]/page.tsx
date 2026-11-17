import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ unit: string }>;
}

export default async function UnitMaterialsPage({ params }: PageProps) {
  const { unit } = await params;
  const lower = (unit || "").toLowerCase().trim();

  if (lower.includes("1") || lower.includes("descriptive")) {
    redirect("/study-materials?folder=Unit_1_Descriptive_Statistics");
  }
  if (lower.includes("2") || lower.includes("large")) {
    redirect("/study-materials?folder=Unit_2_Large_Sample_Tests");
  }
  if (lower.includes("3") || lower.includes("small")) {
    redirect("/study-materials?folder=Unit_3_Small_Sample_Tests");
  }
  if (
    lower.includes("4") ||
    lower.includes("anova") ||
    lower.includes("design") ||
    lower.includes("experiments")
  ) {
    redirect("/study-materials?folder=Unit_4_Design_of_Experiments");
  }
  if (
    lower.includes("5") ||
    lower.includes("quality") ||
    lower.includes("sqc")
  ) {
    redirect("/study-materials?folder=Unit_5_Statistical_Quality_Control");
  }
  if (lower.includes("formula")) {
    redirect("/formulas");
  }
  if (lower.includes("table") || lower.includes("reference")) {
    redirect("/tables");
  }

  redirect("/study-materials");
}
