import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class AppService {

  getUserUrl = "http://127.0.0.1:3002/api/v1/users/all"
  signupUrl =  "http://127.0.0.1:3002/api/v1/users/signup"
  signInUrl="http://127.0.0.1:3002/api/v1/users/login"
  postMeeting="http://127.0.0.1:3002/api/v1/users/addMeeting"
  getEventDataUrl="http://127.0.0.1:3002/api/v1/users/getAllEvents";
  deleteMeetingUrl="http://127.0.0.1:3002/api/v1/users/deleteMeeting";
  updateMeetingUrl="http://127.0.0.1:3002/api/v1/users/updateMeeting";
  resetLink="http://127.0.0.1:3002/api/v1/users/updateMeeting";

  
  

  constructor(private http:HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get(this.getUserUrl)
  }

  signUp(data):Observable<any>{
    return this.http.post(this.signupUrl,data)
  }

  signIn(data):Observable<any>{
    return this.http.post(this.signInUrl,data)
  }


  setMeeting(data):Observable<any>{
    return this.http.post(this.postMeeting,data);
  }

  deleteEvent(data):Observable<any>{
    return this.http.post(this.deleteMeetingUrl,data);
  }

  updateEvent(meetingId, data):Observable<any>{
    return this.http.put(`${this.updateMeetingUrl}?meetingId=${meetingId}`,data);
  }

  getEventData(userId):Observable<any>{
    return this.http.get(this.getEventDataUrl + "?" + "userId=" + userId)
  }


  public sendResetLink(email): Observable<any> {
    
      
    return this.http.post(`${this.resetLink}`, email);
  }



}
