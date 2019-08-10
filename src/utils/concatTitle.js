import get from 'lodash/get';

export default function(currency) {
  return `${get(currency, 'Name')}, ${get(currency, 'CharCode')}`;
}
