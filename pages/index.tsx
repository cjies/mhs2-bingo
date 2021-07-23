import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Bingo from '../components/Bingo';
import { ATTACK_TYPE } from '../constants/attackType';
import { GENE_TYPE } from '../constants/gene';
import { Gene, GeneTable } from '../interfaces/gene';

const Container = styled.div`
  display: flex;
`;

const gene1 = {
  id: '1',
  type: GENE_TYPE.NORMAL,
  attackType: ATTACK_TYPE.POWER,
};
const gene2 = {
  id: '2',
  type: GENE_TYPE.NORMAL,
  attackType: ATTACK_TYPE.POWER,
};
const gene3 = {
  id: '3',
  type: GENE_TYPE.DRAGON,
  attackType: ATTACK_TYPE.POWER,
};

const gene4 = {
  id: '4',
  type: GENE_TYPE.FIRE,
  attackType: ATTACK_TYPE.SPEED,
};
const gene5 = {
  id: '5',
  type: GENE_TYPE.ICE,
  attackType: ATTACK_TYPE.POWER,
};
const gene6 = {
  id: '6',
  type: GENE_TYPE.ICE,
  attackType: ATTACK_TYPE.SPEED,
};

const gene7 = {
  id: '7',
  type: GENE_TYPE.DRAGON,
  attackType: ATTACK_TYPE.SPEED,
};
const gene8 = {
  id: '8',
  type: GENE_TYPE.DRAGON,
  attackType: ATTACK_TYPE.SKILL,
};
const gene9 = {
  id: '9',
  type: GENE_TYPE.ICE,
  attackType: ATTACK_TYPE.SKILL,
};

const table = [
  [gene1, gene2, gene3],
  [gene4, gene5, gene6],
  [gene7, gene8, gene9],
] as GeneTable;

function Home() {
  const [allGenes, setAllGenes] = useState<Gene[]>([]);

  useEffect(() => {
    const fetchGenes = async () => {
      const res = await fetch('/api/genes');

      if (!res.ok) {
        return;
      }

      const genes = await res.json();
      setAllGenes(genes);
    };

    fetchGenes();
  }, []);

  return (
    <Container>
      <Bingo table={table} />
    </Container>
  );
}

export default Home;
