import styled from 'styled-components';

import BingoTable from '../src/components/BingoTable';
import { SLOT_PROPERTY, SLOT_TYPE } from '../src/constants';
import { MaybeSlot, SlotTable } from '../src/interfaces';

const Container = styled.div`
  display: flex;
`;

const slot1: MaybeSlot = {
  id: '1',
  type: SLOT_TYPE.POWER,
  property: SLOT_PROPERTY.NORMAL,
};
const slot2: MaybeSlot = {
  id: '2',
  type: SLOT_TYPE.POWER,
  property: SLOT_PROPERTY.NORMAL,
};
const slot3: MaybeSlot = {
  id: '3',
  type: SLOT_TYPE.POWER,
  property: SLOT_PROPERTY.DRAGON,
};

const slot4: MaybeSlot = {
  id: '4',
  type: SLOT_TYPE.SPEED,
  property: SLOT_PROPERTY.FIRE,
};
const slot5: MaybeSlot = {
  id: '5',
  type: SLOT_TYPE.POWER,
  property: SLOT_PROPERTY.ICE,
};
const slot6: MaybeSlot = {
  id: '6',
  type: SLOT_TYPE.SPEED,
  property: SLOT_PROPERTY.ICE,
};

const slot7: MaybeSlot = {
  id: '7',
  type: SLOT_TYPE.SPEED,
  property: SLOT_PROPERTY.DRAGON,
};
const slot8: MaybeSlot = {
  id: '8',
  type: SLOT_TYPE.SKILL,
  property: SLOT_PROPERTY.DRAGON,
};
const slot9: MaybeSlot = {
  id: '9',
  type: SLOT_TYPE.SKILL,
  property: SLOT_PROPERTY.ICE,
};

const table: SlotTable = [
  [slot1, slot2, slot3],
  [slot4, slot5, slot6],
  [slot7, slot8, slot9],
];

function Bingo() {
  return (
    <Container>
      <BingoTable table={table} />
    </Container>
  );
}

export default Bingo;
