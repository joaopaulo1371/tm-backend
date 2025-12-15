import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, ObjectLiteral } from 'typeorm';
import { PropertiesService } from './properties.service';
import { Property } from '../entities/property.entity';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T extends ObjectLiteral = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T extends ObjectLiteral = any>(): MockRepository<T> => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
  find: jest.fn(),
  createQueryBuilder: jest.fn(),
  count: jest.fn(),
});

describe('PropertiesService', () => {
  let service: PropertiesService;
  let repository: MockRepository<Property>;

  beforeEach(async () => {
    repository = createMockRepository<Property>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertiesService,
        {
          provide: getRepositoryToken(Property),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<PropertiesService>(PropertiesService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should create a property', async () => {
    const dto = { nome: 'Fazenda' } as any;
    (repository.create as jest.Mock).mockReturnValue(dto);
    (repository.save as jest.Mock).mockResolvedValue({ id: '1', ...dto });

    const res = await service.create(dto);
    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalled();
    expect(res).toEqual({ id: '1', nome: 'Fazenda' });
  });

  it('findOne should throw NotFoundException when not found', async () => {
    (repository.findOne as jest.Mock).mockResolvedValue(null);
    await expect(service.findOne('no-id')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('remove should call repository.remove when property exists', async () => {
    const property = { id: 'p1' } as any;
    (repository.findOne as jest.Mock).mockResolvedValue(property);
    (repository.remove as jest.Mock).mockResolvedValue(undefined);

    await service.remove('p1');
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 'p1' }, relations: ['lead'] });
    expect(repository.remove).toHaveBeenCalledWith(property);
  });

  it('update should assign and save', async () => {
    const property = { id: 'p2', nome: 'Old' } as any;
    const dto = { nome: 'New' } as any;
    (repository.findOne as jest.Mock).mockResolvedValue(property);
    (repository.save as jest.Mock).mockImplementation(async (p) => ({ ...p }));

    const res = await service.update('p2', dto);
    expect(repository.save).toHaveBeenCalled();
    expect(res.nome).toBe('New');
  });

  it('findByLead should return properties list', async () => {
    const list = [{ id: 'a' }];
    (repository.find as jest.Mock).mockResolvedValue(list);
    const res = await service.findByLead('lead1');
    expect(repository.find).toHaveBeenCalledWith({ where: { leadId: 'lead1' }, order: { createdAt: 'DESC' } });
    expect(res).toBe(list);
  });
});
