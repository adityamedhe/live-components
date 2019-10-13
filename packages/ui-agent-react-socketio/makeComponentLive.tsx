import * as React from 'react';
import io from 'socket.io-client';
import { ClientMessages } from 'live-components-api';

export interface ILiveComponentHocProps<T> {
  subscribeToEntity: (entityId: string) => void;
  entity?: T;
}

export interface ILiveComponentConfigurationProps {
  liveComponentServerUri: string;
}

export const makeComponentLive = (
  configuration: ILiveComponentConfigurationProps,
) => (PassedComponent: React.ComponentClass<any>) => {
  return class extends React.Component {
    socket: SocketIOClient.Socket | null = null;

    state = {
      entity: null,
    };

    constructor(props: any) {
      super(props);
      const { liveComponentServerUri } = configuration;

      this.socket = io(liveComponentServerUri);
    }

    subscribeToEntity = (entityId: string) => {
      if (!this.socket) {
        console.error(
          'LiveComponents UI Agent :: SocketIO not initialized yet.',
        );

        return;
      }

      this.socket.emit('subscribeToEntity', {
        entityId,
      });

      this.socket.on(
        'entityChanged',
        (payload: ClientMessages.EntityChanged<any>) =>
          this.setState({ entity: payload.entity }),
      );
    };

    render() {
      const { entity } = this.state;

      return (
        <PassedComponent
          {...this.props}
          subscribeToEntity={this.subscribeToEntity}
          entity={entity}
        />
      );
    }
  };
};
