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
    this.props.subscribeToEntity('5da54d7388258b62ea8633b4');
  }

  render() {
    const { entity } = this.props;

    if (!entity) {
      return null;
    }

    return (
      <div style={divStyle}>
        <div style={{ fontSize: 24, fontWeight: 'bold' }}>{entity.name}</div>
        <i>{entity.address}</i>
      </div>
    );
  }
}

export default makeComponentLive<IRestaurant, IAppProps>({
  liveComponentServerUri: 'ws://localhost:5000',
})(App);

const divStyle = {
  border: '1px grey solid',
  padding: '20px 40px',
  backgroundColor: '#efefef',
  display: 'inline-block',
  borderRadius: 4,
  boxShadow: '1px 1px 1px grey',
};
