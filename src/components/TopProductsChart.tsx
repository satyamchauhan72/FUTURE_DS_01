import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  data: { product: string; revenue: number }[];
}

export default function TopProductsChart({ data }: Props) {
  return (
    <Card className="animate-fade-in border-border/60" style={{ animationDelay: "180ms" }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-display">Top-Selling Products</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
            <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <YAxis type="category" dataKey="product" tick={{ fontSize: 11 }} width={120} />
            <Tooltip formatter={(v: number) => ["$" + v.toLocaleString(), "Revenue"]} />
            <Bar dataKey="revenue" fill="hsl(var(--chart-indigo))" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
