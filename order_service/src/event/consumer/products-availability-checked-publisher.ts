import {
  Queue,
  ProdcutAvailibityCheckedEvent,
  Consumer,
} from '@addismen/common'

export class ProdcutAvailibityCheckConsumer extends Consumer<ProdcutAvailibityCheckedEvent> {
  constructor(connection: any) {
    super(Queue.ProdcutAvailibityChecked, connection)
  }

  onMessage(message: any): void {
    console.log(`${message}`)
  }
}
