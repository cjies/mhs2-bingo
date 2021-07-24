import Image from 'next/image';
import { FC, memo } from 'react';
import styled, { css } from 'styled-components';

import { ATTACK_TYPE, ATTACK_TYPE_ICON } from '@/constants/attackType';
import { DEFAULT_FONT_SIZE } from '@/constants/fontSize';
import { GENE_COLOR, GENE_EMPTY_COLOR, GENE_TYPE } from '@/constants/gene';
import { GeneId } from '@/interfaces/gene';

import EmptyGene from './EmptyGene';

interface GeneContainerProps {
  $size: number; // in rem
  $isHighlight: boolean;
  $type: GENE_TYPE;
}

const GeneContainer = styled(EmptyGene)<GeneContainerProps>`
  background-color: ${(props) => GENE_COLOR[props.$type] ?? GENE_EMPTY_COLOR};

  ${(props) =>
    props.$isHighlight &&
    css`
      border: 5px solid #000;
    `}
`;

interface Props {
  id: GeneId;
  size: number; // in rem
  geneType: GENE_TYPE;
  attackType: ATTACK_TYPE;
  isGeneTypeMatch?: boolean;
  isAttackTypeMatch?: boolean;
  onClick?: () => void;
}

const Gene: FC<Props> = ({
  id,
  size,
  geneType,
  attackType,
  isGeneTypeMatch,
  isAttackTypeMatch,
  onClick,
}) => {
  const attackTypeIcon = ATTACK_TYPE_ICON[attackType];
  const iconSize = (size * DEFAULT_FONT_SIZE) / 1.5; // rem -> px

  return (
    <GeneContainer
      $size={size}
      $isHighlight={!!(isGeneTypeMatch || isAttackTypeMatch)}
      $type={geneType}
      onClick={onClick}
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
