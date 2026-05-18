import type { ApiFetchProps } from './types';

export async function apiFetch({ id, searchString, page }: ApiFetchProps) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const baseOrigin = baseUrl.startsWith('http')
    ? undefined
    : window.location.origin;
  const url = new URL(`${baseUrl}/character/`, baseOrigin);

  try {
    if (page) {
      url.searchParams.set('page', page);
    }

    if (searchString) {
      url.searchParams.set('name', searchString);
    } else if (id) {
      url.pathname += id;
    }

    const response = await fetch(url);

    if (!response.ok && response.status !== 404) {
      throw new Error(`${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    const typedError = error as Error;
    throw new Error('Failed to fetch characters', typedError);
  }
}
