import { ATTACK_TYPE } from '@/constants/attackType';
import { GENE_TYPE } from '@/constants/gene';
import { Maybe } from '@/interfaces/common';
import { Gene, GeneMatchResult, GeneRow, GeneTable } from '@/interfaces/gene';

/**
 * Check if all the gene types are matched
 */
const areGeneTypesMatch = (genes: Maybe<Gene>[]): GENE_TYPE | null => {
  // rainbow gene cannot be the sample
  const sampleGeneType =
    genes[0]?.type === GENE_TYPE.RAINBOW ? genes[1]?.type : genes[0]?.type;

  const isGeneTypeMatched = genes.every((gene) => {
    if (!gene) {
      return false;
    }

    // 🌈 gene
    if (gene.type === GENE_TYPE.RAINBOW) {
      return true;
    }

    return gene.type === sampleGeneType;
  });

  return isGeneTypeMatched ? sampleGeneType ?? null : null;
};

/**
 * Check if all the attack types are matched
 */
const areAttackTypesMatch = (genes: Maybe<Gene>[]): ATTACK_TYPE | null => {
  // rainbow gene cannot be the sample
  const sampleAttackType =
    genes[0]?.attackType === ATTACK_TYPE.RAINBOW
      ? genes[1]?.attackType
      : genes[0]?.attackType;

  const isAttackTypeMatched = genes.every((gene) => {
    if (!gene) {
      return false;
    }

    // 🌈 gene
    if (gene.attackType === ATTACK_TYPE.RAINBOW) {
      return true;
    }

    return gene.attackType === sampleAttackType;
  });

  return isAttackTypeMatched ? sampleAttackType ?? null : null;
};

/**
 * Rotate 90degree, turn columns to rows
 */
const rotateTable = (table: GeneTable) => {
  return table.map((row, i) =>
    row.map((_, j) => table[table.length - 1 - j][i])
  );
};

/**
 * Match each row of genes
 */
export const matchHorizontalGenes = (table: GeneTable) => {
  return table.reduce<{ [index: number]: GeneMatchResult }>(
    (result, row, index) => {
      return {
        ...result,
        [index]: {
          geneType: areGeneTypesMatch(row),
          attackType: areAttackTypesMatch(row),
        },
      };
    },
    {}
  );
};

/**
 * Match each column of genes
 */
export const matchVerticalGenes = (table: GeneTable) => {
  const rotatedTable = rotateTable(table);
  return matchHorizontalGenes(rotatedTable);
};

/**
 * Match diagonal axis (left and right) of genes
 */
export const matchDiagonalGenes = (table: GeneTable) => {
  const diagonalLeft: GeneRow = [];
  const diagonalRight: GeneRow = [];

  for (let i = 0; i < table.length; i++) {
    diagonalLeft.push(table[i][i]);
    diagonalRight.push(table[i][table.length - i - 1]);
  }

  return matchHorizontalGenes([diagonalLeft, diagonalRight]);
};
