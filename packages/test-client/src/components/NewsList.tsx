import * as React from 'react';
import { INewsItem } from '../interfaces';
import { NewsItem } from './NewsItem';

export interface INewsListProps {
  newsList: INewsItem[];
}

export interface INewsListState {}

export class NewsList extends React.Component<INewsListProps, INewsListState> {
  render() {
    const { newsList } = this.props;
    return (
      <div>
        <h5>News</h5>
        {newsList.map(newsItem => (
          <NewsItem newsItem={newsItem} />
        ))}
      </div>
    );
  }
}
