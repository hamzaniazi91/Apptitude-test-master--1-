



// var Sections = new Mongo.Collection('sections')
Template.section.onRendered(function(){
  this.subscribe('allyells');
  Session.set('skip',0);
  Session.set('limit',1);
  Session.set('score', 0);

});


Template.section.userId = function () {
    return Meteor.userId();
}



Template.intro.helpers({
	displayScore: function(){
		var score=Session.get('score');
		return score;
	},
	

});

Template.section.events({

'click #gotoQuestions' : function(event) {


var name = event.currentTarget.innerText;



console.log(name);

 Router.go('/questions/' + name);

}


})

Template.section.helpers({

	'param' : function(){

		Router.current().params;
		console.log(Router.current().params);

		return Router.current().params;

	},
	displayScore: function(){
		var score=Session.get('score');
		return score;
	},
	'displaySections' : function(){

	return Sections.find();

}
});