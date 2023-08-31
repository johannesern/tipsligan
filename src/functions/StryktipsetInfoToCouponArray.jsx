export default function StryktipsetInfoToCouponArray(couponWithInfo) {
  const onlyCoupon = [];
  for (let i = 0; i < couponWithInfo.Array.length; i++) {
    onlyCoupon.push(couponWithInfo[i].outcome);
  }
  return onlyCoupon;
}
