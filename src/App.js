import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

const App = () => {
  return (
    <Switch>
      <Route exact path='/songs' component={TestOne} />
      <Route exact path={`/playlist`} component={TestTwo} />
      <Redirect from='*' to='/songs' />
    </Switch>
  );
}

const TestOne = ({ history }) => <div onClick={() => history.push('/playlist')}>All Songs</div>
const TestTwo = ({ history }) => <div onClick={() => history.push('/songs')}>PlayList</div>

export default withRouter(App);