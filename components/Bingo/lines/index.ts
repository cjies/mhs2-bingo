import styled from 'styled-components';

import BingoLine, { Indicator } from './BingoLine';

export const BingoHorizontalLine1 = styled(BingoLine)`
  left: 5%;
  top: ${(props) => props.geneSize / 2 - props.lineSize / 2}rem;
`;
export const BingoHorizontalLine2 = styled(BingoLine)`
  left: 5%;
  top: ${(props) =>
    props.geneSize +
    props.gapSize +
    props.geneSize / 2 -
    props.lineSize / 2}rem;
`;
export const BingoHorizontalLine3 = styled(BingoLine)`
  left: 5%;
  top: ${(props) =>
    (props.geneSize + props.gapSize) * 2 +
    props.geneSize / 2 -
    props.lineSize / 2}rem;
`;

export const BingoVerticalLine1 = styled(BingoLine)`
  width: 89%;
  top: 5.5%;
  left: ${(props) => props.geneSize / 2 + props.lineSize / 2}rem;
  transform: rotate(90deg);
  transform-origin: left top;

  ${Indicator} {
    transform: rotate(-90deg);
  }
`;
export const BingoVerticalLine2 = styled(BingoLine)`
  width: 89%;
  top: 5.5%;
  left: ${(props) =>
    props.geneSize +
    props.gapSize +
    props.geneSize / 2 +
    props.lineSize / 2}rem;
  transform: rotate(90deg);
  transform-origin: left top;

  ${Indicator} {
    transform: rotate(-90deg);
  }
`;
export const BingoVerticalLine3 = styled(BingoLine)`
  width: 89%;
  top: 5.5%;
  left: ${(props) =>
    (props.geneSize + props.gapSize) * 2 +
    props.geneSize / 2 +
    props.lineSize / 2}rem;
  transform: rotate(90deg);
  transform-origin: left top;

  ${Indicator} {
    transform: rotate(-90deg);
  }
`;

export const BingoDiagonalLine1 = styled(BingoLine)`
  width: 120%;
  left: -10%;
  top: ${(props) =>
    (props.geneSize * 3 + props.gapSize * 2) / 2 - props.lineSize / 2}rem;
  transform: rotate(45deg);
  transform-origin: center center;

  ${Indicator} {
    transform: rotate(-45deg);
  }
`;
export const BingoDiagonalLine2 = styled(BingoLine)`
  width: 120%;
  right: -10%;
  top: ${(props) =>
    (props.geneSize * 3 + props.gapSize * 2) / 2 - props.lineSize / 2}rem;
  transform: rotate(-45deg);
  transform-origin: center center;

  ${Indicator} {
    transform: rotate(45deg);
  }
`;
