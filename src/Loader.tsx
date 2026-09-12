import { IonSpinner } from "@ionic/react";

function Loader() {
  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <IonSpinner name="crescent" />
      <p>Cargando contactos...</p>
    </div>
  );
}

export default Loader;