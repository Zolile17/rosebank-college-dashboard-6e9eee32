import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CircleIcon } from "lucide-react";

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "sale" | "refund" | "restock" | "campaign" | "alert" | "staff";
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  className?: string;
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case "sale":
        return "text-emerald-500 fill-emerald-500";
      case "refund":
        return "text-amber-500 fill-amber-500";
      case "restock":
        return "text-blue-500 fill-blue-500";
      case "campaign":
        return "text-lv-gold fill-lv-gold";
      case "alert":
        return "text-red-500 fill-red-500";
      default:
        return "text-gray-500 fill-gray-500";
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-5">
          {activities.map((activity, index) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className="relative mt-0.5">
                <CircleIcon
                  className={cn(
                    "h-3 w-3",
                    getActivityTypeColor(activity.type)
                  )}
                />
                {index !== activities.length - 1 && (
                  <div className="absolute top-3 bottom-0 left-1.5 -ml-px w-px bg-border h-full" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
