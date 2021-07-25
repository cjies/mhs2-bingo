import { List } from 'antd';
import { FC, memo, useCallback } from 'react';
import styled, { css } from 'styled-components';

import { PRIMARY_COLOR } from '@/constants/common';
import { Maybe } from '@/interfaces/common';
import { Gene as IGene } from '@/interfaces/gene';

import Gene from '../Gene';
import GeneItemDescriptions from './GeneItemDescriptions';

const ListItem = styled(List.Item)<{ $disabled?: boolean }>`
  ${(props) =>
    props.$disabled &&
    css`
      opacity: 0.6;
      pointer-events: none;
    `}
`;

const ListItemMeta = styled(List.Item.Meta)<{ $selected?: boolean }>`
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.5rem;
  border: 2px solid transparent;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    box-shadow: 0 0 10px 5px rgba(0, 159, 255, 0.5);
  }

  ${(props) =>
    props.$selected &&
    css`
      border-color: ${PRIMARY_COLOR};
    `}
`;

interface Props {
  gene: IGene;
  selected?: boolean;
  disabled?: boolean;
  onClick?: (gene: Maybe<IGene>) => void;
}

const GeneListItem: FC<Props> = ({ gene, selected, disabled, onClick }) => {
  const handleItemClick = useCallback(() => {
    onClick?.(selected ? null : gene);
  }, [selected, gene, onClick]);

  return (
    <ListItem $disabled={disabled} onClick={handleItemClick}>
      <ListItemMeta
        $selected={selected}
        avatar={
          <Gene size={3} geneType={gene.type} attackType={gene.attackType} />
        }
        title={gene.name}
        description={<GeneItemDescriptions gene={gene} />}
      />
    </ListItem>
  );
};

export default memo(GeneListItem);
