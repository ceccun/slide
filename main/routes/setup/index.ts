import getAppDataPath from "appdata-path";
import { ipcMain } from "electron"
import fs from "fs-extra"
import { CRUD, StatusCode } from "../../const/ipc";

const clientFolder = getAppDataPath("slide");

export const setupRoutes = () => {
    ipcMain.on("setup", async (event, arg) => {
        if (arg == CRUD.READ) {
            if (fs.existsSync(clientFolder)) {
                return event.reply("setup", JSON.stringify({
                    status: StatusCode.OK,
                    message: {
                        message: "Client already setup.",
                    }
                }));
            }


            return event.reply("setup", JSON.stringify({
                status: StatusCode.INTERNAL_SERVER_ERROR,
                message: {
                    message: "Client not setup",
                }
            }));
        }
    })
}