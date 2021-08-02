import { Opaque } from './common';

export type MonsterId = Opaque<'MONSTER_ID', string>;

export interface Monster {
  id: MonsterId;
  name: string;
}
