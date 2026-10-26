import { useState } from 'react'
import { useParams } from 'react-router-dom'
import folder from '../../assets/images/folder-lg.svg'
import Button from '../../components/common/Button'
import CardGrid from '../../components/common/CardGrid'
import Container from '../../components/common/Container'
import Icon from '../../components/common/Icon'
import PageHeader from '../../components/common/PageHeader'
import SelectMenu from '../../components/common/SelectMenu'
import StateView from '../../components/common/StateView'
import DocumentCard from '../../components/document/DocumentCard'
import { CATEGORY_LABELS, DOCUMENT_CATEGORIES } from '../../components/document/documentCategories'
import { usePaged } from '../../hooks/usePaged'
import { useSubjectWith } from '../../hooks/useSubjectWith'
import { PATHS } from '../../routes/paths'
import { documentApi } from '../../services/api/documentApi'
import type { DocumentCategory, DocumentSort } from '../../types/document'
import styles from './SubjectDocumentsPage.module.css'

const SORT_OPTIONS = [
  { value: 'newest' as const, label: 'Mới nhất' },
  { value: 'oldest' as const, label: 'Cũ nhất' },
  { value: 'views' as const, label: 'Xem nhiều nhất' },
]

type CategoryFilter = DocumentCategory | 'ALL'

const CATEGORY_OPTIONS = [
  { value: 'ALL' as const, label: 'Tất cả' },
  ...DOCUMENT_CATEGORIES.map((category) => ({ value: category, label: CATEGORY_LABELS[category] })),
]

const PAGE_SIZE = 12

export default function SubjectDocumentsPage() {
  const subjectId = Number(useParams().subjectId)
  const [category, setCategory] = useState<CategoryFilter>('ALL')
  const [sort, setSort] = useState<DocumentSort>('newest')
  const { data, loading, error, reload } = useSubjectWith(
    subjectId,
    (id) => documentApi.listApprovedBySubject(id, category === 'ALL' ? undefined : category, sort),
    `subject-documents-${category}-${sort}`,
  )
  const subject = data?.subject

  const documents = data?.items ?? []
  const paged = usePaged(documents, PAGE_SIZE)

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Tài liệu' },
          { label: 'Thư viện tài liệu', to: PATHS.documentLibrary },
          { label: subject?.name ?? '...' },
        ]}
        leading={<img src={folder} alt="" width={40} height={40} />}
        title={subject?.name ?? (loading ? 'Đang tải...' : 'Môn học')}
        meta={[
          ...(subject?.major
            ? [{ icon: 'graduation-cap' as const, label: `${subject.major.faculty.name} · ${subject.major.name}` }]
            : []),
          ...(subject?.code ? [{ icon: 'subject-cap' as const, label: subject.code }] : []),
          { icon: 'document-sm', label: `${data?.items.length ?? 0} tài liệu` },
        ]}
        actions={
          subject && (
            <Button to={PATHS.subjectQuizzes(subject.id)}>
              <Icon name="nav-test" />
              Làm bài kiểm tra
              <Icon name="arrow-right" size={16} />
            </Button>
          )
        }
      />
      <Container>
        <div className={styles.toolbar}>
          <SelectMenu label="Sắp xếp" value={sort} options={SORT_OPTIONS} onChange={setSort} />
          <SelectMenu label="Loại tài liệu" value={category} options={CATEGORY_OPTIONS} onChange={setCategory} />
        </div>
        <StateView
          loading={loading}
          error={error}
          onRetry={reload}
          empty={!subject || documents.length === 0}
          emptyText={
            !subject
              ? 'Không tìm thấy môn học.'
              : category === 'ALL'
                ? 'Môn học này chưa có tài liệu nào được duyệt.'
                : 'Môn học này chưa có tài liệu thuộc loại đã chọn.'
          }
        >
          <CardGrid page={paged.page} totalPages={paged.totalPages} onPageChange={paged.setPage}>
            {paged.items.map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </CardGrid>
        </StateView>
      </Container>
    </>
  )
}
