import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RestaurantSchedule } from './restaurant-schedule.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => RestaurantSchedule, (schedule) => schedule.restaurant_id, {
    cascade: true,
  })
  schedule: RestaurantSchedule[];
}
