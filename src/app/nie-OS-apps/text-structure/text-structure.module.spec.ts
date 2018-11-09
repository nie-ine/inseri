import { TextStructureModule } from './text-structure.module';

describe('TextStructureModule', () => {
  let textStructureModule: TextStructureModule;

  beforeEach(() => {
    textStructureModule = new TextStructureModule();
  });

  it('should create an instance', () => {
    expect(textStructureModule).toBeTruthy();
  });
});
