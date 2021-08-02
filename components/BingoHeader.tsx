import { Grid, Input, Select } from 'antd';
import Image from 'next/image';
import {
  ChangeEvent,
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
  padding: 1.5rem 0 0;
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
  onMonsterIdChange: (monsterId: MonsterId) => void;
  onCustomNameChange: (customName: string) => void;
  onCustomNameBlur: FocusEventHandler<HTMLInputElement>;
}

const BingoHeader: FC<Props> = ({
  customName,
  monsters,
  monsterId,
  onMonsterIdChange,
  onCustomNameChange,
  onCustomNameBlur,
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

  const handleCustomNameChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const inputValue = target.value;
      onCustomNameChange(inputValue);
    },
    [onCustomNameChange]
  );

  const handleMonsterIdChange = useCallback(
    (newMonsterId) => {
      // Replace custom name if empty or same to old monster name
      const oldMonster = monsters.find(({ id }) => id === monsterId);
      const newMonster = monsters.find(({ id }) => id === newMonsterId);
      if (!customName || customName === oldMonster?.name) {
        onCustomNameChange(newMonster?.name ?? '');
      }

      onMonsterIdChange(newMonsterId);
    },
    [monsters, monsterId, customName, onCustomNameChange, onMonsterIdChange]
  );

  return (
    <Header $maxWidth={screens.xs ? '20rem' : '25rem'}>
      <CustomNameInput
        size="large"
        placeholder="客製化名稱"
        bordered={false}
        maxLength={15}
        value={customName}
        onChange={handleCustomNameChange}
        onBlur={onCustomNameBlur}
      />

      <MonsterSelect
        size="large"
        optionLabelProp="label"
        bordered={false}
        dropdownMatchSelectWidth={false}
        value={selectedMonsterId}
        onChange={handleMonsterIdChange}
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
