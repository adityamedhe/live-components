import * as React from 'react';
import Axios from 'axios';
import { ICompany } from '../interfaces';
import { IStyles } from '../interfaces/types';
import { NewsList } from './NewsList';
import { StockInfo } from './StockInfo';

export interface ICompanyCardProps {
  symbol: string;
}

export interface ICompanyCardState {
  loading: boolean;
  companyInfo?: ICompany;
}

export class CompanyCard extends React.Component<
  ICompanyCardProps,
  ICompanyCardState
> {
  state: ICompanyCardState = {
    loading: false,
  };

  async componentDidMount() {
    const { symbol } = this.props;

    this.setState({ loading: true });
    const response = await Axios.get<ICompany>(
      `http://localhost:5000/company/${symbol}`,
    );

    this.setState({ loading: false, companyInfo: response.data });
  }

  render() {
    const { companyInfo } = this.state;
    if (!companyInfo) {
      return null;
    }

    const { name, news, stockSymbol, logo } = companyInfo;

    return (
      <div style={styles.container}>
        <div
          style={{
            padding: 15,
          }}
        >
          <img src={logo} style={{ height: 45, float: 'right' }} alt="" />
          <h3 style={{ display: 'inline-block' }}>{name}</h3>&nbsp;
          <span>({stockSymbol})</span>
        </div>
        <StockInfo />
        <div style={{ padding: 15 }}>
          <NewsList newsList={news} />
        </div>
      </div>
    );
  }
}

const styles: IStyles = {
  container: {
    color: '#343434',
    marginBottom: '2em',
    backgroundColor: '#ebf6ff',
  },
};
