import type { CommentSourceType } from './comment'

export type RatingSourceType = CommentSourceType

export interface RatingSummary {
  average: number
  count: number
  myStar: number | null
}
