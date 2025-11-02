import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, ThumbsUp, ThumbsDown } from "lucide-react";

interface ActionCardProps {
  type: "risk" | "opportunity";
  title: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
}

const ActionCard = ({ type, title, description, actionLabel, onAction }: ActionCardProps) => {
  const isRisk = type === "risk";
  
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge 
            variant={isRisk ? "destructive" : "default"}
            className="flex items-center gap-1"
          >
            {isRisk ? (
              <>
                <AlertTriangle className="h-3 w-3" />
                Downsell Risk
              </>
            ) : (
              <>
                <TrendingUp className="h-3 w-3" />
                Renewal Opportunity
              </>
            )}
          </Badge>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4 text-sm leading-relaxed">
          {description}
        </CardDescription>
        <Button 
          onClick={onAction}
          className="w-full"
          variant={isRisk ? "default" : "secondary"}
        >
          {actionLabel}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ActionCard;
