const BASE_URL: string = 'https://rickandmortyapi.com/api/character/';

export async function apiFetch(searchString: string) {
  const url = new URL(BASE_URL);

  if (searchString) {
    url.searchParams.set('name', searchString);
  }

  const result = await fetch(url).then((response) => response.json());

  return result;
}
