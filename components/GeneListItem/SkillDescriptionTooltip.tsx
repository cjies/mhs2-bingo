import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React, { FC, useMemo } from 'react';
import styled from 'styled-components';

import { convertMultiLineTextToParagraph } from '@/utils/text';

interface Props {
  text: string | undefined;
  className?: string;
}

const SkillDescriptionTooltip: FC<Props> = ({ className, text }) => {
  const tooltipTitle = useMemo(() => {
    if (!text) {
      return undefined;
    }

    return convertMultiLineTextToParagraph(text);
  }, [text]);

  return (
    <Tooltip title={tooltipTitle} overlayClassName={className}>
      <QuestionCircleOutlined />
    </Tooltip>
  );
};

export default styled(SkillDescriptionTooltip)`
  max-width: 480px;
  font-size: 0.8rem;
`;
