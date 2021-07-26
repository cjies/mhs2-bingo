import Image from 'next/image';
import { FC, memo, MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';

import { ATTACK_TYPE, ATTACK_TYPE_LIGHT_ICON } from '@/constants/attackType';
import { DEFAULT_FONT_SIZE } from '@/constants/common';
import {
  GENE_BORDER_COLOR,
  GENE_COLOR,
  GENE_EMPTY_COLOR,
  GENE_LEVEL,
  GENE_LEVEL_COLOR,
  GENE_TYPE,
} from '@/constants/gene';

interface EmptyGeneProps {
  $size: number;
  $borderSize: number;
  $hovered?: boolean;
}

export const EmptyGene = styled.div<EmptyGeneProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  width: ${(props) => `${props.$size}rem` || '5rem'};
  height: ${(props) => `${props.$size}rem` || '5rem'};
  border-radius: 50%;
  background-color: ${GENE_EMPTY_COLOR};
  border: ${(props) => `${props.$borderSize}rem solid ${GENE_BORDER_COLOR}`};
  transition: box-shadow 0.2s ease;

  ${(props) =>
    props.onClick
      ? css`
          cursor: pointer;

          @media (hover: hover) and (pointer: fine) {
            &:hover {
              box-shadow: 0 0 10px 5px rgba(0, 159, 255, 0.8);
            }

            ${props.$hovered &&
            css`
              box-shadow: 0 0 10px 5px rgba(0, 159, 255, 0.5);
            `}
          }
        `
      : ''}
`;

interface GeneContainerProps {
  $size: number; // in rem
  $type: GENE_TYPE;
}

const GeneContainer = styled(EmptyGene)<
  GeneContainerProps & { $borderColor: string }
>`
  background: ${(props) => GENE_COLOR[props.$type] ?? GENE_EMPTY_COLOR};
  border-color: ${(props) => props.$borderColor};
`;

interface Props {
  className?: string;
  size: number; // in rem
  borderSize: number; // in rem
  geneLevel: GENE_LEVEL | null;
  geneType: GENE_TYPE;
  attackType: ATTACK_TYPE;
  hovered?: boolean;
  onClick?: () => void;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

const Gene: FC<Props> = ({
  className,
  size,
  borderSize,
  geneLevel,
  geneType,
  attackType,
  hovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const attackTypeIcon = ATTACK_TYPE_LIGHT_ICON[attackType];
  const iconSize = (size * DEFAULT_FONT_SIZE) / 1.5; // rem -> px
  const borderColor = geneLevel
    ? GENE_LEVEL_COLOR[geneLevel]
    : GENE_LEVEL_COLOR.S;

  return (
    <GeneContainer
      className={className}
      $size={size}
      $borderSize={borderSize}
      $borderColor={borderColor}
      $type={geneType}
      $hovered={hovered}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {attackTypeIcon && (
        <Image
          src={attackTypeIcon}
          width={iconSize}
          height={iconSize}
          alt="icon"
        />
      )}
    </GeneContainer>
  );
};

export default memo(Gene);
