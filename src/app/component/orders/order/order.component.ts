import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


import { MainServiceService } from '../../services/main-service.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mainServiceService: MainServiceService,
    private dialogRef: MatDialogRef<OrderComponent>
  ) {
  }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      productId: ['', Validators.required],
      quantity: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      cc: ['', Validators.required],
      bcc: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required],
      replyTo: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.orderForm.invalid) {
      return;
    }

    var orderObj = {
      "confirmationEmail": {
        "bcc": this.orderForm.value.bcc,
        "body": this.orderForm.value.body,
        "cc": this.orderForm.value.cc,
        "from": this.orderForm.value.from,
        "replyTo": this.orderForm.value.replyTo,
        "subject": this.orderForm.value.subject,
        "to": this.orderForm.value.to
      },
      "productOrders": [
        {
          "pk": {
            "product": {
              "id": this.orderForm.value.productId
            }
          },
          "quantity": this.orderForm.value.quantity
        }
      ]
    }

    this.loading = true;
    this.mainServiceService.placeOrder(orderObj)
      .pipe()
      .subscribe(
        data => {
          this.router.navigate(['/listorder']);
          this.closeModal();
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  closeModal() {
    this.dialogRef.close();
  }
}
