import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GameGrid } from '../components/GameGrid';
import '../App.css';

/**
 * GameGrid Component Story
 *
 * A complex component that renders a responsive grid of game cards.
 * Automatically calculates the best grid layout based on the number of cards.
 *
 * @component
 * @example
 * <GameGrid cards={cardArray} onCardClick={handleClick} />
 */

// Generate mock card data
const generateCards = (count: number) => {
  const emojis = ['😊', '🎮', '⭐', '🚀', '🎯', '🎨', '🎪', '🎭', '🎬', '🎸', '🎺', '🎻'];
  const cards = [];
  for (let i = 0; i < count; i++) {
    cards.push({
      id: i,
      emoji: emojis[i % emojis.length],
      isFlipped: false,
      isMatched: false,
    });
  }
  return cards;
};

const meta = {
  title: 'Components/GameGrid (Комплексний)',
  component: GameGrid,
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
    cards: {
      control: 'object',
      description: 'Масив карточек, які відображаються в сітці',
    },
    animationSpeed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Швидкість анімації перевороту карточок',
    },
    onCardClick: {
      description: 'Функція обробки, яка викликається при кліку на карточку',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', minHeight: '400px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GameGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Сітка легкої складності (2x4 = 8 карточек)
 */
export const EasyDifficulty: Story = {
  args: {
    cards: generateCards(8),
    animationSpeed: 'normal',
  },
};

/**
 * Сітка середної складності (2x5 = 10 карточек)
 */
export const MediumDifficulty: Story = {
  args: {
    cards: generateCards(10),
    animationSpeed: 'normal',
  },
};

/**
 * Сітка важкої складності (3x4 = 12 карточек)
 */
export const HardDifficulty: Story = {
  args: {
    cards: generateCards(12),
    animationSpeed: 'normal',
  },
};

/**
 * Сітка з частково перевернутими карточками
 */
export const PartiallyFlipped: Story = {
  args: {
    cards: generateCards(8).map((card, index) => ({
      ...card,
      isFlipped: index % 2 === 0,
    })),
    animationSpeed: 'normal',
  },
};

/**
 * Сітка з деякими зібгненими карточками
 */
export const SomeMatched: Story = {
  args: {
    cards: generateCards(8).map((card, index) => ({
      ...card,
      isMatched: index < 2,
      isFlipped: index < 2,
    })),
    animationSpeed: 'normal',
  },
};

/**
 * Сітка з швидкою анімацією
 */
export const FastAnimation: Story = {
  args: {
    cards: generateCards(8),
    animationSpeed: 'fast',
  },
};

/**
 * Сітка з повільною анімацією
 */
export const SlowAnimation: Story = {
  args: {
    cards: generateCards(8),
    animationSpeed: 'slow',
  },
};

/**
 * Інтерактивна сітка - натисніть на карточки щоб перевернути їх
 */
export const Interactive: Story = {
  args: {
    cards: generateCards(8),
    animationSpeed: 'normal',
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cards, setCards] = React.useState(args.cards || []);

    const handleCardClick = (cardId: number) => {
      setCards(
        cards.map((card) =>
          card.id === cardId ? { ...card, isFlipped: !card.isFlipped } : card
        )
      );
    };

    return (
      <div style={{ padding: '20px' }}>
        <h3>Натисніть на карточки щоб перевернути їх:</h3>
        <GameGrid {...args} cards={cards} onCardClick={handleCardClick} />
      </div>
    );
  },
};

/**
 * Порожня сітка (стан-заповнювач)
 */
export const Empty: Story = {
  args: {
    cards: [],
    animationSpeed: 'normal',
  },
};

