import { BookingRequestErrorCode } from '../staticData/errorMessage';

export class BookingRequestError extends Error {
  readonly errorCode?: BookingRequestErrorCode;

  constructor(message: string, errorCode?: BookingRequestErrorCode) {
    super(message);
    // NOTE:
    // Set the prototype explicitlyby Object.setPrototypeOf right below super(...).
    // This is necessary for extending Error. Error uses ES6 new.keyword to adjust the prototype chain,
    // but new.keyword won't get the right value via constructor in ES5.
    // This could be solved by make TS compilation target ES6+
    Object.setPrototypeOf(this, BookingRequestError.prototype);

    this.errorCode = errorCode;
  }
}
