import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  // url do servidor
  private readonly url = 'https://sample-customers-api.herokuapp.com/api/thf-samples/v1/people';
  private customersSub: Subscription;

  public customers: Array<any> = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.customersSub = this.httpClient.get(this.url)
      .subscribe((response: { hasNext: boolean, items: Array<any> }) => {
        this.customers = response.items;
      });
  }

  ngOnDestroy() {
    this.customersSub.unsubscribe();
  }

}
