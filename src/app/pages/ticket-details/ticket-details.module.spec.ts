import { TicketDetailsModule } from './ticket-details.module';

describe('TicketDetailsModule', () => {
  let ticketDetailsModule: TicketDetailsModule;

  beforeEach(() => {
    ticketDetailsModule = new TicketDetailsModule();
  });

  it('should create an instance', () => {
    expect(ticketDetailsModule).toBeTruthy();
  });
});
