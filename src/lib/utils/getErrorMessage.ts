import { type SerializedError } from '@reduxjs/toolkit';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';

import type { RickAndMortyApiError } from './types';

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  if (!error) return 'Произошла неизвестная ошибка';

  if ('status' in error) {
    switch (error.status) {
      case 404:
        return 'Nothing matched your search. Try changing your search';
      case 500:
        return "There's a server-side issue. We're fixing it now, please try again later.";
      case 'FETCH_ERROR':
        return 'Unable to connect to the server. Check your internet connection.';
      default:
        return (
          (error.data as RickAndMortyApiError)?.error ||
          `An error occurred. (Status: ${error.status})`
        );
    }
  }

  return error.message || 'Something went wrong...';
};
