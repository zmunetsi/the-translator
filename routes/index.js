var express = require('express');
var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');
var uuidV4 = require('uuid/v4');


var router = express.Router();

/**
* TextToSpeechV1 instance
*/
var textToSpeech = new TextToSpeechV1 ({
  username: 'b93b8886-8573-4c0b-91ed-021bbb126113',
  password: 'q1yYjKVFtYBu'
});

   /* GET home page. */
   router.get('/', function(req, res, next) {
     res.render('index')
   });

   router.post('/voice', function(req, res, next) {

     var text = req.body.text;

     var path = uuidV4();
     var params = {
       text: text,
       voice: 'en-US_LisaVoice', // Optional voice
       accept: 'audio/wav'
     };

     textToSpeech
       .synthesize(params, function(err, audio) {
         if (err) {
           console.log(err);
           return;
         }
         textToSpeech.repairWavHeader(audio);
         fs.writeFileSync('public/audio/'+path+'.wav', audio);
         res.render('index',{path: path})
     });

      });


module.exports = router;
