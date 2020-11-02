export const phisics = {
	G: 6.67e-11,
	dt: 1,

	collide: function (body1, body2) {
		const r = body2.pos.sub(body1.pos).length;
		const delta = body1.velocity.sub(body2.velocity).length;
		// console.log(delta);
		return (r - (body1.size + body2.size) <= delta);
	},

	motion: function (body) {
		const newPos = body.pos.add(body.velocity.scMul(this.dt));
		body.pos.x = newPos.x;
		body.pos.y = newPos.y;
	},

	gravi: function (body1, body2) {
		const r = body2.pos.sub(body1.pos).length;
		const f = body1.mass * body2.mass / r;
		const dv1 = f / body1.mass * dt;
		body1.velocity.add(dv1);
		const dv2 = f / body2.mass * dt;
		body2.velocity.add(dv2);
	},

	hit: function (body1, body2) {
		//...???
		const m1 = body1.mass;
		const m2 = body2.mass;
		const v10 = body1.velocity;
		const v20 = body2.velocity;

		const v1 = v20.scMul(2 * m2).add(v10.scMul(m1 - m2)).scMul(1 / (m1 + m2));
		const v2 = v10.scMul(2 * m1).add(v20.scMul(m2 - m1)).scMul(1 / (m1 + m2));

		body1.velocity = v1;
		body2.velocity = v2;
	},
}