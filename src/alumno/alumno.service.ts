/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumno } from './entities/alumno.entity';
import { NotFoundError } from 'rxjs';
import { PaginacionDto } from '../common/dto/paginacion.dto';

@Injectable()
export class AlumnoService {
  constructor(
    @InjectRepository(Alumno)
    private readonly productRepository: Repository<Alumno>,
  ) {}
  async create(createAlumnoDto: CreateAlumnoDto) {
    try {
      const alumnos = this.productRepository.create(createAlumnoDto);
      await this.productRepository.save(alumnos);
      return alumnos;
    } catch (error) {
      console.log(error);
      throw new Error('No se puede realizar el ingreso a la base de datos');
    }
  }

  findAll(PaginacionDto: PaginacionDto) {
    const { limit = 10, offset = 1 } = PaginacionDto;
    return this.productRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    const alumnos = await this.productRepository.findOneBy({ id });

    if (!alumnos) throw new NotFoundException(id);
    return alumnos;
  }

  async update(id: number, updateAlumnoDto: UpdateAlumnoDto) {
    const alumnos = await this.productRepository.preload({
      id: id,
      ...updateAlumnoDto,
    });
    if (!alumnos) throw new NotFoundException('No se pudo eliminar');
    await this.productRepository.save(alumnos);
    return alumnos;
  }

  async remove(id: number) {
    const alumnos = await this.findOne(id);
    this.productRepository.delete(alumnos);
  }
}
