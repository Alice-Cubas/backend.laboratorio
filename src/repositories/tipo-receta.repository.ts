import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnMongoDbDataSource} from '../datasources';
import {TipoReceta, TipoRecetaRelations, Recetas} from '../models';
import {RecetasRepository} from './recetas.repository';

export class TipoRecetaRepository extends DefaultCrudRepository<
  TipoReceta,
  typeof TipoReceta.prototype.idReceta,
  TipoRecetaRelations
> {

  public readonly Receta: BelongsToAccessor<Recetas, typeof TipoReceta.prototype.idReceta>;

  constructor(
    @inject('datasources.connMongoDB') dataSource: ConnMongoDbDataSource, @repository.getter('RecetasRepository') protected recetasRepositoryGetter: Getter<RecetasRepository>,
  ) {
    super(TipoReceta, dataSource);
    this.Receta = this.createBelongsToAccessorFor('Receta', recetasRepositoryGetter,);
    this.registerInclusionResolver('Receta', this.Receta.inclusionResolver);
  }
}
