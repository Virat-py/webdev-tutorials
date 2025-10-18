import { Router } from "express";
import {getAllQuotes,getRandomQuote,addQuote} from "../controllers/quotesController.js";

//define the router object
const router=Router();

//defining the endpoints
router.get("/quotes", getAllQuotes);
router.get("/random-quote", getRandomQuote);
router.post("/add-quote", addQuote);

//send the router back to server.js
export default router;


