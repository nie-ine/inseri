import { RichTextModule } from './rich-text.module';

describe('RichTextModule', () => {
  let spaTextModule: RichTextModule;

  beforeEach(() => {
    spaTextModule = new RichTextModule();
  });

  it('should create an instance', () => {
    expect(spaTextModule).toBeTruthy();
  });
});
