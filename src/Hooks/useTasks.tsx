import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface Task {
    id: number;
    titulo: string;
    completada: boolean;
    user_id: string;
    created_at: string;
}

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    // 1. Cargar tareas iniciales
    const fetchTasks = useCallback(async () => {
        const { data, error } = await supabase
          .from('tareas')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!error && data) setTasks(data as Task[]);
        setLoading(false);
    }, []);

    // 2. Suscripción en tiempo real
    useEffect(() => {
        fetchTasks();

        const channel = supabase
            .channel('cambios-tareas')
            .on(
              'postgres_changes',
              { event: '*', schema: 'public', table: 'tareas' },
              (payload) => {
                if (payload.eventType === 'INSERT') {
                  setTasks((prev) => [payload.new as Task, ...prev]);
                } else if (payload.eventType === 'UPDATE') {
                  setTasks((prev) =>
                    prev.map((t) => (t.id === (payload.new as Task).id ? (payload.new as Task) : t))
                  );
                } else if (payload.eventType === 'DELETE') {
                  setTasks((prev) => prev.filter((t) => t.id !== (payload.old as Task).id));
                }
              }
            )
            .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
    }, [fetchTasks]);

    // 3. Operaciones CRUD
    const addTask = async (titulo: string) => {
      const { error } = await supabase.from('tareas').insert({ titulo });
      if (error) throw error;
    };

    const toggleTask = async (id: number, completada: boolean) => {
      const { error } = await supabase
        .from('tareas')
        .update({ completada })
        .eq('id', id);
      if (error) throw error;
    };

    const deleteTask = async (id: number) => {
      const { error } = await supabase.from('tareas').delete().eq('id', id);
      if (error) throw error;
    };

    return { tasks, loading, addTask, toggleTask, deleteTask };
}