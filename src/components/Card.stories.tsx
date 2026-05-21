import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../components/Card';
import '../App.css';

/**
 * Card Component Story
 *
 * A simple card component that displays an emoji and can be flipped.
 * This is a basic building block of the game.
 *
 * @component
 * @example
 * <Card emoji="😊" isFlipped={false} />
 */
const meta = {
  title: 'Components/Card (Базовий)',
  component: Card,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark', value: '#2c3e50' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    emoji: {
      control: 'text',
      description: 'Емодзі, яке відображається на зворотній стороні карточки',
    },
    isFlipped: {
      control: 'boolean',
      description: 'Чи карточка перевернута, щоб показати емодзі',
    },
    isMatched: {
      control: 'boolean',
      description: 'Чи карточка була збігнена з парою',
    },
    animationSpeed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Швидкість анімації перевороту карточки',
    },
    onClick: {
      description: 'Функція обробки, яка викликається при кліку на карточку',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', minHeight: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Карточка в звичайному стані (перевернута донизу, не збігнена)
 */
export const Default: Story = {
  args: {
    emoji: '😊',
    isFlipped: false,
    isMatched: false,
    animationSpeed: 'normal',
  },
};

/**
 * Карточка, яка показує своє емодзі (перевернута вгору)
 */
export const Flipped: Story = {
  args: {
    emoji: '🎮',
    isFlipped: true,
    isMatched: false,
    animationSpeed: 'normal',
  },
};

/**
 * Карточка в стані збіги (залишається розкритою та сірувата)
 */
export const Matched: Story = {
  args: {
    emoji: '⭐',
    isFlipped: true,
    isMatched: true,
    animationSpeed: 'normal',
  },
};

/**
 * Карточка з різним емодзі
 */
export const DifferentEmoji: Story = {
  args: {
    emoji: '🚀',
    isFlipped: false,
    isMatched: false,
    animationSpeed: 'normal',
  },
};

/**
 * Карточка з швидкою анімацією перевороту
 */
export const FastAnimation: Story = {
  args: {
    emoji: '🎯',
    isFlipped: false,
    isMatched: false,
    animationSpeed: 'fast',
  },
};

/**
 * Карточка з повільною анімацією перевороту
 */
export const SlowAnimation: Story = {
  args: {
    emoji: '🎨',
    isFlipped: false,
    isMatched: false,
    animationSpeed: 'slow',
  },
};

/**
 * Інтерактивна карточка - натисніть щоб перевернути
 */
export const Interactive: Story = {
  args: {
    emoji: '🎪',
    isFlipped: false,
    isMatched: false,
    animationSpeed: 'normal',
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isFlipped, setIsFlipped] = React.useState(args.isFlipped);
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Card
          {...args}
          isFlipped={isFlipped}
          onClick={() => setIsFlipped(!isFlipped)}
        />
      </div>
    );
  },
};

