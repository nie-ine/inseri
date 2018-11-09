import { DeveloperNotesModule } from './developer-notes.module';

describe('DeveloperNotesModule', () => {
  let developerNotesModule: DeveloperNotesModule;

  beforeEach(() => {
    developerNotesModule = new DeveloperNotesModule();
  });

  it('should create an instance', () => {
    expect(developerNotesModule).toBeTruthy();
  });
});
