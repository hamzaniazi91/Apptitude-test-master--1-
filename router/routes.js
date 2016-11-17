Router.configure({
  layoutTemplate : 'basiclayout'
})



// Router.onBeforeAction(function(){
// if(!Meteor.userId()){
//   this.next();
// }
// else{
//   this.redirect('/')
// }

// },{
//   only : ['register']
// });



// Router.onBeforeAction(function(){
//   if(Meteor.userId() && Roles.userIsInRole(Meteor.userId(),'admin')){
//     this.next();
//   }
//   else {
//     this.redirect('/')
//   }

// },{
//   only : ['admin']
// })



// Router.onBeforeAction(function(){

//   if(!Meteor.userId()){
//     this.layout('loginlayout');
//     this.render('login',{to : 'cardcontent'})
//   }
//   else {
//     this.next();
//   }
// },{
//   except : ['about','register','admin']
// })









// Router.onBeforeAction(function(pause) 
//     { 
//     if (!this.ready())          
//         {
//         pause(); 
//         this.render('loading');
//         }

       
//     });




Router.route('/admin',function(){
	name: "a1",
	this.render('admin',{to:'maincontent'})

})
Router.route('/questions/:_name',function(){
	

	name: "a2",


	this.render('questions',{to:'maincontent'})
}, {
    //name : 'search',

    onBeforeAction : function () {
        console.log('onBeforeAction called');
        this.next();
    },
    onAfterAction : function () {
        console.log('onAFTERAction called');
    },
    action: function() 
            {
            if (this.ready())
                this.render();
            },
    //            waitOn: function () {

    //     //var id = this.params._id;
    //     return Meteor.subscribe('allyells');
    // },
        



})


// Router.route('/questions/:_name',function(){
// 	var params = this.params;
// 	var name = params._name;

// 	name: "a2",
// 	this.render('questions',{to:'maincontent',

// data: function(){

// 	console.log( Questions.find({_name : this.params_name}));
// 	return Questions.find({_name : this.params_name});
// }

// 	});

// })

Router.route('/scorecard',function(){
name: "a0",
  this.render('scorecard',{to:'maincontent'})

})

Router.route('/',function(){
name: "a3",
	this.render('intro',{to:'maincontent'})

})


Router.route('/register',function(){
	name: "a4",
  this.layout('loginlayout');
  this.render('register',{to : 'cardcontent'});
})


Router.route('/section',function(){
	name: "a6",
	this.render('section',{to:'maincontent'})

})






// -------------JUST FOR TESTING--------
Router.route('/login',function(){
	name: "a5",
  this.layout('loginlayout');
  this.render('login',{to : 'cardcontent'});
})