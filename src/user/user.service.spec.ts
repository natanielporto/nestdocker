import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import TestUtil from './../common/test/TestUtil';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;

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
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
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

  describe('When search all users', () => {
    it('should list all users', async () => {
      const user = TestUtil.giveValidUser();
      mockRepository.find.mockReturnValue([user, user]);
      const users = await service.findAllUsers();
      expect(users).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('When search user by id', () => {
    it('should find an existing user', async () => {
      const user = TestUtil.giveValidUser();
      mockRepository.findOne.mockReturnValue(user);
      const userFound = await service.findUserById('1');
      expect(userFound).toMatchObject({ name: user.name });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return an exeption when does not find an user', async () => {
      const user = TestUtil.giveValidUser();
      mockRepository.findOne.mockReturnValue(null);
      expect(service.findUserById('3')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('When creating an user', () => {
    it('should create an user', async () => {
      const user = TestUtil.giveValidUser();
      mockRepository.save.mockReturnValue(user);
      mockRepository.create.mockReturnValue(user);
      const savedUser = await service.createUser(user);
      expect(savedUser).toMatchObject(user);
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });

    it('should return an exception when desnt create an user', async () => {
      const user = TestUtil.giveValidUser();
      mockRepository.save.mockReturnValue(null);
      mockRepository.create.mockReturnValue(user);

      await service.createUser(user).catch(e => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'Problema para criar um usuário.',
        });
      });
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });
  });

  describe('When updating an user', () => {
    it('should update an user', async () => {
      const user = TestUtil.giveValidUser();
      const updatedUser = { name: 'Nome Atualizado' };
      mockRepository.findOne.mockReturnValue(user);
      mockRepository.update.mockReturnValue({
        ...user,
        ...updatedUser,
      });
      mockRepository.create.mockReturnValue({
        ...user,
        ...updatedUser,
      });
      const resultUser = await service.updateUser('1', {
        ...user,
        name: 'Nome Atualizado',
      });
      expect(resultUser).toMatchObject(updatedUser);
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.findOne).toBeCalledTimes(1);
      expect(mockRepository.update).toBeCalledTimes(1);
    });

    describe('When deleting an user', () => {
      it('should delete an existing user', async () => {
        const user = TestUtil.giveValidUser();
        mockRepository.delete.mockReturnValue(user);
        mockRepository.findOne.mockReturnValue(user);

        const deletedUser = await service.deleteUser('1');

        expect(deletedUser).toBe(true);
        expect(mockRepository.findOne).toBeCalledTimes(1);
        expect(mockRepository.delete).toBeCalledTimes(1);
      });

      it('should not delete an inexisting user', async () => {
        const user = TestUtil.giveValidUser();
        mockRepository.delete.mockReturnValue(null);
        mockRepository.findOne.mockReturnValue(user);

        const deletedUser = await service.deleteUser('9');

        expect(deletedUser).toEqual(false);
        expect(mockRepository.findOne).toBeCalledTimes(1);
        expect(mockRepository.delete).toBeCalledTimes(1);
      });
    });
  });
});
