import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { InventoryItem } from './inventory-item';
import { Observable } from 'rxjs';
import { tap, map, delay, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class InventoryListService {
    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    getData() {
        return this.http.get<InventoryItem[]>('/api/inventory-items')
            .pipe(
                tap((resp) => console.log("Inventory items fetched.", resp)),
                delay(100 + Math.floor(Math.random() * 900))
            )
    }

    putData(editedItem: InventoryItem) {
        console.log('put')
        return this.http.put<InventoryItem>('/api/inventory-items', editedItem, this.httpOptions)
            .pipe(
                tap((resp: InventoryItem) => console.log(`Updated item: `, resp))
            )
    }

    postData(newItem: InventoryItem) {
        console.log('post')
        return this.http.post<InventoryItem>('/api/inventory-items', newItem, this.httpOptions)
            .pipe(
                tap((resp: InventoryItem) => console.log(`Added item: `, resp))
            )
    }

}