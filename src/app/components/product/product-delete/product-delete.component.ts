import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../product.model";
import { HeaderService } from "../../templates/header/header.service";

@Component({
  selector: "app-product-delete",
  templateUrl: "./product-delete.component.html",
  styleUrls: ["./product-delete.component.css"],
})
export class ProductDeleteComponent implements OnInit {
  product: Product = {
    name: "",
    price: null,
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService
  ) {
    headerService.headerData = {
      title: "Remoção de Produtos",
      icon: "delete",
      routerUrl: "/products/delete/:id",
    };
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");

    this.productService.readProductId(String(id)).subscribe((product) => {
      this.product = product;
    });
  }

  deleteProduct(): void {
    const id = this.route.snapshot.paramMap.get("id");

    this.productService.deleteProduct(String(id)).subscribe(() => {
      this.productService.showMessage("Produto deletado com sucesso");
      this.router.navigate(["/products"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
