import { useEffect, useState } from 'react'
import { documentApi } from '../services/api/documentApi'

const VIEW_AFTER_MS = 5 * 60_000

export function useDocumentView(documentId: number | undefined, initialCount: number | undefined) {
  const [counted, setCounted] = useState<{ documentId: number; viewCount: number }>()

  useEffect(() => {
    if (documentId === undefined) return
    let remaining = VIEW_AFTER_MS
    let startedAt = 0
    let timer: ReturnType<typeof setTimeout> | undefined

    const pause = () => {
      if (timer === undefined) return
      clearTimeout(timer)
      timer = undefined
      remaining -= Date.now() - startedAt
    }

    const resume = () => {
      if (timer !== undefined || document.visibilityState !== 'visible') return
      startedAt = Date.now()
      timer = setTimeout(() => {
        document.removeEventListener('visibilitychange', onVisibilityChange)
        documentApi
          .addView(documentId)
          .then((result) => setCounted({ documentId, viewCount: result.viewCount }))
          .catch(() => undefined)
      }, remaining)
    }

    const onVisibilityChange = () => (document.visibilityState === 'visible' ? resume() : pause())

    document.addEventListener('visibilitychange', onVisibilityChange)
    resume()
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      if (timer !== undefined) clearTimeout(timer)
    }
  }, [documentId])

  return counted && counted.documentId === documentId ? counted.viewCount : initialCount
}
