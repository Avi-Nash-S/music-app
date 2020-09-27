import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import AppLayout from './components/appLayout-component';
import AllSongs from './components/AllSongs/allSongs-component'
import Playlists from './components/Playlists/playlists-component'

const App = () => {
  return (
    <AppLayout>
      <Switch>
        <Route exact path='/songs' component={AllSongs} />
        <Route exact path='/playlists' component={Playlists} />
        <Redirect from='*' to='/songs' />
      </Switch>
    </AppLayout>
  );
}

export default withRouter(App);