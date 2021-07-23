import React, { FC, memo, useMemo } from 'react';
import styled from 'styled-components';

import { GeneTable } from '../interfaces/gene';
import {
  checkDiagonalGenes,
  checkHorizontalGenes,
  checkVerticalGenes,
} from '../utils';
import EmptyGene from './EmptyGene';
import Gene from './Gene';

const GENE_SIZE = 8; // in rem

const Grid = styled.div<{ $column: number }>`
  display: flex;
  display: grid;
  margin: 3rem auto;
  grid-template-columns: repeat(${(props) => props.$column}, min-content);
  column-gap: 1rem;
  row-gap: 1em;
`;

interface Props {
  table: GeneTable;
}

const Bingo: FC<Props> = ({ table }) => {
  const horizontalResult = useMemo(() => checkHorizontalGenes(table), [table]);
  const verticalResult = useMemo(() => checkVerticalGenes(table), [table]);
  const diagonalResult = useMemo(() => checkDiagonalGenes(table), [table]);

  return (
    <Grid $column={table.length}>
      {table.map((row, rowIndex) => {
        return row.map((slot, columnIndex) => {
          const slotKey = `slot.${slot?.id ?? `${rowIndex}.${columnIndex}`}`;

          if (!slot) {
            return <EmptyGene key={slotKey} $size={GENE_SIZE} />;
          }

          let isGeneTypeMatch =
            horizontalResult[rowIndex]?.geneType === slot.type ||
            verticalResult[columnIndex]?.geneType === slot.type;

          let isAttackTypeMatch =
            horizontalResult[rowIndex]?.attackType === slot.attackType ||
            verticalResult[columnIndex]?.attackType === slot.attackType;

          if (diagonalResult.ids.includes(slot.id)) {
            isGeneTypeMatch =
              diagonalResult.left.geneType === slot.type ||
              diagonalResult.right.geneType === slot.type ||
              isGeneTypeMatch;
            isAttackTypeMatch =
              diagonalResult.left.attackType === slot.attackType ||
              diagonalResult.right.attackType === slot.attackType ||
              isAttackTypeMatch;
          }

          return (
            <Gene
              key={slotKey}
              size={GENE_SIZE}
              id={slot.id}
              geneType={slot.type}
              attackType={slot.attackType}
              isGeneTypeMatch={isGeneTypeMatch}
              isAttackTypeMatch={isAttackTypeMatch}
            />
          );
        });
      })}
    </Grid>
  );
};

export default memo(Bingo);
