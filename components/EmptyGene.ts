import styled from 'styled-components';

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

  &:hover {
    box-shadow: 0 5px 15px rgba(145, 92, 182, 0.4);
  }
`;

export default EmptyGene;
