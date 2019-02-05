import { Component , OnInit, Inject} from '@angular/core';
import { TicketService} from "../../shared/services/ticket.service";
import { SESSION_STORAGE, StorageService ,LOCAL_STORAGE } from 'angular-webstorage-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { barChartmulti} from '../../shared/data/ngxChart';
import * as chartsData from '../../shared/config/ngx-charts.config';
import { ActivatedRoute ,Router , Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {urls,techLeads} from '../../app.config';



@Component({
  selector: 'app-full-layout-page',
  templateUrl: './full-layout-page.component.html',
  styleUrls: ['./full-layout-page.component.scss']
})
export class FullLayoutPageComponent implements OnInit {
  
  token : any;
  totalTickets: number = 0;
  pendingTickets: number = 0;
  startTickets: number = 0;
  holdTickets: number = 0;
  doneTickets: number = 0;
  workingTickets: number = 0;
  showcard = false;
  techLead = [];
  // totalProfit: number = 0;

  barChartmulti ;
graphdata = [];

 
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
    barChartShowDataLabel = chartsData.barChartShowDataLabel;

  constructor(private _ticketService : TicketService,@Inject(LOCAL_STORAGE) private storage: StorageService, 
              private router: Router, private route : ActivatedRoute,private cookieService: CookieService) {
    this.getGraphData();
    // this.barChartmulti = this.graphdata;
    // Object.assign(this, { barChartmulti });
    this.getStatusCount();
    this.techLead = techLeads;
    this.token = this.storage.get('token');
    let encodedToken = this.cookieService.check("MTIX");
    if(this.token===null || encodedToken == false){
    const token = this.route.snapshot.queryParamMap.get('auth');
    this.cookieService.set("MTIX",token);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    this.storage.set('token', decodedToken['jti']);
    this.techLead.forEach((res , index) => {
      if(res['name']==decodedToken['jti']){
        this.storage.set('LEAD', true);
      }

    });
     
    }
}

  ngOnInit() {
    this.getGraphData();
    this.getStatusCount();
  }

  getStatusCount = async () => {
    let count = 0;
    await this._ticketService.getStatusCount().then (data =>{
      data.forEach((res,index)=>{
        if(res['A']==='YET TO START')
        this.startTickets = res['count'];
        else if(res['A']==='DONE')
        this.doneTickets = res['count'];
        else if(res['A']==='HOLD')
        this.holdTickets = res['count'];
        else if(res['A']==='WORKING')
        this.workingTickets = res['count'];
        else if(res['A']==='PENDING FROM BILLER')
        this.pendingTickets = res['count'];
       
        
      });
      // this.pendingTickets = count;
      this.totalTickets = this.pendingTickets + this.startTickets+ this.holdTickets + this.doneTickets + this.workingTickets;
      // console.log(data);

    });
    
  }

  getGraphData = async () =>{
   await this._ticketService.getGraphData().then(data =>{
      this.barChartmulti = data;
      // console.log(data);
    });
  }

  onSelect(event){
    console.log(event);
    let url = "/ticket/ticket";
    this.router.navigate([ '/' + url  +'/' +event['series'] +'/' +event['name']], { relativeTo: this.route.parent }); 
  }

  getCompletedTicket(){
    let url = "/ticket/ticket";
    this.router.navigate([ '/' + url +'/Closed'], { relativeTo: this.route.parent });
  }

  getTotalTicket(){
    let url = "/ticket/ticket";
    this.router.navigate([ '/' + url +'/Total'], { relativeTo: this.route.parent });  
  }

  getToStartTicket(){
    let url = "/ticket/ticket";
    this.router.navigate([ '/' + url +'/Start'], { relativeTo: this.route.parent });  
  }
  getPendingTicket(){
    let url = "/ticket/ticket";
    this.router.navigate([ '/' + url +'/Pending'], { relativeTo: this.route.parent });
  }

  getHoldTicket(){
    let url = "/ticket/ticket";
    this.router.navigate([ '/' + url +'/Hold'], { relativeTo: this.route.parent });
  }
  getWorkingTickets(){
    let url = "/ticket/ticket";
    this.router.navigate([ '/' + url +'/Working'], { relativeTo: this.route.parent });
  }
}
