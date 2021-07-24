import styled from 'styled-components';

import { GENE_BORDER_COLOR, GENE_BORDER_COLOR_MATCH } from '@/constants/gene';

import { GENE_GAP, GENE_LINE_SIZE, GENE_SIZE } from './constants';

const BingoLine = styled.div<{ $isMatch: boolean }>`
  position: absolute;
  width: 90%;
  height: ${GENE_LINE_SIZE}rem;
  border-radius: 0.25rem;
  background-color: ${(props) =>
    props.$isMatch ? GENE_BORDER_COLOR_MATCH : GENE_BORDER_COLOR};
`;

export const BingoHorizontalLine1 = styled(BingoLine)`
  top: ${GENE_SIZE / 2 - GENE_LINE_SIZE / 2}rem;
  left: 5%;
`;
export const BingoHorizontalLine2 = styled(BingoLine)`
  top: ${GENE_SIZE + GENE_GAP + GENE_SIZE / 2 - GENE_LINE_SIZE / 2}rem;
  left: 5%;
`;
export const BingoHorizontalLine3 = styled(BingoLine)`
  top: ${(GENE_SIZE + GENE_GAP) * 2 + GENE_SIZE / 2 - GENE_LINE_SIZE / 2}rem;
  left: 5%;
`;

export const BingoVerticalLine1 = styled(BingoLine)`
  transform: rotate(90deg);
  transform-origin: left top;
  left: ${GENE_SIZE / 2 + GENE_LINE_SIZE / 2}rem;
  top: 5%;
`;
export const BingoVerticalLine2 = styled(BingoLine)`
  transform: rotate(90deg);
  transform-origin: left top;
  left: ${GENE_SIZE + GENE_GAP + GENE_SIZE / 2 + GENE_LINE_SIZE / 2}rem;
  top: 5%;
`;
export const BingoVerticalLine3 = styled(BingoLine)`
  transform: rotate(90deg);
  transform-origin: left top;
  left: ${(GENE_SIZE + GENE_GAP) * 2 + GENE_SIZE / 2 + GENE_LINE_SIZE / 2}rem;
  top: 5%;
`;

export const BingoDiagonalLine1 = styled(BingoLine)`
  transform: rotate(45deg);
  transform-origin: center center;
  top: ${(GENE_SIZE * 3 + GENE_GAP * 2) / 2 - GENE_LINE_SIZE / 2}rem;
  left: 5%;
`;
export const BingoDiagonalLine2 = styled(BingoLine)`
  transform: rotate(-45deg);
  transform-origin: center center;
  top: ${(GENE_SIZE * 3 + GENE_GAP * 2) / 2 - GENE_LINE_SIZE / 2}rem;
  right: 5%;
`;
