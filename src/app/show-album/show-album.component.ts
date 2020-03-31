import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Album } from '../album';

@Component({
  selector: 'app-show-album',
  templateUrl: './show-album.component.html',
  styleUrls: ['./show-album.component.scss']
})
export class ShowAlbumComponent implements OnInit {

  album: Album = {
    _id: '',
    title: '',
    artist: '',  
    genre: '', 
    yearReleased: null,
    label: '',
    catalogNumber: null,
  };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getAlbumDetails(this.route.snapshot.params.id);
  }
  getAlbumDetails(id: any) {
    this.api.getAlbum(id)
      .subscribe((data: any) => {
        this.album = data;
        console.log(this.album);
        this.isLoadingResults = false;
      });
  }
  deleteAlbum(id: any) {
    this.isLoadingResults = true;
    this.api.deleteAlbum(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/albums']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
