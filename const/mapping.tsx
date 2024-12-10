export type Note = {
    type: NoteType;
    timestamp: number;
    position: PrecisePosition[] | number;
    special?: boolean;
}

export type PrecisePosition = {
    timestamp: number;
    position: number;
}

export enum NoteType {
    Tap,
    Slide,
    Flick
}

