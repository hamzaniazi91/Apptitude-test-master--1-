//

Template.validateDesc.onRendered(function(){
  this.subscribe('allyells');
  Meteor.subscribe("userList");


});



Template.validateDesc.load =function(){
 

};


Template.validateDesc.onCreated(function(){


});


Template.validateDesc.helpers({


	'display': function(){

		var count =  Questions.find({ descriptive: 1}).count()

		if(count === 0 )
		{
			Router.go('/admin');
			console.log("go back")

		}
else{
console.log("go ")
		return Questions.find({ descriptive: 1}).fetch();
 

}
		
		//return Questions.find({limit:Session.get('limit'),skip:Session.get('skip')});
	},






	'count1': function(){




	
		return Results.find({});
	},

});



Template.validateDesc.events({


})