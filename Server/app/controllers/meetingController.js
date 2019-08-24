const mongoose = require('mongoose')
const shortid = require('short-id');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const passwordLib = require('./../libs/generatePasswordLib');
const token = require('../libs/tokenLib');
const nodeMailer=require('../libs/mailTriggered');
const setRouter=require('./../routes/user');
const express=require('express')
const app=express();



/* Models */
const UserModel = mongoose.model('User');
const AuthModel=mongoose.model('Auth');
const UserMeetingModel=mongoose.model('Meeting');

let addMeeting=(req,res)=>{
    let newMeeting=new UserMeetingModel({
        eventId:shortid.generate(),
        title:req.body.title,
        description:req.body.description,
        startTime:req.body.startTime,
        endTime:req.body.endTime,
        userId: req.body.userId,
   
    });
    newMeeting.save((err,meetingOrganized)=>{
        if(err){
            console.log(err);
            logger.error(err.message,'userrController:addMeeting()',7);
            apiResponse=response.generate(true,'failed to create meeting',500,null)
            res.send(apiResponse)
        }
        else{
            apiResponse=response.generate(false,`meeting scheduled at${req.body.startTime}`,200,meetingOrganized);
            //const socket = req.app.io[req.body.userId];
            const socket = req.app.io;
            socket.in(req.body.userId).emit("get-notification", `meeting scheduled at${req.body.startTime}`);
            _sendMeetingNotification(meetingOrganized);
            res.send(apiResponse);
        }

    });
}

const _sendMeetingNotification = async (meetingDetails) => {
    UserModel.findOne({ userId: meetingDetails.userId })
                    .select('-__v -_id ')
                    .lean()
                    .exec((err, result) => {
                        if (err) {
                            console.log(err);
                            logger.error(err.message, 'User Controller: getSingleUser', 10);
                        } else if (check.isEmpty(result)) {
                            logger.info('no Meeting found', 'User Controller:get');
                        } else {
                            const emailData = {
                                user: result,
                                html : `Hi ${result.firstName}
                            Please find deatils of the meeting
                            Title: ${meetingDetails.title}
                            Description: ${meetingDetails.description}
                            Start Time: ${meetingDetails.startTime}
                            End Time: ${meetingDetails.endTime}`
                            };
                            nodeMailer.sendEmail(emailData);
                        }
                    });
}


let updateMeeting=(req,res)=>{
    let options = req.body;
    UserMeetingModel.update({ 'eventId': req.query.meetingId }, options).exec((err, result) => {
        if (err) {
            console.log(err);
            logger.error(err.message, 'User Controller:editMeeting', 10);
            let apiResponse = response.generate(true, 'Failed To edit user details', 500, null);
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Meeting Found', 'User Controller: editMeeting');
            let apiResponse = response.generate(true, 'No Meeting Found', 404, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, 'Meeting details edited', 200, result);
            res.send(apiResponse);
        }
    });

}

//delete event
let deleteMeeting = (req, res) => {

    UserMeetingModel.findOneAndRemove({ 'eventId': req.body.meetingId}).
    exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller: deleteMeeting()', 10);
            let apiResponse = response.generate(true, 'Failed To delete meeting', 500, null);
            res.send(apiResponse);
        } else if (check.isEmpty(result)) {
            logger.info('No meeting Found', 'User Controller: deleteUser')
            let apiResponse = response.generate(true, 'No meeting found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted meeting successfully', 200, result)
            res.send(apiResponse);
            
        }
    });// end user model find and remove


}




let getAllEvents=(req,res)=>{
    let userId = req.query.userId;
    UserMeetingModel.find({userId})
    .select('-_id -__v')
    .lean()
    .exec((err,result)=>{
        if(err){
            console.log(err);
            logger.error(err.message, 'User Controller: getAllEvents', 10);
            let apiResponse = response.generate(true, 'Failed To Find meeting Details', 500, null);
            res.send(apiResponse);
        }
        else{
            let apiResponse = response.generate(false, 'All meetings found', 200, result);
            res.send(apiResponse);
        }
    })
}

module.exports={
    addMeeting:addMeeting,
    getAllEvents: getAllEvents,
    deleteMeeting: deleteMeeting,
    updateMeeting: updateMeeting
}



