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
import {Recetas} from '../models';
import {RecetasRepository} from '../repositories';

export class RecetasController {
  constructor(
    @repository(RecetasRepository)
    public recetasRepository : RecetasRepository,
  ) {}

  @post('/recetas')
  @response(200, {
    description: 'Recetas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Recetas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recetas, {
            title: 'NewRecetas',
            exclude: ['id'],
          }),
        },
      },
    })
    recetas: Omit<Recetas, 'id'>,
  ): Promise<Recetas> {
    return this.recetasRepository.create(recetas);
  }

  @get('/recetas/count')
  @response(200, {
    description: 'Recetas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Recetas) where?: Where<Recetas>,
  ): Promise<Count> {
    return this.recetasRepository.count(where);
  }

  @get('/recetas')
  @response(200, {
    description: 'Array of Recetas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Recetas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Recetas) filter?: Filter<Recetas>,
  ): Promise<Recetas[]> {
    return this.recetasRepository.find(filter);
  }

  @patch('/recetas')
  @response(200, {
    description: 'Recetas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recetas, {partial: true}),
        },
      },
    })
    recetas: Recetas,
    @param.where(Recetas) where?: Where<Recetas>,
  ): Promise<Count> {
    return this.recetasRepository.updateAll(recetas, where);
  }

  @get('/recetas/{id}')
  @response(200, {
    description: 'Recetas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Recetas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Recetas, {exclude: 'where'}) filter?: FilterExcludingWhere<Recetas>
  ): Promise<Recetas> {
    return this.recetasRepository.findById(id, filter);
  }

  @patch('/recetas/{id}')
  @response(204, {
    description: 'Recetas PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recetas, {partial: true}),
        },
      },
    })
    recetas: Recetas,
  ): Promise<void> {
    await this.recetasRepository.updateById(id, recetas);
  }

  @put('/recetas/{id}')
  @response(204, {
    description: 'Recetas PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() recetas: Recetas,
  ): Promise<void> {
    await this.recetasRepository.replaceById(id, recetas);
  }

  @del('/recetas/{id}')
  @response(204, {
    description: 'Recetas DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.recetasRepository.deleteById(id);
  }
}
