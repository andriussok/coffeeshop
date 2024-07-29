export function getRandomProductIds(products, count) {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(product => product.id);
}