import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CharacterAvatar from './character-avatar';
import { getAvatarCharacter, getRandomAvatarId } from '../../data/avatar-characters';

const MESSAGE_MAX = 500;
const KEYWORD_MAX = 20;

const colorOptions = [
  '#3283FD', '#406CDC', '#03C75A', '#F4361E', '#FF9F0A',
  '#FFD60A', '#AF52DE', '#FF6B9D', '#00C7BE', '#1F1F1F',
];

const emojiOptions = ['😀', '🥰', '👍', '🎉', '🔥', '✨', '💙', '🙌', '😎', '🚀'];

const initialForm = {
  authorName: '',
  message: '',
  email: '',
  phone: '',
  instagram: '',
  favoriteColor: '',
  keyword: '',
  emoji: '',
  rating: null,
};

/** 입력값 검증 - 에러 메시지 객체 반환 (비어 있으면 통과) */
function validate(form) {
  const errors = {};
  if (!form.authorName.trim()) errors.authorName = '이름을 입력해주세요.';
  if (!form.message.trim()) errors.message = '메시지를 입력해주세요.';
  if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) {
    errors.email = '이메일 형식이 올바르지 않습니다.';
  }
  if (form.phone && !/^[0-9+\- ]+$/.test(form.phone.trim())) {
    errors.phone = '숫자와 - 만 입력해주세요.';
  }
  return errors;
}

/** 빈 문자열은 null로 바꿔 DB에 저장 */
const toNullable = (value) => (value.trim() ? value.trim() : null);

/** 선택형 칩(색상/이모지) 공통 스타일 */
const pickerSx = (isSelected) => ({
  width: 36,
  height: 36,
  display: 'grid',
  placeItems: 'center',
  p: 0,
  cursor: 'pointer',
  borderRadius: 2,
  fontSize: '1.2rem',
  border: isSelected ? '2px solid var(--color-accent)' : '1px solid var(--color-border-subtle)',
  bgcolor: isSelected
    ? 'color-mix(in srgb, var(--color-accent) 12%, var(--color-bg-primary))'
    : 'var(--color-bg-primary)',
  transform: isSelected ? 'scale(1.08)' : 'none',
  transition: 'all 0.15s ease',
});

/** 필드 소제목 스타일 */
const fieldLabelSx = {
  mb: 1,
  fontSize: '0.85rem',
  fontWeight: 700,
  color: 'var(--color-text-secondary)',
};

/**
 * GuestbookForm 컴포넌트 - 방명록 작성 폼
 *
 * Props:
 * @param {function} onSubmit - 작성 데이터(DB 컬럼 형식)를 받아 저장하는 비동기 함수 [Required]
 *
 * Example usage:
 * <GuestbookForm onSubmit={ addEntry } />
 */
function GuestbookForm({ onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [avatarId, setAvatarId] = useState(() => getRandomAvatarId());
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const character = getAvatarCharacter(avatarId);

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleValue = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: prev[field] === value ? '' : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.email || nextErrors.phone) setIsContactOpen(true);
      return;
    }

    setIsSubmitting(true);
    setResult(null);
    try {
      await onSubmit({
        author_name: form.authorName.trim(),
        message: form.message.trim(),
        email: toNullable(form.email),
        phone: toNullable(form.phone),
        instagram: toNullable(form.instagram.replace(/^@/, '')),
        favorite_color: form.favoriteColor || null,
        keyword: toNullable(form.keyword),
        emoji: form.emoji || null,
        rating: form.rating,
        avatar_id: avatarId,
      });
      setForm(initialForm);
      setIsContactOpen(false);
      setAvatarId((prev) => getRandomAvatarId(prev));
      setResult({ type: 'success', text: '방명록이 등록되었어요. 감사합니다! 💙' });
    } catch {
      setResult({ type: 'error', text: '등록에 실패했어요. 잠시 후 다시 시도해주세요.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={ handleSubmit }
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 4,
        bgcolor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border-subtle)',
        // 입력창 포커스 색상을 파란색 계열로
        '& .MuiOutlinedInput-root': { bgcolor: 'var(--color-bg-primary)' },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--color-accent)',
        },
        '& .MuiInputLabel-root.Mui-focused': { color: 'var(--color-accent)' },
      }}
    >
      {/* 프로필 캐릭터 미리보기 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <CharacterAvatar avatarId={ avatarId } size={ 56 } ringColor={ form.favoriteColor || undefined } />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
            오늘의 프로필은 { character.name } { character.emoji }
          </Box>
          <Box sx={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            이름 대신 랜덤 캐릭터로 표시돼요
          </Box>
        </Box>
        <ButtonBase
          aria-label="캐릭터 다시 뽑기"
          onClick={ () => setAvatarId((prev) => getRandomAvatarId(prev)) }
          sx={{
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.25,
            px: 1,
            py: 0.75,
            borderRadius: 2,
            color: 'var(--color-accent)',
            transition: 'background-color 0.2s ease',
            '&:hover': {
              bgcolor: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
            },
            '&:hover .guestbook-form__dice': { transform: 'rotate(90deg)' },
          }}
        >
          <CasinoRoundedIcon
            className="guestbook-form__dice"
            sx={{ transition: 'transform 0.3s ease' }}
          />
          <Box component="span" sx={{ fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
            다시 뽑기
          </Box>
        </ButtonBase>
      </Box>

      <Grid container spacing={ 2 }>
        <Grid size={{ xs: 12 }}>
          <TextField
            label="이름"
            required
            fullWidth
            value={ form.authorName }
            onChange={ updateField('authorName') }
            error={ Boolean(errors.authorName) }
            helperText={ errors.authorName ?? '이름은 공개되지 않아요' }
            slotProps={{ htmlInput: { maxLength: 30 } }}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            label="메시지"
            required
            fullWidth
            multiline
            minRows={ 3 }
            value={ form.message }
            onChange={ updateField('message') }
            error={ Boolean(errors.message) }
            helperText={ errors.message ?? `${form.message.length} / ${MESSAGE_MAX}` }
            placeholder="자유롭게 응원이나 인사를 남겨주세요!"
            slotProps={{ htmlInput: { maxLength: MESSAGE_MAX } }}
          />
        </Grid>

        {/* 재미있는 정보 */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="한마디 키워드"
            fullWidth
            value={ form.keyword }
            onChange={ updateField('keyword') }
            placeholder="예) 열정, 화이팅"
            helperText={ `${form.keyword.length} / ${KEYWORD_MAX}` }
            slotProps={{ htmlInput: { maxLength: KEYWORD_MAX } }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={ fieldLabelSx }>별점 평가</Box>
          <Rating
            value={ form.rating }
            onChange={ (_, value) => setForm((prev) => ({ ...prev, rating: value })) }
            size="large"
            sx={{ '& .MuiRating-iconFilled': { color: 'var(--color-accent)' } }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={ fieldLabelSx }>좋아하는 색깔</Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            { colorOptions.map((color) => (
              <Box
                key={ color }
                component="button"
                type="button"
                aria-label={ `색상 ${color}` }
                aria-pressed={ form.favoriteColor === color }
                onClick={ () => toggleValue('favoriteColor', color) }
                sx={{
                  ...pickerSx(form.favoriteColor === color),
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  bgcolor: color,
                  boxShadow: form.favoriteColor === color
                    ? `0 0 0 2px var(--color-bg-secondary), 0 0 0 4px ${color}`
                    : 'none',
                  border: '1px solid var(--color-border-subtle)',
                }}
              />
            )) }
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={ fieldLabelSx }>이모지 선택</Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            { emojiOptions.map((emoji) => (
              <Box
                key={ emoji }
                component="button"
                type="button"
                aria-label={ `이모지 ${emoji}` }
                aria-pressed={ form.emoji === emoji }
                onClick={ () => toggleValue('emoji', emoji) }
                sx={ pickerSx(form.emoji === emoji) }
              >
                { emoji }
              </Box>
            )) }
          </Box>
        </Grid>

        {/* 연락처 (선택, 비공개) */}
        <Grid size={{ xs: 12 }}>
          <Button
            type="button"
            onClick={ () => setIsContactOpen((prev) => !prev) }
            startIcon={ <LockRoundedIcon /> }
            endIcon={
              <ExpandMoreRoundedIcon
                sx={{ transform: isContactOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
              />
            }
            sx={{ color: 'var(--color-text-secondary)', px: 1 }}
          >
            연락처 남기기 (선택 · 비공개)
          </Button>
          <Collapse in={ isContactOpen }>
            <Grid container spacing={ 2 } sx={{ pt: 2 }}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  label="이메일"
                  type="email"
                  fullWidth
                  value={ form.email }
                  onChange={ updateField('email') }
                  error={ Boolean(errors.email) }
                  helperText={ errors.email }
                  slotProps={{ htmlInput: { maxLength: 100 } }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  label="전화번호"
                  type="tel"
                  fullWidth
                  value={ form.phone }
                  onChange={ updateField('phone') }
                  error={ Boolean(errors.phone) }
                  helperText={ errors.phone }
                  slotProps={{ htmlInput: { maxLength: 20 } }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  label="인스타그램"
                  fullWidth
                  value={ form.instagram }
                  onChange={ updateField('instagram') }
                  placeholder="@아이디"
                  slotProps={{ htmlInput: { maxLength: 40 } }}
                />
              </Grid>
            </Grid>
          </Collapse>
        </Grid>

        <Grid size={{ xs: 12 }}>
          { result && (
            <Alert severity={ result.type } sx={{ mb: 2 }} onClose={ () => setResult(null) }>
              { result.text }
            </Alert>
          ) }
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={ isSubmitting }
            endIcon={ <SendRoundedIcon /> }
            sx={{
              py: 1.5,
              borderRadius: 3,
              boxShadow: 'none',
              background: 'linear-gradient(135deg, var(--color-accent), var(--color-secondary))',
              '&:hover': {
                boxShadow: '0 6px 16px color-mix(in srgb, var(--color-accent) 35%, transparent)',
                background: 'linear-gradient(135deg, var(--color-accent), var(--color-secondary))',
              },
            }}
          >
            { isSubmitting ? '등록 중...' : '방명록 남기기' }
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GuestbookForm;
