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
}
