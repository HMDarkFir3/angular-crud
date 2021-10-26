import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HeaderService } from "../../templates/header/header.service";
import { Product } from "../product.model";
import { ProductService } from "../product.service";

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.css"],
})
export class ProductUpdateComponent implements OnInit {
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
      title: "Alteração de Produtos",
      icon: "edit",
      routerUrl: "/products/update/:id",
    };
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");

    this.productService.readProductId(String(id)).subscribe((product) => {
      this.product = product;
    });
  }

  updateProduct(): void {
    this.productService.updateProduct(this.product).subscribe(() => {
      this.productService.showMessage("Produto alterado com sucesso");
    });

    this.router.navigate(["/products"]);
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
