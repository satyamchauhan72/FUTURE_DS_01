import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  data: { region: string; revenue: number }[];
}

export default function RegionalSalesChart({ data }: Props) {
  return (
    <Card className="animate-fade-in border-border/60" style={{ animationDelay: "240ms" }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-display">Regional Sales Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <XAxis dataKey="region" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(v: number) => ["$" + v.toLocaleString(), "Revenue"]} />
            <Bar dataKey="revenue" fill="hsl(var(--chart-amber))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
