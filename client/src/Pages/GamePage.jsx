import React, { useState, useEffect, useCallback } from "react";
import { useCourseStore } from "../store/useCourseStore";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Trophy,
  Clock,
  Zap,
  RotateCcw,
  Home,
  Sparkles,
  Target,
  Star,
  Flame,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ItemTypes = {
  TERM: "term",
};

// Draggable Term Component with epic effects
const DraggableTerm = ({ term, isMatched }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.TERM,
      item: { id: term.id, term: term.term },
      canDrag: !isMatched,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [isMatched]
  );

  return (
    <div
      ref={drag}
      className={`p-4 rounded-xl text-left font-black text-lg transition-all duration-300 transform relative overflow-hidden group
        ${
          isMatched
            ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white scale-95 opacity-60 cursor-not-allowed shadow-lg"
            : isDragging
            ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white scale-110 shadow-2xl shadow-yellow-500/70 rotate-6 cursor-grabbing ring-3 ring-yellow-300"
            : "bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 text-white hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 cursor-grab active:cursor-grabbing hover:-rotate-1"
        }`}
    >
      {/* Animated shimmer */}
      {!isMatched && !isDragging && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      )}

      <span className="flex items-center gap-2 relative z-10">
        {isMatched ? (
          <>
            <span className="text-2xl animate-bounce">✓</span>
            <span className="line-through opacity-75">{term.term}</span>
          </>
        ) : (
          <>
            <span
              className="text-2xl"
              style={{ animation: "bounce 2s infinite" }}
            >
              {isDragging ? "🔥" : "🎯"}
            </span>
            {term.term}
          </>
        )}
      </span>

      {/* Epic particle trails when dragging */}
      {isDragging && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-ping"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: "0.8s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Droppable Definition with crazy animations
const DroppableDefinition = ({
  definition,
  isMatched,
  onDrop,
  wrongAttempt,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.TERM,
      drop: (item) => onDrop(item, definition),
      canDrop: () => !isMatched,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [isMatched, definition]
  );

  const isActive = isOver && canDrop;

  return (
    <div
      ref={drop}
      className={`p-4 rounded-xl text-left transition-all duration-300 transform relative overflow-hidden min-h-[100px] flex items-center
        ${
          isMatched
            ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white scale-95 border-3 border-green-300 shadow-xl shadow-green-500/50"
            : wrongAttempt
            ? "bg-gradient-to-r from-red-500 via-pink-600 to-rose-600 text-white animate-shake border-3 border-red-300 shadow-xl shadow-red-500/50"
            : isActive
            ? "bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white scale-110 border-3 border-yellow-400 shadow-xl shadow-purple-500/70 ring-3 ring-pink-300 animate-pulse"
            : canDrop
            ? "bg-gradient-to-br from-indigo-600/90 to-purple-700/90 text-white border-3 border-dashed border-purple-400 hover:border-pink-400 hover:scale-102 backdrop-blur-sm shadow-xl hover:shadow-purple-500/40"
            : "bg-white/5 border-3 border-white/10 text-gray-500 cursor-not-allowed opacity-50"
        }`}
    >
      {/* Epic glow when hovering */}
      {isActive && (
        <>
          <div className="absolute inset-0 animate-ping opacity-75">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/50 via-pink-500/50 to-purple-500/50 blur-2xl"></div>
          </div>
          <div className="absolute inset-0 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-xl"></div>
          </div>
        </>
      )}

      {/* Drop indicator */}
      {canDrop && !isMatched && (
        <div className="absolute top-2 right-2 text-2xl animate-bounce">
          {isActive ? "🎯" : "📍"}
        </div>
      )}

      <span className="flex items-center gap-3 relative z-10 text-base font-bold">
        {isMatched ? (
          <>
            <span className="text-3xl animate-bounce">🏆</span>
            <span className="font-black">{definition.definition}</span>
          </>
        ) : wrongAttempt ? (
          <>
            <span
              className="text-3xl animate-spin"
              style={{ animationDuration: "0.5s" }}
            >
              ❌
            </span>
            <span className="font-bold">{definition.definition}</span>
          </>
        ) : (
          <span className={`${canDrop ? "font-extrabold" : "font-semibold"}`}>
            {definition.definition}
          </span>
        )}
      </span>

      {/* Fireworks on match */}
      {isMatched && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-3xl animate-ping"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(${
                  i * 30
                }deg) translateY(-40px)`,
                animationDuration: "1.2s",
                animationDelay: `${i * 0.05}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const GamePageContent = () => {
  const { gameData, currentCourse } = useCourseStore();
  const navigate = useNavigate();

  // Game states
  const [terms, setTerms] = useState([]);
  const [definitions, setDefinitions] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [wrongMatch, setWrongMatch] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [gameStatus, setGameStatus] = useState("ready"); // ready, playing, won, lost
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Shuffle array helper
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialize game
  const initializeGame = useCallback(() => {
    if (gameData?.conceptMatcher) {
      const conceptData = gameData.conceptMatcher.map((item, index) => ({
        ...item,
        id: index,
      }));
      setTerms(shuffleArray(conceptData));
      setDefinitions(shuffleArray(conceptData));
      setMatchedPairs([]);
      setWrongMatch(null);
      setScore(0);
      setStreak(0);
      setCombo(0);
      setTimeLeft(120);
      setGameStatus("ready");
      setShowConfetti(false);
      setIsDragging(false);
    }
  }, [gameData]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Timer
  useEffect(() => {
    let timer;
    if (gameStatus === "playing" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameStatus === "playing") {
      setGameStatus("lost");
    }
    return () => clearInterval(timer);
  }, [gameStatus, timeLeft]);

  // Check for win
  useEffect(() => {
    if (
      matchedPairs.length === terms.length &&
      terms.length > 0 &&
      gameStatus === "playing"
    ) {
      setGameStatus("won");
      setShowConfetti(true);
      // Add time bonus
      setScore((prev) => prev + timeLeft * 10);
    }
  }, [matchedPairs, terms.length, gameStatus, timeLeft]);

  // Handle drag and drop
  const handleDrop = (draggedTerm, definition) => {
    if (matchedPairs.includes(definition.id)) return;

    if (draggedTerm.id === definition.id) {
      // CORRECT MATCH! 🎉
      setMatchedPairs((prev) => [...prev, definition.id]);
      const comboBonus = combo >= 3 ? combo * 50 : 0;
      const streakBonus = streak >= 2 ? streak * 20 : 0;
      const timeBonus = timeLeft > 90 ? 50 : 0;
      const totalBonus = 100 + comboBonus + streakBonus + timeBonus;

      setScore((prev) => prev + totalBonus);
      setStreak((prev) => prev + 1);
      setCombo((prev) => prev + 1);
      setWrongMatch(null);
      setIsDragging(false);

      // Epic success animation
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 600);
    } else {
      // WRONG MATCH! 😢
      setWrongMatch(definition.id);
      setStreak(0);
      setCombo(0);
      setScore((prev) => Math.max(0, prev - 30));
      setIsDragging(false);

      setTimeout(() => {
        setWrongMatch(null);
      }, 800);
    }
  };

  // Start game
  const startGame = () => {
    setGameStatus("playing");
  };

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!gameData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">🎮</div>
          <h2 className="text-2xl font-bold mb-2">Oops! No Game Data</h2>
          <p className="text-gray-300 mb-6">
            Complete a course chapter first to unlock the game!
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full font-bold hover:scale-105 transition-transform"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br p-4 md:p-8 relative overflow-hidden transition-all duration-700 ${
        isDragging
          ? "from-orange-900 via-red-900 to-pink-900"
          : "from-purple-900 via-indigo-900 to-blue-900"
      }`}
    >
      {/* Epic animated grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.15) 2px, transparent 2px)",
            backgroundSize: "40px 40px",
            animation: "moveGrid 20s linear infinite",
          }}
        ></div>
      </div>

      {/* Floating particles everywhere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-30"
            style={{
              width: `${Math.random() * 8 + 3}px`,
              height: `${Math.random() * 8 + 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* MEGA CONFETTI EXPLOSION */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute text-3xl font-bold"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-60px`,
                animation: `confettiFall ${
                  1.5 + Math.random() * 1.5
                }s linear forwards`,
                animationDelay: `${Math.random() * 0.3}s`,
              }}
            >
              {
                ["🎉", "⭐", "🏆", "✨", "🎊", "💫", "🔥", "⚡", "💎", "🌟"][
                  Math.floor(Math.random() * 10)
                ]
              }
            </div>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* EPIC HEADER */}
        <div className="text-center mb-5">
          <h1
            className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-600 mb-2 flex items-center justify-center gap-3 drop-shadow-2xl"
            style={{ animation: "pulse 3s ease-in-out infinite" }}
          >
            <Sparkles
              className="text-yellow-400 animate-spin"
              size={36}
              style={{ animationDuration: "4s" }}
            />
            CONCEPT MATCHER ARENA
            <Sparkles
              className="text-yellow-400 animate-spin"
              size={36}
              style={{ animationDuration: "4s" }}
            />
          </h1>
          <p className="text-gray-100 text-xl font-black drop-shadow-lg">
            {currentCourse?.title || "🎯 DRAG & DROP TO MATCH!"}
          </p>
        </div>

        {/* ULTRA STATS BAR */}
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          <div
            className={`bg-gradient-to-r ${
              timeLeft <= 30
                ? "from-red-500 to-orange-600 animate-pulse"
                : "from-cyan-500 to-blue-600"
            } backdrop-blur-md rounded-2xl px-5 py-3 flex items-center gap-3 border-3 border-white/40 shadow-xl transform hover:scale-105 transition-transform`}
          >
            <Clock
              className={`${timeLeft <= 30 ? "animate-ping" : "animate-pulse"}`}
              size={24}
            />
            <div>
              <p className="text-xs text-white/90 font-black">TIME</p>
              <span
                className={`text-2xl font-black text-white drop-shadow-lg ${
                  timeLeft <= 30 ? "animate-bounce" : ""
                }`}
              >
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 backdrop-blur-md rounded-2xl px-5 py-3 flex items-center gap-3 border-3 border-white/40 shadow-xl transform hover:scale-105 transition-transform">
            <Trophy
              size={24}
              className="animate-bounce"
              style={{ animationDuration: "2s" }}
            />
            <div>
              <p className="text-xs text-white/90 font-black">SCORE</p>
              <span className="text-2xl font-black text-white drop-shadow-lg">
                {score}
              </span>
            </div>
          </div>

          <div
            className={`bg-gradient-to-r ${
              streak >= 3
                ? "from-orange-500 to-red-600 animate-pulse"
                : "from-purple-500 to-pink-600"
            } backdrop-blur-md rounded-2xl px-5 py-3 flex items-center gap-3 border-3 border-white/40 shadow-xl transform hover:scale-105 transition-transform`}
          >
            <Zap
              className={`${streak >= 3 ? "animate-bounce" : ""}`}
              size={24}
            />
            <div>
              <p className="text-xs text-white/90 font-black">STREAK</p>
              <span className="text-2xl font-black text-white drop-shadow-lg">
                {streak}x
              </span>
            </div>
          </div>

          {combo >= 3 && (
            <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 backdrop-blur-md rounded-2xl px-5 py-3 flex items-center gap-3 border-3 border-white/40 shadow-xl animate-bounce">
              <Flame
                className="animate-spin"
                size={24}
                style={{ animationDuration: "2s" }}
              />
              <div>
                <p className="text-xs text-white/90 font-black">COMBO</p>
                <span className="text-2xl font-black text-white drop-shadow-lg">
                  {combo} 🔥
                </span>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 backdrop-blur-md rounded-2xl px-5 py-3 flex items-center gap-3 border-3 border-white/40 shadow-xl transform hover:scale-105 transition-transform">
            <Target size={24} className="animate-pulse" />
            <div>
              <p className="text-xs text-white/90 font-black">MATCHED</p>
              <span className="text-2xl font-black text-white drop-shadow-lg">
                {matchedPairs.length}/{terms.length}
              </span>
            </div>
          </div>
        </div>

        {/* Game Board */}
        {gameStatus === "ready" && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative mb-8">
              <div
                className="text-7xl animate-bounce"
                style={{ animationDuration: "1.5s" }}
              >
                🎮
              </div>
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-60 animate-pulse"></div>
            </div>
            <h2 className="text-4xl font-black text-white mb-5 animate-pulse drop-shadow-2xl">
              🔥 ARE YOU READY? 🔥
            </h2>
            <p className="text-gray-100 text-center max-w-2xl mb-3 text-xl font-bold">
              <span className="text-yellow-300 drop-shadow-lg">
                🎯 DRAG & DROP
              </span>{" "}
              terms to matching definitions!
            </p>
            <p className="text-gray-200 text-center max-w-2xl mb-8 text-base">
              Build <span className="text-orange-300 font-black">COMBOS</span> &{" "}
              <span className="text-purple-300 font-black">STREAKS</span> for
              MASSIVE bonus points! ⚡
            </p>
            <button
              onClick={startGame}
              className="group px-12 py-4 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-full font-black text-2xl text-white shadow-2xl shadow-green-500/70 hover:scale-125 transition-all duration-300 border-3 border-white/50 relative overflow-hidden transform hover:rotate-3"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
              <span className="relative flex items-center gap-3">
                <span className="text-3xl group-hover:animate-spin">🚀</span>
                START GAME
                <span className="text-3xl group-hover:scale-150 transition-transform">
                  ⚡
                </span>
              </span>
            </button>
          </div>
        )}

        {gameStatus === "playing" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* TERMS COLUMN */}
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 rounded-2xl p-4 shadow-xl border-3 border-white/40 transform hover:scale-105 transition-transform">
                <h3 className="text-2xl font-black text-white flex items-center gap-3 drop-shadow-lg">
                  <Star
                    className="w-7 h-7 animate-spin"
                    style={{ animationDuration: "4s" }}
                  />
                  🎯 DRAG THESE TERMS
                  <span className="text-sm font-bold bg-white/30 px-3 py-1 rounded-full animate-pulse">
                    👆 Grab & Drag!
                  </span>
                </h3>
              </div>
              {terms.map((term) => (
                <DraggableTerm
                  key={`term-${term.id}`}
                  term={term}
                  isMatched={matchedPairs.includes(term.id)}
                />
              ))}
            </div>

            {/* DEFINITIONS COLUMN */}
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-purple-500 via-pink-600 to-rose-600 rounded-2xl p-4 shadow-xl border-3 border-white/40 transform hover:scale-105 transition-transform">
                <h3 className="text-2xl font-black text-white flex items-center gap-3 drop-shadow-lg">
                  <Target className="w-7 h-7 animate-pulse" />
                  🎯 DROP HERE TO MATCH
                  <span className="text-sm font-bold bg-white/30 px-3 py-1 rounded-full animate-bounce">
                    💥 Drop Zone!
                  </span>
                </h3>
              </div>
              {definitions.map((def) => (
                <DroppableDefinition
                  key={`def-${def.id}`}
                  definition={def}
                  isMatched={matchedPairs.includes(def.id)}
                  onDrop={handleDrop}
                  wrongAttempt={wrongMatch === def.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* GAME OVER SCREENS */}
        {(gameStatus === "won" || gameStatus === "lost") && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative mb-8">
              <div
                className={`text-7xl ${
                  gameStatus === "won" ? "animate-bounce" : "animate-pulse"
                }`}
                style={{
                  animationDuration: gameStatus === "won" ? "1s" : "2s",
                }}
              >
                {gameStatus === "won" ? "🏆" : "⏰"}
              </div>
              {gameStatus === "won" && (
                <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-yellow-400 to-orange-500 opacity-70 animate-pulse"></div>
              )}
            </div>

            <h2
              className={`text-5xl font-black mb-6 drop-shadow-2xl ${
                gameStatus === "won"
                  ? "text-yellow-300 animate-pulse"
                  : "text-red-400"
              }`}
            >
              {gameStatus === "won"
                ? "🎉 EPIC VICTORY! 🎉"
                : "⏰ TIME'S UP! ⏰"}
            </h2>

            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 backdrop-blur-md rounded-2xl p-8 mb-8 text-center border-3 border-white/40 shadow-xl transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-center gap-3 mb-5">
                <Award className="text-yellow-300 animate-bounce" size={36} />
                <p className="text-white text-2xl font-black drop-shadow-lg">
                  FINAL SCORE
                </p>
                <Award
                  className="text-yellow-300 animate-bounce"
                  size={36}
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
              <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 mb-5 drop-shadow-2xl">
                {score}
              </p>
              <div className="grid grid-cols-3 gap-6 text-white">
                <div className="bg-white/30 rounded-xl p-4 backdrop-blur-sm transform hover:scale-110 transition-transform">
                  <p className="text-sm opacity-90 font-bold">Matched</p>
                  <p className="text-2xl font-black drop-shadow-lg">
                    {matchedPairs.length}/{terms.length}
                  </p>
                </div>
                <div className="bg-white/30 rounded-xl p-4 backdrop-blur-sm transform hover:scale-110 transition-transform">
                  <p className="text-sm opacity-90 font-bold">Best Streak</p>
                  <p className="text-2xl font-black drop-shadow-lg">{streak}</p>
                </div>
                <div className="bg-white/30 rounded-xl p-4 backdrop-blur-sm transform hover:scale-110 transition-transform">
                  <p className="text-sm opacity-90 font-bold">Time Left</p>
                  <p className="text-2xl font-black drop-shadow-lg">
                    {formatTime(timeLeft)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <button
                onClick={initializeGame}
                className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-black text-xl text-white flex items-center gap-3 hover:scale-110 transition-all shadow-xl shadow-cyan-500/70 border-3 border-white/40 transform hover:-rotate-3"
              >
                <RotateCcw
                  className="w-6 h-6 animate-spin"
                  style={{ animationDuration: "2s" }}
                />
                PLAY AGAIN
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-10 py-4 bg-white/20 rounded-full font-black text-xl text-white flex items-center gap-3 hover:bg-white/30 transition-all border-3 border-white/40 backdrop-blur-md transform hover:rotate-3"
              >
                <Home className="w-6 h-6" />
                EXIT ARENA
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ULTRA CSS ANIMATIONS */}
      <style>{`
        @keyframes confettiFall {
          to {
            transform: translateY(110vh) rotate(1440deg) scale(0);
            opacity: 0;
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg) scale(1); }
          15% { transform: translateX(-20px) rotate(-8deg) scale(1.05); }
          30% { transform: translateX(20px) rotate(8deg) scale(1.05); }
          45% { transform: translateX(-15px) rotate(-6deg) scale(1.03); }
          60% { transform: translateX(15px) rotate(6deg) scale(1.03); }
          75% { transform: translateX(-10px) rotate(-4deg) scale(1.01); }
          90% { transform: translateX(10px) rotate(4deg) scale(1.01); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          25% { transform: translateY(-15px) rotate(90deg) scale(1.1); }
          50% { transform: translateY(-30px) rotate(180deg) scale(1); }
          75% { transform: translateY(-15px) rotate(270deg) scale(1.1); }
        }
        @keyframes moveGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        .animate-shake {
          animation: shake 0.7s cubic-bezier(.36,.07,.19,.97) both;
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

const GamePage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <GamePageContent />
    </DndProvider>
  );
};

export default GamePage;
