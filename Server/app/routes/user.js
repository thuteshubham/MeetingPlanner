const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")


setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    // defining routes.


    app.get(`${baseUrl}/all`,userController.getAllUser);
       /**
         * @apiGroup Users
         * @apiVersion  1.0.0
         * @api {get} /api/v1/users/view/allUsers To get All users
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "All User Details Found",
                "status": 200,
                "data": [
                    {
                        "userId": "eKOTSdkn7",
                        "firstName": "Shubham",
                        "lastName": "thute",
                        "password": "$2b$10$fQHYrFiuqMhDkRZDOCWPeuRAu25vEDAmdTYOrFhw.3CSdSJS/GL2e",
                        "email": "thuteshubham@gmail.com",
                        "mobileNumber": " 91-7276789024",
                        "country": "IN",
                        "userVerificationStatus": true,
                        "createdOn": "2018-09-19T06:40:15.000Z",
                        "modifiedOn": "2018-09-19T06:40:15.000Z"
                    },
                    ..........
                ]
            }
    */


    app.post(`${baseUrl}/deleteUser`,userController.deleteUser);
      /**
         * @apiGroup Users
         * @apiVersion  1.0.0
         * @api {put} /api/v1/users/:userId/deleteUser To delete single user.
         *
         * @apiParam {string} userId User ID of the user. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
                {
                    "error": false,
                    "message": "Deleted the user successfully",
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
                    "message": "No User Found",
                    "status": 404,
                    "data": null
                }
    */




    app.get(`${baseUrl}/:userId/view`,userController.getSingleUser);
       /**
         * @apiGroup Users
         * @apiVersion  1.0.0
         * @api {get} /api/v1/users/:userId/userDetails To get details of user
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "User Details Found",
                "status": 200,
                "data": {
                    "userId": "eKOTSdkn7",
                    "firstName": "Shubham",
                    "lastName": "thute",
                    "email": "thuteshubham@gmail.com",
                    "mobileNumber": " 91-undefined",
                    "country": "IN",
                    "userVerificationStatus": true,
                    "createdOn": "2018-09-19T06:40:15.000Z",
                    "modifiedOn": "2018-09-19T06:40:15.000Z"
                }
            }
    */ 
    

    // params: firstName, lastName, email, mobileNumber, password
    app.post(`${baseUrl}/signup`,userController.signUpFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
                "userDetails": {
                "mobileNumber": 2234435524,
                "email": "someone@mail.com",
                "lastName": "Sengar",
                "firstName": "Rishabh",
                "userId": "-E9zxTYA8"
            }

        }
    */

    // params: email, password.
    app.post(`${baseUrl}/login`,userController.loginFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout to logout user.
     *
     * @apiParam {string} userId userId of the user. (auth headers) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": null

        }
    */

    // auth token params: userId.
    app.post(`${baseUrl}/logout`, userController.logout);

    




}


module.exports={
    setRouter:setRouter
}