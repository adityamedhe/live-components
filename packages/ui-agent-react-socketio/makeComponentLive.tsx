import * as React from 'react';
import io from 'socket.io-client';
import { ClientMessages } from 'live-components-api';

/**
 * The shape of the props that are injected into the wrapped component by this HOC.
 */
export interface ILiveComponentHocProps<T> {
  subscribeToEntity: (entityId: string) => void;
  entity?: T | null;
}

export interface ILiveComponentState<T> {
  entity?: T | null;
}

/**
 * The shape of the props to be passed while wrapping the component into the HOC.
 * The Live Components server URL is the only option here for now.
 *
 * This is the correct place to do such things, as we know that one URI is responsible
 * for serving entities for one type, which will be consumed by the component. This
 * cannot be changed dynamically and hence should be configured statically along with
 * the component.
 */
export interface ILiveComponentConfigurationProps {
  liveComponentServerUri: string;
}

export const makeComponentLive = <EntityType extends {}, OwnProps extends {}>(
  configuration: ILiveComponentConfigurationProps,
) => (
  PassedComponent: React.ComponentClass<
    OwnProps & ILiveComponentHocProps<EntityType>
  >,
) => {
  return class extends React.Component<
    OwnProps,
    ILiveComponentState<EntityType>
  > {
    socket: SocketIOClient.Socket | null = null;

    state: ILiveComponentState<EntityType> = {
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
