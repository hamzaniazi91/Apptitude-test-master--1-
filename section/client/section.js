


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
//console.log(Sections.find( { $or: [  { role: "All" } , { role: Meteor.user().profile.position  } ] },{sort: { sort: 1 }} ));
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
	alert("Section Locked , Time Up")
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
//console.log(Lock.find({section : this.section , user : Meteor.userId()}).fetch());

var count = Lock.find({section : this.section , user : Meteor.userId()}).count()


var element = document.getElementById(this._id);
console.log(element)
element.style.background = "grey";
console.log(count);
if(count >0 ){
	alert("Section Locked , Time Up")
	//return true;
}
	else 
{

console.log(this.section);
	 Router.go('/questions_update/' + this.section);
		//return false;
	}

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

		user: function(){
		console.log(Meteor.user())
		return Meteor.user();
	},
	'displaySections' : function(){


	console.log(this);

	//var count = Results.find({userId  : Meteor.userId() , })

	// return Sections.find({},{sort: { sort: 1 }} )

console.log("role = " + Meteor.user().profile.position)
var Tracker =  Sections.find( { $or: [  { role: "All" } , { role: Meteor.user().profile.position  } ] },{sort: { sort: 1 }} )

_dep.changed();
	return Tracker



},


Minutes : function(){


var Section = Sections.find({ $or: [  { role: "All" } , { role: Meteor.user().profile.position  } ] }).fetch(); 
var Time  = 0;
console.log(Section)
  _.each(Section, function(s) {
    console.log( s.time)
    Time = Number(Time)  + Number(s.time);

   	//console.log(Time)

    });

console.log(Time );

console.log(moment()
    .seconds("3000")
    .format('mm:ss'));

d = moment.duration({s: Time});



console.log(d)
console.log( moment.utc(d._milliseconds).format('HH:mm:ss') )

var Finalized =   moment.utc(d._milliseconds).format('HH:mm:ss') 

return Finalized;

},

LockSection : function(){



},


'data' : function(){


	_dep.depend();


console.log(_dep)

console.log(this.section);
//console.log(Lock.find({section : this.section , user : Meteor.userId()}).fetch());

var count = Lock.find({section : this.section , user : Meteor.userId()}).count()

	 Tracker.autorun(function(){
    
var Tracker2 =  Sections.find( { $or: [  { role: "All" } , { role: Meteor.user().profile.position  } ] },{sort: { sort: 1 }} )
console.log(Tracker2)
    Tracker.afterFlush(function(){

      console.log("flush Ready")


console.log(count);
if(count >0 ){
var element = document.getElementById(this.section + "+1");
console.log(element)
//element.setAttribute('style', 'display:inline !important');
element.setAttribute('style', "background:grey !important ;margin-bottom:0");


// var element = document.getElementById(this.section + "+2");
// console.log(element)
// //element.setAttribute('style', 'display:inline !important');
// element.setAttribute('style', "background:grey !important ;margin-bottom:0");
// //element.setAttribute('style',"");
}
	else 
{

console.log(name);


	}
//return this.section;

    
    }.bind(this));
  }.bind(this));



	}


});