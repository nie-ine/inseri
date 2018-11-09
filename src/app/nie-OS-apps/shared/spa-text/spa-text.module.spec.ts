import { SpaTextModule } from './spa-text.module';

describe('SpaTextModule', () => {
  let spaTextModule: SpaTextModule;

  beforeEach(() => {
    spaTextModule = new SpaTextModule();
  });

  it('should create an instance', () => {
    expect(spaTextModule).toBeTruthy();
  });
});
