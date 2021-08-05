import { List } from 'antd';
import {
  FC,
  memo,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import styled, { css } from 'styled-components';

import {
  PRIMARY_COLOR,
  STOP_CLICK_PROPAGATION_CLASSNAME,
} from '@/constants/common';
import { Maybe } from '@/interfaces/common';
import { Gene as IGene } from '@/interfaces/gene';

import Gene, { EmptyGene } from '../Gene';
import GeneItemDescriptions from './GeneItemDescriptions';

const ListItem = styled(List.Item)<{ $disabled?: boolean; $pinned?: boolean }>`
  position: relative;

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

  ${(props) =>
    props.$pinned &&
    css`
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 0.5rem;
        background-color: rgba(0, 0, 0, 0.3);
        pointer-events: none;
      }
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
  children?: ReactNode;
  onClick?: (gene: Maybe<IGene>) => void;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

const GeneListItem: FC<Props> = ({
  gene,
  selected,
  disabled,
  hovered,
  children,
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

  const handleItemClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const { className: targetClassName } = e.target as HTMLElement;

      // dirty check to stop selecting the gene
      if (
        typeof targetClassName === 'string' &&
        targetClassName.includes(STOP_CLICK_PROPAGATION_CLASSNAME)
      ) {
        e.stopPropagation();
        return;
      }

      onClick?.(selected ? null : gene);
    },
    [selected, gene, onClick]
  );

  return (
    <ListItem
      $disabled={disabled}
      $pinned={gene?.pinned}
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
      {children}
    </ListItem>
  );
};

export default memo(GeneListItem);
