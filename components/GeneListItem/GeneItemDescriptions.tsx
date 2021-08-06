import { QuestionCircleOutlined } from '@ant-design/icons';
import { Descriptions, Tooltip } from 'antd';
import Image from 'next/image';
import { FC, memo, useMemo, useState } from 'react';
import ShowMoreText from 'react-show-more-text';
import styled from 'styled-components';

import { ATTACK_TYPE, ATTACK_TYPE_DARK_ICON } from '@/constants/attackType';
import {
  SECONDARY_COLOR,
  STOP_CLICK_PROPAGATION_CLASSNAME,
} from '@/constants/common';
import { GENE_TYPE, GENE_TYPE_ICON } from '@/constants/gene';
import { SKILL_TYPE } from '@/constants/skillType';
import { Maybe } from '@/interfaces/common';
import { Gene as IGene } from '@/interfaces/gene';

const SkillName = styled.span`
  margin-left: 0.03rem;
  margin-right: 0.5rem;
`;

const MonsterList = styled.div`
  width: 100%;

  .show-more-anchor {
    padding-left: 0.5rem;
    color: ${SECONDARY_COLOR};

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ICON_SIZE = 16; // in pixels

const SKILL_TYPE_TRANSLATION = {
  [SKILL_TYPE.ACTIVE]: '主動技能',
  [SKILL_TYPE.PASSIVE]: '被動技能',
  [SKILL_TYPE.NONE]: null,
};

interface Props {
  gene: Maybe<IGene>;
}

const GeneItemDescriptions: FC<Props> = ({ gene }) => {
  const [isMonsterListExpand, setIsMonsterListExpand] = useState(false);

  const {
    type,
    attackType,
    skillType,
    skillName,
    skillDescription,
    minLevel,
    sp,
    monsters,
    monstersDescription,
  } = gene || {};
  const descriptionItemProps = useMemo(
    () => ({
      labelStyle: { fontSize: '0.9rem', alignItems: 'center' },
      contentStyle: { fontSize: '0.9rem', alignItems: 'center' },
      style: {
        paddingBottom: '0.3rem',
        borderBottom: '1px solid rgba(181, 162, 139, 0.8)',
      },
    }),
    []
  );
  const lastDescriptionItemProps = useMemo(
    () => ({
      ...descriptionItemProps,
      style: { paddingBottom: '0.5rem' },
    }),
    [descriptionItemProps]
  );

  return (
    <Descriptions size="small" column={1}>
      {skillType && type && type !== GENE_TYPE.RAINBOW && (
        <Descriptions.Item
          {...descriptionItemProps}
          label={SKILL_TYPE_TRANSLATION[skillType]}
        >
          <Image
            src={GENE_TYPE_ICON[type]}
            width={ICON_SIZE}
            height={ICON_SIZE}
            alt={type}
          />
          <SkillName>{skillName}</SkillName>
          <Tooltip title={skillDescription}>
            <QuestionCircleOutlined />
          </Tooltip>
        </Descriptions.Item>
      )}

      {!skillType && type !== GENE_TYPE.RAINBOW && (
        <Descriptions.Item {...descriptionItemProps}>--</Descriptions.Item>
      )}

      {attackType === ATTACK_TYPE.RAINBOW && (
        <Descriptions.Item
          {...descriptionItemProps}
          label={
            <Image
              src={ATTACK_TYPE_DARK_ICON[ATTACK_TYPE.RAINBOW]}
              width={ICON_SIZE}
              height={ICON_SIZE}
              alt="rainbow"
            />
          }
        >
          {skillName}
        </Descriptions.Item>
      )}

      <Descriptions.Item {...descriptionItemProps} label="必要等級">
        {minLevel ? minLevel : '--'}
      </Descriptions.Item>
      <Descriptions.Item {...descriptionItemProps} label="消耗羈絆值">
        {sp ? `${sp} / 100` : '-- / --'}
      </Descriptions.Item>
      <Descriptions.Item {...lastDescriptionItemProps} label="可持有隨行獸">
        <MonsterList>
          <ShowMoreText
            lines={1}
            more="[展開]"
            less="[收合]"
            anchorClass={`show-more-anchor ${STOP_CLICK_PROPAGATION_CLASSNAME}`}
            expanded={isMonsterListExpand}
            onClick={setIsMonsterListExpand}
          >
            {(monsters || []).join(', ')}
            {monstersDescription ? ` (${monstersDescription})` : null}
          </ShowMoreText>
        </MonsterList>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default memo(GeneItemDescriptions);
