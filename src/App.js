import { useContext } from "react";
import styles from "./App.module.css";
import AuthContext from "./store/auth-context";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import PomodoroPage from "./pages/PomodoroPage";

const App = function () {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <main className={styles.app}>
      <Routes>
        <Route path="/home" element={!isLoggedIn && <HomePage />} />
        <Route
          path="/pomodoro"
          element={isLoggedIn ? <PomodoroPage /> : <Navigate to="/home" />}
        />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </main>
  );
};

export default App;
