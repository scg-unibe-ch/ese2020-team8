import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { FavoritesService, IFavorite } from '../favorites.service';
import { IProduct } from '../products.service';

@Component({
  selector: 'app-product-favorite',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: IFavoriteStatus[];

  constructor(
    private favoriteService: FavoritesService,
    public userService: UserService,
    public router: Router
  ) {
    this.favoriteService.getMyFavorites().subscribe( favorites => this.favorites = favorites );
  }

  ngOnInit(): void {
  }

  goToBuy(product: IProduct): void {
    this.router.navigate(['products', product.id, 'buy' ]);
  }

  remove(favorite: IFavoriteStatus): void {
    this.favoriteService.delete( favorite.id ).subscribe( () => favorite.deleted = true );
  }

}

export interface IFavoriteStatus extends IFavorite {
  deleted?: boolean;
}
