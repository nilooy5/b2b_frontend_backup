import { DateRangePickerModule } from './date-range-picker.module';

describe('DateRangePickerModule', () => {
  let dateRangePickerModule: DateRangePickerModule;

  beforeEach(() => {
    dateRangePickerModule = new DateRangePickerModule();
  });

  it('should create an instance', () => {
    expect(dateRangePickerModule).toBeTruthy();
  });
});
