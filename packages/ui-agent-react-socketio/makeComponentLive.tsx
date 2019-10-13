import * as React from 'react';

export const makeComponentLive = (
  PassedComponent: any,
): React.ComponentClass => {
  return class extends React.Component {
    render() {
      // TODO: Write logic to provide passed component with primitives for LiveComponents
      return (
        <div style={{ border: '1px solid black', padding: 10 }}>
          <PassedComponent {...this.props} />
        </div>
      );
    }
  };
};
