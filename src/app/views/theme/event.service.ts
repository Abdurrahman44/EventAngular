import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  baseUrl = 'http://localhost:8085/api/event'; // Değişen adres
  static findById: any;

  constructor(private http: HttpClient) {
  }

  findById(id: any): Observable<any> {
    const url = `${this.baseUrl}/getByIdEvent/${id}`; // Değişen adres
    return this.http.get(url);
  }

  getAllEvents(): Observable<any> {
    const url = `${this.baseUrl}/allEvent`; // Değişen adres
    return this.http.get(url);
  }

  getUpcomingEvent(): Observable<any> {
    const url = `${this.baseUrl}/getCloseEvent`; // Değişen adres
    return this.http.get(url);
  }

  postEvent(event: any): Observable<any> {//event gönderilme kısmı
    const url = `${this.baseUrl}/createEvent`
    return this.http.post(url, event);
  }

  updateEvent(event: any): Observable<any> {//event güncelleme
    const url = `${this.baseUrl}/updateEvent`
    return this.http.put(url, event);
  }

  // addUserToEvent(eventId: number, userId: number): Observable<any> {//*burası çoklu hale getirilecek
  //   const url = `${this.baseUrl}/${eventId}/users/${userId}`; // Adresleme noktası
  //   return this.http.post(url, {userId});
  // }
  addUsersToEvent(eventId: number, userIds: number[]): Observable<any> {
    const url = `${this.baseUrl}/api/event/addUsers`; // Endpoint adresi
    const payload = {
      eventId: eventId,
      userIds: userIds
    };
    return this.http.post(url, payload);
  }


  deleteEvent(eventId: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${eventId}`; // Adresleme noktası
    return this.http.delete(url);
  }

  sendEventNotification(eventId: number): Observable<any> {
    const url = `${this.baseUrl}/notify/${eventId}`; // Adresleme noktası
    return this.http.post(url, {eventId});
  }

  getAllUsers() {//Users çağırır
    const url = `${this.baseUrl}/alluser`;
    return this.http.get(url);
  }
}
