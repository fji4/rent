var User = require('../models/user');
var Apartment = require('../models/apartment');

module.exports = function(router, passport) {

    router.get('/', function(req, res) {
        // Display the Login page with any flash message, if any
        res.status(200).send({
            message: 'OK',
            data: []
        })
    });

    router.post('/register',
        passport.authenticate('local-signup'),
        // {
        //     successRedirect : '/sublease', // redirect to the secure profile section
        //     failureRedirect : '/', // redirect back to the signup page if there is an error
        //     failureFlash : true // allow flash messages
        // }),
        function(req, res) {
            res.status(200).json({ user: req.user.email
            });
        });

    router.post('/login',
        passport.authenticate('local-login'),
        function(req, res) {
            console.log(req.isAuthenticated());
            res.status(200).json({ user: req.user
            });

        });



    router.get('/profile',
        isLoggedIn,
        function(req, res) {
            console.log(req.isAuthenticated());
            res.status(200).json({ user: req.user, message: "Welcome!"
            });
        });

    router.get('/logout', function(req, res) {
        req.logOut();
        res.status(200).json({ message: "logged out "});
    });

    router.get('/auth/google', passport.authenticate('google',{
        scope: ['profile','email']
    }));

    router.get('/auth/google/callback', passport.authenticate('google'))

    router.get('/auth/facebook', passport.authenticate('facebook', {
        scope : ['public_profile', 'email']
    }));

    // handle the callback after facebook has authenticated the user
    router.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // // route for logging out
    // router.get('/logout', function(req, res) {
    //     req.logout();
    //     res.redirect('/');
    // });


    var aptRoute = router.route('/apartment');
    aptRoute.get(function(req,res){
        if(req.query.count){
            Apartment.count(eval("("+req.query.where+")"))
                .sort(eval("("+req.query.sort+")"))
                .select(eval("("+req.query.select+")"))
                .skip(eval("("+req.query.skip+")"))
                .limit(eval("("+req.query.limit+")"))
                .exec(function(err, apartments){
                    if(err){
                        res.status(500).send({
                            message: err,
                            data: []
                        });
                    }else{
                        res.status(200).send({
                            message: 'OK',
                            data: apartments
                        });
                    }
                });
        }else{
            Apartment.find(eval("("+req.query.where+")"))
                .sort(eval("("+req.query.sort+")"))
                .select(eval("("+req.query.select+")"))
                .skip(eval("("+req.query.skip+")"))
                .limit(eval("("+req.query.limit+")"))
                .exec(function (err, apartments){
                    if (err) {
                        res.status(500).send({
                            message: err,
                            data: []
                        });
                    } else {
                        res.status(200).send({
                            message: "OK",
                            data: apartments
                        });
                    }
                });

        }
    });

    aptRoute.post(function(req,res){
        var aptAdd = {
            location: req.body.location,
            city: req.body.city,
            price: req.body.price,
            assignedOwner: req.body.assignedOwner,
            gender: req.body.gender,
            // contactPhone: req.body.contactPhone,
            contactEmail: req.body.contactEmail,
            description: req.body.description,
            datePosted: req.body.datePosted,
            dateStarted: req.body.dateStarted,
            dateEnd: req.body.dateEnd,
            completed:req.body.completed
        };
        Apartment.create(aptAdd,function (err, apt) {
                if(err){
                    res.status(500).send({
                        message: err,
                        data: []
                    });
                }else{
                    res.status(201).send({
                        message: "OK",
                        data: apt
                    });
                }
            }
        )

    });

    var idaptRoute = router.route("/apartment/:id")
    idaptRoute.get(function (req, res){
        Apartment.findById(req.params.id)
            .select(eval("("+req.query.select+")"))
            .exec(function(err,apt){
                if(err){
                    res.status(500).send({
                        message: err,
                        data: []
                    });
                }else if(!apt){
                    res.status(404).send({
                        message: "no user found",
                        data:[]
                    });
                }else{
                    res.status(200).send({
                        message: "OK",
                        data: apt
                    });
                }
            });
    });

    idaptRoute.put(function(req,res){

        Apartment.findById(req.params.id,function(err,apt){
            if(err){
                // console.log('user');
                return res.status(500).send({
                    message: err,
                    data: []
                });
            }else if(!apt){
                return res.status(404).send({
                    message: 'no user found',
                    data:[]
                });
            }else{

                if(req.body.location) {
                    apt.location = req.body.location;
                }
                if(req.body.city) {
                    apt.city = req.body.city;
                }
                if(req.body.price){
                    apt.price = req.body.price;
                }
                if(req.body.assignedOwner){
                    apt.assignedOwner = req.body.assignedOwner;
                }
                if(req.body.gender){
                    apt.gender = req.body.gender;
                }
                if(req.body.contactEmail){
                    apt.contactEmail = req.body.assignedUserName;
                }
                // if(req.body.contactPhone){
                //     apt.contactPhone = req.body.contactPhone;
                // }

                if(req.body.description){
                    apt.description = req.body.description;
                }
                if(req.body.datePosted){
                    apt.datePosted = req.body.datePosted;
                }
                if(req.body.dateStarted){
                    apt.dateStarted = req.body.dateStarted;
                }
                if(req.body.dateEnd){
                    apt.dateEnd = req.body.dateEnd;
                }
                if(req.body.completed){
                    apt.completed = req.body.completed;
                }

                if(req.body.dateCreated){
                    apt.dateCreated= req.body.dateCreated;
                }
                if(req.body.img){
                    apt.img= req.body.img;
                }

                Apartment.save(function(err){
                    if(err){
                        return res.status(500).send({
                            message: err,
                            data: []
                        });
                    }else{
                        return res.status(200).send({
                            message: 'OK',
                            data: apt
                        });
                    }
                });

            }

        });
    });

    idaptRoute.delete(function(req, res) {
        Apartment.findByIdAndRemove(req.params.id, function (err,apt) {
            if (err) {
                res.status(500).send({
                    message: err,
                    data: []
                });
            } else if (!apt) {
                res.status(404).send({
                    message: "no user found",
                    data: []
                });
            } else {
                res.status(200).send({
                    message: "data deleted",
                    data: []
                });
            }
        });
    });

    var userRoute = router.route('/users');
    userRoute.get(function(req,res){
        if(req.query.count) {
            // console.log('enter count');
            User.count(eval("(" + req.query.where + ")"))
                .sort(eval("(" + req.query.sort + ")"))
                .select(eval("(" + req.query.select + ")"))
                .skip(eval("(" + req.query.skip + ")"))
                .limit(eval("(" + req.query.limit + ")"))
                .exec(function (err, user) {
                    if (err) {
                        res.status(500).send({
                            message: err,
                            data: []
                        });
                    } else {
                        res.status(200).send({
                            message: 'OK',
                            data: user
                        });
                    }
                });
        }else{
            User.find(eval("("+req.query.where+")"))
                .sort(eval("("+req.query.sort+")"))
                .select(eval("("+req.query.select+")"))
                .skip(eval("("+req.query.skip+")"))
                .limit(eval("("+req.query.limit+")"))
                .exec(function (err, Users) {
                    if (err) {

                        res.status(500).send({
                            message: err,
                            data: []
                        });
                    } else {
                        // console.log('enter list');
                        res.status(200).send({
                            message: 'OK',
                            data: Users
                        });
                    }

                });

        }
    });

    var idRoute = router.route('/users/:id');
    idRoute.get(function (req, res){
        User.findById(req.params.id)
            .select(eval("("+req.query.select+")"))
            .exec(function(err, user){
                if(err){
                    // console.log('user');
                    res.status(500).send({
                        message: err,
                        data: []
                    });
                }else if(!user){
                    res.status(404).send({
                        message: 'no user found',
                        data:[]
                    });
                }else{
                    res.status(200).send({
                        message: 'OK',
                        data: user
                    });
                }
            });
    });


    idRoute.put(function(req,res) {
        if (!req.body.local.name) {
            return res.status(500).send({
                message: "Name is required",
                data: []
            });
        }
        if (!req.body.local.email) {
            return res.status(500).send({
                message: "email is required",
                data: []
            });
        }

        User.findOne({email: req.body.local.email}, function (err, user) {
            if (err) {
                return res.status(500).send({
                    message: err,
                    data: []
                });
            } else if (user && (user._id != req.params.id)) {
                // console.log(user._id, req.params.id);
                return res.status(500).send({
                    message: "multiple user with same email",
                    data: []
                });

            } else {
                User.findById(req.params.id, function (err, user) {
                    if (err) {
                        // console.log('user');
                        return res.status(500).send({
                            message: err,
                            data: []
                        });
                    } else if (!user) {
                        return res.status(404).send({
                            message: 'no user found',
                            data: []
                        });
                    } else {


                        if (req.body.local.name) {
                            user.local.name = req.body.local.name;
                        }
                        if (req.body.local.description) {
                            user.local.description = req.body.local.description;
                        }
                        if (req.body.local.wishList) {
                            user.local.wishList = req.body.local.wishList;
                        }
                        if (req.body.local.ownedApt) {
                            user.local.ownedApt = req.body.local.ownedApt;
                        }
                        if (req.body.local.userPic) {
                            user.local.userPic = req.body.local.userPic;
                        }

                        user.save(function (err) {
                            if (err) {
                                return res.status(500).send({
                                    message: err,
                                    data: []
                                });
                            } else {
                                res.status(200).send({
                                    message: 'OK',
                                    data: user
                                });
                            }
                        });

                    }

                });


            }
        });
    });


    idRoute.delete(function(req, res) {
        User.findByIdAndRemove(req.params.id, function (err, user) {
            if (err) {
                res.status(500).send({
                    message: err,
                    data: []
                });
            } else if (!user) {
                res.status(404).send({
                    message: 'no user found',
                    data: []
                });
            } else {
                res.status(200).send({
                    message: 'data deleted',
                    data: []
                });
            }
        });
    });


    return router;
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ message: "unable to auth" });
}
