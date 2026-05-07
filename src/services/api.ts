const BASE_URL: string = 'https://rickandmortyapi.com/api/character/';

export async function apiFetch(searchString: string) {
  const url = new URL(BASE_URL);

  try {
    if (searchString) {
      url.searchParams.set('name', searchString);
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
