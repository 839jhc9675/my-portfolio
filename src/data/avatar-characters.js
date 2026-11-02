/**
 * 방명록 프로필 캐릭터 목록
 * - DB에는 배열 인덱스(avatar_id)만 저장된다.
 * - 순서를 바꾸면 기존 방명록의 캐릭터가 바뀌므로, 새 캐릭터는 항상 맨 뒤에 추가한다.
 */
export const avatarCharacters = [
  { emoji: '🐻', name: '곰돌이', background: '#FFE0B2' },
  { emoji: '🐰', name: '토끼', background: '#FCE4EC' },
  { emoji: '🦊', name: '여우', background: '#FFCCBC' },
  { emoji: '🐼', name: '판다', background: '#ECEFF1' },
  { emoji: '🐯', name: '호랑이', background: '#FFF3C4' },
  { emoji: '🐸', name: '개구리', background: '#DCEDC8' },
  { emoji: '🐧', name: '펭귄', background: '#D6E4FF' },
  { emoji: '🦄', name: '유니콘', background: '#EDE7F6' },
  { emoji: '🐹', name: '햄스터', background: '#FFE7D6' },
  { emoji: '🤖', name: '로봇', background: '#E0F2F1' },
  { emoji: '👽', name: '외계인', background: '#E8F5E9' },
  { emoji: '🦖', name: '공룡', background: '#E6F4EA' },
  { emoji: '🐱', name: '고양이', background: '#FFF8E1' },
  { emoji: '🐶', name: '강아지', background: '#F3E5D8' },
  { emoji: '🐨', name: '코알라', background: '#E3E8EE' },
  { emoji: '🐳', name: '고래', background: '#D7ECFF' },
];

/**
 * 랜덤 캐릭터 인덱스를 반환한다.
 * @param {number} excludeId - 직전 캐릭터와 겹치지 않게 제외할 인덱스 [Optional]
 * @returns {number}
 */
export function getRandomAvatarId(excludeId) {
  let nextId = Math.floor(Math.random() * avatarCharacters.length);
  if (nextId === excludeId) {
    nextId = (nextId + 1) % avatarCharacters.length;
  }
  return nextId;
}

/**
 * avatar_id로 캐릭터 정보를 찾는다. (범위 밖이면 첫 번째 캐릭터)
 * @param {number} avatarId
 * @returns {{ emoji: string, name: string, background: string }}
 */
export function getAvatarCharacter(avatarId) {
  return avatarCharacters[avatarId] ?? avatarCharacters[0];
}
