#gm-captcha v0.0.1

captcha for gm (https://github.com/aheckmann/gm), another node captcha lib.

##demo
![](https://github.com/cnxh/gm-captcha/blob/master/demo.png?raw=true)

##usage
```js
// expressjs controller
var captcha = require('gm-captcha')
captcha: function(req, res) {
	captcha.configure({
		noise: "impulse"
	})
	captcha.generate(req, function(err, buf) {
		res.end(buf)
	})
}
```	




