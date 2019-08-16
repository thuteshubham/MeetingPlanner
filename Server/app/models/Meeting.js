const mongoose=require('mongoose');
const Schema=mongoose.Schema

let userMeeting=new Schema({
    eventId: {
        type: String,
        default: '',
        index: true,
        unique: true
      },
    title:{
        type:String,
        default:''
    },
    description:{
        type:String,
        default:'',
    },
    startTime:{
        type:String
    },
    endTime:{
        type:String
    },
    userId:{
        type:String
    }
});

mongoose.model('Meeting',userMeeting);
