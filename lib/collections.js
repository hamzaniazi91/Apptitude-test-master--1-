Questions = new Mongo.Collection('questions');
TempQuestions = new Mongo.Collection('tempquestions');
Sections = new Mongo.Collection('sections')
Results = new Mongo.Collection('results')
Lock = new Mongo.Collection('lock')
 Images = new FilesCollection({
 	  storagePath: '/data/Meteor/uploads/',
  downloadRoute: '/files/images',
  collectionName: 'Images',
  //allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});

// Users = new Mongo.Collection('users


