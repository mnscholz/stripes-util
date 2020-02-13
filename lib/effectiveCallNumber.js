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
 * @return {string} the effective call number
 */
export default function effectiveCallNumber(item) {
  if (has(item, 'item')) {
    const prefix = get(item, ['item', 'callNumberComponents', 'prefix'], '');
    const callNumber = get(item, ['item', 'callNumberComponents', 'callNumber'], '-');
    const suffix = get(item, ['item', 'callNumberComponents', 'suffix'], '');
    const enumeration = get(item, ['item', 'enumeration'], '');
    const chronology = get(item, ['item', 'chronology'], '');
    const volume = get(item, ['item', 'volume'], '');

    return `${prefix} ${callNumber} ${suffix} ${enumeration} ${chronology} ${volume}`;
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
