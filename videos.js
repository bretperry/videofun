const videoData=[
	{
		src:"a_large_rock_waterfall.mp4",
		annotations:[
			{
				className: "intro",
				data: [{start:1, stop:4, content: "Video coding for Newsela!!!"}]
			},
			{
				className: "below",
				data: [{start:5, stop:7, content: "Hello!"}, {start:8, stop:10, content:"This is Bret!"}, {start:10, stop:14, content:"Welcome, friends!"}]
			}
		]
	},{
		src:"octopus_thanked_me.mp4",
		annotations:[
			{
				className: "intro opaque",
				data: [{start:1, stop:4, content: "An octopus thanked somebody?"}]
			},
			{
				className: "notes",
				data: [{start:10, stop:14, content: "Oh no, so sad!"}, {start:50, stop:60, content: "Do you think she's ok?"}, {start:85, stop:88, content:"Hmm, where's she going?"}, {start:115, stop:125, content:"???"},{start:140, stop:150, content:"friends are everywhere!"}]
			},
			{
				className: "intro",
				data: [ {start:74, stop:82, content: "...is it me, or were those annotations basic?"}]
			}
		]
	},{
		src:"summer_flower.mp4",
		annotations:[
			{
				className: "intro",
				data: [{start:1, stop:4, content: "Just some flowers in the sun."} ]
			},
			{
				className: "notes",
				data: [ {start:6, stop:12, content:"You are capable of achieving your dreams!"}]
			}
		]
	},{
		src:"et_the_walrus.mp4",
		annotations:[
			{
				className: "intro",
				data: [{start:1, stop:4, content: "Walruses are capable of some amazing sounds!"} ]
			},
			{
				className: "notes",
				data: [{start:2, stop:4, content: "Speak!"}, {start:4, stop:6, content: "Roar!"}, {start:9, stop:12, content: "Cluck!"}, {start:12, stop:15, content: "Growl..."}, {start:17, stop:19, content: "Sputter!"}, {start:20, stop:23, content: "Grumble."}, {start:25, stop:27, content: "Whistle!"}, {start:28, stop:32, content: "Bell, or bellow? idk!"}]
			},
			{
				className: "upperRight",
				data: [{start:32, stop:35, content: "He's quite charming, no?"} ]
			},
		]
	},{
		src:"sloth_goes_for_a_ride.mp4",
		annotations:[
			{
				className: "intro",
				data: [{start:1, stop:10, content: "A sloth goes for a ride!"} ]
			},
			{
				className: "upperRight",
				data: [{start:55, stop:70, content:"Weeeee!"}, {start:105, stop:115, content:"Hello everyone, I'm back!"}, {start:105, stop:115, content:"What a champ!"}]
			},
			{
				className: "upperRight",
				data: [{start:168, stop:180, content:"Thank you for checking this out!"}, ]
			}
		]
	}
];