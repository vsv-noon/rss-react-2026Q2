'use client';

export function downloadCsvFile(csvContent: string, filename: string) {
  const blob: Blob = new Blob([csvContent], {
    type: 'text/csv;charset=utf-8;',
  });
  const url: string = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  setTimeout(() => URL.revokeObjectURL(url), 100);
}
