"use client";

import { HomeUI } from "./screens/home";
import { useEffect, useState } from "react";
import { SetupScreen } from "./screens/setup";
import { SongSelect } from "./screens/songSelect";
import { CRUD, StandardResponse, StatusCode } from "../const/ipc";
import { updateCharts } from "./components/chart";
import { Background } from "./components/background";
import { toArrayBuffer } from "../libs/buffer";

const App = () => {
  const [ui, setUI] = useState("");
  const [songs, setSongs] = useState<string[]>([]);
  const [selectedSong, setSelectedSong] = useState<string>();
  const [blurredBackground, setBlurredBackground] = useState(true);

  const [audioContext, setAudioContext] = useState<AudioContext>();
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer>();
  const [audioSource, setAudioSource] = useState<AudioBufferSourceNode>();

  useEffect(() => {
    const ctx = new AudioContext({
      latencyHint: "playback",
    });
    setAudioContext(ctx);

    window.ipc.send("setup", CRUD.READ);

    window.ipc.on("setup", (message: string) => {
      const messageObj: StandardResponse = JSON.parse(message);
      const status = messageObj.status;

      if (status == StatusCode.OK) {
        setUI("home");
        updateCharts(setSongs, setSelectedSong);
      } else {
        setUI("setup");
      }
    });

    setTimeout(() => {
      setBlurredBackground(false);
    }, 2600);
  }, []);

  useEffect(() => {
    console.log("Audio: Received");

    window.ipc.on(`song-audio-${selectedSong}`, async (message: string) => {
      console.log("Audio: Received");
      const messageObj: StandardResponse = JSON.parse(message);
      if (messageObj.status != StatusCode.OK) return;

      const base64 = messageObj.message as string;
      const typedArray = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

      const audioBuffer: AudioBuffer = await new Promise((res) => {
        audioContext.decodeAudioData(typedArray.buffer, (data: AudioBuffer) => {
          res(data);
        });
      });

      if (audioSource) {
        audioSource.stop();
      }

      setAudioSource(audioContext.createBufferSource());

      setAudioBuffer(audioBuffer);
    });

    window.ipc.send(
      "song-audio",
      JSON.stringify({
        action: CRUD.READ,
        songId: selectedSong,
      })
    );
  }, [selectedSong]);

  useEffect(() => {
    if (!audioContext) return;
    if (!audioSource) return;

    console.log("Audio: buffer updated");

    try {
      audioSource.buffer = null;
      audioSource.stop();
      audioSource.disconnect();
    } catch (error) {
      console.error(error);
    }

    audioSource.buffer = audioBuffer;
    audioSource.connect(audioContext.destination);
    audioSource.start();
  }, [audioBuffer]);

  return (
    <div>
      <Background blurred={blurredBackground} selectedSong={selectedSong} />
      <button onClick={() => setBlurredBackground(!blurredBackground)}>
        Select Song
      </button>
      {ui == "home" && <HomeUI setUI={setUI} />}
      {ui == "setup" && <SetupScreen setUI={setUI} />}
      {ui == "songSelect" && (
        <SongSelect
          setBlurredBackground={setBlurredBackground}
          selectedSong={selectedSong}
          setSelectedSong={setSelectedSong}
          songs={songs}
          setSongs={setSongs}
        />
      )}
    </div>
  );
};

export default App;
