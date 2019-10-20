import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import { Feed } from './components/Feed';
import { IStyles } from './interfaces/types';

export class App extends React.Component {
  render() {
    return (
      <Container fluid style={styles.page}>
        <Row>
          <Col></Col>
          <Col style={styles.header}>
            <h1 style={{ fontSize: 48 }}>The Corporate Express</h1>
            <h5>Bite-sized news from the industry, at a glance</h5>
          </Col>
          <Col style={styles.infoCol}>
            A test project created by Aditya Medhe (2017HT13165) for
            demonstration of <b>LiveComponents</b>, the dissertation project for
            final semester WILP. <br />{' '}
            <i>
              All data and figures are dummy and do not represent real world
            </i>
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
  infoCol: {
    color: 'grey',
    textAlign: 'right',
  },
};
