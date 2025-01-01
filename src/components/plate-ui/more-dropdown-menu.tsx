'use client';

import React from 'react';

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

import {
  SubscriptPlugin,
  SuperscriptPlugin,
} from '@udecode/plate-basic-marks/react';
import { collapseSelection } from '@udecode/plate-common';
import { focusEditor, useEditorRef } from '@udecode/plate-common/react';
import { KbdPlugin } from '@udecode/plate-kbd/react';
import {
  KeyboardIcon,
  MoreHorizontalIcon,
  SubscriptIcon,
  SuperscriptIcon,
} from 'lucide-react';

import { FeatureKeys } from '../editor/features';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';

export function MoreDropdownMenu(
  props: DropdownMenuProps & { features: FeatureKeys[] }
) {
  const editor = useEditorRef();
  const openState = useOpenState();

  const isFeatureEnabled = (feature: FeatureKeys) =>
    props.features?.includes(feature);

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Insert">
          <MoreHorizontalIcon />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="ignore-click-outside/toolbar flex max-h-[500px] min-w-[180px] flex-col overflow-y-auto"
        align="start"
      >
        <DropdownMenuGroup>
          {isFeatureEnabled('keyboardInput') && (
            <DropdownMenuItem
              onSelect={() => {
                editor.tf.toggle.mark({ key: KbdPlugin.key });
                collapseSelection(editor, { edge: 'end' });
                focusEditor(editor);
              }}
            >
              <KeyboardIcon />
              Keyboard input
            </DropdownMenuItem>
          )}

          {isFeatureEnabled('superscript') && (
            <DropdownMenuItem
              onSelect={() => {
                editor.tf.toggle.mark({
                  key: SuperscriptPlugin.key,
                  clear: [SubscriptPlugin.key, SuperscriptPlugin.key],
                });
                focusEditor(editor);
              }}
            >
              <SuperscriptIcon />
              Superscript
              {/* (⌘+,) */}
            </DropdownMenuItem>
          )}
          {isFeatureEnabled('subscript') && (
            <DropdownMenuItem
              onSelect={() => {
                editor.tf.toggle.mark({
                  key: SubscriptPlugin.key,
                  clear: [SuperscriptPlugin.key, SubscriptPlugin.key],
                });
                focusEditor(editor);
              }}
            >
              <SubscriptIcon />
              Subscript
              {/* (⌘+.) */}
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
