import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from '../services/properties.service';

const mockProperty = { id: '1', nome: 'Fazenda' };

describe('PropertiesController', () => {
  let controller: PropertiesController;
  let service: Partial<Record<keyof PropertiesService, jest.Mock>>;

  beforeEach(async () => {
    service = {
      create: jest.fn().mockResolvedValue(mockProperty),
      findAll: jest.fn().mockResolvedValue({ data: [mockProperty], meta: { total: 1 } }),
      findByLead: jest.fn().mockResolvedValue([mockProperty]),
      findOne: jest.fn().mockResolvedValue(mockProperty),
      update: jest.fn().mockResolvedValue({ ...mockProperty, nome: 'Updated' }),
      remove: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertiesController],
      providers: [{ provide: PropertiesService, useValue: service }],
    }).compile();

    controller = module.get<PropertiesController>(PropertiesController);
  });

  afterEach(() => jest.clearAllMocks());

  it('create should call service.create and return property', async () => {
    const dto = { nome: 'Fazenda' } as any;
    const res = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(res).toEqual(expect.objectContaining({ id: '1' }));
  });

  it('findOne should return a property', async () => {
    const res = await controller.findOne('1');
    expect(service.findOne).toHaveBeenCalledWith('1');
    expect(res).toEqual(expect.objectContaining({ id: '1' }));
  });

  it('findByLead should return list of properties', async () => {
    const res = await controller.findByLead('lead1');
    expect(service.findByLead).toHaveBeenCalledWith('lead1');
    expect(res).toEqual([expect.objectContaining({ id: '1' })]);
  });

  it('remove should call service.remove', async () => {
    await controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
