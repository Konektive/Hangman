import React from "react";

const HangmanWord = (props) => {
  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {props.wordToGuess.split("").map((letter, index) => {
        return (
          <span style={{ borderBottom: "10px solid black" }} key={index}>
            <span
              style={{
                visibility:
                  props.guessedLetters.includes(letter) || props.reveal
                    ? "visible"
                    : "hidden",
                color:
                  !props.guessedLetters.includes(letter) && props.reveal
                    ? "red"
                    : "black",
              }}
            >
              {letter}
            </span>
          </span>
        );
      })}
    </div>
  );
};

export default HangmanWord;
