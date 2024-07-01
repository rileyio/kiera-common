import * as fs from 'fs'
import * as path from 'path'
import * as url from 'url'

import { Logger } from '#utils'
import isDocker from 'is-docker'
import joi from 'joi'

export function read(secretName_: string, logger: Logger.Debug = new Logger.Debug('secrets')) {
  const isInDocker = isDocker()
  const { value, error } = joi
    .string()
    .regex(/^[a-zA-Z0-9_]+$/)
    .validate(secretName_)

  // If error in secrets name, throw
  if (error) return new Error('Non-allowed characters in Secret lookup name', error)

  // Detcted running in docker
  if (isInDocker) logger.log('Detected running in docker.. switching how secrets are read')

  // Inform console which secret is being fetched
  logger.verbose('fetching secret:', value)

  try {
    // Mode: Docker Container
    if (isInDocker) return fs.readFileSync(`/run/secrets/${value}`, 'utf8')

    // Fallback: Local Development
    return fs.readFileSync(path.join(url.fileURLToPath(new URL('.', import.meta.url)), `../../../secrets/${value}`), 'utf8').replaceAll('\n', '')
  } catch (err) {
    if (err.code !== 'ENOENT') logger.error(`An error occurred while trying to read the secret: ${value}. Err: ${err}`)
    else {
      if (isInDocker) logger.debug(`Could not find the secret, probably not running in swarm mode: ${value}. Err: ${err}`)
      else logger.debug(`Could not find the secret, maybe file does not exist? ${value}. Err: ${err}`)

      logger.debug('Trying fallback to .env')
      if (process.env[value]) {
        if (logger) logger.warn(`${value} should be stored as a secret, fallback to .env occurring`)
        return process.env[value]
      }
    }
    return undefined
  }
}
