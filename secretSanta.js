var twilio = require('twilio');
const twilioAccount = 'AC7b125b9508994c22ab94ef36e967a9ff';
const twilioAuthToken = '147459ed3a042fada2ee8b0fbfad7411';
 
// Find your account sid and auth token in your Twilio account Console.
var client = new twilio(twilioAccount, twilioAuthToken);

var participants = {
	'Ashley':{
		secretSanta:'',
		forbidden:['John','Ashley'],
		phoneNumber: '(917) 747-6153'
	},
	'John':{
		secretSanta:'',
		forbidden:['John','Ashley'],
		phoneNumber: '(917) 886-1351'
	},
	'Ernie':{
		secretSanta:'',
		forbidden:['Cynthia','Ernie'],
		phoneNumber: '(718) 314-3594'
	},
	'Cynthia':{
		secretSanta:'',
		forbidden:['Cynthia','Ernie'],
		phoneNumber: '(646) 468-6427'
	},
	'Tim':{
		secretSanta:'',
		forbidden:['Tim'],
		phoneNumber: '(917) 921-9031'
	},
	'Gary':{
		secretSanta:'',
		forbidden:['Gary'],
		phoneNumber: '(917) 628-7714'
	}
};

var chosenNames = [];

selectSantas();

// Send the text message to everyone.
for (var name in participants) {
	var message = 'Hi '+name+'! Secret Santas have been drawn- you got '+participants[name].secretSanta+'! Keep it secret. Keep it safe. As a reminder there is no minimum, but there IS a maximum of $50. The exchange will happen the night of Friday, Dec. 29th. Please save this text so you remember all this information.';
	client.messages.create({
	  to: participants[name].phoneNumber,
	  from: '(862) 666-3369',
	  body: message 
	}).then((message) => console.log(message.sid));
};

//This might fail sometimes. But most of the times everyone will be properly matched.
function selectSantas(){
	for (var name in participants) {
		var validNames = removeNames(merge(participants[name].forbidden,chosenNames));
		var possibleSecretSanta = validNames[Math.floor(Math.random()*validNames.length)];
		chosenNames.push(possibleSecretSanta);
		participants[name].secretSanta = possibleSecretSanta;
		if(participants[name].secretSanta === undefined){
			selectSantas();
		};
	};
	return participants;
};

function removeNames(forbiddenName){
	var listOfNames = ['Gary','Ashley','John','Ernie','Tim','Cynthia'];
	for (var i = 0; i < forbiddenName.length; i++){
		listOfNames.splice(listOfNames.indexOf(forbiddenName[i]),1);
	};
	return listOfNames;
};

function merge(a, b) {
  var hash = {};
  return a.concat(b).filter(function (val) {
    return hash[val] ? 0 : hash[val] = 1;
  });
};