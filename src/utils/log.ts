import process from 'node:process'
import pino from 'pino'

const isDevelopment = process.env.NODE_ENV !== 'production'

const pinoLevelToSeverityLookup = new Map([
	['trace', 'DEBUG'],
	['debug', 'DEBUG'],
	['info', 'INFO'],
	['warn', 'WARNING'],
	['error', 'ERROR'],
	['fatal', 'CRITICAL'],
])

const options: pino.LoggerOptions = {
	base: undefined, // Disable useless fields
	messageKey: 'message', // For Google Cloud Logging
	level: process.env.LOG_LEVEL ?? 'info',
}

if (isDevelopment) {
	options.transport = {
		target: 'pino-pretty',
		options: {
			messageKey: 'message',
			levelFirst: true,
			translateTime: 'SYS: HH:MM:ss.l o',
		},
	}
} else {
	options.formatters = {
		level(label, number) {
			return {
				severity: pinoLevelToSeverityLookup.get(label) ?? 'INFO',
				level: number,
			}
		},
	}

	const interval = setInterval(() => {
		logger.flush()
	}, 10_000)

	interval.unref()
}

const logger = isDevelopment
	? pino(options)
	: pino(options, pino.destination({ minLength: 4096, sync: false }))

export default logger
