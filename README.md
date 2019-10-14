# Live Components
### BITS Pilani WILP Dissertation
### Submitted by: Aditya Medhe (2017HT13165)

---

## Purpose 
- To define a framework that has components at each layer of the web/mobile application architecture, that communicate with each other and allow the developers to integrate real-time capabilities into the application.
- To make the communication within these components as well as the services provided by the components, interface or contract based so that concrete implementations can be switched transparently and independently at each layer, to provide for technological differences.
- To not require a major architectural re-work when such a framework is integrated into the application, rather it should be though of as an “add-on” capability that does not affect existing components.
- To be cognizant of the performance and responsiveness considerations of the final applications when such a framework is used to add real-time capabilities.

## Design principle
- This repository contains a set of implementations for each of the `EntityStoreWatchManager` , `ClientManager`, and `LiveComponentClient` specifications.
- Each implementation lives in its own module in the `packages/` directory.
- Since we are keen on having everything in the project contract/interface based so that concrete implementations may be switched transparently, we define an additional API module that contains nothing but the interfaces. All the code is written referencing these interfaces, never in the code do we refer to actual implementations. The said API module lives under the directory `live-components-api/`.
- Each directory is a separate NPM module that can be published and consumed independently. We recommend as a best practice to use the interfaces defined in the API to invoke the functionalities instead of using concrete implementation references.

## Components
### Core API Package `(live-components-api)`
- This package contains the interfaces that document the contracts and the message structures that the components of the system use to communicate within themselves and also to the external world.

### Entity Store Watch Manager 
- The `EntityStoreWatchManager` is a specification that is responsible for watching an entity store and taking some action whenever an entity changes. In the JavaScript implementation of `EntityStoreWatchManager`, we expect it to raise specified events with predefined message payload structures whenever an entity is changed.
- We have built an instance implementation of the `EntityStoreWatchManager` that supports MongoDB and watches over a MongoDB collection. It resides in the module named `entitystore-watch-manager-mongo`.

### Client Manager
- The `ClientManager` is a specification for a component that listens to an `EntityStoreWatchManager`, and also maintains communications with interested clients to communicate the changes it receives from the `EntityStoreWatchManager`.
- The sample implementation that we have developed in this project (`ClientManagerSocketIO`) uses the popular Socket.IO library, which internally uses WebSockets to communicate with clients in realtime. Since it is one of the most popular and easy-to-use libraries to implement two-way realtime communication with the browser, it was chosen to have the sample implementation of `ClientManager` using Socket.IO.
- It exposes an endpoint that allows clients to connect with using TCP and subscribe/unsubscribe to/from changes to the entities by specifying the ID of the entity that they are interested in.
- All the communication messages between the client and the client manager is documented using message format contracts in the `live-components-api` package.
- The `ClientManagerSocketIO` maintains the list of clients interested in changes to an entity and when the entity changes, emits a broadcase event to all the interested clients.

### Test Server Application
- The test application that uses the implementations of `EntityStoreWatchManager` and `ClientManager` is located in the `test-server` directory. It is an illustrative application that imports both the packages, configures them to work together to serve client requests for listening to entity changes.

### User Interface Agent
- This will be a client side library that knows how to communicate with a specific implementation of `ClientManager` and provide abstractions to listen and respond to entity changes in the entity store by updating the user interface in the browser.
- We plan to do a sample implementation using ReactJS and SocketIO client libraries. In that way we can create a base React component that knows how to communicate with the server and get the entity changes and then allow the programmer to extend such a component so that they may provide custom UI using the data retrieved from the server. Refer ReactJS docs for more details.

---

TODO:

- [X] Fix types -- add generics
- [ ] Loading prop to be injected in wrapped component
- [ ] Support initial retrieval so that current value is displayed even before first change
- [ ] Enhance and create a meaningful `test-server` and `test-client`
