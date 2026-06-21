import { CSVColumnConfig } from '@/lib/utils/types';

export const convertToCsv = <T extends Record<string, unknown>>(
  data: T[],
  config: CSVColumnConfig<T>[]
) => {
  if (!data || !data.length || !config || !config.length) return;

  const headersRow: string = config.map((col) => col.label).join(',');

  const dataRows: string[] = data.map((item) => {
    return config
      .map((col) => {
        const value = item[col.key] ?? '';

        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(',');
  });

  return '\ufeff' + [headersRow, ...dataRows].join('\n');
};
