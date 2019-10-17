import * as React from 'react';

import { INewsItem } from '../interfaces';
import { IStyles } from '../interfaces/types';

export interface INewsItemProps {
  newsItem: INewsItem;
}

export interface INewsItemState {}

export class NewsItem extends React.Component<INewsItemProps, INewsItemState> {
  render() {
    const { newsItem } = this.props;
    if (!newsItem) {
      return null;
    }

    const { detail, headline, link } = newsItem;

    return (
      <div style={styles.container}>
        <h4>
          <a href={link}>{headline}</a>
        </h4>
        <div style={{ fontFamily: 'sans-serif', color: '#545454' }}>
          {detail}
        </div>
      </div>
    );
  }
}

const styles: IStyles = {
  container: {
    marginBottom: 20,
  },
};
