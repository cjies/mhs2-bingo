import { Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Bingo from '../components/Bingo';
import GeneSelectionModal from '../components/GeneSelectionModal';
import { Maybe } from '../interfaces/common';
import { Gene, GeneTable, SelectedGene } from '../interfaces/gene';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const EMPTY_GENE_TABLE: GeneTable = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function Home() {
  const [allGenes, setAllGenes] = useState<Gene[]>([]);
  const [geneTable, setGeneTable] = useState(EMPTY_GENE_TABLE);
  const [selectedGene, setSelectedGene] = useState<SelectedGene | null>(null);

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

  // -------------------------------------
  //   Handlers
  // -------------------------------------

  const handleModalApply = useCallback(
    (newGene: Maybe<Gene>) => {
      if (!selectedGene) return;
      const { rowIndex, columnIndex } = selectedGene;

      setGeneTable((state) => {
        const newGeneTable = new Array(...state);
        newGeneTable[rowIndex][columnIndex] = newGene;
        return newGeneTable;
      });
      setSelectedGene(null);
    },
    [selectedGene]
  );

  const handleModalCancel = useCallback(() => {
    setSelectedGene(null);
  }, []);

  // -------------------------------------
  //   Render
  // -------------------------------------

  if (allGenes.length === 0) {
    return (
      <Spin size="large" tip="Loading...">
        <Container />
      </Spin>
    );
  }

  return (
    <Container>
      <Bingo table={geneTable} onGeneClick={setSelectedGene} />

      <GeneSelectionModal
        visible={!!selectedGene}
        genes={allGenes}
        selectedGene={selectedGene?.gene ?? null}
        onApply={handleModalApply}
        onCancel={handleModalCancel}
      />
    </Container>
  );
}

export default Home;
