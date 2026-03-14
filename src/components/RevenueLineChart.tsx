import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  data: { month: string; revenue: number }[];
}

export default function RevenueLineChart({ data }: Props) {
  return (
    <Card className="animate-fade-in border-border/60" style={{ animationDelay: "120ms" }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-display">Revenue Trends Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} tickFormatter={(v) => v.replace(" 2024", "")} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(v: number) => ["$" + v.toLocaleString(), "Revenue"]} />
            <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-blue))" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
