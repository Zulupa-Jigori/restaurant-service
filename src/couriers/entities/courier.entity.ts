import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CourierStatus } from '../enums/courier-status.enum';

@Entity()
export class Courier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: CourierStatus,
    default: CourierStatus.Inactive,
  })
  status: CourierStatus;
}
