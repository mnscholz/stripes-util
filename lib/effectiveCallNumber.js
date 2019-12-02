import { get } from 'lodash';

/**
 * Given an item record, return its effective call number as a string.
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
  const parts = [];
  parts.push(get(item, 'callNumberComponents.prefix', ''));
  parts.push(get(item, 'callNumberComponents.callNumber', ''));
  parts.push(get(item, 'callNumberComponents.suffix', ''));
  parts.push(get(item, 'volume', ''));
  parts.push(get(item, 'enumeration', ''));
  parts.push(get(item, 'chronology', ''));
  parts.push(get(item, 'copyNumbers[0]', ''));

  return parts.join('');
}
