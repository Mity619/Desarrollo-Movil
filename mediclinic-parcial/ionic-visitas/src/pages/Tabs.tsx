import {
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet
} from '@ionic/react';
import { calendar, people, person } from 'ionicons/icons';
import { Route, Redirect } from 'react-router';
import Visitas from './Visitas';
import VisitaDetalle from './VisitaDetalle';
import PacientesTab from './Pacientes';
import Perfil from './Perfil';

export default function Tabs() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/visitas" component={Visitas} />
        <Route exact path="/tabs/visitas/:id" component={VisitaDetalle} />

        <Route exact path="/tabs/pacientes" component={PacientesTab} />
        <Route exact path="/tabs/perfil" component={Perfil} />

        <Route exact path="/tabs">
          <Redirect to="/tabs/visitas" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="visitas" href="/tabs/visitas">
          <IonIcon icon={calendar} /><IonLabel>Visitas</IonLabel>
        </IonTabButton>
        <IonTabButton tab="pacientes" href="/tabs/pacientes">
          <IonIcon icon={people} /><IonLabel>Pacientes</IonLabel>
        </IonTabButton>
        <IonTabButton tab="perfil" href="/tabs/perfil">
          <IonIcon icon={person} /><IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}