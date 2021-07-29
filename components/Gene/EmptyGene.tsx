import { forwardRef, MouseEventHandler, ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { GENE_BORDER_COLOR, GENE_EMPTY_COLOR } from '@/constants/gene';

const GeneWrapper = styled.div<{ $hovered?: boolean }>`
  position: relative;
  filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.2));
  transition: filter 0.2s ease;

  ${(props) =>
    props.onClick
      ? css`
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              filter: drop-shadow(0px 0px 5px rgba(0, 159, 255, 0.8));
            }

            ${props.$hovered &&
            css`
              filter: drop-shadow(0px 0px 5px rgba(0, 159, 255, 0.8));
            `}
          }
        `
      : ''}
`;

interface StyledBorderProps {
  $size: number;
  $borderColor?: string;
}

const GeneBorder = styled.div<StyledBorderProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${(props) => `${props.$size}rem`};
  height: ${(props) => `${props.$size}rem`};
  background-color: ${(props) => props.$borderColor || GENE_BORDER_COLOR};

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
`;

interface StyledGeneProps {
  $size: number;
  $borderSize: number;
  $backgroundColor?: string;
}

const Gene = styled.div<StyledGeneProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  width: ${(props) => `${props.$size - props.$borderSize * 2}rem`};
  height: ${(props) => `${props.$size - props.$borderSize * 2}rem`};
  background: ${(props) => props.$backgroundColor || GENE_EMPTY_COLOR};

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
`;

interface Props {
  size: number;
  borderSize: number;
  borderColor?: string;
  backgroundColor?: string;
  hovered?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

const EmptyGene = forwardRef<HTMLDivElement, Props>(
  (
    {
      size,
      borderSize,
      borderColor,
      backgroundColor,
      hovered,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <GeneWrapper ref={ref} $hovered={hovered} {...props}>
        <GeneBorder $size={size} $borderColor={borderColor}>
          <Gene
            $size={size}
            $borderSize={borderSize}
            $backgroundColor={backgroundColor}
          >
            {children}
          </Gene>
        </GeneBorder>
      </GeneWrapper>
    );
  }
);

EmptyGene.displayName = 'EmptyGene';

export default EmptyGene;
