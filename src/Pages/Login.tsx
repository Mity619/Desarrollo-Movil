import { useState, useContext } from "react";
import {
    IonPage,
    IonContent,
    IonInput,
    IonButton,
    IonItem,
    IonList,
    IonText,
    IonToast,
    IonSpinner,
} from "@ionic/react";
import { AuthContext } from "../Context/useContext";
import { Link } from "react-router-dom";

export default function Login() {
    
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);
        try {
            await login(email, password);
        } catch (error: unknown) {
            setErrorMsg(error instanceof Error ? error.message : "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <div
                    style={{
                        maxWidth: "380px",
                        margin: "0 auto",
                        paddingTop: "10vh",
                    }}
                >
                    {/* Encabezado simple */}
                    <div style={{ marginBottom: "32px" }}>
                        <h1
                            style={{
                                fontSize: "28px",
                                fontWeight: 700,
                                margin: 0,
                                color: "var(--ion-text-color)",
                            }}
                        >
                            Iniciar sesión
                        </h1>
                        <IonText color="medium">
                            <p style={{ margin: "8px 0 0 0", fontSize: "14px" }}>
                                Ingresa con tu cuenta para continuar
                            </p>
                        </IonText>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleLogin}>
                        <IonList lines="full" style={{ background: "transparent", padding: 0 }}>
                            <IonItem style={{ "--padding-start": "0" }}>
                                <IonInput
                                    label="Correo electrónico"
                                    labelPlacement="floating"
                                    type="email"
                                    value={email}
                                    placeholder="tu@email.com"
                                    autocomplete="email"
                                    onIonInput={(e) => setEmail(e.detail.value ?? "")}
                                />
                            </IonItem>

                            <IonItem style={{ "--padding-start": "0" }}>
                                <IonInput
                                    label="Contraseña"
                                    labelPlacement="floating"
                                    type="password"
                                    value={password}
                                    placeholder="********"
                                    autocomplete="current-password"
                                    onIonInput={(e) => setPassword(e.detail.value ?? "")}
                                />
                            </IonItem>
                        </IonList>

                        <IonButton
                            expand="block"
                            type="submit"
                            disabled={!email || !password || loading}
                            style={{
                                marginTop: "32px",
                                "--border-radius": "8px",
                                height: "44px",
                                textTransform: "none",
                                fontWeight: 500,
                            }}
                        >
                            {loading ? <IonSpinner name="crescent" style={{ width: "20px", height: "20px" }} /> : "Ingresar"}
                        </IonButton>
                    </form>

                    {/* Link a registro */}
                    <p
                        style={{
                            textAlign: "center",
                            marginTop: "24px",
                            fontSize: "14px",
                            color: "var(--ion-color-medium)",
                        }}
                    >
                        ¿No tienes cuenta?{" "}
                        <Link
                            to="/register"
                            style={{
                                color: "var(--ion-color-primary)",
                                fontWeight: 500,
                                textDecoration: "none",
                            }}
                        >
                            Regístrate
                        </Link>
                    </p>
                </div>

                <IonToast
                    isOpen={!!errorMsg}
                    message={errorMsg}
                    duration={3000}
                    color="danger"
                    position="bottom"
                    onDidDismiss={() => setErrorMsg("")}
                />
            </IonContent>
        </IonPage>
    );
}