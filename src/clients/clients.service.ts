import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientsInput } from './dto/create-clients.input';
import { Repository } from 'typeorm';
import { Clients } from './clients.entity';
import { UpdateClientsInput } from './dto/update-clients.input';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Clients)
    private clientRepository: Repository<Clients>,
  ) {}

  async findAllClients(): Promise<Clients[]> {
    const clients = await this.clientRepository.find();
    return clients;
  }

  async findClientsById(id: string): Promise<Clients> {
    const client = await this.clientRepository.findOne(id);
    if (!client) {
      throw new NotFoundException('Cliente não encontrado.');
    }
    return client;
  }

  async createClients(data: CreateClientsInput): Promise<Clients> {
    const createdAt = new Date().toLocaleString();
    const updatedAt = new Date().toLocaleString();
    const client = this.clientRepository.create(data);
    const clientSaved = await this.clientRepository.save({
      ...client,
      createdAt,
      updatedAt,
    });

    if (!clientSaved) {
      throw new InternalServerErrorException('Problema para criar um cliente.');
    }

    return clientSaved;
  }

  async updateClients(id: string, data: UpdateClientsInput): Promise<Clients> {
    const client = await this.findClientsById(id);

    await this.clientRepository.update(client, { ...data });

    const clientUpdated = this.clientRepository.create({ ...client, ...data });
    return clientUpdated;
  }

  async deleteClients(id: string): Promise<boolean> {
    const client = await this.findClientsById(id);

    const deleted = this.clientRepository.delete(client);

    if (deleted) {
      return true;
    }

    return false;
  }
}
