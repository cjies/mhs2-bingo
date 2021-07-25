import React, { FC, memo, useMemo } from 'react';
import styled from 'styled-components';

import { GENE_BORDER_COLOR } from '@/constants/gene';
import { Maybe } from '@/interfaces/common';
import { GeneTable, SelectedGene } from '@/interfaces/gene';
import {
  matchDiagonalGenes,
  matchHorizontalGenes,
  matchVerticalGenes,
} from '@/utils/matchers';

import Gene, { EmptyGene } from '../Gene';
import { GENE_GAP, GENE_LINE_SIZE, GENE_SIZE } from './constants';
import {
  BingoDiagonalLine1,
  BingoDiagonalLine2,
  BingoHorizontalLine1,
  BingoHorizontalLine2,
  BingoHorizontalLine3,
  BingoVerticalLine1,
  BingoVerticalLine2,
  BingoVerticalLine3,
} from './lines';

const Grid = styled.div<{ $column: number }>`
  position: relative;
  display: grid;
  grid-template-columns: repeat(${(props) => props.$column}, min-content);
  grid-auto-rows: min-content;
  column-gap: ${GENE_GAP}rem;
  row-gap: ${GENE_GAP}em;
`;

const StyledEmptyGene = styled(EmptyGene)`
  border: ${GENE_LINE_SIZE / 2}rem solid ${GENE_BORDER_COLOR};
`;

const StyledGene = styled(Gene)<{ $isMatch?: boolean }>`
  border: ${GENE_LINE_SIZE / 2}rem solid ${GENE_BORDER_COLOR};
`;

interface Props {
  table: GeneTable;
  hoveredGene: Maybe<SelectedGene>;
  onGeneClick: (selectedGene: SelectedGene) => void;
  onGeneHover: (selectedGene: Maybe<SelectedGene>) => void;
}

const Bingo: FC<Props> = ({ table, hoveredGene, onGeneClick, onGeneHover }) => {
  const horizontalResult = useMemo(() => matchHorizontalGenes(table), [table]);
  const verticalResult = useMemo(() => matchVerticalGenes(table), [table]);
  const diagonalResult = useMemo(() => matchDiagonalGenes(table), [table]);

  return (
    <Grid $column={table.length}>
      {/* Lines */}
      <BingoHorizontalLine1
        $isMatch={
          !!(horizontalResult[0].geneType || horizontalResult[0].attackType)
        }
      />
      <BingoHorizontalLine2
        $isMatch={
          !!(horizontalResult[1].geneType || horizontalResult[1].attackType)
        }
      />
      <BingoHorizontalLine3
        $isMatch={
          !!(horizontalResult[2].geneType || horizontalResult[2].attackType)
        }
      />
      <BingoVerticalLine1
        $isMatch={
          !!(verticalResult[0].geneType || verticalResult[0].attackType)
        }
      />
      <BingoVerticalLine2
        $isMatch={
          !!(verticalResult[1].geneType || verticalResult[1].attackType)
        }
      />
      <BingoVerticalLine3
        $isMatch={
          !!(verticalResult[2].geneType || verticalResult[2].attackType)
        }
      />
      <BingoDiagonalLine1
        $isMatch={
          !!(diagonalResult[0].geneType || diagonalResult[0].attackType)
        }
      />
      <BingoDiagonalLine2
        $isMatch={
          !!(diagonalResult[1].geneType || diagonalResult[1].attackType)
        }
      />

      {table.map((row, rowIndex) => {
        return row.map((gene, columnIndex) => {
          const geneKey = `gene.${gene?.id ?? `${rowIndex}.${columnIndex}`}`;
          const isHovered =
            hoveredGene?.rowIndex === rowIndex &&
            hoveredGene?.columnIndex === columnIndex;

          const handleGeneClick = () => {
            onGeneClick({ rowIndex, columnIndex, gene });
          };
          const handleMouseEnter = () => {
            onGeneHover({ rowIndex, columnIndex, gene });
          };
          const handleMouseLeave = () => {
            onGeneHover(null);
          };

          if (!gene) {
            return (
              <StyledEmptyGene
                key={geneKey}
                $size={GENE_SIZE}
                $hovered={isHovered}
                onClick={handleGeneClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            );
          }

          return (
            <StyledGene
              key={geneKey}
              size={GENE_SIZE}
              geneType={gene.type}
              attackType={gene.attackType}
              hovered={isHovered}
              onClick={handleGeneClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          );
        });
      })}
    </Grid>
  );
};

export default memo(Bingo);
