import type { Meta, StoryObj } from '@storybook/react';

import { MonthPicker } from './MonthPicker';

const meta: Meta<typeof MonthPicker> = {
  component: MonthPicker,
};

export default meta;

type Story = StoryObj<typeof MonthPicker>;

export const FirstStory: Story = {
  args: {
    date: new Date(),
    lang: 'en',
    onChange: console.log,
  },
};
