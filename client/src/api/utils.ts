import { InfiniteData } from '@tanstack/react-query';
import { PaginatedContainer } from './types';

export function flatMapPages<T = any>(data: InfiniteData<PaginatedContainer<T>, number>): T[] {
  return data.pages.flatMap(page => page.results);
}
