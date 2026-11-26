import { Link } from 'react-router-dom'
import logoWhite from '../../assets/images/logo-white.svg'
import { HELP_SECTIONS, PATHS } from '../../routes/paths'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <img src={logoWhite} alt="Revise HOU" width={221} height={40} />
          <p>Nền tảng ôn tập tài liệu và kiểm tra kiến thức dành cho sinh viên.</p>
        </div>
        <div className={styles.columns}>
          <div className={styles.column}>
            <h2>Học tập</h2>
            <Link to={PATHS.documentLibrary}>Tài liệu ôn tập</Link>
            <Link to={PATHS.quizLibrary}>Bài kiểm tra</Link>
            <Link to={`${PATHS.help}#${HELP_SECTIONS.guide}`}>Hướng dẫn sử dụng</Link>
          </div>
          <div className={styles.column}>
            <h2>Hỗ trợ</h2>
            <Link to={`${PATHS.help}#${HELP_SECTIONS.contact}`}>Liên hệ hỗ trợ</Link>
            <Link to={`${PATHS.help}#${HELP_SECTIONS.terms}`}>Điều khoản sử dụng</Link>
            <Link to={`${PATHS.help}#${HELP_SECTIONS.privacy}`}>Chính sách bảo mật</Link>
          </div>
        </div>
      </div>
      <p className={styles.copyright}>© 2026 Revise HOU · All rights reserved</p>
    </footer>
  )
}
