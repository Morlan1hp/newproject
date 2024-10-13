'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import styles from './page.module.css'
import { professors } from '../../../data/professors'

export default function ProfessorDetail() {
  const { name } = useParams()
  const [professor, setProfessor] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [rating, setRating] = useState(0)

  useEffect(() => {
    const prof = professors.find(p => p.name === decodeURIComponent(name))
    setProfessor(prof)
  }, [name])

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (newComment.trim() && rating > 0) {
      const newCommentObj = {
        id: Date.now(),
        content: newComment,
        rating: rating,
        date: new Date().toISOString().split('T')[0]
      }
      setComments([...comments, newCommentObj])
      setNewComment('')
      setRating(0)
    }
  }

  if (!professor) {
    return <div className={styles.loading}>正在加载教授信息...</div>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{professor.name}</h1>
      <div className={styles.professorInfo}>
        <p>校区: {professor.campus}</p>
        <p>部门: {professor.department}</p>
        <p>评分: {professor.rating}</p>
        <p>再次选择: {professor.wouldTakeAgain}</p>
        <p>难度: {professor.levelOfDifficulty}</p>
        <p>评分数: {professor.numOfRatings}</p>
      </div>
      <div className={styles.commentsSection}>
        <h2 className={styles.commentTitle}>学生评价</h2>
        <form onSubmit={handleSubmitComment} className={styles.commentForm}>
          <div className={styles.ratingSelector}>
            <span>你的评分: </span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={rating >= star ? styles.activeRating : ''}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="分享你的课程体验..."
            className={styles.commentInput}
          />
          <button type="submit" className={styles.submitButton}>提交评价</button>
        </form>
        <div className={styles.commentsList}>
          {comments.map(comment => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.commentRating}>
                {'★'.repeat(comment.rating)}{'☆'.repeat(5 - comment.rating)}
              </div>
              <p className={styles.commentContent}>{comment.content}</p>
              <p className={styles.commentDate}>{comment.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}