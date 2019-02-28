import { TextDevViewModule } from './text-dev-view.module';

describe('TextDevViewModule', () => {
  let textDevViewModule: TextDevViewModule;

  beforeEach(() => {
    textDevViewModule = new TextDevViewModule();
  });

  it('should create an instance', () => {
    expect(textDevViewModule).toBeTruthy();
  });
});
