import * as queries from '#src/app.queries'
import logger from '#src/utils/log'
import { db } from '#src/utils/core'

const [user] = await queries.getUser.run({ id: 41 }, db)

if (!user) {
	throw new Error('User not found')
}

logger.info(user.id, 'user information')
