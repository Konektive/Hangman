import "./App.css";
import { useCallback, useEffect, useState } from "react";
import HangmanDraw from "./components/HangmanDraw";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";
import words from "./data/words.json";

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });
  const [guessedLetters, setGuessedLetters] = useState([]);

  const incorrectGuesses = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  //without callback it would count every pressed letter even if it was pressed multiple times

  const isLoser = incorrectGuesses.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const addGuessedLetter = useCallback(
    (letter) => {
      if (guessedLetters.includes(letter) || isWinner || isLoser) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isLoser, isWinner]
  );

  useEffect(() => {
    const handler = (e) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();

      addGuessedLetter(key);
    };
    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  });

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div>
        {isLoser && "Your Lost to a Computer - refresh to try again"}
        {isWinner && "You WON!! refresh to try once again"}
      </div>
      <HangmanDraw incorrectGuesses={incorrectGuesses.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          disabled={isLoser || isWinner}
          activeLetter={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inActiveLetter={incorrectGuesses}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
