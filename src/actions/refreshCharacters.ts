'use server';

import { revalidateTag } from 'next/cache';

export async function refreshCharacters() {
  revalidateTag('characters', 'max');
}
