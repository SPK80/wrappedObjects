import { Object } from "./object.js";
import { ListeningNode } from "./objectWrap.js";

export class TestNode extends ListeningNode {
	constructor(name) {

		super(new OwnerObject(name),
			(sender, type, args) => {
				console.log(args);
				console.log(`Event: ${type} from ${sender.name}`, ...args);
			});

		this.object.listen(
			(sender, type, args) => {
				console.log(`Event: ${type} from ${sender.name}`, ...args);
				//if (type == 'ForAll') {
				this.objects.forEach(obj => {
					obj.act('TestAct', args.slice())
				});
			}
		);

	}
}

class OwnerObject extends Object {
	act(action, args) {
		// super.act(action, args);

		console.log(`Act: ${action} from ${this.name}`, ...args);
		if (action == 'OwnerAct') {
			this._callEvent(action, args);
			//setTimeout(() => { this._callEvent('TestEvent', args.slice().push(2000)) }, 2000)

		}
	}
}

