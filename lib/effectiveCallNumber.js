import {
  get,
  has,
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
  if (has(item, 'item')) {
    const prefix = get(item, ['item', 'effectiveCallNumberComponents', 'prefix']) ||
      get(item, ['item', 'callNumberComponents', 'prefix'], '');
    const callNumber = get(item, ['item', 'effectiveCallNumberComponents', 'callNumber']) ||
      get(item, ['item', 'callNumberComponents', 'callNumber'], '-');
    const suffix = get(item, ['item', 'effectiveCallNumberComponents', 'suffix']) ||
      get(item, ['item', 'callNumberComponents', 'suffix'], '');

    return [
      prefix,
      callNumber,
      suffix,
      get(item, 'enumeration', ''),
      get(item, 'chronology', ''),
      get(item, 'volume', ''),
    ].join(' ');
  } else {
    const prefix = get(item, 'effectiveCallNumberComponents.prefix') ||
      get(item, 'callNumberComponents.prefix', '');
    const suffix = get(item, 'effectiveCallNumberComponents.suffix') ||
      get(item, 'callNumberComponents.suffix', '');
    const callNumber = get(item, 'effectiveCallNumberComponents.callNumber') ||
      get(item, 'callNumberComponents.callNumber', '');

    return [
      prefix,
      callNumber,
      suffix,
      get(item, 'volume', ''),
      get(item, 'enumeration', ''),
      get(item, 'chronology', ''),
      get(item, 'copyNumbers[0]', ''),
    ].join(' ');
  }
}
