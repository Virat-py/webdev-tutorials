import { Router } from "express";
import { getAllMessages,addMessage } from "./controller.js";

const router=Router();

router.get("/messages",getAllMessages);
router.post("/add-message",addMessage);

export default router;