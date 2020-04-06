import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { ShowAlbumComponent } from './show-album/show-album.component';
import { AddAlbumComponent } from './add-album/add-album.component';
import { EditAlbumComponent } from './edit-album/edit-album.component';
import { HomePageComponent } from './home-page/home-page.component';
import { WishlistComponent } from './wishlist/wishlist.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent, 
    data: { title: 'home-page'}
  },
  {
    path: 'albums',
    component: AlbumsComponent,
    data: { title: 'Albums' }
  },
  {
    path: 'show-album/:id',
    component: ShowAlbumComponent,
    data: { title: 'Show Album' }
  },
  {
    path: 'add-album',
    component: AddAlbumComponent,
    data: { title: 'Add Album' }
  },
  {
    path: 'edit-album/:id',
    component: EditAlbumComponent,
    data: { title: 'Edit Album' }
  },
  { path: 'wishlist',
    component: WishlistComponent,
    data: { title: 'Wishlist'}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

