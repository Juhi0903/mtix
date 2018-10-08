import { PriorityModule } from './priority.module';

describe('PriorityModule', () => {
  let priorityModule: PriorityModule;

  beforeEach(() => {
    priorityModule = new PriorityModule();
  });

  it('should create an instance', () => {
    expect(priorityModule).toBeTruthy();
  });
});
