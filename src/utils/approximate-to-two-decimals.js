const approximateToTwoDecimals = (value = 0) => {
  return Math.ceil(value * 100) / 100;
};

export default approximateToTwoDecimals;

