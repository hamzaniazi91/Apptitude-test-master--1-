


Template.questions.onRendered(function(){
  this.subscribe('allyells');
  



    //Meteor.subscribe('questions');
  Session.set('skip' , 0);
  Session.set('limit',1);
  Session.set('score', 0);

//Session.set("sec2" , Router.current().params._name)



Session.set("session" , Router.current().params._name)

});






var countdown ;


Template.foo.onCreated(function(){


Session.get("session");
//var _sec = Router.current().params._name
// dict = new ReactiveDict('myDict2');
// dict.set("sec", _sec);



countdown = new ReactiveCountdown(50);
countdown.start(function() {


    // do something when this is completed

console.log(Session.get("session"));

Lock.insert({ section: Session.get("session") , user : Meteor.userId() , lock : true ,createdAt : new Date()} );
alert("Time Is up")
Router.go("/section")
})
});




Template.foo.helpers({

    getCountdown: function() {
    	console.log("started")
        return countdown.get();
    }

})



Template.intro.userId = function () {
    return Meteor.userId();
}



Template.intro.helpers({
	displayScore: function(){
		var score=Session.get('score');
		return score;
	},
	

});


// Template.questions.display = function () {
//     console.log("Template.home.userList");

//      return Questions.find({ section:_sec,no: {$in:arr}}).fetch();
// };



Template.score.helpers({
// 		'count1': function(){



// var _sec=Router.current().params._name

// var count = Questions.find({ section:_sec,no: {$in:arr}} ,{limit:Session.get('limit'),skip:Session.get('skip')}).find()
// 	console.log(count);
// 		return count;
// 		//return Questions.find({limit:Session.get('limit'),skip:Session.get('skip')});
// 	},

});


Template.questions.userId = function () {
    return Meteor.userId();
}


Template.questions.helpers({

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


var counthamza = Questions.find({ section:_sec}).count();
console.log(counthamza);

		var arr = []
		while(arr.length < counthamza){
  		var randomnumber=Math.floor((Math.random() * counthamza) + 1)
  		var found=false;
 		for(var i=0;i<arr.length;i++){
			if(arr[i]==randomnumber){found=true;console.log()
				break}
 		 }
 		 if(!found)arr[arr.length]=randomnumber;
		}

		console.log(Math.floor((Math.random() * 15) + 1));

		console.log(arr);

		// var a = Questions.find({ section:_sec,no:}).count();
		// var arr2=[];


		//var length = Questions.find(); 

		//console.log(Questions.find({ section:_sec,no: {$in:arr}}).count());
		//console.log(Sections.find());

		//console.log(Questions.find({ section:_sec,no: {$in:arr}} ,{limit:Session.get('limit'),skip:Session.get('skip')}).count())
		var count =  Questions.find({ section:_sec,no: {$in:arr}} ,{limit:Session.get('limit'),skip:Session.get('skip')}).count()

		if(count === 0 )
		{
			Router.go('/section');
			console.log("go back")

		}
else{
console.log("go ")

// sort: {no: 1},
		return Questions.find({ section:_sec,no: {$in:arr}} ,{limit:Session.get('limit'),skip:Session.get('skip')}).fetch();
 

}
		
		//return Questions.find({limit:Session.get('limit'),skip:Session.get('skip')});
	},





	'isQuestionCountGT1':function(){
		return Questions.find().count()>1;
	}
});


Template.questions.events({



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
if (count === 0)
    {
    	var thisScore;
    	if(answer===this.answer){
   thisScore = 1;
    	}

    	else{
    		thisScore=0;
    	}
	Results.insert({section :  this.section , userId : Meteor.user().emails[0].address  , Question: this.question , SelectedAnswer:answer , ActualAnswer: this.answer , score : thisScore, createdAt : new Date()}

	, function( error, result) { 
    if ( error ) console.log ( error ); //info about what went wrong
    if ( result ) console.log ( result ); //the _id of new object if successful
  }
  );

	var limit = Session.get('limit');
		var skip = Session.get('skip');
  		//Session.set('limit',1+limit);
  		Session.set('skip',1+skip);
}

else{
	Materialize.toast('Already Answered by this user', 2000);
}
			
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

