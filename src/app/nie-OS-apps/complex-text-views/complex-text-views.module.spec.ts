import { ComplexTextViewsModule } from './complex-text-views.module';

describe('ComplexTextViewsModule', () => {
  let complexTextViewsModule: ComplexTextViewsModule;

  beforeEach(() => {
    complexTextViewsModule = new ComplexTextViewsModule();
  });

  it('should create an instance', () => {
    expect(complexTextViewsModule).toBeTruthy();
  });
});
