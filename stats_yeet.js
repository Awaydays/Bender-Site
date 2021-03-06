var vue = new Vue({
	el: '#body',
	data: {
		menu_open: false,
		botStats: {
			sharded: false,
			totalUsers: '???',
			totalGuilds: '???',
			shardData: {}
		},
		joe_mama: {
			username: "Joe 🎸",
			id: "246107833295175681",
			discriminator: 7070,
			avatar: null
		},
		dutchman: {
			username: "Mark.",
			id: "391743942070370304",
			discriminator: 9999,
			avatar: null
		}
	},
	methods: {
		getAvatar: (userObject, size = 32) => {
			if (userObject.avatar)
				return `https://cdn.discordapp.com/avatars/${userObject.id}/${userObject.avatar}.${userObject.avatar.startsWith('a_') ? 'gif' : 'png'}?size=${size}`;
			return `https://cdn.discordapp.com/embed/avatars/${userObject.discriminator % 5}.png`;
		},
		ago: function(date) {
			const min = 1000 * 60;
			const hr = min * 60;
			const day = hr * 24;
			const diff = Date.now() - date;

			if (diff >= day)
				return `${Math.floor(diff / day)}d ago`;
			if (diff >= hr)
				return `${Math.floor(diff / hr)}h ago`;
			if (diff >= min)
				return `${Math.floor(diff / min)}h ago`;
			if (diff >= 3000)
				return `${Math.floor(diff / 1000)}s ago`;
			return `just now`;
		}
	}
});

fetch('https://api.benderbot.co/devs').then(response => {
	if (response.ok) {
		response.json().then(obj => {
			vue.joe_mama = obj.joe;
			vue.dutchman = obj.mark;
		}).catch(console.error);
	}
}).catch(console.error);

fetch('https://api.benderbot.co/stats').then(response => {
	if (response.ok) {
		response.json().then(obj => {
			vue.botStats = obj;
		}).catch(console.error);
	}
}).catch(console.error);
