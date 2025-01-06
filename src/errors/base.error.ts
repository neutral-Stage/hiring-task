export class BaseError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public errors?: any[]
  ) {
    super(message);
  }
}
