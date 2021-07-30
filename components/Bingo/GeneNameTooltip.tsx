import { Tooltip, TooltipProps } from 'antd';
import { FC } from 'react';
import styled from 'styled-components';

type Props = TooltipProps & {
  className?: string;
};

const GeneNameTooltip: FC<Props> = ({ className, ...props }) => (
  <Tooltip placement="bottom" overlayClassName={className} {...props} />
);

export default styled(GeneNameTooltip)`
  padding: 0;

  .ant-tooltip-arrow {
    opacity: 0;
  }

  .ant-tooltip-inner {
    min-height: 0;
    padding: 0.25rem;
    margin-top: -2rem;

    line-height: 1rem;
    font-size: 0.8rem;
  }
`;
