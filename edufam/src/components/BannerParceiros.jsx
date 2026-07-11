import { useEffect, useState } from 'react'

// ---------------------------------------------------------------------------
// components/BannerParceiros.jsx
//
// Banner rotativo de parceiros da EduFam, exibido no rodape da Home do
// professor. Os parceiros vem do DataContext (gerenciados pelo ADM em
// /adm/configuracoes). Troca automaticamente a cada poucos segundos.
//
// REGRAS FIXAS DO PRD: nunca deve anunciar apostas, jogos de azar ou
// conteudo invasivo. Em producao, tambem deveria respeitar o plano do
// usuario (ex: sumir para quem assina um plano pago) — isso ainda nao
// existe neste prototipo, que nao tem sistema de assinaturas real.
// ---------------------------------------------------------------------------
export default function BannerParceiros({ parceiros, ativo = true }) {
  const [indice, setIndice] = useState(0)

  useEffect(() => {
    if (!parceiros || parceiros.length <= 1) return
    const id = setInterval(() => {
      setIndice(i => (i + 1) % parceiros.length)
    }, 6000)
    return () => clearInterval(id)
  }, [parceiros])

  if (!ativo || !parceiros || parceiros.length === 0) return null
  const atual = parceiros[indice % parceiros.length]

  return (
    <a
      href={atual.link}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="card card-padding"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        textDecoration: 'none',
        borderLeft: '4px solid ' + (atual.cor || 'var(--color-primary)'),
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>
          Publicidade · Parceiro EduFam
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-primary)' }}>{atual.nome}</div>
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{atual.mensagem}</div>
      </div>
      {parceiros.length > 1 && (
        <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
          {parceiros.map((p, i) => (
            <div key={p.id} style={{ width: 5, height: 5, borderRadius: '50%', background: i === indice ? (atual.cor || 'var(--color-primary)') : 'var(--color-border)' }} />
          ))}
        </div>
      )}
    </a>
  )
}
