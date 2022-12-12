import {Entity, model, property, hasMany} from '@loopback/repository';
import {RecetasXIngredientes} from './recetas-x-ingredientes.model';
import {TipoReceta} from './tipo-receta.model';

@model()
export class Recetas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  preparacion: string;

  @property({
    type: 'number',
    required: true,
  })
  tiempo: number;

  @property({
    type: 'number',
    required: true,
  })
  porciones: number;

  @hasMany(() => RecetasXIngredientes, {keyTo: 'idReceta'})
  recetasXIngredientes: RecetasXIngredientes[];

  @hasMany(() => TipoReceta, {keyTo: 'idReceta'})
  tipoRecetas: TipoReceta[];

  constructor(data?: Partial<Recetas>) {
    super(data);
  }
}

export interface RecetasRelations {
  // describe navigational properties here
}

export type RecetasWithRelations = Recetas & RecetasRelations;
