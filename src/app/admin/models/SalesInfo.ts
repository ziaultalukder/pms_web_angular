import { SalesDetails } from "./SalesDetails"
export class SalesInfo{
    id: number
    customerName: string
    contactNo: string
    totalTaka: number
    discountPercentage: number
    discountTaka: number
    subTotal: number
    grandTotal: number
    salesDetails: SalesDetails[]
}