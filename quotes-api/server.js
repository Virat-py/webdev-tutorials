import express from "express";
import quotesRouter from "./src/routes/quotesRouter.js";

const app = express();
app.use(express.json());
app.use("/api", quotesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
