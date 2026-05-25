import type { RefObject } from 'react';

import type { CSVColumnConfig } from './types';

export const downloadCSV = <T extends Record<string, unknown>>(
  data: T[],
  config: CSVColumnConfig<T>[],
  filename: string,
  linkRef: RefObject<HTMLAnchorElement | null>
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

  const csvContent = '\ufeff' + [headersRow, ...dataRows].join('\n');

  const blob: Blob = new Blob([csvContent], {
    type: 'text/csv;charset=utf-8;',
  });
  const url: string = URL.createObjectURL(blob);

  const link = linkRef.current;

  if (link) {
    link.href = url;

    link.download = filename;

    link.click();
  }

  URL.revokeObjectURL(url);
};
