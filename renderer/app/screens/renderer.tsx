"use client";
import { useEffect, useRef, useState } from "react";
import { Note, NoteType } from "../../../const/mapping";
import useMousePosition from "../libs/useMousePosition";

export const Engine = () => {
  const mousePosition = useMousePosition();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [notes, setNotes] = useState<Note[]>([
    {
      type: NoteType.Tap,
      timestamp: 1000,
      position: 0,
    },
    {
      type: NoteType.Tap,
      timestamp: 1200,
      position: 50,
    },
    {
      type: NoteType.Slide,
      timestamp: 1300,
      position: [
        {
          timestamp: 0,
          position: 0,
        },
      ],
    },
  ]);

  useEffect(() => {
    if (canvasRef.current == null) {
      return;
    }

    const canvas = canvasRef.current;

    (async () => {
      await canvas.requestPointerLock();
    })();
  }, [canvasRef]);

  return (
    <div style={{ width: "100%", height: "100vh", cursor: "none" }}>
      <h1>Engine</h1>
      <div
        style={{
          height: "20px",
          width: "200px",
          backgroundColor: "red",
          position: "absolute",
          bottom: 100,
          left: 0,
          transform: `translate(${mousePosition.x}px)`,
        }}
      ></div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
