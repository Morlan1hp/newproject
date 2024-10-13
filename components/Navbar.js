import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          留学生拯救者联盟
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li><Link href="/about">关于我们</Link></li>
        <li><Link href="/services">服务项目</Link></li>
        <li><Link href="/contact">联系我们</Link></li>
      </ul>
    </nav>
  )
}