import { Link as RouterLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import PageContainer from '../components/PageContainer'
import SectionCard from '../components/SectionCard'
import ContactSection from '../components/contact/contact-section'

function Home() {
  return (
    <PageContainer>
      <SectionCard
        id="hero"
        label="01 · HERO"
        title="Hero"
        description="여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다."
        highlight
      />

      <SectionCard
        id="about"
        label="02 · ABOUT ME"
        title="About Me"
        description="여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다."
      >
        <Button component={RouterLink} to="/about" variant="contained" size="large">
          더 알아보기
        </Button>
      </SectionCard>

      <SectionCard
        id="skills"
        label="03 · SKILL TREE"
        title="Skill Tree"
        description="여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다."
      />

      <SectionCard
        id="projects"
        label="04 · PROJECTS"
        title="Projects"
        description="여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다."
      >
        <Button component={RouterLink} to="/projects" variant="outlined" size="large">
          더 보기
        </Button>
      </SectionCard>

      <SectionCard
        id="contact"
        label="05 · CONTACT"
        title="Contact"
        description="함께 이야기 나누고 싶으시다면 언제든 연락주세요. 방명록에 응원 한마디를 남겨주셔도 좋아요!"
      >
        <ContactSection />
      </SectionCard>
    </PageContainer>
  )
}

export default Home
