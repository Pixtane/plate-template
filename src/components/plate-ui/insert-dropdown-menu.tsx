'use client';

import React from 'react';

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { CodeBlockPlugin } from '@udecode/plate-code-block/react';
import {
  type PlateEditor,
  ParagraphPlugin,
  focusEditor,
  useEditorRef,
} from '@udecode/plate-common/react';
import { DatePlugin } from '@udecode/plate-date/react';
import { ExcalidrawPlugin } from '@udecode/plate-excalidraw/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { TocPlugin } from '@udecode/plate-heading/react';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { INDENT_LIST_KEYS, ListStyleType } from '@udecode/plate-indent-list';
import { LinkPlugin } from '@udecode/plate-link/react';
import {
  EquationPlugin,
  InlineEquationPlugin,
} from '@udecode/plate-math/react';
import { ImagePlugin, MediaEmbedPlugin } from '@udecode/plate-media/react';
import { TablePlugin } from '@udecode/plate-table/react';
import { TogglePlugin } from '@udecode/plate-toggle/react';
import {
  CalendarIcon,
  ChevronRightIcon,
  Columns3Icon,
  FileCodeIcon,
  FilmIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  Link2Icon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  PenToolIcon,
  PilcrowIcon,
  PlusIcon,
  QuoteIcon,
  RadicalIcon,
  SquareIcon,
  TableIcon,
  TableOfContentsIcon,
} from 'lucide-react';

import {
  insertBlock,
  insertInlineElement,
} from '@/components/editor/transforms';

import { type FeatureKeys } from '../editor/features';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';

type Group = {
  group: string;
  items: Item[];
};

interface Item {
  featureName: FeatureKeys;
  icon: React.ReactNode;
  onSelect: (editor: PlateEditor, value: string) => void;
  value: string;
  focusEditor?: boolean;
  label?: string;
}

const groups: Group[] = [
  {
    group: 'Basic blocks',
    items: [
      {
        featureName: 'paragraph' as FeatureKeys,
        icon: <PilcrowIcon />,
        label: 'Paragraph',
        value: ParagraphPlugin.key,
      },
      {
        featureName: 'headings123' as FeatureKeys,
        icon: <Heading1Icon />,
        label: 'Heading 1',
        value: HEADING_KEYS.h1,
      },
      {
        featureName: 'headings123' as FeatureKeys,
        icon: <Heading2Icon />,
        label: 'Heading 2',
        value: HEADING_KEYS.h2,
      },
      {
        featureName: 'headings123' as FeatureKeys,
        icon: <Heading3Icon />,
        label: 'Heading 3',
        value: HEADING_KEYS.h3,
      },
      {
        featureName: 'tables' as FeatureKeys,
        icon: <TableIcon />,
        label: 'Table',
        value: TablePlugin.key,
      },
      {
        featureName: 'code' as FeatureKeys,
        icon: <FileCodeIcon />,
        label: 'Code',
        value: CodeBlockPlugin.key,
      },
      {
        featureName: 'blockquote' as FeatureKeys,
        icon: <QuoteIcon />,
        label: 'Quote',
        value: BlockquotePlugin.key,
      },
      {
        featureName: 'divider' as FeatureKeys,
        icon: <MinusIcon />,
        label: 'Divider',
        value: HorizontalRulePlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: 'Lists',
    items: [
      {
        featureName: 'bulletedIndentList' as FeatureKeys,
        icon: <ListIcon />,
        label: 'Bulleted list',
        value: ListStyleType.Disc,
      },
      {
        featureName: 'numberedIndentList' as FeatureKeys,
        icon: <ListOrderedIcon />,
        label: 'Numbered list',
        value: ListStyleType.Decimal,
      },
      {
        featureName: 'indentTodo' as FeatureKeys,
        icon: <SquareIcon />,
        label: 'To-do list',
        value: INDENT_LIST_KEYS.todo,
      },
      {
        featureName: 'toggleList' as FeatureKeys,
        icon: <ChevronRightIcon />,
        label: 'Toggle list',
        value: TogglePlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: 'Media',
    items: [
      {
        featureName: 'images' as FeatureKeys,
        icon: <ImageIcon />,
        label: 'Image',
        value: ImagePlugin.key,
      },
      {
        featureName: 'videos' as FeatureKeys,
        icon: <FilmIcon />,
        label: 'Embed',
        value: MediaEmbedPlugin.key,
      },
      {
        featureName: 'excalidraw' as FeatureKeys,
        icon: <PenToolIcon />,
        label: 'Excalidraw',
        value: ExcalidrawPlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: 'Advanced blocks',
    items: [
      {
        featureName: 'toc' as FeatureKeys,
        icon: <TableOfContentsIcon />,
        label: 'Table of contents',
        value: TocPlugin.key,
      },
      {
        featureName: '3column' as FeatureKeys,
        icon: <Columns3Icon />,
        label: '3 columns',
        value: 'action_three_columns',
      },
      {
        featureName: 'block-latex' as FeatureKeys,
        focusEditor: false,
        icon: <RadicalIcon />,
        label: 'Equation',
        value: EquationPlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: 'Inline',
    items: [
      {
        featureName: 'links' as FeatureKeys,
        icon: <Link2Icon />,
        label: 'Link',
        value: LinkPlugin.key,
      },
      {
        featureName: 'date' as FeatureKeys,
        focusEditor: true,
        icon: <CalendarIcon />,
        label: 'Date',
        value: DatePlugin.key,
      },
      {
        featureName: 'latex' as FeatureKeys,
        focusEditor: false,
        icon: <RadicalIcon />,
        label: 'Inline Equation',
        value: InlineEquationPlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertInlineElement(editor, value);
      },
    })),
  },
];

export function InsertDropdownMenu(
  props: DropdownMenuProps & { features: FeatureKeys[] }
) {
  const editor = useEditorRef();
  const openState = useOpenState();

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Insert" isDropdown>
          <PlusIcon />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="flex max-h-[500px] min-w-0 flex-col overflow-y-auto"
        align="start"
      >
        {groups.map(({ group, items: nestedItems }) => (
          <DropdownMenuGroup key={group} label={group}>
            {nestedItems.map(
              ({ featureName, icon, label, value, onSelect }) =>
                props.features.includes(featureName) && (
                  <DropdownMenuItem
                    key={value}
                    className="min-w-[180px]"
                    onSelect={() => {
                      onSelect(editor, value);
                      focusEditor(editor);
                    }}
                  >
                    {icon}
                    {label}
                  </DropdownMenuItem>
                )
            )}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
