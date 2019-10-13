import React from 'react';
import { makeComponentLive } from 'ui-agent-react-socketio';

export class App extends React.Component {
  render() {
    return <h1>Hii!</h1>;
  }
}

export default makeComponentLive(App);
