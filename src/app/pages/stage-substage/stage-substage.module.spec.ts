import { StageSubstageModule } from './stage-substage.module';

describe('StageSubstageModule', () => {
  let stageSubstageModule: StageSubstageModule;

  beforeEach(() => {
    stageSubstageModule = new StageSubstageModule();
  });

  it('should create an instance', () => {
    expect(stageSubstageModule).toBeTruthy();
  });
});
