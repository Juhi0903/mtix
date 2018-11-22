import { CommonModule } from "@angular/common";
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StatusComponent } from './status/status.component';
import { TicketService} from "../../shared/services/ticket.service";
import {StageSubstageModule } from '../stage-substage/stage-substage.module'
import {StageComponent } from '../stage-substage/stage/stage.component'
import { MentionModule } from 'angular-mentions/mention';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StageSubstageModule,
    MentionModule
  ],
  declarations: [StatusComponent],
  entryComponents: [
    StageComponent
  ],
  providers: [
    TicketService
  ]
})
export class StatusModule { }
