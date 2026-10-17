import { useContext } from "react";
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon } from "@ionic/react";
import { AuthContext } from "../Context/useContext";
import { useTasks } from "../Context/TasksContext";
import TaskList from "../Components/TaskList";
import AddTask from "../Components/AddTask";
import Loader from "../Components/Loader";
import { logOutOutline } from "ionicons/icons";

export default function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const { tasks, loading, handleAdd, handleDelete, handleToggle } = useTasks();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Bienvenido {user?.email}</IonTitle>
                    <IonButton slot="end" fill="clear" onClick={logout}>
                        <IonIcon icon={logOutOutline} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {loading ? <Loader message="Cargando tareas..." /> : (
                    <>
                        <AddTask onAdd={handleAdd} />
                        <TaskList tasks={tasks} onDelete={handleDelete} onToggle={handleToggle} />
                    </>
                )}
            </IonContent>
        </IonPage>
    );
}