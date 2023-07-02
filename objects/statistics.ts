import { ObjectId } from 'bson'
import * as z from 'zod'

export type BotStatistic = 'commands-routed' | 'commands-completed' | 'commands-invalid' | 'commands-seen'
export type BotStatistics = z.infer<typeof BotStatisticSchema>

export enum ServerStatisticType {
  Message,
  MessageDeleted,
  MessageEdit,
  Reaction,
  ReactionRemoved,
  UserJoined,
  UserLeft,
  UserNicknameChanged,
  CommandSuccess,
  CommandFailure
}

export const BotStatisticSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  name: z.string(),
  uptime: z.number(),
  startTimestamp: z.number(),
  version: z.string(),
  messages: z.object({
    seen: z.number(),
    sent: z.number(),
    tracked: z.number()
  }),
  commands: z.object({
    completed: z.number(),
    invalid: z.number(),
    routed: z.number()
  }),
  users: z.object({
    registered: z.number(),
    total: z.number()
  }),
  servers: z.object({
    total: z.number()
  }),
  discordAPICalls: z.number()
})

/**
 * For User/Server statistics
 *
 * **Type of stats:**
 *   - Messages
 *   - Message Interactions (reactions, etc)
 *
 * **Types of possible reported stats:**
 *   - Time of day pop
 *   - User statistics
 *   - Trends
 *   - Server statistics
 *   - Channel statistics
 *   - Command usage
 * @export
 * @class ServerStatistic
 */
export class ServerStatistic {
  public readonly _id: ObjectId
  public serverID: string
  public userID: string
  public channelID: string
  public type: ServerStatisticType
  // Command Specific
  public command?: {
    name: string
    successful: boolean
  }

  constructor(init: Partial<ServerStatistic>) {
    Object.assign(this, init)
  }
}

export enum StatisticsSettingType {
  // Disables
  ServerDisableStats,
  ServerNonPublicStats,
  UserDisableStats,
  ChannelDisableStats,

  // Enables
  ServerEnableStats,
  UserEnableStats,
  ChannelEnableStats
}

export class StatisticsSetting {
  public readonly _id?: ObjectId
  public userID?: string
  public serverID?: string
  public channelID?: string
  public setting: StatisticsSettingType

  constructor(init: StatisticsSetting) {
    Object.assign(this, init)
  }
}
