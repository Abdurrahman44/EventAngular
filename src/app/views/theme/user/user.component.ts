import {Component, OnInit, ViewChild} from '@angular/core';

import {DialogService} from "../../../dialog/dialog.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],

})
export class UserComponent implements OnInit{

    displayedColumns:string[]=["id","name","lastName","Email","Password","Role","Action"];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  constructor(private dialog:DialogService,private _liveAnnouncer:LiveAnnouncer) {
  }

  ngOnInit() {
    this.getAllUser();

  }

 getAllUser(){
   this.dialog.getAllUsers().subscribe({next:(res:any)=>{
     this.dataSource=new MatTableDataSource(res) ;
     this.dataSource.paginator=this.paginator;
       this.dataSource.sort=this.sort;

   }
   });

 }
 editUser(){}

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  // }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }



}
