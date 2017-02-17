Template.clinfo.onCreated(function () { //creating needed reactive variables for inputs
	this.clGoalRate = new ReactiveVar();
	this.clCurrRate = new ReactiveVar();

});

Template.clinfo.helpers({ //helper functions for getting reactive variables for inputs
	showGoal() {
			templateInstanceGoal = Template.instance();
			return templateInstanceGoal.clGoalRate.get();
		},
		showCurr() {
			templateInstanceCurr = Template.instance();
			return templateInstanceCurr.clCurrRate.get();
		},
});



Template.clinfo.events({
	'submit #clsubmit': function (event, templateInstance) {
		event.preventDefault(); //prevent default  behaviour of refreshing
		let form = document.forms[0];
		let numTasksCompleted = form.querySelectorAll(':checked').length; //get number of tasks completed
		let numTasksLeft = 22 - numTasksCompleted; // tasks left to complete
		let joinDate = $('.joinCL').val(); //get join date
		let finDate = $('.finishCL').val(); // get goal finish date 
		let [joinYear, joinMonth, joinDay] = joinDate.split('-'); //split date 
		let [finYear, finMonth, finDay] = finDate.split('-');
		let finishDateFormat = new Date(finDate)
		let joinDateFormat = new Date(joinDate);
		let now = new Date(); // current date

		function diff(past, future) { //get difference between dates in days
			return (future - past) / (1000 * 60 * 60 * 24);
		}

		function taskRate(numLeft, time) { // get rate needed to complete tasks
			return Math.round(time / numTasksLeft);
		}

		let nowDays = diff(joinDateFormat, now) //the difference between the join date and now
		let goalDays = diff(now, finishDateFormat); //the difference between now and the goal date
		let finalGoalDate = taskRate(numTasksLeft, goalDays);
		let currentRate = taskRate(numTasksCompleted, nowDays) * numTasksLeft;
		templateInstanceGoal.clGoalRate.set(finalGoalDate); //set value
		templateInstanceCurr.clCurrRate.set(currentRate); //set value
		$('#clModal').addClass('show'); //show modal
		$(".close").click(function () { //close modal on click
			$('#clModal').removeClass('show');
		});
	}
});
