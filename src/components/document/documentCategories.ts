import type { DocumentCategory } from '../../types/document'

export const CATEGORY_LABELS: Record<DocumentCategory, string> = {
  SLIDE: 'Slide bài giảng',
  OUTLINE: 'Đề cương',
  TEXTBOOK: 'Giáo trình',
  EXERCISE: 'Bài tập',
  EXAM: 'Đề thi',
  OTHER: 'Khác',
}

export const DOCUMENT_CATEGORIES = Object.keys(CATEGORY_LABELS) as DocumentCategory[]
