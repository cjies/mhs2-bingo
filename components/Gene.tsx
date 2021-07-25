import Image from 'next/image';
import { FC, memo, MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';

import { ATTACK_TYPE, ATTACK_TYPE_LIGHT_ICON } from '@/constants/attackType';
import { DEFAULT_FONT_SIZE } from '@/constants/common';
import { GENE_COLOR, GENE_EMPTY_COLOR, GENE_TYPE } from '@/constants/gene';

export const EmptyGene = styled.div<{ $size: number; $hovered?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  width: ${(props) => `${props.$size}rem` || '5rem'};
  height: ${(props) => `${props.$size}rem` || '5rem'};
  border-radius: 50%;
  background-color: ${GENE_EMPTY_COLOR};
  transition: box-shadow 0.2s ease;

  ${(props) =>
    props.onClick
      ? css`
          cursor: pointer;

          &:hover {
            box-shadow: 0 0 10px 5px rgba(0, 159, 255, 0.8);
          }

          ${props.$hovered &&
          css`
            box-shadow: 0 0 10px 5px rgba(0, 159, 255, 0.5);
          `}
        `
      : ''}
`;

interface GeneContainerProps {
  $size: number; // in rem
  $type: GENE_TYPE;
}

const GeneContainer = styled(EmptyGene)<GeneContainerProps>`
  background: ${(props) => GENE_COLOR[props.$type] ?? GENE_EMPTY_COLOR};
`;

interface Props {
  className?: string;
  size: number; // in rem
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
  geneType,
  attackType,
  hovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const attackTypeIcon = ATTACK_TYPE_LIGHT_ICON[attackType];
  const iconSize = (size * DEFAULT_FONT_SIZE) / 1.5; // rem -> px

  return (
    <GeneContainer
      className={className}
      $size={size}
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
