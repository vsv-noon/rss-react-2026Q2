import type { ApiResponse } from '@/types/types';

export type CharactersState = {
  characters: ApiResponse | null;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
};
