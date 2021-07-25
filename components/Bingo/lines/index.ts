import styled from 'styled-components';

import BingoLine, { Indicator } from './BingoLine';

export const BingoHorizontalLine1 = styled(BingoLine)`
  top: ${(props) => props.geneSize / 2 - props.lineSize / 2}rem;
  left: 5%;
`;
export const BingoHorizontalLine2 = styled(BingoLine)`
  top: ${(props) =>
    props.geneSize +
    props.gapSize +
    props.geneSize / 2 -
    props.lineSize / 2}rem;
  left: 5%;
`;
export const BingoHorizontalLine3 = styled(BingoLine)`
  top: ${(props) =>
    (props.geneSize + props.gapSize) * 2 +
    props.geneSize / 2 -
    props.lineSize / 2}rem;
  left: 5%;
`;

export const BingoVerticalLine1 = styled(BingoLine)`
  transform: rotate(90deg);
  transform-origin: left top;
  left: ${(props) => props.geneSize / 2 + props.lineSize / 2}rem;
  top: 5%;

  ${Indicator} {
    transform: rotate(-90deg);
  }
`;
export const BingoVerticalLine2 = styled(BingoLine)`
  transform: rotate(90deg);
  transform-origin: left top;
  left: ${(props) =>
    props.geneSize +
    props.gapSize +
    props.geneSize / 2 +
    props.lineSize / 2}rem;
  top: 5%;

  ${Indicator} {
    transform: rotate(-90deg);
  }
`;
export const BingoVerticalLine3 = styled(BingoLine)`
  transform: rotate(90deg);
  transform-origin: left top;
  left: ${(props) =>
    (props.geneSize + props.gapSize) * 2 +
    props.geneSize / 2 +
    props.lineSize / 2}rem;
  top: 5%;

  ${Indicator} {
    transform: rotate(-90deg);
  }
`;

export const BingoDiagonalLine1 = styled(BingoLine)`
  width: 120%;
  transform: rotate(45deg);
  transform-origin: center center;
  top: ${(props) =>
    (props.geneSize * 3 + props.gapSize * 2) / 2 - props.lineSize / 2}rem;
  left: -10%;

  ${Indicator} {
    transform: rotate(-45deg);
  }
`;
export const BingoDiagonalLine2 = styled(BingoLine)`
  width: 120%;
  transform: rotate(-45deg);
  transform-origin: center center;
  top: ${(props) =>
    (props.geneSize * 3 + props.gapSize * 2) / 2 - props.lineSize / 2}rem;
  right: -10%;

  ${Indicator} {
    transform: rotate(45deg);
  }
`;
