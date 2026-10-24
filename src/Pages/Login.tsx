import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { IonPage, IonContent, IonItem, IonInput, IonButton, IonText, IonSpinner } from "@ionic/react";

export default function Login() {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isRegister) await register(email, password);
      else await login(email, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div style={{ maxWidth: 380, margin: "0 auto", paddingTop: "10vh" }}>
          <h1>{isRegister ? "Crear cuenta" : "Iniciar sesión"}</h1>
          <form onSubmit={handleSubmit}>
            <IonItem>
              <IonInput label="Correo" type="email" value={email}
                onIonInput={(e) => setEmail(e.detail.value ?? "")} />
            </IonItem>
            <IonItem>
              <IonInput label="Contraseña" type="password" value={password}
                onIonInput={(e) => setPassword(e.detail.value ?? "")} />
            </IonItem>
            <IonButton expand="block" type="submit" disabled={loading} className="ion-margin-top">
              {loading ? <IonSpinner name="crescent" /> : isRegister ? "Registrarse" : "Entrar"}
            </IonButton>
          </form>
          {error && <IonText color="danger"><p>{error}</p></IonText>}
          <IonButton fill="clear" expand="block" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}