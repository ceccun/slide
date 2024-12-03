import { setupRoutes } from "./setup"
import { songRoutes } from "./song";

export const createRoutes = () => {
    setupRoutes();
    songRoutes();
}