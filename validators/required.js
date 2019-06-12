import React from 'react';
import { FormattedMessage } from 'react-intl';

export default value => (
  !value ? <FormattedMessage id="stripes-core.label.missingRequiredField" /> : undefined
);
