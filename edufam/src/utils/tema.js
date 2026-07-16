// ---------------------------------------------------------------------------
// utils/tema.js
//
// Logica do tema de cores por campanha de conscientizacao. Como o app
// inteiro ja usa variaveis CSS (--color-primary, --color-primary-light,
// ver src/style.css) em vez de cores fixas, e possivel trocar a cor de
// destaque do app inteiro sem editar nenhuma tela: basta sobrescrever
// essas variaveis no elemento raiz do documento.
// ---------------------------------------------------------------------------
import { campanhas } from '../data/campanhas'

export function getCampanhaDoMes(data = new Date()) {
  const mes = data.getMonth() + 1
  return campanhas.find(c => c.mes === mes) || null
}

export function getCampanhaPorId(id) {
  return campanhas.find(c => c.id === id) || null
}

// Decide qual campanha (se alguma) esta ativa, de acordo com a
// configuracao salva pelo ADM (ver DataContext: configTema).
//   modo 'automatico' -> segue o mes atual (padrao)
//   modo 'manual'     -> forca a campanha escolhida, em qualquer mes
//   modo 'padrao'     -> nenhuma campanha, cor oficial fixa do app
export function calcularCampanhaAtiva(configTema) {
  if (!configTema || configTema.modo === 'padrao') return null
  if (configTema.modo === 'manual') return getCampanhaPorId(configTema.campanhaManualId)
  return getCampanhaDoMes()
}

// Aplica (ou remove) a cor de destaque no documento inteiro via CSS vars.
export function aplicarCorTema(campanha) {
  const root = document.documentElement
  if (!campanha) {
    root.style.removeProperty('--color-primary')
    root.style.removeProperty('--color-primary-light')
    return
  }
  root.style.setProperty('--color-primary', campanha.cor)
  root.style.setProperty('--color-primary-light', campanha.corLight)
}
