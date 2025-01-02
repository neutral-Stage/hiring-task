import { Card, CardContent } from "@/components/ui/card";

export function TodoSkeleton() {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="h-4 w-4 mt-1 rounded bg-muted animate-pulse" />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-5 w-1/3 bg-muted rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-9 w-9 rounded-md bg-muted animate-pulse" />
                <div className="h-9 w-9 rounded-md bg-muted animate-pulse" />
              </div>
            </div>
            <div className="h-3 w-24 mt-2 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 