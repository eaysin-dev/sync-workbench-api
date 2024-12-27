import { Request, RequestHandler } from "express";
import requestMiddleware from "../../middleware/request-middleware";
import Book from "../../models/Book";

const remove: RequestHandler = async (req: Request, res): Promise<void> => {
  const { bookId } = req.params;

  const book = await Book.findById(bookId);
  if (!book) {
    res.status(404).send({
      error: "Book not found",
    });
    return;
  }

  await book.deleteOne();
  res.status(204).send();
};

export default requestMiddleware(remove);
