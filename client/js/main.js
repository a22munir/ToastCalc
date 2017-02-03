
/*Template.ccprojects.helpers({
	//tasks: ["1: The Icebreaker ", "2: Organize your Speech", "3: Get to the Point", "4: How to Say It", "5: Your Body Speaks", "6: Vocal Variety", "7: Research Your Topic", "8: Get Comfortable wiht Visual Aids", "9: Persuade with Power", "10: Inspire Your Audience"],
	//}
});
*/


Template.ccinfo.events({
        
    'input input[type=range]': function(event){
     numSpeeches = event.currentTarget.value
     numSpeechesleft = 10 - numSpeeches;
     Session.set('sliderValueIs', numSpeeches)
     //The Session var will be set as you drag the slider across its range of values.
     //later, you can get this session and return it in a helper to display on your page
  },
	'submit #dates': function (event) {
		event.preventDefault();
		let joinDate = $('.joinCC').val();
		let finDate = $('.finishCC').val();
		let [joinYear, joinMonth, joinDay] = joinDate.split('-');
		let [finYear, finMonth, finDay] = finDate.split('-');
		let finishDateFormat = new Date(finDate)
		let joinDateFormat = new Date(joinDate);
		let now = new Date();

		function diff(past, future) {
			return (future - past) / (1000 * 60 * 60 * 24);
		}

		function speechRate(numLeft, time) {
			return parseInt(time / numLeft);
		}

		let nowDays = diff(joinDateFormat, finishDateFormat),
			goalDays = diff(now, finishDateFormat);
		console.log("To finish your CC by your goal date you will have to do a speech every " + speechRate(numSpeechesleft, goalDays) + " days");

		console.log("At your current rate you will finish your CC in " + speechRate(numSpeeches, nowDays) * numSpeechesleft + " days");
	} 

});
