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

import { UNKNOWN_MONSTER } from '@/constants/monster';
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
  font-size: 2rem;
  font-weight: bold;
`;

interface Props {
  customName: string;
  monsters: Monster[];
  monsterId: MonsterId | null;
  onMonsterChange: (monsterId: MonsterId, customName: string) => void;
  onCustomNameChange: (customName: string) => void;
  onCustomNameBlur: FocusEventHandler<HTMLInputElement>;
}

const BingoHeader: FC<Props> = ({
  customName,
  monsters,
  monsterId,
  onMonsterChange,
  onCustomNameChange,
  onCustomNameBlur,
}) => {
  const screens = Grid.useBreakpoint();

  const selectedMonsterId = useMemo(() => {
    if (!monsterId) {
      return UNKNOWN_MONSTER.id;
    }

    // check if it valid
    const validMonster = monsters.some(({ id }) => id === monsterId);
    return validMonster ? monsterId : UNKNOWN_MONSTER.id;
  }, [monsterId, monsters]);

  const monsterOptions = useMemo(() => {
    return [UNKNOWN_MONSTER, ...monsters];
  }, [monsters]);

  const handleCustomNameChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const inputValue = target.value;
      onCustomNameChange(inputValue);
    },
    [onCustomNameChange]
  );

  const handleMonsterChange = useCallback(
    (newMonsterId) => {
      // Replace custom name if empty or same to old monster name
      const oldMonster = monsters.find(({ id }) => id === monsterId);
      const newMonster = monsters.find(({ id }) => id === newMonsterId);
      const newCustomName =
        !customName || customName === oldMonster?.name
          ? newMonster?.name ?? ''
          : customName;

      onMonsterChange(newMonsterId, newCustomName);
    },
    [monsters, monsterId, customName, onMonsterChange]
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
        onChange={handleMonsterChange}
      >
        {monsterOptions.map((option) => (
          <Select.Option
            key={option.id}
            value={option.id}
            label={
              <Image src={option.icon} width={40} height={40} alt="icon" />
            }
          >
            <OptionText>
              <Image src={option.icon} width={20} height={20} alt="icon" />
              <span>{option.name}</span>
            </OptionText>
          </Select.Option>
        ))}
      </MonsterSelect>
    </Header>
  );
};

export default memo(BingoHeader);
