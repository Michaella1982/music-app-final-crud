import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.scss']
})
export class EditAlbumComponent implements OnInit {

  albumForm: FormGroup;
  _id = '';
  title = '';
  artist = '';
  genre = '';
  yearReleased = '';
  label = '';
  catalogNumber = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
 

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getAlbum(this.route.snapshot.params.id);
    this.albumForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'artist' : [null, Validators.required],
      'genre' : [null, Validators.required],
      'yearReleased' : [null, Validators.required],
      'label' : [null, Validators.required],
      'catalogNumber': [null, Validators.required]

    });
  }
  getAlbum(id: any) {
    this.api.getAlbum(id).subscribe((data: any) => {
      this._id = data._id;
      this.albumForm.setValue({
        title: data.title,
        artist: data.artist,
        genre: data.genre,
        yearReleased: data.yearReleased,
        label: data.label,
        catalogNumber: data.catalogNumber
      });
    });
  }
   
  
  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateAlbum(this._id, this.albumForm.value)
        .subscribe((res: any) => {
            const id = res._id;
            this.isLoadingResults = false;
            this.router.navigate(['/show-album', id]);
          }, (err: any) => {
            console.log(err);
            this.isLoadingResults = false;
          }
        );
    }
    albumDetails() {
      this.router.navigate(['/show-album', this._id]);
    }
}
