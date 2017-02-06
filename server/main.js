import { Meteor } from 'meteor/meteor';

Users = new Mongo.Collection("Users");

Meteor.startup(() => {
    console.log("app starting");
  // code to run on server at startup
});

Meteor.settings.contactForm = {
  emailTo: 'mufcuw@gmail.com'
};
