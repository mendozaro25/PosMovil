import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
@Component({
  selector: 'app-example-crud',
  templateUrl: './example-crud.page.html',
  styleUrls: ['./example-crud.page.scss'],
})
export class ExampleCrudPage implements OnInit {
  mainForm: FormGroup;
  Data: any[] = []
  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchQuoties().subscribe(item => {
          this.Data = item
        })
      }
    });
    this.mainForm = this.formBuilder.group({
      typeDocument: ['',],
      numberDocument: ['',],
      nameOFsocial: ['',],
      phone: ['',]
    })
  }
  storeData() {
    this.db.addQuote(
      this.mainForm.value.typeDocument,
      this.mainForm.value.numberDocument,
      this.mainForm.value.nameOFsocial,
      this.mainForm.value.phone
    ).then((res) => {
      this.mainForm.reset();
    })
  }
  deleteSong(id){
    this.db.deleteQuote(id).then(async(res) => {
      let toast = await this.toast.create({
        message: 'Cotización deleted',
        duration: 2500
      });
      toast.present();      
    })
  }
   
}