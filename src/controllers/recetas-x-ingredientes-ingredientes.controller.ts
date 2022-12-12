import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Ingredientes, RecetasXIngredientes
} from '../models';
import {RecetasXIngredientesRepository} from '../repositories';

export class RecetasXIngredientesIngredientesController {
  constructor(
    @repository(RecetasXIngredientesRepository)
    public recetasXIngredientesRepository: RecetasXIngredientesRepository,
  ) { }

  @get('/recetas-x-ingredientes/{id}/ingredientes', {
    responses: {
      '200': {
        description: 'Ingredientes belonging to RecetasXIngredientes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ingredientes)},
          },
        },
      },
    },
  })
  async getIngredientes(
    @param.path.string('id') id: typeof RecetasXIngredientes.prototype.idIngredientes,
  ): Promise<Ingredientes> {
    return this.recetasXIngredientesRepository.Ingrediente(id);
  }
}
