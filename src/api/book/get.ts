import { Request, RequestHandler, Response } from "express";
import logger from "../../logger";
import requestMiddleware from "../../middleware/request-middleware";
import Book from "../../models/Book";

const get: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { bookId } = req.params;
  logger.silly(`Book to get: ${bookId}`);

  const book = await Book.findById(bookId);
  if (!book) {
    res.status(404).send({
      error: "Book not found",
    });

    return;
  }

  res.status(200).send({
    book: book.toJSON(),
  });
};

export default requestMiddleware(get);
