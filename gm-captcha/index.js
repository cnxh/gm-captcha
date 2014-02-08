
var gm = require('gm'),
dir = __dirname

var options = {
	color: '', // 指定字体颜色 不指定时随机颜色
	width: 100, // captcha图片宽度 单位px
	height: 30, // captcha图片高度 单位px
	stringSet: "abcdhkmnrstuvwxz", // 生成验证码的字符集 注意需要字体文件支持
	stringLength: 4, // captcha字符个数
	stringWidth: 20, // captcha字符宽度  单位px
	font: "comic.ttf", // 字体文件  位于fonts目录下
	fontSize: 35, // 字体大小
	noise: 'laplacian' // 干扰 uniform/gaussian/multiplicative/impulse/laplacian/poisson

}

module.exports = {
	configure: function(config){
		config.color & (options.color = config.color)
		config.width && (options.width = config.width)
		config.height && (options.height = config.height)
		config.stringSet && (options.stringSet = config.stringSet)
		config.stringLength && (options.stringLength = config.stringLength)
		config.stringWidth && (options.stringWidth = config.stringWidth)
		config.font && (options.font = config.font)
		config.fontSize && (options.fontSize = config.fontSize)
		config.noise && (options.noise = config.noise)
	},

	generate: function(req, callback){
		var context = gm(dir + '/base.png')
					.resize(options.width, options.height)
					.font(dir + '/fonts/' + options.font, options.fontSize),
			size = options.stringLength,
			length = options.stringSet.length,
			text = '',
			paddingLeft = (options.width - options.stringWidth * options.stringLength) / 2

		while (size > 0) {
			text += options.stringSet.charAt(Math.floor(Math.random() * length))
			size--
		}
		logger.debug(module)
		for (i = 0; i < text.length; i++) {
			var color = options.color ? options.color : 'rgb(' + Math.floor(Math.random() * 150) + ',' 
					+ Math.floor(Math.random() * 150) + ',' 
					+ Math.floor(Math.random() * 150) + ')'
			context.drawText(paddingLeft + options.stringWidth * (i + (Math.random() - Math.random()) * 0.35), options.height * (1 - 0.2 * Math.random()), text.charAt(i))
			
			context.fill(color)
		}
		context.swirl((Math.random() - Math.random()) * 50)
		options.noise && context.noise(options.noise)

		if (req.session) {
			req.session.captcha = text
		}

		context.toBuffer(callback)

	},

	validate: function(req, input){
		if (!input) {
			input = req.body.captcha;
		}
		if (req.session && (input == req.session.captcha)) {
			req.session.captcha = null;
			return true;
		}
		return false;
	}
	
}