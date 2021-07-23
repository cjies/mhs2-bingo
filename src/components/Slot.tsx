import { FC, memo } from 'react';
import styled, { css } from 'styled-components';

import {
  SLOT_COLOR,
  SLOT_COLOR_EMPTY,
  SLOT_PROPERTY,
  SLOT_TYPE,
  SLOT_TYPE_ICON,
} from '../constants';
import { SlotId } from '../interfaces';

interface SlotContainerProps {
  $size: number; // in rem
  $isMatch: boolean;
  $property: SLOT_PROPERTY;
}

const SlotContainer = styled.div<SlotContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${(props) => `${props.$size}rem` || '5rem'};
  height: ${(props) => `${props.$size}rem` || '5rem'};
  border-radius: 50%;
  background-color: ${(props) =>
    SLOT_COLOR[props.$property] ?? SLOT_COLOR_EMPTY};

  ${(props) =>
    props.$isMatch &&
    css`
      border: 3px solid #000;
    `}
`;

const Icon = styled.div<{ $size: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => `${props.$size}rem` || '2rem'};
  opacity: 0.5;
`;

interface Props {
  id: SlotId;
  size: number; // in rem
  type: SLOT_TYPE;
  property: SLOT_PROPERTY;
  isTypeMatch: boolean;
  isPropertyMatch: boolean;
}

const Slot: FC<Props> = ({
  id,
  size,
  type,
  property,
  isTypeMatch,
  isPropertyMatch,
}) => {
  return (
    <SlotContainer
      $size={size}
      $isMatch={isTypeMatch || isPropertyMatch}
      $property={property}
    >
      <Icon $size={size / 2}>{SLOT_TYPE_ICON[type]}</Icon>
      <span>{id}</span>
    </SlotContainer>
  );
};

export default memo(Slot);
