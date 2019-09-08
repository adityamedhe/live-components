export interface Entity {
    id: string;
}

export interface EntityStoreWatchManagerEvents {
    entityChanged: {entity: Entity & any, metadata?: any};
}

/**
 * We expose this EntityStoreWatchManager that allows to add or remove collections from the watch.
 * It does not deal with the subscriptions or user side of things, it's job is only to
 * watch (or stop watching) a collection, and inform the connected subscription manager 
 * when an entity has changed, stating the new entity
 */
export interface EntityStoreWatchManager {
    on<K extends keyof EntityStoreWatchManagerEvents>(s: K, listener: (handler: EntityStoreWatchManagerEvents[K]) => void): void;
    resumeWatch: () => void;
    pauseWatch: () => void;
};

/**
 * The component that deals with clients and handles requests for subscribing/unsubscribing them
 * from entities. Internally maintains a client entity mapping. Exposes a implementation specific
 * API and transport to exchange subscription/unsubscription messages and actual data changes
 */
export interface ClientManager {
    setEntityStoreWatchManager: (entityStoreWatchManager: EntityStoreWatchManager) => void;
    subscribe: (clientId: string, entityId: string) => void;
    unsubscribe: (clientId: string, entityId: string) => void;
}
