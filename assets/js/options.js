const API_BASENAME = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

const CARD_PROPERTIES_NAMES = {
 	name: "<strong>Name: </strong>",
 	level: "<strong>LV: </strong>",
 	type: "<strong>Type: </strong>",
 	race: "<strong>Race: </strong>",
 	attribute: "<strong>Attribute: </strong>",
 	archetype: "<strong>Archetype: </strong>",
 	atk: "<strong>ATK: </strong>",
 	def: "<strong>DEF: </strong>",
 	desc: "<strong>Description: </strong>"
 	,
 	
 };

 const LEVELS = [ 1,2,3,4,5,6,7,8,9,10,11,12];

 const RACES = [
 	{ 
 		label : "Monster Cards",
      	options: ['Aqua',
				'Beast',
				'Beast-Warrior',
				'Cyberse',
				'Dinosaur',
				'Divine-Beast',
				'Dragon',
				'Fairy',
				'Fiend',
				'Fish',
				'Insect',
				'Machine',
				'Plant',
				'Psychic',
				'Pyro',
				'Reptile',
				'Rock',
				'Sea Serpent',
				'Spellcaster',
				'Thunder',
				'Warrior',
				'Winged Beast',
				'Wyrm',
				'Zombie']
	},
	{
		label: "Spell Cards",
		options: ['Normal',
				'Field',
				'Equip',
				'Continuous',
				'Quick-Play',
				'Ritual']
	},
	{
		label: "Trap Cards",
		options: ['Normal','Continuous','Counter']
	}                    
 ];

 const TYPES = [
				 {
				 	label: "Main Deck Types",
				 	options: [
				 		'Effect Monster',
				        'Flip Tuner Effect Monster',
				        'Gemini Monster',
				        'Normal Monster',
				        'Normal Tuner Monster',
				        'Pendulum Effect Monster',
				        'Pendulum Flip Effect Monster',
				        'Pendulum Normal Monster',
				        'Flip Effect Monster',
				        'Pendulum Tuner Effect Monster',
				        'Ritual Effect Monster',
				        'Ritual Monster',
				        'Skill Card',
				        'Spell Card',
				        'Spirit Monster',
				        'Toon Monster',
				        'Trap Card',
				        'Tuner Monster',
				        'Union Effect Monster'
				 	]
				 },
				 {
				 	label: "Extra Deck Types",
				 	options: [
						'Fusion Monster', 
						'Link Monster',
				        'Pendulum Effect Fusion Monster', 
				        'Synchro Monster',
				        'Synchro Pendulum Effect Monster',
				        'Synchro Tuner Monster',
				        'XYZ Monster',
				        'XYZ Pendulum Effect Monster'
				    ]
				 }
				 ];

 const ATTRIBUTES = ['Dark','Divine','Earth','Fire','Light','Water','Wind'];

 

