const http = require('http');
const https = require('https');
const fs = require('fs');
const app = require('./app');
const port = process.env.PORT || 3775;

// Certificate
//const privateKey = fs.readFileSync('/etc/letsencrypt/live/adcon.gq/privkey.pem', 'utf8');
//const certificate = fs.readFileSync('/etc/letsencrypt/live/adcon.gq/cert.pem', 'utf8');
//const ca = fs.readFileSync('/etc/letsencrypt/live/adcon.gq/chain.pem', 'utf8');

//const credentials = {
//	key: privateKey,
//	cert: certificate,
//	ca: ca
//};

const httpServer = http.createServer(app);
//const httpsServer = https.createServer(credentials, app);

//const server = http.createServer(app);
//server.listen(port);

httpServer.listen(3776, () => {
	console.log('HTTP Server running on port 3776');
});

//httpsServer.listen(port, () => {
//	console.log('HTTPS Server running on port 3775');
//});
