import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";
import { ContentLayoutPageComponent } from './content-layout-page.component';
import { StorageServiceModule } from 'angular-webstorage-service';



@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule,
        StorageServiceModule     
    ],
    declarations: [
        ContentLayoutPageComponent
    ]
})
export class ContentPagesModule { }
