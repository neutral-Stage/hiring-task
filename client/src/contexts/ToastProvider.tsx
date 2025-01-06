import React, { createContext, useContext, useState } from "react";
import * as Toast from "@radix-ui/react-toast";

type ToastData = {
  id: string;
  title: string;
  description?: string;
  variant: "default" | "destructive";
  duration: number;
};

const ToastContext = createContext<{
  addToast: (toast: Omit<ToastData, "id">) => void;
} | null>(null);

type ToastProviderProps = {
  children: React.ReactNode;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (toast: Omit<ToastData, "id">) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, ...toast }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <Toast.Provider swipeDirection="right">
        {toasts.map(({ id, title, description, variant, duration }) => (
          <Toast.Root
            key={id}
            duration={duration}
            onOpenChange={(open) => !open && removeToast(id)}
            className={`flex flex-col gap-1 p-4 rounded-lg shadow-lg ${
              variant === "destructive"
                ? "bg-red-100 text-red-800 border border-red-400"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            <Toast.Title className="font-bold">{title}</Toast.Title>
            {description && (
              <Toast.Description className="text-sm">
                {description}
              </Toast.Description>
            )}
          </Toast.Root>
        ))}
        <Toast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-4 max-w-sm" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  // Hook wrapper for the addToast function
  return (
    toast: Omit<ToastData, "id" | "duration" | "variant"> & {
      duration?: number;
      variant?: "default" | "destructive";
    }
  ) => {
    context.addToast({
      ...toast,
      duration: toast.duration ?? 3000, // Default duration
      variant: toast.variant ?? "default", // Default variant
    });
  };
};
