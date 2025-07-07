import { RefundDetails } from "./RefundDetails"

export class Refund{
    id: number
    totalTaka: number
    discount: number
    discountTaka: number
    grandTotal: number
    refundDetails: RefundDetails[]
}