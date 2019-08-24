import {Component,OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef} from '@angular/core';
import { Router, Route } from '@angular/router';
import {ActivatedRoute} from "@angular/router";
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import { Subject } from 'rxjs';
import {Meeting} from './meeting';
import {AppService} from './../app.service'
import {Cookie} from 'ng2-cookies';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  public title:any;
  public description:any;
  public mode = "READ";
  public startTime:any;
  public endTime:any;
  public meetingId:any;
  public isAdmin: boolean =  JSON.parse(Cookie.get('IS_ADMIN'));
  meeting:Meeting[];
  userId: string;

  // @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  
  constructor(
    private modalService: NgbModal,
    private appService:AppService,
    private router: Router,
    private route: ActivatedRoute) {
           
    }

 ngOnInit(){
  this.route.queryParams.subscribe((params) => {
    let userId = params.userId? params.userId: ""; 
    if(userId)
      this.userId = userId;   
      this.bindCalendarEvents(userId)
  })
 }
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        if(!this.isAdmin) {
          return;
        }
        this.handleEvent('Edited', event, "");
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        if(!this.isAdmin) {
          return;
        }
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event, "");
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }, content): void {
    if (isSameMonth(date, this.viewDate)) {
      if (this.isAdmin && (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0 ) {
        this.activeDayIsOpen = false;
        this.title = "";
        this.description = "";
        this.startTime = "";
        this.endTime = "";
        this.mode = "ADD";
        this.openAddModel(content);
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event,"");
  }

  handleEvent(action: string, event: CalendarEvent, content): void {
    this.modalData = { event, action };
    this.meetingId = event.id;
     this.title = event.title;
     this.description = event.description;
     this.startTime = this._getTimeFromDate(event.start); 
     this.endTime = this._getTimeFromDate(event.end);
     this.mode = "EDIT";
    this.openAddModel(content);
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  _getTimeFromDate(date){
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours<10?'0':''}${hours}:${minutes<10?'0':''}${minutes}`;
  }

  async bindCalendarEvents(userId){
    await this.appService.getEventData(userId).subscribe(response=>{      
      let allEvents = [];
      for(let index=0; index < response.data.length ; index++){
        let event: any = {};
        let data = response.data[index];
        event.id = data.eventId;
        event.start = new Date(data.startTime);
        event.end = new Date(data.endTime);
        event.title = data.title;
        event.actions = this.actions;
        event.description = data.description;
        allEvents.push(event);
      }
      this.events = allEvents;
    })
  }


  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  
  openAddModel(content) {
    this.modalService.open(content, {ariaLabelledBy: 'add-event'}).result.then((result) => {
      
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(reason);
    });
  }

  async organizeMeeting(closeModal){
    if(!this.isAdmin) {
      return;
    }
    let data={
      title:this.title,
      description:this.description,
      startTime: this.viewDate.toDateString()+" "+this.startTime,
      endTime: this.viewDate.toDateString()+" "+this.endTime,
      userId: this.userId
    }
      await this.appService.setMeeting(data)
    .subscribe((response)=> {
      if(response.status===200){
        this.bindCalendarEvents(this.userId);
        closeModal(response.message);
      }
    });   
  }

  async updateMeeting(closeModal){
    if(!this.isAdmin) {
      return;
    }
    const data={
      title:this.title,
      description:this.description,
      startTime: this.viewDate.toDateString()+" "+this.startTime,
      endTime: this.viewDate.toDateString()+" "+this.endTime,
      userId: this.userId
    }

   await this.appService.updateEvent(this.meetingId, data)
   .subscribe((response)=>{
     console.log(response);
     if(response.status===200){
       this.bindCalendarEvents(this.userId);
       closeModal(response.message);
     }
   })
   
 }


  async deleteMeeting(closeModal){
    if(!this.isAdmin) {
      return;
    }
     let data={
      meetingId:this.meetingId
    }
    console.log(data);
    await this.appService.deleteEvent(data)
    .subscribe((response)=>{
      console.log(response);
      if(response.status===200){
        this.bindCalendarEvents(this.userId);
        closeModal(response.message);
      }
    })
    
  }
  
  signOff() {
    Cookie.delete('AuthToken');
    Cookie.delete('userId');
    this.router.navigate(['/login']);
  }
  
}
