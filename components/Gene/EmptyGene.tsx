import { forwardRef, MouseEventHandler, ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { GENE_BORDER_COLOR, GENE_EMPTY_COLOR } from '@/constants/gene';

const GeneWrapper = styled.div<{ $hovered?: boolean }>`
  position: relative;
  filter: drop-shadow(0px 0px 1px ${GENE_BORDER_COLOR});
  transition: filter 0.2s ease;

  ${(props) =>
    props.onClick
      ? css`
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              filter: drop-shadow(0 0 10px rgba(0, 159, 255, 1));
            }

            ${props.$hovered &&
            css`
              filter: drop-shadow(0 0 10px rgba(0, 159, 255, 1));
            `}
          }
        `
      : ''}
`;

interface OuterBorderProps {
  $size: number;
  $borderColor?: string;
}

const GeneOuterBorder = styled.div<OuterBorderProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${(props) => `${props.$size}rem`};
  height: ${(props) => `${props.$size}rem`};
  background: ${(props) => props.$borderColor || GENE_BORDER_COLOR};

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

interface InnerBorderProps {
  $size: number;
  $borderSize: number;
  $borderColor?: string;
}

const GeneInnerBorder = styled.div<InnerBorderProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${(props) => `${props.$size - props.$borderSize * 2.5}rem`};
  height: ${(props) => `${props.$size - props.$borderSize * 2.5}rem`};
  background: ${(props) => props.$borderColor || GENE_EMPTY_COLOR};

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
  $hasBackground?: boolean;
}

const Gene = styled.div<StyledGeneProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  width: ${(props) => `${props.$size - props.$borderSize * 5}rem`};
  height: ${(props) => `${props.$size - props.$borderSize * 5}rem`};

  ${(props) =>
    props.$hasBackground &&
    css`
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.5) 0%,
        rgba(255, 255, 255, 0) 70%,
        rgba(255, 255, 255, 0) 80%,
        rgba(255, 255, 255, 0.3) 100%
      );
    `}

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
        <GeneOuterBorder $size={size} $borderColor={borderColor}>
          <GeneInnerBorder
            $size={size}
            $borderSize={borderSize}
            $borderColor={backgroundColor}
          >
            <Gene
              $size={size}
              $borderSize={borderSize}
              $hasBackground={!!backgroundColor}
            >
              {children}
            </Gene>
          </GeneInnerBorder>
        </GeneOuterBorder>
      </GeneWrapper>
    );
  }
);

EmptyGene.displayName = 'EmptyGene';

export default EmptyGene;
