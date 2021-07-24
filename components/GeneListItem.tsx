import { List } from 'antd';
import { FC, memo, useCallback } from 'react';
import styled, { css } from 'styled-components';

import { PRIMARY_COLOR } from '@/constants/common';
import { Maybe } from '@/interfaces/common';
import { Gene as IGene } from '@/interfaces/gene';

import Gene from './Gene';

const ListItem = styled(List.Item)<{ $disabled?: boolean }>`
  ${(props) =>
    props.$disabled &&
    css`
      opacity: 0.6;
      pointer-events: none;
    `}
`;

const ListItemMeta = styled(List.Item.Meta)<{ $selected?: boolean }>`
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.5rem;

  ${(props) =>
    props.$selected &&
    css`
      border: 2px solid ${PRIMARY_COLOR};
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
        description={
          <div>
            <div>{`${gene.skillType}: ${gene.skillName}`}</div>
            <div>{gene.skillDescription}</div>
            <div>{`必要等級: ${gene.minLevel}`}</div>
            <div>{`消耗羈絆值: ${gene.sp ? `${gene.sp} / 100` : '--'}`}</div>
            <div>{`可持有隨行獸: ${gene.monsters.join(', ')}`}</div>
          </div>
        }
      />
    </ListItem>
  );
};

export default memo(GeneListItem);