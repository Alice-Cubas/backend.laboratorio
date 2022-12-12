import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RecetasXIngredientes,
  Recetas,
} from '../models';
import {RecetasXIngredientesRepository} from '../repositories';

export class RecetasXIngredientesRecetasController {
  constructor(
    @repository(RecetasXIngredientesRepository)
    public recetasXIngredientesRepository: RecetasXIngredientesRepository,
  ) { }

  @get('/recetas-x-ingredientes/{id}/recetas', {
    responses: {
      '200': {
        description: 'Recetas belonging to RecetasXIngredientes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Recetas)},
          },
        },
      },
    },
  })
  async getRecetas(
    @param.path.string('id') id: typeof RecetasXIngredientes.prototype.idReceta,
  ): Promise<Recetas> {
    return this.recetasXIngredientesRepository.Recetas(id);
  }
}
