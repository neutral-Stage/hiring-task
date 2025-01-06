import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { todoService, Todo, CreateTodoDTO } from "@/services/todo.service";
import { useToast } from "@/contexts/ToastProvider";
import { useAuth } from "./AuthContext";

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

type TodoAction =
  | { type: "SET_TODOS"; payload: Todo[] }
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "UPDATE_TODO"; payload: Todo }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string };

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload, loading: false };
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
        loading: false,
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
        loading: false,
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        loading: false,
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  addTodo: (data: CreateTodoDTO) => Promise<void>;
  updateTodo: (todo: Todo) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string, completed: boolean) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const addToast = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const todos = await todoService.getAll();
        dispatch({ type: "SET_TODOS", payload: todos });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to fetch todos",
        });
      }
    };
    if (user) {
      fetchTodos();
    }
  }, [user]);

  const addTodo = async (todoData: CreateTodoDTO) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const newTodo = await todoService.create(todoData);
      dispatch({ type: "ADD_TODO", payload: newTodo });
      addToast({
        title: "Success",
        description: "Todo created successfully",
        variant: "default",
      });
    } catch (error) {
      const message = "Failed to create todo";
      dispatch({
        type: "SET_ERROR",
        payload: message,
      });
      addToast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  const updateTodo = async (todo: Todo) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const { id, ...updateData } = todo;
      const updatedTodo = await todoService.update(id, updateData);
      dispatch({ type: "UPDATE_TODO", payload: updatedTodo });
      addToast({
        title: "Success",
        description: "Todo updated successfully",
        variant: "default",
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to update todo",
      });
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      await todoService.delete(id);
      dispatch({ type: "DELETE_TODO", payload: id });
      addToast({
        title: "Success",
        description: "Todo deleted successfully",
        variant: "default",
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to delete todo",
      });
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const updatedTodo = await todoService.update(id, { completed });
      dispatch({ type: "UPDATE_TODO", payload: updatedTodo });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Failed to update todo status",
      });
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
}
