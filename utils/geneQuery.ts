import { decode, encodeURI } from 'js-base64';

import { Maybe } from '@/interfaces/common';
import { GeneId } from '@/interfaces/gene';

const ID_SEPARATOR = ',';

export function encodeGeneIdsToQuery(geneIds: Maybe<GeneId>[]): string | null {
  try {
    const hashedGenes = encodeURI(geneIds.join(ID_SEPARATOR));

    return hashedGenes;
  } catch (err) {
    console.warn('failed to encode gene ids', err);
    return null;
  }
}

export function decodeGeneIdsFromQuery(
  query: string,
  idsLength: number
): GeneId[] | null {
  try {
    const geneIdsString = decode(query);
    const geneIds = geneIdsString.split(ID_SEPARATOR);

    // invalid length
    if (geneIds.length !== idsLength) {
      return null;
    }

    return geneIds as GeneId[];
  } catch (err) {
    console.warn('failed to decode gene ids', err);
    return null;
  }
}
