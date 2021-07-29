import Image from 'next/image';
import { forwardRef, memo, MouseEventHandler } from 'react';

import { ATTACK_TYPE, ATTACK_TYPE_LIGHT_ICON } from '@/constants/attackType';
import { DEFAULT_FONT_SIZE } from '@/constants/common';
import {
  GENE_COLOR,
  GENE_LEVEL,
  GENE_LEVEL_COLOR,
  GENE_TYPE,
} from '@/constants/gene';

import EmptyGene from './EmptyGene';

interface Props {
  size: number; // in rem
  borderSize: number; // in rem
  geneLevel: GENE_LEVEL | null;
  geneType: GENE_TYPE;
  attackType: ATTACK_TYPE;
  hovered?: boolean;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

const Gene = forwardRef<HTMLDivElement, Props>(
  (
    {
      size,
      borderSize,
      geneLevel,
      geneType,
      attackType,
      hovered,
      onClick,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const attackTypeIcon = ATTACK_TYPE_LIGHT_ICON[attackType];
    const iconSize = (size * DEFAULT_FONT_SIZE) / 1.8; // rem -> px
    const borderColor = geneLevel
      ? GENE_LEVEL_COLOR[geneLevel]
      : GENE_LEVEL_COLOR.S;

    return (
      <EmptyGene
        ref={ref}
        size={size}
        borderSize={borderSize}
        borderColor={borderColor}
        backgroundColor={GENE_COLOR[geneType]}
        hovered={hovered}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        {attackTypeIcon && (
          <Image
            src={attackTypeIcon}
            width={iconSize}
            height={iconSize}
            alt="icon"
          />
        )}
      </EmptyGene>
    );
  }
);

Gene.displayName = 'Gene';

export default memo(Gene);
