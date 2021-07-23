import { FC, memo } from 'react';
import styled, { css } from 'styled-components';

import { CATEGORY, CATEGORY_ICON } from '../constants/category';
import { SLOT_COLOR, SLOT_EMPTY_COLOR } from '../constants/slot';
import { TYPE } from '../constants/type';
import { SlotId } from '../interfaces/slot';

interface SlotContainerProps {
  $size: number; // in rem
  $isMatch: boolean;
  $type: TYPE;
}

const SlotContainer = styled.div<SlotContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${(props) => `${props.$size}rem` || '5rem'};
  height: ${(props) => `${props.$size}rem` || '5rem'};
  border-radius: 50%;
  background-color: ${(props) => SLOT_COLOR[props.$type] ?? SLOT_EMPTY_COLOR};

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
  type: TYPE;
  category: CATEGORY;
  isTypeMatch: boolean;
  isCategoryMatch: boolean;
}

const Slot: FC<Props> = ({
  id,
  size,
  type,
  category,
  isTypeMatch,
  isCategoryMatch,
}) => {
  return (
    <SlotContainer
      $size={size}
      $isMatch={isTypeMatch || isCategoryMatch}
      $type={type}
    >
      <Icon $size={size / 2}>{CATEGORY_ICON[category]}</Icon>
      <span>{id}</span>
    </SlotContainer>
  );
};

export default memo(Slot);
