import React, { useState } from "react";
import "./velha.css";

type Player = "X" | "O";
type Score = { X: number; O: number; draw: number };

const Velha: React.FC = () => {
  const [board, setBoard] = useState(Array(9).fill("")); // Estado do tabuleiro
  const [isXNext, setIsXNext] = useState(true); // Define quem é o próximo a jogar
  const [score, setScore] = useState<Score>({ X: 0, O: 0, draw: 0 }); // Estado da pontuação
  const [winningCombo, setWinningCombo] = useState<number[] | null>(null); // Estado para armazenar a combinação vencedora

  const handleClick = (index: number) => {
    if (board[index] || winningCombo) return; // Previne alterações se já houver um vencedor ou se a célula estiver preenchida

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard); // Verifica se há um vencedor
    if (winner) {
      setScore((prevScore) => ({
        ...prevScore,
        [winner.player]: prevScore[winner.player] + 1,
      }));
      setWinningCombo(winner.combo); // Salva a combinação vencedora para destacar as células
    } else if (!newBoard.includes("")) {
      setScore((prevScore) => ({ ...prevScore, draw: prevScore.draw + 1 })); // Incrementa o placar de empate se o tabuleiro estiver cheio
    }
  };

  const calculateWinner = (board: string[]) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { player: board[a] as Player, combo }; // Retorna o jogador vencedor e a combinação vencedora
      }
    }
    return null;
  };

  const handleResetGame = () => {
    setBoard(Array(9).fill("")); // Reseta o tabuleiro
    setWinningCombo(null); // Reseta a combinação vencedora
  };

  const handleResetScore = () => {
    setScore({ X: 0, O: 0, draw: 0 }); // Reseta a pontuação
    handleResetGame(); // Também reseta o tabuleiro
  };

  const currentPlayer = isXNext ? "X" : "O";

  return (
    <div className="game-container">
      <h1 className="title">Jogo da Velha</h1>
      <div className="scoreboard">
        <p>Jogador X: {score.X}</p>
        <p>Jogador O: {score.O}</p>
        <p>Empates: {score.draw}</p>
      </div>
      <div className="board">
        {board.map((value, index) => (
          <div
            key={index}
            className={`square ${
              winningCombo && winningCombo.includes(index) ? "highlight" : "" // Aplica a classe "highlight" às células vencedoras
            }`}
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="status">
        {winningCombo ? (
          <p>Vencedor: {board[winningCombo[0]]}</p> // Exibe o vencedor
        ) : board.includes("") ? (
          <p>Próximo jogador: {currentPlayer}</p>
        ) : (
          <p>Empate!</p>
        )}
      </div>
      <div className="controls">
        <button className="reset-button" onClick={handleResetGame}>
          Reiniciar Jogo
        </button>
        <button className="reset-button" onClick={handleResetScore}>
          Resetar Pontuação
        </button>
      </div>
    </div>
  );
};

export default Velha;
