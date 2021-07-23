import React, { FC, memo, useMemo } from 'react';
import styled from 'styled-components';

import { SlotTable } from '../interfaces';
import {
  checkDiagonalSlots,
  checkHorizontalSlots,
  checkVerticalSlots,
} from '../utils';
import EmptySlot from './EmptySlot';
import Slot from './Slot';

const Grid = styled.div<{ $column: number }>`
  display: flex;
  display: grid;
  margin: 3rem auto;
  grid-template-columns: repeat(${(props) => props.$column}, min-content);
  column-gap: 1rem;
  row-gap: 1em;
`;

interface Props {
  table: SlotTable;
}

const BingoTable: FC<Props> = ({ table }) => {
  const horizontalResult = useMemo(() => {
    return checkHorizontalSlots(table);
  }, [table]);
  const verticalResult = useMemo(() => {
    return checkVerticalSlots(table);
  }, [table]);
  const diagonalResult = useMemo(() => {
    return checkDiagonalSlots(table);
  }, [table]);

  console.log('horizontalResult', horizontalResult);
  console.log('verticalResult', verticalResult);
  console.log('diagonalResult', diagonalResult);

  return (
    <Grid $column={table.length}>
      {table.map((row, rowIndex) => {
        return row.map((slot, columnIndex) => {
          const slotKey = `slot.${slot?.id ?? `${rowIndex}.${columnIndex}`}`;

          if (!slot) {
            return <EmptySlot key={slotKey} $size={5} />;
          }

          let isTypeMatch =
            horizontalResult[rowIndex]?.matchedType === slot.type ||
            verticalResult[columnIndex]?.matchedType === slot.type;
          let isPropertyMatch =
            horizontalResult[rowIndex]?.matchedProperty === slot.property ||
            verticalResult[columnIndex]?.matchedProperty === slot.property;

          if (diagonalResult.ids.includes(slot.id)) {
            isTypeMatch =
              diagonalResult.left.matchedType === slot.type ||
              diagonalResult.right.matchedType === slot.type ||
              isTypeMatch;
            isPropertyMatch =
              diagonalResult.left.matchedProperty === slot.property ||
              diagonalResult.right.matchedProperty === slot.property ||
              isPropertyMatch;
          }

          return (
            <Slot
              key={slotKey}
              size={5}
              id={slot.id}
              type={slot.type}
              property={slot.property}
              isTypeMatch={isTypeMatch}
              isPropertyMatch={isPropertyMatch}
            />
          );
        });
      })}
    </Grid>
  );
};

export default memo(BingoTable);
