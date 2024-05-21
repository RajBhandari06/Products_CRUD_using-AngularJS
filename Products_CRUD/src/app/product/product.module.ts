//libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AddEditProductModule } from './add-edit-product/add-edit-product.module';

import { TableModule } from 'primeng/table';

import { ProductComponent } from './product.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';




@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    AddEditProductModule,
    ToastModule,
    ConfirmDialogModule
    
  ],
  exports: [
    ProductComponent
  ],
  providers:[MessageService , ConfirmationService ]
})
export class ProductModule { }
