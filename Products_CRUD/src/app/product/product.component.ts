import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { response } from 'express';
import { Product } from './product';
import { ConfirmationService, MessageService } from 'primeng/api';
import { error } from 'console';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';


Chart.register(...registerables);

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  displayAddEditModal = false;
  selectedProduct : any = null;
  data : any;
  datatitle:any[] =[];
  dataprice:any[] =[];
  datadescription:any[] =[];
  datacategory:any[] =[];
  dataimage:any[] =[];

  constructor(private ProductService: ProductService , private confirmationService:ConfirmationService , private messageService: MessageService){ }

  ngOnInit(): void {

    this.ProductService.getProducts().subscribe(response=>{
      this.data =response;

      if(this.products!=null){
        for(let i=0; i<this.data.length; i++){
          this.dataprice.push(this.data[i].price);
        }
      }
    })

    this.getProductList();
    this.getProductdata(this.dataprice);
  }

  getProductdata(dataprice:any){
    // console.log(dataprice);
    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: dataprice,
        datasets: [{
          label: 'Products',
          data: [10,20,30,40,50,60,70,80,100],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getProductList(){
    this.ProductService.getProducts().subscribe(
      response =>{
        this.products = response;
      }
    )
  }
  showAddModal(){
    this.displayAddEditModal = true;
    this.selectedProduct = null;
  }
  hideAddModal(isClosed: boolean){
    this.displayAddEditModal = !isClosed;
  }
  saveUpdateProductToList(newData: any){
    if(this.selectedProduct && newData.id === this.selectedProduct.id ){
      const productIndex = this.products.findIndex(data => data.id === newData.id );
      this.products[productIndex] =newData;
    }else{
      this.products.unshift(newData);
    }
    // this. getProductList();
  }
  showEditModal(product:Product){
    this.displayAddEditModal = true;
    this.selectedProduct = product;
  }
  deleteProduct(product: Product){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete product?',
      accept: () =>{
        this.ProductService.deleteProduct(product.id).subscribe(
          response =>{
            this.products = this.products.filter(data=> data.id !== product.id)
            this.messageService.add({severity:'success',summary:'Success', detail:'Deleted Successfully'});
          },
          error=>{
            this.messageService.add({severity:'error',summary:'Error', detail:error})
          }
        )
      }
  });
  }
}
