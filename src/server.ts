import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandle } from "./next-utils";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: (cms) => {
        cms.logger.info(`Payload Admin URL: ${cms.getAdminURL()}`);
      },
    },
  });

  app.use((req, res) => nextHandle(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("Next.js Started");

    app.listen(PORT, () => {
      payload.logger.info(
        `Server Started on ${process.env.NEXT_PUBLIC_SERVER_URL}`
      );
    });
  });
};

start();
