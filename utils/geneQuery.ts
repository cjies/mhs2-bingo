import { decode, encodeURI } from 'js-base64';

import { EMPTY_GENE_TABLE } from '@/constants/gene';
import { Maybe } from '@/interfaces/common';
import { Gene, GeneId, GeneTable } from '@/interfaces/gene';

import deepClone from './deepClone';

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

export function decodeGeneTableFromQuery(
  query: string,
  allGenes: Gene[]
): { table: GeneTable; valid: boolean } {
  const defaultGeneTable = deepClone(EMPTY_GENE_TABLE);
  const totalGenesAmount = defaultGeneTable.flat().length;
  const tableColumnsAmount = defaultGeneTable[0].length;

  const geneIds = decodeGeneIdsFromQuery(query, totalGenesAmount);
  if (!geneIds) {
    return {
      table: defaultGeneTable,
      valid: !query,
    };
  }

  geneIds.forEach((geneId, index) => {
    const validGene = allGenes.find(({ id }) => id === geneId);

    if (!validGene) {
      return;
    }

    const colIndex = index % tableColumnsAmount;
    const rowIndex = Math.ceil((index + 1) / tableColumnsAmount) - 1;
    defaultGeneTable[rowIndex][colIndex] = validGene;
  });

  return {
    table: defaultGeneTable,
    valid: true,
  };
}
