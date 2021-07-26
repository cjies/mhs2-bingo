import { Grid } from 'antd';
import { FC, memo, useMemo } from 'react';
import styled from 'styled-components';

import { Maybe } from '@/interfaces/common';
import { GeneTable, SelectedGene } from '@/interfaces/gene';
import {
  matchDiagonalGenes,
  matchHorizontalGenes,
  matchVerticalGenes,
} from '@/utils/matchers';

import Gene, { EmptyGene } from '../Gene';
import {
  GENE_GAP,
  GENE_GAP_XS,
  GENE_LINE_SIZE,
  GENE_LINE_SIZE_XS,
  GENE_SIZE,
  GENE_SIZE_XS,
} from './constants';
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

const BingoGrid = styled.div<{ $column: number; $gapSize: number }>`
  position: relative;
  display: grid;
  grid-template-columns: repeat(${(props) => props.$column}, min-content);
  grid-auto-rows: min-content;
  column-gap: ${(props) => props.$gapSize}rem;
  row-gap: ${(props) => props.$gapSize}em;
`;

interface Props {
  table: GeneTable;
  hoveredGene: Maybe<SelectedGene>;
  onGeneClick: (selectedGene: SelectedGene) => void;
  onGeneHover: (selectedGene: Maybe<SelectedGene>) => void;
}

const Bingo: FC<Props> = ({ table, hoveredGene, onGeneClick, onGeneHover }) => {
  const screens = Grid.useBreakpoint();

  const sizes = useMemo(() => {
    if (screens.xs) {
      return {
        geneSize: GENE_SIZE_XS,
        lineSize: GENE_LINE_SIZE_XS,
        borderSize: GENE_LINE_SIZE_XS / 2,
        gapSize: GENE_GAP_XS,
      };
    }

    return {
      geneSize: GENE_SIZE,
      lineSize: GENE_LINE_SIZE,
      borderSize: GENE_LINE_SIZE / 2,
      gapSize: GENE_GAP,
    };
  }, [screens.xs]);

  const horizontalResult = useMemo(() => matchHorizontalGenes(table), [table]);
  const verticalResult = useMemo(() => matchVerticalGenes(table), [table]);
  const diagonalResult = useMemo(() => matchDiagonalGenes(table), [table]);

  return (
    <BingoGrid $column={table.length} $gapSize={sizes.gapSize}>
      {/* Lines */}
      <BingoHorizontalLine1
        geneSize={sizes.geneSize}
        lineSize={sizes.lineSize}
        gapSize={sizes.gapSize}
        matchedGeneType={horizontalResult[0].geneType}
        matchedAttackType={horizontalResult[0].attackType}
      />
      <BingoHorizontalLine2
        geneSize={sizes.geneSize}
        lineSize={sizes.lineSize}
        gapSize={sizes.gapSize}
        matchedGeneType={horizontalResult[1].geneType}
        matchedAttackType={horizontalResult[1].attackType}
      />
      <BingoHorizontalLine3
        geneSize={sizes.geneSize}
        lineSize={sizes.lineSize}
        gapSize={sizes.gapSize}
        matchedGeneType={horizontalResult[2].geneType}
        matchedAttackType={horizontalResult[2].attackType}
      />
      <BingoVerticalLine1
        geneSize={sizes.geneSize}
        lineSize={sizes.lineSize}
        gapSize={sizes.gapSize}
        matchedGeneType={verticalResult[0].geneType}
        matchedAttackType={verticalResult[0].attackType}
      />
      <BingoVerticalLine2
        geneSize={sizes.geneSize}
        lineSize={sizes.lineSize}
        gapSize={sizes.gapSize}
        matchedGeneType={verticalResult[1].geneType}
        matchedAttackType={verticalResult[1].attackType}
      />
      <BingoVerticalLine3
        geneSize={sizes.geneSize}
        lineSize={sizes.lineSize}
        gapSize={sizes.gapSize}
        matchedGeneType={verticalResult[2].geneType}
        matchedAttackType={verticalResult[2].attackType}
      />
      <BingoDiagonalLine1
        geneSize={sizes.geneSize}
        lineSize={sizes.lineSize}
        gapSize={sizes.gapSize}
        matchedGeneType={diagonalResult[0].geneType}
        matchedAttackType={diagonalResult[0].attackType}
      />
      <BingoDiagonalLine2
        geneSize={sizes.geneSize}
        lineSize={sizes.lineSize}
        gapSize={sizes.gapSize}
        matchedGeneType={diagonalResult[1].geneType}
        matchedAttackType={diagonalResult[1].attackType}
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
              <EmptyGene
                key={geneKey}
                $size={sizes.geneSize}
                $borderSize={sizes.borderSize}
                $hovered={isHovered}
                onClick={handleGeneClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            );
          }

          return (
            <Gene
              key={geneKey}
              size={sizes.geneSize}
              borderSize={sizes.borderSize}
              geneLevel={gene.level}
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
    </BingoGrid>
  );
};

export default memo(Bingo);
