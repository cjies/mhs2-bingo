import { Maybe } from '@/interfaces/common';
import { GeneId } from '@/interfaces/gene';

import { b64ToString, stringToB64 } from './b64';

const ID_SEPARATOR = ',';

export function encodeGeneIdsToQuery(geneIds: Maybe<GeneId>[]): string | null {
  try {
    const hashedGenes = stringToB64(geneIds.join(ID_SEPARATOR));

    return hashedGenes;
  } catch (err) {
    console.warn('invalid gene ids', err);
    return null;
  }
}

export function decodeGeneIdsFromQuery(
  query: string,
  idsLength: number
): GeneId[] | null {
  try {
    const geneIdsString = b64ToString(query);
    const geneIds = geneIdsString.split(ID_SEPARATOR);

    // invalid length
    if (geneIds.length !== idsLength) {
      return null;
    }

    return geneIds as GeneId[];
  } catch (err) {
    return null;
  }
}
