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

export default function Register() {
    const { register } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        // Validación mínima: contraseñas iguales
        if (password !== confirmPassword) {
            setErrorMsg("Las contraseñas no coinciden");
            return;
        }

        setLoading(true);
        try {
            await register(email, password);
        } catch (error: unknown) {
            setErrorMsg(error instanceof Error ? error.message : "Error al registrarse");
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
                            Crear cuenta
                        </h1>
                        <IonText color="medium">
                            <p style={{ margin: "8px 0 0 0", fontSize: "14px" }}>
                                Regístrate para comenzar a usar la app
                            </p>
                        </IonText>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleRegister}>
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
                                    autocomplete="new-password"
                                    onIonInput={(e) => setPassword(e.detail.value ?? "")}
                                />
                            </IonItem>

                            <IonItem style={{ "--padding-start": "0" }}>
                                <IonInput
                                    label="Confirmar contraseña"
                                    labelPlacement="floating"
                                    type="password"
                                    value={confirmPassword}
                                    placeholder="********"
                                    autocomplete="new-password"
                                    onIonInput={(e) => setConfirmPassword(e.detail.value ?? "")}
                                />
                            </IonItem>
                        </IonList>

                        <IonButton
                            expand="block"
                            type="submit"
                            disabled={!email || !password || !confirmPassword || loading}
                            style={{
                                marginTop: "32px",
                                "--border-radius": "8px",
                                height: "44px",
                                textTransform: "none",
                                fontWeight: 500,
                            }}
                        >
                            {loading ? <IonSpinner name="crescent" style={{ width: "20px", height: "20px" }} /> : "Registrarse"}
                        </IonButton>
                    </form>

                    {/* Link a login */}
                    <p
                        style={{
                            textAlign: "center",
                            marginTop: "24px",
                            fontSize: "14px",
                            color: "var(--ion-color-medium)",
                        }}
                    >
                        ¿Ya tienes cuenta?{" "}
                        <Link
                            to="/login"
                            style={{
                                color: "var(--ion-color-primary)",
                                fontWeight: 500,
                                textDecoration: "none",
                            }}
                        >
                            Inicia sesión
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