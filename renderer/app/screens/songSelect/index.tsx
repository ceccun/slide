import React from "react";
import { Chart } from "../../components/chart";
import { CRUD } from "../../../const/ipc";
import { useEffect } from "react";

import styles from "./select.module.css";
import { SelectedChart } from "../../components/chart/selectedChart";

export const SongSelect = ({
  selectedSong,
  setSelectedSong,
  songs,
  setSongs,
  setBlurredBackground,
}: {
  selectedSong: string;
  setSelectedSong: (song: string) => void;
  songs: string[];
  setSongs: (songs: string[]) => void;
  setBlurredBackground: (blurred: boolean) => void;
}) => {
  useEffect(() => {
    setBlurredBackground(true);
    window.ipc.on("songs", (message: string) => {
      const messageObj = JSON.parse(message);

      if (messageObj.status == 200) {
        setSongs(messageObj.message);
        setSelectedSong(messageObj.message[0]);
      }
    });
    window.ipc.send("songs", CRUD.READ);
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.chartSelect}>
        {songs.map((song, key) => {
          return (
            <Chart
              key={key}
              songId={song}
              selectedSong={selectedSong}
              setSelectedSong={setSelectedSong}
            />
          );
        })}
      </div>

      <SelectedChart songId={selectedSong} />
    </div>
  );
};
