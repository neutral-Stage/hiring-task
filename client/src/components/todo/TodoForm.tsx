import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Todo } from "@/services/todo.service";

interface TodoFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TodoFormData) => void;
  initialData?: Todo | null;
}

interface TodoFormData {
  title: string;
  description: string;
  due_date: string;
}

export function TodoForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: TodoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormData>({
    values: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      due_date: initialData?.due_date
        ? new Date(initialData.due_date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
    },
  });

  const onSubmitHandler = async (data: TodoFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Todo" : "Create New Todo"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter todo title"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Enter todo description"
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="due_date">Due Date</Label>
            <Input
              id="due_date"
              type="date"
              {...register("due_date", { required: "Due date is required" })}
            />
            {errors.due_date && (
              <p className="text-sm text-red-500">{errors.due_date.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              {initialData ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
