// Button.stories.ts|tsx
import React, { useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RollPanel } from './';
import { generateRandomNumber } from '../../utils/generate-random-number';

export default {
  title: 'Roll Panel',
  component: RollPanel,
} as ComponentMeta<typeof RollPanel>;

export const Primary: ComponentStory<typeof RollPanel> = () => {
  const [roll, setRoll] = useState(1)

    return <RollPanel roll={roll} setRoll={() => setRoll(generateRandomNumber(100))} />
};
