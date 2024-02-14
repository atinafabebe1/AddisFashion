export enum Queue {
  UserCreated = 'user:created',
  UserUpdated = 'user:created',
  UserDeleted = 'user:deleted',

  ProdcutCreated = 'product:created',
  ProductUpdated = 'product:updated',
  ProductDeleted = 'product:deleted',

  OrderCancelled = 'order:cancelled',
  OrderConfirmed = 'order:confirmed',
  OrderFailed = 'order:failed',
  OrderFulfilled = 'order:fulfilled',
  OrderPlaced = 'order:placed',

  ProdcutAvailibityChecked = 'inventory:prodcut:availibiity',
  DeliveryInitiated = 'inventory:delivery:initated',

  PaymentProcessed = 'payment:processed',
}
