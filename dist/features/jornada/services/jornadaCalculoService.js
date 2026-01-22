var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { calcularAtraso, calcularExtras, calcularNoturno, calcularMinutosTrabalhados } from '../rules/jornada.rules.js';
import { LogExecution } from '../../../shared/decorators/LogExecution.js';
export class JornadaCalculoService {
    calcular(input) {
        const { inicioPlanejado, fimPlanejado, inicioExecutado, fimExecutado } = input;
        const minutosTrabalhados = calcularMinutosTrabalhados(inicioExecutado, fimExecutado);
        const minutosAtraso = calcularAtraso(inicioPlanejado, inicioExecutado);
        const minutosExtras = calcularExtras(fimPlanejado, fimExecutado);
        const minutosNoturnos = calcularNoturno(inicioExecutado, fimExecutado);
        return {
            minutosTrabalhados,
            minutosAtraso,
            minutosExtras,
            minutosNoturnos
        };
    }
}
__decorate([
    LogExecution()
], JornadaCalculoService.prototype, "calcular", null);
