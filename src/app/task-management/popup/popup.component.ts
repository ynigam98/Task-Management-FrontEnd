import { Component, OnInit, Inject } from '@angular/core';
import {TaskService} from '../../shared/task.service';
import {Task} from '../../task';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  dataSaved: boolean;
  message: string;
  quoteIdUpdate: number;

  constructor(public taskService: TaskService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  onFormSubmit() {
    this.dataSaved = false;
    const newTask = this.taskService.form.value;
    this.createQuote(newTask);
    this.taskService.form.reset();
    this.dialog.closeAll();
  }

  resetForm() {
    this.taskService.form.reset();
    this.dataSaved = false;
    this.message = null;
  }

  createQuote(task: Task) {
    if (task.QuoteID == null) {
      this.taskService.createQuote(task).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'Record saved Successfully';
          this.taskService.form.reset();
          console.log(this.message);
        }
      );
    } else {
      this.taskService.updateQuote(task).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Record Updated Successfully';
        this.quoteIdUpdate = null;
        this.taskService.form.reset();
      });
    }

  }
}
