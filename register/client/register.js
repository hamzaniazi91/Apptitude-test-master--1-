Template.register.onRendered(function(){
  this.$('#registerForm').parsley({trigger : 'change'});


})

Template.register.events({
  'submit #registerForm' : function(event,template){
    // Meteor.call('registerUser',event.currentTarget.name.value,event.currentTarget.email.value,function(err,res){
    //   if(err)
    //   {
    //     Materialize.toast(err.reason,4000);
    //   }
    // })

    

    Accounts.createUser({
      username: event.currentTarget.name.value,
      
       password: event.currentTarget.pass.value ,
       email : event.currentTarget.email.value  ,
       profile : 
       {
        father:event.currentTarget.father.value,
        cnic : event.currentTarget.cnic.value,
        number: event.currentTarget.number.value,
        position : event.currentTarget.position.value,
        Regional   : event.currentTarget.Regional.value,
        Area  : event.currentTarget.Area.value,
        Department  : event.currentTarget.Department.value,

      }
    }, 


       function(err) {
  if (err)
    console.log(err);
  else
    Router.go('/');
    console.log('success!');
});

    return false;
  }
})
