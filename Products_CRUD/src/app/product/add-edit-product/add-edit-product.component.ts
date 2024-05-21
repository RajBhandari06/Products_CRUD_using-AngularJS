import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { title } from 'process';
import { ProductService } from '../product.service';
import { response } from 'express';
import { error } from 'console';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent implements OnChanges {
  @Input() displayAddEditModal: boolean = true;
  @Input() selectedProduct: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Add";


  productForm = this.fb.group({
    title: ["",Validators.required],
    price: [0 ,Validators.required],
    description: [""],
    category: ["",Validators.required]
  });
  constructor(private fb: FormBuilder, private productService: ProductService, private messageService: MessageService){ }
  ngOnChanges(): void {
    if(this.selectedProduct){
      this.modalType = 'Edit';
      this.productForm.patchValue(this.selectedProduct);
    }else{
      this.modalType = 'Add';
      this.productForm.reset();
    }
  }

  closeModal(){
    this.productForm.reset();
    this.clickClose.emit(true);
  }

  addEditProduct(){
    this.productService.addEditProduct(this.productForm.value, this.selectedProduct).subscribe(
      response =>{
        this.clickAddEdit.emit(response);
        this.closeModal();
        const msg = this.modalType === 'Add' ? 'Product added' : 'Product updated';
        this.messageService.add({severity:'success',summary:'Success', detail: msg});
  
      },
      error=>{
        this.messageService.add({severity:'error',summary:'Error', detail:error});
        console.log('Error Occured');
      }
    )
  }
}
