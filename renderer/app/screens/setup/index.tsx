import { useEffect, useState } from "react";
import React from "react";
import styles from "./setup.module.css";

export const SetupScreen = ({ setUI }: { setUI: (val: string) => void }) => {
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    fetch("/api/setup", {
      method: "POST",
    }).then((res) => {
      if (res.status == 200) {
        setWarning(true);

        setTimeout(() => {
          setUI("home");
        }, 5000);
      }
    });
  });

  return (
    <div className={styles.ui}>
      {warning == false && (
        <>
          <h2>Preparing...</h2>
          <p>Welcome to slide!</p>
        </>
      )}
      {warning == true && (
        <>
          <h2>Photosensitivity Warning</h2>
          <p>
            Some people may experience seizures due to certain patterns featured
            in this game.
          </p>
          <p>
            <b>
              Immediately stop playing and consult a doctor if you experience
              any symptoms.
            </b>
          </p>
        </>
      )}
    </div>
  );
};
