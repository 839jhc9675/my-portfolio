import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import CopyButton from '../ui/copy-button';

const iconMap = {
  email: EmailRoundedIcon,
  phone: PhoneIphoneRoundedIcon,
};

/**
 * ContactInfoCard 컴포넌트 - 이메일/전화 연결 버튼 카드 + 복사 버튼
 * (연락처 값은 화면에 표시하지 않고, 클릭 시 메일/전화 앱으로 바로 연결)
 *
 * Props:
 * @param {Array<{ id: string, label: string, actionText: string, href: string, copyValue: string }>} items - 연락처 목록 [Required]
 *
 * Example usage:
 * <ContactInfoCard items={ contactItems } />
 */
function ContactInfoCard({ items }) {
  return (
    <Grid container spacing={ 2 }>
      { items.map((item) => {
        const Icon = iconMap[item.id] ?? EmailRoundedIcon;
        return (
          <Grid key={ item.id } size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, height: '100%' }}>
              <Box
                component="a"
                href={ item.href }
                aria-label={ `${item.label} - ${item.actionText}` }
                sx={{
                  flex: 1,
                  minWidth: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  borderRadius: 3,
                  textDecoration: 'none',
                  bgcolor: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border-subtle)',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                  '&:hover': {
                    borderColor: 'var(--color-accent)',
                    transform: 'translateY(-2px)',
                  },
                  '&:hover .contact-card__arrow': { transform: 'translateX(4px)' },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    flexShrink: 0,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 2.5,
                    color: '#FFFFFF',
                    background: 'linear-gradient(135deg, var(--color-accent), var(--color-secondary))',
                  }}
                >
                  <Icon />
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                    { item.label }
                  </Box>
                  <Box sx={{ fontWeight: 700, fontSize: { xs: '0.95rem', sm: '1rem' }, color: 'var(--color-text-primary)' }}>
                    { item.actionText }
                  </Box>
                </Box>

                <ArrowForwardRoundedIcon
                  className="contact-card__arrow"
                  sx={{ color: 'var(--color-accent)', transition: 'transform 0.2s ease' }}
                />
              </Box>

              <CopyButton text={ item.copyValue } label={ item.label } />
            </Box>
          </Grid>
        );
      }) }
    </Grid>
  );
}

export default ContactInfoCard;
