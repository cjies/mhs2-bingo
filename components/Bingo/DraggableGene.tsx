import { useDraggable, useDroppable } from '@dnd-kit/core';
import { FC, memo } from 'react';
import styled, { css } from 'styled-components';

import BingoGene, { Props } from './BingoGene';

const DroppableContainer = styled.div<{ $overing: boolean }>`
  transition: filter 0.2s ease;

  ${(props) =>
    props.$overing &&
    css`
      filter: drop-shadow(0 0 10px rgba(0, 159, 255, 1));
    `}
`;

const StyledBingoGene = styled(BingoGene)<{ $dragging: boolean }>`
  cursor: ${(props) => (props.$dragging ? 'grabbing' : 'grab')};
`;

const DraggableGene: FC<Props> = (props) => {
  const { gene, rowIndex, columnIndex } = props;

  const {
    setNodeRef: setDraggableNodeRef,
    attributes: draggableAttributes,
    listeners: draggableListeners,
    isDragging,
  } = useDraggable({
    id: `draggable-gene-${rowIndex}-${columnIndex}`,
    data: { rowIndex, columnIndex, gene },
  });

  const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
    id: `droppable-gene-${rowIndex}-${columnIndex}`,
    data: { rowIndex, columnIndex, gene },
  });

  return (
    <DroppableContainer ref={setDroppableNodeRef} $overing={isOver}>
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
