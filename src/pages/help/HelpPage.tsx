import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Container from '../../components/common/Container'
import Icon from '../../components/common/Icon'
import { MAX_FILE_MB } from '../../components/document/fileRules'
import { HELP_SECTIONS } from '../../routes/paths'
import styles from './HelpPage.module.css'

export default function HelpPage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 })
      return
    }
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <Container width="narrow" className={styles.page}>
      <h1 className={styles.title}>
        <Icon name="list" />
        Hỗ trợ
      </h1>

      <section id={HELP_SECTIONS.guide} className={styles.card}>
        <h2>Hướng dẫn sử dụng</h2>
        <h3>Tìm và đọc tài liệu</h3>
        <ul>
          <li>Vào mục Tài liệu, chọn Khoa → Ngành → Môn học, hoặc gõ tên tài liệu, tên môn vào ô tìm kiếm.</li>
          <li>Trong trang môn học có thể lọc theo loại tài liệu và sắp xếp theo mới nhất, cũ nhất, xem nhiều nhất.</li>
          <li>Tài liệu được xem trực tuyến ngay trên trang. Bấm biểu tượng dấu trang để lưu vào Danh sách đã lưu.</li>
          <li>Một lượt xem được tính khi bạn ở trang tài liệu đủ 5 phút, tối đa một lượt trong 30 phút.</li>
        </ul>
        <h3>Đăng tài liệu</h3>
        <ul>
          <li>Bấm “Tải tài liệu lên”, chọn môn học, loại tài liệu và đính kèm tệp PDF, DOC, DOCX, PPT hoặc PPTX tối đa {MAX_FILE_MB}MB.</li>
          <li>Tài liệu được giảng viên phụ trách khoa duyệt trước khi hiển thị trong thư viện. Theo dõi trạng thái ở Góc của tôi.</li>
          <li>Tài liệu bị từ chối có ghi lý do; bạn có thể chỉnh sửa và gửi duyệt lại. Tài liệu đã duyệt không sửa được, chỉ có thể xóa.</li>
        </ul>
        <h3>Làm và tạo bài kiểm tra</h3>
        <ul>
          <li>Vào mục Bài kiểm tra, chọn môn học rồi chọn bài. Đáp án được lưu tự động khi chọn; hết giờ hệ thống tự nộp bài.</li>
          <li>Sau khi nộp, bạn xem được điểm, câu đúng, câu sai, đáp án đúng và lời giải thích. Muốn làm lại thì bắt đầu lượt mới.</li>
          <li>Bấm “Tạo bài kiểm tra” để soạn câu hỏi trắc nghiệm: mỗi câu từ 2 đến 6 phương án và đúng 1 đáp án đúng. Bài kiểm tra cũng được duyệt trước khi hiển thị.</li>
        </ul>
      </section>

      <section id={HELP_SECTIONS.contact} className={styles.card}>
        <h2>Liên hệ hỗ trợ</h2>
        <p>
          Nếu gặp lỗi hoặc có câu hỏi về việc duyệt tài liệu, bài kiểm tra, hãy liên hệ giảng viên phụ trách khoa của bạn
          hoặc quản trị viên hệ thống ReviseHOU.
        </p>
        {/* TODO: bổ sung email / kênh liên hệ chính thức của nhóm quản trị */}
      </section>

      <section id={HELP_SECTIONS.terms} className={styles.card}>
        <h2>Điều khoản sử dụng</h2>
        <ul>
          <li>Chỉ tài khoản Google có email của trường (tên miền hou.edu.vn) được đăng nhập.</li>
          <li>
            Tài liệu, bài kiểm tra đăng lên phải đúng môn học, đúng định dạng và dung lượng, không trùng lặp, không vi phạm
            bản quyền, nội dung hợp lệ, tiêu đề và mô tả rõ ràng. Nội dung không đạt sẽ bị từ chối kèm lý do.
          </li>
          <li>Không sửa, xóa nội dung của người khác. Bình luận chỉ người viết mới được sửa hoặc xóa.</li>
          <li>Nội dung đã duyệt có thể bị chuyển sang không hoạt động nếu sau đó phát hiện vi phạm.</li>
        </ul>
      </section>

      <section id={HELP_SECTIONS.privacy} className={styles.card}>
        <h2>Chính sách bảo mật</h2>
        <ul>
          <li>Khi đăng nhập, hệ thống lưu email, họ tên và ảnh đại diện từ tài khoản Google của trường.</li>
          <li>
            Hệ thống lưu các nội dung bạn tạo (tài liệu, bài kiểm tra, bình luận, đánh giá) và hoạt động học tập (lượt làm
            bài, điểm, lượt xem tài liệu).
          </li>
          <li>
            Tài liệu, bài kiểm tra đã duyệt, bình luận và đánh giá hiển thị cho người dùng khác kèm tên của bạn. Kết quả làm
            bài chỉ bạn xem được.
          </li>
        </ul>
      </section>
    </Container>
  )
}
