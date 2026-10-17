import {
    IonList,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonNote,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonIcon,
} from "@ionic/react";
import { trashOutline, clipboardOutline } from "ionicons/icons";

interface Task {
    id: number;
    name: string;
    state: boolean;
}

interface TaskListProps {
    tasks: Task[];
    onDelete: (id: number) => void;
    onToggle?: (id: number) => void;
}

function TaskList({ tasks, onDelete, onToggle }: TaskListProps) {
    if (tasks.length === 0) {
        return (
            <div className="ion-text-center ion-padding" style={{ color: "var(--ion-color-medium)" }}>
                <IonIcon icon={clipboardOutline} style={{ fontSize: "48px" }} />
                <p>No hay tareas disponibles</p>
            </div>
        );
    }

    return (
        <IonList>
            {tasks.map((task) => (
                <IonItemSliding key={task.id}>
                    <IonItem>
                        <IonCheckbox
                            slot="start"
                            checked={task.state}
                            onIonChange={() => onToggle?.(task.id)}
                            aria-label={`Marcar ${task.name} como ${task.state ? "pendiente" : "completada"}`}
                        />

                        <IonLabel>
                            <h2 style={{
                                textDecoration: task.state ? "line-through" : "none",
                            }}>
                                {task.name}
                            </h2>
                            <IonNote color={task.state ? "success" : "medium"}>
                                {task.state ? "Completada" : "Pendiente"}
                            </IonNote>
                        </IonLabel>
                    </IonItem>

                    <IonItemOptions side="end">
                        <IonItemOption
                            color="danger"
                            onClick={() => onDelete(task.id)}
                        >
                            <IonIcon slot="icon-only" icon={trashOutline} />
                        </IonItemOption>
                    </IonItemOptions>
                </IonItemSliding>
            ))}
        </IonList>
    );
}

export default TaskList;