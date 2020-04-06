import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      info: this.fb.array([])
    })
  }
  get recordForms() {
    return this.myForm.get('info') as FormArray
  }

  addInfo(){
    const info = this.fb.group({
      title: [],
      artist:[],
      genre:[],
      notes: []
    })
    this.recordForms.push(info);
  }

  deleteInfo(i){
    this.recordForms.removeAt(i)
  }
}
