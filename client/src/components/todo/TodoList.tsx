import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import { Plus } from "lucide-react";
import { useTodo } from "@/contexts/TodoContext";
import { Todo } from "@/services/todo.service";
import { PageTransition } from "@/components/ui/page-transition";
import { TodoSkeleton } from "./TodoSkeleton";
import { TodoFilters } from "./TodoFilters";
import { TodoEmpty } from "./TodoEmpty";

export function TodoList() {
  const { todos, loading, error, addTodo, updateTodo, deleteTodo, toggleTodo } =
    useTodo();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredAndSortedTodos = useMemo(() => {
    let filtered = [...todos];

    // Apply filter
    if (filter === "active") {
      filtered = filtered.filter((todo) => !todo.completed);
    } else if (filter === "completed") {
      filtered = filtered.filter((todo) => todo.completed);
    }

    // Apply sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.due_date).getTime();
      const dateB = new Date(b.due_date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }, [todos, filter, sortOrder]);

  if (loading) {
    return (
      <PageTransition className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-32 bg-muted rounded animate-pulse" />
          <div className="h-9 w-28 bg-muted rounded animate-pulse" />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <TodoSkeleton key={i} />
          ))}
        </div>
      </PageTransition>
    );
  }

  if (error) {
    return (
      <PageTransition className="p-4 text-center text-red-500">
        <p>{error}</p>
      </PageTransition>
    );
  }

  const handleSubmit = (data: any) => {
    if (editingTodo) {
      updateTodo({ ...editingTodo, ...data });
      setEditingTodo(null);
    } else {
      addTodo({ ...data, completed: false });
    }
    setIsFormOpen(false);
  };

  const handleEdit = (todo: any) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  return (
    <PageTransition className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Todos</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Todo
        </Button>
      </div>

      <TodoFilters
        filter={filter}
        onFilterChange={setFilter}
        sortOrder={sortOrder}
        onSortChange={() =>
          setSortOrder((order) => (order === "asc" ? "desc" : "asc"))
        }
      />

      <TodoForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTodo(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingTodo}
      />

      <div className="space-y-4">
        {filteredAndSortedTodos.length === 0 ? (
          <TodoEmpty
            onCreateClick={() => setIsFormOpen(true)}
            filter={filter}
          />
        ) : (
          filteredAndSortedTodos.map((todo) => (
            <div
              key={todo.id}
              className="transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
            >
              <TodoItem
                todo={todo}
                onEdit={handleEdit}
                onDelete={deleteTodo}
                onToggleComplete={toggleTodo}
              />
            </div>
          ))
        )}
      </div>
    </PageTransition>
  );
}
