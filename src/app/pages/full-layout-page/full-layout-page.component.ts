import { Component , OnInit, Inject} from '@angular/core';
import { TicketService} from "../../shared/services/ticket.service";
import { SESSION_STORAGE, StorageService ,LOCAL_STORAGE } from 'angular-webstorage-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { barChartmulti} from '../../shared/data/ngxChart';
import * as chartsData from '../../shared/config/ngx-charts.config';
import { ActivatedRoute ,Router , Params } from '@angular/router';


@Component({
  selector: 'app-full-layout-page',
  templateUrl: './full-layout-page.component.html',
  styleUrls: ['./full-layout-page.component.scss']
})
export class FullLayoutPageComponent implements OnInit {
  
  token : any;
  totalTickets: number = 0;
  pendingTickets: number = 0;
  completedTickets: number = 0;
  // totalProfit: number = 0;

  barChartmulti = barChartmulti;

 
    //Bar Charts
    barChartView: any[] = chartsData.barChartView;

    // options
    barChartShowYAxis = chartsData.barChartShowYAxis;
    barChartShowXAxis = chartsData.barChartShowXAxis;
    barChartGradient = chartsData.barChartGradient;
    barChartShowLegend = chartsData.barChartShowLegend;
    barChartShowXAxisLabel = chartsData.barChartShowXAxisLabel;
    barChartXAxisLabel = chartsData.barChartXAxisLabel;
    barChartShowYAxisLabel = chartsData.barChartShowYAxisLabel;
    barChartYAxisLabel = chartsData.barChartYAxisLabel;
    barChartColorScheme = chartsData.barChartColorScheme;

  constructor(private _ticketService : TicketService,@Inject(LOCAL_STORAGE) private storage: StorageService, private router: Router, private route : ActivatedRoute) {
    Object.assign(this, { barChartmulti });
    this.getStatusCount();
    this.token = this.storage.get('token');
    if(this.token===null){
    const token = this.route.snapshot.queryParamMap.get('auth');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    this.storage.set('token', decodedToken['jti']);
    }
     
}

  ngOnInit() {
    
  }

  getStatusCount = async () => {
    let count = 0;
    await this._ticketService.getStatusCount().then (data =>{
      data.forEach((res,index)=>{
        if(res['status']!='Closed')
          count = count + res['count'];
        else
        this.completedTickets  = res['count'];
        
      });
      this.pendingTickets = count;
      this.totalTickets = this.pendingTickets + this.completedTickets;

    });
  }

  onSelect (event?){
    
  }

}
