import { GithubOutlined, SyncOutlined, TableOutlined } from '@ant-design/icons';
import { Button, Input, List, Space, Spin, Typography } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  ChangeEvent,
  FocusEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';

import Bingo from '@/components/Bingo';
import BingoTableDrawer from '@/components/BingoTableDrawer';
import GeneListItem from '@/components/GeneListItem';
import GeneSelectionModal from '@/components/GeneSelectionModal';
import { GA_EVENT } from '@/constants/gaEventName';
import { Maybe } from '@/interfaces/common';
import { Gene, GeneTable, SelectedGene } from '@/interfaces/gene';
import {
  decodeGeneIdsFromQuery,
  encodeGeneIdsToQuery,
} from '@/utils/geneQuery';
import { gaEvent } from '@/utils/googleAnalytics';

const { Text, Link } = Typography;

const PageContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const CustomNameContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 2rem 0;
`;

const CustomNameInput = styled(Input)`
  width: 18.75rem;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
`;

const BingoContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 3rem 4rem 4rem;
`;

const ActionButtonsContainer = styled(Space)`
  display: flex;
  justify-content: center;
  margin: 1rem 0 2rem;
`;

const SpinPlaceholder = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 300px;
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
  const [hoveredGene, setHoveredGene] = useState<SelectedGene | null>(null);
  const [isBingoDrawerOpen, setIsBingoDrawerOpen] = useState(false);
  const [customName, setCustomName] = useState('');

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

  // parse selected geneIds and custom name from querystring
  useEffect(() => {
    const { g: geneQuery, n: customNameQuery } = router.query;

    if (geneTable !== EMPTY_GENE_TABLE || allGenes.length === 0) {
      return;
    }

    if (typeof geneQuery === 'string') {
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

    if (typeof customNameQuery === 'string') {
      const decodedName = decodeURI(customNameQuery);
      setCustomName(decodedName);
    }
  }, [allGenes, geneTable, router]);

  // -------------------------------------
  //   Handlers
  // -------------------------------------

  const handleCustomNameChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const inputValue = target.value;
      setCustomName(inputValue);

      router.replace(
        {
          pathname: '/',
          query: { ...router.query, n: encodeURI(inputValue) },
        },
        undefined,
        { shallow: true }
      );
    },
    [router]
  );

  const handleCustomNameBlur = useCallback(
    ({ target }: FocusEvent<HTMLInputElement>) => {
      gaEvent(GA_EVENT.SET_CUSTOM_NAME, { name: target.value });
    },
    []
  );

  const handleGeneClick = useCallback((selectedGene: SelectedGene) => {
    setSelectedGene(selectedGene);
    gaEvent(GA_EVENT.CLICK_GENE, {
      rowIndex: selectedGene.rowIndex,
      columnIndex: selectedGene.columnIndex,
    });
  }, []);

  const handlePageRefreshWithGeneIds = useCallback(
    (newGeneTable: GeneTable) => {
      const geneIds = newGeneTable.flat().map((gene) => gene?.id ?? null);
      const hasAnyId = geneIds.some((id) => id);

      if (!hasAnyId) {
        router.replace('/', undefined, { shallow: true });
        return;
      }

      const hashedGenes = encodeGeneIdsToQuery(geneIds);
      router.replace(
        {
          pathname: '/',
          query: { ...router.query, g: hashedGenes },
        },
        undefined,
        { shallow: true }
      );
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

      // track behavior
      if (newGene) {
        gaEvent(GA_EVENT.ADD_GENE, {
          gene: newGene,
          rowIndex,
          columnIndex,
        });
      } else {
        gaEvent(GA_EVENT.RESET_GENE, { rowIndex, columnIndex });
      }
    },
    [selectedGene, handlePageRefreshWithGeneIds]
  );

  const handleModalCancel = useCallback(() => {
    setSelectedGene(null);
  }, []);

  const handleBingoDrawerOpen = useCallback(() => {
    setIsBingoDrawerOpen(true);
    gaEvent(GA_EVENT.VIEW_BINGO_DRAWER);
  }, []);

  const handleBingoDrawerClose = useCallback(() => {
    setIsBingoDrawerOpen(false);
  }, []);

  // update the table by swapping the genes
  const handleGeneTableSort = useCallback(
    (newGeneTable: GeneTable) => {
      handlePageRefreshWithGeneIds(newGeneTable);
      setGeneTable(newGeneTable);
    },
    [handlePageRefreshWithGeneIds]
  );

  const handleGeneTableReset = useCallback(() => {
    const newGeneTable = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];

    router.push('/', undefined);
    setGeneTable(newGeneTable);
    setCustomName('');
    gaEvent(GA_EVENT.RESET_TABLE);
  }, [router]);

  // -------------------------------------
  //   Render
  // -------------------------------------

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
      <Spin size="large">
        <SpinPlaceholder />
      </Spin>
    );
  }

  return (
    <PageContainer>
      <Head>
        <title>
          {customName
            ? `${customName} - 物語2 羈絆基因賓果模擬器`
            : '物語2 羈絆基因賓果模擬器'}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <CustomNameContainer>
        <CustomNameInput
          size="large"
          placeholder="客製化名稱"
          bordered={false}
          maxLength={15}
          value={customName}
          onChange={handleCustomNameChange}
          onBlur={handleCustomNameBlur}
        />
      </CustomNameContainer>

      <BingoContainer>
        <Bingo
          table={geneTable}
          hoveredGene={hoveredGene}
          onGeneClick={handleGeneClick}
          onGeneHover={setHoveredGene}
          onTableSort={handleGeneTableSort}
        />
      </BingoContainer>

      <ActionButtonsContainer align="center">
        <Button onClick={handleBingoDrawerOpen}>
          <TableOutlined />
          賓果加成清單
        </Button>
        <Button type="primary" onClick={handleGeneTableReset}>
          <SyncOutlined />
          重設
        </Button>
      </ActionButtonsContainer>

      {geneTable.map((row, rowIndex) => {
        // antdesign doesn't accept null item
        const geneRow = row.map((gene) => gene ?? '');

        return (
          <List
            key={`row-${rowIndex}`}
            dataSource={geneRow}
            grid={gridParams}
            style={listStyleParams}
            renderItem={(col, columnIndex) => {
              const gene = col || null;
              const isHovered =
                hoveredGene?.rowIndex === rowIndex &&
                hoveredGene?.columnIndex === columnIndex;

              const handleGeneClick = () => {
                setSelectedGene({ rowIndex, columnIndex, gene });
                gaEvent(GA_EVENT.CLICK_LIST_ITEM, {
                  rowIndex,
                  columnIndex,
                });
              };
              const handleMouseEnter = () => {
                setHoveredGene({ rowIndex, columnIndex, gene });
              };
              const handleMouseLeave = () => {
                setHoveredGene(null);
              };

              return (
                <GeneListItem
                  key={gene?.id ?? `empty-gene-${rowIndex}-${columnIndex}`}
                  gene={gene}
                  selected
                  hovered={isHovered}
                  onClick={handleGeneClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              );
            }}
          />
        );
      })}

      <BingoTableDrawer
        visible={isBingoDrawerOpen}
        geneTable={geneTable}
        onClose={handleBingoDrawerClose}
      />

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
          {'MIT License : '}
          <Link href="https://github.com/cjies/mhs2-bingo" target="_blank">
            <GithubOutlined />
          </Link>
          {' | '}
          <Link
            underline
            href="https://github.com/cjies/mhs2-bingo/issues"
            target="_blank"
          >
            回報問題
          </Link>
        </Text>
        <Text>
          Genes data are powered by{' '}
          <Link
            underline
            href="https://forum.gamer.com.tw/C.php?bsn=5786&snA=162812"
            target="_blank"
          >
            夕日飛回(sdu60622)
          </Link>
        </Text>
      </Footer>
    </PageContainer>
  );
}

export default HomePage;
