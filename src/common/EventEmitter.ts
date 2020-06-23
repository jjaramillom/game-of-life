export default {
	events: {},
	dispatch: function (event: any, data: any) {
		if (!(this.events as any)[event]) return;
		(this.events as any)[event].forEach((callback: Function) => callback(data));
	},
	subscribe: function (event: any, callback: Function) {
		if (!(this.events as any)[event]) (this.events as any)[event] = [];
		(this.events as any)[event].push(callback);
	},
};
