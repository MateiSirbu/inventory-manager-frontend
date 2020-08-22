import { Component, OnInit } from '@angular/core';
import { InventoryListMockService } from 'src/app/app-logic/inventory-list-mock.service';
import { InventoryItem } from 'src/app/app-logic/inventory-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.css']
})
export class AddItemFormComponent {

  constructor(private inventoryMockService: InventoryListMockService, private route: Router) { }

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
    this.model.id = this.inventoryMockService.getLastId() + 1;
    this.inventoryMockService.addItem(this.model);
  }

  navigateToInventoryList() {
    this.route.navigate(['/inventory']);
  }

}
