/**
 * Server
 */
const express = require('express');
const PORT = process.env.PORT || 4321;
const INDEX = '/index.html';

const server = express()
	.use((req, res) => res.sendFile(INDEX, { root: __dirname }))
	.listen(PORT, () => console.log(`Listening on ${PORT}`));

/**
 * UUID
 */
const { v4 } = require('uuid');

/**
 * Websocket
 */
const { Server } = require('ws');
const wss = new Server({ server });

wss.on('connection', (ws) => {
	console.log('Client connected');
	ws.uuid = v4();
	ws.on('message', function incoming(data) {
		console.log(data);
		wss.clients.forEach(function each(client) {
			//only send if two different clients connected
			// if (client !== ws) {
			console.log("sending data");
			client.send(data)
			// }
		});
	});
	ws.on('close', () => console.log('Client disconnected'));
});