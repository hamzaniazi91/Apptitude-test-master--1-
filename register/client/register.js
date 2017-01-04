





Template.register.onCreated(function(){






})






Template.register.onRendered(function(){
 // this.$('#registerForm').parsley({trigger : 'change'});


var position2;
$('#position2').change(function(){
  console.log(this.value);
   var id = $(this).find(':selected')[0].id;
   // alert("chjabsd" + id)
  // console.log($('#position2').val(id));
position = this.value;
})


$("#registerForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 5
            },
            email: {
                required: true,
                email:true
            },
            password: {
        required: true,
        minlength: 5
      },
  
      cnic: {
                required: true,
                 minlength: 15,
                 maxlength: 15,
            },
            crole:"required",
            ccomment: {
        required: true,
        minlength: 15
            },
            cgender:"required",
      cagree:"required",
        },
        //For custom messages
        messages: {
            uname:{
                required: "Enter a username",
                minlength: "Enter at least 5 characters"
            },
            curl: "Enter your website",
        },
        errorElement : 'div',
        errorPlacement: function(error, element) {
          var placement = $(element).data('error');
          if (placement) {
            $(placement).append(error)
          } else {
            error.insertAfter(element);
          }
        }
     });

console.log(new Date())
document.getElementById("Date").value = new Date();
 Materialize.updateTextFields();
})

Template.register.events({
  'submit #registerForm' : function(event,template){var EN = CryptoJS.MD5(event.currentTarget.pass.value).toString();Accounts.createUser({username: event.currentTarget.name.value,
       password: event.currentTarget.pass.value , email : event.currentTarget.email.value  ,profile : { father:event.currentTarget.father.value, cnic : event.currentTarget.cnic.value, number: event.currentTarget.number.value, Address : event.currentTarget.Address.value, position : position2, City : event.currentTarget.City.value,  Date : event.currentTarget.Date.value,  Venue : event.currentTarget.Venue.value,
        Regional   : event.currentTarget.Regional.value,Area  : event.currentTarget.Area.value,Department  : event.currentTarget.Department.value,}}, 


       function(err) {
  if (err)
    console.log(err);
  else

    //console.log(CryptoJS.MD5('Message').toString())
    System_1.insert({e : event.currentTarget.email.value, p :EN  ,createdAt:new Date()})
    Router.go('/');
    console.log('success!');
});


    // Meteor.call('registerUser',event.currentTarget.name.value,event.currentTarget.email.value,function(err,res){
    //   if(err)
    //   {
    //     Materialize.toast(err.reason,4000);
    //   }
    // })

//Materialize.toast("err.reason",4000);
    return false;
  }
})
