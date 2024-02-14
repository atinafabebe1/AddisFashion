import { CustomError } from './custom_error'

export class DatabaseConnectionError extends CustomError {
  statusCode = 500
  reason = 'Error connection to database'
  constructor() {
    super('Error Connecting to db')
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ]
  }
}
