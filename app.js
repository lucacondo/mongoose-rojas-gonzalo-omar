import express from "express";
import { startDB } from "./src/config/database.js";
import { userRouter } from "./src/routes/user.routes.js";
import { teamRouter } from "./src/routes/team.routes.js";
import { capitanRouter } from "./src/routes/capitan.routes.js";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

//rutas
app.use("/api", userRouter);
app.use("/api", teamRouter);
app.use("/api", capitanRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log("Servidor corriendo en el puerto", PORT);
});
