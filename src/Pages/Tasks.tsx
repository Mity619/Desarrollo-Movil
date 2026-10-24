import { useState } from 'react';
import { useTasks } from '../Hooks/useTasks';
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonCheckbox, IonButton, IonInput, IonIcon, IonSpinner } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

export function Tasks() {
  const { tasks, loading, addTask, toggleTask, deleteTask } = useTasks();
  const [newTask, setNewTask] = useState('');

  const handleAdd = async () => {
    if (!newTask.trim()) return;
    await addTask(newTask.trim());
    setNewTask('');
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <IonInput
            placeholder="Nueva tarea"
            value={newTask}
            onIonInput={(e) => setNewTask(e.detail.value ?? '')}
          />
          <IonButton onClick={handleAdd}>Añadir</IonButton>
        </div>

        <IonList>
          {tasks.map((task) => (
            <IonItem key={task.id}>
              <IonCheckbox
                slot="start"
                checked={task.completada}
                onIonChange={(e) => toggleTask(task.id, e.detail.checked)}
              />
              <IonLabel style={{ textDecoration: task.completada ? 'line-through' : 'none' }}>
                {task.titulo}
              </IonLabel>
              <IonButton fill="clear" color="danger" onClick={() => deleteTask(task.id)}>
                <IonIcon icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}