import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Target, TrendingUp, FileText } from "lucide-react";
import type { SalesRecord } from "@/data/salesData";
import { getTopProducts, getRegionalSales, getCategoryBreakdown, getKPIs } from "@/data/salesData";

interface Props {
  data: SalesRecord[];
}

export default function InsightsReport({ data }: Props) {
  const kpis = getKPIs(data);
  const topProduct = getTopProducts(data, 1)[0];
  const topRegion = getRegionalSales(data)[0];
  const topCategory = getCategoryBreakdown(data).sort((a, b) => b.revenue - a.revenue)[0];

  const insights = [
    `**${topProduct.product}** is the highest-revenue product, generating $${topProduct.revenue.toLocaleString()} in total sales.`,
    `The **${topRegion.region}** region leads all regions with $${topRegion.revenue.toLocaleString()} in revenue.`,
    `**${topCategory.category}** is the top-contributing category at $${topCategory.revenue.toLocaleString()}.`,
    `Average order value stands at **$${kpis.avgOrderValue.toFixed(0)}**, suggesting opportunities for upselling.`,
  ];

  const recommendations = [
    "Increase inventory for top-selling products to prevent stockouts during peak months.",
    "Invest marketing budget in underperforming regions (analyze lowest-revenue regions) to expand market reach.",
    "Bundle complementary products from the top category to increase average order value.",
    "Run seasonal promotions during low-revenue months identified in the revenue trend analysis.",
    "Implement a loyalty program targeting repeat customers in the highest-performing region.",
  ];

  return (
    <div className="space-y-4 animate-fade-in" style={{ animationDelay: "350ms" }}>
      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-chart-amber" /> Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {insights.map((ins, i) => (
              <li key={i} className="text-sm text-foreground/90 flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: ins.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display flex items-center gap-2">
            <Target className="h-4 w-4 text-chart-indigo" /> Business Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 list-decimal list-inside">
            {recommendations.map((rec, i) => (
              <li key={i} className="text-sm text-foreground/90">{rec}</li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display flex items-center gap-2">
            <FileText className="h-4 w-4 text-chart-emerald" /> Analysis Report Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-foreground/90">
          <div>
            <h4 className="font-display font-semibold text-foreground mb-1">Objective</h4>
            <p>Analyze business sales performance across products, categories, and regions to identify growth opportunities and optimize revenue strategies.</p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground mb-1">Data Analysis</h4>
            <p>We analyzed {data.length} orders generating ${kpis.totalRevenue.toLocaleString()} in total revenue across {4} regions and {4} product categories throughout 2024.</p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground mb-1">Key Findings</h4>
            <p>{topProduct.product} emerged as the revenue leader, while the {topRegion.region} region outperformed others. {topCategory.category} dominates category-wise contribution.</p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground mb-1">Recommendation</h4>
            <p>Focus inventory and marketing efforts on top performers while implementing targeted strategies to boost underperforming segments.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
