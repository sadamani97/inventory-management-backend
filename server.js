import app from "./src/app.js";
import { env } from "./src/config/env.js";
import { logger } from "./src/config/logger.js";
app.listen(env.PORT, () => {
    logger.info(`Server is running on port ${env.PORT}`);
});