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
  TipoReceta,
} from '../models';
import {RecetasRepository} from '../repositories';

export class RecetasTipoRecetaController {
  constructor(
    @repository(RecetasRepository) protected recetasRepository: RecetasRepository,
  ) { }

  @get('/recetas/{id}/tipo-recetas', {
    responses: {
      '200': {
        description: 'Array of Recetas has many TipoReceta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoReceta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TipoReceta>,
  ): Promise<TipoReceta[]> {
    return this.recetasRepository.tipoRecetas(id).find(filter);
  }

  @post('/recetas/{id}/tipo-recetas', {
    responses: {
      '200': {
        description: 'Recetas model instance',
        content: {'application/json': {schema: getModelSchemaRef(TipoReceta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Recetas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoReceta, {
            title: 'NewTipoRecetaInRecetas',
            exclude: ['idReceta'],
            optional: ['idReceta']
          }),
        },
      },
    }) tipoReceta: Omit<TipoReceta, 'idReceta'>,
  ): Promise<TipoReceta> {
    return this.recetasRepository.tipoRecetas(id).create(tipoReceta);
  }

  @patch('/recetas/{id}/tipo-recetas', {
    responses: {
      '200': {
        description: 'Recetas.TipoReceta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoReceta, {partial: true}),
        },
      },
    })
    tipoReceta: Partial<TipoReceta>,
    @param.query.object('where', getWhereSchemaFor(TipoReceta)) where?: Where<TipoReceta>,
  ): Promise<Count> {
    return this.recetasRepository.tipoRecetas(id).patch(tipoReceta, where);
  }

  @del('/recetas/{id}/tipo-recetas', {
    responses: {
      '200': {
        description: 'Recetas.TipoReceta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TipoReceta)) where?: Where<TipoReceta>,
  ): Promise<Count> {
    return this.recetasRepository.tipoRecetas(id).delete(where);
  }
}
