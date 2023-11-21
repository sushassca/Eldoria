/** @type {import('@sveltejs/adapter-vercel').Config} */
export const config = {
	runtime: 'edge'
};


// @ts-nocheck
import { Low } from 'lowdb'
import { JSONFile, JSONPreset } from 'lowdb/node'
import { json } from '@sveltejs/kit';




const layout = [
	[["f1", null],["f1", null],["f1", null],["f1", null],["f1", null]],
	[["f1", null],["f1", null],["f1", null],["f1", null],["f1", null]],
	[["f1", null],["f1", null],["f1", null],["f1", null],["f1", null]],
	[["f1", null],["f1", null],["f1", null],["f1", null],["f1", null]],
	[["f1", null],["f1", null],["f1", null],["f1", null],["f1", null]],
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
			console.log("update");
			return json(db.data.FOREST[data.row][data.col]);
			break;
		default:
			return json(db.data.FOREST);
			break;
	}

}
