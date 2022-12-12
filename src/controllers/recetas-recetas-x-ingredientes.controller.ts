import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Recetas,
  RecetasXIngredientes,
} from '../models';
import {RecetasRepository} from '../repositories';

export class RecetasRecetasXIngredientesController {
  constructor(
    @repository(RecetasRepository) protected recetasRepository: RecetasRepository,
  ) { }

  @get('/recetas/{id}/recetas-x-ingredientes', {
    responses: {
      '200': {
        description: 'Array of Recetas has many RecetasXIngredientes',
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
    return this.recetasRepository.recetasXIngredientes(id).find(filter);
  }

  @post('/recetas/{id}/recetas-x-ingredientes', {
    responses: {
      '200': {
        description: 'Recetas model instance',
        content: {'application/json': {schema: getModelSchemaRef(RecetasXIngredientes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Recetas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RecetasXIngredientes, {
            title: 'NewRecetasXIngredientesInRecetas',
            exclude: ['idReceta'],
            optional: ['idReceta']
          }),
        },
      },
    }) recetasXIngredientes: Omit<RecetasXIngredientes, 'idReceta'>,
  ): Promise<RecetasXIngredientes> {
    return this.recetasRepository.recetasXIngredientes(id).create(recetasXIngredientes);
  }

  @patch('/recetas/{id}/recetas-x-ingredientes', {
    responses: {
      '200': {
        description: 'Recetas.RecetasXIngredientes PATCH success count',
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
    return this.recetasRepository.recetasXIngredientes(id).patch(recetasXIngredientes, where);
  }

  @del('/recetas/{id}/recetas-x-ingredientes', {
    responses: {
      '200': {
        description: 'Recetas.RecetasXIngredientes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(RecetasXIngredientes)) where?: Where<RecetasXIngredientes>,
  ): Promise<Count> {
    return this.recetasRepository.recetasXIngredientes(id).delete(where);
  }
}
