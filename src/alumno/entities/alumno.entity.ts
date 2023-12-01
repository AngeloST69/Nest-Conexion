import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Alumno {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  nombre: string;

  @Column('int', { default: 0 })
  edad: string;

  @Column('text', { unique: true })
  materia: string;
}
