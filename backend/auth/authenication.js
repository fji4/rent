module.exports = {
    'facebookAuth' : {
        'clientID'      : '172880363302569', // your App ID
        'clientSecret'  : 'd2fd703d1e7f34c50f1e2ad475b0aa21', // your App Secret
        'callbackURL'   : 'http://localhost:3000/api/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },
    'googleAuth':{
        'clientID' : '466909404264-o9fvdcsguhm5uaq2q14eim1lil1gcclf.apps.googleusercontent.com',
        'clientSecret' : 'PwZpU6FhtCP7kpCa4CWx63NO',
        'callbackURL'   : 'http://localhost:3000/api/auth/google/callback'

    }

};

