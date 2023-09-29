import * as z from 'zod'

import { ObjectId } from 'bson'

export type TrackedBotSetting = z.infer<typeof TrackedBotSettingSchema>

export const TrackedBotSettingSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  added: z.number(),
  author: z.string(),
  description: z.string().optional(),
  env: z.string().optional(),
  key: z.union([z.string(), z.instanceof(RegExp).refine((v) => v.toString().startsWith('/'), { message: 'Must be a RegExp literal' })]),
  updated: z.number(),
  value: z.any()
})
