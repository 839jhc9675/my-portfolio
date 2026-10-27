import PageContainer from '../components/PageContainer'
import SectionCard from '../components/SectionCard'

function About() {
  return (
    <PageContainer>
      <SectionCard
        label="ABOUT ME"
        title="About Me"
        description="About Me 페이지가 개발될 공간입니다. 상세한 자기소개가 들어갈 예정입니다."
        highlight
      />
    </PageContainer>
  )
}

export default About
