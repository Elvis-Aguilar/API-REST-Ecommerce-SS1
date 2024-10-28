import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comany } from './entities/comany.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComanyService {

  constructor(
    @InjectRepository(Comany)
    private readonly comanyRepository: Repository<Comany>,
  ) {
  }

  async findFirst(): Promise<Comany> {
    const [firstComany] = await this.comanyRepository.find({
      order: { id: 'ASC' },
      take: 1,
    });

    if (!firstComany) {
      throw new NotFoundException('No records found');
    }

    return firstComany;
  }
}
