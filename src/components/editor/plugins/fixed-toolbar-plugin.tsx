'use client';

import { createPlatePlugin } from '@udecode/plate-common/react';

import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';

import { type FeatureKeys } from '../features';

export const FixedToolbarPlugin = (enabledFeatures: FeatureKeys[]) => {
  return createPlatePlugin({
    key: 'fixed-toolbar',
    render: {
      beforeEditable: () => (
        <FixedToolbar>
          <FixedToolbarButtons
            enabledFeatures={enabledFeatures ?? ['undoRedo']}
          />
        </FixedToolbar>
      ),
    },
  });
};
