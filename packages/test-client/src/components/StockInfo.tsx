import * as React from 'react';
import { IStyles } from '../interfaces/types';

export interface IStockInfoProps {}

export interface IStockInfoState {}

export class StockInfo extends React.Component<
  IStockInfoProps,
  IStockInfoState
> {
  render() {
    return (
      <div style={styles.container}>
        <h5>Stock</h5>
      </div>
    );
  }
}

const styles: IStyles = {
  container: {
    padding: 15,
    backgroundColor: '#c9f3ff',
  },
};
