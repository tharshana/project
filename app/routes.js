const mongoose = require('mongoose');
var book       = require('./models/book');

// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs' , {
            user : req.user
        }); // load the index.ejs file
    });



    app.get('/about', function(req, res) {
        res.render('about.ejs', {
            user : req.user
        });
        // load the index.ejs file
    });

    app.get('/g1', (req, res)=>{
      res.render('g1.ejs')
    })

    app.get('/g2', (req, res)=>{
      res.render('g2.ejs')
    })

    app.get('/g3', (req, res)=>{
      res.render('g3.ejs')
    })


    app.get('/gallery', function(req, res) {
        res.render('g1.ejs', {
            user : req.user
        });
        // load the index.ejs file
    });
    app.get('/shoplist', function(req, res) {
        res.render('shoplist.ejs', {
            user : req.user
        });
        // load the index.ejs file
    });
    app.get('/cabbageShopDetails', function(req, res) {
        res.render('cabbageShopDetails.ejs', {
            user : req.user
        });
        // load the index.ejs file
    });




    app.get('/success',isLoggedIn, function(req, res) {
        res.render('success.ejs', {
            user : req.user




        });


    });

    app.get('/book', isLoggedIn, function(req, res) {
        res.render('bookpage.ejs' ,{
            user : req.user
        }); // load the index.ejs file
    });
    app.get('/admin', isMoggedIn, function(req, res) {
        res.render('admin.ejs' ,{
            user : req.user
        }); // load the index.ejs file
    });
    app.get('/contact',  function(req, res) {
        res.render('contact.ejs' ,{
            user : req.user
        }); // load the index.ejs file
    });



    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });
    app.get('/booklogin', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('booklogin.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/booklogin', passport.authenticate('local-login', {
        successRedirect : '/book', // redirect to the secure profile section
        failureRedirect : '/booklogin', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope : ['public_profile', 'email']
    }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));


    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));





    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });



    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    app.post('/book', function(req, res) {


        var newBook = new book();
        newBook.vegetableId = req.body.vegetableId;
        newBook.qty = req.body.qty;
        newBook.name = req.body.name;
        newBook.email = req.body.email;
        newBook.address = req.body.address;
        newBook.phoneNumber = req.body.phoneNumber;







        //send mail to us when order comes
        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'angaadi@gmail.com',
                pass: 'Angaadi'
            }
        });
        var name = newBook.phoneNumber;
        var user = req.user;
        const mailOptions = {
            from: 'angaadi@gmail.com',// sender address
            to: 'angaadi@gmail.com', // list of receivers
            subject: 'Angaadi order', // Subject line
            html: '<p>Hi, we got an order from ' + name + '. please check in our dashboard<br/><br/>order deatils- <br/>  Vegetable id: '+newBook.vegetableId+ '<br/>Quantity: '+newBook.qty+  '<br/>Name: '+newBook.name+ '<br/>Email: '+newBook.email+ '<br/>Address: '+newBook.address+
                '<br/>Phone number: '+newBook.phoneNumber+ '<br/><br/> Thank you<br/>Angaadi </p>' // plain text body
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
                console.log(err)
            else
                console.log(info);
        });


        newBook.save(function(err,newBook){
            if(err){
                res.redirect('/book');
                console.log(err);
            }else{
                res.redirect('/success');
                console.log("Document Save Done");


                //send mail to customer
                var nodemailer = require('nodemailer');

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'angaadi@gmail.com',
                        pass: 'Angaadi'
                    }
                });


                const mailOptions = {

                    from: 'angaadi@gmail.com', // sender address
                    to: newBook.email, // list of receivers
                    subject: 'Angadi order', // Subject line
                    html: '<p>Hi ' + newBook.name + ', <br/><br/> Your order has been palced successfully. We will contact you about the order as soon as possible. <br/><br/> This is a system generated email and please do not reply. For more information please contact to us <br/><br/> Your order deatils- <br/>  Vegetable : '+newBook.vegetableId+  '<br/>Phone number: '+newBook.phoneNumber+ '<br/>address: '+newBook.address+ '<br/><br/> Thank you<br/>Angadi</p>'// plain text body
                };
                transporter.sendMail(mailOptions, function (err, info) {
                    if(err)
                        console.log(err)
                    else
                        console.log(info);
                });  // load the index.ejs file


            }
        });



    });


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/booklogin');
}


function isMoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
