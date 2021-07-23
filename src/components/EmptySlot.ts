import styled from 'styled-components';

import { SLOT_COLOR_EMPTY } from '../constants';

const EmptySlot = styled.div<{ $size: number }>`
  width: ${(props) => `${props.$size}rem` || '5rem'};
  height: ${(props) => `${props.$size}rem` || '5rem'};
  border-radius: 50%;
  background-color: ${SLOT_COLOR_EMPTY};
`;

export default EmptySlot;
