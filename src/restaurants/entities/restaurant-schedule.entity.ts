import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SchedulePeriod } from '../enums/schedule-period.enum';
import { Restaurant } from './restaurant.entity';

@Entity()
export class RestaurantSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.id, {
    onDelete: 'CASCADE',
  })
  restaurant_id: number;

  @Column({
    type: 'enum',
    enum: SchedulePeriod,
  })
  period: SchedulePeriod;

  @Column({ type: 'time without time zone' })
  startTime: string;

  @Column({ type: 'time without time zone' })
  endTime: string;
}
