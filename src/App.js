import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import AppLayout from './components/Layout/appLayout-component';
import AllSongs from './components/AllSongs/allSongs-component';
import Playlists from './components/Playlists/playlists-component';
import PlaylistDetails from './components/PlaylistDetails/playlistDetails-component';
import CenteredTabs from './components/Tabs/tabs-component';

const App = ({ history }) => {
  return (
    <AppLayout>
      <div style={{ margin: 10 }}>
        <CenteredTabs history={history} />
        <Switch>
          <Route exact path='/songs' component={AllSongs} />
          <Route exact path='/playlists' component={Playlists} />
          <Route exact path='/playlists/:id' component={PlaylistDetails} />
          <Redirect from='*' to='/songs' />
        </Switch>
      </div>
    </AppLayout>
  );
}

export default withRouter(App);