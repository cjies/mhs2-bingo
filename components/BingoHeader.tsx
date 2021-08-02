import { Grid, Input, Select } from 'antd';
import Image from 'next/image';
import {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  memo,
  useCallback,
  useMemo,
} from 'react';
import styled from 'styled-components';

import { DEFAULT_MONSTER_ICON, MONSTER_ICON } from '@/constants/monster';
import { Monster, MonsterId } from '@/interfaces/monster';

const Header = styled.div<{ $maxWidth: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0 0;
  max-width: ${(props) => props.$maxWidth};
  margin: 0 auto;
`;

const MonsterSelect = styled(Select)`
  flex-shrink: 0;
`;

const OptionText = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  > span {
    margin-left: 0.5rem;
  }
`;

const CustomNameInput = styled(Input)`
  /* width: 17.5rem; */
  font-size: 2.5rem;
  font-weight: bold;
`;

const DEFAULT_MONSTER_OPTION = {
  id: '0',
  name: '未知',
  imgSrc: DEFAULT_MONSTER_ICON,
};

interface Props {
  customName: string;
  monsters: Monster[];
  monsterId: MonsterId | null;
  onCustomNameChange: ChangeEventHandler<HTMLInputElement>;
  onCustomNameBlur: FocusEventHandler<HTMLInputElement>;
  onMonsterChange: (monsterId: MonsterId) => void;
}

const BingoHeader: FC<Props> = ({
  customName,
  monsters,
  monsterId,
  onCustomNameChange,
  onCustomNameBlur,
  onMonsterChange,
}) => {
  const screens = Grid.useBreakpoint();

  const selectedMonsterId = useMemo(() => {
    if (!monsterId) {
      return DEFAULT_MONSTER_OPTION.id;
    }

    // check if it valid
    const validMonster = monsters.some(({ id }) => id === monsterId);
    return validMonster ? monsterId : DEFAULT_MONSTER_OPTION.id;
  }, [monsterId, monsters]);

  const monsterOptions = useMemo(() => {
    const options = monsters.map((monster) => ({
      ...monster,
      imgSrc: MONSTER_ICON[monster.name] || DEFAULT_MONSTER_ICON,
    }));
    return [DEFAULT_MONSTER_OPTION, ...options];
  }, [monsters]);

  const handleMonsterChange = useCallback(
    (value) => {
      onMonsterChange(value);
    },
    [onMonsterChange]
  );

  return (
    <Header $maxWidth={screens.xs ? '20rem' : '25rem'}>
      <CustomNameInput
        size="large"
        placeholder="客製化名稱"
        bordered={false}
        maxLength={15}
        value={customName}
        onChange={onCustomNameChange}
        onBlur={onCustomNameBlur}
      />

      <MonsterSelect
        size="large"
        optionLabelProp="label"
        bordered={false}
        dropdownMatchSelectWidth={false}
        value={selectedMonsterId}
        onChange={handleMonsterChange}
      >
        {monsterOptions.map((option) => (
          <Select.Option
            key={option.id}
            value={option.id}
            label={
              <Image src={option.imgSrc} width={40} height={40} alt="icon" />
            }
          >
            <OptionText>
              <Image src={option.imgSrc} width={20} height={20} alt="icon" />
              <span>{option.name}</span>
            </OptionText>
          </Select.Option>
        ))}
      </MonsterSelect>
    </Header>
  );
};

export default memo(BingoHeader);
