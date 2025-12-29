import { useState, useCallback, useEffect } from 'react';
import type { Card, GameDifficulty } from '../types/game';

const EMOJI_LIST = [
  '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂',
  '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
  '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪',
  '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😲',
  '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢',
];

const getRandomEmojis = (count: number): string[] => {
  const shuffled = [...EMOJI_LIST].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const useGame = (difficulty: GameDifficulty) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  // Ініціалізація гри
  const initializeGame = useCallback(() => {
    const pairCount = difficulty.emojiCount;
    const selectedEmojis = getRandomEmojis(pairCount);
    const duplicatedEmojis = [...selectedEmojis, ...selectedEmojis];
    
    const shuffled = duplicatedEmojis.sort(() => Math.random() - 0.5);
    
    const newCards: Card[] = shuffled.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
  }, [difficulty]);

  // Ініціалізація при завантаженні
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Перевірка матчингу
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards[first];
      const secondCard = cards[second];

      setMoves(prev => prev + 1);

      if (firstCard.emoji === secondCard.emoji) {
        // Якщо карти мачаться, додаємо їх до matchedPairs
        setMatchedPairs(prev => [...prev, first, second]);
        setFlippedCards([]);
      } else {
        // Якщо не мачаються, затримка перед закриттям
        const timer = setTimeout(() => {
          setFlippedCards([]);
        }, 600);

        return () => clearTimeout(timer);
      }
    }
  }, [flippedCards, cards]);

  // Клік по карті
  const flipCard = useCallback((cardId: number) => {
    if (flippedCards.length >= 2 || matchedPairs.includes(cardId)) {
      return;
    }

    if (flippedCards.includes(cardId)) {
      return;
    }

    setFlippedCards([...flippedCards, cardId]);
  }, [flippedCards, matchedPairs]);

  // Перезапуск гри
  const resetGame = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  // Отримання відображаємих карт
  const displayCards = cards.map(card => ({
    ...card,
    isFlipped: flippedCards.includes(card.id) || matchedPairs.includes(card.id),
    isMatched: matchedPairs.includes(card.id),
  }));

  const isGameComplete = matchedPairs.length === cards.length && cards.length > 0;

  return {
    cards: displayCards,
    flipCard,
    resetGame,
    moves,
    matchedPairs: matchedPairs.length / 2,
    totalPairs: difficulty.emojiCount,
    isGameComplete,
  };
};
