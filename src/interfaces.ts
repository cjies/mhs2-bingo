import { SLOT_PROPERTY, SLOT_TYPE } from './constants';

export type SlotId = string;

interface Slot {
  id: SlotId;
  type: SLOT_TYPE;
  property: SLOT_PROPERTY;
}

export type MaybeSlot = Slot | null;
export type SlotRow = MaybeSlot[];
export type SlotTable = SlotRow[];

export interface SlotMatchResult {
  matchedType: SLOT_TYPE | null;
  matchedProperty: SLOT_PROPERTY | null;
}
