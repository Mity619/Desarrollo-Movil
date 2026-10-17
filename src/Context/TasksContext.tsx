import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export interface Task {
    id: number;
    name: string;
    state: boolean;
}

const INITIAL_TASKS: Task[] = [
    { id: 5, name: "Challenge 5", state: false },
    { id: 4, name: "Challenge 4", state: true },
    { id: 3, name: "Challenge 3", state: true },
    { id: 2, name: "Challenge 2", state: true },
    { id: 1, name: "Challenge 1", state: true },
    { id: 0, name: "Estudiar Ionic", state: true }
];

const STORAGE_KEY = "tasks";

interface TasksContextType {
    tasks: Task[];
    loading: boolean;
    handleAdd: (name: string, state: boolean) => void;
    handleDelete: (id: number) => void;
    handleToggle: (id: number) => void;
}

const TasksContext = createContext<TasksContextType>({} as TasksContextType);

export function TasksProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        setTasks(stored ? JSON.parse(stored) : INITIAL_TASKS);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks, loading]);

    const handleAdd = useCallback((name: string, state: boolean) => {
        setTasks((prev) => [...prev, { id: Date.now(), name, state }]);
    }, []);

    const handleDelete = useCallback((id: number) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const handleToggle = useCallback((id: number) => {
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, state: !t.state } : t)));
    }, []);

    return (
        <TasksContext.Provider value={{ tasks, loading, handleAdd, handleDelete, handleToggle }}>
            {children}
        </TasksContext.Provider>
    );
}

export const useTasks = () => useContext(TasksContext);