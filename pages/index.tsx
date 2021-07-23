import { useEffect, useState } from 'react';
import styled from 'styled-components';

import BingoTable from '../components/BingoTable';
import { CATEGORY } from '../constants/category';
import { TYPE } from '../constants/type';
import { Slot, SlotTable } from '../interfaces/slot';

const Container = styled.div`
  display: flex;
`;

const slot1 = {
  id: '1',
  category: CATEGORY.POWER,
  type: TYPE.NORMAL,
};
const slot2 = {
  id: '2',
  category: CATEGORY.POWER,
  type: TYPE.NORMAL,
};
const slot3 = {
  id: '3',
  category: CATEGORY.POWER,
  type: TYPE.DRAGON,
};

const slot4 = {
  id: '4',
  category: CATEGORY.SPEED,
  type: TYPE.FIRE,
};
const slot5 = {
  id: '5',
  category: CATEGORY.POWER,
  type: TYPE.ICE,
};
const slot6 = {
  id: '6',
  category: CATEGORY.SPEED,
  type: TYPE.ICE,
};

const slot7 = {
  id: '7',
  category: CATEGORY.SPEED,
  type: TYPE.DRAGON,
};
const slot8 = {
  id: '8',
  category: CATEGORY.SKILL,
  type: TYPE.DRAGON,
};
const slot9 = {
  id: '9',
  category: CATEGORY.SKILL,
  type: TYPE.ICE,
};

const table = [
  [slot1, slot2, slot3],
  [slot4, slot5, slot6],
  [slot7, slot8, slot9],
] as SlotTable;

function Bingo() {
  const [allSlots, setAllSlots] = useState<Slot[]>([]);

  useEffect(() => {
    const fetchSlots = async () => {
      const res = await fetch('/api/slots');

      if (!res.ok) {
        return;
      }

      const slots = await res.json();
      setAllSlots(slots);
    };

    fetchSlots();
  }, []);

  return (
    <Container>
      <BingoTable table={table} />
    </Container>
  );
}

export default Bingo;
