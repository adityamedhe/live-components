import React from 'react';
import {
  ILiveComponentHocProps,
  makeComponentLive,
} from 'ui-agent-react-socketio';

export interface IRestaurant {
  name: string;
}

export interface OwnProps {
  inputNumber: number;
}

export class App extends React.Component<
  ILiveComponentHocProps<IRestaurant> & OwnProps
> {
  componentDidMount() {
    this.props.subscribeToEntity('5da31c373e73f02575b09f13');
  }

  render() {
    return <div>{JSON.stringify(this.props.entity)}</div>;
  }
}

export default makeComponentLive({
  liveComponentServerUri: 'ws://localhost:5000',
})(App);
