const PAGE_ACCESS_TOKEN = "EAAFTfNIi9icBAGYMhU3kxSMlDXHZAxlbpPSSSqM4xsrgANoTyVSTHZAEunYSHPVKXndCNN2yatxMW0RsM6cW5yj3sbbCR62opEJdyMqOevOc7ofCklvBKsHwUZAMZBUec24wq31CcQjskZCZBlkqNhEtvb3gxhARNZABGNyLWNpRSr62pIwArqgaaaT4ZCgioSoZD";
const moment = require('moment');
const
  request = require('request'),
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json());

var user = require('./user');

app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

app.post('/webhook', (req, res) => {  
 
    let body = req.body;
  

    if (body.object === 'page') {
  
    
      body.entry.forEach(function(entry) {
  
    
    
        let webhook_event = entry.messaging[0];
        //console.log(webhook_event);
        let sender_psid = webhook_event.sender.id;

        if (webhook_event.message) {
            if (webhook_event.message.quick_reply) {
                console.log('EVENT: ',webhook_event)
                handleQuickReply(sender_psid, webhook_event.message)
              }       
            else if(!webhook_event.message.quick_reply)
                handleMessage(sender_psid, webhook_event.message); 
          } else if (webhook_event.postback) {
            //console.log(webhook_event.postback.payload)
            handlePostback(sender_psid, webhook_event.postback);
          } 
      });
  
    
      res.status(200).send('EVENT_RECEIVED');
    } else {
    
      res.sendStatus(404);
    }
  
  });


app.get('/webhook', (req, res) => {


    let VERIFY_TOKEN = "okok"
      

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
      

    if (mode && token) {
    
    
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        
    
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      
      } else {
    
        res.sendStatus(403);      
      }
    }
  });

// Handles messages events
function handleMessage(sender_psid, received_message) {

    let response;

    // Check if the message contains text
    if (received_message.text) {

        // Create the payload for a basic text message
        response = {
            "text": "How can i help you ?",
            "quick_replies": [
                {
                    "content_type":"text",
                    "title":"Next period 🔻",
                    "payload":"nextPeriod"
                },
                {
                    "content_type":"text",
                    "title":"Prepare 👩‍⚕️",
                    "payload":"prepare"
                }
            ]
        }
    }  
    console.log('salut')
    // Sends the response message
    callSendAPI(sender_psid, response);    
}

function handleQuickReply(sender_psid, received_message) {

    let response;

    if (received_message.quick_reply.payload === 'firstQuickReply') {
        response = {
            "text": "How can i help you ?",
            "quick_replies": [
                {
                    "content_type":"text",
                    "title":"Next period 🔻",
                    "payload":"nextPeriod"
                },
                {
                    "content_type":"text",
                    "title":"Advices 👩‍⚕️",
                    "payload":"advices"
                }
            ]
        }
    }
    
    else if (received_message.quick_reply.payload === 'nextPeriod'){

        let today = moment(new Date());
        let nextPeriodDay = moment(new Date(user.next_cycle)); 
        let days = nextPeriodDay.diff(today, 'days')

        console.log()

        response = {
            "text": `Your period will be in ${days} days and will last ${user.duration} days. Click advices to have some ⬇️`,
            // "text": "What do you want to know ?",
            "quick_replies": [
                {
                    "content_type":"text",
                    "title":"Next period 🔻",
                    "payload":"nextPeriod"
                },
                {
                    "content_type":"text",
                    "title":"Advices 👩‍⚕️",
                    "payload":"advices"
                }
            ]
        }
    }

    else if (received_message.quick_reply.payload === 'advices'){
        if (user.symptoms_prediction.cramp > 40) {
            response = {
                "text": `You probably will have cramps the ${user.symptoms_prediction_date.day} ${user.symptoms_prediction_date.month}. We advise to try one of these things`,
                "quick_replies": [
                    {
                        "content_type":"text",
                        "title":"Apply heat",
                        "payload":"heat"
                    },
                    {
                        "content_type":"text",
                        "title":"Have orgasms",
                        "payload":"orgasms"
                    },
                    {
                        "content_type":"text",
                        "title":"Take aspirin",
                        "payload":"aspirin"
                    },
                    {
                        "content_type":"text",
                        "title":"home remedies",
                        "payload":"remedies"
                    },
                    {
                        "content_type":"text",
                        "title":"↩️",
                        "payload":"firstQuickReply"
                    }
                ]      
            }
        }

    }

    else if (received_message.quick_reply.payload === 'heat') {
        response = {
            "text": "An oft-lauded form of short-term treatment: simply place a hot water bottle or heating pad on your lower back or lower stomach, or take a warm bath for some relief.Try also to rest when needed, and avoid salt, caffeine, tobacco, and alcohol.",
            "quick_replies": [
                {
                    "content_type":"text",
                    "title":"Apply heat",
                    "payload":"heat"
                },
                {
                    "content_type":"text",
                    "title":"Have orgasms",
                    "payload":"orgasms"
                },
                {
                    "content_type":"text",
                    "title":"Take aspirin",
                    "payload":"aspirin"
                },
                {
                    "content_type":"text",
                    "title":"home remedies",
                    "payload":"remedies"
                },
                {
                    "content_type":"text",
                    "title":"↩️",
                    "payload":"firstQuickReply"
                }
            ]  

        }
    }

    else if (received_message.quick_reply.payload === 'orgasms') {
        response = {
            "text": "To top off the list of home remedies, orgasms have also been reported to alleviate menstrual cramps. Orgasms cause the body to release oxytocin and dopamine, as well as various other cramp-fighting endorphins.",
            "quick_replies": [
                {
                    "content_type":"text",
                    "title":"Apply heat",
                    "payload":"heat"
                },
                {
                    "content_type":"text",
                    "title":"Have orgasms",
                    "payload":"orgasms"
                },
                {
                    "content_type":"text",
                    "title":"Take aspirin",
                    "payload":"aspirin"
                },
                {
                    "content_type":"text",
                    "title":"home remedies",
                    "payload":"remedies"
                },
                {
                    "content_type":"text",
                    "title":"↩️",
                    "payload":"firstQuickReply"
                }
            ]  

        }
    }

    else if (received_message.quick_reply.payload === 'aspirin') {
        response = {
            "text": "For mild menstrual cramps, take aspirin or another nonsteroidal anti-inflammatory drug, such as ibuprofen or naproxen. These types of drugs prevent pain by blocking prostaglandins from being released. NSAIDs work best when taken early in the menstrual cycle, as soon as you notice symptoms of dysmenorrhea, or even one to two days before your cycle begins. You should only need to take them for a day or two, as cramps typically subside on their own. Avoid this type of medication if you have stomach problems, such as ulcers.",
            "quick_replies": [
                {
                    "content_type":"text",
                    "title":"Apply heat",
                    "payload":"heat"
                },
                {
                    "content_type":"text",
                    "title":"Have orgasms",
                    "payload":"orgasms"
                },
                {
                    "content_type":"text",
                    "title":"Take aspirin",
                    "payload":"aspirin"
                },
                {
                    "content_type":"text",
                    "title":"home remedies",
                    "payload":"remedies"
                },
                {
                    "content_type":"text",
                    "title":"↩️",
                    "payload":"firstQuickReply"
                }
            ]  

        }
    }

    else if (received_message.quick_reply.payload === 'remedies') {
        response = {
            "text": "There are innumerable home remedies and suggestions for alleviating period cramps. Some alternative treatments include taking Vitamin B, or magnesium supplements, or the use of acupuncture, yoga, and regular exercise. Use of various herbal and dietary supplements has garnered mixed scientific reviews, but some women swear by their supplements of ginger, fennel, or Vitamin E – so if you discover a remedy that works for you, enjoy! ",
            "quick_replies": [
                {
                    "content_type":"text",
                    "title":"Apply heat",
                    "payload":"heat"
                },
                {
                    "content_type":"text",
                    "title":"Have orgasms",
                    "payload":"orgasms"
                },
                {
                    "content_type":"text",
                    "title":"Take aspirin",
                    "payload":"aspirin"
                },
                {
                    "content_type":"text",
                    "title":"home remedies",
                    "payload":"remedies"
                },
                {
                    "content_type":"text",
                    "title":"↩️",
                    "payload":"firstQuickReply"
                }
            ]  

        }
    }

    callSendAPI(sender_psid, response);    
}
  
// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
     if (received_postback.payload === "getStarted") {
         console.log("ok")
         response = {
            "attachment":{
                "type":"image", 
                "payload":{
                  "url":"https://media.giphy.com/media/75yYfqYy5tmHm/giphy.gif", 
                  "is_reusable":true
                }
            },
            "quick_replies":[
              {
                "content_type":"text",
                "title":"let's go !",
                "payload":"firstQuickReply"
              }
            ]
         }
     }
    //  if (received_postback.payload === "firstQuickReply") {
    //      console.log('ok ok ok')
    //     response = {
    //        "text": "Okay let go "
    //     }
    // }
     callSendAPI(sender_psid, response);    
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": response
    }
  
    // Send the HTTP request to the Messenger Platform
    request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
        console.log('message sent!')
      } else {
        console.error("Unable to send message:" + err);
      }
    }); 
}