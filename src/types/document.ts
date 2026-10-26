export type DocumentStatus = 'PENDING' | 'ACTIVE' | 'REJECTED' | 'INACTIVE'

export type DocumentCategory = 'SLIDE' | 'OUTLINE' | 'TEXTBOOK' | 'EXERCISE' | 'EXAM' | 'OTHER'

export type DocumentSort = 'newest' | 'oldest' | 'views'

type ActiveStatus = 'ACTIVE' | 'INACTIVE'

export interface Faculty {
  id: number
  code: string
  name: string
  status: ActiveStatus
}

export interface Major {
  id: number
  code: string
  name: string
  status: ActiveStatus
  faculty: Faculty
}

export interface Subject {
  id: number
  code: string
  name: string
  description?: string | null
  status: ActiveStatus
  dateCreated: string
  major?: Major | null
}

interface DocumentUploader {
  id: string
  fullName: string
  avatar?: string | null
}

export interface DocumentItem {
  id: string
  title: string
  description?: string | null
  year?: number | null
  filePath?: string | null
  mediaType?: string | null
  category: DocumentCategory
  status: DocumentStatus
  rejectReason?: string | null
  dateCreated: string
  subject?: Subject | null
  uploader?: DocumentUploader | null
  viewCount?: number
}

export interface DocumentPayload {
  title: string
  description?: string
  year?: number
  filePath?: string
  mediaType?: string
  category: DocumentCategory
  subjectId: number
}

export interface UploadedFile {
  name: string
  url: string
  size: number
  type: string
}
