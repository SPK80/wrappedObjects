export const phisics = {
	G: 6.67e-11,
	dt: 0.05,

	collide: function (body1, body2) {
		const r = body2.pos.sub(body1.pos).length;
		const delta = 0;
		//body1.velocity.sub(body2.velocity).length ;
		// console.log(delta);
		return (r - (body1.size + body2.size) < delta);
	},

	motion: function (body) {
		const newPos = body.pos.add(body.velocity.scale(this.dt));
		body.pos.x = newPos.x;
		body.pos.y = newPos.y;
	},

	gravi: function (body1, body2) {
		let fv = body2.pos.sub(body1.pos);
		const r = fv.length;
		fv = fv.scale(1 / r);

		const f = body1.mass * body2.mass / r;
		const dv1 = fv.scale(f / body1.mass * this.dt);
		const v1 = body1.velocity.add(dv1);
		body1.velocity = v1;
	},

	hit: function (body1, body2) {
		//works incorrect..
		const m1 = body1.mass;
		const m2 = body2.mass;
		const v10 = body1.velocity;
		const v20 = body2.velocity;

		const v1 = v20.scale(2 * m2).add(v10.scale(m1 - m2)).scale(1 / (m1 + m2));
		const v2 = v10.scale(2 * m1).add(v20.scale(m2 - m1)).scale(1 / (m1 + m2));

		body1.velocity = v1;
		body2.velocity = v2;
	},
}