
var n_done = []
var n_active = []
var n_users = []


var User = require('./user.js')


;(function addUser(){

	if (n_users.length < User.limit) {

		n_users[n_users.length] = n_active[n_active.length] = new User( whenDead )

		setTimeout(addUser, User.rate)
	}

})()


function whenDead(user)
{
	n_active.splice( n_active.indexOf(user), 1 )
	n_done[n_done.length] = user
}


var intvl = setInterval(function(){

	console.log('ACTIVE:'+n_active.length+' DONE:'+n_done.length+' FAILS:'+User.fails.length)

	if (n_active.length === 0) {

		clearInterval( intvl )

		process.exit()

	}

}, 2 * 1000)
