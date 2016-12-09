


var _dep = new Deps.Dependency;


// var Sections = new Mongo.Collection('sections')
Template.section.onRendered(function(){
  this.subscribe('allyells');
  Session.set('skip',0);
  Session.set('limit',1);
  Session.set('score', 0);


});



Template.section.rendered = function () {

	var ddd =  this.findAll(':header');
  console.log("HAMZA KHAN NIAZI23");

  _dep.changed();

}


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


//var name = event.currentTarget.innerText;



console.log(this.section);
//console.log(Lock.find({section : this.section , user : Meteor.userId()}).fetch());

var count = Lock.find({section : this.section , user : Meteor.userId()}).count()


var element = document.getElementById(this._id);
console.log(element)
element.style.background = "grey";
console.log(count);
if(count >0 ){
	alert("Section Locked Time Up")
	//return true;
}
	else 
{

console.log(this.section);
	 Router.go('/questions/' + this.section);
		//return false;
	}





},


'click #gotoQuestionsUpdate' : function(event) {


var name = event.currentTarget.innerText;



console.log(this.section);

 Router.go('/questions_update/' + this.section);

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


	console.log(this);

	//var count = Results.find({userId  : Meteor.userId() , })

	return Sections.find();

},


LockSection : function(){



},


'data' : function(){


	_dep.depend();




console.log(this.section);
//console.log(Lock.find({section : this.section , user : Meteor.userId()}).fetch());

var count = Lock.find({section : this.section , user : Meteor.userId()}).count()



console.log(count);
if(count >0 ){
var element = document.getElementById(this.section + "+1");
console.log(element)
//element.setAttribute('style', 'display:inline !important');
element.setAttribute('style', "background:grey !important ;margin-bottom:0");
//element.setAttribute('style',"");
}
	else 
{

console.log(name);


	}
//return this.section;

	}


});