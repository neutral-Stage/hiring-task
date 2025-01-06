import { ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TodoEmptyProps {
  onCreateClick: () => void;
  filter: "all" | "active" | "completed";
}

export function TodoEmpty({ onCreateClick, filter }: TodoEmptyProps) {
  const messages = {
    all: "You don't have any todos yet",
    active: "No active todos found",
    completed: "No completed todos found",
  };

  return (
    <div className="text-center py-12">
      <ClipboardList className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
      <h3 className="text-lg font-medium mb-2">{messages[filter]}</h3>
      {filter === "all" && (
        <div className="mt-4">
          <Button onClick={onCreateClick}>Create your first todo</Button>
        </div>
      )}
    </div>
  );
} 