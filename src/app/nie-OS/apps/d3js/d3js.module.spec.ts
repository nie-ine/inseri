import { D3jsModule } from './d3js.module';

describe('D3jsModule', () => {
  let d3jsModule: D3jsModule;

  beforeEach(() => {
    d3jsModule = new D3jsModule();
  });

  it('should create an instance', () => {
    expect(d3jsModule).toBeTruthy();
  });
});
