import { StatusDetailsModule } from './status-details.module';

describe('StatusDetailsModule', () => {
  let statusDetailsModule: StatusDetailsModule;

  beforeEach(() => {
    statusDetailsModule = new StatusDetailsModule();
  });

  it('should create an instance', () => {
    expect(statusDetailsModule).toBeTruthy();
  });
});
