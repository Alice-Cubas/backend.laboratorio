import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Ingredientes,
  RecetasXIngredientes
} from '../models';
import {IngredientesRepository} from '../repositories';

export class IngredientesRecetasXIngredientesController {
  constructor(
    @repository(IngredientesRepository) protected ingredientesRepository: IngredientesRepository,
  ) { }

  @get('/ingredientes/{id}/recetas-x-ingredientes', {
    responses: {
      '200': {
        description: 'Array of Ingredientes has many RecetasXIngredientes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RecetasXIngredientes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<RecetasXIngredientes>,
  ): Promise<RecetasXIngredientes[]> {
    return this.ingredientesRepository.recetasXIngredientes(id).find(filter);
  }

  @post('/ingredientes/{id}/recetas-x-ingredientes', {
    responses: {
      '200': {
        description: 'Ingredientes model instance',
        content: {'application/json': {schema: getModelSchemaRef(RecetasXIngredientes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ingredientes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RecetasXIngredientes, {
            title: 'NewRecetasXIngredientesInIngredientes',
            exclude: ['idIngrediente'],
            optional: ['idIngrediente']
          }),
        },
      },
    }) recetasXIngredientes: Omit<RecetasXIngredientes, 'id'>,
  ): Promise<RecetasXIngredientes> {
    return this.ingredientesRepository.recetasXIngredientes(id).create(recetasXIngredientes);
  }

  @patch('/ingredientes/{id}/recetas-x-ingredientes', {
    responses: {
      '200': {
        description: 'Ingredientes.RecetasXIngredientes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RecetasXIngredientes, {partial: true}),
        },
      },
    })
    recetasXIngredientes: Partial<RecetasXIngredientes>,
    @param.query.object('where', getWhereSchemaFor(RecetasXIngredientes)) where?: Where<RecetasXIngredientes>,
  ): Promise<Count> {
    return this.ingredientesRepository.recetasXIngredientes(id).patch(recetasXIngredientes, where);
  }

  @del('/ingredientes/{id}/recetas-x-ingredientes', {
    responses: {
      '200': {
        description: 'Ingredientes.RecetasXIngredientes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(RecetasXIngredientes)) where?: Where<RecetasXIngredientes>,
  ): Promise<Count> {
    return this.ingredientesRepository.recetasXIngredientes(id).delete(where);
  }
}
