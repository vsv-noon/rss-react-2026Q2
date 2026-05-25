export type CSVColumnConfig<T> = {
  key: keyof T;
  label: string;
};
