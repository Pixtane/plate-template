'use client';

import React from 'react';

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { CodeBlockPlugin } from '@udecode/plate-code-block/react';
import {
  ParagraphPlugin,
  focusEditor,
  useEditorRef,
  useSelectionFragmentProp,
} from '@udecode/plate-common/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { INDENT_LIST_KEYS, ListStyleType } from '@udecode/plate-indent-list';
import { TogglePlugin } from '@udecode/plate-toggle/react';
import {
  ChevronRightIcon,
  Columns3Icon,
  FileCodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
  PilcrowIcon,
  QuoteIcon,
  SquareIcon,
} from 'lucide-react';

import {
  STRUCTURAL_TYPES,
  getBlockType,
  setBlockType,
} from '@/components/editor/transforms';

import { type FeatureKeys } from '../editor/features';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';

type TurnIntoItem = {
  featureName: FeatureKeys;
  icon: React.JSX.Element;
  label: string;
  value: string;
  keywords?: string[];
};

const turnIntoItems: TurnIntoItem[] = [
  {
    featureName: 'paragraph',
    icon: <PilcrowIcon />,
    keywords: ['paragraph'],
    label: 'Text',
    value: ParagraphPlugin.key,
  },
  {
    featureName: 'headings123',
    icon: <Heading1Icon />,
    keywords: ['title', 'h1'],
    label: 'Heading 1',
    value: HEADING_KEYS.h1,
  },
  {
    featureName: 'headings123',
    icon: <Heading2Icon />,
    keywords: ['subtitle', 'h2'],
    label: 'Heading 2',
    value: HEADING_KEYS.h2,
  },
  {
    featureName: 'headings123',
    icon: <Heading3Icon />,
    keywords: ['subtitle', 'h3'],
    label: 'Heading 3',
    value: HEADING_KEYS.h3,
  },
  {
    featureName: 'bulletedIndentList',
    icon: <ListIcon />,
    keywords: ['unordered', 'ul', '-'],
    label: 'Bulleted list',
    value: ListStyleType.Disc,
  },
  {
    featureName: 'numberedIndentList',
    icon: <ListOrderedIcon />,
    keywords: ['ordered', 'ol', '1'],
    label: 'Numbered list',
    value: ListStyleType.Decimal,
  },
  {
    featureName: 'indentTodo',
    icon: <SquareIcon />,
    keywords: ['checklist', 'task', 'checkbox', '[]'],
    label: 'To-do list',
    value: INDENT_LIST_KEYS.todo,
  },
  {
    featureName: 'toggleList',
    icon: <ChevronRightIcon />,
    keywords: ['collapsible', 'expandable'],
    label: 'Toggle list',
    value: TogglePlugin.key,
  },
  {
    featureName: 'code',
    icon: <FileCodeIcon />,
    keywords: ['```'],
    label: 'Code',
    value: CodeBlockPlugin.key,
  },
  {
    featureName: 'blockquote',
    icon: <QuoteIcon />,
    keywords: ['citation', 'blockquote', '>'],
    label: 'Quote',
    value: BlockquotePlugin.key,
  },
  {
    featureName: '3column',
    icon: <Columns3Icon />,
    label: '3 columns',
    value: 'action_three_columns',
  },
];

export function TurnIntoDropdownMenu(
  props: DropdownMenuProps & { features: FeatureKeys[] }
) {
  const editor = useEditorRef();
  const openState = useOpenState();

  const value = useSelectionFragmentProp({
    defaultValue: ParagraphPlugin.key,
    getProp: (node) => getBlockType(node as any),
    structuralTypes: STRUCTURAL_TYPES,
  });
  const selectedItem = React.useMemo(
    () =>
      turnIntoItems.find(
        (item) => item.value === (value ?? ParagraphPlugin.key)
      ) ?? turnIntoItems[0],
    [value]
  );

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Turn into" isDropdown>
          {selectedItem.label}
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="ignore-click-outside/toolbar min-w-0"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          focusEditor(editor);
        }}
        align="start"
      >
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(type) => {
            setBlockType(editor, type);
          }}
          label="Turn into"
        >
          {turnIntoItems.map(
            ({ featureName, icon, label, value: itemValue }) => {
              return (
                props.features.includes(featureName) && (
                  <DropdownMenuRadioItem
                    key={itemValue}
                    className="min-w-[180px]"
                    value={itemValue}
                  >
                    {icon}
                    {label}
                  </DropdownMenuRadioItem>
                )
              );
            }
          )}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
