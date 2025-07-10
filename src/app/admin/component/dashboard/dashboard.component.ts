import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../service/sales/sales.service';
import { ChartConfiguration, ChartData } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  /**
   *
   */
  TodayMonthlyAndYearlySalesReport: any
  datas: any;
  chartdata: any
  chartLabels: any[] = []
  chartValue: any[] = []
  constructor(private salesService: SalesService) {

  }

  ngOnInit(): void {
    this.salesService.TodayMonthlyAndYearlySalesReport().subscribe(c => {
      this.TodayMonthlyAndYearlySalesReport = c;
    })

    this.salesService.WeeklyChartSalesReport().subscribe(c => {
      if (c != null) {
        this.chartdata = c;
        for (let i = 0; i < this.chartdata.length; i++) {
          this.chartLabels.push(this.chartdata[i].createDate)
          this.chartValue.push(this.chartdata[i].grandTotal)
        }
        this.loadData(this.chartLabels, this.chartValue);
      }

    })

  }

  public lineChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true
      }
    }
  };

  loadData(chartLabels: any, chartValue: any) {
    //Example: Fetch data from API or service
    const newData = {
      labels: this.chartLabels,
      datasets: [
        {
          data: this.chartValue,
          label: 'Daily Sales',
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }
      ]
    };

    this.lineChartData = {
      labels: newData.labels,
      datasets: newData.datasets
    }
  }


}
