/* eslint-disable perfectionist/sort-union-types */
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
  FontBackgroundColorPlugin,
  FontColorPlugin,
} from '@udecode/plate-font/react';
import { HighlightPlugin } from '@udecode/plate-highlight/react';
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  VideoPlugin,
} from '@udecode/plate-media/react';
import {
  ArrowUpToLineIcon,
  BaselineIcon,
  BoldIcon,
  Code2Icon,
  HighlighterIcon,
  ItalicIcon,
  PaintBucketIcon,
  StrikethroughIcon,
  UnderlineIcon,
  WandSparklesIcon,
} from 'lucide-react';

import { MoreDropdownMenu } from '@/components/plate-ui/more-dropdown-menu';

import { FeatureKeys } from '../editor/features';
import { AIToolbarButton } from './ai-toolbar-button';
import { AlignDropdownMenu } from './align-dropdown-menu';
import { ColorDropdownMenu } from './color-dropdown-menu';
import { CommentToolbarButton } from './comment-toolbar-button';
import { EmojiDropdownMenu } from './emoji-dropdown-menu';
import { ExportToolbarButton } from './export-toolbar-button';
import { FontSizeToolbarButton } from './font-size-toolbar-button';
import { RedoToolbarButton, UndoToolbarButton } from './history-toolbar-button';
import {
  BulletedIndentListToolbarButton,
  NumberedIndentListToolbarButton,
} from './indent-list-toolbar-button';
import { IndentTodoToolbarButton } from './indent-todo-toolbar-button';
import { IndentToolbarButton } from './indent-toolbar-button';
import { InsertDropdownMenu } from './insert-dropdown-menu';
import { LineHeightDropdownMenu } from './line-height-dropdown-menu';
import { LinkToolbarButton } from './link-toolbar-button';
import { MarkToolbarButton } from './mark-toolbar-button';
import { MediaToolbarButton } from './media-toolbar-button';
import { ModeDropdownMenu } from './mode-dropdown-menu';
import { OutdentToolbarButton } from './outdent-toolbar-button';
import { TableDropdownMenu } from './table-dropdown-menu';
import { ToggleToolbarButton } from './toggle-toolbar-button';
import { ToolbarGroup } from './toolbar';
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu';

// Define type for enabled features
type FixedToolbarButtonsProps = {
  enabledFeatures?: FeatureKeys[]; // Array of feature keys to enable
};

export function FixedToolbarButtons({
  enabledFeatures = [],
}: FixedToolbarButtonsProps) {
  const readOnly = useEditorReadOnly();

  const isFeatureEnabled = (feature: FeatureKeys) =>
    enabledFeatures.includes(feature);

  return (
    <div className="flex w-full">
      {!readOnly && (
        <>
          <ToolbarGroup>
            {isFeatureEnabled('undoRedo') && (
              <>
                <UndoToolbarButton />
                <RedoToolbarButton />
              </>
            )}
          </ToolbarGroup>

          <ToolbarGroup>
            {isFeatureEnabled('ai') && (
              <AIToolbarButton tooltip="AI commands">
                <WandSparklesIcon />
              </AIToolbarButton>
            )}
          </ToolbarGroup>

          <ToolbarGroup>
            {isFeatureEnabled('export') && (
              <ExportToolbarButton>
                <ArrowUpToLineIcon />
              </ExportToolbarButton>
            )}
          </ToolbarGroup>

          <ToolbarGroup>
            {isFeatureEnabled('insert') && (
              <>
                {isFeatureEnabled('insert') && (
                  <InsertDropdownMenu features={enabledFeatures} />
                )}
                {isFeatureEnabled('turnInto') && (
                  <TurnIntoDropdownMenu features={enabledFeatures} />
                )}
                {isFeatureEnabled('fontSize') && <FontSizeToolbarButton />}
              </>
            )}
          </ToolbarGroup>

          <ToolbarGroup>
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

            {isFeatureEnabled('textColor') && (
              <ColorDropdownMenu
                nodeType={FontColorPlugin.key}
                tooltip="Text color"
              >
                <BaselineIcon />
              </ColorDropdownMenu>
            )}

            {isFeatureEnabled('backgroundColor') && (
              <ColorDropdownMenu
                nodeType={FontBackgroundColorPlugin.key}
                tooltip="Background color"
              >
                <PaintBucketIcon />
              </ColorDropdownMenu>
            )}
          </ToolbarGroup>

          <ToolbarGroup>
            {isFeatureEnabled('alignment') && (
              <>
                {isFeatureEnabled('align') && <AlignDropdownMenu />}
                {isFeatureEnabled('numberedIndentList') && (
                  <NumberedIndentListToolbarButton />
                )}
                {isFeatureEnabled('bulletedIndentList') && (
                  <BulletedIndentListToolbarButton />
                )}
                {isFeatureEnabled('indentTodo') && <IndentTodoToolbarButton />}
                {isFeatureEnabled('toggleToolbar') && <ToggleToolbarButton />}
              </>
            )}
          </ToolbarGroup>

          <ToolbarGroup>
            {isFeatureEnabled('links') && <LinkToolbarButton />}
            {isFeatureEnabled('tables') && <TableDropdownMenu />}
            {isFeatureEnabled('emoji') && <EmojiDropdownMenu />}
          </ToolbarGroup>

          <ToolbarGroup>
            {isFeatureEnabled('images') && (
              <MediaToolbarButton nodeType={ImagePlugin.key} />
            )}
            {isFeatureEnabled('videos') && (
              <MediaToolbarButton nodeType={VideoPlugin.key} />
            )}
            {isFeatureEnabled('audio') && (
              <MediaToolbarButton nodeType={AudioPlugin.key} />
            )}
            {isFeatureEnabled('file') && (
              <MediaToolbarButton nodeType={FilePlugin.key} />
            )}
          </ToolbarGroup>

          <ToolbarGroup>
            {isFeatureEnabled('lineHeight') && <LineHeightDropdownMenu />}
            {isFeatureEnabled('outdent') && <OutdentToolbarButton />}
            {isFeatureEnabled('indent') && <IndentToolbarButton />}
          </ToolbarGroup>

          <ToolbarGroup>
            {isFeatureEnabled('moreOptions') && (
              <MoreDropdownMenu features={enabledFeatures} />
            )}
          </ToolbarGroup>
        </>
      )}

      <div className="grow" />

      <ToolbarGroup>
        {isFeatureEnabled('highlight') && (
          <MarkToolbarButton nodeType={HighlightPlugin.key} tooltip="Highlight">
            <HighlighterIcon />
          </MarkToolbarButton>
        )}
        {isFeatureEnabled('comments') && <CommentToolbarButton />}
      </ToolbarGroup>

      <ToolbarGroup>
        {isFeatureEnabled('mode') && <ModeDropdownMenu />}
      </ToolbarGroup>
    </div>
  );
}
