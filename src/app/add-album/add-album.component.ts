import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    selector: 'app-add-album',
    templateUrl: './add-album.component.html',
    styleUrls: ['./add-album.component.scss']
  }) 

export class AddAlbumComponent implements OnInit {
  [x: string]: any;

  albumForm: FormGroup;
  title = '';
  artist = '';
  genre = '';
  yearReleased = '';
  label = '';
  catalogNumber = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.albumForm = this.formBuilder.group({
        'title' : [null, Validators.required],
        'artist' : [null, Validators.required],
        'genre' : [null, Validators.required],
        'yearReleased' : [null, Validators.required],
        'label' : [null, Validators.required],
        'catalogNumber': [null, Validators.required]

      });
    }
    onFormSubmit() {
      this.isLoadingResults = true;
      this.api.addAlbum(this.albumForm.value)
        .subscribe((res: any) => {
            const id = res._id;
            this.isLoadingResults = false;
            this.router.navigate(['/show-book', id]);
          }, (err: any) => {
            console.log(err);
            this.isLoadingResults = false;
          });
    }
    }
  
  


