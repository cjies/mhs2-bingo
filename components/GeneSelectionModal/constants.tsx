import Image from 'next/image';
import styled from 'styled-components';

import { ATTACK_TYPE, ATTACK_TYPE_DARK_ICON } from '@/constants/attackType';
import { GENE_TYPE, GENE_TYPE_ICON } from '@/constants/gene';

const Label = styled.div`
  padding-right: 1rem;
`;

const LabelText = styled.span`
  margin-right: 0.25rem;

  & + div {
    vertical-align: middle;
  }
`;

export const ALL_TYPE = 'ALL';

export const GENE_TYPE_OPTIONS = [
  {
    key: GENE_TYPE.NORMAL,
    label: (
      <Label>
        <LabelText>無屬性</LabelText>
        <Image
          src={GENE_TYPE_ICON[GENE_TYPE.NORMAL]}
          width={20}
          height={20}
          alt="無屬性"
        />
      </Label>
    ),
    searchPlaceholder: '無屬性基因',
  },
  {
    key: GENE_TYPE.FIRE,
    label: (
      <Label>
        <LabelText>火屬性</LabelText>
        <Image
          src={GENE_TYPE_ICON[GENE_TYPE.FIRE]}
          width={20}
          height={20}
          alt="火屬性"
        />
      </Label>
    ),
    searchPlaceholder: '火屬性基因',
  },
  {
    key: GENE_TYPE.WATER,
    label: (
      <Label>
        <LabelText>水屬性</LabelText>
        <Image
          src={GENE_TYPE_ICON[GENE_TYPE.WATER]}
          width={20}
          height={20}
          alt="水屬性"
        />
      </Label>
    ),
    searchPlaceholder: '水屬性基因',
  },
  {
    key: GENE_TYPE.THUNDER,
    label: (
      <Label>
        <LabelText>雷屬性</LabelText>
        <Image
          src={GENE_TYPE_ICON[GENE_TYPE.THUNDER]}
          width={20}
          height={20}
          alt="雷屬性"
        />
      </Label>
    ),
    searchPlaceholder: '雷屬性基因',
  },
  {
    key: GENE_TYPE.ICE,
    label: (
      <Label>
        <LabelText>冰屬性</LabelText>
        <Image
          src={GENE_TYPE_ICON[GENE_TYPE.ICE]}
          width={20}
          height={20}
          alt="冰屬性"
        />
      </Label>
    ),
    searchPlaceholder: '冰屬性基因',
  },
  {
    key: GENE_TYPE.DRAGON,
    label: (
      <Label>
        <LabelText>龍屬性</LabelText>
        <Image
          src={GENE_TYPE_ICON[GENE_TYPE.DRAGON]}
          width={20}
          height={20}
          alt="龍屬性"
        />
      </Label>
    ),
    searchPlaceholder: '龍屬性基因',
  },
];

export const ATTACK_TYPE_OPTIONS = [
  {
    key: ATTACK_TYPE.POWER,
    label: (
      <Label>
        <LabelText>力量</LabelText>
        <Image
          src={ATTACK_TYPE_DARK_ICON[ATTACK_TYPE.POWER]}
          width={20}
          height={20}
          alt="力量"
        />
      </Label>
    ),
    searchPlaceholder: '力量基因',
  },
  {
    key: ATTACK_TYPE.SPEED,
    label: (
      <Label>
        <LabelText>速度</LabelText>
        <Image
          src={ATTACK_TYPE_DARK_ICON[ATTACK_TYPE.SPEED]}
          width={20}
          height={20}
          alt="速度"
        />
      </Label>
    ),
    searchPlaceholder: '速度基因',
  },
  {
    key: ATTACK_TYPE.SKILL,
    label: (
      <Label>
        <LabelText>技巧</LabelText>
        <Image
          src={ATTACK_TYPE_DARK_ICON[ATTACK_TYPE.SKILL]}
          width={20}
          height={20}
          alt="技巧"
        />
      </Label>
    ),
    searchPlaceholder: '技巧基因',
  },
];

export const TABS = [
  {
    key: ALL_TYPE,
    label: '全部',
    searchPlaceholder: '全部基因',
  },
  ...GENE_TYPE_OPTIONS,
  ...ATTACK_TYPE_OPTIONS,
];
