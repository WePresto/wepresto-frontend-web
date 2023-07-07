const environment = {
  // APP CONFIG
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  DELAY_TIME: process.env.NEXT_PUBLIC_DELAY_TIME,
  BORROWER_TYPE: process.env.NEXT_PUBLIC_BORROWER_TYPE,
  LENDER_TYPE: process.env.NEXT_PUBLIC_LENDER_TYPE,
  APPLIED_LOAN_STATUS: process.env.NEXT_PUBLIC_APPLIED_LOAN_STATUS,
  REVIEWING_LOAN_STATUS: process.env.NEXT_PUBLIC_REVIEWING_LOAN_STATUS,
  APPROVED_LOAN_STATUS: process.env.NEXT_PUBLIC_APPROVED_LOAN_STATUS,
  DISBURSED_LOAN_STATUS: process.env.NEXT_PUBLIC_DISBURSED_LOAN_STATUS,
  LOAN_INSTALLMENT_MOVEMENT_TYPE: process.env.NEXT_PUBLIC_LOAN_INSTALLMENT_MOVEMENT_TYPE,
  OVERDUE_INTEREST_MOVEMENT_TYPE: process.env.NEXT_PUBLIC_OVERDUE_INTEREST_MOVEMENT_TYPE,
  PAYMENT_MOVEMENT_TYPE: process.env.NEXT_PUBLIC_PAYMENT_MOVEMENT_TYPE,
  PAYMENT_TERM_REDUCTION_MOVEMENT_TYPE: process.env.NEXT_PUBLIC_PAYMENT_TERM_REDUCTION_MOVEMENT_TYPE,
  PAYMENT_INSTALLMENT_AMOUNT_REDUCTION_MOVEMENT_TYPE: process.env.NEXT_PUBLIC_PAYMENT_INSTALLMENT_AMOUNT_REDUCTION_MOVEMENT_TYPE,
  MINIMUM_WITHDRAWAL_AMOUNT: 100000,
  // FIREBASE CONFIG
  FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  // FIREBASE CLOUD MESSAGING CONFIG
  FIREBASE_WEB_PUSH_KEY: process.env.NEXT_PUBLIC_FIREBASE_WEB_PUSH_KEY,
};

export default environment;
