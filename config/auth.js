// expose our config directly to our application using module.exports
module.exports = {

  'facebookAuth' : {
      'clientID'      : '357977765t4r017943125', // your App ID
      'clientSecret'  : 'e3427977539e1f8765t4r3e6348e0652470639142',
      'callbackURL'   : '',
      'profileURL'    : '',
      'profileFields' : ['id', 'emails', 'name'] // For requesting permissions from Facebook API
  },

  'twitterAuth' : {
      'consumerKey'       : 'bJqg5678765tr5WcNCFimqKG0G0476u12q',
      'consumerSecret'    : 'OIEyUKjt93t3Kva6gdfyA7VfLKWCgsfdpIFnYu7QPMvYudHDfaO6JAbyAa',
      'callbackURL'       : ''
  },

    'googleAuth' : {
        'clientID'      : '71924457680erwer2-vb1l8je58jr8reg3ocgnp056o4sucohu.apps.googleusercontent.com',
        'clientSecret'  : '6JDLM43324cKZhQAYtbvOZpTr-P8C',
          'callbackURL'   : ''
    }

};
