import React from "react";
import classes from "./Keyboard.module.css";

const Keyboard = (props) => {
  const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
        gap: ".5rem",
      }}
    >
      {KEYS.map((key) => {
        const active = props.activeLetter.includes(key);
        const inActive = props.inActiveLetter.includes(key);
        return (
          <button
            onClick={() => {
              props.addGuessedLetter(key);
            }}
            className={`${classes.btn} ${active ? classes.active : ""}
            ${inActive ? classes.inactive : ""}`}
            disabled={inActive || active || props.disabled}
            key={key}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
