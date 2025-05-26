const priceHumanize = (price: number | undefined) => {
  let humanPrise = '';
  if (!price) return;
  if (price >= 1000000) {
    humanPrise = `${price / 1000000} میلیون‌ تومان`;
  }
  if (price >= 1000) {
    humanPrise = `${price / 1000} هزارتومان`;
  }
  return humanPrise;
};
export { priceHumanize };
