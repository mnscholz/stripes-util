import {
  get,
  has,
  compact,
} from 'lodash';

/**
 * Given an item and holdings record, return its effective call number as a string.
 *
 * The effective call number is composed of the following elements
 * which are scattered across an item record:
 *   <EffectiveCallNumberPrefix>
 *   <EffectiveCallNumber>
 *   <EffectiveCallNumberSuffix>
 *   <Volume>
 *   <Enumeration>
 *   <Chronology>
 *   <EffectiveCopy>
 *
 * @param {object} item an item record as returned from /inventory/items/${item-id}
 * @param {object} item returned from circulation/loans with structure {item: {}}
 * @return {string} the effective call number
 */
export default function effectiveCallNumber(item) {
  const rootItem = item?.item ?? item;

  const prefix = get(rootItem, 'effectiveCallNumberComponents.prefix') ||
    get(rootItem, 'callNumberComponents.prefix', '');
  const suffix = get(rootItem, 'effectiveCallNumberComponents.suffix') ||
    get(rootItem, 'callNumberComponents.suffix', '');
  const callNumber = get(rootItem, 'effectiveCallNumberComponents.callNumber') ||
    get(rootItem, 'callNumberComponents.callNumber', '');

  const result = compact([
    prefix,
    callNumber,
    suffix,
    get(rootItem, 'volume', ''),
    get(rootItem, 'enumeration', ''),
    get(rootItem, 'chronology', ''),
    get(rootItem, 'copyNumbers[0]', ''),
  ]);

  if (!has(item, 'item')) {
    result.push(get(rootItem, 'copyNumbers[0]', ''));
  }

  return result.join(' ');
}
