'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from '../../page.module.css'
import { professors } from '../../../data/professors'

const campuses = ['Mississauga', 'St. George', 'Scarborough']
const departments = ['Economics', 'Biology', 'Geography', 'English', 'Geology', 'Management', 'Mathematics', "Women's Studies", 'Sociology', 'Communication', 'History', 'Psychology', 'Political Science', 'Mechanical Engineering', 'Literature', 'Civil Engineering', 'Engineering', 'Education', 'Classics', 'Science', 'Humanities', 'Biological Sciences', 'Computer & Math. Sciences']

export default function GoodProfessors() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCampus, setSelectedCampus] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [newProfessor, setNewProfessor] = useState({
    name: '',
    campus: '',
    department: '',
    rating: '',
    wouldTakeAgain: '',
    levelOfDifficulty: '',
    numOfRatings: ''
  })
  const [pendingProfessors, setPendingProfessors] = useState([])

  const goodProfessors = [...professors, ...pendingProfessors].filter(prof => 
    prof.rating >= 4.0 &&
    prof.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCampus === '' || prof.campus === selectedCampus) &&
    (selectedDepartment === '' || prof.department === selectedDepartment)
  )

  const ProfessorCard = ({ prof }) => (
    <div className={styles.professorCard}>
      <Link href={`/professor/${encodeURIComponent(prof.name)}`} className={styles.professorLink}>
        <h2>{prof.name}</h2>
      </Link>
      <p>校区: {prof.campus}</p>
      <p>部门: {prof.department}</p>
      <p>评分: <span className={styles.rating}>{prof.rating}</span></p>
      <p>再次选择: {prof.wouldTakeAgain}</p>
      <p>难度: {prof.levelOfDifficulty}</p>
      <p>评分数: {prof.numOfRatings}</p>
    </div>
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewProfessor(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmitNewProfessor = (e) => {
    e.preventDefault()
    setPendingProfessors([...pendingProfessors, newProfessor])
    setShowModal(false)
    setNewProfessor({
      name: '',
      campus: '',
      department: '',
      rating: '',
      wouldTakeAgain: '',
      levelOfDifficulty: '',
      numOfRatings: ''
    })
  }

  const Modal = () => (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>添加新教授数据</h2>
        <form onSubmit={handleSubmitNewProfessor} className={styles.newProfessorForm}>
          <input
            type="text"
            name="name"
            value={newProfessor.name}
            onChange={handleInputChange}
            placeholder="教授姓名"
            required
          />
          <select
            name="campus"
            value={newProfessor.campus}
            onChange={handleInputChange}
            required
          >
            <option value="">选择校区</option>
            {campuses.map(campus => (
              <option key={campus} value={campus}>{campus}</option>
            ))}
          </select>
          <select
            name="department"
            value={newProfessor.department}
            onChange={handleInputChange}
            required
          >
            <option value="">选择部门</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <input
            type="number"
            name="rating"
            value={newProfessor.rating}
            onChange={handleInputChange}
            placeholder="评分 (1-5)"
            min="1"
            max="5"
            step="0.1"
            required
          />
          <input
            type="text"
            name="wouldTakeAgain"
            value={newProfessor.wouldTakeAgain}
            onChange={handleInputChange}
            placeholder="再次选择 (例如: 90%)"
          />
          <input
            type="number"
            name="levelOfDifficulty"
            value={newProfessor.levelOfDifficulty}
            onChange={handleInputChange}
            placeholder="难度 (1-5)"
            min="1"
            max="5"
            step="0.1"
            required
          />
          <input
            type="number"
            name="numOfRatings"
            value={newProfessor.numOfRatings}
            onChange={handleInputChange}
            placeholder="评分数"
            min="0"
            required
          />
          <button type="submit" className={styles.submitButton}>提交新教授数据</button>
        </form>
        <button onClick={() => setShowModal(false)} className={styles.closeButton}>关闭</button>
      </div>
    </div>
  )

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>教授红榜</h1>
      <button onClick={() => setShowModal(true)} className={styles.addProfessorButton}>
        添加新教授数据
      </button>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="搜索教授"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={selectedCampus}
          onChange={(e) => setSelectedCampus(e.target.value)}
          className={styles.select}
        >
          <option value="">所有校区</option>
          {campuses.map(campus => (
            <option key={campus} value={campus}>{campus}</option>
          ))}
        </select>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className={styles.select}
        >
          <option value="">所有部门</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>
      <div className={styles.professorList}>
        {goodProfessors.map(prof => (
          <ProfessorCard key={prof.name} prof={prof} />
        ))}
      </div>
      {pendingProfessors.length > 0 && (
        <div className={styles.pendingProfessors}>
          <h2>待添加教授列表</h2>
          <div className={styles.professorList}>
            {pendingProfessors.filter(prof => prof.rating >= 4.0).map((prof, index) => (
              <ProfessorCard key={index} prof={prof} />
            ))}
          </div>
        </div>
      )}
      {showModal && <Modal />}
    </div>
  )
} 