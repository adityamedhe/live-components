import React, { CSSProperties } from 'react';
import { Container, Row, Col } from 'reactstrap';

import { Feed } from './components/Feed';
import { IStyles } from './interfaces/types';

export class App extends React.Component {
  render() {
    return (
      <Container fluid style={styles.page}>
        <Row>
          <Col style={styles.header}>
            <h1 style={{ fontSize: 48 }}>The Corporate Express</h1>
            <h5>Bite-sized news from the industry, at a glance</h5>
          </Col>
        </Row>
        <hr />
        <Row className="mt-5">
          <Col>
            <Feed />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;

const styles: IStyles = {
  page: {
    padding: '20px 100px',
  },
  header: {
    textAlign: 'center',
  },
};
