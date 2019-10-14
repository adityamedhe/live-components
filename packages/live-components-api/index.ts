/**
 * This interface documents what we mandatorily want to be present in an
 * entity that is to be transported using the LiveComponents platform.
 */
export interface LiveComponentEntity {
  // `id` is intentionally `any` as its data type can vary across applications.
  id: any;
}

/**
 * A namespace that contains the message structures for the payloads that
 * will come along with the events fired from the EntityStoreWatchManager.
 */
export namespace EntityStoreWatchManagerEventPayloads {
  /**
   * Message that is fired when the store detects that an entity has changed.
   */
  export interface EntityChanged<T extends LiveComponentEntity> {
    /**
     * By this we mean the entity can be of any shape but it mandatorily
     * needs to have an ID which is defined in the interface Entity.
     *
     * TODO: Find out whether this is the correct way to enforce such a contract.
     */
    entity: T;
    metadata?: any;
  }
}

/**
 * An interface documenting the various events that the
 * EntityStoreWatchManager can fire.
 */
export interface EntityStoreWatchManagerEvents<T extends LiveComponentEntity> {
  entityChanged: EntityStoreWatchManagerEventPayloads.EntityChanged<T>;
}

/**
 * We expose this EntityStoreWatchManager that allows to add or remove collections from the watch.
 * It does not deal with the subscriptions or user side of things, it's job is only to
 * watch (or stop watching) a collection, and inform the other components through events
 * when an entity has changed, stating the new entity
 */
export interface EntityStoreWatchManager<T extends LiveComponentEntity> {
  on<K extends keyof EntityStoreWatchManagerEvents<T>>(
    s: K,
    listener: (handler: EntityStoreWatchManagerEvents<T>[K]) => void,
  ): void;
  resumeWatch: () => void;
  pauseWatch: () => void;
  getEntity: (entityId: any) => Promise<T | null>;
}

/**
 * The component that deals with clients and handles requests for subscribing/unsubscribing them
 * from entities. Internally maintains a client entity mapping. Exposes a implementation specific
 * API and transport to exchange subscription/unsubscription messages and actual data changes
 */
export interface ClientManager<T extends LiveComponentEntity> {
  setEntityStoreWatchManager: (
    entityStoreWatchManager: EntityStoreWatchManager<T>,
  ) => void;
}

/**
 * A namespace which defines the contract for the various messages that can
 * be sent to/received from the client. This interface is kept in the API and not left
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

  export interface EntityChanged<T extends LiveComponentEntity> {
    entity: T;
  }
}
