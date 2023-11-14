// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user-progress-chart',
//   templateUrl: './user-progress-chart.component.html',
//   styleUrls: ['./user-progress-chart.component.css']
// })
// export class UserProgressChartComponent {

// }


import { Component } from '@angular/core';

@Component({
  selector: 'app-user-progress-chart',
  templateUrl: './user-progress-chart.component.html',
  styleUrls: ['./user-progress-chart.component.css']
})
export class UserProgressChartComponent {
  public lineChartData: any[] = [
    { data: [10, 20, 30, 40, 50, 60, 70], label: 'Progress' },
  ];
  public lineChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  public lineChartLegend = true;
  public lineChartType = 'line';
}

