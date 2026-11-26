export function isEditableStatus(status?: string | null) {
  return status === 'PENDING' || status === 'REJECTED'
}
