import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Task} from '../task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  form: FormGroup = new FormGroup({
    QuoteID: new FormControl(null),
    QuoteType: new FormControl('', Validators.required),
    Contact: new FormControl('', Validators.required),
    Task: new FormControl('', Validators.required),
    DueDate: new FormControl('', Validators.required),
    TaskType: new FormControl('', Validators.required)
  });

  url = 'https://localhost:44340/api/values';
  constructor(private http: HttpClient) {
  }
  getAllQuotes(): Observable<Task[]> {
    // const reqHeader = new HttpHeaders({Authorization: 'Bearer' + localStorage.getItem('userToken')});
    return this.http.get<Task[]>
    (this.url + '/GetAll');
  }
  getQuoteById(QuoteId: number): Observable<Task> {
    return this.http.get<Task>
    (this.url + '/GetUnique/' + QuoteId);
  }
  createQuote(Quote: Task): Observable<Task> {
    const httpOptions = { headers: new HttpHeaders ({'Content-Type': 'application/json'})};
    return this.http.post<Task>
    (this.url + '/Post/' , Quote, httpOptions);
  }
  updateQuote(Quote: Task): Observable<Task> {
    const httpOptions = { headers: new HttpHeaders ({'Content-Type': 'application/json'})};
    return this.http.put<Task>
    (this.url + '/Put/' + Quote.QuoteID , Quote, httpOptions);
  }
  deleteQuote(QuoteId: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.delete<number>(this.url + '/delete/?id=' + QuoteId, httpOptions);
  }
}
