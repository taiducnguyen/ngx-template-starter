export module Configs {
  export const StartYear = 2015;
  export const fullMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  export const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  export const PageIndex = 1;
  export const PageSize = 25;
  export const VAT = 10;
  export const FileMaximunSize = 1; // MB
  export const DivideItemNumber = 6;

  export const TokenPrefix = 'supplychain';
  export const FileExtensions = ['docx', 'doc', 'pdf'];
  export const FileExtensionsContainer = ['xls', 'xlsx'];

  export const defaultPageSize = 25;
  export const defaultFirstPageLazyLoad = 5;
  export const defaultSecondPageLazyLoad = 2;

  export const AccountTypes = [{ value: 1, text: 'Private' }, { value: 2, text: 'Company' }];

  export const UserRoles = [
    { value: 'admin', label: 'Admin' },
    { value: 'owner', label: 'Owner' },
    { value: 'guest', label: 'Guest' }
  ];

  export const AppSuffix = 'sp';

  export enum RouterUrl {
    TradeInfo = 'sp/trade-info',
    PreShipmentSample = 'sp/preshipment-sample',
    ShippingInstructions = 'sp/shipping-instructions',
    DocumentRepository = 'sp/document-repository',
    Booking = 'sp/booking',
    ShippingAdvice = 'sp/shipping-advice',
    Invoicing = 'sp/invoicing',
    Custom = 'sp/custom',
    Trucker = 'sp/trucker',
    Warehouse = 'sp/warehouse',
    DeliveryOrder = 'sp/delivery-order',
    CoverLetter = 'sp/cover-letter',
    ArrivalSample = 'sp/arrival-sample',
    CounterpartConfiguration = 'counterpart-configuration'
  }

  export function NewGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
