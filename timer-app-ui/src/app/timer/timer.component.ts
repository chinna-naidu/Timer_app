import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  OnDestroy,
} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CountdownComponent } from 'ngx-countdown';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../http.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  formFlag: boolean;
  startTime: Date;
  endTime: Date;
  @ViewChild('timer') timer: CountdownComponent;
  @ViewChild('template') template: TemplateRef<any>;
  httpSubscription: Subscription;
  modalRef: BsModalRef;
  taskForm: FormGroup;
  constructor(
    private modalService: BsModalService,
    private http: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      time: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
    });
    this.taskForm = new FormGroup({
      task: new FormControl(null, [Validators.required]),
    });
  }

  playAudio() {
    let audio = new Audio('../../assets/serious-strike.mp3');
    audio.load();
    audio.play();
  }
  openModal() {
    this.modalRef = this.modalService.show(this.template);
  }
  onTimerStart() {
    console.log(this.myForm.value);
    let value = this.myForm.value;
    this.formFlag = true;
    let time = +value.time * +value.type;
    this.timer.config = {
      leftTime: time,
      demand: true,
    };
    this.timer.restart();
    this.startTime = new Date();
    this.timer.resume();
  }
  timerEvent(event) {
    if (event.action === 'done' && this.formFlag) {
      this.endTime = new Date();
      this.playAudio();
      setTimeout(() => {
        this.openModal();
      }, 1000);
    }
  }
  onTaskSubmit() {
    this.httpSubscription = this.http
      .addTask(
        this.taskForm.value.task,
        this.startTime.toISOString(),
        this.endTime.toISOString()
      )
      .subscribe((data) => {
        console.log(data);
        this.taskForm.reset();
        this.modalRef.hide();
        setTimeout(() => {
          this.router.navigate(['/list']);
        }, 1500);
      });
  }
  ngOnDestroy() {
    this.httpSubscription ? this.httpSubscription.unsubscribe : null;
  }
}
