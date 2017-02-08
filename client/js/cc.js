Template.ccinfo.onCreated(function () {
	this.ccGoalRate = new ReactiveVar();
	this.ccCurrRate = new ReactiveVar();
});

Template.ccinfo.helpers({
	showGoal() {
			templateInstanceCcGoal = Template.instance();
			return templateInstanceCcGoal.ccGoalRate.get();
		},
		showCurr() {
			templateInstanceCcCurr = Template.instance();
			return templateInstanceCcCurr.ccCurrRate.get();
		}
});


Template.ccinfo.events({

	'change input[type=radio]': function (event) {
		numSpeeches = event.currentTarget.value
		numSpeechesleft = 10 - numSpeeches;
		Session.set('sliderValueIs', numSpeeches)
			//The Session var will be set as you drag the slider across its range of values.
			//later, you can get this session and return it in a helper to display on your page
	},
	'submit #dates': function (event, templateInstance) {
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

		let nowDays = diff(joinDateFormat, finishDateFormat)
		let goalDays = diff(now, finishDateFormat);
		let finalGoalDate = speechRate(numSpeechesleft, goalDays);
		let currentRate = speechRate(numSpeeches, nowDays) * numSpeechesleft;
		console.log("To finish your CC by your goal date you will have to do a speech every " + finalGoalDate + " days");

		console.log("At your current rate you will finish your CC in " + currentRate + " days");

		templateInstanceCcGoal.ccGoalRate.set(finalGoalDate); //set value
		templateInstanceCcCurr.ccCurrRate.set(currentRate); //set value
		$('#ccModal').addClass('show'); //show modal
		$(".close").click(function () { //close modal on click
			$('#ccModal').removeClass('show');
		});
	}

});
