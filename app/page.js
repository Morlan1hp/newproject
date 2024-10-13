import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>留学生拯救者联盟</h1>
        <p className={styles.subtitle}>为您的留学之旅保驾护航</p>
        <a href="#services" className={styles.cta}>了解更多</a>
      </section>
      
      <section id="services" className={styles.services}>
        <h2 className={styles.sectionTitle}>拯救项目</h2>
        <div className={styles.grid}>
          <Link href="/professor-ratings" className={`${styles.card} ${styles.cardBorder}`}>
            <h3>教授红黑榜</h3>
            <p>GPA拯救计划</p>
          </Link>
          <Link href="/course-guide" className={`${styles.card} ${styles.cardBorder}`}>
            <h3>水课指南</h3>
            <p>一时摸鱼一时爽，一直摸鱼一直爽</p>
          </Link>
        </div>
      </section>
    </main>
  )
}
