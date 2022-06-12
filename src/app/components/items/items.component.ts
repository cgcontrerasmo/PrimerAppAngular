import { Component, OnInit } from '@angular/core';
import { timeInterval, zip } from 'rxjs';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  total: number = 0;
  constructor(private itemServices: ItemService) {}

  ngOnInit(): void {
    //this.items = [];
    //this.items = this.itemServices.getItems();
    this.itemServices.getItems().subscribe((data) => {
      this.items = data;
      this.getTotal();
    });
  }

  deleteItem(item: Item) {
    this.items = this.items.filter((x) => x.id !== item.id);
    this.itemServices.deleteItem(item).subscribe();
    this.getTotal();
  }

  toggleItem(item: Item) {
    this.itemServices.toggleItem(item).subscribe();
    this.getTotal();
  }
  getTotal() {
    this.total = this.items
      .filter((x) => !x.completed)
      .map((el) => el.quantity * el.price)
      .reduce((acc, item) => (acc += item), 0);
  }
}
