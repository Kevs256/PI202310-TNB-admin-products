import {Model, DataTypes, BuildOptions} from 'sequelize';
import db from '../database/mysql.db.js';
import IProducts from '../interfaces/IProducts.js';

interface ProductsInstance extends Model<IProducts>, IProducts {}
type ProductsModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProductsInstance;
};

export default db.define('Product', {
    id_product: {
      primaryKey: true,
      type: DataTypes.STRING
    },
    type:DataTypes.STRING,
    price: DataTypes.NUMBER,
    discount: DataTypes.NUMBER,
    availability: DataTypes.NUMBER,
    amount: DataTypes.NUMBER,
    overall_rating: DataTypes.NUMBER,
    amount_people_rate: DataTypes.NUMBER
}, {
    freezeTableName: true,
    timestamps: false
}) as ProductsModelStatic;