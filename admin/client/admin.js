
Meteor.subscribe('userStatus')


this.Videos = new FilesCollection({collectionName: 'Videos'});

function sectionCursor(){
  return Sections.find();
}


function questionCursor2(){
  console.log(Questions.find({}));

  return Questions.find({});


}



function questionCursor(section1){
	console.log(Questions.find({section:section1}, {no: {question: 1}}));

  return Questions.find({section:section1}, {sort: {no: 1}});


}

Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  }
});

Template.uploadForm.events({
  'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      var upload = Images.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
          alert('File "' + fileObj.name + '" successfully uploaded');
          console.log(fileObj);
          Session.set("id" , fileObj._id)
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});


Template.file.helpers({
  imageFile: function () {

    console.log(Images.findOne({_id : Session.get("id")}));
    console.log(Images.findOne());
    return Images.findOne({_id : Session.get("id") });
  }
  ,
  videoFile: function () {
    return Videos.findOne();
  }
});



Template.questions.onRendered(function(){
  this.subscribe('allyells');
  Session.set('skip',0);
  Session.set('limit',1);
  Session.set('score', 0);

  // $(document).ready(function() {
  // $('.modal-trigger').leanModal();




  //   $('.collapsible').collapsible();
  // });




        

});



Template.admin.rendered = function(){
  //      $(document).ready(function(){
  //   $('.collapsible').collapsible();
  //     $('.dropdown-button').dropdown('open');
  // });

 // this.autorun(function() 
 //  {
 //   var optionsCursor = Questions.find().count(); 
 //   console.log(optionsCursor)
 //   if(optionsCursor > 0)
 //    { 
 //            $('.dropdown-button').dropdown('open');
 //      $(".collapsible").collapsible({
 //        accordion: false
 //      });
 //       }

 //        }); 





 }



Template.admin.load =function(){
  

console.log(document.getElementById('h1').value());

};


Template.admin.onCreated(function(){


         

//  setTimeout(function() {console.log(Meteor.userId() + Meteor.users.findOne());
// console.log(Roles.userIsInRole(Meteor.user(), 'admin' ));
// console.log( Roles.userIsInRole(Meteor.user(), ['admin'] , 'default-group') )
// ///Roles.addUsersToRoles(joesUserId, ['manage-team'], 'manchester-united.com')
// //Roles.addUsersToRoles('oWSLeP7y4EgkrJ7ii', ['manage-team'], 'manchester-united.com')


//   }, 1000);


//   console.log(Meteor.userId() + Meteor.users.findOne())
// console.log(Roles.userIsInRole(Meteor.userId(), 'admin' ));

	 this.autorun(function(){
    // registers a dependency on the number of documents returned by the cursor
    var sectionCursorCount = sectionCursor().count();
    var questionCursorCount = questionCursor2().count()
    // this will log 0 at first, then after the jobs publication is ready
    // it will log the total number of documents published
    console.log(sectionCursorCount);
     console.log(questionCursorCount);
    // initialize the plugin only when Blaze is done with DOM manipulation
    Tracker.afterFlush(function(){

      console.log("flush Ready")
        $('.dropdown-button').dropdown('open');
      $(".collapsible").collapsible({
        accordion: false
      });
    
    }.bind(this));
  }.bind(this));

  

 // setTimeout(function() {console.log(Questions.find().count());}, 1000);

// var country = document.getElementById("country");
// country.options[country.options.selectedIndex].selected = true;

});


// Template.admin.usersOnline = function() {
//   console.log(Meteor.users.find({ "status.online": true }))
//   return Meteor.users.find({ "status.online": true }).fetch()
// };



Template.admin.helpers({


   imageFile: function () {

    // console.log(Images.findOne({_id : Session.get("id")}));
     console.log(this);


    return Images.findOne({_id : this.imgId });
  },
  

  usersOnline:function(){

    console.log(Meteor.users.find({ "status.online": true }));
    return Meteor.users.find({ "status.online": true })
  },
  usersOnlineCount:function(){
   //event a count of users online too.
   return Meteor.users.find({ "status.online": true }).count();
  },


   userEmail: function(){
    return this.emails[0].address;
  },


	'display': sectionCursor,

	//'questions': questionCursor("Section I – Conceptual"),

	'questions': function(){



console.log(this.section);
	
		return questionCursor(this.section);
	},


});

Template.admin.events({


    "click .btnReadCsv": function(event, template) {
      Papa.parse(template.find('#csv-file').files[0], {
          header: true,

          complete: function(results) {
               _.each(results.data, function(csvData) {
                console.log(csvData)
                var arrayOptions = []
                   console.log(csvData.section + ' , ' + csvData.question + ' , ' + csvData.option0 + ' , ' + csvData.option1 + ' , ' + csvData.option2 + ' , ' + csvData.option3 + ' , ' + csvData.answer
);               

                   arrayOptions.push(csvData.option0)
                   arrayOptions.push(csvData.option1)
                   arrayOptions.push(csvData.option2)
                   arrayOptions.push(csvData.option3)

                   console.log(arrayOptions)

                   var Qnumber= Questions.find({section : csvData.section}).count() + 1 ;

                   Questions.insert({no : Qnumber , options : arrayOptions , section: csvData.section, question: csvData.question , answer : parseInt(csvData.answer) , createdAt : new Date()   })


               });
          },
          skipEmptyLines: true
      });
   } ,


  'click #delete0': function (event) {
    event.preventDefault();
    var objToDelete = this;
    var Section = Sections.findOne({_id: objToDelete._id})
    var SectionName = Section.section;
    var QuestionsToDelete = Questions.find({section : SectionName}).fetch()
    console.log(SectionName)
    console.log(objToDelete);

    var qs = Questions.find().fetch();
 console.log( qs)
  _.each(QuestionsToDelete, function(question) {
    console.log( question._id)
    console.log(question._id)
      Questions.remove({ _id : question._id });
    });


    // checks if the actual clicked element has the class `deletebtn `
    if (event.target.id == "delete0") {
     Sections.remove(objToDelete._id)

    }
  },

  'click #delete': function (event) {
    event.preventDefault();
    var objToDelete = this;
    console.log(objToDelete);
    // checks if the actual clicked element has the class `deletebtn `
    if (event.target.id == "delete") {
     Questions.remove(objToDelete._id)
    }
  },


	'click #section1' : function(event){


		var SelectedValue 

//console.log(document.getElementById("section1").value);
///console.log(document.getElementById("section1").selected);

console.log (event.currentTarget.innerText)



 document.getElementById("sc").value =  event.currentTarget.innerText;

 Materialize.updateTextFields();

		//return SelectedValue;

	},

	'click #addSection': function(event){

		var sec = document.getElementById('section').value;
    var timer2 = document.getElementById('timer').value;
    var limit = document.getElementById('limit').value;

    var position2;


var select = document.getElementById("position2");
var position2 = select.options[select.selectedIndex].value;


    console.log( answer);

$('#position2').change(function(){
  console.log(this.value);
   var id = $(this).find(':selected')[0].id;
   // alert("chjabsd" + id)
  // console.log($('#position2').val(id));
position2 = this.value;
})


    d = moment.duration({s: timer2});
console.log( moment().startOf('day').add(d).format('mm:ss') )

var timer =   moment().startOf('day').add(d).format('mm:ss') 


		console.log(sec);
if(!sec || !timer || !limit){

Materialize.toast('Enter Section name , timer and limit', 2000);
}
else{
    Sections.insert({role : position2 , section : sec , time : timer2 ,timeInMinutes : timer , limit : limit, createdAt : new Date()});
}
	

	},

  'mouseenter  .collapsible' : function(event){

console.log("collapsible");

      $('.dropdown-button').dropdown('open');
      $(".collapsible").collapsible({
        accordion: false
      });



  },
	


'submit form' : function(event){
	// inserting questions
	var sec = event.currentTarget.sc.value;
var que = event.currentTarget.question.value;
var option1 = event.currentTarget.option1.value;
var option2 = event.currentTarget.option2.value;
var option3 = event.currentTarget.option3.value;
var option4 = event.currentTarget.option4.value;
var answer = event.currentTarget.answer.value;

if(answer===option1){
	var correctans = 0;
}
else if(answer===option2){  
	var correctans = 1;
}
else if(answer===option3){
	var correctans = 2;
}else if(answer===option4){
	var correctans = 3;
}else{
	Materialize.toast('Failed! None of the options match the answer!!',3000);
	return false;
}

//console.log(Questions.find().count());

var Qnumber= Questions.find({section : sec}).count() + 1 ;

var DuplicateQues = Questions.find({question:que}).count()
console.log(DuplicateQues);



if( DuplicateQues >=  1)
{
	Materialize.toast('Existing Question already there',3000);
	return false;

}

else
{
Questions.insert({_random_sample : Math.random() ,imgId : Session.get("id") ,section : sec ,no: Qnumber ,question:que,options:[option1,option2,option3,option4],answer:correctans , createdAt : new Date()});
return true;
}
}
});