Template.ccinfo.onCreated(function () { //creating needed reactive variables for inputs
	this.ccGoalRate = new ReactiveVar();
	this.ccCurrRate = new ReactiveVar();
});

Template.ccinfo.helpers({ //helper functions for getting reactive variables for inputs
	showGoal() {
			templateInstanceCcGoal = Template.instance();
			return templateInstanceCcGoal.ccGoalRate.get(); //getting the goal 
		},
		showCurr() {
			templateInstanceCcCurr = Template.instance();
			return templateInstanceCcCurr.ccCurrRate.get(); //getting the current rate
		}
});


Template.ccinfo.events({ //responses to events

	'change input[type=radio]': function (event) {
		numSpeeches = event.currentTarget.value //getting the seleced radio fields
		numSpeechesleft = 10 - numSpeeches; //number of speeches left 
	},
	'submit #dates': function (event, templateInstance) {
		event.preventDefault();
		let joinDate = $('.joinCC').val(); //querying the DOM for the join date
		let finDate = $('.finishCC').val(); //querying the DOM for the goal date
		let [joinYear, joinMonth, joinDay] = joinDate.split('-'); //setting the year, month and day values
		let [finYear, finMonth, finDay] = finDate.split('-');
		let finishDateFormat = new Date(finDate)
		let joinDateFormat = new Date(joinDate);
		let now = new Date(); //setting the current date

		function diff(past, future) { //returns the difference between dates in days
			return (future - past) / (1000 * 60 * 60 * 24);
		}

		function speechRate(numLeft, time) { //determine the speech rate
			return Math.round(time / numLeft);
		}

		let nowDays = diff(joinDateFormat, finishDateFormat) //the difference between the join date and now
		let goalDays = diff(now, finishDateFormat); //the difference between now and the goal date
		let finalGoalDate = speechRate(numSpeechesleft, goalDays);
		let currentRate = speechRate(numSpeeches, nowDays) * numSpeechesleft;

		templateInstanceCcGoal.ccGoalRate.set(finalGoalDate); //set goal value
		templateInstanceCcCurr.ccCurrRate.set(currentRate); //set value
		$('#ccModal').addClass('show'); //show modal
		$(".close").click(function () { //close modal on click
			$('#ccModal').removeClass('show');
		});
	}

});
