// @ts-nocheck
import { JSONPreset } from 'lowdb/node'
import { json } from '@sveltejs/kit';

const defaultLt = [["f1", null], ["f1", null], ["f1", null], ["f1", null], ["f1", null]]

const layout = [
	[...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt],
	[...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt],
	[...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt],
	[...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt],
	[...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt],

	[...defaultLt, ["f1", "t8"], ["f2", null], ["f1", "h1"], ["f1", "fl1"], ["w1", null], ...defaultLt],
	[...defaultLt, ["f1", "t2"], ["f2", null], ["w1", null], ["f1", "t1"] , ["f2", null], ...defaultLt],
	[...defaultLt, ["f1", "t5"], ["w1", null], ["w1", null], ["w1", null] , ["w1", null], ...defaultLt],
	[...defaultLt, ["f1", "r2"], ["f1", "r1"], ["f1", null], ["f1", null] , ["f1", null], ...defaultLt],
	[...defaultLt, ["f1", null], ["f1", null], ["f1", "r4"], ["v1", null] , ["f1", "g2"], ...defaultLt],
	
	[...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt],
	[...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt],
	[...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt],
	[...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt],
	[...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt, ...defaultLt]
  ]

const db = await JSONPreset('db.json', { FOREST: layout })    
await db.read()
await db.write()

export function GET() {
	return json(db.data.FOREST);
}

export async function POST({ request, cookies }) {
	const data = await request.json();

	const { type } = data

	switch (type) {
		case "getBlock":
			return json(db.data.FOREST[data.row][data.col]);
			break;
		case "putBlock":
			db.data.FOREST[data.row][data.col] = data.block
			await db.write()
			return json({row: data.row, col: data.col, result:db.data.FOREST[data.row][data.col]});
			break;
		default:
			return json(db.data.FOREST);
			break;
	}

}
