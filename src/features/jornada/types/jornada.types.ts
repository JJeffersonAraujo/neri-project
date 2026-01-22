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
