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
import {TipoReceta} from '../models';
import {TipoRecetaRepository} from '../repositories';

export class TipoRecetaController {
  constructor(
    @repository(TipoRecetaRepository)
    public tipoRecetaRepository : TipoRecetaRepository,
  ) {}

  @post('/tipo-recetas')
  @response(200, {
    description: 'TipoReceta model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoReceta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoReceta, {
            title: 'NewTipoReceta',
            exclude: ['idReceta'],
          }),
        },
      },
    })
    tipoReceta: Omit<TipoReceta, 'idReceta'>,
  ): Promise<TipoReceta> {
    return this.tipoRecetaRepository.create(tipoReceta);
  }

  @get('/tipo-recetas/count')
  @response(200, {
    description: 'TipoReceta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoReceta) where?: Where<TipoReceta>,
  ): Promise<Count> {
    return this.tipoRecetaRepository.count(where);
  }

  @get('/tipo-recetas')
  @response(200, {
    description: 'Array of TipoReceta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoReceta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoReceta) filter?: Filter<TipoReceta>,
  ): Promise<TipoReceta[]> {
    return this.tipoRecetaRepository.find(filter);
  }

  @patch('/tipo-recetas')
  @response(200, {
    description: 'TipoReceta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoReceta, {partial: true}),
        },
      },
    })
    tipoReceta: TipoReceta,
    @param.where(TipoReceta) where?: Where<TipoReceta>,
  ): Promise<Count> {
    return this.tipoRecetaRepository.updateAll(tipoReceta, where);
  }

  @get('/tipo-recetas/{id}')
  @response(200, {
    description: 'TipoReceta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoReceta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TipoReceta, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoReceta>
  ): Promise<TipoReceta> {
    return this.tipoRecetaRepository.findById(id, filter);
  }

  @patch('/tipo-recetas/{id}')
  @response(204, {
    description: 'TipoReceta PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoReceta, {partial: true}),
        },
      },
    })
    tipoReceta: TipoReceta,
  ): Promise<void> {
    await this.tipoRecetaRepository.updateById(id, tipoReceta);
  }

  @put('/tipo-recetas/{id}')
  @response(204, {
    description: 'TipoReceta PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tipoReceta: TipoReceta,
  ): Promise<void> {
    await this.tipoRecetaRepository.replaceById(id, tipoReceta);
  }

  @del('/tipo-recetas/{id}')
  @response(204, {
    description: 'TipoReceta DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tipoRecetaRepository.deleteById(id);
  }
}
