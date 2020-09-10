import { Component, OnInit } from '@angular/core';
import { InventoryListService } from '../../app-logic/inventory-list.service';
import { InventoryItem } from 'src/app/app-logic/inventory-item';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.css']
})
export class ShowItemComponent implements OnInit {

  itemId: string;
  item: InventoryItem;
  itemIsFound = false;

  constructor(
    private inventoryListService: InventoryListService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.activatedRoute.params.subscribe((params) => {
        this.itemId = params.id;
      })
     }

  ngOnInit(): void {
    this.inventoryListService.getDataById(this.itemId).subscribe((data) => {
      this.item = new InventoryItem(data);
      this.itemIsFound = this.item ? true : false;
    });
  }

}
