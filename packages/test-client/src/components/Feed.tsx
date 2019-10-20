import * as React from 'react';
import { CompanyCard } from './CompanyCard';

export class Feed extends React.Component {
  companySymbols = ['GOOG', 'MSFT', 'AAPL', 'FB2A', 'IBM', 'BMW'].reverse();

  render() {
    return (
      <div style={{ columnCount: 3, columnGap: '2em' }}>
        {this.companySymbols.map(symbol => (
          <div style={{ display: 'inline-block' }}>
            <CompanyCard symbol={symbol} />
          </div>
        ))}
      </div>
    );
  }
}
