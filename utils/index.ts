import { Maybe } from '../interfaces/common';
import {
  Gene,
  GeneId,
  GeneMatchResult,
  GeneRow,
  GeneTable,
} from '../interfaces/gene';

/**
 * Check if type or category is matched on each gene
 */
const areGenesMatched = (genes: Maybe<Gene>[]): GeneMatchResult => {
  const sampleGeneType = genes[0]?.type;
  const isGeneTypeMatched = genes.every((gene) => {
    if (!gene) {
      return false;
    }
    return gene.type === sampleGeneType;
  });

  const sampleAttackType = genes[0]?.attackType;
  const isAttackTypeMatched = genes.every((gene) => {
    if (!gene) {
      return false;
    }
    return gene.attackType === sampleAttackType;
  });

  return {
    geneType: isGeneTypeMatched ? sampleGeneType ?? null : null,
    attackType: isAttackTypeMatched ? sampleAttackType ?? null : null,
  };
};

/**
 * Rotate 90degree, turn columns to rows
 */
const rotateTable = (table: GeneTable) => {
  return table.map((row, i) =>
    row.map((_, j) => table[table.length - 1 - j][i])
  );
};

export const checkHorizontalGenes = (table: GeneTable) => {
  return table.reduce<{ [index: number]: GeneMatchResult }>(
    (result, row, index) => {
      return {
        ...result,
        [index]: areGenesMatched(row),
      };
    },
    {}
  );
};

export const checkVerticalGenes = (table: GeneTable) => {
  const rotatedTable = rotateTable(table);
  return checkHorizontalGenes(rotatedTable);
};

export const checkDiagonalGenes = (table: GeneTable) => {
  const diagonalLeft: GeneRow = [];
  const diagonalRight: GeneRow = [];

  for (let i = 0; i < table.length; i++) {
    diagonalLeft.push(table[i][i]);
    diagonalRight.push(table[i][table.length - i - 1]);
  }

  const idsOnDiagonalAxis = [...diagonalLeft, ...diagonalRight].reduce<
    GeneId[]
  >((ids, gene) => {
    if (gene && !ids.includes(gene.id)) {
      ids.push(gene.id);
    }

    return ids;
  }, []);
  const matchedResult = checkHorizontalGenes([diagonalLeft, diagonalRight]);

  return {
    ids: idsOnDiagonalAxis,
    left: matchedResult[0],
    right: matchedResult[1],
  };
};
