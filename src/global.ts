/**
 * this is for storing object, that used widely
 * some object was reflected already on redux state, but we still keep in synced here for using in some place that not comfortable to access redux state
 */

const defaultChoosePackageFlow = {
  isFromChooseProviderScreen: false,
  selectedPackageId: null,
  selectedProviderId: null,
  selectedPromotionCode: '',
};
class global {
  public app: any;
  public appStateHistory: string[];
  public choosePackageFlow: {
    isFromChooseProviderScreen: boolean; // if user go to choose package flow from choose provider screen
    selectedPackageId: any;
    selectedPromotionCode: string;
    selectedProviderId: any; // of course if isFromChooseProviderScreen === true only
  };
  public hideLearnTab: boolean = false;
  public hideEarningHistory: boolean = true;
  public useRN_render_html: boolean = true;

  constructor() {
    // @ts-ignore
    this.app = 'user';
    this.choosePackageFlow = defaultChoosePackageFlow;
    this.appStateHistory = [];
  }

  public resetChoosePackageFlow = () => {
    this.choosePackageFlow = defaultChoosePackageFlow;
  };

  public isProfessionalApp = () => this.app === 'user';

  public isUserApp = () => this.app !== 'professional';
}

const global_instance = new global();
export default global_instance;
