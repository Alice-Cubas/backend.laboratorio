import {Entity, model, property, hasMany} from '@loopback/repository';
import {RecetasXIngredientes} from './recetas-x-ingredientes.model';

@model()
export class Ingredientes extends Entity {
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
    type: 'number',
    required: true,
  })
  calorias: number;

  @property({
    type: 'number',
    required: true,
  })
  colesterol: number;

  @property({
    type: 'number',
    required: true,
  })
  sodio: number;

  @property({
    type: 'number',
    required: true,
  })
  fibra: number;

  @property({
    type: 'number',
    required: true,
  })
  azucares: number;

  @property({
    type: 'number',
    required: true,
  })
  proteinas: number;

  @property({
    type: 'number',
    required: true,
  })
  grasasSaturadas: number;

  @property({
    type: 'number',
    required: true,
  })
  grasasTrans: number;

  @hasMany(() => RecetasXIngredientes, {keyTo: 'idIngrediente'})
  recetasXIngredientes: RecetasXIngredientes[];

  constructor(data?: Partial<Ingredientes>) {
    super(data);
  }
}

export interface IngredientesRelations {
  // describe navigational properties here
}

export type IngredientesWithRelations = Ingredientes & IngredientesRelations;
