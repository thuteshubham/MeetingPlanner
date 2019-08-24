const express = require('express');
const router = express.Router();
const meetingController = require("./../../app/controllers/meetingController");
const appConfig = require("./../../config/appConfig")


setRouter=(app)=>{

    let baseUrl = `${appConfig.apiVersion}/users`;

    app.get(`${baseUrl}/getAllEvents`,meetingController.getAllEvents);
        /**
         * @apiGroup Meetings
         * @apiVersion  1.0.0
         * @api {get} /api/v1/meetings/:userId/getAllMeetings To get all meeting details of perticular user(admin or general ).
         *
         * @apiParam {string} userId ID of user, whose meetings need to find. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Meetings found",
                "status": 200,
                "data": [
                    {
                        "meetingId": "xEVmYwrCO",
                        "hostId": "HQeQ_lu0x",
                        "hostName": "Mayur Mahamune",
                        "startDate": 1541513640000,
                        "endDate": 1541513646000,
                        "title": "SecondMeet",
                        "venue": "MK-12",
                        "purpose": "Des",
                        "meetingWithId": "vkCQIugq4",
                        "meetingWithName": "Yashraj Mahamune",
                        "meetingWithEmail": "yashrajmahamune154@outlook.com",
                        "createdOn": "2018-11-05T14:14:21.000Z",
                        "modifiedOn": "2018-11-07T03:12:39.000Z",
                        "_id": "5be0503d5f21130fd8403cf4",
                        "__v": 0
                    },
                    {
                        "meetingId": "JWprO18_D",
                        "hostId": "HQeQ_lu0x",
                        "hostName": "Mayur Mahamune",
                        "startDate": 1541475873000,
                        "endDate": 1541476601000,
                        "title": "First Meet",
                        "venue": "Somewhere",
                        "purpose": "Des",
                        "meetingWithId": "6QDmsgJ7B",
                        "meetingWithName": "Raju Rastogi",
                        "meetingWithEmail": "rrastogi949@gmail.com",
                        "createdOn": "2018-11-06T03:44:53.000Z",
                        "modifiedOn": "2018-11-06T04:00:42.000Z",
                        "_id": "5be10e35aff1ba12b0325031",
                        "__v": 0
                    }
                ]
            }
         * @apiErrorExample {json} Error-Response:
         *
            {
                "error": true,
                "message": "failed to find the meeting details",
                "status": 500,
                "data": null
            }
         * @apiErrorExample {json} Error-Response:
         *
            {
                "error": true,
                "message": "No user Found",
                "status": 500,
                "data": null
            }
    */


    
    app.post(`${baseUrl}/addMeeting`,meetingController.addMeeting);
    /**
     * @apiGroup Meetings
     * @apiVersion  1.0.0
     * @api {post} /api/v1/meetings/createMeeting To arrange new meeting.
     *
     * @apiParam {string} hostId Id of the user who is arranging meeting. (body params)
     * @apiParam {string} hostName Name of the user who is arranging it. (body params)
     * @apiParam {number} startDate Start time of the meeting in mili-seconds. (body params)
     * @apiParam {number} endDate End time of the meeting in mili-seconds. (body params)
     * @apiParam {string} title Short title of the meeting. (body params)
     * @apiParam {string} venue Venue of meeting. (body params)
     * @apiParam {string} purpose Brief description of the meeting agenda. (body params)
     * @apiParam {string} meetingWithId Id of the guest user. (body params)
     * @apiParam {string} meetingWithName Name of the guest user. (body params)
     * @apiParam {string} meetingWithEmail Email ID of the guest user. (body params)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
                    {
                        "error": false,
                        "message": "Meeting Arranged",
                        "status": 200,
                        "data": {
                            "meetingId": "xEVmYwrCO",
                            "hostId": "HQeQ_lu0x",
                            "hostName": "Mayur Mahamune",
                            "startDate": 1541513640000,
                            "endDate": 1541513646000,
                            "title": "SecondMeet",
                            "venue": "MK-12",
                            "purpose": "Des",
                            "meetingWithId": "vkCQIugq4",
                            "meetingWithName": "Yashraj Mahamune",
                            "meetingWithEmail": "yashrajmahamune154@outlook.com",
                            "createdOn": "2018-11-05T14:14:21.000Z",
                            "modifiedOn": "2018-11-07T03:12:39.000Z",
                            "_id": "5be0503d5f21130fd8403cf4",
                            "__v": 0
                        }
                    }
        * @apiErrorExample {json} Error-Response:
        *
            {
                "error": true,
                "message": "failed to create Meeting",
                "status": 500,
                "data": null
            }
    */

    app.post(`${baseUrl}/deleteMeeting`,meetingController.deleteMeeting);

    /**
         * @apiGroup Meetings
         * @apiVersion  1.0.0
         * @api {get} /api/v1/meetings/:meetingId/editMeeting To change/edit single meeting details.
         *
         * @apiParam {string} meetingId ID of meeting, whose details need to delete. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": true,
                "message": "Meeting deleted",
                "status": 200,
                "data": {
                    "n": 1,
                    "ok": 1
                }
            }
         * @apiErrorExample {json} Error-Response:
         *
            {
                "error": true,
                "message": "Failed to delete Meeting",
                "status": 500,
                "data": null
            }
         * @apiErrorExample {json} Error-Response:
         *
            {
                "error": true,
                "message": "No Meeting found",
                "status": 500,
                "data": null
            }
    */



    app.put(`${baseUrl}/updateMeeting`,meetingController.updateMeeting);

        /**
         * @apiGroup Meetings
         * @apiVersion  1.0.0
         * @api {get} /api/v1/meetings/:meetingId/editMeeting To change/edit single meeting details.
         *
         * @apiParam {string} meetingId ID of meeting, whose details need to find. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "meeting updated",
                "status": 200,
                "data": {
                    "n": 1,
                    "nModified": 1,
                    "ok": 1
                }
            }
         * @apiErrorExample {json} Error-Response:
         *
            {
                "error": true,
                "message": "Failed to update Meeting",
                "status": 500,
                "data": null
            }
         * @apiErrorExample {json} Error-Response:
         *
            {
                "error": true,
                "message": "Meeting not found",
                "status": 500,
                "data": null
            }
    */


}

module.exports = {
    setRouter
}