Router.configure({
    layoutTemplate: 'ApplicationLayout',
})

Router.route('/test', function () {
  // use the template named ApplicationLayout for our layout
  this.layout('ApplicationLayout');

  this.render('navbar', {to: 'navbar'});
    
  this.render('test', {to: 'content'});

  this.render('footer', {to: 'footer'});
});
