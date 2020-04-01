import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../app/shared/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  Id: number;
  quoteid: number;
  QuoteType: string;
  Contact: string;
  Task: string;
  DueDate: Date;
  TaskType: string;

  constructor(private taskService: TaskService, private data: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.Id = Number(this.data.snapshot.paramMap.get('id'));
    this.taskService.getQuoteById(this.Id).subscribe( task => {
      this.quoteid = this.Id;
      this.QuoteType = task.QuoteType;
      this.Contact = task.Contact;
      this.DueDate = task.DueDate;
      this.Task = task.Task;
      this.TaskType = task.TaskType;
      });
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }



}
