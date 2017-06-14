import { EightdwebPage } from './app.po';

describe('eightdweb App', () => {
  let page: EightdwebPage;

  beforeEach(() => {
    page = new EightdwebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
