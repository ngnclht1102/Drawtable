import {
  unauthenticatedPost,
  authenticatedPut,
  authenticatedGet,
  authenticatedPost,
  authenticatedPutMultipart,
  buildGetQuery,
} from './helper.api';
import global from '@/global';

export const getUserAccountInfo = () => authenticatedGet('/user/v1/user');

export const checkEmailExists = (params: {
  email: string;
  filter_type?: boolean;
}) => authenticatedGet(`/user/v1/users/email_exists?${buildGetQuery(params)}`);

export const checkIfPhoneNumberExisted = (p: {
  countryCode: string;
  phoneWithoutCountryCode: string;
}) => {
  const getQuery = buildGetQuery({
    country_code: p.countryCode.includes('+')
      ? p.countryCode
      : `+${p.countryCode}`,
    phone_number_without_code: p.phoneWithoutCountryCode,
  });
  return authenticatedGet(`/user/v1/users/phone_number_exists?${getQuery}`);
};

export const loginByFirebaseToken = (token: string) =>
  unauthenticatedPost('/user/v1/sessions', {token}, true);

export const checkOrganizationExists = (code: string) =>
  authenticatedGet(`/user/v1/organizations/code_exists?code=${code}`);

export const previewBeforeConvertFromB2CToB2B = () =>
  authenticatedGet(`/user/v1/organization_accounts/preview`);

export const createSession = ({
  token,
  nickname,
}: {
  token: string;
  nickname: string;
}) => unauthenticatedPost('/user/v1/sessions', {token, nickname}, true);

export const getActivePaymentMethod = () =>
  authenticatedGet('/user/v1/payment_methods/active');

export const getActiveSubscription = () =>
  authenticatedGet('/user/v1/subscription');

export const saveOrganizationUserInfo = ({
  token,
  nickname,
  organizationCode,
}: {
  token: string;
  nickname: string;
  organizationCode: string;
}) =>
  unauthenticatedPost(
    '/user/v1/sessions',
    {
      organization_token: token,
      nickname: nickname,
      organization_code: organizationCode
        ? organizationCode.toUpperCase()
        : null,
    },
    true,
  );

export const updatePhoneNumber = async ({
  countryCode,
  phone,
  token,
}: {
  countryCode: string;
  phone: string;
  token: string;
}) => {
  // to make sure country code start with + and is a string
  const modifiedCountryCode =
    typeof countryCode === 'string'
      ? countryCode.indexOf('+') === -1
        ? `+${countryCode}`
        : countryCode
      : `+${countryCode}`;
  return await authenticatedPut(
    '/user/v1/users/update_phone_number',
    {
      user: {
        country_code: modifiedCountryCode,
        phone_number_without_code: phone,
      },
      token: token,
    },
    true,
  );
};
export const updateName = async ({
  first_name,
  last_name,
}: {
  first_name: string;
  last_name: string;
}) => {
  return await authenticatedPut(
    '/user/v1/users/update_name',
    {
      user: {
        first_name,
        last_name,
      },
    },
    true,
  );
};
export const getPackages = async () => {
  return await authenticatedGet('/user/v1/packages');
};

export const getTransactionHistory = ({page}: {page: number}) =>
  authenticatedGet(`/user/v1/transactions?page=${page}&page_size=20`);

export const subscribeToPackage = (p: {
  paymentMethod: string;
  brand?: string;
  last4?: string;
  exp_month?: string;
  exp_year?: string;
}) => {
  const {paymentMethod, brand, last4, exp_month, exp_year} = p;
  console.log(
    'inside subscribeToPackage api, global.choosePackageFlow',
    global.choosePackageFlow,
  );
  const selectedPackage = global.choosePackageFlow.selectedPackageId;
  const selectedPromotionCode = global.choosePackageFlow.selectedPromotionCode;
  const card =
    brand && last4 && exp_month && exp_year
      ? {
          brand,
          last4,
          exp_month,
          exp_year,
        }
      : undefined;
  const params = {
    payment_method: paymentMethod,
    card: card,
    coupon: selectedPromotionCode ? selectedPromotionCode : undefined,
  };
  return authenticatedPost(
    `/user/v1/packages/${selectedPackage}/subscribe`,
    params,
    true,
  );
};

export const updateSubscription = () => {
  const selectedPackage = global.choosePackageFlow.selectedPackageId;
  const selectedPromotionCode = global.choosePackageFlow.selectedPromotionCode;

  const params = {
    package_id: selectedPackage,
    coupon: selectedPromotionCode ? selectedPromotionCode : undefined,
  };
  console.log('inside updateSubscription', global.choosePackageFlow, params);
  return authenticatedPut(`/user/v1/subscription`, params, true);
};

export const cancelSubscription = () => {
  return authenticatedPost(`/user/v1/subscription/cancel`, {}, true);
};

export const previewPackage = (packageId: number) => {
  return authenticatedGet(
    `/user/v1/subscription/preview?package_id=${packageId}`,
  );
};

export const applyCoupon = (coupon: string) => {
  return authenticatedPut(`/user/v1/subscription/apply_coupon`, {coupon}, true);
};

export const markNoficationAsOpened = (notification_id: string) => {
  return authenticatedPut(
    `/user/v1/custom_notifications/${notification_id}/click`,
    {},
    true,
  );
};

export const updateCard = (
  paymentMethod: string,
  brand: string,
  last4: string,
  exp_month: string,
  exp_year: string,
) => {
  const card = {
    brand,
    last4,
    exp_month,
    exp_year,
  };
  const params = {
    payment_method: paymentMethod,
    card: card,
  };
  return authenticatedPost(`/user/v1/payment_methods`, params, true);
};
export const getProviders = () => authenticatedGet('/user/v1/providers');
export const chooseProvider = async (providerId: number | string) => {
  const chooseProviderRes = await authenticatedPost(
    `/user/v1/providers/${providerId}/choose`,
    {},
    true,
  );
  return {
    chooseProviderRes,
  };
};
export const getFeedbacks = ({page}: {page: number}) =>
  authenticatedGet(`/user/v1/growths?page_size=10&page=${page}`);
export const getDassAssessment = ({page}: {page: number}) =>
  authenticatedGet(`/user/v1/dass_assessment?page_size=10&page=${page}`);
export const getDraftDassAssessment = () =>
  authenticatedGet(`/user/v1/dass_assessment/draft`);
export const getTodayFeedback = () =>
  authenticatedGet(`/user/v1/growths/today`);

export const getEmergencyContact = () =>
  authenticatedGet(`/user/v1/emergency_contact`);

export const createAndUpdateEmergencyContact = (data: {
  first_name: string;
  last_name: string;
  relationship: string;
  mobile_number: string;
}) =>
  authenticatedPost(
    `/user/v1/emergency_contact`,
    {
      emergency_contact: data,
    },
    true,
  );
