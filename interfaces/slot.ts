import { CATEGORY } from '../constants/category';
import { SKILL } from '../constants/skill';
import { TYPE } from '../constants/type';
import { Maybe, Opaque } from './common';

export type SlotId = Opaque<'SLOT_ID', string>;

export interface Slot {
  id: SlotId;
  type: TYPE;
  category: CATEGORY;
  name: string;
  skill: SKILL;
  skillName: string;
  skillDescription: string;
  minLevel: number;
  sp: number;
  monsters: string[];
}

export type SlotRow = Maybe<Slot>[];
export type SlotTable = SlotRow[];

export interface SlotMatchResult {
  matchedType: TYPE | null;
  matchedCategory: CATEGORY | null;
}
