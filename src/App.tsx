import cityAApti from 'api/cityApi';
import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import { LoginPage } from 'features/auth/pages';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  useEffect(() => {
    cityAApti.getAll().then((response) => console.log(response));
  }, []);

  return (
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>

      <PrivateRoute path="/admin">
        <AdminLayout />
      </PrivateRoute>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
