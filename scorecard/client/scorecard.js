
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
console.log(  user +" " + sect +" " + score)
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
        return Sections.find( { $or: [  { role: "All" } , { role: this.profile.position  } ] },{sort: { sort: 1 }} )
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

    var TotalLimitedQuestions  = Sections.findOne({section : this.section});

return TotalLimitedQuestions.limit;
  },

  Time : function(){

     console.log("Time");



     var Locked  = Lock.findOne({section : this.section , user : Template.parentData()._id})


     console.log(Locked.timeCompletedinMins)
     return Locked.timeCompletedinMins;

  },



  ResultCacl : function (){

    console.log(Template.instance());

    var correct = userCursor2(Template.parentData().emails[0].address , this.section, 1);
     var totalQuestion = Sections.findOne({section : this.section});
if(totalQuestion.limit !== 0 )
     var resultDisplay =  Number((correct/totalQuestion.limit) * 100).toFixed(0);
   else
      return "Not Available"
     return resultDisplay ;
  },


  FinalResult : function(){
 var correct = userCursor2(Template.parentData().emails[0].address , this.section, 1);

     var totalQuestion = Sections.findOne({section : this.section});

     var resultDisplay =  Number((correct/totalQuestion.limit) * 100).toFixed(0);

    var attempted =  userCursor(Template.parentData().emails[0].address , this.section) ;

 if(attempted <  totalQuestion.limit){
        return "Incomplete"
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

  console.log(Template.parentData().emails[0].address + " " + this.section +" "+ 1);

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
},


'click #export':function(event)
{
  event.preventDefault();
console.log(this);

var email = this.emails[0].address;
var userid = this._id

var name=  [];
var Attempted=  [];
var Correct=  [];
var Outof=  [];
var Score=  [];
var Result = [];

var AttemptedTotal = [];
var CorrectTotal  = [];
var OutofTotal  = [];
var ScoreTotal  = [];
var ResultTotal  = [];
var TimeLocked = [];

 

var sections = Sections.find( { $or: [  { role: "All" } , { role: this.profile.position  } ] },{sort: { sort: 1 }} ).map(function(i){

 
var Locked  = Lock.findOne({section : i.section , user : userid})

     console.log(Locked + " " + i.section + " " + userid)
     // return Locked.timeCompletedinMins;


  
   var correct = userCursor2(email , i.section , 1)
     var totalQuestion = Sections.findOne({section : i.section});
     var resultDisplay
if(totalQuestion !== 0 )
      resultDisplay =  Number((correct/totalQuestion.limit) * 100).toFixed(0);
   else
      resultDisplay = "Not Available"

     console.log(i.section + email + "      " + userCursor(email , i.section ) + " " + userCursor2(email , i.section , 1) + " " + Questions.find({section : i.section}).count() + " " + resultDisplay);



var Result2 = i.section  + "," + userCursor(email , i.section ) + "," + userCursor2(email , i.section , 1) + "," + Questions.find({section : i.section}).count() + "," + resultDisplay + ",Hamza";





    var attempted =   userCursor(email , i.section );

var FinalResult;

 if(attempted <  totalQuestion.limit){

        FinalResult = "Incomplete"
        //return "In Progress"
      }

     else if(resultDisplay >= "50"){
      //document.getElementById("fr").style.color="blue";
      FinalResult = "Passed"
      //return "Passed";
    }
      else{
       //document.getElementById("fr").style.color="red";

       FinalResult = "Failed"
        //return "Failed"
      }



    
  name.push({text : i.section })
  Attempted.push({text : userCursor(email , i.section)  + " "}) 
  Correct.push({text : userCursor2(email , i.section , 1)   + " " })   
  Outof.push({text : totalQuestion.limit + " "})     
  Score.push({text : resultDisplay + "%" })     
  Result.push({text : FinalResult })   
 TimeLocked.push({text  : Locked.timeCompletedinMins + ""}) 
    
    AttemptedTotal = Number(AttemptedTotal) + userCursor(email , i.section);
    CorrectTotal = Number(CorrectTotal) + userCursor2(email , i.section , 1);
     OutofTotal = Number(OutofTotal) + Number(totalQuestion.limit);


   
console.log("Attempted" + AttemptedTotal);

      return Result;
    });


//console.log(stack);

console.log(name);
console.log(Attempted);
console.log(Correct);
console.log(Outof);
console.log(Score);


console.log(AttemptedTotal);
console.log(CorrectTotal);
console.log(OutofTotal);
console.log(TimeLocked);

AttemptedTotal = AttemptedTotal.toString();
CorrectTotal = CorrectTotal.toString();
OutofTotal = OutofTotal.toString();

  FinalPercent  = Number((CorrectTotal/OutofTotal) * 100).toFixed(0);

  console.log(FinalPercent);

  var Conclude;

if(FinalPercent > 50)
  Conclude= "Passed"
else
  Conclude="Failed"


console.log(this);


  // var docDefinition = { content: "UserEmail =" + this.emails[0].address  + " "  + userCursor(this.emails[0].address , this.section)  };
var docDefinition = { 
      // pageSize: 'A4',
   pageOrientation: 'landscape',



      
      // Content with styles 
      content: [
        // { text: this.emails[0].address, style: 'headline' },

        //  { text: 'Phone: ' + this.profile.number, style: ['listItem', 'listLabel']  },
        //  { text: 'Cnic:'  + this.profile.cnic, style: ['listItem', 'listLabel'] },
        //   { text: 'Position:'  + this.profile.position, style: ['listItem', 'listLabel'] },
    
          { text: "Online Test Report", style: 'headline' ,alignment: 'center' },
              { text: "Profile of '"+this.username+"'" , style: 'myText' ,alignment: 'center' },
        {


          columns: [
            { width: '20%', text: 'Name :', style: ['listItem', 'listLabel'] },
            { width: '30%', text: this.username, style: ['listItem', 'listText'] },
            { width: '20%', text: 'Position Applied For :', style: ['listItem', 'listLabel'] },
            { width: '35%', text: this.profile.position, style: ['listItem', 'listText'] }
          ],
          columnGap: 10
        },

         {
          columns: [
            { width: '20%', text: 'Father Name:', style: ['listItem', 'listLabel'] },
            { width: '30%', text: this.profile.father, style: ['listItem', 'listText'] },
            { width: '20%', text: 'City:', style: ['listItem', 'listLabel'] },
            { width: '35%', text: this.profile.City, style: ['listItem', 'listText'] }
          ],
          columnGap: 10
        },

         {
          columns: [
            { width: '20%', text: 'CNIC:', style: ['listItem', 'listLabel'] },
            { width: '30%', text: this.profile.cnic, style: ['listItem', 'listText'] },
            { width: '20%', text: 'Date:', style: ['listItem', 'listLabel'] },
            { width: '35%', text: this.profile.Date, style: ['listItem', 'listText'] }
          ],
          columnGap: 10
        },



         {
          columns: [
            { width: '20%', text: 'Contact Number:', style: ['listItem', 'listLabel'] },
            { width: '30%', text: this.profile.number, style: ['listItem', 'listText'] },
            { width: '20%', text: 'Venue Of Test:', style: ['listItem', 'listLabel'] },
            { width: '35%', text: this.profile.Venue, style: ['listItem', 'listText'] }
          ],
          columnGap: 10
        },



         {
          columns: [
            { width: '20%', text: 'Email Address:', style: ['listItem', 'listLabel'] },
            { width: '30%', text: this.emails[0].address, style: ['listItem', 'listText'] },
            { width: '20%', text: 'Region:', style: ['listItem', 'listLabel'] },
            { width: '35%', text: this.profile.Regional, style: ['listItem', 'listText'] }
          ],
          columnGap: 10
        },

       {
          columns: [
            { width: '20%', text: 'Present Address:', style: ['listItem', 'listLabel'] },
            { width: '30%', text: this.profile.Address, style: ['listItem', 'listText'] },
            { width: '20%', text: 'Area:', style: ['listItem', 'listLabel'] },
            { width: '35%', text: this.profile.Area, style: ['listItem', 'listText'] }
          ],
          columnGap: 10
        },
 {
           columns: [
           
            { width: '20%', text: 'Department:', style: ['listItem', 'listLabel'] },
            { width: '30%', text: this.profile.Department, style: ['listItem', 'listText'] }
          ],
          columnGap: 10
        },





     
        // sections,
{
        table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: [ '*' , 'auto' , 'auto' , 'auto' , 'auto' ,'auto', 'auto' ],

        body: [

          [ 'Particulars' ,'Attempted' ,'Correct' ,'Out of' ,'Score %' ,'time','Result'],
          [ name  , Attempted , Correct, Outof  ,  Score,TimeLocked, Result ] ,
          [ "Total"  , AttemptedTotal , CorrectTotal, OutofTotal  ,  FinalPercent+"%" ,"TT", Conclude ,  ] 

     
 
   
     
     
    
       
        ]
      }
},
     { text: 'Note : It is System generated report and does not require any signature', fontSize: 8 },



      ],
      
      // Style dictionary 
      styles: {
        headline: { fontSize: 25, bold: true, margin: [0, 0, 0, 5] },
        listItem: { fontSize: 14, margin: [0, 0, 0, 5] },
        listLabel: { fontSize: 10 ,bold: true },
        listText: {  fontSize: 10 , italic: true },
        myText: { fontSize: 15 ,bold: true , margin: [0, 0, 0, 10] },
      }
    };
  pdfMake.createPdf(docDefinition).open();
console.log(event);
}

});