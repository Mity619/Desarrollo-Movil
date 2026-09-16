import { IonSpinner } from "@ionic/react";

interface LoaderProps {
    message?: string;
}

function Loader({ message = "Cargando..." }: LoaderProps) {
    return (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
            <IonSpinner name="crescent" />
            <p>{message}</p>
        </div>
    );
}

export default Loader;