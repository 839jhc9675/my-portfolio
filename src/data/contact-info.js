/**
 * Contact 섹션에 표시할 연락처 / SNS 정보
 * - 값(이메일·번호·아이디)은 화면에 직접 표시하지 않고, 버튼으로만 연결한다.
 * - copyValue: 복사 버튼을 눌렀을 때 클립보드에 들어갈 값
 */
export const contactItems = [
  {
    id: 'email',
    label: '이메일',
    actionText: '메일 보내기',
    href: 'mailto:839jhc9675@gmail.com',
    copyValue: '839jhc9675@gmail.com',
  },
  {
    id: 'phone',
    label: '전화',
    actionText: '전화 걸기',
    href: 'tel:010-2711-9675',
    copyValue: '010-2711-9675',
  },
];

/**
 * SNS 목록
 * - url이 있으면 새 탭으로 이동
 * - url이 없고 copyValue만 있으면(카카오톡 ID) 클릭 시 복사 + 안내 메시지
 */
export const snsLinks = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/839jhc9675',
    copyValue: 'https://github.com/839jhc9675',
    color: '#24292F',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/h_fe.j/',
    copyValue: 'https://www.instagram.com/h_fe.j/',
    color: '#E1306C',
  },
  {
    id: 'kakao',
    name: 'KakaoTalk',
    copyValue: 'jhc839',
    guide: '카카오톡 ID가 복사되었어요. 카카오톡 > 친구 추가 > ID로 추가에서 붙여넣어 주세요.',
    color: '#3C1E1E',
    background: '#FEE500',
  },
];
