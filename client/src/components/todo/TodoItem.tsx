import React, { useState } from "react";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  todo: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    due_date: string;
  };
  onEdit: (todo: TodoItemProps["todo"]) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

export function TodoItem({
  todo,
  onEdit,
  onDelete,
  onToggleComplete,
}: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(todo.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggle = async (checked: boolean) => {
    setIsUpdating(true);
    try {
      await onToggleComplete(todo.id, checked);
    } finally {
      setIsUpdating(false);
    }
  };

  const isOverdue = new Date(todo.due_date) < new Date() && !todo.completed;

  return (
    <Card className={cn("mb-4", todo.completed && "opacity-60")}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={handleToggle}
            disabled={isUpdating}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3
                  className={`font-semibold ${
                    todo.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {todo.title}
                </h3>
                <p
                  className={`text-sm text-muted-foreground ${
                    todo.completed ? "line-through" : ""
                  }`}
                >
                  {todo.description}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(todo)}
                  disabled={isDeleting || isUpdating}
                  aria-label="edit"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  loading={isDeleting}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div
              className={`text-xs mt-2 ${
                isOverdue ? "text-red-500" : "text-muted-foreground"
              }`}
            >
              Due: {format(new Date(todo.due_date), "PPP")}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
