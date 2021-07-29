import { forwardRef, memo, useCallback } from 'react';

import { Maybe } from '@/interfaces/common';
import { Gene as IGene, SelectedGene } from '@/interfaces/gene';

import Gene, { EmptyGene } from '../Gene';

export interface Props {
  gene: Maybe<IGene>;
  rowIndex: number;
  columnIndex: number;
  sizes: Record<string, number>;
  hoveredGene?: Maybe<SelectedGene>;
  className?: string;
  onGeneClick?: (selectedGene: SelectedGene) => void;
  onGeneHover?: (selectedGene: Maybe<SelectedGene>) => void;
}

const BingoGene = forwardRef<HTMLDivElement, Props>(
  (
    {
      gene,
      rowIndex,
      columnIndex,
      sizes,
      hoveredGene,
      onGeneClick,
      onGeneHover,
      ...props
    },
    ref
  ) => {
    const isHovered =
      hoveredGene?.rowIndex === rowIndex &&
      hoveredGene?.columnIndex === columnIndex;

    const handleGeneClick = useCallback(() => {
      onGeneClick?.({ rowIndex, columnIndex, gene });
    }, [gene, rowIndex, columnIndex, onGeneClick]);

    const handleMouseEnter = useCallback(() => {
      onGeneHover?.({ rowIndex, columnIndex, gene });
    }, [gene, rowIndex, columnIndex, onGeneHover]);

    const handleMouseLeave = useCallback(() => {
      onGeneHover?.(null);
    }, [onGeneHover]);

    if (!gene) {
      return (
        <EmptyGene
          ref={ref}
          $size={sizes.geneSize}
          $borderSize={sizes.borderSize}
          $hovered={isHovered}
          onClick={handleGeneClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        />
      );
    }

    return (
      <Gene
        ref={ref}
        size={sizes.geneSize}
        borderSize={sizes.borderSize}
        geneLevel={gene.level}
        geneType={gene.type}
        attackType={gene.attackType}
        hovered={isHovered}
        onClick={handleGeneClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    );
  }
);

BingoGene.displayName = 'BingoGene';

export default memo(BingoGene);
