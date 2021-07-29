import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Grid } from 'antd';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Maybe } from '@/interfaces/common';
import { GeneTable, SelectedGene } from '@/interfaces/gene';
import {
  matchDiagonalGenes,
  matchHorizontalGenes,
  matchVerticalGenes,
} from '@/utils/matchers';

import BingoGene from './BingoGene';
import {
  GENE_GAP,
  GENE_GAP_XS,
  GENE_LINE_SIZE,
  GENE_LINE_SIZE_XS,
  GENE_SIZE,
  GENE_SIZE_XS,
} from './constants';
import DraggableGene from './DraggableGene';
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

const DraggingGene = styled(BingoGene)`
  cursor: grabbing;
`;

interface Props {
  table: GeneTable;
  hoveredGene: Maybe<SelectedGene>;
  onGeneClick: (selectedGene: SelectedGene) => void;
  onGeneHover: (selectedGene: Maybe<SelectedGene>) => void;
  onTableSort: (table: GeneTable) => void;
}

const Bingo: FC<Props> = ({
  table,
  hoveredGene,
  onGeneClick,
  onGeneHover,
  onTableSort,
}) => {
  const screens = Grid.useBreakpoint();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 1 } })
  );
  const [draggedGene, setDraggedGene] = useState<SelectedGene | null>(null);

  const handleDragStart = useCallback(({ active }: DragStartEvent) => {
    const activeGene = active.data.current as SelectedGene;
    setDraggedGene(activeGene);

    // prevent body scrolls
    document.body.style.overflow = 'hidden';
  }, []);

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      const activeGene = active.data.current as SelectedGene;
      const overGene = over?.data.current as SelectedGene | undefined;

      // reset body scrolls
      document.body.style.overflow = '';
      setDraggedGene(null);

      // Swap active and over genes
      if (overGene && activeGene.gene !== overGene.gene) {
        const newTable: GeneTable = JSON.parse(JSON.stringify(table));
        newTable[activeGene.rowIndex][activeGene.columnIndex] = overGene.gene;
        newTable[overGene.rowIndex][overGene.columnIndex] = activeGene.gene;
        onTableSort(newTable);
        return;
      }
    },
    [table, onTableSort]
  );

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

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {table.map((row, rowIndex) => {
          return row.map((gene, columnIndex) => {
            const geneKey = `gene.${gene?.id ?? `${rowIndex}.${columnIndex}`}`;

            return (
              <DraggableGene
                key={geneKey}
                gene={gene}
                rowIndex={rowIndex}
                columnIndex={columnIndex}
                sizes={sizes}
                hoveredGene={hoveredGene}
                onGeneClick={onGeneClick}
                onGeneHover={onGeneHover}
              />
            );
          });
        })}

        <DragOverlay>
          {draggedGene ? (
            <DraggingGene
              gene={draggedGene.gene}
              rowIndex={-1}
              columnIndex={-1}
              sizes={sizes}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </BingoGrid>
  );
};

export default memo(Bingo);
