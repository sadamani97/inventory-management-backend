import app from "./src/app.js";
import { env } from "./src/config/env.js";
import { logger } from "./src/config/logger.js";
import { initDb } from "./src/config/db.js";
const startServer = async () => {
    try {
        await initDb();
        app.listen(env.PORT, () => {
            logger.info(`Server is running on port ${env.PORT}`);
        });
    }
    catch (error) {
        logger.error("Failed to start server due to database initialization failure", error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map