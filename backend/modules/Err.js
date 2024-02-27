// Used to throw errors in the afterware
export default class Err extends Error {
  constructor(code, error) {
    super();
    this.code = code;
    this.error = error;
    this.message = this.setMessage();
  }

  setMessage() {
    switch (this.code) {
      case 400:
        return "Bad Request";
      case 404:
        return "Not Found";
      case 409:
        return "Conflict";
      default:
        return "Unspecified Error Message";
    }
  }
}
