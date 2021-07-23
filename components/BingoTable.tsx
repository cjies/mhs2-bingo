import React, { FC, memo, useMemo } from 'react';
import styled from 'styled-components';

import { SlotTable } from '../interfaces/slot';
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
          let isCategoryMatch =
            horizontalResult[rowIndex]?.matchedCategory === slot.category ||
            verticalResult[columnIndex]?.matchedCategory === slot.category;

          if (diagonalResult.ids.includes(slot.id)) {
            isTypeMatch =
              diagonalResult.left.matchedType === slot.type ||
              diagonalResult.right.matchedType === slot.type ||
              isTypeMatch;
            isCategoryMatch =
              diagonalResult.left.matchedCategory === slot.category ||
              diagonalResult.right.matchedCategory === slot.category ||
              isCategoryMatch;
          }

          return (
            <Slot
              key={slotKey}
              size={5}
              id={slot.id}
              type={slot.type}
              category={slot.category}
              isTypeMatch={isTypeMatch}
              isCategoryMatch={isCategoryMatch}
            />
          );
        });
      })}
    </Grid>
  );
};

export default memo(BingoTable);
