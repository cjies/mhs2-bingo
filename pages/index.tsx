import {
  GithubOutlined,
  PushpinFilled,
  PushpinOutlined,
  SyncOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { Button, List, Space, Typography } from 'antd';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FocusEvent, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import Bingo from '@/components/Bingo';
import BingoHeader from '@/components/BingoHeader';
import BingoTableDrawer from '@/components/BingoTableDrawer';
import GeneListItem from '@/components/GeneListItem';
import GeneSelectionModal from '@/components/GeneSelectionModal';
import { GA_EVENT } from '@/constants/gaEventName';
import { EMPTY_GENE_TABLE } from '@/constants/gene';
import { ApiResponseData } from '@/interfaces/api';
import { Maybe } from '@/interfaces/common';
import { Gene, GeneTable, SelectedGene } from '@/interfaces/gene';
import { Monster, MonsterId } from '@/interfaces/monster';
import {
  decodeGeneTableFromQuery,
  encodeGeneIdsToQuery,
} from '@/utils/geneQuery';
import { gaEvent } from '@/utils/googleAnalytics';

const { Text, Link } = Typography;

const PageContainer = styled.div`
  width: 90%;
  margin: 0 auto;
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

const Footer = styled(Space)`
  width: 100%;
  padding: 3rem 0;
`;

const DEFAULT_META_TITLE = '物語2 羈絆基因賓果模擬器';

interface HomePageServerSideProps {
  baseUrl: string;
  allGenes: Gene[];
  allMonsters: Monster[];
  defaultGeneTable: GeneTable;
  defaultCustomName: string;
  defaultMonsterId: MonsterId | null;
}

function HomePage({
  baseUrl,
  allGenes,
  allMonsters,
  defaultGeneTable,
  defaultCustomName,
  defaultMonsterId,
}: HomePageServerSideProps) {
  const router = useRouter();
  const [geneTable, setGeneTable] = useState(defaultGeneTable);
  const [customName, setCustomName] = useState(defaultCustomName);
  const [monsterId, setMonsterId] = useState(defaultMonsterId);
  const [selectedGene, setSelectedGene] = useState<SelectedGene | null>(null);
  const [hoveredGene, setHoveredGene] = useState<SelectedGene | null>(null);
  const [isBingoDrawerOpen, setIsBingoDrawerOpen] = useState(false);
  const [forceShowGeneName, setForceShowGeneName] = useState(false);

  // -------------------------------------
  //   Handlers
  // -------------------------------------

  const handleCustomNameBlur = useCallback(
    ({ target }: FocusEvent<HTMLInputElement>) => {
      const inputValue = target.value;

      router.replace(
        {
          pathname: '/',
          query: { ...router.query, n: encodeURI(inputValue) },
        },
        undefined,
        { shallow: true }
      );
      gaEvent(GA_EVENT.SET_CUSTOM_NAME, { name: inputValue });
    },
    [router]
  );

  const handleMonsterChange = useCallback(
    (newMonsterId: MonsterId, newCustomName: string) => {
      setMonsterId(newMonsterId);
      setCustomName(newCustomName);

      router.replace(
        {
          pathname: '/',
          query: {
            ...router.query,
            m: encodeURI(newMonsterId),
            n: encodeURI(newCustomName),
          },
        },
        undefined,
        { shallow: true }
      );
      gaEvent(GA_EVENT.SET_MONSTER, { monster: newMonsterId });
    },
    [router]
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

  const handleForceShowGeneNameToggle = useCallback(() => {
    setForceShowGeneName(!forceShowGeneName);
  }, [forceShowGeneName]);

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
    setMonsterId(null);
    gaEvent(GA_EVENT.RESET_TABLE);
  }, [router]);

  // -------------------------------------
  //   Render
  // -------------------------------------

  const customMonsterIcon = useMemo(() => {
    const monster = allMonsters.find(({ id }) => id === monsterId);
    return monster?.icon ?? null;
  }, [allMonsters, monsterId]);

  // Meta data
  const metaTitle = useMemo(
    () =>
      customName ? `${customName} - ${DEFAULT_META_TITLE}` : DEFAULT_META_TITLE,
    [customName]
  );
  const metaDescription = useMemo(() => {
    const geneNames = geneTable
      .flat()
      .map((gene) => gene?.name)
      .filter(Boolean);

    if (geneNames.length === 0) {
      return '基因: --';
    }

    return `基因: ${geneNames.join(' | ')}`;
  }, [geneTable]);

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

  return (
    <PageContainer>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />

        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`${baseUrl}/images/empty-genes.png`}
        />

        {/* Custom monster favicon */}
        {customMonsterIcon && (
          <link
            key="favicon"
            rel="icon"
            type="image/x-icon"
            href={customMonsterIcon}
          />
        )}
      </Head>

      <BingoHeader
        customName={customName}
        monsters={allMonsters}
        monsterId={monsterId}
        onMonsterChange={handleMonsterChange}
        onCustomNameChange={setCustomName}
        onCustomNameBlur={handleCustomNameBlur}
      />

      <BingoContainer>
        <Bingo
          table={geneTable}
          hoveredGene={hoveredGene}
          forceShowGeneName={forceShowGeneName}
          onGeneClick={handleGeneClick}
          onGeneHover={setHoveredGene}
          onTableSort={handleGeneTableSort}
        />
      </BingoContainer>

      <ActionButtonsContainer align="center">
        <Button onClick={handleForceShowGeneNameToggle}>
          {forceShowGeneName ? <PushpinOutlined /> : <PushpinFilled />}
          {forceShowGeneName ? '隱藏名稱' : '顯示名稱'}
        </Button>
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

export const getServerSideProps: GetServerSideProps<HomePageServerSideProps> =
  async ({ req, query }) => {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const baseUrl = req ? `${protocol}://${req.headers.host}` : '';
    const res = await fetch(`${baseUrl}/api/data`);

    if (!res.ok) {
      return {
        notFound: true,
      };
    }

    const { genes: allGenes, monsters: allMonsters }: ApiResponseData =
      await res.json();
    const { g: geneQuery, n: customNameQuery, m: monsterIdQuery } = query;
    let defaultGeneTable = EMPTY_GENE_TABLE;
    let defaultCustomName = '';
    let defaultMonsterId: MonsterId | null = null;

    // parse selected geneIds from querystring
    if (typeof geneQuery === 'string') {
      const { table, valid } = decodeGeneTableFromQuery(geneQuery, allGenes);

      if (!valid) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }

      defaultGeneTable = table;
    }

    // parse custom name from querystring
    if (typeof customNameQuery === 'string') {
      defaultCustomName = decodeURI(customNameQuery);
    }

    // parse monster from querystring
    if (typeof monsterIdQuery === 'string') {
      defaultMonsterId = decodeURI(monsterIdQuery) as MonsterId;
    }

    return {
      props: {
        baseUrl,
        allGenes,
        allMonsters,
        defaultGeneTable,
        defaultCustomName,
        defaultMonsterId,
      },
    };
  };

export default HomePage;
