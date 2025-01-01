'use client';

import { BlockMenuPlugin } from '@udecode/plate-selection/react';

import { BlockContextMenu } from '@/components/plate-ui/block-context-menu';

import { type FeatureKeys } from '../features';
import { blockSelectionPlugins } from './block-selection-plugins';

export const blockMenuPlugins = (features: FeatureKeys[]) => {
  const BlockContextMenuFiltered = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    return BlockContextMenu({ children, features });
  };
  return [
    ...blockSelectionPlugins,
    BlockMenuPlugin.configure({
      render: { aboveEditable: BlockContextMenuFiltered },
    }),
  ] as const;
};
