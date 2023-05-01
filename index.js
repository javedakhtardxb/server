const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});

const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

const clients = {};
const users = {};
let editorContent = null;
let userActivity = [];



const sendMessage = (json) => {
  Object.keys(clients).map((client) => {
    clients[client].sendUTF(json);
  });
}

const typesDef = {
  USER_EVENT: "userevent",
  CONTENT_CHANGE: "contentchange"
}
console.log("Connected!!!")
wsServer.on('request', function(request) {
  var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

  var dummyStatus=[];
      dummyStatus.push({permitId:1,notificationText:"Your application is under review",statusText:"Construction Permit Created",statusCode:"Under Review"}) ;
      dummyStatus.push({permitId:2,notificationText:"Construction Permit#123 is Rejected",statusText:"Please call service desk",statusCode:"Rejected"}) ;
      dummyStatus.push({permitId:3,notificationText:"Construction Permit#123 is Approved",statusText:"Construction Permit Approved",statusCode:"Approved"}) ;
      dummyStatus.push({permitId:4,notificationText:"Construction Permit#123 is Pending",statusText:"Construction Permit Created",statusCode:"Pending"}) ;
      let c=0;
      setInterval(() => {
        sendMessage(JSON.stringify(dummyStatus[c]));
        if(c==3)
          c=0
        else
          c=c+1;
      }, 2000);

  connection.on('message', function(message) {
    if (message.type === 'utf8') {

      const dataFromClient = JSON.parse(message.utf8Data);
      var dummyStatus=[];
      dummyStatus.push({permitId:1,notificationText:"Your application is under review",statusText:"Construction Permit Created",statusCode:"Under Review"}) ;
      dummyStatus.push({permitId:2,notificationText:"Construction Permit#123 is Rejected",statusText:"Please call service desk",statusCode:"Rejected"}) ;
      dummyStatus.push({permitId:3,notificationText:"Construction Permit#123 is Approved",statusText:"Construction Permit Approved",statusCode:"Approved"}) ;
      dummyStatus.push({permitId:4,notificationText:"Construction Permit#123 is Pending",statusText:"Construction Permit Created",statusCode:"Pending"}) ;
      let c=0;
      setInterval(() => {
        console.log("sending dummy status");
        sendMessage(JSON.stringify(dummyStatus[c]));
        if(c==3)
          c=0
        else
          c=c+1;
      }, 2000);
    }
  });
  connection.on('close', function(connection) {
    console.log((new Date()) + " Peer " + userID + " disconnected.");
  });
});
