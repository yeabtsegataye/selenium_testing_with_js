const env = require('dotenv').config()
const capability = {
	"browserName": "Chrome",
	"browserVersion": "120.0",
    "headless": true,
	"LT:Options": {
		"username": "tatitaye0",
		"accessKey": process.env.key,
		"platformName": "Windows 10",
		"project": "Untitled",
        "headless": true,
		"w3c": true,
		"plugin": "node_js-node_js"
	}
}
module.exports = {capability}