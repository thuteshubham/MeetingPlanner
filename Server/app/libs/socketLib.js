/**
 * modules dependencies.
 */
const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('short-id');
const logger = require('./loggerLib.js');
const events = require('events');
const eventEmitter = new events.EventEmitter();

const tokenLib = require("./tokenLib.js");
const check = require("./checkLib.js");
const response = require('./responseLib')

const Store = require('data-store');
const store = new Store({ path: 'config.json' });

let setServer = (server) => {

    let users = {};

    let io = socketio.listen(server);

    let myIo = io.of('');


    myIo.on('connection',(socket) => {

        console.log("on connection--emitting verify user");
        //store.set('', socket); 
        // code to verify the user and make him online

        socket.on('set-user', (userId) => {
            socket.join(userId);
            console.log("User Joined");
        });

        socket.on('disconnect', (userId) => {
            socket.leave(userId);
            console.log("user is disconnected");
        }) // end of on disconnect




    });
    return io;
}

module.exports = {
    setServer: setServer
}
