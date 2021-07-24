import React, { FC, memo, useMemo } from 'react';
import styled from 'styled-components';

import { GeneTable, SelectedGene } from '@/interfaces/gene';
import {
  checkDiagonalGenes,
  checkHorizontalGenes,
  checkVerticalGenes,
} from '@/utils';

import EmptyGene from './EmptyGene';
import Gene from './Gene';

const GENE_SIZE = 8; // in rem

const Grid = styled.div<{ $column: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$column}, min-content);
  grid-auto-rows: min-content;
  column-gap: 2rem;
  row-gap: 2em;
`;

interface Props {
  table: GeneTable;
  onGeneClick: (selectedGene: SelectedGene) => void;
}

const Bingo: FC<Props> = ({ table, onGeneClick }) => {
  const horizontalResult = useMemo(() => checkHorizontalGenes(table), [table]);
  const verticalResult = useMemo(() => checkVerticalGenes(table), [table]);
  const diagonalResult = useMemo(() => checkDiagonalGenes(table), [table]);

  return (
    <Grid $column={table.length}>
      {table.map((row, rowIndex) => {
        return row.map((gene, columnIndex) => {
          const geneKey = `gene.${gene?.id ?? `${rowIndex}.${columnIndex}`}`;

          const handleGeneClick = () => {
            onGeneClick({ rowIndex, columnIndex, gene });
          };

          if (!gene) {
            return (
              <EmptyGene
                key={geneKey}
                $size={GENE_SIZE}
                onClick={handleGeneClick}
              />
            );
          }

          let isGeneTypeMatch =
            horizontalResult[rowIndex]?.geneType === gene.type ||
            verticalResult[columnIndex]?.geneType === gene.type;

          let isAttackTypeMatch =
            horizontalResult[rowIndex]?.attackType === gene.attackType ||
            verticalResult[columnIndex]?.attackType === gene.attackType;

          if (diagonalResult.ids.includes(gene.id)) {
            isGeneTypeMatch =
              diagonalResult.left.geneType === gene.type ||
              diagonalResult.right.geneType === gene.type ||
              isGeneTypeMatch;
            isAttackTypeMatch =
              diagonalResult.left.attackType === gene.attackType ||
              diagonalResult.right.attackType === gene.attackType ||
              isAttackTypeMatch;
          }

          return (
            <Gene
              key={geneKey}
              size={GENE_SIZE}
              id={gene.id}
              geneType={gene.type}
              attackType={gene.attackType}
              isGeneTypeMatch={isGeneTypeMatch}
              isAttackTypeMatch={isAttackTypeMatch}
              onClick={handleGeneClick}
            />
          );
        });
      })}
    </Grid>
  );
};

export default memo(Bingo);
