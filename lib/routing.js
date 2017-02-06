Router.configure({
    layoutTemplate: 'ApplicationLayout',
})



Router.route('/', function () {
    // use the template named ApplicationLayout for our layout
    this.layout('ApplicationLayout');

    this.render('navbar', {
        to: 'navbar'
    });

    this.render('ccinfo', {
        to: 'content'
    });

    this.render('footer', {
        to: 'footer'
    });
});

Router.route('/CL', function () {
    // use the template named ApplicationLayout for our layout
    this.layout('ApplicationLayout');

    this.render('navbar', {
        to: 'navbar'
    });

    this.render('clinfo', {
        to: 'content'
    });

    this.render('footer', {
        to: 'footer'
    });
});

Router.route('/about', function () {
    // use the template named ApplicationLayout for our layout
    this.layout('ApplicationLayout');

    this.render('navbar', {
        to: 'navbar'
    });

    this.render('about', {
        to: 'content'
    });

    this.render('footer', {
        to: 'footer'
    });
});

Router.route('/contact', function () {
    // use the template named ApplicationLayout for our layout
    this.layout('ApplicationLayout');

    this.render('navbar', {
        to: 'navbar'
    });

    this.render('contact', {
        to: 'content'
    });

    this.render('footer', {
        to: 'footer'
    });
});





