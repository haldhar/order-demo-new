import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderComponent } from '../../orders/order/order.component';

import { PageEvent } from '@angular/material/paginator';

import { Product } from '../../../component/model/product.model';

import { MainServiceService } from '../../../component/services/main-service.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  searchText;

  loading = false;
  products: Product[];

  // MatPaginator Inputs
  pageSize = 3;
  pageSizeOptions: number[] = [3, 5, 8, 10];
  // MatPaginator Output
  pageEvent: PageEvent;
  // CREATE A JSON ARRAY.
  activePageDataChunk: any = []

  constructor(private router: Router, private mainServiceService: MainServiceService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.loading = true;
    this.mainServiceService.getAllProduct().pipe(first()).subscribe(products => {
      this.loading = false;
      this.products = products;
      this.activePageDataChunk = this.products.slice(0, this.pageSize);
    });
  }

  placeOrder() {
    this.router.navigateByUrl('/order');
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "610px";
    dialogConfig.width = "600px";
    const modalDialog = this.matDialog.open(OrderComponent, dialogConfig);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageDataChunk = this.products.slice(firstCut, secondCut);
  }
}
