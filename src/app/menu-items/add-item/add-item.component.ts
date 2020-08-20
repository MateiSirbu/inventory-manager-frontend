import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { InventoryItem } from "../../app-logic/inventory-item"
import { InventoryListMockService } from "../../app-logic/inventory-list-mock.service"
import { Router } from "@angular/router"

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  addItemForm: FormGroup;
  item: InventoryItem;

  constructor(
    private fb: FormBuilder,
    private inventoryMockService: InventoryListMockService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.addItemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.maxLength(200)],
      user: ['', Validators.required],
      location: ['', Validators.required],
      inventoryNumber: ['', Validators.required],
      createdAt: [new Date(), Validators.required]
    })
  }

  onSubmit() {
    this.item = new InventoryItem(this.addItemForm.value)
    this.item.modifiedAt = new Date();
    this.item.deleted = false;
    this.item.id = this.inventoryMockService.getLastId() + 1;
    this.inventoryMockService.addItem(this.item);
    this.route.navigate(['/inventory']);
  }

}
