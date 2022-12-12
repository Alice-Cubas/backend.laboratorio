import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnMongoDbDataSource} from '../datasources';
import {Ingredientes, IngredientesRelations, RecetasXIngredientes} from '../models';
import {RecetasXIngredientesRepository} from './recetas-x-ingredientes.repository';

export class IngredientesRepository extends DefaultCrudRepository<
  Ingredientes,
  typeof Ingredientes.prototype.id,
  IngredientesRelations
> {

  public readonly recetasXIngredientes: HasManyRepositoryFactory<RecetasXIngredientes, typeof Ingredientes.prototype.id>;

  constructor(
    @inject('datasources.connMongoDB') dataSource: ConnMongoDbDataSource, @repository.getter('RecetasXIngredientesRepository') protected recetasXIngredientesRepositoryGetter: Getter<RecetasXIngredientesRepository>,
  ) {
    super(Ingredientes, dataSource);
    this.recetasXIngredientes = this.createHasManyRepositoryFactoryFor('recetasXIngredientes', recetasXIngredientesRepositoryGetter,);
    this.registerInclusionResolver('recetasXIngredientes', this.recetasXIngredientes.inclusionResolver);
  }
}
