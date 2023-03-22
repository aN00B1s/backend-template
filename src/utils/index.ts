import process from 'node:process'
import pg, { type PoolClient } from 'pg'
import pgTx from '@onmoon/pg-tx'

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
