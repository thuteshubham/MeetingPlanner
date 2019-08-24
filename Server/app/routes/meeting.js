const express = require('express');
const router = express.Router();
const meetingController = require("./../../app/controllers/meetingController");
const appConfig = require("./../../config/appConfig")
const auth=require('./../middlewares/auth')

setRouter=(app)=>{

    let baseUrl = `${appConfig.apiVersion}/users`;

    app.get(`${baseUrl}/getAllEvents`,meetingController.getAllEvents);

    
    app.post(`${baseUrl}/addMeeting`,meetingController.addMeeting);

    app.post(`${baseUrl}/deleteMeeting`,meetingController.deleteMeeting);
    app.put(`${baseUrl}/updateMeeting`,meetingController.updateMeeting);

}

module.exports = {
    setRouter
}