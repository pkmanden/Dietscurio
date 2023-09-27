import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Chart, registerables } from 'node_modules/chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userDetails: any;
  dietDetails: any;
  graphLabels: any[] = [];
  realData: any[] =[];

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }

  ngOnInit(): void {
      this.auth.profile().subscribe({
        next:(res) => {
          // alert(res.message);
          this.userDetails = res.data.user;
          this.dietDetails = res.data.diet;
          // console.log('userDetails : ' + (res.data.user));
          if(this.dietDetails!=null){
            for(let i=0; i<this.dietDetails.length ;i++){
              //console.log(this.chartdata[i]);
              this.graphLabels.push(new Date(this.dietDetails[i].date).toDateString());
              this.realData.push(this.dietDetails[i].weight);
            }
            this.graphLabels.reverse();
            this.realData.reverse();
            this.renderChart(this.graphLabels,this.realData,'line','linechart'); 
          }
        },
        error: (err) => {
          // console.log("dashboard error : " + err);
          alert(err?.error.message)

        }
      });
  }
  
  renderChart(labels: any, mianData: any, type: any, id: any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labels,
        datasets: [{
          label: 'Weight (in kg)',
          data: mianData,
          borderColor: ['rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }]
      },
      options:  {
        scales: {
          y: {
            beginAtZero: true,
            min: 50, 
            max:100
          }
        }
      }
    });
  }
}
