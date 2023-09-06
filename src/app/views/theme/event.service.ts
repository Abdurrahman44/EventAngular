import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EventService {
  //  tokens: any = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhIiwiaWF0IjoxNjkzOTE0NTY1LCJleHAiOjE2OTQwMDA5NjV9.PpbK31H4mX6MC_LL7Rsr7llP0uAE7Z4fiYjU7-2HOV0";
     headers;
    baseUrl = 'http://localhost:8085/api/event'; //  address
    static findById: any;
    constructor(private http: HttpClient) {
        const token = localStorage.getItem('user_auth');
        this.headers = {'Authorization': `Bearer ${token}`
        }

   }
    findById(id: any): Observable<any> {
        const url = `${this.baseUrl}/getByIdEvent/${id}`; // address
        return this.http.get(url);
    }

    getAllEvents(): Observable<any> {
        const url = `${this.baseUrl}/allEvent`; //  address
        console.log(this.headers);
        return this.http.get(url, {headers: this.headers});
    }

    getUpcomingEvent(): Observable<any> {
        const url = `${this.baseUrl}/closeEvent`; //  address
        return this.http.get(url, {headers:this.headers});
    }


    postEvent(event: any): Observable<any> {//event gönderilme kısmı
        const url = `${this.baseUrl}/createEvent`
        return this.http.post(url, event, {headers: this.headers});
    }

    updateEvent(event: any): Observable<any> {//event güncelleme
        const url = `${this.baseUrl}/updateEvent`
        return this.http.put(url, event, {headers: this.headers});
    }

    addUsersToEvent(eventId: number, userIds: number[]): Observable<any> {
        console.log(userIds)
        const url = `${this.baseUrl}/addUsers`; // Endpoint adresi
        const load = {
            eventId: eventId,
            userIds: userIds
        };
        return this.http.post(url, load, {headers: this.headers});
    }


    deleteEvent(eventId: number): Observable<any> {
        const url = `${this.baseUrl}/delete/${eventId}`; // Adresleme noktası
        return this.http.delete(url, {headers: this.headers});
    }

    sendEventNotification(eventId: number): Observable<any> {
        const url = `${this.baseUrl}/notify/${eventId}`; // Adresleme noktası
        return this.http.post(url, {eventId}, {headers: this.headers});
    }

    getAllUsers() {//Users çağırır
        const url = `http://localhost:8085/api/users/alluser`;
        return this.http.get(url, {headers: this.headers});
    }
}
