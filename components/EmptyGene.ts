import styled, { css } from 'styled-components';

import { GENE_EMPTY_COLOR } from '../constants/gene';

const EmptyGene = styled.div<{ $size: number }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

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
        `
      : ''}
`;

export default EmptyGene;
