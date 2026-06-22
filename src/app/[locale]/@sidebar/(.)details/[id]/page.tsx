import styles from './page.module.scss';

import CharacterDetailsClient from '@/components/CharacterDetails/CharacterDetailsClient';
import { getCharacterById } from '@/lib/api/characters';

export default async function CharacterDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const numericId = Number(id);

  const data = await getCharacterById(numericId);

  return (
    <div className={styles.detailsPanel}>
      <CharacterDetailsClient data={data} />
    </div>
  );
}
