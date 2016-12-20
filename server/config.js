// run this when the meteor app is started
Meteor.startup(function() {

  

console.log("HKN")

//    if (Meteor.isClient) {
//   console.log("adssad")

// var qs = Questions.find().fetch();

//   _.each(qs, function(question) {
//     console.log( question._id)
//       Questions.update({ _id : question._id } , {$set: { _random_sample : Math.random() }});
//     });
// };


  //Lock._ensureIndex({user: 1 , section: 1}, {unique: 1});

 Meteor.publish("userList", function () {
           return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
    });




//Results._ensureIndex({userId: 1 ,Question:1}, {unique: 1});
  

  // if there are no questions available create sample data
  // if (Questions.find().count()===0) {

    // create sample questions
//     var samplequestions = [
//     {

//       "question" : "For which of the following disciplines is Nobel Prize awarded?",
//   "answer": 3,
//   "options": [
//     "Physics and Chemistry",
//     "Physiology or Medicine",
//     "Literature, Peace and Economics",
//     "All of the above"
//   ]
// },

// {         "no": 1,
//           "question": "Who is the CEO & CTO of spaceX & also the CEO of Tesla Motors",
//           "answer": 2,
//           "options": [
//             "Mark Zuckerberg         ",
//             "William Stallings       ",
//             "Elon Musk               ",
//             "Sergy Bin               "
//               ]
// },
// {         "no":2,
//           "question": "A vixen is a female of what?",
//           "answer": 3,
//           "options": [
//             "hare                    ",
//             "Badger                  ",
//             "Swan                    ",
//             "Fox                     "
//               ]
// },//------end

// {         "no":3,
//           "question": "Who sang 1980's hit song 'Billie Jean'?",
//           "answer": 1,
//           "options": [
//             "Queen Latifah           ",          
//             "Michael Jackson         ",
//             "Billie Joe Armstrong    ",
//             "Fredde Mercury          "
//               ]
// },//-----end

// {         "no":4,
//           "question": "Havana is the capital city of which country?",
//           "answer": 1,
//           "options": [
//             "California              ",
//             "Cuba                    ",
//             "Argentina               ",
//             "Chile                   "
//               ]
// },//------end

// {         "no":5,
//           "question": "Which wonder of the ancient world was found in Alexandria?",
//           "answer": 2,
//           "options": [
//             "Hanging Gardens         ",
//             "Great Pyramid           ",
//             "The lighthouse          ",
//             "Temple of Artemis       "
//               ]
// },//------end
// {         "no":6,
//           "question": "Which rapper did Kim Kardashian marry in 2014?",
//           "answer": 2,
//           "options": [
//             "Jay-z                   ",
//             "Ray-J                   ",
//             "Kanye West              ",
//             "Dr Dre                  "
//               ]
// },//------end
// {         "no":7,
//           "question": "Where did the name Pokemon come from?",
//           "answer": 0,
//           "options": [
//             "short for pocket monster",
//             "Pokemon prefecture      ",
//             "random Syllables        ",
//             "Akira Pokemon           "
//               ]
// },//------end
// {         "no":8,
//           "question": "What was the highest grossing film of 2010?",
//           "answer": 2,
//           "options": [
//             "Twilight                 ",
//             "Inception                ",
//             "Toy Story 3              ",
//             "Harry Potter             "
//               ]
// },//------end
// {         "no":9,
//           "question": "What is the smallest state in India?",
//           "answer": 1,
//           "options": [
//             "Goa                      ",
//             "Sikkim                   ",
//             "Manipal                  ",
//             "Mizoram                  "
//               ]
// },//------end
// {         "no":10,
//           "question": "Which of the following is the most important cash crop of Assam?",
//           "answer": 3,
//           "options": [
//             "Sugarcane                ",
//             "coffee                   ",
//             "cotton                   ",
//             "Tea                      "
//               ]
// },//------end

// {         "no":11,
//           "question": "Which of the following has a potential for harnessing tidal energy in India?",
//           "answer": 0,
//           "options": [
//             "Gulf of Cambay           ",
//             "Gulf of Mannar           ",
//             "Chilka Lake              ",
//             "Backwaters of Kerala     "
//               ]
// },//------end



// // -----------------------------------Computer Science-------------------------
// {         "no":12,
//           "question": "Who is the creator of Linux?",
//           "answer": 0,
//           "options": [
//             "Linus Torvalds            ",
//             "Steve Jobs                ",
//             "Alan Turing               ",
//             "william Gates             "
//               ]
// },

// {         "no":13,
//           "question": "Which of these is a media file format that is free from patents?",
//           "answer": 1,
//           "options": [
//             "YGG",
//             "OGG",
//             "GGG",
//             "EGG"
//               ]
// },//------end

// {         "no":14,
//           "question": "'TUX' is the mascot of?",
//           "answer": 2,
//           "options": [
//             "Intel",
//             "Microsoft",
//             "Linux",
//             "MIUI"
//               ]
// },//------end
// {         "no":15,
//           "question": "What notation is used in the discussion  of running time complexity of algorithm?",
//           "answer":3 ,
//           "options": [
//             "small P notation",
//             "big A notation",
//             "big C notation",
//             "big O notation"
//               ]
// },//------end
// {         "no":16,
//           "question": "A segment in an IPv6 addresses can be any value from 0 to ___?",
//           "answer":3 ,
//           "options": [
//             "1024",
//             "8092",
//             "1000",
//             "FFFF"
//               ]
// },//------end
// {         "no":17,
//           "question": "What does the acronym pixel refer to?",
//           "answer": 2,
//           "options": [
//             "Photo Element",
//             "Picture information",
//             "Picture Element",
//             "Phosphor Locatiion"
//               ]
// },//------end

// {         "no":18,
//           "question": "Which of these algorithm types are used to find quick solution for NP hard problems?",
//           "answer": 2,
//           "options": [
//             "Tree search algorithms",
//             "Sorting algorithms",
//             "Approximation algorithms",
//             "Sequence Problems"
//               ]
// },//------end

// {         "no":19,
//           "question": "Which programming language did Alan Kay create?",
//           "answer": 2,
//           "options": [
//             "logo",
//             "Q-basic",
//             "smalltalk",
//             "smile"
//               ]
// },//------end
// {         "no":20,
//           "question": "Which NCSA program is considered to be first modern browser?",
//           "answer": 3,
//           "options": [
//             "Jigsaw",
//             "Capture",
//             "Netscape",
//             "Mosaic"
//               ]
// },//------end
// {         "no":21,
//           "question": "In FORTRAN, what does 'FOR-' stand for?",
//           "answer":0 ,
//           "options": [
//             "formula",
//             "forest",
//             "formation",
//             "form"
//               ]
// },//------end
// {         "no":22,
//           "question": "Which Computer connectivity technology is represented by trident logo?",
//           "answer": 2,
//           "options": [
//             "SAN",
//             "CD",
//             "USB",
//             "Bluetooth"
//               ]
// },//------end
// {         "no":23,
//           "question": "Which of the following use client-server application architecture?",
//           "answer": 1,
//           "options": [
//             "Network printing",
//             "All choices",
//             "Email",
//             "World Wide Web"
//               ]
// },//------end
// {         "no":24,
//           "question": "Which of the following is not a JAVA primitive data type?",
//           "answer": 3,
//           "options": [
//             "int",
//             "long",
//             "byte",
//             "bit"
//               ]
// },//------end
// // -------------------------------general science-----------------------
// {         "no":25,
//           "question": "Lemon contains which kind of acid?",
//           "answer": 3,
//           "options": [
//             "sulfuric",
//             "Chromic",
//             "Hydrochloric",
//             "Citric"
//               ]
// },//------end

// {         "no":26,
//           "question": "Who postulated the uncertainty principle?",
//           "answer": 2,
//           "options": [
//             "Pauli",
//             "Dirac",
//             "Heisenberg",
//             "Neil Bohr"
//               ]
// },//------end

// {         "no":27,
//           "question": "In equation E=MC^2 what is C?",
//           "answer": 0,
//           "options": [
//             "Speed of Light",
//             "Plank's Constant",
//             "Gravitational constant",
//             "Critical mass"
//               ]
// },//------end


// {         "no":28,
//           "question": "If G = Conductance , V = voltage & I= Current, which of the following is true?",
//           "answer": 1,
//           "options": [
//             "G=IV",
//             "G=I/V",
//             "V=G+I",
//             "I= 0.5G -v"
//               ]
// }//------end


    //];

    // loop over each sample question and insert into database
    // _.each(samplequestions, function(question) {
    //   Questions.insert(question);
    // });


  

});
