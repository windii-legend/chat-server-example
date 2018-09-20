const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const pusherConfig = require('./pusher.json');
const pusherClient = new Pusher(pusherConfig);

const app = express();
app.use(bodyParser.json());

app.put('/users', function(req, res) {
  console.log('ユーザが参加しました:' + req.params.name);
  pusherClient.trigger('chat_channel', 'join', {
    name: req.body.name
  });
  res.sendStatus(204);
});

app.delete('/users', function(req, res) {
  console.log('ユーザが退出しました:' + req.params.name);
  pusherClient.trigger('chat_channel', 'part', {
    name: req.body.name
  });
  res.sendStatus(204);
});

app.post('/messages', function(req, res){
  console.log('ユーザ：' + req.body.name + 'メッセージ: ' + req.body.message);
  pusherClient.trigger('chat_channel', 'message', {
    name: req.body.name,
    message: req.body.message
  });
  res.sendStatus(204);
});

app.listen(4000, function() {
  console.log('App listening on port 4000');
});
