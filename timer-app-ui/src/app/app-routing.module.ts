import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimerComponent } from './timer/timer.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/timer', pathMatch: 'full' },
  { path: 'timer', component: TimerComponent },
  { path: 'list', component: TaskListComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
