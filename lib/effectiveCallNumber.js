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
 * @param {object} holdingsRecord an optional holdings record returned from holdings-storage/holdings/${holdingsrecord-id}
 * @return {string} the effective call number
 */
export default function effectiveCallNumber(item, holdingsRecord) {
  const prefix = get(item, 'callNumberComponents.prefix') ||
    get(holdingsRecord, 'callNumberPrefix', '');
  const callNumber = get(item, 'callNumberComponents.callNumber') ||
    get(holdingsRecord, 'callNumber', '');
  const suffix = get(item, 'callNumberComponents.suffix', '') ||
    get(holdingsRecord, 'callNumberSuffix', '');

  return [
    prefix,
    callNumber,
    suffix,
    get(item, 'volume', ''),
    get(item, 'enumeration', ''),
    get(item, 'chronology', ''),
    get(item, 'copyNumbers[0]', '')
  ].join(' ');
}
