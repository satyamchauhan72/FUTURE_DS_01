import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface Props {
  data: { category: string; revenue: number }[];
}

const COLORS = [
  "hsl(var(--chart-blue))",
  "hsl(var(--chart-indigo))",
  "hsl(var(--chart-amber))",
  "hsl(var(--chart-pink))",
  "hsl(var(--chart-emerald))",
];

export default function CategoryPieChart({ data }: Props) {
  return (
    <Card className="animate-fade-in border-border/60" style={{ animationDelay: "300ms" }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-display">Category Contribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={data} dataKey="revenue" nameKey="category" cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={3}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v: number) => "$" + v.toLocaleString()} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
