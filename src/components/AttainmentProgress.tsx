import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const AttainmentProgress = () => {
  const quota = 250000;
  const forecast = 546000;
  const progress = (quota / forecast) * 100;

  const chartData = [
    { name: "Closed", value: 250000, color: "hsl(140, 60%, 50%)" },
    { name: "Commit", value: 100000, color: "hsl(180, 60%, 45%)" },
    { name: "Expect", value: 50000, color: "hsl(35, 90%, 60%)" },
    { name: "Upside", value: 4000, color: "hsl(265, 60%, 60%)" },
    { name: "Total", value: 404000, color: "hsl(180, 55%, 50%)" },
  ];

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Attainment progress</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Current quarter 2025 Q3</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Quota</p>
              <p className="text-4xl font-bold">
                ${(quota / 1000).toFixed(0)}K
                <span className="text-2xl text-muted-foreground ml-1">
                  / ${(forecast / 1000).toFixed(0)}K
                </span>
              </p>
              <div className="mt-3">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">{progress.toFixed(0)}% goal completed</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Weighted Pipeline %</p>
                <p className="text-2xl font-semibold">1.67%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pipeline Coverage</p>
                <p className="text-2xl font-semibold">0.35x</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="text-sm font-medium mb-4">Forecast distribution by stages</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickFormatter={(value) => `$${value / 1000}K`}
                />
                <Tooltip 
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttainmentProgress;
