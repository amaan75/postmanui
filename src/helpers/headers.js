const reducer = (accumulator, currentValue) => `${accumulator},${currentValue}`;
const unReduce = (headerValueString) => {
  if (headerValueString !== undefined || headerValueString !== null) {
    return headerValueString.split(',');
  }
  return [];
}
export { reducer, unReduce }
