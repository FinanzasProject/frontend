import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {
  ArcElement,
  Chart,
  DoughnutController,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement, LinearScale, CategoryScale, Title
} from 'chart.js';
import {Schedule} from '../../model/schedule';
Chart.register(
  Title,
  DoughnutController,
  ArcElement,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-summary-view',
  imports: [],
  templateUrl: './summary-view.component.html',
  styleUrl: './summary-view.component.css'
})
export class SummaryViewComponent implements AfterViewInit {
  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef | undefined;
  @ViewChild('lineChartCanvas') lineChartCanvas: ElementRef | undefined;
  @Input() schedule:Schedule[] = [];
  doughnutChart: any;
  lineChart: any;
  totalInterest:number = 0;
  totalAmortization:number = 0;
  totalPayment:number = 0;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.donutChartMethod()
    this.lineChartMethod()
  }
  getTotalData(){
    this.totalInterest = this.schedule.reduce((acc,currentValue) => acc + currentValue.interest, 0);
    this.totalAmortization = this.schedule.reduce(
      (accumulator, currentValue) => accumulator + currentValue.principal,0
    )
    this.totalPayment = this.totalInterest + this.totalAmortization;
  }
  donutChartMethod():void{
    this.getTotalData();
    this.doughnutChart = new Chart(this.doughnutCanvas?.nativeElement,{
      type:'doughnut',
      data:{
        labels: ['Interest','Amortization'],
        datasets:[
          {
            label:"Total",
            data:[this.totalInterest,this.totalAmortization],
            backgroundColor:[
              'oklch(0.5224 0.3202 146.75)',
              'oklch(0.5753 0.1623 232.661)',
            ],
            hoverBackgroundColor:[
              'oklch(0.7635 0.37 146.75)',
              'oklch(74.6% 0.16 232.661)'
            ]
          }

        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: 'Distribution of Interest and Amortization'
          }
        }
      }
    })

  }
  lineChartMethod(): void {
    const labels: string[] = this.schedule.map(s => `Period: ${s.period}`);
    const interestDataSet: number[] = this.schedule.map(s => s.interest);
    const amortizationDatSet :number[] = this.schedule.map(s=> s.principal)
    this.lineChart = new Chart(this.lineChartCanvas?.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Interest Over Time',
            data: interestDataSet,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            fill: false
          },
          {
            label: 'Amortization Over Time',
            data: amortizationDatSet,
            borderColor: 'rgb(100, 300, 192)',
            tension: 0.1,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Interest and Amortization Over Time'
          }
        }
      }
    });
  }
}
