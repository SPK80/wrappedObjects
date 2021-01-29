
export class ObjectsWatcher {
	#links = []

	contain(object, container) {
		const lnk = this.#links.find((lnk) => { lnk.object == object })
		if (lnk)
			if (lnk.container)
				console.error(`${object.name} alredy contain in ${lnk.container.name}`);
			else
				lnk.container = container
	}

	addObject(obj) {
		this.#links.push({ object: obj, container: undefined })
	}
}