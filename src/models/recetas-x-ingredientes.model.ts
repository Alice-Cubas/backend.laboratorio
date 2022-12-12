import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Recetas} from './recetas.model';
import {Ingredientes} from './ingredientes.model';

@model()
export class RecetasXIngredientes extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  idIngrediente: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @belongsTo(() => Recetas, {name: 'Recetas'})
  idReceta: string;

  @belongsTo(() => Ingredientes, {name: 'Ingrediente'})
  idIngredientes: string;

  constructor(data?: Partial<RecetasXIngredientes>) {
    super(data);
  }
}

export interface RecetasXIngredientesRelations {
  // describe navigational properties here
}

export type RecetasXIngredientesWithRelations = RecetasXIngredientes & RecetasXIngredientesRelations;
