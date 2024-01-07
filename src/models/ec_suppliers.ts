import { Sequelize, DataTypes} from 'sequelize';
import bcrypt from 'bcrypt';
import  sequelize from '../config/sequelize-config';
import EcSuppliers from '../../types/modelTypes/ec_suppliers.ts';


EcSuppliers.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique:true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    e_mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_pic: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    registration_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: (): string => {
        return Math.floor(100000 + Math.random() * 900000).toString();
      },
    },
    registration_time_stamp: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    createdAt: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    modelName: 'ec_suppliers',
    tableName: 'ec_suppliers',
    hooks: {
      beforeCreate: (user:EcSuppliers) => { 
        // Hash the password using bcrypt before creating the record
        const hashedPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        user.password = hashedPassword;
      },
    },
  }
);

export default EcSuppliers;
