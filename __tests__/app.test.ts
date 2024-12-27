import app from "@/app";
import request from "supertest";

jest.mock("@/models/Book.ts");

describe("App Test", () => {
  test("GET /random-url should return 404", (done) => {
    request(app).get("/reset").expect(404, done);
  });

  test("GET /book/all should return 200", (done) => {
    request(app).get("/book/all").expect(200, done);
  });
});
