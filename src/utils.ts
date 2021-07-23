import {
  MaybeSlot,
  SlotId,
  SlotMatchResult,
  SlotRow,
  SlotTable,
} from './interfaces';

const areSlotsMatched = (slots: MaybeSlot[]): SlotMatchResult => {
  const sampleType = slots[0]?.type;
  const isTypeMatched = slots.every((slot) => {
    if (!slot) {
      return false;
    }
    return slot.type === sampleType;
  });

  const sampleProperty = slots[0]?.property;
  const isPropertyMatched = slots.every((slot) => {
    if (!slot) {
      return false;
    }
    return slot.property === sampleProperty;
  });

  return {
    matchedType: isTypeMatched ? sampleType ?? null : null,
    matchedProperty: isPropertyMatched ? sampleProperty ?? null : null,
  };
};

/**
 * Rotate 90degree, turn columns to rows
 */
const rotateTable = (table: SlotTable) => {
  return table.map((row, i) =>
    row.map((_, j) => table[table.length - 1 - j][i])
  );
};

export const checkHorizontalSlots = (table: SlotTable) => {
  return table.reduce<{ [index: number]: SlotMatchResult }>(
    (result, row, index) => {
      return {
        ...result,
        [index]: areSlotsMatched(row),
      };
    },
    {}
  );
};

export const checkVerticalSlots = (table: SlotTable) => {
  const rotatedTable = rotateTable(table);
  return checkHorizontalSlots(rotatedTable);
};

export const checkDiagonalSlots = (table: SlotTable) => {
  const diagonalLeft: SlotRow = [];
  const diagonalRight: SlotRow = [];

  for (let i = 0; i < table.length; i++) {
    diagonalLeft.push(table[i][i]);
    diagonalRight.push(table[i][table.length - i - 1]);
  }

  const idsOnDiagonalAxis = [...diagonalLeft, ...diagonalRight].reduce<
    SlotId[]
  >((ids, slot) => {
    if (slot && !ids.includes(slot.id)) {
      ids.push(slot.id);
    }

    return ids;
  }, []);
  const matchedResult = checkHorizontalSlots([diagonalLeft, diagonalRight]);

  return {
    ids: idsOnDiagonalAxis,
    left: matchedResult[0],
    right: matchedResult[1],
  };
};
