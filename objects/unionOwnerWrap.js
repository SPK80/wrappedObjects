import { OwnerWrap } from "./owner.js";

const containers = []
export class UnionOwnerWrap extends OwnerWrap {

	add(object) {
		const container = containers.find(con => con.object == object)
		if (container) {
			container.owner.del(object.name)
			container.owner = this
		}
		else {
			containers.push({ object: object, owner: this })
		}
		this.add(object)
	}

	del(name) {
		this.del(name)
		const i = containers.indexOf(con => con.object.name == object.name)
		if (i >= 0) {
			delete containers[i]
		}
	}

}