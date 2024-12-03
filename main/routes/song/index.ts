import { ipcMain } from "electron"
import { CRUD, StatusCode } from "../../const/ipc"
import { AppFolder } from "../../const/environment";
import fs from "fs-extra";

export const songRoutes = () => {
    ipcMain.handle("songs", (event, arg) => {
        if (arg == CRUD.READ) {
            const songsFolder = AppFolder + "/songs";

            if (!fs.existsSync(songsFolder)) {
                fs.mkdirSync(songsFolder);
                return {
                    status: StatusCode.OK,
                    message: []
                };
            }

            const songs = fs.readdirSync(songsFolder);

            return {
                status: StatusCode.OK,
                message: songs
            };
        }
    });

    ipcMain.handle("song", (event, arg: string) => {
        const { action, songId }: {
            action: CRUD;
            songId: string;
        } = JSON.parse(arg);

        if (action == CRUD.READ) {
            const songFolder = AppFolder + "/songs/" + songId;

            if (!fs.existsSync(songFolder)) {
                return {
                    status: StatusCode.NOT_FOUND,
                    message: "Metadata not found"
                };
            }


            if (!fs.existsSync(songFolder + "/metadata.json")) {
                return {
                    status: StatusCode.NOT_FOUND,
                    message: "Metadata not found"
                };

            }

            const metadata = fs.readJSONSync(songFolder + "/metadata.json");

            return {
                status: StatusCode.OK,
                message: metadata
            };
        }
    });

    ipcMain.handle("song-cover", (event, arg: string) => {
        const { action, songId }: {
            action: CRUD;
            songId: string;
        } = JSON.parse(arg);

        if (action == CRUD.READ) {
            const songFolder = AppFolder + "/songs/" + songId;

            if (!fs.existsSync(songFolder)) {
                return {
                    status: StatusCode.NOT_FOUND,
                    message: "Picture not found"
                };
            }

            if (!fs.existsSync(songFolder + "/cover.png")) {
                return {
                    status: StatusCode.NOT_FOUND,
                    message: "Picture not found"
                };
            }

            const picture = fs.readFileSync(songFolder + "/cover.png");

            return {
                status: StatusCode.OK,
                message: picture.toString("base64")
            };
        }
    });

    ipcMain.handle("song-audio", (event, arg: string) => {
        const { action, songId }: {
            action: CRUD;
            songId: string;
        } = JSON.parse(arg);
        if (action == CRUD.READ) {
            const songFolder = AppFolder + "/songs/" + songId;

            if (!fs.existsSync(songFolder)) {
                return {
                    status: StatusCode.NOT_FOUND,
                    message: "Audio not found"
                };
            }

            if (!fs.existsSync(songFolder + "/audio.m4a")) {
                return {
                    status: StatusCode.NOT_FOUND,
                    message: "Audio not found"
                };
            }

            const audio = fs.readFileSync(songFolder + "/audio.m4a");

            return {
                status: StatusCode.OK,
                message: Buffer.from(audio).toString("base64")
            };
        }
    })
}