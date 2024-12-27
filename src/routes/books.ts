import { Router } from "express";
import { booksControllers } from "../controllers";

const booksRoutes = Router();

booksRoutes.post("/add", booksControllers.add);
booksRoutes.get("/all", booksControllers.all);
booksRoutes.get("/search", booksControllers.search);
booksRoutes.get("/id/:bookId", booksControllers.get);
booksRoutes.delete("/id/:bookId", booksControllers.remove);

export default booksRoutes;
