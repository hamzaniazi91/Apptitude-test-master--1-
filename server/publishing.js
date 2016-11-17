
// Meteor.publish('user', function (_id) {
//     return Meteor.users.find({_id: _id},
//         {
//             fields: { username: 1, _id: 1 }
//         });
// });



// Meteor.publish('audio', function (userId) {
//     return UserAudios.findOne({ userId: userId });
// });




Meteor.startup(function () {




if(Meteor.isServer) {

// in server/publish.js
Meteor.publish(null, function (){
	//console.log(Meteor.roles.find({}))
  return Meteor.roles.find({})
})

Meteor.publish("userStatus", function() {
  return Meteor.users.find({ "status.online": true });
});

Meteor.users.find({ "status.online": true }).observe({
  added: function(id) {
    // id just came online
    console.log("online")
  },
  removed: function(id) {
    // id just went offline
        console.log("offline")

  }
});



}

// if(Meteor.isServer) {
//  Meteor.publish('users', function () {
//     return Meteor.users.find();
// });

// Meteor.publish('questions', function () {
//     return Questions.find();
// });

// Meteor.publish('sections', function (userId) {
//     return Sections.findOne({ userId: userId });
// });


// Meteor.publish('results', function () {
//     return Results.find();
// });
// }

// if (Meteor.isClient) {
// //    Meteor.subscribe('users');
// // Meteor.subscribe('questions');
// // Meteor.subscribe('sections');
// // Meteor.subscribe('results');
// };

// // Meteor.setTimeout(function() {
// //    var myLog = PlayersCollection.find().fetch();
// //    console.log(myLog);
// //    }, 1000);


});