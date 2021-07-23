import { FC, memo } from 'react';
import styled, { css } from 'styled-components';

import { ATTACK_TYPE, ATTACK_TYPE_ICON } from '../constants/attackType';
import { GENE_COLOR, GENE_EMPTY_COLOR, GENE_TYPE } from '../constants/gene';
import { GeneId } from '../interfaces/gene';
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

const Icon = styled.div<{ $size: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => `${props.$size}rem` || '2rem'};
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
  return (
    <GeneContainer
      $size={size}
      $isHighlight={!!(isGeneTypeMatch || isAttackTypeMatch)}
      $type={geneType}
      onClick={onClick}
    >
      <Icon $size={size / 2}>{ATTACK_TYPE_ICON[attackType]}</Icon>
    </GeneContainer>
  );
};

export default memo(Gene);
