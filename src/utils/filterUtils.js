export function generateFilters(products) {
  const filters = [];

  const addFilter = (id, name, type) => {
    const optionsSet = new Set();
    products.forEach(product => {
      if (Array.isArray(product[id])) {
        product[id].forEach(value => optionsSet.add(value.toString().toLowerCase()));
      } else {
        optionsSet.add(product[id].toString().toLowerCase());
      }
    });

    const options = [...optionsSet].sort();
    filters.push({ id, name, type, options });
  };
  
  addFilter('flavor_profile', 'Flavour', 'checkbox');
  addFilter('roast_level', 'Roast Level', 'checkbox');
  addFilter('grind_option', 'Grind Option', 'checkbox');
  addFilter('region', 'Region', 'checkbox');

  return filters;
}