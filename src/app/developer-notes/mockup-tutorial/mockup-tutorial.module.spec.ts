import { MockupTutorialModule } from './mockup-tutorial.module';

describe('MockupTutorialModule', () => {
  let mockupTutorialModule: MockupTutorialModule;

  beforeEach(() => {
    mockupTutorialModule = new MockupTutorialModule();
  });

  it('should create an instance', () => {
    expect(mockupTutorialModule).toBeTruthy();
  });
});
