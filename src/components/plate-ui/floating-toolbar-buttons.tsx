'use client';

import React from 'react';

import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { useEditorReadOnly } from '@udecode/plate-common/react';
import {
  BoldIcon,
  Code2Icon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
  WandSparklesIcon,
} from 'lucide-react';

import { type FeatureKeys } from '../editor/features';
import { AIToolbarButton } from './ai-toolbar-button';
import { CommentToolbarButton } from './comment-toolbar-button';
import { InlineEquationToolbarButton } from './inline-equation-toolbar-button';
import { LinkToolbarButton } from './link-toolbar-button';
import { MarkToolbarButton } from './mark-toolbar-button';
import { MoreDropdownMenu } from './more-dropdown-menu';
import { ToolbarGroup } from './toolbar';
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu';

export function FloatingToolbarButtons({
  features,
}: {
  features: FeatureKeys[];
}) {
  const readOnly = useEditorReadOnly();
  const isFeatureEnabled = (feature: FeatureKeys) =>
    features?.includes(feature);

  return (
    <>
      {!readOnly && (
        <>
          <ToolbarGroup>
            {isFeatureEnabled('ai') && (
              <AIToolbarButton tooltip="AI commands">
                <WandSparklesIcon />
                Ask AI
              </AIToolbarButton>
            )}
          </ToolbarGroup>

          <ToolbarGroup>
            {isFeatureEnabled('turnInto') && (
              <TurnIntoDropdownMenu features={features} />
            )}

            {isFeatureEnabled('bold') && (
              <MarkToolbarButton nodeType={BoldPlugin.key} tooltip="Bold (⌘+B)">
                <BoldIcon />
              </MarkToolbarButton>
            )}

            {isFeatureEnabled('italic') && (
              <MarkToolbarButton
                nodeType={ItalicPlugin.key}
                tooltip="Italic (⌘+I)"
              >
                <ItalicIcon />
              </MarkToolbarButton>
            )}

            {isFeatureEnabled('underline') && (
              <MarkToolbarButton
                nodeType={UnderlinePlugin.key}
                tooltip="Underline (⌘+U)"
              >
                <UnderlineIcon />
              </MarkToolbarButton>
            )}

            {isFeatureEnabled('strikethrough') && (
              <MarkToolbarButton
                nodeType={StrikethroughPlugin.key}
                tooltip="Strikethrough (⌘+⇧+M)"
              >
                <StrikethroughIcon />
              </MarkToolbarButton>
            )}

            {isFeatureEnabled('code') && (
              <MarkToolbarButton nodeType={CodePlugin.key} tooltip="Code (⌘+E)">
                <Code2Icon />
              </MarkToolbarButton>
            )}

            {isFeatureEnabled('latex') && <InlineEquationToolbarButton />}

            {isFeatureEnabled('links') && <LinkToolbarButton />}
          </ToolbarGroup>
        </>
      )}

      <ToolbarGroup>
        {isFeatureEnabled('comments') && <CommentToolbarButton />}

        {!readOnly && <MoreDropdownMenu features={features} />}
      </ToolbarGroup>
    </>
  );
}
