import { useCallback, useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import styles from "./Timer.module.css";
import { BREAK_TIME_IN_MINUTES } from "./TIMER_CONSTANTS.js";
import { STUDY_TIME_IN_MINUTES } from "./TIMER_CONSTANTS.js";

const studyTime = STUDY_TIME_IN_MINUTES;
const breakTime = BREAK_TIME_IN_MINUTES;

const Timer = function () {
  const authCtx = useContext(AuthContext);
  const [isPaused, setIsPaused] = useState(true);
  const [session, setSession] = useState("study");
  const [secondsLeft, setSecondsLeft] = useState(studyTime);

  // References for timer
  const isPausedRef = useRef(isPaused);
  const secondsLeftRef = useRef(secondsLeft);
  const sessionRef = useRef(session);

  // Display time variables
  const minutes = Math.floor(secondsLeftRef.current / 60);
  let seconds = secondsLeftRef.current % 60;
  if (seconds < 10) seconds = `0${seconds}`;

  // Handlers
  const clickHandler = () => {
    setIsPaused((prevValue) => !prevValue);
    isPausedRef.current = !isPaused;
  };

  const resetTimerHandler = () => {
    setSecondsLeft(studyTime);
    secondsLeftRef.current = studyTime;
    setIsPaused(true);
    isPausedRef.current = true;
  };

  const logoutHandler = () => {
    authCtx.logout();
  };

  // Switch sessions when timer ends
  const switchSessions = useCallback(() => {
    const changeSession = sessionRef.current === "study" ? "break" : "study";
    const changeSessionTimer =
      changeSession === "study" ? studyTime : breakTime;

    setSession(changeSession);
    sessionRef.current = changeSession;

    setSecondsLeft(changeSessionTimer);
    secondsLeftRef.current = changeSessionTimer;
  }, []);

  // Lifecycle
  useEffect(() => {
    // Initialize the timer
    setSecondsLeft(studyTime);

    const timerInterval = setInterval(() => {
      if (isPausedRef.current) return;
      if (secondsLeftRef.current === 0) {
        return switchSessions();
      }
      // Tick the clock
      secondsLeftRef.current--;
      setSecondsLeft(secondsLeftRef.current);
    }, 1000);

    // Tear-down code
    return () => clearInterval(timerInterval);
  }, [switchSessions]);

  return (
    <div className={styles.timer}>
      <p>
        {minutes}:{seconds}
      </p>
      <div className={styles.actions}>
        {isPaused ? (
          <button className={styles.actionBtn} onClick={clickHandler}>
            <i className="fa-solid fa-circle-play"></i>
          </button>
        ) : (
          <button className={styles.actionBtn} onClick={clickHandler}>
            <i className="fa-solid fa-circle-pause"></i>
          </button>
        )}
        <button className={styles.actionBtn} onClick={resetTimerHandler}>
          <i className="fa-solid fa-clock-rotate-left"></i>
        </button>
      </div>
      <button className={styles.logoutBtn} onClick={logoutHandler}>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </button>
    </div>
  );
};

export default Timer;
