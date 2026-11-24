import type { DocumentCategory, DocumentItem, DocumentPayload, DocumentSort } from '../../types/document'
import { http } from '../http/httpClient'

const byNewest = (a: DocumentItem, b: DocumentItem) => b.dateCreated.localeCompare(a.dateCreated)

const approvedOnly = (documents: DocumentItem[]) =>
  documents.filter((document) => document.status === 'ACTIVE').sort(byNewest)

export const documentApi = {
  async listApproved(): Promise<DocumentItem[]> {
    const { data } = await http.get<DocumentItem[]>('/documents')
    return approvedOnly(data)
  },

  async listApprovedBySubject(
    subjectId: number,
    category?: DocumentCategory,
    sort?: DocumentSort,
    year?: string,
  ): Promise<DocumentItem[]> {
    const { data } = await http.get<DocumentItem[]>(`/documents/subject/${subjectId}`, { params: { category, sort, year } })
    return data
  },

  async listByUploader(uploaderId: string): Promise<DocumentItem[]> {
    const { data } = await http.get<DocumentItem[]>(`/documents/author/${uploaderId}`)
    return data.sort(byNewest)
  },

  async get(id: number | string): Promise<DocumentItem> {
    const { data } = await http.get<DocumentItem>(`/documents/${id}`)
    return data
  },

  async create(uploaderId: string, payload: DocumentPayload): Promise<DocumentItem> {
    const { data } = await http.post<DocumentItem>('/documents', { ...payload, uploaderId })
    return data
  },

  async update(id: number | string, payload: DocumentPayload): Promise<DocumentItem> {
    const { data } = await http.patch<DocumentItem>(`/documents/${id}`, payload)
    return data
  },

  async addView(id: number | string): Promise<{ viewCount: number }> {
    const { data } = await http.post<{ viewCount: number }>(`/documents/${id}/views`)
    return data
  },

  async remove(id: number | string): Promise<void> {
    await http.delete(`/documents/${id}`)
  },
}
