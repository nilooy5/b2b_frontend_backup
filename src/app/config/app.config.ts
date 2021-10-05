export class AppConfig {
    /**
     * Default Image Urls
     */
    public defaultImage = '/assets/img/config/default.png';
    public defaultImageSmall = '/assets/img/config/default-small.jpg';
    public errorImage = '/assets/img/config/error.png';
    public errorImageSmall = '/assets/img/config/error-small.jpg';
    /**
     * Config Data
     */
    public scrollOffset = 400;
    public defaultListLimit = 15;
    public defaultUserCookiePath = 'user';
    public defaultProcurementBidCompareIndexCookiePath = 'procurementBidCompareIndexes';
}

export const appConfig = new AppConfig();

