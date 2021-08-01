import Image from 'next/image';
import { FC, memo } from 'react';
import styled from 'styled-components';

import { ATTACK_TYPE, ATTACK_TYPE_DARK_ICON } from '@/constants/attackType';
import { DEFAULT_FONT_SIZE } from '@/constants/common';
import {
  GENE_BORDER_COLOR,
  GENE_BORDER_COLOR_MATCH,
  GENE_TYPE,
  GENE_TYPE_ICON,
} from '@/constants/gene';

interface LineProps {
  $lineSize: number; // in rem
  $geneSize: number; // in rem
  $gapSize: number; // in rem
  $isGeneTypeMatch: boolean;
  $isAttackTypeMatch: boolean;
}

const Line = styled.div<LineProps>`
  position: absolute;
  width: 90%;
  height: ${(props) => props.$lineSize}rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  background-color: ${(props) =>
    props.$isGeneTypeMatch || props.$isAttackTypeMatch
      ? GENE_BORDER_COLOR_MATCH
      : GENE_BORDER_COLOR};
  transition: background-color 0.2s ease;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 12%;
    left: -10%;
    background-color: ${GENE_BORDER_COLOR_MATCH};
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);

    display: ${(props) => (props.$isGeneTypeMatch ? 'inline-block' : 'none')};
  }

  &::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 12%;
    right: -10%;
    background-color: ${GENE_BORDER_COLOR_MATCH};
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);

    display: ${(props) => (props.$isAttackTypeMatch ? 'inline-block' : 'none')};
  }
`;

interface IndicatorProps {
  $lineSize: number; // in rem
  $gapSize: number; // in rem
}

export const Indicator = styled.div<IndicatorProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;

  position: absolute;
  top: 50%;
  margin-top: -${(props) => props.$lineSize}rem;
  width: ${(props) => props.$lineSize * 2}rem;
  height: ${(props) => props.$lineSize * 2}rem;
  border-radius: 50%;
  background-color: ${GENE_BORDER_COLOR_MATCH};
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
`;

const MatchedAttackTypeIndicator = styled(Indicator)`
  left: 100%;
  margin-left: ${(props) => props.$gapSize}rem;
`;

const MatchedGeneTypeIndicator = styled(Indicator)`
  right: 100%;
  margin-right: ${(props) => props.$gapSize}rem;
`;

interface Props {
  className?: string;
  lineSize: number; // in rem
  geneSize: number; // in rem
  gapSize: number; // in rem
  matchedGeneType: GENE_TYPE | null;
  matchedAttackType: ATTACK_TYPE | null;
}

const BingoLine: FC<Props> = ({
  className,
  lineSize,
  geneSize,
  gapSize,
  matchedGeneType,
  matchedAttackType,
}) => {
  // convert rem to pixels
  const iconSize = lineSize * 1.5 * DEFAULT_FONT_SIZE;

  return (
    <Line
      className={className}
      $lineSize={lineSize}
      $geneSize={geneSize}
      $gapSize={gapSize}
      $isGeneTypeMatch={!!matchedGeneType}
      $isAttackTypeMatch={!!matchedAttackType}
    >
      {!!(matchedAttackType && matchedAttackType !== ATTACK_TYPE.NONE) && (
        <MatchedAttackTypeIndicator $lineSize={lineSize} $gapSize={gapSize}>
          <Image
            src={ATTACK_TYPE_DARK_ICON[matchedAttackType]}
            width={iconSize}
            height={iconSize}
            alt="icon"
          />
        </MatchedAttackTypeIndicator>
      )}

      {!!(matchedGeneType && matchedGeneType !== GENE_TYPE.RAINBOW) && (
        <MatchedGeneTypeIndicator $lineSize={lineSize} $gapSize={gapSize}>
          <Image
            src={GENE_TYPE_ICON[matchedGeneType]}
            width={iconSize}
            height={iconSize}
            alt="icon"
          />
        </MatchedGeneTypeIndicator>
      )}
    </Line>
  );
};

export default memo(BingoLine);
