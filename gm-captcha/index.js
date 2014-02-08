
var gm = require('gm'),
dir = __dirname

var options = {
	color: '', // font color, random defalut
	width: 100, // image's width (px)
	height: 30, // image's height (px)
	stringSet: "abcdhkmnrstuvwxz", // char sets
	stringLength: 4, // char number
	stringWidth: 20, // width of each char (px)
	font: "comic.ttf", // font file
	fontSize: 35, // font size
	noise: 'laplacian' // noise: uniform/gaussian/multiplicative/impulse/laplacian/poisson

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