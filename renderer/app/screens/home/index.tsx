import { useState } from "react";
import { Logo } from "../../components/logo";
import styles from "./home.module.css";

export const HomeUI = ({ setUI }: { setUI: (val: string) => void }) => {
  const [buttonScreen, setButtonScreen] = useState("home");
  return (
    <div className={styles.ui}>
      <div></div>
      <Logo exitAnimation={true} />
      <div className={styles.buttonStrip}>
        {buttonScreen == "home" && (
          <>
            <button onClick={() => setButtonScreen("play")}>
              <span>Play</span>
            </button>
            <button>
              <span>Settings</span>
            </button>
          </>
        )}
        {buttonScreen == "play" && (
          <>
            <button onClick={() => setButtonScreen("home")}>
              <span>Back</span>
            </button>
            <button onClick={() => setUI("songSelect")}>
              <span>Single</span>
            </button>
            <button>
              <span>Multiplayer</span>
            </button>
            <button>
              <span>Tutorial</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
