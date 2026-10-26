import type { RatingSourceType, RatingSummary } from '../../types/rating'
import { http } from '../http/httpClient'

export const ratingApi = {
  async summary(sourceType: RatingSourceType, sourceId: number): Promise<RatingSummary> {
    const { data } = await http.get<RatingSummary>('/ratings/summary', { params: { sourceType, sourceId } })
    return data
  },

  async rate(sourceType: RatingSourceType, sourceId: number, star: number): Promise<RatingSummary> {
    const { data } = await http.put<RatingSummary>('/ratings', { sourceType, sourceId, star })
    return data
  },

  async remove(sourceType: RatingSourceType, sourceId: number): Promise<RatingSummary> {
    const { data } = await http.delete<RatingSummary>('/ratings', { params: { sourceType, sourceId } })
    return data
  },
}
