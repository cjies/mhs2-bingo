import styled from 'styled-components';

import { SLOT_EMPTY_COLOR } from '../constants/slot';

const EmptySlot = styled.div<{ $size: number }>`
  width: ${(props) => `${props.$size}rem` || '5rem'};
  height: ${(props) => `${props.$size}rem` || '5rem'};
  border-radius: 50%;
  background-color: ${SLOT_EMPTY_COLOR};
`;

export default EmptySlot;
