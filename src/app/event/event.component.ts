import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../views/theme/event.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  events: any[] = [];
  users: any[] = [];
  eventForm: FormGroup;
  usersForm: FormGroup;
  constructor(
      private eventService: EventService,
      private formBuilder: FormBuilder
  ) {
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      date: ['', Validators.required],
      explain: '',
    });
    this.usersForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }
//burada kişiler paneli açılmak amacıyla kullanılıyor olacaktır.
  isAddUserPanelOpen: boolean = false;
  openAddUserPanel() {
    this.isAddUserPanelOpen = !this.isAddUserPanelOpen;
  }

  ngOnInit(): void {

    this.events.push();
    this.loadEvents();
    this.getAllUsers();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe((data) => {
      this.events = data;
    });//event
  }
  getAllUsers(): void {
    this.eventService.getAllUsers().subscribe((data1: any) => {
      this.users = data1;
    });
  }

  deleteEvent(eventId: number): void {
    this.eventService.deleteEvent(eventId).subscribe(() => {
      this.loadEvents();
    });
  }
  postEvent(): void {
    if (this.eventForm.valid) {
      const eventData = this.eventForm.value;
      this.eventService.postEvent(eventData).subscribe(() => {
        this.loadEvents(); // Yeniden yüklemek yerine events dizisine doğrudan eklemek daha verimli olabilir.
        this.eventForm.reset();
      });
    }
  }
  // getUpcomingEvent() {
  //   this.eventService.getUpcomingEvent().subscribe((data) => {
  //     this.events = data;
  //   });
  // }

  addUsersToEvent(eventId: number, userIds: number[]): void {
    this.eventService.addUsersToEvent(eventId, userIds).subscribe(
        response => {
          console.log('Users added to event:', response);
          // Gerekirse burada kullanıcıya geri bildirim verebilirsiniz.
        },
        error => {
          console.error('Error adding users:', error);
          // Gerekirse burada hata durumunda kullanıcıya geri bildirim verebilirsiniz.
        }
    );
  }

}
