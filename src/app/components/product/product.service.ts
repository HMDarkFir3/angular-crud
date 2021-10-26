import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Product } from "./product.model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  baseURl = "http://localhost:3001/products";

  showMessage(msg: string): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseURl, product);
  }

  readProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseURl);
  }

  readProductId(id: string): Observable<Product> {
    const url = `${this.baseURl}/${id}`;
    return this.http.get<Product>(url);
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${this.baseURl}/${product.id}`;
    return this.http.put<Product>(url, product);
  }

  deleteProduct(id: string): Observable<Product> {
    const url = `${this.baseURl}/${id}`;
    return this.http.delete<Product>(url);
  }
}
