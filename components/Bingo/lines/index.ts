import styled from 'styled-components';

import BingoLine, {
  Indicator,
  MatchedAttackTypeIndicator,
  MatchedGeneTypeIndicator,
} from './BingoLine';

export const BingoHorizontalLine1 = styled(BingoLine)`
  left: 12.5%;
  top: ${(props) => props.geneSize / 2 - props.lineSize / 2}rem;
`;
export const BingoHorizontalLine2 = styled(BingoLine)`
  left: 12.5%;
  top: ${(props) =>
    props.geneSize +
    props.gapSize +
    props.geneSize / 2 -
    props.lineSize / 2}rem;
`;
export const BingoHorizontalLine3 = styled(BingoLine)`
  left: 12.5%;
  top: ${(props) =>
    (props.geneSize + props.gapSize) * 2 +
    props.geneSize / 2 -
    props.lineSize / 2}rem;
`;

export const BingoVerticalLine1 = styled(BingoLine)`
  width: 75%;
  top: 12.5%;
  left: ${(props) => props.geneSize / 2 + props.lineSize / 2}rem;
  transform: rotate(90deg);
  transform-origin: left top;

  ${Indicator} {
    transform: rotate(-90deg);
  }
`;
export const BingoVerticalLine2 = styled(BingoLine)`
  width: 75%;
  top: 12.5%;
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
  width: 75%;
  top: 12.5%;
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
  width: 100%;
  left: 0;
  top: ${(props) =>
    (props.geneSize * 3 + props.gapSize * 2) / 2 - props.lineSize / 2}rem;
  transform: rotate(45deg);
  transform-origin: center center;

  ${Indicator} {
    transform: rotate(-45deg);
  }

  ${MatchedAttackTypeIndicator} {
    margin-left: ${(props) => props.gapSize * 2.8}rem;
  }

  ${MatchedGeneTypeIndicator} {
    margin-right: ${(props) => props.gapSize * 2.8}rem;
  }
`;
export const BingoDiagonalLine2 = styled(BingoLine)`
  width: 100%;
  right: 0;
  top: ${(props) =>
    (props.geneSize * 3 + props.gapSize * 2) / 2 - props.lineSize / 2}rem;
  transform: rotate(-45deg);
  transform-origin: center center;

  ${Indicator} {
    transform: rotate(45deg);
  }

  ${MatchedAttackTypeIndicator} {
    margin-left: ${(props) => props.gapSize * 2.8}rem;
  }

  ${MatchedGeneTypeIndicator} {
    margin-right: ${(props) => props.gapSize * 2.8}rem;
  }
`;
