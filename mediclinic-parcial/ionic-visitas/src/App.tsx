import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router';
import Login from './pages/Login';
import Tabs from './pages/Tabs';
import { getSession } from './service/storage';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

setupIonicReact();

function PrivateRoute({ component: C, ...rest }: any) {
  const session = getSession();
  return (
    <Route
      {...rest}
      render={props => session ? <C {...props} /> : <Redirect to="/login" />}
    />
  );
}

export default function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/tabs" component={Tabs} />
          <Route exact path="/">
            <Redirect to={getSession() ? '/tabs/visitas' : '/login'} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}