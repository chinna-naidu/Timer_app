import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  fetchTasks() {
    return this.http.get('http://localhost:3000/tasks');
  }

  addTask(task: string, startedAt: string, endedAt: string) {
    return this.http.post('http://localhost:3000/tasks', {
      task: task,
      startedAt: startedAt,
      endedAt: endedAt,
    });
  }
}
