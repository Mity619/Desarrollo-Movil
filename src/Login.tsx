import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonItem,
    IonLabel,
    IonText,
} from "@ionic/react";

import { isLoggedIn, login } from "./auth";

const VALID_EMAIL = "user@mail.com";
const VALID_PASSWORD = "123";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    if (isLoggedIn()) {
        return <Navigate to="/tasks" replace />;
    }

    const handleLogin = () => {
        const ok =
            email.trim().toLowerCase() === VALID_EMAIL &&
            password === VALID_PASSWORD;

        if (ok) {
            login();             
            setError("");
            navigate("/tasks", { replace: true });
        } else {
            setError("Correo o contraseña incorrectos.");
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Iniciar sesión</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked">
                        Correo electrónico
                    </IonLabel>
                    <IonInput
                        type="email"
                        value={email}
                        placeholder="correo@ejemplo.com"
                        onIonInput={(e) => setEmail(e.detail.value ?? "")}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">
                        Contraseña
                    </IonLabel>
                    <IonInput
                        type="password"
                        value={password}
                        placeholder="Contraseña"
                        onIonInput={(e) => setPassword(e.detail.value ?? "")}
                    />
                </IonItem>

                {error && (
                    <IonText color="danger">
                        <p className="ion-padding-start ion-padding-top">
                            {error}
                        </p>
                    </IonText>
                )}

                <IonButton
                    expand="block"
                    className="ion-margin-top"
                    onClick={handleLogin}
                >
                    Iniciar sesión
                </IonButton>
            </IonContent>
        </IonPage>
    );
}

export default Login;