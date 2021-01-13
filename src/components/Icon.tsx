import React, {ComponentProps} from 'react';
import {Icon as NBIcon} from 'native-base';

const Icon = (props: ComponentProps<any>) => {
  return <NBIcon {...props} type="MaterialIcons" />;
};

export default Icon;
