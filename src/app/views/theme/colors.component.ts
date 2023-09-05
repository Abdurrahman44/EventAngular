import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventService} from "./event.service";


@Component({
  templateUrl:'colors.component.html',
    styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {
  closeEvent: any[] = [];
  eventForm: FormGroup;

  constructor(
    private eventService: EventService,
    private formBuilder: FormBuilder
  ) {
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      date: ['', Validators.required],
      explain: '',
    });

  }



  ngOnInit(): void {
   this.closeEvent.push();
   this.getUpcomingEvent();

  }

  getUpcomingEvent() {
    this.eventService.getUpcomingEvent().subscribe((data) => {
      this.closeEvent = data
    });
  }





}

