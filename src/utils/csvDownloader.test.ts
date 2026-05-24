import type { RefObject } from 'react';

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { downloadCSV } from './csvDownloader';

import type { CSVColumnConfig } from './types';

describe('downloadCSV', () => {
  beforeEach(() => {
    globalThis.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
    globalThis.URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const createMockRef = (
    linkElement: HTMLAnchorElement | null
  ): RefObject<HTMLAnchorElement | null> => ({
    current: linkElement,
  });

  type TestData = { id: number; name: string; role?: string };
  const mockConfig: CSVColumnConfig<TestData>[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
  ];

  it('should return early and do nothing if data or config is empty', () => {
    const linkClickSpy = vi.fn();
    const mockLink = { click: linkClickSpy } as unknown as HTMLAnchorElement;
    const linkRef = createMockRef(mockLink);
    const blobSpy = vi.spyOn(globalThis, 'Blob');

    downloadCSV([], mockConfig, 'test.csv', linkRef);

    downloadCSV(
      [{ id: 1, name: 'Rick' }],
      [],
      '1_selectedCharacters.csv',
      linkRef
    );

    expect(linkClickSpy).not.toHaveBeenCalled();
    expect(blobSpy).not.toHaveBeenCalled();
  });

  it('should generate CSV and revoke URL even if linkRef.current is null', () => {
    const mockData: TestData[] = [{ id: 1, name: 'Rick' }];
    const linkRef = createMockRef(null);
    const blobSpy = vi.spyOn(globalThis, 'Blob');

    expect(() => {
      downloadCSV(mockData, mockConfig, '1_selectedCharacters.csv', linkRef);
    }).not.toThrow();

    expect(blobSpy).toHaveBeenCalled();
  });
});
