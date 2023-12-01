import { Module } from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { AlumnoController } from './alumno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumno } from './entities/alumno.entity';

@Module({
  controllers: [AlumnoController],
  providers: [AlumnoService],
  imports: [TypeOrmModule.forFeature([Alumno])],
})
export class AlumnoModule {}
