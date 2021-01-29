import { OwnerWrap } from "./owner.js";

// const containers = []
const owners = []
export class UnionOwnerWrap extends OwnerWrap {

	add(object) {
		// const container = containers.find(con => con.object == object)
		const owner = owners.find(ow => ow.objects.find(obj => obj == object))

		// if (container) {
		// 	container.owner.del(object.name)
		// 	container.owner = this
		// }
		// else {
		// 	containers.push({ object: object, owner: this })
		// }

		if (owner) {
			if (owner == this) return
			owner.del(object.name)
		}
		else owners.push(this)

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