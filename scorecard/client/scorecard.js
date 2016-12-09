
function sectionCursor(){
  return Meteor.users.find();
}


function questionCursor(section1){
  //console.log(Template.instance().pagination.getPage());

  return Template.instance().pagination.getPage();
}


function userCursor(user,sect){
 // console.log(Meteor.users.find({section:section1}, {no: {question: 1}}));

  //Results.find({ userId :  user}).count()

  return Results.find({ userId :  user , section : sect }).count();


}

function userCursor2(user,sect,score){
 // console.log(Meteor.users.find({section:section1}, {no: {question: 1}}));

  //Results.find({ userId :  user}).count()

  return Results.find({ userId :  user , section : sect ,score : score}).count();


}

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
   $(".collapsible").collapsible({
        accordion: false
      });

console.log(Session.get('changedName'));
 this.pagination = new Meteor.Pagination(Meteor.users, {
        
//          filters : {
            
//             "emails.address" : "admin@mbl.int",
           
       
// },

// filters : {
            
//             "emails.address" : Session.get(''),
           
       
// },
    

    //    profile : {
    //     name : "Admin User"
    // },
    //     },


        sort: {
            createdAt: 1
        },
        perPage:5,
          debug:true,

        
    });
  //console.log(Meteor.users)
 // console.log("asd");


 console.log(Template.instance().pagination)
}


Template.scorecard.onCreated(function(){


 setTimeout(function() {//console.log(Meteor.userId() + Meteor.users.findOne());
//console.log(Roles.userIsInRole(Meteor.user(), 'admin' ));
//console.log( Roles.userIsInRole(Meteor.user(), ['admin'] , 'default-group') )
///Roles.addUsersToRoles(joesUserId, ['manage-team'], 'manchester-united.com')
//Roles.addUsersToRoles('oWSLeP7y4EgkrJ7ii', ['manage-team'], 'manchester-united.com')


  }, 1000);


  //console.log(Meteor.userId() + Meteor.users.findOne())
//console.log(Roles.userIsInRole(Meteor.userId(), 'admin' ));

   this.autorun(function(){
    // registers a dependency on the number of documents returned by the cursor
    var sectionCursorCount = sectionCursor().count();
    questionCursor

    var questionCursorCount = questionCursor();
    // this will log 0 at first, then after the jobs publication is ready
    // it will log the total number of documents published
    //console.log(questionCursorCount);
    //console.log(sectionCursorCount);

    // initialize the plugin only when Blaze is done with DOM manipulation
    Tracker.afterFlush(function(){
      this.$(".collapsible").collapsible({
        accordion: false
      });
    
    }.bind(this));
  }.bind(this));

  

  //setTimeout(function() {console.log(Meteor.users.find().count());}, 1000);

// var country = document.getElementById("country");
// country.options[country.options.selectedIndex].selected = true;

});



Template.scorecard.helpers({

  templatePagination: function () {

    //console.log(Template.instance().pagination)
    //console.log(Template.instance().pagination)
        return Template.instance().pagination;
    },
  documents: function () {

    //console.log( Template.instance().pagination.getPage());

 
    return Template.instance().pagination.getPage();
  },
  // optional helper used to return a callback that should be executed before changing the page
    clickEvent: function() {
        return function(e, templateInstance, clickedPage) {
            e.preventDefault();
            console.log('Changing page from ', templateInstance.data.pagination.currentPage(), ' to ', clickedPage);
            console.log('Changing page from ', templateInstance.data.pagination.filters(), ' to ', clickedPage);
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
    { key: 'score', label: 'Score' },
    { 
      key: 'createdAt', label: 'Date',
    fn: function (value, object, key) 
    { 
      var date = new Date(value);
      date1 =   date.getHours() + ":"  + date.getMinutes()   + " " +  (date.getMonth() + 1) + "/"+ date.getDate() +"/"+date.getFullYear() 
      //console.log(date1)
      return date1;
       }
     }

]
        };
    },

 myCollection2: function () {
 	//console.log(Results.find());
 	//console.log(Meteor.user().emails[0].address);
 	//console.log(Meteor.users.find().fetch());
        return Meteor.users.find();
    },


     sections: function () {
  //console.log(Results.find());
  //console.log(Meteor.user().emails[0].address);
  //console.log(Sections.find());
//console.log(this.section);
        return Sections.find();
    },

      userEmail: function(){
    return this.emails[0].address;
  },
    userCnic: function(){
    return this.profile.cnic;
  },

  userScore : function(){

    console.log(Template.parentData().emails[0].address);

 //var count = Results.find({ userId :  this.emails[0].address}).count();

//console.log(count);
//console.log(this.emails[0].address);
  	return userCursor(Template.parentData().emails[0].address , this.section) ;
  },

  QuestionsCount : function (){

    console.log(Questions.find({section : this.section}).count());

return Questions.find({section : this.section}).count();
  },


  ResultCacl : function (){

    console.log(Template.instance());

    var correct = userCursor2(Template.parentData().emails[0].address , this.section, 1);
     var totalQuestion = Questions.find({section : this.section}).count();
if(totalQuestion !== 0 )
     var resultDisplay =  Number((correct/totalQuestion) * 100).toFixed(1);
   else
      return "Not Available"
     return resultDisplay ;
  },


  FinalResult : function(){
 var correct = userCursor2(Template.parentData().emails[0].address , this.section, 1);
     var totalQuestion = Questions.find({section : this.section}).count();

     var resultDisplay =  Number((correct/totalQuestion) * 100).toFixed(1);

    var attempted =  userCursor(Template.parentData().emails[0].address , this.section) ;

 if(attempted <  totalQuestion){
        return "In Progress"
      }

     else if(resultDisplay >= "50"){
      //document.getElementById("fr").style.color="blue";
      return "Passed";
    }
      else{
       //document.getElementById("fr").style.color="red";
        return "Failed"
      }

     
      
     
 


},


  correctScore : function(){
//console.log(this.emails[0].address + "ASDSADSAD");
 //var count = Results.find({ userId :  this.emails[0].address , score : 1}).count();


//console.log(count);
  //	return count ;
  return userCursor2(Template.parentData().emails[0].address , this.section, 1) ;
  },


 myCollection: function () {
 	//console.log(Results.find().count());
        return Results.find();
    },




	'count1': function(){




	
		return Results.find({});
	},

});



Template.scorecard.events({

'input  #first_name' : function(event){

  console.log(Template.instance().pagination)

// "{"emails.address":"admin@mbl.int"}"
// "{"emails.address":"admin@mbl.int"}"

 /// Template.instance().pagination.settings.keys.filters =  '{"emails.address":"hamzaniazi91@gmail.com"}'

 Template.instance().pagination.filters({
            
            "emails.address" : {$regex :event.target.value,},

      });
  // Template.instance().pagination
        console.log(event.target.value)
        Session.set("changedName" , event.target.value)
      },


'input  #cnic' : function(event){

  console.log(Template.instance().pagination)
 Template.instance().pagination.filters({
            
            "profile.cnic" : {$regex :event.target.value,}

      });
     


  // Template.instance().pagination
        console.log(event.target.value)
        Session.set("changedName" , event.target.value)
      },


'click #click1':function(event)
{
console.log(Results.find().count());
}

});