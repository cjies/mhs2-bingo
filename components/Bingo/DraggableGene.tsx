import { useDraggable, useDroppable } from '@dnd-kit/core';
import { FC, memo } from 'react';
import styled, { css } from 'styled-components';

import BingoGene, { Props } from './BingoGene';

const DroppableContainer = styled.div<{ $overing: boolean; $locked?: boolean }>`
  position: relative;
  transition: filter 0.2s ease;

  ${(props) =>
    props.$overing &&
    css`
      filter: drop-shadow(0 0 10px rgba(0, 159, 255, 1));
    `}

  ${(props) =>
    props.$locked &&
    css`
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.4);
        pointer-events: none;

        /* octagon shape */
        clip-path: polygon(
          15% 15%,
          50% 0%,
          85% 15%,
          100% 50%,
          85% 85%,
          50% 100%,
          15% 85%,
          0% 50%
        );
      }
    `}
`;

const StyledBingoGene = styled(BingoGene)<{ $dragging: boolean }>`
  cursor: ${(props) => (props.$dragging ? 'grabbing' : 'grab')};
`;

const DraggableGene: FC<Props> = (props) => {
  const { gene, rowIndex, columnIndex } = props;
  const isLocked = gene?.locked;

  const {
    setNodeRef: setDraggableNodeRef,
    attributes: draggableAttributes,
    listeners: draggableListeners,
    isDragging,
  } = useDraggable({
    id: `draggable-gene-${rowIndex}-${columnIndex}`,
    data: { rowIndex, columnIndex, gene },
    disabled: isLocked,
  });

  const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
    id: `droppable-gene-${rowIndex}-${columnIndex}`,
    data: { rowIndex, columnIndex, gene },
    disabled: isLocked,
  });

  return (
    <DroppableContainer
      ref={setDroppableNodeRef}
      $overing={isOver}
      $locked={isLocked}
    >
      <StyledBingoGene
        ref={setDraggableNodeRef}
        $dragging={isDragging}
        {...props}
        {...draggableAttributes}
        {...draggableListeners}
      />
    </DroppableContainer>
  );
};

export default memo(DraggableGene);
