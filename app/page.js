'use client'

import { useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  const [showProfessorOptions, setShowProfessorOptions] = useState(false)

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>留学生拯救者联盟</h1>
        <p className={styles.subtitle}>为您的留学之旅保驾护航</p>
        <a 
          href="https://map.utoronto.ca/?id=1809#!ct/45469?s/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.cta}
        >
          UofT地图
        </a>
      </section>
      
      <section id="services" className={styles.services}>
        <h2 className={styles.sectionTitle}>拯救项目</h2>
        <div className={styles.grid}>
          <div 
            className={`${styles.card} ${styles.cardBorder}`}
            onClick={() => setShowProfessorOptions(true)}
          >
            <h3>教授红黑榜</h3>
            <p>GPA拯救计划</p>
          </div>
          <Link href="/course-guide" className={`${styles.card} ${styles.cardBorder}`}>
            <h3>水课指南</h3>
            <p>一时摸鱼一时爽，一直摸鱼一直爽</p>
          </Link>
        </div>
      </section>

      {showProfessorOptions && (
        <div className={styles.modalOverlay} onClick={() => setShowProfessorOptions(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h2>选择榜单</h2>
            <div className={styles.optionsContainer}>
              <Link href="/professor-ratings/good" className={styles.optionButton}>
                <span className={styles.redText}>红榜</span>
                <p>优秀教授推荐</p>
              </Link>
              <Link href="/professor-ratings/bad" className={styles.optionButton}>
                <span className={styles.blackText}>黑榜</span>
                <p>谨慎选择教授</p>
              </Link>
            </div>
            <button 
              onClick={() => setShowProfessorOptions(false)}
              className={styles.closeButton}
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
