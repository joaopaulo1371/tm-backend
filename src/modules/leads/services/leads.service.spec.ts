import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, ObjectLiteral } from 'typeorm';
import { LeadsService } from './leads.service';
import { Lead, LeadStatus } from '../entities/lead.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

type MockRepository<T extends ObjectLiteral = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T extends ObjectLiteral = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  count: jest.fn(),
  createQueryBuilder: jest.fn(),
});

describe('LeadsService', () => {
  let service: LeadsService;
  let repository: MockRepository<Lead>;

  beforeEach(async () => {
    repository = createMockRepository<Lead>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        {
          provide: getRepositoryToken(Lead),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<LeadsService>(LeadsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should throw ConflictException when creating a lead with existing cpf', async () => {
    const dto = { nome: 'Fulano', cpf: '123' } as any;
    (repository.findOne as jest.Mock).mockResolvedValue({ id: '1', cpf: '123' });

    await expect(service.create(dto)).rejects.toBeInstanceOf(ConflictException);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { cpf: dto.cpf } });
  });

  it('should create a lead when cpf not exists', async () => {
    const dto = { nome: 'Fulano', cpf: '321' } as any;
    (repository.findOne as jest.Mock).mockResolvedValue(null);
    (repository.create as jest.Mock).mockReturnValue(dto);
    (repository.save as jest.Mock).mockResolvedValue({ id: '42', ...dto });

    const result = await service.create(dto);
    expect(result).toMatchObject({ id: '42', nome: 'Fulano', cpf: '321' });
    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalled();
  });

  it('findOne should throw NotFoundException when not found', async () => {
    (repository.findOne as jest.Mock).mockResolvedValue(null);
    await expect(service.findOne('no-id')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('remove should call repository.remove when lead exists', async () => {
    const lead = { id: 'abc' } as any;
    (repository.findOne as jest.Mock).mockResolvedValue(lead);
    (repository.remove as jest.Mock).mockResolvedValue(undefined);

    await service.remove('abc');
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 'abc' }, relations: ['propriedades'] });
    expect(repository.remove).toHaveBeenCalledWith(lead);
  });

  it('update should throw ConflictException when cpf belongs to another lead', async () => {
    const lead = { id: '1', cpf: '111' } as any;
    const dto = { cpf: '222' } as any;

    (repository.findOne as jest.Mock)
      .mockResolvedValueOnce(lead)
      .mockResolvedValueOnce({ id: '2', cpf: '222' });

    await expect(service.update('1', dto)).rejects.toBeInstanceOf(Error);
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('update should save and recalculate prioridade', async () => {
    const lead = { id: '10', cpf: '999', prioritario: false } as any;
    const dto = { nome: 'Novo' } as any;

    (repository.findOne as jest.Mock)
      .mockResolvedValueOnce(lead)
      .mockResolvedValueOnce({ id: '10', propriedades: [{ areaHectares: 60 }, { areaHectares: 50 }] });

    (repository.save as jest.Mock).mockImplementation(async (l) => ({ ...l }));

    const result = await service.update('10', dto);
    expect(repository.save).toHaveBeenCalled();
    expect(result.prioritario).toBe(true);
    expect(result.nome).toBe('Novo');
  });

  it('getDashboard should return aggregated counts and lists', async () => {
    (repository.count as jest.Mock).mockResolvedValueOnce(42).mockResolvedValueOnce(7);

    const qbStatus: any = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue([{ status: 'NEW', count: '2' }]),
    };

    const qbMunicipio: any = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue([{ municipio: 'X', count: '3' }]),
    };

    (repository.createQueryBuilder as jest.Mock)
      .mockReturnValueOnce(qbStatus)
      .mockReturnValueOnce(qbMunicipio);

    const dashboard = await service.getDashboard();
    expect(dashboard.totalLeads).toBe(42);
    expect(dashboard.leadsPrioritarios).toBe(7);
    expect(dashboard.leadsByStatus[0]).toEqual({ status: 'NEW', count: 2 });
    expect(dashboard.leadsByMunicipio[0]).toEqual({ municipio: 'X', count: 3 });
  });
});
