export const ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.ppt', '.pptx']
export const MAX_FILE_MB = 20

export function fileError(file: File): string | undefined {
  const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
  if (!ACCEPTED_EXTENSIONS.includes(extension)) return 'Chỉ hỗ trợ tệp PDF, DOC, DOCX, PPT, PPTX.'
  if (file.size > MAX_FILE_MB * 1024 * 1024) return `Tệp tối đa ${MAX_FILE_MB}MB.`
  return undefined
}
