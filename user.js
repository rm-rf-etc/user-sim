
var oneSec = 1000
var oneMin = 60 * oneSec

/*
 * These are the settings that control user generation and behavior.
 */
var rate = oneSec * 0.25
var limit = 500
var lifespan = 5 * oneMin


var request = require('request')
request.defaults({
	pool: {
		maxSockets: Infinity
	}
})



var post_data = require('./data/1.json')
// var post_data = {"click":[{"type":"heat-vision","x":1,"y":1}]}
var req_target = 'http://dev-2.luckyshops.com/activity'
var req_opts = {
	method: 'POST',
	json: true,
	body: JSON.stringify(post_data),
	headers: {
		'User-Agent': 'Clark Kent',
		'Pragma': 'no-cache',
		'Origin': 'http://dev-2.luckyshops.com',
		'Accept-Encoding': 'gzip, deflate',
		'Accept-Language': 'en-US,en;q=0.8',
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'Accept': '*/*',
		'Cache-Control': 'no-cache',
		'X-Requested-With': 'XMLHttpRequest',
		'Cookie': '__gads=ID=2aa2f84e218cc707:T=1426731349:S=ALNI_MaayXtgy_QgrX4FAU1Zf3_84kXKzQ; _vwo_uuid=F4BD72E7185F6071C695377722DDAE0F; _vis_opt_exp_8_combi=1; sailthru_hid=268b2277de091e9f74046701a6f8e2c654d931df6ca0bd62048b45d6d51333eb95ee03cddc2d7ce68f67a045; _vis_opt_exp_18_combi=2; cn_cm=7; _vis_opt_s=3%7C; _vis_opt_exp_29_combi=2; _vis_opt_exp_29_goal_1=1; _cb_ls=1; _vis_opt_test_cookie=1; s_cc=true; s_fid=6B56B99A834F0FAF-1269B36EFD0DD5EC; _ga=GA1.2.1696345578.1426731351; _ga=GA1.3.1696345578.1426731351; session=78f9e934b0ee3bfd4e9f222f4e023a72; _gat_UA-56476659-2=1; cn_adsqt=%7B%22count%22%3A6%2C%22expire%22%3A1434138054692%7D; cn_adcap=%7B%22count%22%3A1%2C%22expire%22%3A1434064056634%7D; _chartbeat2=BzzT20BKILvnBS9oTW.1432255969109.1434063457438.0000010100000011; __ar_v4=XN6BXTDJFVGSXIWJOVONHB%3A20150526%3A5%7CR5ZNI2O2W5CW7OVS67XO7O%3A20150521%3A21%7C76KOTZEAKNEYTBWDRQUOGV%3A20150521%3A21%7CYK33BAOYKZAJNA4BMSZZ5I%3A20150521%3A15%7CXU24QZIF3NEZJAJMPP6G3J%3A20150603%3A1',
		'Connection': 'keep-alive',
		'Referer': 'http://dev-2.luckyshops.com/'
	}
}


;(function(){

	User.fails = []
	User.limit = limit
	User.rate = rate


	User.prototype.die = function()
	{
		var self = this

		self.alive = false
		self.died()
	}


	User.prototype.send = function()
	{
		var self = this

		var req = request(req_target, req_opts, function(err, res, buf)
		{
			if (res.statusCode !== 200)
				User.fails[ User.fails.length ] = self.id
			// console.log( 'USER '+self.id+' RECEIVED STATUS '+res.statusCode )
		})

		setTimeout(function(){ self.wait() }, rate)
	}


	User.prototype.wait = function()
	{
		var self = this

		if (+Date.now() < self.time + lifespan) {

			self.send()

		} else {

			self.die()

		}
	}


	function User (done)
	{
		if (! done) {
			console.log('User requires a callback.')
			process.exit()
		}

		this.id = Math.random().toString().slice(2)
		this.alive = true
		this.time = +Date.now()
		this.died = done


		var self = this

		process.nextTick(function(){

			self.send()

		})

	}


	module.exports = User

})()
