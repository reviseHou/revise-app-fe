import type { DocumentCategory } from '../../types/document'
import { CATEGORY_LABELS } from './documentCategories'
import styles from './CategoryTag.module.css'

export default function CategoryTag({ category, className }: { category: DocumentCategory; className?: string }) {
  return (
    <span className={[styles.tag, className].filter(Boolean).join(' ')}>
      {CATEGORY_LABELS[category] ?? CATEGORY_LABELS.OTHER}
    </span>
  )
}
