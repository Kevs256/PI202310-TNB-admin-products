import {Model, DataTypes, BuildOptions} from 'sequelize';
import db from '../database/mysql.db.js';
import IProducts from '../interfaces/IProducts.js';

interface ProductsInstance extends Model<IProducts>, IProducts {}
type ProductsModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProductsInstance;
};

export default db.define('Producto', {
    id_producto: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.STRING},
    id_carta: DataTypes.STRING,
    precio: DataTypes.NUMBER,
    descuento: DataTypes.NUMBER,
    disponibilidad: DataTypes.NUMBER,
    cantidad: DataTypes.NUMBER,
    valoracion_general: DataTypes.NUMBER,
}, {
    freezeTableName: true,
    timestamps: false
}) as ProductsModelStatic;