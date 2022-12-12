import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnMongoDbDataSource} from '../datasources';
import {Recetas, RecetasRelations, RecetasXIngredientes, TipoReceta} from '../models';
import {RecetasXIngredientesRepository} from './recetas-x-ingredientes.repository';
import {TipoRecetaRepository} from './tipo-receta.repository';

export class RecetasRepository extends DefaultCrudRepository<
  Recetas,
  typeof Recetas.prototype.id,
  RecetasRelations
> {

  public readonly recetasXIngredientes: HasManyRepositoryFactory<RecetasXIngredientes, typeof Recetas.prototype.id>;

  public readonly tipoRecetas: HasManyRepositoryFactory<TipoReceta, typeof Recetas.prototype.id>;

  constructor(
    @inject('datasources.connMongoDB') dataSource: ConnMongoDbDataSource, @repository.getter('RecetasXIngredientesRepository') protected recetasXIngredientesRepositoryGetter: Getter<RecetasXIngredientesRepository>, @repository.getter('TipoRecetaRepository') protected tipoRecetaRepositoryGetter: Getter<TipoRecetaRepository>,
  ) {
    super(Recetas, dataSource);
    this.tipoRecetas = this.createHasManyRepositoryFactoryFor('tipoRecetas', tipoRecetaRepositoryGetter,);
    this.registerInclusionResolver('tipoRecetas', this.tipoRecetas.inclusionResolver);
    this.recetasXIngredientes = this.createHasManyRepositoryFactoryFor('recetasXIngredientes', recetasXIngredientesRepositoryGetter,);
    this.registerInclusionResolver('recetasXIngredientes', this.recetasXIngredientes.inclusionResolver);
  }
}
