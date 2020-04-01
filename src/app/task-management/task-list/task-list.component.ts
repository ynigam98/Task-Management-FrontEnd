import { Component, OnInit, ViewChild } from '@angular/core';
import {PopupComponent} from '../popup/popup.component';
import {TaskService} from '../../shared/task.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(private taskService: TaskService, private dialog: MatDialog, private router: Router) { }

  listData: MatTableDataSource<any>;
  searchData: MatTableDataSource<any>;
  displayedColumns: string[] = ['QuoteType', 'Contact', 'Task', 'DueDate', 'TaskType', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.getAllData();
  }

  getAllData() {

    this.taskService.getAllQuotes().subscribe(
      list => {
        const array = list.map(item => {
          return {
            QuoteID: item.QuoteID,
            QuoteType: item.QuoteType,
            Task: item.Task,
            Contact: item.Contact,
            DueDate: item.DueDate,
            TaskType: item.TaskType
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.searchData = new MatTableDataSource(array);
        this.searchData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele !== 'actions' && data[ele].toLowerCase.indexOf(ele) !== -1;
          });
        };
      });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%' ;
    this.taskService.form.reset();
    this.dialog.open(PopupComponent, dialogConfig).afterClosed().subscribe(() => this.getAllData());
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onEdit(row) {
    this.taskService.form.setValue(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%' ;
    this.dialog.open(PopupComponent, dialogConfig).afterClosed().subscribe(() => this.getAllData());
  }

  onDelete(quoteid: number) {
    if (confirm('Are you sure you want to delete this record?')) {
    this.taskService.deleteQuote(quoteid).subscribe( () => {
      this.getAllData();
      this.taskService.form.reset();
    });
    }
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}


