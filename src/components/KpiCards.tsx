import { DollarSign, ShoppingCart, Package, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface KpiCardsProps {
  totalRevenue: number;
  totalOrders: number;
  totalQuantity: number;
  avgOrderValue: number;
}

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

export default function KpiCards({ totalRevenue, totalOrders, totalQuantity, avgOrderValue }: KpiCardsProps) {
  const cards = [
    { label: "Total Revenue", value: fmt(totalRevenue), icon: DollarSign, trend: "+12.5%" },
    { label: "Total Orders", value: totalOrders.toLocaleString(), icon: ShoppingCart, trend: "+8.2%" },
    { label: "Quantity Sold", value: totalQuantity.toLocaleString(), icon: Package, trend: "+5.1%" },
    { label: "Avg Order Value", value: fmt(avgOrderValue), icon: TrendingUp, trend: "+3.7%" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <Card key={c.label} className="animate-fade-in border-border/60" style={{ animationDelay: `${i * 60}ms` }}>
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-body">{c.label}</p>
              <p className="text-2xl font-display font-bold mt-1 text-foreground">{c.value}</p>
              <span className="text-xs font-medium text-success mt-1 inline-block">{c.trend} vs last period</span>
            </div>
            <div className="rounded-lg bg-primary/10 p-2.5">
              <c.icon className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
