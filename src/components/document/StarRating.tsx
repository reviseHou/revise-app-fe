import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useRequest } from '../../hooks/useRequest'
import { ratingApi } from '../../services/api/ratingApi'
import type { RatingSourceType, RatingSummary } from '../../types/rating'
import { formatRating } from '../../utils/format'
import styles from './StarRating.module.css'

const STARS = [1, 2, 3, 4, 5]

interface StarRatingProps {
  sourceType: RatingSourceType
  sourceId: number
}

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5l2.94 5.96 6.56.95-4.75 4.63 1.12 6.54L12 17.5l-5.87 3.08 1.12-6.54L2.5 9.41l6.56-.95L12 2.5z" />
    </svg>
  )
}

function withStar(summary: RatingSummary, star: number | null): RatingSummary {
  const total = summary.average * summary.count - (summary.myStar ?? 0) + (star ?? 0)
  const count = summary.count - (summary.myStar === null ? 0 : 1) + (star === null ? 0 : 1)
  return { average: count ? Math.round((total / count) * 10) / 10 : 0, count, myStar: star }
}

export default function StarRating({ sourceType, sourceId }: StarRatingProps) {
  const key = `rating-${sourceType}-${sourceId}`
  const queryClient = useQueryClient()
  const { data, loading, error, reload } = useRequest(() => ratingApi.summary(sourceType, sourceId), key)
  const [hovered, setHovered] = useState<number | null>(null)
  const [pending, setPending] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const change = async (star: number | null) => {
    if (!data || pending) return
    setPending(true)
    setSubmitError('')
    queryClient.setQueryData([key], withStar(data, star))
    try {
      const next =
        star === null ? await ratingApi.remove(sourceType, sourceId) : await ratingApi.rate(sourceType, sourceId, star)
      queryClient.setQueryData([key], next)
    } catch {
      queryClient.setQueryData([key], data)
      setSubmitError('Không gửi được đánh giá, vui lòng thử lại.')
    } finally {
      setPending(false)
    }
  }

  if (error) {
    return (
      <div className={styles.root} role="alert">
        <span className={styles.summary}>Không tải được đánh giá.</span>
        <button type="button" className={styles.link} onClick={reload}>
          Thử lại
        </button>
      </div>
    )
  }

  const myStar = data?.myStar ?? null
  const shown = hovered ?? myStar ?? 0

  return (
    <div className={styles.root}>
      <div className={styles.stars} role="group" aria-label="Đánh giá" onMouseLeave={() => setHovered(null)}>
        {STARS.map((star) => (
          <button
            key={star}
            type="button"
            className={star <= shown ? `${styles.star} ${styles.filled}` : styles.star}
            onMouseEnter={() => setHovered(star)}
            onFocus={() => setHovered(star)}
            onBlur={() => setHovered(null)}
            onClick={() => change(star === myStar ? null : star)}
            disabled={loading || pending}
            aria-pressed={star === myStar}
            aria-label={star === myStar ? `Bỏ đánh giá ${star} sao` : `Đánh giá ${star} sao`}
            title={star === myStar ? 'Bấm lần nữa để bỏ đánh giá' : `${star} sao`}
          >
            <StarIcon />
          </button>
        ))}
      </div>
      <span className={styles.summary}>
        {loading || !data
          ? 'Đang tải...'
          : data.count > 0
            ? `${formatRating(data.average)} (${data.count} đánh giá)`
            : 'Chưa có đánh giá'}
      </span>
      {myStar !== null && (
        <button type="button" className={styles.link} onClick={() => change(null)} disabled={pending}>
          Xóa
        </button>
      )}
      {submitError && <p className={styles.error}>{submitError}</p>}
    </div>
  )
}
