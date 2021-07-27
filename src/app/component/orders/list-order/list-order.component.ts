import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Order } from '../../model/order.model';
import { MainServiceService } from '../../services/main-service.service';

export interface PeriodicElement {
  id: string;
  dateCreated: string;
  totalPrice: number;
  status: string;
}

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  displayedColumns: string[] = ['id', 'dateCreated', 'totalPrice', 'status'];

  dataSource;

  searchText;

  loading = false;
  orders: Order[];

  constructor(private mainServiceService: MainServiceService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.loading = true;
    this.mainServiceService.getAllOrder().pipe(first()).subscribe(orders => {
      this.loading = false;
      this.orders = orders;
      const ELEMENT_DATA: PeriodicElement[] = this.orders;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}