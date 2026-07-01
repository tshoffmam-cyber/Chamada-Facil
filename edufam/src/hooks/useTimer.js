// EduFam — src/hooks/useTimer.js
// Hooks de timer ligados à agenda real

import { useState, useEffect } from 'react';
import { horaParaMin, fmtSeg } from '../data';

/** Timer do MODO AULA — conta regressivamente até o fim da aula */
export function useModoAulaTimer(aulaAtual) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  if (!aulaAtual) {
    return { fase:'sem_aula', timerTexto:'--:--', progPct:0, label:'', faltam5min:false };
  }

  const agora      = new Date();
  const minAgora   = agora.getHours() * 60 + agora.getMinutes();
  const segAgora   = agora.getSeconds();
  const inicioMin  = horaParaMin(aulaAtual.horaInicio);
  const fimMin     = horaParaMin(aulaAtual.horaFim);
  const duracaoMin = Math.max(1, fimMin - inicioMin);

  if (minAgora < inicioMin) {
    const diffSeg = (inicioMin - minAgora) * 60 - segAgora;
    return { fase:'antes', timerTexto:fmtSeg(diffSeg), progPct:0, label:'para começar', faltam5min:false };
  }

  if (minAgora < fimMin) {
    const diffSeg = (fimMin - minAgora) * 60 - segAgora;
    const progPct = Math.min(100, ((minAgora - inicioMin) / duracaoMin) * 100);
    return {
      fase:'durante',
      timerTexto: fmtSeg(diffSeg),
      progPct: parseFloat(progPct.toFixed(1)),
      label: 'restantes',
      faltam5min: diffSeg <= 300 && diffSeg > 295,
    };
  }

  return { fase:'depois', timerTexto:'00:00', progPct:100, label:'encerrada', faltam5min:false };
}

/** Timer da HOME — countdown até a próxima aula começar */
export function useProximaAulaTimer(proxima, turmas = []) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  if (!proxima) {
    return { timerTexto:null, fase:'sem_aula', subLabel:'Sem aulas hoje', proxima:null, turma:null, turmaId:null, progPct:0 };
  }

  const agora     = new Date();
  const minAgora  = agora.getHours() * 60 + agora.getMinutes();
  const segAgora  = agora.getSeconds();
  const inicioMin = horaParaMin(proxima.horaInicio);
  const fimMin    = horaParaMin(proxima.horaFim || proxima.horaInicio) + 50;
  const turmaId   = proxima.turmaIds?.[0];
  const turma     = turmas.find(t => t.id === turmaId);

  if (minAgora < inicioMin) {
    const diffSeg = (inicioMin - minAgora) * 60 - segAgora;
    return { timerTexto:fmtSeg(diffSeg), fase:'antes', subLabel:'para começar', proxima, turma, turmaId, progPct:0 };
  }

  if (minAgora < fimMin) {
    const duracaoMin = Math.max(1, fimMin - inicioMin);
    const diffSeg    = (fimMin - minAgora) * 60 - segAgora;
    const progPct    = Math.min(100, ((minAgora - inicioMin) / duracaoMin) * 100);
    return { timerTexto:fmtSeg(diffSeg), fase:'durante', subLabel:'restantes', progPct:parseFloat(progPct.toFixed(1)), proxima, turma, turmaId };
  }

  return { timerTexto:'00:00', fase:'depois', subLabel:'encerrada', proxima, turma, turmaId, progPct:100 };
}

/** Relógio HH:MM simples — atualiza a cada segundo */
export function useClock() {
  const [hora, setHora] = useState(() => {
    const n = new Date();
    return String(n.getHours()).padStart(2,'0') + ':' + String(n.getMinutes()).padStart(2,'0');
  });
  useEffect(() => {
    const id = setInterval(() => {
      const n = new Date();
      setHora(String(n.getHours()).padStart(2,'0') + ':' + String(n.getMinutes()).padStart(2,'0'));
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return hora;
}
