
var _dep = new Deps.Dependency;


Template.questions_update.onRendered(function(){
  this.subscribe('allyells');
  
console.log("HAMZA KHAN NIAZI2");

// this.autorun(function() {
//     if (Results.findOne()) {
//       console.log(Results.findOne())
//     }
//   });

    //Meteor.subscribe('questions');
  Session.set('skip' , 0);
  Session.set('limit',1);
  Session.set('score', 0);



});





Template.questions_update.rendered = function () {

	var ddd =  this.findAll(':header');
  console.log("HAMZA KHAN NIAZI23");

  _dep.changed();

}

Template.questions_update.userId = function () {
    return Meteor.userId();
}


Template.questions_update.helpers({

		'count1': function(){


var count = Session.get('skip') + 1;
	console.log(count);

		return count;
		//return Questions.find({limit:Session.get('limit'),skip:Session.get('skip')});
	},


	  imageFile: function () {

    // console.log(Images.findOne({_id : Session.get("id")}));
     console.log(this);


    return Images.findOne({_id : this.imgId });
  },
  


	'display': function(){

		console.log(Router.current().params);

		var _sec=Router.current().params._name

		var arr = []
		while(arr.length < 135){
  		var randomnumber=Math.ceil(Math.random()*135)
  		var found=false;
 		for(var i=0;i<arr.length;i++){
			if(arr[i]==randomnumber){found=true;
				break}
 		 }
 		 if(!found)arr[arr.length]=randomnumber;
		}

		// var a = Questions.find({ section:_sec,no:}).count();
		// var arr2=[];


		//var length = Questions.find(); 

		//console.log(Questions.find({ section:_sec,no: {$in:arr}}).count());
		//console.log(Sections.find());

		//console.log(Questions.find({ section:_sec,no: {$in:arr}} ,{limit:Session.get('limit'),skip:Session.get('skip')}).count())
		var count =  Questions.find({ section:_sec} ,{limit:Session.get('limit'),skip:Session.get('skip')}).count()

		if(count === 0 )
		{
			Router.go('/section');
			console.log("go back")

		}
else{
console.log("go ")

console.log(this);
		
		return Questions.find({ section:_sec} ,{sort: {_random_sample: 1}}).fetch();
 

}
		
		//return Questions.find({limit:Session.get('limit'),skip:Session.get('skip')});
	},


	'userResults' : function()
	{

		
_dep.depend();

 	
        Tracker.afterFlush(function(){
            console.log("From afterFlush:", Results.find().count())  //--->Line2
        });
  


var currentQ = Results.find({section :  this.section , userId : Meteor.user().emails[0].address  , Question: this.question  }).fetch()
			
			console.log(this.section + "" + Meteor.user().emails[0].address  +"" + this.question );
console.log(currentQ[0]);
			if(currentQ[0] === undefined  ){
	console.log("not answered")

}
		else
{
			//console.log(currentQ);
		console.log(this.section + " " + currentQ[0].SelectedAnswer + " " + this._id);

var sel = currentQ[0].SelectedAnswer + 1
console.log(this._id)

var element = document.getElementById(this._id + "+"+sel);
console.log(this._id + "+"+sel)
console.log(element)
console.log(Template.instance())

    element.checked = true;
// event.target.choice.value = 3;

					}
	},






	'isQuestionCountGT1':function(){
		return Questions.find().count()>1;
	}
});


Template.questions_update.events({



	'click #goback': function(event){
 
Router.go('/section');


	},


	'click #submit1': function(event){
		event.preventDefault();
		var answer=event.target.choice.value;

console.log("ASDAS" + answer);
		console.log(answer);
		// if(answer==this.answer){
		// 	console.log("correct!");

		// 	Materialize.toast('Correct! :-)', 2000);
		// 	var score=Session.get('score');
		// 	Session.set('score', score+1);

		// }

		// else{
		// 	console.log("wrong");

		// 	Materialize.toast('Wrong! :-(', 2000);
		// }

		// var limit = Session.get('limit');
		// var skip = Session.get('skip');
  // 		Session.set('limit',1+limit);
  // 		Session.set('skip',1+skip);
		
	},


	'submit form': function(event){
		event.preventDefault();
		var answer1=event.target.choice.value;
  var answer = parseInt(answer1, 10);;
				var id=event.target.choice.id

console.log( "Question : "  + this.question + " Selected Answer : "  + answer  + " Actual Answer : "  + this.answer  +" "+ this.section);
console.log("Logged In User : " + Meteor.user().emails[0].address)
		console.log(answer);
		// if(answer===this.answer){
		// 	console.log("correct!");

		// 	Materialize.toast('Correct! :-)', 2000);
		// 	var score=Session.get('score');
		// 	Session.set('score', score+1);
		// 			var limit = Session.get('limit');
		// var skip = Session.get('skip');
  // 		//Session.set('limit',1+limit);
  // 		Session.set('skip',1+skip);

		// }

				 if (answer === ""  || isNaN(answer)){
		Materialize.toast('Please select an option to proceed', 2000);
		}

		// else{
		// 	console.log("wrong");

		// 	Materialize.toast('Wrong! :-(', 2000);
		// 				var limit = Session.get('limit');
		// var skip = Session.get('skip');
  // 		//Session.set('limit',1+limit);
  // 		Session.set('skip',1+skip);
		// }

else{

	var count = Results.find({userId: Meteor.user().emails[0].address, Question: this.question}).count()
// if (count === 0)
//     {
    	var thisScore;
    	if(answer===this.answer){
   thisScore = 1;
    	}

    	else{
    		thisScore=0;
    	}

    	console.log(thisScore + " " + this._id);


var ID = Results.findOne({userId: Meteor.user().emails[0].address, Question: this.question});


console.log(ID)

	Results.update({_id :ID._id} ,{ $set:{ SelectedAnswer:answer , score : thisScore, updatedAt : new Date()}}

	, function( error, result) { 
    if ( error ) console.log ( error ); //info about what went wrong
    if ( result ) console.log ( result ); Materialize.toast('Answer Updated', 2000); //the _id of new object if successful
  }
  );
console.log("asdsad")
	var limit = Session.get('limit');
		var skip = Session.get('skip');
  		//Session.set('limit',1+limit);
  		Session.set('skip',1+skip);
// }

// else{
// 	Materialize.toast('Already Answered by this user', 2000);
// }
			
}
		



		
	},

	'click #loadnext':function(event,template){
		var limit = Session.get('limit');
		var skip = Session.get('skip');
  		//Session.set('limit',1+limit);


  		
  		Session.set('skip',1+skip);
	},

	'click #skip':function(event,template){
		console.log("cookie");

				var limit = Session.get('limit');
		var skip = Session.get('skip');
  		//Session.set('limit',1+limit);


  		
  		Session.set('skip',1+skip);
	},

	'click .endQuiz':function(event){}



});

