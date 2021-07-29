import { List } from 'antd';
import { FC, memo, MouseEventHandler, useCallback, useMemo } from 'react';
import styled, { css } from 'styled-components';

import { PRIMARY_COLOR } from '@/constants/common';
import { Maybe } from '@/interfaces/common';
import { Gene as IGene } from '@/interfaces/gene';

import Gene, { EmptyGene } from '../Gene';
import GeneItemDescriptions from './GeneItemDescriptions';

const ListItem = styled(List.Item)<{ $disabled?: boolean }>`
  ${(props) =>
    props.onClick
      ? css`
          cursor: pointer;
        `
      : ''}

  ${(props) =>
    props.$disabled &&
    css`
      opacity: 0.6;
      pointer-events: none;
    `}
`;

const ListItemMeta = styled(List.Item.Meta)<{
  $selected?: boolean;
  $hovered?: boolean;
}>`
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.5rem;
  border: 2px solid transparent;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      box-shadow: 0 0 10px 5px rgba(0, 159, 255, 0.8);
    }

    ${(props) =>
      props.$hovered &&
      css`
        box-shadow: 0 0 10px 5px rgba(0, 159, 255, 0.8);
      `}
  }

  ${(props) =>
    props.$selected &&
    css`
      border-color: ${PRIMARY_COLOR};
    `}
`;

interface Props {
  gene: Maybe<IGene>;
  selected?: boolean;
  disabled?: boolean;
  hovered?: boolean;
  onClick?: (gene: Maybe<IGene>) => void;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

const GeneListItem: FC<Props> = ({
  gene,
  selected,
  disabled,
  hovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const geneAvatar = useMemo(() => {
    const size = 3;
    const borderSize = 0.2;

    if (!gene) {
      return <EmptyGene size={size} borderSize={borderSize} />;
    }

    return (
      <Gene
        size={size}
        borderSize={borderSize}
        geneLevel={gene?.level}
        geneType={gene.type}
        attackType={gene.attackType}
      />
    );
  }, [gene]);

  const handleItemClick = useCallback(() => {
    onClick?.(selected ? null : gene);
  }, [selected, gene, onClick]);

  return (
    <ListItem
      $disabled={disabled}
      onClick={handleItemClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ListItemMeta
        $selected={selected}
        $hovered={hovered}
        avatar={geneAvatar}
        title={gene?.name ?? '--'}
        description={<GeneItemDescriptions gene={gene} />}
      />
    </ListItem>
  );
};

export default memo(GeneListItem);
