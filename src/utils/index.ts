import process from 'node:process'
import pg, { type PoolClient } from 'pg'
import pgTx from '@onmoon/pg-tx'

if (!process.env.POSTGRES_URL) {
	throw new Error('POSTGRES_URL env is not set')
}

export const db = new pg.Pool({
	connectionString: process.env.POSTGRES_URL,
	max: 50,
	allowExitOnIdle: true,
})

export async function sleep(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}

export async function tx<T>(
	callback: (db: PoolClient) => Promise<T>,
): Promise<T> {
	return pgTx(db, callback)
}

export function isFulfilled<T>(
	value: PromiseSettledResult<T>,
): value is PromiseFulfilledResult<T> {
	return value.status === 'fulfilled'
}

export function splitArrayIntoChunks<T>(array: T[], chunkSize: number): T[][] {
	const chunks: T[][] = []
	for (let i = 0; i < array.length; i += chunkSize) {
		chunks.push(array.slice(i, i + chunkSize))
	}

	return chunks
}
