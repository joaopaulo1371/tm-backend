import { Test, TestingModule } from '@nestjs/testing';
import { LeadsController } from './leads.controller';
import { LeadsService } from '../services/leads.service';

const mockLead = { id: '1', nome: 'Fulano', cpf: '123' };

describe('LeadsController', () => {
  let controller: LeadsController;
  let service: Partial<Record<keyof LeadsService, jest.Mock>>;

  beforeEach(async () => {
    service = {
      create: jest.fn().mockResolvedValue(mockLead),
      findAll: jest.fn().mockResolvedValue({ data: [mockLead], meta: { total: 1 } }),
      findOne: jest.fn().mockResolvedValue(mockLead),
      update: jest.fn().mockResolvedValue({ ...mockLead, nome: 'Updated' }),
      remove: jest.fn().mockResolvedValue(undefined),
      getDashboard: jest.fn().mockResolvedValue({} as any),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadsController],
      providers: [{ provide: LeadsService, useValue: service }],
    }).compile();

    controller = module.get<LeadsController>(LeadsController);
  });

  afterEach(() => jest.clearAllMocks());

  it('create should call service.create and return lead', async () => {
    const dto = { nome: 'Fulano', cpf: '123' } as any;
    const res = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(res).toEqual(mockLead);
  });

  it('findOne should return a lead', async () => {
    const res = await controller.findOne('1');
    expect(service.findOne).toHaveBeenCalledWith('1');
    expect(res).toEqual(mockLead);
  });

  it('remove should call service.remove', async () => {
    await controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
