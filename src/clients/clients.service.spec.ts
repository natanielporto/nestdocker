import { Clients } from './clients.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import TestUtil from './../common/test/TestUtil';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('ClientsService', () => {
  let service: ClientsService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: getRepositoryToken(Clients),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  beforeEach(() => {
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
    mockRepository.update.mockReset();
    mockRepository.delete.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When search all clients', () => {
    it('should list all clients', async () => {
      const client = TestUtil.giveValidClient();
      mockRepository.find.mockReturnValue([client, client]);
      const clients = await service.findAllClients();
      expect(clients).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When search clients by id', () => {
    it('should find an existing clients', async () => {
      const client = TestUtil.giveValidClient();
      mockRepository.findOne.mockReturnValue(client);
      const clientFound = await service.findClientsById('1');
      expect(clientFound).toMatchObject({ name: client.name });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return an exeption when does not find an client', async () => {
      const client = TestUtil.giveValidClient();
      mockRepository.findOne.mockReturnValue(null);
      expect(service.findClientsById('3')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('When creating an client', () => {
    it('should create an client', async () => {
      const client = TestUtil.giveValidClient();
      mockRepository.save.mockReturnValue(client);
      mockRepository.create.mockReturnValue(client);
      const savedClient = await service.createClients(client);
      expect(savedClient).toMatchObject(client);
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });

    it('should return an exception when desnt create an client', async () => {
      const client = TestUtil.giveValidClient();
      mockRepository.save.mockReturnValue(null);
      mockRepository.create.mockReturnValue(client);

      await service.createClients(client).catch(e => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'Problema para criar um cliente.',
        });
      });
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });
  });

  describe('When updating an client', () => {
    it('should update an client', async () => {
      const client = TestUtil.giveValidClient();
      const updatedClient = { name: 'Nome Atualizado' };
      mockRepository.findOne.mockReturnValue(client);
      mockRepository.update.mockReturnValue({
        ...client,
        ...updatedClient,
      });
      mockRepository.create.mockReturnValue({
        ...client,
        ...updatedClient,
      });
      const resultClient = await service.updateClients('1', {
        ...client,
        name: 'Nome Atualizado',
      });
      expect(resultClient).toMatchObject(updatedClient);
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.update).toBeCalledTimes(1);
    });

    describe('When deleting an client', () => {
      it('should delete an existing client', async () => {
        const client = TestUtil.giveValidClient();
        mockRepository.delete.mockReturnValue(client);
        mockRepository.findOne.mockReturnValue(client);

        const deletedClient = await service.deleteClients('1');

        expect(deletedClient).toBe(true);
        expect(mockRepository.findOne).toBeCalledTimes(1);
        expect(mockRepository.delete).toBeCalledTimes(1);
      });

      it('should not delete an inexisting client', async () => {
        const client = TestUtil.giveValidClient();
        mockRepository.delete.mockReturnValue(null);
        mockRepository.findOne.mockReturnValue(client);

        const deletedClient = await service.deleteClients('9');

        expect(deletedClient).toEqual(false);
        expect(mockRepository.findOne).toBeCalledTimes(1);
        expect(mockRepository.delete).toBeCalledTimes(1);
      });
    });
  });
});
