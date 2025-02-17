import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type StateType = 'created' | 'inProgress' | 'finished';
export type PriorityType = 'low' | 'medium' | 'high';

@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'varchar', length: 50})
  description: string;

  @Column({type: 'varchar', default: 'created' })
  state: StateType;

  @Column({type: 'varchar', nullable: true})
  priority: PriorityType;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'bigint' })
  limitDate: number;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'uuid' })
  creator: string;

  @Column({ type: 'uuid' })
  assignedTo: string;
}
