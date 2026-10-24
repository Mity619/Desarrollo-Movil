import { useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonItem, IonSpinner, IonText, IonList } from "@ionic/react";
import { useFilesystem } from "../Hooks/useFilesystem";

const FILE_PATH = "mi-data.json";

export default function FilesystemPage() {
  const { loading, error, writeFile, readFile } = useFilesystem();
  const [nombre, setNombre] = useState("");
  const [curso, setCurso] = useState("");
  const [readResult, setReadResult] = useState<any>(null);

  const handleWrite = async () => {
    if (!nombre.trim() || !curso.trim()) return;
    const ok = await writeFile(FILE_PATH, { nombre, curso, fecha: new Date().toISOString() });
    if (ok) {
      alert("Archivo guardado exitosamente en Documents");
      setNombre("");
      setCurso("");
    }
  };

  const handleRead = async () => {
    const data = await readFile(FILE_PATH);
    setReadResult(data);
  };

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Sistema de Archivos</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonText color="medium">
          <p style={{ fontSize: "14px", marginBottom: "16px" }}>
            Escribe un JSON en la carpeta Documents del dispositivo y luego léelo.
          </p>
        </IonText>

        <IonList>
          <IonItem style={{ "--padding-start": "0" }}>
            <IonInput
              label="Nombre"
              labelPlacement="floating"
              value={nombre}
              placeholder="Ej: Jonathan"
              onIonInput={(e) => setNombre(e.detail.value ?? "")}
            />
          </IonItem>
          <IonItem style={{ "--padding-start": "0" }}>
            <IonInput
              label="Curso"
              labelPlacement="floating"
              value={curso}
              placeholder="Ej: Ionic"
              onIonInput={(e) => setCurso(e.detail.value ?? "")}
            />
          </IonItem>
        </IonList>

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={handleWrite}
          disabled={loading || !nombre || !curso}
        >
          {loading ? <IonSpinner name="crescent" /> : "Guardar Archivo"}
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          color="success"
          className="ion-margin-top"
          onClick={handleRead}
          disabled={loading}
        >
          {loading ? <IonSpinner name="crescent" /> : "Leer Archivo"}
        </IonButton>

        {error && (
          <IonText color="danger">
            <p style={{ fontSize: "13px", marginTop: "12px" }}>Error: {String(error)}</p>
          </IonText>
        )}

        {readResult && (
          <>
            <h3 style={{ fontSize: "15px", marginTop: "24px", fontWeight: 600 }}>Contenido leído:</h3>
            <pre
              style={{
                background: "#f4f6fa",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "13px",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {JSON.stringify(readResult, null, 2)}
            </pre>
          </>
        )}
      </IonContent>
    </IonPage>
  );
}