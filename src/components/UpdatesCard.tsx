import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, Calendar } from "lucide-react";

interface Update {
  type: "win" | "news";
  title: string;
  description: string;
  icon?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "outline" | "destructive";
  timestamp?: string;
  action?: string;
}

const updates: Update[] = [
  {
    type: "win",
    title: "Congrats! Innovation Lab contract signed",
    description: "$65K to your quota!",
    icon: "🎉",
  },
  {
    type: "news",
    title: "Techstart raises $50M Series B",
    description: "The funds helped expand its compliance and production tracking software, which was a critical need for modern supply ch...",
    badge: "Funding",
    badgeVariant: "default",
    timestamp: "Updated 2h ago",
    action: "Schedule a call with CTO",
  },
  {
    type: "news",
    title: "John Smith → CTO at Acme Corp",
    description: "New decision maker identified. Consider technical outreach.",
    badge: "Promotion",
    badgeVariant: "secondary",
    timestamp: "Updated 4h ago",
    action: "Schedule a call with CTO",
  },
];

const UpdatesCard = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Latest updates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-success" />
            Wins
          </h3>
          {updates
            .filter((u) => u.type === "win")
            .map((update, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-success/5 border border-success/20"
              >
                <div className="flex gap-3">
                  <span className="text-2xl">{update.icon}</span>
                  <div>
                    <p className="font-medium text-sm">{update.title}</p>
                    <p className="text-sm text-success font-semibold mt-1">
                      {update.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-info" />
            News
          </h3>
          <div className="space-y-3">
            {updates
              .filter((u) => u.type === "news")
              .map((update, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-border/50 hover:border-border transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    {update.badge && (
                      <Badge variant={update.badgeVariant || "default"} className="text-xs">
                        {update.badge}
                      </Badge>
                    )}
                    {update.timestamp && (
                      <span className="text-xs text-muted-foreground">
                        {update.timestamp}
                      </span>
                    )}
                  </div>
                  <p className="font-medium text-sm mb-1">{update.title}</p>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {update.description}
                  </p>
                  {update.action && (
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      {update.action}
                    </Button>
                  )}
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdatesCard;
