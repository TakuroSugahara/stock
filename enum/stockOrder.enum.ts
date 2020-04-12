export enum StockOrderEnum {
  PRICE = 'price',
  AMOUNT = 'amount',
  DELIVERY_DATE = 'deliveryDate'
}

export enum StockStringOrderEnum {
  PRICE = '価格順',
  AMOUNT = '量順',
  DELIVERY_DATE = '配送日順'
}

export interface STOCK_ORDER {
  value: StockOrderEnum
  text: StockStringOrderEnum
}

export const STOCK_ORDERS = [
  {
    value: StockOrderEnum.PRICE,
    text: StockStringOrderEnum.PRICE
  },
  {
    value: StockOrderEnum.AMOUNT,
    text: StockStringOrderEnum.AMOUNT
  },
  {
    value: StockOrderEnum.DELIVERY_DATE,
    text: StockStringOrderEnum.DELIVERY_DATE
  }
]
