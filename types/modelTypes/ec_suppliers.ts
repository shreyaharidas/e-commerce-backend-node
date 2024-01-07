import { Model } from 'sequelize';

// interface EcSuppliersAttributes {
//     id?: number;
//     full_name: string;
//     e_mail: string;
//     password: string;
//     profile_pic: Buffer | null;
//     registration_id?: string;
//     registration_time_stamp?: Date;
//     createdAt?:Date,
//     updatedAt?:Date,
//   }
  
  class EcSuppliers extends Model {
    public id?: number;
    public full_name!: string;
    public e_mail!: string;
    public password!: string;
    public profile_pic!: Buffer | null;
    public registration_id?: string;
    public registration_time_stamp?: Date;
    public createdAt?:Date;
    public updatedAt?:Date
  
    // Other methods or static properties can be added here
  }

  export default  EcSuppliers;