import { Component, ElementRef, ViewChild } from '@angular/core';
import { SalesService } from '../../service/sales/sales.service';
import { FormBuilder } from '@angular/forms';
import { jsPDF } from "jspdf";
import { JspdfService } from '../../service/jsPDF/jspdf.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  /**
   *
   */
  currentPage: number = 0;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  totalItems: number = 0;
  numbers: number[] = [];
  count = 0;
  currentDate: Date = new Date();
  startDate = this.formatDate(new Date())
  endDate = this.formatDate(new Date())
  SalesReportList: any;
  DownloadSalesReportList: any;
  QuantityWiseSalesReport: any;
  TotalReveniue: number;
  GrandTotal: number;
  isVisible = false;
  isLoading = false;
  isLoadingForDownload = false

  @ViewChild('contentPDF', { static: false }) el!: ElementRef;

  constructor(private salesService: SalesService, private formBuilder: FormBuilder, private jsPDFService: JspdfService) {

  }


  salesReportForm1 = this.formBuilder.group({
    startDate: [this.startDate],
    endDate: [this.endDate]
  })

  salesReportForm = this.formBuilder.group({
    startDate: [this.startDate],
    endDate: [this.endDate]
  })

  private formatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var dst = year + '-' + month + '-' + day;

    return [year, month, day].join('-');
  }

  ShowReport(data: any) {

    this.DownloadSalesReportList = null;
    this.SalesReportList = null;
    this.numbers = [];

    this.isVisible = true;
    this.isLoading = true;

    this.salesService.downloadSalesReport(data.startDate, data.endDate)
      .subscribe(
        c => {
          this.DownloadSalesReportList = c;
          this.getTotalReveniue();
          this.isLoading = false;
        }
      )

    this.salesService.salesReport(data.startDate, data.endDate, this.currentPage, this.itemsPerPage)
      .subscribe(c => {
        this.SalesReportList = c.body;
        var token = JSON.parse(c.headers.get('Pagination') || '');
        this.currentPage = token.currentPage;
        this.itemsPerPage = token.itemsPerPage;
        this.totalPages = token.totalPages;
        this.totalItems = token.totalItems;
        for (let i = 1; i <= token.totalPages; i++) {
          this.numbers.push(i);
        }
        this.isLoading = false;
      }
      )
  }

  getTotalReveniue() {
    this.TotalReveniue = this.DownloadSalesReportList.reduce((sum: number, item: any) => {
      const value = Number(item?.reveniue);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);


    this.GrandTotal = this.DownloadSalesReportList.reduce((sum: number, item: any) => {
      const value = Number(item?.totalTaka);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
  }

  DownloadPDF(data: any) {
    this.isLoadingForDownload = true;
    this.jsPDFService.generatePdf(
      this.el.nativeElement,
      'repo' + new Date().getDate()
    );
    this.isLoadingForDownload = false
  }

  ShowReport1(data: any) {
    this.isVisible = true;
    this.isLoading = true;
    this.salesService.QuantityWiseSalesReport(data.startDate, data.endDate).subscribe(
      c => {
        this.QuantityWiseSalesReport = c;
        // this.getTotalReveniue();
        this.isLoading = false;
      }
    )
  }

  next() {
    this.currentPage++
    const formData = this.salesReportForm.value
    this.salesService.salesReport(formData.startDate || '', formData.endDate || '', this.currentPage, this.itemsPerPage)
      .subscribe(c => {
        this.SalesReportList = c.body;
        this.getTotalReveniue();
        this.isLoading = false;
      }
      )
  }

  previous() {
    this.currentPage--
    const formData = this.salesReportForm.value
    this.salesService.salesReport(formData.startDate || '', formData.endDate || '', this.currentPage, this.itemsPerPage)
      .subscribe(c => {
        this.SalesReportList = c.body;
        this.getTotalReveniue();
        this.isLoading = false;
      }
      )
  }
}
