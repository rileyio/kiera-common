import * as Channel from './channel'
import * as Logger from './logger'
import XRegex from 'xregexp'
/**
 * Splits args at spaces
 *
 * Additional: will remove excess whitespaces to prevent messing up the \s split
 *
 * @export
 * @param {string} msg
 * @returns
 */
export function getArgs(msg: string) {
  return msg.replace(XRegex(`/(?!["][^"]\B)\s+(?![^"]+["]\B)/`, 'g'), ' ').split(/(?!["][^"]\B)\s+(?![^"]+["]\B)/g)
}

export * from './date'
export * from './string-builder'
export * as Secrets from './secrets'
export * as Types from './types'
export * as User from './user'
export * as URL from './url'

export { Channel }
export { Logger }
