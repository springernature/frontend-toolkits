/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */

import autoComplete from '../js/index.js';

const showResults = results => {
	// Update UI with results returned from server, e.g.

	const resultsContainer = document.createElement('div');
	resultsContainer.className = 'c-results-container';
	resultsContainer.setAttribute('role', 'listbox');

	// Assuming results is an array
	if (results.length === 0) {
		results.push('No results');
	}
	results.forEach(datum => {
		const result = document.createElement('div');
		result.textContent = datum;
		result.tabIndex = 0; // So you can focus/tab through the results
		result.className = 'c-results-container__result';
		result.setAttribute('role', 'option');
		resultsContainer.appendChild(result);
	});
	document.querySelector('[data-component-autocomplete]').insertAdjacentElement('afterend', resultsContainer);
};

const onSelect = result => {
	// Update UI with selected result
	document.querySelector('[data-component-autocomplete]').value = result;
};

const onError = error => {
	// Update UI with error state
	// Optionally call myAutoComplete.disable();
};

const args = {
	selector: '[data-component-autocomplete]',
	onSelect: onSelect,
	searchError: onError,
	endpoint: 'autocomplete?q=',
	timeout: 2000,		// OPTIONAL: Set a timeout for the fetch request, onError will be called if fetch request timeouts, default is 2000
	minChars: 1,		// OPTIONAL: Minimum characters to be typed before request is sent, default is 0
	inputDelay: 300,	// OPTIONAL: Delay between keypress and request being sent, default is 300
	headers: {
		Accept: 'application/json; version=2'
	},
	resultsContainerSelector: '.c-results-container',
	resultSelector: '.c-results-container__result',
	resultsCallBack: showResults,
	selectOnSuggestionBrowsing: true,
	selectOnTab: false
};

const myAutoComplete = autoComplete(args);

/* End example. Code below is just for this demo */

//  the following code hacks window.fetch for local demoimg
const response = {
	status: 200,
	ok: true,
	json: () => {
		const term = window.lastQuery.replace(args.endpoint, '').toLowerCase();
		return animalsList.filter(animal => animal.toLowerCase().includes(term));
	}
};

window.fetch = (endpointAndTerm) => {
	window.lastQuery = endpointAndTerm;
	return Promise.resolve(response);
};

document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('#searchForm button').style.display = 'none';
});

myAutoComplete.enable();

const animalsList = [
	'Aardvark',
	'Aardwolf',
	'African buffalo',
	'African elephant',
	'African leopard',
	'Albatross',
	'Alligator',
	'Alpaca',
	'American buffalo (bison)',
	'American robin',
	'Amphibian',
	'Anaconda',
	'Angelfish',
	'Anglerfish',
	'Ant',
	'Anteater',
	'Antelope',
	'Antlion',
	'Ape',
	'Aphid',
	'Arabian leopard',
	'Arctic Fox',
	'Arctic Wolf',
	'Armadillo',
	'Arrow crab',
	'Asp',
	'Ass (donkey)',
	'Baboon',
	'Badger',
	'Bald eagle',
	'Bali cattle',
	'Bandicoot',
	'Barnacle',
	'Barracuda',
	'Basilisk',
	'Bass',
	'Bat',
	'Beaked whale',
	'Bear',
	'Beaver',
	'Bedbug',
	'Bee',
	'Beetle',
	'Bird',
	'Bison',
	'Black panther',
	'Black widow spider',
	'Blackbird',
	'Blue bird',
	'Blue jay',
	'Blue whale',
	'Boa',
	'Boar',
	'Bobcat',
	'Bobolink',
	'Bonobo',
	'Booby',
	'Bovid',
	'Box jellyfish',
	'Buffalo, African',
	'Buffalo, American (bison)',
	'Bug',
	'Butterfly',
	'Buzzard',
	'Camel',
	'Canid',
	'Cape buffalo',
	'Capybara',
	'Cardinal',
	'Caribou',
	'Carp',
	'Cat',
	'Caterpillar',
	'Catfish',
	'Catshark',
	'Cattle',
	'Centipede',
	'Cephalopod',
	'Chameleon',
	'Cheetah',
	'Chickadee',
	'Chicken',
	'Chimpanzee',
	'Chinchilla',
	'Chipmunk',
	'Cicada',
	'Clam',
	'Clownfish',
	'Cobra',
	'Cockroach',
	'Cod',
	'Condor',
	'Constrictor',
	'Coral',
	'Cougar',
	'Cow',
	'Coyote',
	'Crab',
	'Crane fly',
	'Crane',
	'Crawdad',
	'Crayfish',
	'Cricket',
	'Crocodile',
	'Crow',
	'Cuckoo',
	'Damselfly',
	'Deer',
	'Dingo',
	'Dinosaur',
	'Dog',
	'Dolphin',
	'Donkey',
	'Dormouse',
	'Dove',
	'Dragon',
	'Dragonfly',
	'Duck breeds',
	'Duck',
	'Dung beetle',
	'Eagle',
	'Earthworm',
	'Earwig',
	'Echidna',
	'Eel',
	'Egret',
	'Elephant seal',
	'Elephant',
	'Elk',
	'Emu',
	'English pointer',
	'Ermine',
	'Falcon',
	'Ferret',
	'Finch',
	'Firefly',
	'Fish',
	'Flamingo',
	'Flea',
	'Fly',
	'Flyingfish',
	'Fowl',
	'Fox',
	'Frog',
	'Fruit bat',
	'Galliform',
	'Gamefowl',
	'Gayal',
	'Gazelle',
	'Gecko',
	'Gerbil',
	'Giant panda',
	'Giant squid',
	'Gibbon',
	'Gila monster',
	'Giraffe',
	'Goat',
	'Goldfish',
	'Goose',
	'Gopher',
	'Gorilla',
	'Grasshopper',
	'Great blue heron',
	'Great white shark',
	'Grizzly bear',
	'Ground shark',
	'Ground sloth',
	'Grouse',
	'Guan',
	'Guanaco',
	'Guinea pig',
	'Guineafowl',
	'Gull',
	'Guppy',
	'Guppy',
	'Haddock',
	'Halibut',
	'Hammerhead shark',
	'Hamster',
	'Hare',
	'Harrier',
	'Hawk',
	'Hedgehog',
	'Hermit crab',
	'Heron',
	'Herring',
	'Hippopotamus',
	'Hookworm',
	'Hornet',
	'Horse',
	'Hoverfly',
	'Hummingbird',
	'Humpback whale',
	'Hyena',
	'Iguana',
	'Impala',
	'Irukandji jellyfish',
	'Jackal',
	'Jaguar',
	'Jay',
	'Jellyfish',
	'Junglefowl',
	'Kangaroo mouse',
	'Kangaroo rat',
	'Kangaroo',
	'Kingfisher',
	'Kite',
	'Kiwi',
	'Koala',
	'Koi',
	'Komodo dragon',
	'Krill',
	'Lab rat',
	'Ladybug',
	'Lamprey',
	'Land snail',
	'Landfowl',
	'Lark',
	'Leech',
	'Lemming',
	'Lemur',
	'Leopard',
	'Leopon',
	'Limpet',
	'Lion',
	'Lizard',
	'Llama',
	'Llama',
	'Lobster',
	'Locust',
	'Loon',
	'Louse',
	'Lungfish',
	'Lynx',
	'Macaw',
	'Mackerel',
	'Magpie',
	'Mammal',
	'Manatee',
	'Mandrill',
	'Manta ray',
	'Marlin',
	'Marmoset',
	'Marmot',
	'Marsupial',
	'Marten',
	'Mastodon',
	'Meadowlark',
	'Meerkat',
	'Mink',
	'Minnow',
	'Mite',
	'Mockingbird',
	'Mole',
	'Mollusk',
	'Mongoose',
	'Monitor lizard',
	'Monkey',
	'Moose',
	'Mosquito',
	'Moth',
	'Mountain goat',
	'Mouse',
	'Mule',
	'Muskox',
	'Narwhal',
	'Newt',
	'Nightingale',
	'Ocelot',
	'Octopus',
	'Opossum',
	'Orangutan',
	'Orca',
	'Ostrich',
	'Otter',
	'Owl',
	'Ox',
	'Panda',
	'Panther',
	'Panthera hybrid',
	'Parakeet',
	'Parrot',
	'Parrotfish',
	'Partridge',
	'Peacock',
	'Peafowl',
	'Pelican',
	'Penguin',
	'Perch',
	'Peregrine falcon',
	'Pheasant',
	'Pig',
	'Pigeon',
	'Pike',
	'Pilot whale',
	'Pinniped',
	'Piranha',
	'Planarian',
	'Platypus',
	'Polar bear',
	'Pony',
	'Porcupine',
	'Porpoise',
	'Portuguese man o\' war',
	'Possum',
	'Prairie dog',
	'Prawn',
	'Praying mantis',
	'Primate',
	'Ptarmigan',
	'Puffin',
	'Puma',
	'Python',
	'Quail',
	'Quelea',
	'Quokka',
	'Rabbit',
	'Raccoon',
	'Rainbow trout',
	'Rat',
	'Rattlesnake',
	'Raven',
	'Red panda',
	'Reindeer',
	'Reptile',
	'Rhinoceros',
	'Right whale',
	'Ringneck dove',
	'Roadrunner',
	'Rodent',
	'Rook',
	'Rooster',
	'Roundworm',
	'Saber-toothed cat',
	'Sailfish',
	'Salamander',
	'Salmon',
	'Sawfish',
	'Scale insect',
	'Scallop',
	'Scorpion',
	'Sea lion',
	'Sea slug',
	'Sea snail',
	'Seahorse',
	'Shark',
	'Sheep breeds',
	'Sheep',
	'Shrew',
	'Shrimp',
	'Siamese fighting fish',
	'Silkworm',
	'Silverfish',
	'Skink',
	'Skunk',
	'Sloth',
	'Slug',
	'Smelt',
	'Snail',
	'Snake',
	'Snipe',
	'Snow leopard',
	'Society finch',
	'Sockeye salmon',
	'Sole',
	'Spacecat',
	'Sparrow',
	'Sperm whale',
	'Spider monkey',
	'Spider',
	'Spoonbill',
	'Squid',
	'Squirrel',
	'Star-nosed mole',
	'Starfish',
	'Steelhead trout',
	'Stingray',
	'Stoat',
	'Stork',
	'Sturgeon',
	'Sugar glider',
	'Swallow',
	'Swan',
	'Swift',
	'Swordfish',
	'Swordtail',
	'Tahr',
	'Takin',
	'Tapir',
	'Tarantula',
	'Tarsier',
	'Tasmanian devil',
	'Termite',
	'Tern',
	'Thrush',
	'Tick',
	'Tiger shark',
	'Tiger',
	'Tiglon',
	'Toad',
	'Tortoise',
	'Toucan',
	'Trapdoor spider',
	'Tree frog',
	'Trout',
	'Tuna',
	'Turkey breeds',
	'Turkey',
	'Turtle',
	'Tyrannosaurus',
	'Urial',
	'Vampire bat',
	'Vampire squid',
	'Vicuna',
	'Viper',
	'Vole',
	'Vulture',
	'Wallaby',
	'Walrus',
	'Warbler',
	'Wasp',
	'Water Boa',
	'Water buffalo',
	'Weasel',
	'Whale',
	'Whippet',
	'Whitefish',
	'Whooping crane',
	'Wildcat',
	'Wildebeest',
	'Wildfowl',
	'Wolf',
	'Wolverine',
	'Wombat',
	'Woodpecker',
	'Worm',
	'Wren',
	'X-ray fish',
	'Xerinae',
	'Yak',
	'Yellow perch',
	'Zebra finch',
	'Zebra'
];
