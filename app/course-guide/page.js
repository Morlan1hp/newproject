'use client'

import { useState, useEffect } from 'react'
import styles from '../page.module.css'

const courses = [
  { code: 'SDS279', name: 'Queer Popular Culture', description: '没有任何考试的文化课', br: 'BR5' },
  { code: 'NFS284', name: '简单易懂的营养学课', description: '多大比较有争议的"水课"之一 对于life science专业的小伙伴比较友好 需要些许知识学起来容易一些 test还是有难度的 时间很短 题量很大 不过都是选择题 可能有时候给分不太友好 不过及格还是无压力的', br: 'BR4' },
  { code: 'ARC181', name: '建筑学入门课', description: '一节还不太popular的水课 midterm 只有十道选择题 去年的ta说只要考了就能拿到 15% 同时还可以额外写annotate reading 去扣分 据说加分无上限 syllabus不要太友好 光attendance (lec+tut) 就有25%剩下的50%是2个assignment 其中一个assignment就是 annotated reading 大概每周读几篇reading 然后投票要写 notes (超简比考final强) 没final!! 特别适合想靠水课提高GPA的朋友', br: 'BR3' },
  { code: 'ANT253', name: 'Language & Society', description: '非常贴近生活，有很多关于方言、俚语等内容', br: 'BR2' },
  { code: 'AST101', name: '太阳和它的周边天体', description: '这门课的内容主要包括：我们在宇宙中的位置。我们在天空中看到的现象。我们对太阳、行星和彗星以及太阳系的形成的了解，以及我们是如何知道的。是什么让行星适合生命。找出最近的恒星和它们的行星。本课程面向没有科学或工程背景的学生。', br: 'BR5' },
  { code: 'AST201', name: '恒星与星系', description: '这门课的内容主要包括：我们对恒星、星系和宇宙本身的性质和生命周期的了解—以及我们是如何知道的。天文学家如何开发方法来理解跨越如此广泛的距离和时间范围的现象。本课程面向没有科学或工程背景的学生。', br: 'BR5' },
  { code: 'PHL245', name: '现代符号逻辑', description: '这门课有小伙伴反映很简单，但这并不意味着你不需要付出任何努力。这门课需要你应该能够在解释每一行的同时相当迅速地处理逻辑证明。这门课学的是句子和谓语逻辑。', br: 'BR2' },
  { code: 'PHL237', name: '中国儒家道家等', description: '有一篇essay要写，挺有意思', br: 'BR2' },
  { code: 'RLG106', name: '探讨幸福的概念', description: '', br: 'BR2' },
  { code: 'ECO105', name: '经济学原理', description: '比起101和102要简单 更偏文科 针对非经济spe的学生', br: 'BR3' },
  { code: 'MGT100', name: '商科入门', description: '是其他100或者200课程的缩影', br: 'BR3' },
  { code: 'GRGR252H1', name: '开公司的时候店面地理位置会有什么影响', description: '', br: 'BR3' },
  { code: 'ENG100H1', name: '英语写作', description: '拿分容易 内容不难', br: 'BR1' },
  { code: 'HIS280', name: '中华上下五千年历史', description: '被放在一门课里 用西方视角看 非常有意思!!!', br: 'BR3' },
  { code: 'FSL100', name: '初学者法语', description: '法语零基础就能上 基本就是带着大家学法语的基本语法', br: 'BR1' },
  { code: 'SPA101', name: '西班牙语入门', description: '考试和作文题目都很简单', br: 'BR1' },
  { code: 'CIN105Y1', name: '电影课', description: 'lecture是专门看电影', br: 'BR1' },
  { code: 'MUS110H1', name: '音乐课', description: '需要一定乐理基础就能上 整体课程难度不大', br: 'BR1' },
  { code: 'ENG100H1', name: '英语写作', description: '考核60%都是paper得分 对于过庆考试的同学是个福音', br: 'BR1' },
  { code: 'HPS100H1', name: 'Introduction to History and Philosophy of Science', description: '多大最水的课，没有之一。全程online，Tut去了举个手就5%，project 重点突出态度认真，学理工的老师也不难为大🔥。考试开卷，答案全在slide 里面。我之前选的是Cory Lewis，说话声音很磁性🧲😂。', br: 'BR5' },
  { code: 'ANT253H1', name: 'Language & Society', description: '这门课的内容是直接出自教科书的，所以难度不大。此外，这门课多年来考试很少，只有期中考试。', br: 'BR2' },
  { code: 'HPS100H1', name: 'Introduction to History and Philosophy of Science', description: '这门课一直都是在线课程。每节课时长1小时，共11节课。每周需要的阅读量是大约10-20页。通过练习往年的考试试题，这门课程很容易通过。', br: 'BR5' },
  { code: 'CSC104H1', name: 'Computational Thinking', description: '这门课涉及的主要是计算机编程的基础入门知识。而且这门课不需要不需要你有任何基础，只要认真上课，很容易拿A。', br: 'BR5' },
  { code: 'GGR252H1', name: 'Marketing Geography', description: '这是一门关于地理的非常简单的课程，对学生的评分都很高。如果你对地理感兴趣，完全可以作为选修课。', br: 'BR3' },
  { code: 'PSYA01', name: 'Introductory Psychology: Part I', description: '对于许多生命科学专业的学生来说，这门课程是必修课，也是GPA的起点。本课程涉及与心理学相关的所有内容，你将在满足自然科学广度要求的过程中获得很多乐趣。', br: 'BR4' },
  { code: 'EESA06', name: 'Introduction to Planet Earth', description: '这门课是从地质环境中让你了解自然资源的重要性以及世界面临的环境问题。该课程的考核由期中和期末考试及海报作业组成。', br: 'BR5' },
  { code: 'PSYB10', name: 'Introduction to Social Psychology', description: '这门课将让你爱上心理学，它将带你了解社会心理的广泛知识。它会让你对他人的行为、感受或想法有更深的理解。这门课除了考试还有小论文作为最终考核。', br: 'BR2' },
  { code: 'MDSA01', name: 'Introduction to Media Studies', description: '这门课涉及媒体和传媒的基础研究。通过全世界各种信息，你将获得处理信息和传递信息的重要能力。这门课主要通过线上的期中和期末考试评分。', br: 'BR1' },
  { code: 'LIN204', name: 'English Grammer 1', description: '这门课是英语语法最基础的知识。不仅简单，还可以巩固语法，对未来的英文写作非常有帮助。当然，课程拿分也很容易。', br: 'BR1' },
  { code: 'CHI100', name: 'Introduction Chinese 1', description: '这是一门中文入门课，对当地人来说都是一门简单的课程，更何况是留学生了。当然如果有得选，中国的留学生还是尽量选择其他的选修课吧', br: 'BR1' },
  { code: 'MAT133', name: '商业微积分与线性代数', description: 'MAT 133中的内容比MAT134、MAT135和MAT137容易得多，因为它不包括三角函数。此外，这门课的考试也被简化了，所以很容易通过拿高分。', br: 'BR5' },
  { code: 'PHL145', name: 'Critical reasoning', description: '本课程教你逻辑和批判性推理的知识。在本课程中，你将有两个期中考试、一个期末考试和一次作业。仅根据所学的解析图表，就可以解决课程中的大部分问题，考试也很容易通过', br: 'BR2' },
  { code: 'CSC300', name: 'Computers & Society', description: '这是一节非常水的课（至少在我学的那个学期很水，我最终成绩99分，班上均分A-👍），lecture、tut和final都是在线上进行的。分数构成也很简单，4 assignments + tut participation + take-home exam。上课会有录屏，slides也全都在Quercus上。', br: 'BR4' },
  { code: 'EAS120', name: '现代标准日语', description: '本课程是为那些没有或非常有限的日语背景的人设计的。本课程旨在培养学生听、说、读、写的基本技能，并提供相关的文化信息。', br: 'BR1' },
  { code: 'EAS110', name: '现代标准韩语', description: '本课程是为那些没有韩语背景的人设计的。本课程旨在培养学生听、说、读、写的基本技能，并提供相关的文化信息。', br: 'BR1' },
  { code: 'FSL100', name: '初学者法语', description: '本课程是为那些之前没有接受过法语培训，并希望对这门语言进行强化的、实用的介绍的人而设计的。它提供基本的、全面的法语书面语和口语培训。注册本课程的学生必须注册辅导课。', br: 'BR1' },
  { code: 'EAS103', name: '前现代东亚', description: '此课程通过聚焦中国、日本和韩国1600年前的历史研究特定历史主题。是东亚研究专业、主修和辅修学生的必修课程。', br: 'BR3' },
  { code: 'ECO105', name: '经济学原理', description: 'ECO105是一门专门给除经济major和specialist准备的课程。是一门年课，修了这门课程就相当于直接拿到1.0的BR3的学分了！他主要学习基本的微观和宏观经济学知识。如果在高中学过经济的小伙伴，千万不要错过他。', br: 'BR3' },
  { code: 'PHY205', name: '日常生活中的物理学', description: '介绍日常生活中的物理学。这门概念课程着眼于日常物品，以了解我们现代技术世界的基础。主题可能包括从汽车到天气的任何内容。', br: 'BR5' },
  { code: 'MAT133', name: '商业微积分与线性代数', description: '这门课包括：金融数学。矩阵和线性方程。微积分复习；应用程序。积分与基本定理；应用程序。偏微分导论；应用程序。MAT133是一门基础数学课，对于数学是长项的同学来说，这门课是很好的选择。', br: 'BR5' },
  { code: 'SPA100', name: '初学者西班牙语', description: '为初学者介绍西班牙语：概述基本语法结构，词汇发展和口头和书面表达。', br: 'BR1' },
  { code: 'EAS256', name: '中国文学（先秦至唐）', description: '课程主要是对中国前现代文学主要作品的综述，包括从先秦到唐朝(公元前11世纪至公元10世纪)的诗歌、散文和短篇叙事。', br: 'BR1' },
]

const brCategories = ['BR1', 'BR2', 'BR3', 'BR4', 'BR5']

export default function CourseGuide() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBR, setSelectedBR] = useState('')
  const [filteredCourses, setFilteredCourses] = useState(courses)
  const [comments, setComments] = useState({})
  const [newComment, setNewComment] = useState('')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showAddCourseModal, setShowAddCourseModal] = useState(false)
  const [newCourse, setNewCourse] = useState({ code: '', name: '', description: '', br: '' })
  const [pendingCourses, setPendingCourses] = useState([])

  useEffect(() => {
    const filtered = [...courses, ...pendingCourses].filter(course => 
      (course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
       course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       course.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedBR === '' || course.br === selectedBR)
    )
    setFilteredCourses(filtered)
  }, [searchTerm, selectedBR, pendingCourses])

  const handleCommentSubmit = (courseCode) => {
    if (newComment.trim() !== '') {
      setComments(prevComments => ({
        ...prevComments,
        [courseCode]: [...(prevComments[courseCode] || []), newComment]
      }))
      setNewComment('')
    }
  }

  const handleAddCourse = (e) => {
    e.preventDefault()
    setPendingCourses([...pendingCourses, newCourse])
    setNewCourse({ code: '', name: '', description: '', br: '' })
    setShowAddCourseModal(false)
  }

  const CourseCard = ({ course }) => (
    <div 
      className={`${styles.courseCard} ${styles.fadeIn}`}
      onClick={() => setSelectedCourse(course.code)}
    >
      <h2>{course.code}: {course.name}</h2>
      <p>{course.description}</p>
      <span className={`${styles.brTag} ${styles[course.br.toLowerCase()]}`}>{course.br}</span>
    </div>
  )

  const CommentModal = () => {
    if (!selectedCourse) return null;
    
    const course = [...courses, ...pendingCourses].find(c => c.code === selectedCourse);
    if (!course) return null;

    return (
      <div className={styles.modalOverlay} onClick={() => setSelectedCourse(null)}>
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
          <h2>{course.name} 的评论</h2>
          <div className={styles.commentList}>
            {(comments[selectedCourse] || []).map((comment, index) => (
              <p key={index} className={styles.comment}>{comment}</p>
            ))}
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="添加新评论"
            className={styles.commentInput}
          />
          <button 
            onClick={() => handleCommentSubmit(selectedCourse)}
            className={styles.submitButton}
          >
            提交评论
          </button>
          <button 
            onClick={() => setSelectedCourse(null)}
            className={styles.closeButton}
          >
            关闭
          </button>
        </div>
      </div>
    )
  }

  const AddCourseModal = () => (
    <div className={styles.modalOverlay} onClick={() => setShowAddCourseModal(false)}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2>添加新水课</h2>
        <form onSubmit={handleAddCourse}>
          <input
            type="text"
            placeholder="课程代码"
            value={newCourse.code}
            onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="课程名称"
            value={newCourse.name}
            onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
            required
          />
          <textarea
            placeholder="课程介绍"
            value={newCourse.description}
            onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
            required
          />
          <select
            value={newCourse.br}
            onChange={(e) => setNewCourse({...newCourse, br: e.target.value})}
            required
          >
            <option value="">选择 BR 类别</option>
            {brCategories.map(br => (
              <option key={br} value={br}>{br}</option>
            ))}
          </select>
          <button type="submit" className={styles.submitButton}>提交新水课</button>
        </form>
      </div>
    </div>
  )

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>水课指南</h1>
        <p className={styles.subtitle}>轻松选课，快乐学习</p>
      </div>
      <button 
        onClick={() => setShowAddCourseModal(true)}
        className={styles.addCourseButton}
      >
        添加新水课
      </button>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="搜索课程"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={selectedBR}
          onChange={(e) => setSelectedBR(e.target.value)}
          className={styles.select}
        >
          <option value="">所有 BR 类别</option>
          {brCategories.map(br => (
            <option key={br} value={br}>{br}</option>
          ))}
        </select>
      </div>
      <div className={styles.courseList}>
        {filteredCourses.map((course) => (
          <CourseCard key={course.code} course={course} />
        ))}
      </div>
      {pendingCourses.length > 0 && (
        <div className={styles.pendingCourses}>
          <h2>待添加水课列表</h2>
          <div className={styles.courseList}>
            {pendingCourses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        </div>
      )}
      {selectedCourse && <CommentModal />}
      {showAddCourseModal && <AddCourseModal />}
    </div>
  )
}