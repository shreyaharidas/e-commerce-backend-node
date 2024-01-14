import { Model } from 'sequelize';

// interface EcCustomersAttributes {
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
  
  class EcCustomers extends Model{
    public id?: number;
    public full_name!: string;
    public e_mail!: string;
    public password!: string;
    public profile_pic!: string;
    public registration_id?: string;
    public registration_time_stamp?: Date;
    public createdAt?:Date;
    public updatedAt?:Date
  
    // Other methods or static properties can be added here
  }

  export default  EcCustomers;