import { Grid, List } from 'antd';
import { FC, memo, useMemo } from 'react';

import { Maybe } from '@/interfaces/common';
import { Gene as IGene, GeneId } from '@/interfaces/gene';

import GeneListItem from '../GeneListItem';

interface Props {
  genes: IGene[];
  selectedGene: Maybe<IGene>;
  toBeSelectedGene: Maybe<IGene>;
  invalidGeneIds: GeneId[];
  searchQuery: string;
  onGeneClick: (gene: Maybe<IGene>) => void;
}

const GeneList: FC<Props> = ({
  genes,
  selectedGene,
  toBeSelectedGene,
  invalidGeneIds,
  searchQuery,
  onGeneClick,
}) => {
  const screens = Grid.useBreakpoint();

  // Filter genes by search query
  const filteredGenes = useMemo(() => {
    return genes.filter(({ name, skillName, skillDescription, monsters }) => {
      const lowercaseSearhQuery = searchQuery.toLowerCase();

      return (
        name.includes(lowercaseSearhQuery) ||
        skillName.includes(lowercaseSearhQuery) ||
        skillDescription.includes(lowercaseSearhQuery) ||
        monsters.some((monster) => monster.includes(lowercaseSearhQuery))
      );
    });
  }, [genes, searchQuery]);

  const gridParams = useMemo(() => ({ gutter: 8, column: 2, xs: 1 }), []);
  const paginationParams = useMemo(() => {
    const pageSize = screens.xs ? 4 : 6;
    return { pageSize, showSizeChanger: false, size: 'small' } as const;
  }, [screens.xs]);

  return (
    <List
      size="small"
      dataSource={filteredGenes}
      grid={gridParams}
      pagination={paginationParams}
      renderItem={(gene) => {
        const isSelected = toBeSelectedGene?.id === gene.id;
        const isDisabled =
          invalidGeneIds.includes(gene.id) && selectedGene?.id !== gene.id;

        return (
          <GeneListItem
            key={gene.id}
            gene={gene}
            selected={isSelected}
            disabled={isDisabled}
            onClick={onGeneClick}
          />
        );
      }}
    />
  );
};

export default memo(GeneList);
