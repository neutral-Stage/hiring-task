import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

interface TodoFiltersProps {
  filter: "all" | "active" | "completed";
  onFilterChange: (value: "all" | "active" | "completed") => void;
  sortOrder: "asc" | "desc";
  onSortChange: () => void;
}

export function TodoFilters({
  filter,
  onFilterChange,
  sortOrder,
  onSortChange,
}: TodoFiltersProps) {
  return (
    <div className="flex gap-4 mb-6">
      <Select value={filter} onValueChange={onFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter todos" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="icon"
        onClick={onSortChange}
        className="shrink-0"
      >
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    </div>
  );
} 