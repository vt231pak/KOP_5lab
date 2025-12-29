import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { StartPage, GamePage, ResultsPage } from './pages';
import { useGameState, useGame, useGameStats } from './hooks';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { setCurrentPage, setGameResults } from './store/slices/gameSlice';
import { startGame as startGameStats, updateStats, endGame } from './store/slices/statsSlice';
import type { RootState } from './store';

function App() {
  const dispatch = useDispatch();
  const gameState = useGameState();
  const gameLogic = useGame(gameState.difficulty);
  const stats = useGameStats();
  const [showResultsModal, setShowResultsModal] = useState(false);
  const gameCompletedRef = useRef(false);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const userId = (params as any).userId ?? 'me';
  
  // Redux state
  const currentPage = useSelector((state: RootState) => state.game.currentPage);
  const reduxDifficulty = useSelector((state: RootState) => state.game.difficulty);

  // Синхронізація Redux difficulty з gameState
  useEffect(() => {
    if (reduxDifficulty && reduxDifficulty.level) {
      gameState.selectDifficulty(reduxDifficulty.level, { 
        difficulties: { easy: 8, medium: 10, hard: 12 }, 
        animationSpeed: 'normal' 
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxDifficulty?.level]);

  // Запуск таймера гри
  useEffect(() => {
    if (currentPage === 'game') {
      stats.startGame();
      dispatch(startGameStats());
      gameCompletedRef.current = false;
      setShowResultsModal(false);
    }
  }, [currentPage, dispatch]);

  // Оновлення статистики та перевірка завершення
  useEffect(() => {
    if (currentPage !== 'game') return;

    dispatch(updateStats({ moves: gameLogic.moves, matchedPairs: gameLogic.matchedPairs, totalPairs: gameLogic.totalPairs }));
    stats.updateStats(gameLogic.moves, gameLogic.matchedPairs, gameLogic.totalPairs);

    // Завершення гри тільки якщо всі пари знайдені
    if (!gameCompletedRef.current && gameLogic.matchedPairs > 0 && gameLogic.matchedPairs === gameLogic.totalPairs) {
      gameCompletedRef.current = true;
      stats.endGame();
      dispatch(endGame());
      setTimeout(() => {
        const elapsedTime = stats.getElapsedTime();
        gameState.goToResults(gameLogic.moves, elapsedTime);
        dispatch(setGameResults({ moves: gameLogic.moves, time: elapsedTime, difficulty: gameState.difficulty?.level || 'easy' }));
        dispatch(setCurrentPage('results'));
        setShowResultsModal(true);
      }, 500);
    }
  }, [gameLogic.moves, gameLogic.matchedPairs, gameLogic.totalPairs, currentPage, dispatch, gameState]);

  const handleNewGame = () => {
    gameLogic.resetGame();
    stats.resetStats();
    gameState.startNewGame();
    dispatch(setCurrentPage('game'));
    setShowResultsModal(false);
  };

  const handleBackToMenu = () => {
    gameLogic.resetGame();
    stats.resetStats();
    gameState.goToMenu();
    dispatch(setCurrentPage('start'));
    setShowResultsModal(false);
  };

  const handleSelectDifficulty = (level: 'easy' | 'medium' | 'hard') => {
    gameState.selectDifficulty(level, { difficulties: { easy: 8, medium: 10, hard: 12 }, animationSpeed: 'normal' });
  };

  // Sync game state -> URL
  useEffect(() => {
    const page = currentPage;
    // navigate to /:userId/:page
    navigate(`/${userId}/${page}`, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Sync URL -> game state (when user navigates manually)
  useEffect(() => {
    if (!location || !location.pathname) return;
    const parts = location.pathname.split('/').filter(Boolean);
    // parts: [userId, page]
    const page = parts[1] ?? 'start';
    if (page === 'start') {
      gameState.setPage('start');
      dispatch(setCurrentPage('start'));
    } else if (page === 'game') {
      gameState.setPage('game');
      dispatch(setCurrentPage('game'));
    } else if (page === 'results') {
      gameState.setPage('results');
      dispatch(setCurrentPage('results'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <UserProvider userId={userId}>
      <div className="App">
        {currentPage === 'start' && (
          <StartPage
            onSelectDifficulty={handleSelectDifficulty}
          />
        )}
        {currentPage === 'game' && (
          <GamePage
            moves={gameLogic.moves}
            matchedPairs={gameLogic.matchedPairs}
            totalPairs={gameLogic.totalPairs}
            cards={gameLogic.cards}
            onCardClick={gameLogic.flipCard}
            onBackToMenu={handleBackToMenu}
            onNewGame={handleNewGame}
            showResultsModal={showResultsModal}
            onPlayAgain={handleNewGame}
          />
        )}
        {currentPage === 'results' && (
          <ResultsPage
            onPlayAgain={handleNewGame}
            onBackToMenu={handleBackToMenu}
          />
        )}
      </div>
    </UserProvider>
  );
}

export default App;
