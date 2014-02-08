#gm-captcha v0.0.1

captcha for gm (https://github.com/aheckmann/gm), another node captcha lib.

"session" and "gm" are required before using the gm-captcha

##demo
![](https://github.com/cnxh/gm-captcha/blob/master/demo.png?raw=true)

##usage
```js
// expressjs controller
var captcha = require('gm-captcha')
// show the captcha img
captcha: function(req, res) {
	captcha.configure({
		noise: "impulse"
	})
	captcha.generate(req, function(err, buf) {
		res.end(buf)
	})
}
// validation
somethingOther: function(req, res) {
	var userInput = req.body.captcha
	if(captcha.validate(req, userInput)){
		console.log("pass")
	} else {
		console.log("not pass")
	}
}
```	




