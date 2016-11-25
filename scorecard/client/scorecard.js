

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

Template.scorecard.created = function () {
  this.pagination = new Meteor.Pagination(Meteor.users);
  console.log(Meteor.users)
  console.log("asd");
}


Template.scorecard.onCreated(function(){


});


Template.scorecard.helpers({

  templatePagination: function () {
    console.log(Template.instance().pagination)
        return Template.instance().pagination;
    },
  documents: function () {
    return Template.instance().pagination.getPage();
  },
  // optional helper used to return a callback that should be executed before changing the page
    clickEvent: function() {
        return function(e, templateInstance, clickedPage) {
            e.preventDefault();
            console.log('Changing page from ', templateInstance.data.pagination.currentPage(), ' to ', clickedPage);
        };
    },

 settings: function () {
        return {
            collection: Results,
            rowsPerPage: 10,
            showFilter: true,
            fields: 
            [
    { key: 'userId', label: 'Name' },
    { key: 'Question', label: 'Question' },
    { key: 'score', label: 'score' }
]
        };
    },

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