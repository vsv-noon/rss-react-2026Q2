import type { FetchedCharacter } from '@/types/types';

export type ResultListProps = {
  fetchedCharacter: FetchedCharacter | null;
  isLoading: boolean;
};
