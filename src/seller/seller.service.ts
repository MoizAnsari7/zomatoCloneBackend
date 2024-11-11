import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from './entities/seller.entity';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller)
    private sellerRepository: Repository<Seller>,
  ) {}

  async create(createSellerDto: CreateSellerDto): Promise<Seller> {
    const hashedPassword = await bcrypt.hash(createSellerDto.password, 10);
    const seller = this.sellerRepository.create({
      ...createSellerDto,
      password: hashedPassword,
    });
    return this.sellerRepository.save(seller);
  }

  async findAll(): Promise<Seller[]> {
    return this.sellerRepository.find();
  }

  async findOne(id: string): Promise<Seller> {
    const seller = await this.sellerRepository.findOne({ where: { id } });
    if (!seller) throw new NotFoundException('Seller not found');
    return seller;
  }

  async update(id: string, updateSellerDto: UpdateSellerDto): Promise<Seller> {
    if (updateSellerDto.password) {
      updateSellerDto.password = await bcrypt.hash(updateSellerDto.password, 10);
    }
    await this.sellerRepository.update(id, updateSellerDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.sellerRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Seller not found');
  }

  async findByEmail(email: string): Promise<Seller | undefined> {
    return this.sellerRepository.findOne({ where: { email } });
  }
}
