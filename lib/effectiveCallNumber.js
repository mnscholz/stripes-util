import { get } from 'lodash';

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
