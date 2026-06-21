export type CSVColumnConfig<T> = {
  key: keyof T;
  label: string;
};

export type RickAndMortyApiError = {
  error: string;
};
