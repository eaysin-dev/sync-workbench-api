import { Request, RequestHandler } from "express";
import { z } from "zod";
import requestMiddleware from "../../middleware/request-middleware";
import Book from "../../models/Book";

export const addBookSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  author: z.string().min(1, { message: "Author is required" }),
});

interface AddReqBody {
  name: string;
  author: string;
}

const add: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const { name, author } = req.body;

  const book = new Book({ name, author });
  await book.save();

  res.send({
    message: "Saved",
    book: book.toJSON(),
  });
};

export default requestMiddleware(add, { validation: { body: addBookSchema } });
