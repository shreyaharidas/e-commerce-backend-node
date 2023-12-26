import {  Model } from 'sequelize';

export class EcBills extends Model {
    public id!: number;
    public invoice_number!: string;
    public total_amount!: string;
    public products!: Record<string, any>;   
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  