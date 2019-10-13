/**
 * A single entity in the entity store. We need it to have
 * at least one mandatory field, i.e. the entity ID. This interface
 * documents the same contract.
 */
export interface Entity {
  id: string;
}

/**
 * A namespace that contains the message structures for the payloads that
 * will come along with the events fired from the EntityStoreWatchManager.
 */
export namespace EntityStoreWatchManagerEventPayloads {
  /**
   * Message that is fired when the store detects that an entity has changed.
   */
  export interface EntityChanged {
    /**
     * By this we mean the entity can be of any shape but it mandatorily
     * needs to have an ID which is defined in the interface Entity.
     *
     * TODO: Find out whether this is the correct way to enforce such a contract.
     */
    entity: Entity & any;
    metadata?: any;
  }
}

/**
 * An interface documenting the various events that the
 * EntityStoreWatchManager can fire.
 */
export interface EntityStoreWatchManagerEvents {
  entityChanged: EntityStoreWatchManagerEventPayloads.EntityChanged;
}

/**
 * We expose this EntityStoreWatchManager that allows to add or remove collections from the watch.
 * It does not deal with the subscriptions or user side of things, it's job is only to
 * watch (or stop watching) a collection, and inform the connected subscription manager
 * when an entity has changed, stating the new entity
 */
export interface EntityStoreWatchManager {
  on<K extends keyof EntityStoreWatchManagerEvents>(
    s: K,
    listener: (handler: EntityStoreWatchManagerEvents[K]) => void,
  ): void;
  resumeWatch: () => void;
  pauseWatch: () => void;
}

/**
 * The component that deals with clients and handles requests for subscribing/unsubscribing them
 * from entities. Internally maintains a client entity mapping. Exposes a implementation specific
 * API and transport to exchange subscription/unsubscription messages and actual data changes
 */
export interface ClientManager {
  setEntityStoreWatchManager: (
    entityStoreWatchManager: EntityStoreWatchManager,
  ) => void;
}

/**
 * A namespace which defines the contract for the various messages that can
 * be received from the client. This interface is kept in the API and not left
 * to the discretion of the individual implementations of `ClientManager`, because
 * we want to enforce a standard contract for client to send messages.
 *
 * TODO: Move this into another API package that is exclusively for the client side
 * of Live Components. That way client apps can have access to only the relevant interfaces
 * instead of getting both the server and client side interfaces.
 */
export namespace ClientMessages {
  export interface SubscribeToEntity {
    entityId: string;
  }

  export interface UnsubscribeFromEntity {
    entityId: string;
  }

  export interface EntityChanged<T> {
    entity: T;
  }
}
