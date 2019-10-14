import React from 'react';
import { LiveComponentEntity } from 'live-components-api';
import {
  ILiveComponentHocProps,
  makeComponentLive,
} from 'ui-agent-react-socketio';

export interface IRestaurant extends LiveComponentEntity {
  name: string;
  address: string;
}

export interface IAppProps {
  inputNumber?: number;
}

export class App extends React.Component<
  ILiveComponentHocProps<IRestaurant> & IAppProps
  > {
  componentDidMount() {
    this.props.subscribeToEntity('5da3f612857f9952f114c231');
  }

  render() {
    const { entity } = this.props;

    if (!entity) {
      return null;
    }

    return (
      <div style={{ border: '1px grey solid', padding: 20, display: 'inline-block', }}>
        <div style={{ fontSize: 24 }}>{entity.name}</div>
        <i>{entity.address}</i>
      </div>
    );
  }
}

export default makeComponentLive<IRestaurant, IAppProps>({
  liveComponentServerUri: 'ws://localhost:5000',
})(App);
