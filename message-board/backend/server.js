import express from "express";
import router from "./src/routes.js"
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);


const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});