import { AssignedModule } from './assigned.module';

describe('AssignedModule', () => {
  let assignedModule: AssignedModule;

  beforeEach(() => {
    assignedModule = new AssignedModule();
  });

  it('should create an instance', () => {
    expect(assignedModule).toBeTruthy();
  });
});
