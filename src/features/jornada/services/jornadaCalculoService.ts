// src/features/jornada/services/jornadaCalculoService.ts

import {
  calcularAtraso,
  calcularExtras,
  calcularNoturno,
  calcularMinutosTrabalhados
} from '../rules/jornada.rules.js'

export interface JornadaCalculoInput {
  inicioPlanejado: Date
  fimPlanejado: Date
  inicioExecutado: Date
  fimExecutado: Date
}

export interface JornadaCalculoResult {
  minutosTrabalhados: number
  minutosAtraso: number
  minutosExtras: number
  minutosNoturnos: number
}

export class JornadaCalculoService {
  calcular(input: JornadaCalculoInput): JornadaCalculoResult {
    const { inicioPlanejado, fimPlanejado, inicioExecutado, fimExecutado } = input

    const minutosTrabalhados = calcularMinutosTrabalhados(inicioExecutado, fimExecutado)
    const minutosAtraso = calcularAtraso(inicioPlanejado, inicioExecutado)
    const minutosExtras = calcularExtras(fimPlanejado, fimExecutado)
    const minutosNoturnos = calcularNoturno(inicioExecutado, fimExecutado)

    return {
      minutosTrabalhados,
      minutosAtraso,
      minutosExtras,
      minutosNoturnos
    }
  }
}
