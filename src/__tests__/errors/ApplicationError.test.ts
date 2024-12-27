import ApplicationError from "@/errors/application-error";

describe("ApplicationError test suite", () => {
  test("sets default error message", () => {
    const error = new ApplicationError();
    expect(error.message).toBe("An error occurred.");
  });

  test("sets correct message", () => {
    const message = "error message";
    const error = new ApplicationError({ message });
    expect(error.message).toBe(message);
  });

  test("sets 500 as default status code", () => {
    const error = new ApplicationError();
    expect(error.statusCode).toBe(500);
  });

  test("sets correct status code", () => {
    const status = 400;
    const error = new ApplicationError({ statusCode: status });
    expect(error.statusCode).toBe(status);
  });

  test("sets default code", () => {
    const error = new ApplicationError();
    expect(error.code).toBe("INTERNAL_SERVER_ERROR");
  });

  test("sets correct code", () => {
    const code = "CUSTOM_ERROR";
    const error = new ApplicationError({ code });
    expect(error.code).toBe(code);
  });

  test("sets default suggestion", () => {
    const error = new ApplicationError();
    expect(error.suggestion).toBe("Please try again later.");
  });

  test("sets correct suggestion", () => {
    const suggestion = "Contact support";
    const error = new ApplicationError({ suggestion });
    expect(error.suggestion).toBe(suggestion);
  });

  test("sets correct details", () => {
    const details = "Invalid input";
    const error = new ApplicationError({ details });
    expect(error.details).toBe(details);
  });

  test("sets default details as empty array", () => {
    const error = new ApplicationError();
    expect(error.details).toEqual([]);
  });
});
