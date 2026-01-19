// src/features/jornada/rules/jornada.rules.ts

/**
 * Calcula o atraso em minutos
 */
export function calcularAtraso(inicioPlanejado: Date, inicioExecutado: Date): number {
  const diff = (inicioExecutado.getTime() - inicioPlanejado.getTime()) / 60000
  return Math.max(0, Math.floor(diff))
}

/**
 * Calcula horas extras em minutos
 */
export function calcularExtras(fimPlanejado: Date, fimExecutado: Date): number {
  const diff = (fimExecutado.getTime() - fimPlanejado.getTime()) / 60000
  return Math.max(0, Math.floor(diff))
}

/**
 * Calcula minutos noturnos dentro de um intervalo
 * Considerando período noturno das 22h às 5h
 */
export function calcularNoturno(inicio: Date, fim: Date): number {
  let minutosNoturnos = 0
  const inicioNoturno = 22
  const fimNoturno = 5

  let current = new Date(inicio)

  while (current < fim) {
    const hour = current.getHours()
    if (hour >= inicioNoturno || hour < fimNoturno) {
      minutosNoturnos++
    }
    current.setMinutes(current.getMinutes() + 1)
  }

  return minutosNoturnos
}

/**
 * Calcula minutos trabalhados entre inicio e fim
 */
export function calcularMinutosTrabalhados(inicio: Date, fim: Date): number {
  return Math.floor((fim.getTime() - inicio.getTime()) / 60000)
}
