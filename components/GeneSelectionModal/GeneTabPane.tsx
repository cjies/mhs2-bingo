import { Input, List } from 'antd';
import { FC, memo, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Maybe } from '@/interfaces/common';
import { Gene as IGene, GeneId } from '@/interfaces/gene';

import GeneListItem from '../GeneListItem';

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.5rem 1.15em 2rem;
`;

interface Props {
  searchPlaceholder: string;
  genes: IGene[];
  selectedGene: Maybe<IGene>;
  toBeSelectedGene: Maybe<IGene>;
  invalidGeneIds: GeneId[];
  onGeneClick: (gene: Maybe<IGene>) => void;
}

const GeneTabPane: FC<Props> = ({
  searchPlaceholder,
  genes,
  selectedGene,
  toBeSelectedGene,
  invalidGeneIds,
  onGeneClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

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

  const gridParms = useMemo(() => ({ gutter: 8, column: 2, xs: 1 }), []);
  const paginationParams = useMemo(
    () => ({ pageSize: 6, showSizeChanger: false, size: 'small' } as const),
    []
  );

  return (
    <>
      <SearchContainer>
        <Input.Search
          allowClear
          enterButton="搜尋"
          placeholder={searchPlaceholder ?? ''}
          onSearch={setSearchQuery}
          style={{ width: 300 }}
        />
      </SearchContainer>

      <List
        size="small"
        dataSource={filteredGenes}
        grid={gridParms}
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
    </>
  );
};

export default memo(GeneTabPane);
