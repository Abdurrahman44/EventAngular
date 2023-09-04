import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogService} from "./dialog.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  //form üretimi sağlar
  userForm = new FormGroup({
    id:new FormControl(),
    name: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('',),
    password: new FormControl(''),
    roles: new FormControl(''),
  });
  //usere seri bir şekilde fetch edilir.
  users: any[] = [];
  actionBtn: String = "Update";

                                                                                  //talo halinde verileri çeker
  constructor(private formBuilder: FormBuilder, private dialog: DialogService, @Inject(MAT_DIALOG_DATA) public editData: any,
              private dialogRef: MatDialogRef<DialogComponent>) {
   console.log(editData)

  }


  ngOnInit() {
//console.log(this.editData)
//    const val=this.editData;
    this.userForm.setValue({//nesnelerin kaydedilme işlemi
      id:this.editData.id,
      name: this.editData.name,
      lastName: this.editData.lastName,
      email: this.editData.email,
      password:this.editData.password,
      roles:this.editData.roles,
    });

  }
test(){
    console.log(this.userForm)
}
  updateUser() {//burasıda çalışıyor

    const userData = this.userForm.value;
    console.log(userData)
    console.log(userData)
    if (this.userForm.valid) {
      this.dialog.updateUser(userData).subscribe(
        (res:any) => {

          this.getAllUsers();
          this.userForm.reset();
        }, (error:any) => {
          console.log("işlem başarısız")
        }
      );
    }

  }

  getAllUsers(): void {
    this.dialog.getAllUsers().subscribe((data1: any) => {
      this.users = data1;
    });
  }


}
