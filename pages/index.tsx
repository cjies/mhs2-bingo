import { List, Space, Spin, Typography } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import Bingo from '@/components/Bingo';
import GeneListItem from '@/components/GeneListItem';
import GeneSelectionModal from '@/components/GeneSelectionModal';
import { ATTACK_TYPE } from '@/constants/attackType';
import { GENE_TYPE } from '@/constants/gene';
import { SKILL_TYPE } from '@/constants/skillType';
import { Maybe } from '@/interfaces/common';
import { Gene, GeneId, GeneTable, SelectedGene } from '@/interfaces/gene';
import {
  decodeGeneIdsFromQuery,
  encodeGeneIdsToQuery,
} from '@/utils/geneQuery';

const { Text, Link } = Typography;

const PageContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const BingoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 3rem;
`;

const SpinPlaceholder = styled.div`
  width: 100%;
  height: 100vh;
`;

const Footer = styled(Space)`
  width: 100%;
  padding: 3rem 0;
`;

const EMPTY_GENE_TABLE: GeneTable = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function HomePage() {
  const router = useRouter();
  const [allGenes, setAllGenes] = useState<Gene[]>([]);
  const [geneTable, setGeneTable] = useState(EMPTY_GENE_TABLE);
  const [selectedGene, setSelectedGene] = useState<SelectedGene | null>(null);

  useEffect(() => {
    const fetchGenesAndUpdateGeneTable = async () => {
      const res = await fetch('/api/genes');

      if (!res.ok) {
        return;
      }

      const genes = await res.json();
      setAllGenes(genes);
    };

    fetchGenesAndUpdateGeneTable();
  }, []);

  // parse selected geneIds from querystring,
  // then set into the table
  useEffect(() => {
    const { g: geneQuery } = router.query;

    if (
      geneTable === EMPTY_GENE_TABLE &&
      allGenes.length > 0 &&
      typeof geneQuery === 'string'
    ) {
      const totalGenesAmount = EMPTY_GENE_TABLE.flat().length;
      const tableColumnsAmount = EMPTY_GENE_TABLE[0].length;

      const geneIds = decodeGeneIdsFromQuery(geneQuery, totalGenesAmount);

      // reset url if the query is invalid
      if (!geneIds) {
        router.replace('/', undefined, { shallow: true });
        return;
      }

      geneIds.forEach((geneId, index) => {
        const validGene = allGenes.find(({ id }) => id === geneId);

        if (!validGene) {
          return;
        }

        setGeneTable((state) => {
          const newGeneTable = new Array(...state);
          const colIndex = index % tableColumnsAmount;
          const rowIndex = Math.ceil((index + 1) / tableColumnsAmount) - 1;

          newGeneTable[rowIndex][colIndex] = validGene;
          return newGeneTable;
        });
      });
    }
  }, [allGenes, geneTable, router]);

  // -------------------------------------
  //   Handlers
  // -------------------------------------

  const handlePageRefreshWithGeneIds = useCallback(
    (newGeneTable: GeneTable) => {
      const geneIds = newGeneTable.flat().map((gene) => gene?.id ?? null);
      const hasAnyId = geneIds.some((id) => id);

      if (!hasAnyId) {
        router.replace('/', undefined, { shallow: true });
        return;
      }

      const hashedGenes = encodeGeneIdsToQuery(geneIds);
      router.replace(`/?g=${hashedGenes}`, undefined, { shallow: true });
    },
    [router]
  );

  const handleModalApply = useCallback(
    (newGene: Maybe<Gene>) => {
      if (!selectedGene) return;
      const { rowIndex, columnIndex } = selectedGene;

      setGeneTable((state) => {
        const newGeneTable = new Array(...state);
        newGeneTable[rowIndex][columnIndex] = newGene;

        handlePageRefreshWithGeneIds(newGeneTable);
        return newGeneTable;
      });
      setSelectedGene(null);
    },
    [selectedGene, handlePageRefreshWithGeneIds]
  );

  const handleModalCancel = useCallback(() => {
    setSelectedGene(null);
  }, []);

  // -------------------------------------
  //   Render
  // -------------------------------------

  const geneTableForList = useMemo(
    () =>
      geneTable.map((row) => {
        return row.map((gene, index) => {
          if (!gene) {
            const fakeGene: Gene = {
              id: `fake-gene-${index}` as GeneId,
              type: GENE_TYPE.NORMAL,
              attackType: ATTACK_TYPE.NONE,
              name: '--',
              skillType: SKILL_TYPE.NONE,
              skillName: '',
              skillDescription: '',
              minLevel: 0,
              sp: 0,
              monsters: [],
            };
            return fakeGene;
          }
          return gene;
        });
      }),
    [geneTable]
  );
  const invalidGeneIds = useMemo(
    () =>
      geneTable
        .flat()
        .filter((gene): gene is Gene => !!gene)
        .map(({ id }) => id),
    [geneTable]
  );
  const listStyleParams = useMemo(() => ({ marginBottom: '2rem' }), []);
  const gridParams = useMemo(
    () => ({ gutter: 16, xs: 1, sm: 1, md: 1, lg: 3, xl: 3, xxl: 3 }),
    []
  );

  if (allGenes.length === 0) {
    return (
      <Spin size="large" tip="Loading...">
        <SpinPlaceholder />
      </Spin>
    );
  }

  return (
    <PageContainer>
      <Head>
        <title>物語2 羈絆基因賓果模擬器</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <BingoContainer>
        <Bingo table={geneTable} onGeneClick={setSelectedGene} />
      </BingoContainer>

      {geneTableForList.map((row, rowIndex) => (
        <List
          key={`row-${rowIndex}`}
          dataSource={row}
          grid={gridParams}
          style={listStyleParams}
          renderItem={(gene, columnIndex) => {
            const handleGeneClick = () => {
              setSelectedGene({ rowIndex, columnIndex, gene });
            };

            return (
              <GeneListItem
                key={gene.id}
                selected
                gene={gene}
                onClick={handleGeneClick}
              />
            );
          }}
        />
      ))}

      <GeneSelectionModal
        visible={!!selectedGene}
        genes={allGenes}
        selectedGene={selectedGene?.gene ?? null}
        invalidGeneIds={invalidGeneIds}
        onApply={handleModalApply}
        onCancel={handleModalCancel}
      />

      <Footer direction="vertical" align="center">
        <Text>
          {'MIT license: '}
          <Link
            underline
            type="secondary"
            href="https://github.com/cjies/mhs2-bingo"
            target="_blank"
          >
            source code
          </Link>
          {' | 👉 '}
          <Link
            underline
            type="secondary"
            href="https://github.com/cjies/mhs2-bingo/issues"
            target="_blank"
          >
            回報問題
          </Link>
          {' 👈'}
        </Text>
        <Text>
          Data sources are powered by{' '}
          <Link
            underline
            type="secondary"
            href="https://forum.gamer.com.tw/C.php?bsn=5786&snA=162812"
            target="_blank"
          >
            夕日飛回(sdu60622)
          </Link>
        </Text>
        <Text>🙏 請到巴哈支持原作者！🙏</Text>
      </Footer>
    </PageContainer>
  );
}

export default HomePage;
