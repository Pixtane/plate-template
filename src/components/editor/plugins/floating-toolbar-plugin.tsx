'use client';

import { createPlatePlugin } from '@udecode/plate-common/react';

import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';

import { type FeatureKeys } from '../features';

export const FloatingToolbarPlugin = (features: FeatureKeys[]) => {
  const FloatingToolbarButtonsFiltered = () => (
    <FloatingToolbarButtons features={features} />
  );
  return createPlatePlugin({
    key: 'floating-toolbar',
    render: {
      afterEditable: () => (
        <FloatingToolbar>
          <FloatingToolbarButtonsFiltered />
        </FloatingToolbar>
      ),
    },
  });
};
