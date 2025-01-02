'use client';

import React from 'react';

import { withRef } from '@udecode/cn';
import { AIChatPlugin } from '@udecode/plate-ai/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { CodeBlockPlugin } from '@udecode/plate-code-block/react';
import { type PlateEditor, ParagraphPlugin } from '@udecode/plate-common/react';
import { DatePlugin } from '@udecode/plate-date/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { TocPlugin } from '@udecode/plate-heading/react';
import { INDENT_LIST_KEYS, ListStyleType } from '@udecode/plate-indent-list';
import {
  EquationPlugin,
  InlineEquationPlugin,
} from '@udecode/plate-math/react';
import { TablePlugin } from '@udecode/plate-table/react';
import { TogglePlugin } from '@udecode/plate-toggle/react';
import {
  CalendarIcon,
  ChevronRightIcon,
  Code2,
  Columns3Icon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrdered,
  PilcrowIcon,
  Quote,
  RadicalIcon,
  SparklesIcon,
  Square,
  Table,
  TableOfContentsIcon,
} from 'lucide-react';

import {
  insertBlock,
  insertInlineElement,
} from '@/components/editor/transforms';

import {
  InlineCombobox,
  InlineComboboxContent,
  InlineComboboxEmpty,
  InlineComboboxGroup,
  InlineComboboxGroupLabel,
  InlineComboboxInput,
  InlineComboboxItem,
} from './inline-combobox';
import { PlateElement } from './plate-element';
import { FeatureKeys } from '../editor/features';

type Group = {
  group: string;
  items: Item[];
};

interface Item {
  featureName: FeatureKeys;
  icon: React.ReactNode;

  onSelect: (editor: PlateEditor, value: string) => void;

  value: string;
  className?: string;
  focusEditor?: boolean;
  keywords?: string[];
  label?: string;
}

const groups: Group[] = [
  {
    group: 'AI',
    items: [
      {
        featureName: 'ai',
        focusEditor: false,
        icon: <SparklesIcon />,
        value: 'AI',
        onSelect: (editor) => {
          editor.getApi(AIChatPlugin).aiChat.show();
        },
      },
    ],
  },
  {
    group: 'Basic blocks',
    items: [
      {
        featureName: 'paragraph' as FeatureKeys,
        icon: <PilcrowIcon />,
        keywords: ['paragraph'],
        label: 'Text',
        value: ParagraphPlugin.key,
      },
      {
        featureName: 'headings123' as FeatureKeys,
        icon: <Heading1Icon />,
        keywords: ['title', 'h1'],
        label: 'Heading 1',
        value: HEADING_KEYS.h1,
      },
      {
        featureName: 'headings123' as FeatureKeys,
        icon: <Heading2Icon />,
        keywords: ['subtitle', 'h2'],
        label: 'Heading 2',
        value: HEADING_KEYS.h2,
      },
      {
        featureName: 'headings123' as FeatureKeys,
        icon: <Heading3Icon />,
        keywords: ['subtitle', 'h3'],
        label: 'Heading 3',
        value: HEADING_KEYS.h3,
      },
      {
        featureName: 'bulletedIndentList' as FeatureKeys,
        icon: <ListIcon />,
        keywords: ['unordered', 'ul', '-'],
        label: 'Bulleted list',
        value: ListStyleType.Disc,
      },
      {
        featureName: 'numberedIndentList' as FeatureKeys,
        icon: <ListOrdered />,
        keywords: ['ordered', 'ol', '1'],
        label: 'Numbered list',
        value: ListStyleType.Decimal,
      },
      {
        featureName: 'indentTodo' as FeatureKeys,
        icon: <Square />,
        keywords: ['checklist', 'task', 'checkbox', '[]'],
        label: 'To-do list',
        value: INDENT_LIST_KEYS.todo,
      },
      {
        featureName: 'toggleList' as FeatureKeys,
        icon: <ChevronRightIcon />,
        keywords: ['collapsible', 'expandable'],
        label: 'Toggle',
        value: TogglePlugin.key,
      },
      {
        featureName: 'code' as FeatureKeys,
        icon: <Code2 />,
        keywords: ['```'],
        label: 'Code Block',
        value: CodeBlockPlugin.key,
      },
      {
        featureName: 'tables' as FeatureKeys,
        icon: <Table />,
        label: 'Table',
        value: TablePlugin.key,
      },
      {
        featureName: 'blockquote' as FeatureKeys,
        icon: <Quote />,
        keywords: ['citation', 'blockquote', 'quote', '>'],
        label: 'Blockquote',
        value: BlockquotePlugin.key,
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
        keywords: ['toc'],
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
        featureName: 'date' as FeatureKeys,
        focusEditor: true,
        icon: <CalendarIcon />,
        keywords: ['time'],
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

export const SlashInputElement = (features: FeatureKeys[]) => {
  return withRef<typeof PlateElement>(({ className, ...props }, ref) => {
    const { children, editor, element } = props;

    return (
      <PlateElement
        ref={ref}
        as="span"
        className={className}
        data-slate-value={element.value}
        {...props}
      >
        <InlineCombobox element={element} trigger="/">
          <InlineComboboxInput />

          <InlineComboboxContent>
            <InlineComboboxEmpty>No results</InlineComboboxEmpty>

            {groups.map(({ group, items }) => (
              <InlineComboboxGroup key={group}>
                <InlineComboboxGroupLabel>{group}</InlineComboboxGroupLabel>

                {items.map(
                  ({
                    featureName,
                    focusEditor,
                    icon,
                    keywords,
                    label,
                    value,
                    onSelect,
                  }) =>
                    features.includes(featureName) && (
                      <InlineComboboxItem
                        key={value}
                        value={value}
                        onClick={() => onSelect(editor, value)}
                        label={label}
                        focusEditor={focusEditor}
                        group={group}
                        keywords={keywords}
                      >
                        <div className="mr-2 text-muted-foreground">{icon}</div>
                        {label ?? value}
                      </InlineComboboxItem>
                    )
                )}
              </InlineComboboxGroup>
            ))}
          </InlineComboboxContent>
        </InlineCombobox>

        {children}
      </PlateElement>
    );
  });
};
