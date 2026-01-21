import type {
  JornadaCalculoInput,
  JornadaCalculoResult
} from '../types/jornada.types.js'

import {
  calcularAtraso,
  calcularExtras,
  calcularNoturno,
  calcularMinutosTrabalhados
} from '../rules/jornada.rules.js'

import { LogExecution } from '../../../shared/decorators/LogExecution.js'

export class JornadaCalculoService {

  @LogExecution()
  calcular(input: JornadaCalculoInput): JornadaCalculoResult {
    const {
      inicioPlanejado,
      fimPlanejado,
      inicioExecutado,
      fimExecutado
    } = input

    const minutosTrabalhados = calcularMinutosTrabalhados(
      inicioExecutado,
      fimExecutado
    )

    const minutosAtraso = calcularAtraso(
      inicioPlanejado,
      inicioExecutado
    )

    const minutosExtras = calcularExtras(
      fimPlanejado,
      fimExecutado
    )

    const minutosNoturnos = calcularNoturno(
      inicioExecutado,
      fimExecutado
    )

    return {
      minutosTrabalhados,
      minutosAtraso,
      minutosExtras,
      minutosNoturnos
    }
  }
}
