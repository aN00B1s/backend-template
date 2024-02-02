import 'source-map-support/register.js'
import * as queries from '#src/app.queries'
import { db } from '#src/utils/core'
import logger from '#src/utils/log'

const [user] = await queries.getUser.run({ id: 1 }, db)

if (!user) {
	throw new Error('User not found')
}

logger.info(user.id, 'user information')
