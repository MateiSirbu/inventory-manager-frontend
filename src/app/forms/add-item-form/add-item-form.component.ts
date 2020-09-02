import { Component, OnInit } from '@angular/core';
import { InventoryListMockService } from 'src/app/app-logic/inventory-list-mock.service';
import { InventoryItem } from 'src/app/app-logic/inventory-item';
import { Router } from '@angular/router';
import { InventoryListService } from 'src/app/app-logic/inventory-list.service';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.css']
})
export class AddItemFormComponent {

  constructor(private inventoryMockService: InventoryListMockService,
     private route: Router,
     private inventoryListService: InventoryListService) { }

  submitted = false;

  model = new InventoryItem({
    name: "Thingamajig",
    user: "John Doe",
    location: "Level 1",
    inventoryNumber: 12345678,
    createdAt: new Date(),
    modifiedAt: new Date(),
    description: "The thing in a nutshell, or two",
    deleted: false
  })

  onSubmit() {
    this.submitted = true;
    // this.model.id = this.inventoryMockService.getLastId() + 1; 
    // unnecessary, mongoDB does this for you. Also not required by API, throws internal error
    this.inventoryListService.postData(this.model).subscribe();
  }

  navigateToInventoryList() {
    this.route.navigate(['/inventory']);
  }

}
