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

    getData(pageNumber = 1, pageSize = 5, activeOnly = false, sorting = ''): Observable<[InventoryItem[], number]> {
        let params = new HttpParams()
            .set('activeOnly', activeOnly ? 'true' : 'false')
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString())
        if (sorting) params = params.set('sort', sorting);

        return this.http
            .get<InventoryItem[]>('/api/inventory-items', {
                params: params,
                observe: 'response'
            })
            .pipe(
                tap((resp) => {
                    console.log('Inventory items fetched', resp.body);
                }),
                map((resp) => {
                    return [resp.body, parseInt(resp.headers.get('X-Count'))];
                })
            );
    }

    updateData(item: InventoryItem) {
        return this.http.put<InventoryItem>('/api/inventory-items/' + item.id, item)
            .pipe(tap(() => console.log('Item ', item.id, ' was updated.')))
    }

    deleteData(item: InventoryItem) {
        return this.http.delete<InventoryItem>('/api/inventory-items/' + item.id)
            .pipe(tap(() => console.log('Item ', item.id, ' was deleted.')))
    }

    postData(newItem: InventoryItem) {
        return this.http.post<InventoryItem>('/api/inventory-items', newItem, this.httpOptions)
            .pipe(
                tap((resp: InventoryItem) => console.log(`Added item: `, resp))
            )
    }

}