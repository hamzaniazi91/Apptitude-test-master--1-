

Template.scorecard.onRendered(function(){
  this.subscribe('allyells');
  Meteor.subscribe("userList");

$(document).ready(function() {
  $('.modal-trigger').leanModal();




    $('.collapsible').collapsible();
  });


});



Template.scorecard.load =function(){
 

};


Template.scorecard.onCreated(function(){


});


Template.scorecard.helpers({



 myCollection2: function () {
 	//console.log(Results.find());
 	//console.log(Meteor.user().emails[0].address);
 	console.log(Meteor.users.find().fetch());
        return Meteor.users.find();
    },

      userEmail: function(){
    return this.emails[0].address;
  },

  userScore : function(){

 var count = Results.find({ userId :  this.emails[0].address}).count();

console.log(count);
  	return count ;
  },

  correctScore : function(){

 var count = Results.find({ userId :  this.emails[0].address , score : 1}).count();


console.log(count);
  	return count ;
  },


 myCollection: function () {
 	console.log(Results.find().count());
        return Results;
    },




	'count1': function(){




	
		return Results.find({});
	},

});



Template.scorecard.events({



'click #click1':function(event)
{
console.log(Results.find().count());
}

});