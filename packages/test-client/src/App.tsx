import React from 'react';
import {
  ILiveComponentHocProps,
  makeComponentLive,
} from 'ui-agent-react-socketio';

export interface IRestaurant {
  name: string;
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

    return (
      <div>
        Restaurant's name is <b>{entity && entity.name}</b>
      </div>
    );
  }
}

export default makeComponentLive<IRestaurant, IAppProps>({
  liveComponentServerUri: 'ws://localhost:5000',
})(App);
