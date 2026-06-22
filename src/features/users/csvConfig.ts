import { FileItem } from '@/components/SelectionActionBar/types';
import { CSVColumnConfig } from '@/lib/utils/types';

export const userCsvConfig: CSVColumnConfig<FileItem>[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
  { key: 'species', label: 'Species' },
  { key: 'url', label: 'url' },
];
