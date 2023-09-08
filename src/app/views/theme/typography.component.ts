import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventService} from "./event.service";
import {cibLanyrd} from "@coreui/icons";


@Component({
  templateUrl: 'typography.component.html',
  styleUrls: ['./event.component.css']
})
export class TypographyComponent {
  eventId:any;
  events: any[] = [];
  users: any[] = [];
  seclectId:any[]=[];
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
      id:['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],

    });
  }
  toggleUserSelection(user:any ) {
    const index = this.users.indexOf(user.id);

    if (index === -1) {
      // Kullanıcı daha önce seçilmemişse, seçim listesine ekleyin
      this.seclectId.push(user.id);//seçilen listeye ekleme
    } else {
      // Kullanıcı zaten seçilmişse, seçim listesinden çıkarın
      this.seclectId.splice(index, 1);
    }

  }

//burada kişiler paneli açıl    mak amacıyla kullanılıyor olacaktır.
  isAddUserPanelOpen: boolean = false;
  openAddUserPanel(eventId:number) {

    this.eventId=eventId;
    // console.log(eventId)
    this.isAddUserPanelOpen = !this.isAddUserPanelOpen;
  }

  ngOnInit(): void {
    this.events.push();
    this.users.push();
    this.loadEvents();
    this.getAllUsers();


  }

  loadEvents(): void {//it is work
    this.eventService.getAllEvents().subscribe((data) => {
      this.events = data;
    });//event
  }
  getAllUsers(): void {
    this.eventService.getAllUsers().subscribe((data1: any) => {
      this.users = data1;
    });
  }

  deleteEvent(eventId: number): void {//it is work
    this.eventService.deleteEvent(eventId).subscribe(() => {
      this.loadEvents();
    });
  }
  postEvent(): void  {//it is work
    if (this.eventForm.valid) {
      const eventData = this.eventForm.value;
      const createRequestEvent = {
        eventName: eventData.eventName,
        date: eventData.date,
        explain: eventData.explain
      };
      this.eventService.postEvent(createRequestEvent).subscribe(() => {
        this.loadEvents(); // Yeniden yüklemek yerine events dizisine doğrudan eklemek daha verimli olabilir.
        this.eventForm.reset();
      });
    }
  }


  addUsersToEvent(eventId: any, userIds: number[]): void {
    this.seclectId=[];

    console.log("event id :"+eventId);
    console.log(userIds);

    this.eventService.addUsersToEvent(eventId, userIds).subscribe(
        response => {
          console.log('Users added to event:', response);
          this.isAddUserPanelOpen=false;
          // Gerekirse burada kullanıcıya geri bildirim verebilirsiniz.
        },
        error => {
          console.error('Error adding users:', error);
          // Gerekirse burada hata durumunda kullanıcıya geri bildirim verebilirsiniz.
        }
    );
  }


}
