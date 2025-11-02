import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ActionCard from "./ActionCard";
import { AlertTriangle } from "lucide-react";

const TodaysFocus = () => {
  const actionItems = [
    {
      type: "risk" as const,
      title: "TechStart Inc",
      description: "Account risk is high with a 25% drop in usage over the last month. I've devised an emergency plan to prevent churn.",
      actionLabel: "Add Mitigation Plan",
    },
    {
      type: "risk" as const,
      title: "Alectri at Risk",
      description: "Account risk is high with a 35% drop in usage over the last month. I've devised an emergency plan to prevent churn.",
      actionLabel: "Add Mitigation Plan",
    },
    {
      type: "opportunity" as const,
      title: "Intuit - due to upsell potential",
      description: "Usage is up 34% this quarter with two license requests. Should I prepare an expansion proposal?",
      actionLabel: "Yes, work on it",
    },
  ];

  return (
    <Card className="col-span-full border-primary/20 shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl">Today's focus</CardTitle>
            <CardDescription className="mt-1">
              Prioritize time-sensitive deals and critical tasks to finish strong.
            </CardDescription>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Suggested actions (4)
          </Badge>
          <Badge variant="outline">Overdue</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actionItems.map((item, idx) => (
            <ActionCard key={idx} {...item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysFocus;
