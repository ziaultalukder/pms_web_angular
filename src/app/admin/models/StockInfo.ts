import { Data } from "@angular/router"
import { StockInDetails } from "./StockInDetails";

export class StockInfo{
    id:number;
    stockDate: string;
    supplierId: number;
    totalPrice: number;
    discountPercentage:number;
    discountTaka:number;
    discountValue:number;
    isActive: string;
    grandTotal: number
    stockInDetails: StockInDetails[];

}