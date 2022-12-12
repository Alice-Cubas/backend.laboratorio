import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TipoReceta,
  Recetas,
} from '../models';
import {TipoRecetaRepository} from '../repositories';

export class TipoRecetaRecetasController {
  constructor(
    @repository(TipoRecetaRepository)
    public tipoRecetaRepository: TipoRecetaRepository,
  ) { }

  @get('/tipo-recetas/{id}/recetas', {
    responses: {
      '200': {
        description: 'Recetas belonging to TipoReceta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Recetas)},
          },
        },
      },
    },
  })
  async getRecetas(
    @param.path.string('id') id: typeof TipoReceta.prototype.idReceta,
  ): Promise<Recetas> {
    return this.tipoRecetaRepository.Receta(id);
  }
}
