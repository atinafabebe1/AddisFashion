import { CustomError } from './custom_error'

export class EmailSendingError extends CustomError {
  statusCode = 500
  constructor(public message: string) {
    super(message)
    Object.setPrototypeOf(this, EmailSendingError.prototype)
  }
  serializeErrors() {
    return [{ message: this.message }]
  }
}
