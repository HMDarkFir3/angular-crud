import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { Product } from "./product.model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  baseURl = "http://localhost:3001/products";

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseURl, product).pipe(
      map((obj) => obj),
      catchError((err) => this.errorHandler(err))
    );
  }

  readProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseURl).pipe(
      map((obj) => obj),
      catchError((err) => this.errorHandler(err))
    );
  }

  readProductId(id: string): Observable<Product> {
    const url = `${this.baseURl}/${id}`;
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError((err) => this.errorHandler(err))
    );
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${this.baseURl}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((err) => this.errorHandler(err))
    );
  }

  deleteProduct(id: string): Observable<Product> {
    const url = `${this.baseURl}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError((err) => this.errorHandler(err))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro", true);
    return EMPTY;
  }
}
