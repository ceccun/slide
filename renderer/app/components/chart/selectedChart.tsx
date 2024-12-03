import React, { useEffect } from "react";
import styles from "./selectedChart.module.css";
import { CRUD, StatusCode } from "../../../const/ipc";

export const SelectedChart = ({ songId }: { songId: string }) => {
  const [song, setSong] = React.useState<{
    name: string;
    artist: string;
    version: number;
  }>();
  const [songPicture, setSongPicture] = React.useState<string>();

  useEffect(() => {
    window.ipc.on(`song-${songId}`, (message: string) => {
      const messageObj = JSON.parse(message);

      if (messageObj.status == StatusCode.OK) {
        setSong(messageObj.message);
      }
    });
    window.ipc.send(
      "song",
      JSON.stringify({ action: CRUD.READ, songId: songId })
    );

    window.ipc.on(`song-cover-${songId}`, (message: string) => {
      const messageObj = JSON.parse(message);
      if (messageObj.status == StatusCode.OK) {
        setSongPicture(messageObj.message);
      }
    });
    window.ipc.send(
      "song-cover",
      JSON.stringify({ action: CRUD.READ, songId: songId })
    );
  }, [songId]);

  return (
    <div className={styles.panel}>
      {songPicture && <img src={`data:image/png;base64,${songPicture}`} />}
      <h2>{song?.name || "Song Name"}</h2>
      <p>{song?.artist || "Artist"}</p>
    </div>
  );
};
