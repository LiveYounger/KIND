import ApiService from './ApiService';
import * as RNIap from 'react-native-iap';
import { PREMIUM_SUBSCRIPTION_SKU } from '../constants';
import $t from 'react-native-i18n';
import { Platform } from 'react-native';
import { OS_TYPES } from '../constants';
import { format } from 'date-fns';

const ENDPOINTS = {
  ACTIVATE_PREMIUM:
    Platform.OS === OS_TYPES.IOS ? '/subscriptions/apple/' : '/subscriptions/google/'
};

class InAppPurchaseService extends ApiService {
  handlePurchaseSuccessfull = () => {};

  formatPurchase = purchase => ({
    transaction_id: purchase.transactionId,
    product_id: purchase.productId,
    start_date: format(new Date(purchase.transactionDate), 'yyyy-MM-dd'),
    receipt: Platform.OS === OS_TYPES.IOS ? purchase.transactionReceipt : purchase.purchaseToken
  });

  purchaseUpdatedListener = async purchase => {
    const receipt = purchase.transactionReceipt;

    if (!receipt) throw new Error($t('premium.purchaseNotCompleted'));

    const { data } = await this.apiClient.post(
      ENDPOINTS.ACTIVATE_PREMIUM,
      this.formatPurchase(purchase)
    );

    if (data.success) this.handlePurchaseSuccessfull();

    if (!data || !data.success) throw new Error($t('premium.failedToActivatePremium'));

    await RNIap.finishTransaction(purchase, false);
  };

  purchaseErrorListener = async error => {
    throw error;
  };

  init = async () => {
    const itemSkus = [PREMIUM_SUBSCRIPTION_SKU];

    await RNIap.getSubscriptions(itemSkus);

    await RNIap.initConnection();

    await RNIap.flushFailedPurchasesCachedAsPendingAndroid();

    this.purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(this.purchaseUpdatedListener);
  };

  requestPurchase = () => {
    return RNIap.requestPurchase(PREMIUM_SUBSCRIPTION_SKU, false);
  };

  requestSubscription = onPurchaseSuccess => {
    this.handlePurchaseSuccessfull = onPurchaseSuccess;
    return RNIap.requestSubscription(PREMIUM_SUBSCRIPTION_SKU);
  };

  restorePurchases = async onRestoreSuccess => {
    const purchases = await RNIap.getAvailablePurchases();

    purchases.forEach(async purchase => {
      if (purchase.productId === PREMIUM_SUBSCRIPTION_SKU) {
        const { data } = await this.apiClient.post(
          ENDPOINTS.ACTIVATE_PREMIUM,
          this.formatPurchase(purchase)
        );

        if (data.success) onRestoreSuccess();
      }
    });
  };
}

export const inAppPurchaseService = new InAppPurchaseService();
