import { useEffect, useState } from "react";
import { CRUD, StatusCode } from "../../../const/ipc";
import styles from "./background.module.css";

export const Background = ({
  selectedSong,
  blurred,
}: {
  selectedSong: string;
  blurred: boolean;
}) => {
  const [songPicture, setSongPicture] = useState<string>();
  const [previousSongPicture, setPreviousSongPicture] = useState<string>();

  useEffect(() => {
    setPreviousSongPicture("");
    (async () => {
      window.ipc.on(`song-cover-${selectedSong}`, (message: string) => {
        const messageObj = JSON.parse(message);
        if (messageObj.status == StatusCode.OK) {
          if (!previousSongPicture) {
            setPreviousSongPicture(messageObj.message);
          }
          setPreviousSongPicture(songPicture);
          setSongPicture(messageObj.message);
        }
      });
      window.ipc.send(
        "song-cover",
        JSON.stringify({ action: CRUD.READ, songId: selectedSong })
      );
    })();
  }, [selectedSong]);

  return (
    <>
      {songPicture && (
        <div
          className={`${styles.background} ${blurred ? styles.blurred : ""}`}
        >
          <div className={styles.darkness}></div>
          {previousSongPicture && (
            <img
              src={`data:image/png;base64,${previousSongPicture}`}
              className={styles.fadeOut}
              alt="background"
            />
          )}
          {songPicture && (
            <img
              src={`data:image/png;base64,${songPicture}`}
              alt="background"
            />
          )}
        </div>
      )}
    </>
  );
};
