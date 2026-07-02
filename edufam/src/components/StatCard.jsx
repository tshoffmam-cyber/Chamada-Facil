export default function StatCard({ label, value, icon, cor, onClick }) {
  const colors = {
    blue:   { bg:'#EFF6FF', text:'#1D4ED8' },
    orange: { bg:'#FFF7ED', text:'#C2410C' },
    red:    { bg:'#FEF2F2', text:'#B91C1C' },
    purple: { bg:'#F5F3FF', text:'#6D28D9' },
    green:  { bg:'#F0FDF4', text:'#15803D' },
  };
  const c = colors[cor] || colors.blue;
  return (
    <div
      onClick={onClick}
      style={{
        background: c.bg,
        borderRadius: 14,
        padding: '14px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
      }}
    >
      <span style={{ fontSize: 24 }}>{icon}</span>
      <span style={{ fontSize: 22, fontWeight: 800, color: c.text }}>{value}</span>
      <span style={{ fontSize: 11, color: '#64748B', fontWeight: 500 }}>{label}</span>
    </div>
  );
}
