import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {ConnMongoDbDataSource} from '../datasources';
import {Ingredientes, Recetas, RecetasXIngredientes, RecetasXIngredientesRelations} from '../models';
import {IngredientesRepository} from './ingredientes.repository';
import {RecetasRepository} from './recetas.repository';

export class RecetasXIngredientesRepository extends DefaultCrudRepository<
  RecetasXIngredientes,
  typeof RecetasXIngredientes.prototype.idReceta,
  RecetasXIngredientesRelations
> {

  public readonly Recetas: BelongsToAccessor<Recetas, typeof RecetasXIngredientes.prototype.idReceta>;

  public readonly Ingrediente: BelongsToAccessor<Ingredientes, typeof RecetasXIngredientes.prototype.idIngrediente>;

  constructor(
    @inject('datasources.connMongoDB') dataSource: ConnMongoDbDataSource, @repository.getter('RecetasRepository') protected recetasRepositoryGetter: Getter<RecetasRepository>, @repository.getter('IngredientesRepository') protected ingredientesRepositoryGetter: Getter<IngredientesRepository>,
  ) {
    super(RecetasXIngredientes, dataSource);
    this.Ingrediente = this.createBelongsToAccessorFor('Ingrediente', ingredientesRepositoryGetter,);
    this.registerInclusionResolver('Ingrediente', this.Ingrediente.inclusionResolver);
    this.Recetas = this.createBelongsToAccessorFor('Recetas', recetasRepositoryGetter,);
    this.registerInclusionResolver('Recetas', this.Recetas.inclusionResolver);
  }
}
