import { Component, ElementRef, ViewChild } from '@angular/core';
import { SalesService } from '../../service/sales/sales.service';
import { FormBuilder } from '@angular/forms';
import { jsPDF } from "jspdf";
import { JspdfService } from '../../service/jsPDF/jspdf.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  /**
   *
   */
  currentDate: Date = new Date();
  startDate = this.formatDate(new Date())
  endDate = this.formatDate(new Date())
  SalesReportList: any;
  TotalReveniue: number;
  GrandTotal: number;
  isVisible = false;
  @ViewChild('contentPDF', { static: false }) el!: ElementRef;

  constructor(private salesService: SalesService, private formBuilder: FormBuilder, private jsPDFService: JspdfService) {

  }



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
    this.isVisible = true;
    this.salesService.salesReport(data.startDate, data.endDate).subscribe(
      c => {
        this.SalesReportList = c;
        this.getTotalReveniue();
        
      }
    )
  }

  getTotalReveniue() {
    this.TotalReveniue = this.SalesReportList.reduce((sum: number, item: any) => {
      const value = Number(item?.reveniue);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);


    this.GrandTotal = this.SalesReportList.reduce((sum: number, item: any) => {
      const value = Number(item?.totalTaka);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
  }

  DownloadPDF() {
    this.jsPDFService.generatePdf(
      this.el.nativeElement,
      'repo'+new Date().getDate()
    );
  }

  DownloadPDFTest() {

  }
}
