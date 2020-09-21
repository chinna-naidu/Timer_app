import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../http.service';
import { Subscription } from 'rxjs';

interface Task {
  task: string;
  startedAt: Date;
  endedAt: Date;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[];
  httpSubscription: Subscription;
  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.httpSubscription = this.http
      .fetchTasks()
      .subscribe((data: { tasks: Task[] }) => {
        this.tasks = data.tasks;
      });
  }
  ngOnDestroy() {
    this.httpSubscription.unsubscribe();
  }
}
