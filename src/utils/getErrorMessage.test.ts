import { type SerializedError } from '@reduxjs/toolkit';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { describe, it, expect } from 'vitest';

import { getErrorMessage } from './getErrorMessage';

describe('getErrorMessage Utility', () => {
  describe('when error is undefined', () => {
    it('should return the unknown error message in Russian', () => {
      const result = getErrorMessage(undefined);
      expect(result).toBe('Произошла неизвестная ошибка');
    });
  });

  describe('when handling FetchBaseQueryError (with status)', () => {
    it('should return specific message for 404 status code', () => {
      const error: FetchBaseQueryError = { status: 404, data: {} };
      const result = getErrorMessage(error);
      expect(result).toBe(
        'Nothing matched your search. Try changing your search'
      );
    });

    it('should return specific message for 500 status code', () => {
      const error: FetchBaseQueryError = { status: 500, data: {} };
      const result = getErrorMessage(error);
      expect(result).toBe(
        "There's a server-side issue. We're fixing it now, please try again later."
      );
    });

    it('should return network connection message for FETCH_ERROR status', () => {
      const error: FetchBaseQueryError = {
        status: 'FETCH_ERROR',
        error: 'Failed to fetch',
      };
      const result = getErrorMessage(error);
      expect(result).toBe(
        'Unable to connect to the server. Check your internet connection.'
      );
    });

    it('should extract the message from data.error if status is not explicitly handled', () => {
      const error: FetchBaseQueryError = {
        status: 400,
        data: { error: 'Character not found!' },
      };
      const result = getErrorMessage(error);
      expect(result).toBe('Character not found!');
    });

    it('should fall back to a formatted status string if status is unknown and data.error is missing', () => {
      const error: FetchBaseQueryError = { status: 403, data: {} };
      const result = getErrorMessage(error);

      expect(result).toBe('An error occurred. (Status: 403)');
    });
  });

  describe('when handling SerializedError (without status)', () => {
    it('should return error.message if it is provided', () => {
      const error: SerializedError = {
        name: 'Error',
        message: 'Custom JS Exception occurred',
      };
      const result = getErrorMessage(error);
      expect(result).toBe('Custom JS Exception occurred');
    });

    it('should return standard fallback message if error.message is missing', () => {
      const error: SerializedError = { name: 'TypeError' };
      const result = getErrorMessage(error);
      expect(result).toBe('Something went wrong...');
    });
  });
});
