// Content can only be edited before approval; once approved (ACTIVE, or hidden afterwards as INACTIVE) it can only be deleted.
export function isEditableStatus(status?: string | null) {
  return status === 'PENDING' || status === 'REJECTED'
}
