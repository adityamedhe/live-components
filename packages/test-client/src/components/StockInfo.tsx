import * as React from 'react';
import { Line, LineChart, CartesianGrid } from 'recharts';
import {
  makeComponentLive,
  ILiveComponentHocProps,
} from 'ui-agent-react-socketio';

import { IStyles } from '../interfaces/types';
import { IStockInfo, StockTrendDirection } from '../interfaces';

export interface IStockInfoProps {
  symbol: string;
}

export interface IStockInfoState {
  values: number[];
}

export class StockInfoView extends React.Component<
  IStockInfoProps & ILiveComponentHocProps<IStockInfo>,
  IStockInfoState
> {
  state: IStockInfoState = {
    values: [],
  };

  componentDidMount() {
    const { subscribeToEntity, symbol } = this.props;
    subscribeToEntity(symbol);
  }

  componentDidUpdate(
    nextProps: IStockInfoProps & ILiveComponentHocProps<IStockInfo>,
  ) {
    const { entity } = this.props;

    if (!nextProps.entity || !nextProps.entity.currentValue) {
      return;
    }

    if (
      nextProps.entity.currentValue === ((entity && entity.currentValue) || 0)
    ) {
      return;
    }

    this.setState(prevState => ({
      values: [...prevState.values, nextProps.entity!.currentValue],
    }));
  }

  render() {
    const { values } = this.state;
    const { entity } = this.props;

    const valuesForChart = values.map(value => ({ value }));

    if (!entity) {
      return null;
    }

    const { currentValue, info, trend } = entity;

    return (
      <div style={styles.container}>
        <h5>
          Stock{' '}
          <span style={{ fontSize: 12, color: 'blue', fontWeight: 'bold' }}>
            LIVE
          </span>
        </h5>
        <LineChart data={valuesForChart} width={500} height={200}>
          <Line dataKey="value" strokeWidth={2} dot={false} type="basis"></Line>
        </LineChart>
        <h1 style={{ display: 'inline-block' }}>{currentValue.toFixed(2)}</h1>{' '}
        {this.renderTrendDisplay(trend)}
        <h5 style={{ color: 'grey' }}>
          Open: {info.open} Low: {info.low}, High: {info.high}
        </h5>
      </div>
    );
  }

  renderTrendDisplay = (trend: IStockInfo['trend']) => {
    const isGrowing = trend.direction === StockTrendDirection.UP;

    return (
      <span
        style={{
          display: 'inline-flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: 25, color: isGrowing ? 'lightgreen' : 'red' }}>
          {isGrowing ? '⬆' : '⬇'}
        </span>
        <span style={{ fontSize: 20 }}>{trend.percentage.toFixed(2)}%</span>
      </span>
    );
  };
}

export const StockInfo = makeComponentLive<IStockInfo, IStockInfoProps>({
  liveComponentServerUri: 'ws://localhost:5001/',
})(StockInfoView);

const styles: IStyles = {
  container: {
    padding: 15,
    backgroundColor: '#c9f3ff',
    width: '100%',
  },
};
