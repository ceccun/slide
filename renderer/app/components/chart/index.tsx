import { useEffect, useState } from "react";
import React from "react";
import { CRUD, StandardResponse, StatusCode } from "../../../const/ipc";
import styles from "./chart.module.css";

export const updateCharts = async (
  setSongs: (val: string[]) => void,
  setSelectedSong: (val: string) => void
) => {
  const songList = (await window.ipc.invoke(
    "songs",
    CRUD.READ
  )) as StandardResponse;

  setSongs(songList.message);
  setSelectedSong(songList.message[0]);
};

export const Chart = ({
  songId,
  selectedSong,
  setSelectedSong,
}: {
  songId: string;
  selectedSong: string;
  setSelectedSong: (songId: string) => void;
}) => {
  const [song, setSong] = useState<{
    name: string;
    artist: string;
    version: number;
  }>();

  useEffect(() => {
    window.ipc.on(`song-${songId}`, (message: string) => {
      const messageObj: StandardResponse = JSON.parse(message);
      if (messageObj.status == StatusCode.OK) {
        setSong(messageObj.message);
      }
    });
    window.ipc.send(
      "song",
      JSON.stringify({ action: CRUD.READ, songId: songId })
    );
  }, [songId]);

  return (
    <div
      className={`${styles.chartEntry} ${
        selectedSong == songId ? styles.selectedChart : ""
      }`}
      onClick={() => setSelectedSong(songId)}
    >
      {song ? (
        <div className={styles.chartInner}>
          <h2>{song.name}</h2>
          <p>{song.artist}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
