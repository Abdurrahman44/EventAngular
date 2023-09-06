import {Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from "@angular/material/sort";
import {DialogComponent} from "../../../dialog/dialog.component";
import {MatTableDataSource} from "@angular/material/table";
import {DialogService} from "../../../dialog/dialog.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-accordions',
  templateUrl: './accordions.component.html',
  styleUrls: ['./accordions.component.scss']
})
export class AccordionsComponent {


  displayedColumns: string[] = ["id", "name", "lastName", "Email", "Password","Role"  ,"Action"];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  roles: any = [];
  roleNames: any = [];


  constructor(private dialog: DialogService, private _liveAnnouncer: LiveAnnouncer, private log: MatDialog) {
  }

  ngOnInit() {
    this.getAllUser();

  }

  getAllUser() {
    this.dialog.getAllUsers().subscribe({
      next: (res: any) => {
        this.roles = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
    });

  }

  editUser(user: any) {
    this.log.open(DialogComponent, {
      width: '30%',
      data: user
    }).afterClosed().subscribe(value => {
      if (value === 'save') {
        this.getAllUser();
      }
    })

  }
  deleteUser(id: number) {
    console.log(id);
    this.dialog.deleteUser(id).subscribe({
      next: (res) => {
        alert("Delete successful");
        this.dialog.getAllUsers();
        this.getAllUser();
      }


    })

  }


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

  getName(id: any) {
      this.roleNames = this.roles.filter((a: { id: any; })=>a.id === id);
      return this.roleNames[0].roles.map((a: { roleName: any; })=>a.roleName).join(',')
  }
}
