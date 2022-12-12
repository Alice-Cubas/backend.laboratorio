import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Recetas} from './recetas.model';

@model()
export class TipoReceta extends Entity {
  @property({
    type: 'boolean',
    required: true,
  })
  esVegana: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  esVegetariana: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  esDiabetica: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  esRapida: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  esFitness: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  sinLactosa: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  sinGluten: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  sinSodio: boolean;

  @belongsTo(() => Recetas, {name: 'Receta'})
  idReceta: string;

  constructor(data?: Partial<TipoReceta>) {
    super(data);
  }
}

export interface TipoRecetaRelations {
  // describe navigational properties here
}

export type TipoRecetaWithRelations = TipoReceta & TipoRecetaRelations;
