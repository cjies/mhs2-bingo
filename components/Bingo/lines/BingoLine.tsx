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
  $match: boolean;
}

const Line = styled.div<LineProps>`
  position: absolute;
  width: 90%;
  height: ${(props) => props.$lineSize}rem;
  border-radius: 0.25rem;
  background-color: ${(props) =>
    props.$match ? GENE_BORDER_COLOR_MATCH : GENE_BORDER_COLOR};
`;

interface IndicatorProps {
  $lineSize: number; // in rem
  $gapSize: number; // in rem
}

export const Indicator = styled.div<IndicatorProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 50%;
  margin-top: -${(props) => props.$lineSize}rem;
  width: ${(props) => props.$lineSize * 2}rem;
  height: ${(props) => props.$lineSize * 2}rem;
  border-radius: 50%;
  background-color: ${GENE_BORDER_COLOR_MATCH};
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
  const isMatch = !!(matchedGeneType || matchedAttackType);

  // convert rem to pixels
  const iconSize = lineSize * 1.5 * DEFAULT_FONT_SIZE;

  return (
    <Line
      className={className}
      $lineSize={lineSize}
      $geneSize={geneSize}
      $gapSize={gapSize}
      $match={isMatch}
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