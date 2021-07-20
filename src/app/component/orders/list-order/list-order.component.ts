import { Component, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';
import { first } from 'rxjs/operators';

import { Order } from '../../model/order.model';
import { MainServiceService } from '../../services/main-service.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  searchText;

  loading = false;
  orders: Order[];

  // MatPaginator Inputs
  pageSize = 3;
  pageSizeOptions: number[] = [3, 5, 8, 10];
  // MatPaginator Output
  pageEvent: PageEvent;
  // CREATE A JSON ARRAY.
  activePageDataChunk: any = []

  constructor(private mainServiceService: MainServiceService) { }

  ngOnInit() {
    this.loading = true;
    this.mainServiceService.getAllOrder().pipe(first()).subscribe(orders => {
      this.loading = false;
      this.orders = orders;
      this.activePageDataChunk = this.orders.slice(0, this.pageSize);
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageDataChunk = this.orders.slice(firstCut, secondCut);
  }
}