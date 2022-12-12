import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {RecetasXIngredientes} from '../models';
import {RecetasXIngredientesRepository} from '../repositories';

export class RecetasXIngredientesController {
  constructor(
    @repository(RecetasXIngredientesRepository)
    public recetasXIngredientesRepository : RecetasXIngredientesRepository,
  ) {}

  @post('/recetas-x-ingredientes')
  @response(200, {
    description: 'RecetasXIngredientes model instance',
    content: {'application/json': {schema: getModelSchemaRef(RecetasXIngredientes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RecetasXIngredientes, {
            title: 'NewRecetasXIngredientes',
            exclude: ['idReceta'],
          }),
        },
      },
    })
    recetasXIngredientes: Omit<RecetasXIngredientes, 'idReceta'>,
  ): Promise<RecetasXIngredientes> {
    return this.recetasXIngredientesRepository.create(recetasXIngredientes);
  }

  @get('/recetas-x-ingredientes/count')
  @response(200, {
    description: 'RecetasXIngredientes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RecetasXIngredientes) where?: Where<RecetasXIngredientes>,
  ): Promise<Count> {
    return this.recetasXIngredientesRepository.count(where);
  }

  @get('/recetas-x-ingredientes')
  @response(200, {
    description: 'Array of RecetasXIngredientes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RecetasXIngredientes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RecetasXIngredientes) filter?: Filter<RecetasXIngredientes>,
  ): Promise<RecetasXIngredientes[]> {
    return this.recetasXIngredientesRepository.find(filter);
  }

  @patch('/recetas-x-ingredientes')
  @response(200, {
    description: 'RecetasXIngredientes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RecetasXIngredientes, {partial: true}),
        },
      },
    })
    recetasXIngredientes: RecetasXIngredientes,
    @param.where(RecetasXIngredientes) where?: Where<RecetasXIngredientes>,
  ): Promise<Count> {
    return this.recetasXIngredientesRepository.updateAll(recetasXIngredientes, where);
  }

  @get('/recetas-x-ingredientes/{id}')
  @response(200, {
    description: 'RecetasXIngredientes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RecetasXIngredientes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(RecetasXIngredientes, {exclude: 'where'}) filter?: FilterExcludingWhere<RecetasXIngredientes>
  ): Promise<RecetasXIngredientes> {
    return this.recetasXIngredientesRepository.findById(id, filter);
  }

  @patch('/recetas-x-ingredientes/{id}')
  @response(204, {
    description: 'RecetasXIngredientes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RecetasXIngredientes, {partial: true}),
        },
      },
    })
    recetasXIngredientes: RecetasXIngredientes,
  ): Promise<void> {
    await this.recetasXIngredientesRepository.updateById(id, recetasXIngredientes);
  }

  @put('/recetas-x-ingredientes/{id}')
  @response(204, {
    description: 'RecetasXIngredientes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() recetasXIngredientes: RecetasXIngredientes,
  ): Promise<void> {
    await this.recetasXIngredientesRepository.replaceById(id, recetasXIngredientes);
  }

  @del('/recetas-x-ingredientes/{id}')
  @response(204, {
    description: 'RecetasXIngredientes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.recetasXIngredientesRepository.deleteById(id);
  }
}
