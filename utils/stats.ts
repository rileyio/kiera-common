import { Bot } from '#/index'

export async function fetchUserCounts(Bot: Bot) {
  let totalUsers = 0
  let totalRegistered = 0

  totalUsers = [...Bot.client.guilds.cache.values()].map((g) => g.memberCount).reduce((prev, cur) => (cur += prev))

  // Get total registered to the bot
  totalRegistered = await Bot.DB.count('users', {})

  return {
    registered: totalRegistered,
    total: totalUsers
  }
}

export async function fetchGuildStats(Bot: Bot) {
  return {
    total: Bot.client.guilds.cache.size
  }
}
