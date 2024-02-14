import { CustomError } from './custom_error'
export class NotfoundError extends CustomError {
  statusCode = 404
  constructor() {
    super('Route Not Found')
    Object.setPrototypeOf(this, NotfoundError.prototype)
  }
  serializeErrors() {
    return [{ message: 'Not found' }]
  }
}
