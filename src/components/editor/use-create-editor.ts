import { withProps } from '@udecode/cn';
import { AIPlugin } from '@udecode/plate-ai/react';
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import {
  CodeBlockPlugin,
  CodeLinePlugin,
  CodeSyntaxPlugin,
} from '@udecode/plate-code-block/react';
import { CommentsPlugin } from '@udecode/plate-comments/react';
import {
  ParagraphPlugin,
  PlateLeaf,
  usePlateEditor,
} from '@udecode/plate-common/react';
import { DatePlugin } from '@udecode/plate-date/react';
import { EmojiInputPlugin } from '@udecode/plate-emoji/react';
import { ExcalidrawPlugin } from '@udecode/plate-excalidraw/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { TocPlugin } from '@udecode/plate-heading/react';
import { HighlightPlugin } from '@udecode/plate-highlight/react';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { KbdPlugin } from '@udecode/plate-kbd/react';
import { ColumnItemPlugin, ColumnPlugin } from '@udecode/plate-layout/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import {
  EquationPlugin,
  InlineEquationPlugin,
} from '@udecode/plate-math/react';
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  MediaEmbedPlugin,
  PlaceholderPlugin,
  VideoPlugin,
} from '@udecode/plate-media/react';
import {
  MentionInputPlugin,
  MentionPlugin,
} from '@udecode/plate-mention/react';
import { SlashInputPlugin } from '@udecode/plate-slash-command/react';
import {
  TableCellHeaderPlugin,
  TableCellPlugin,
  TablePlugin,
  TableRowPlugin,
} from '@udecode/plate-table/react';
import { TogglePlugin } from '@udecode/plate-toggle/react';

import { copilotPlugins } from '@/components/editor/plugins/copilot-plugins';
import { editorPlugins } from '@/components/editor/plugins/editor-plugins';
import { AILeaf } from '@/components/plate-ui/ai-leaf';
import { BlockquoteElement } from '@/components/plate-ui/blockquote-element';
import { CodeBlockElement } from '@/components/plate-ui/code-block-element';
import { CodeLeaf } from '@/components/plate-ui/code-leaf';
import { CodeLineElement } from '@/components/plate-ui/code-line-element';
import { CodeSyntaxLeaf } from '@/components/plate-ui/code-syntax-leaf';
import { ColumnElement } from '@/components/plate-ui/column-element';
import { ColumnGroupElement } from '@/components/plate-ui/column-group-element';
import { CommentLeaf } from '@/components/plate-ui/comment-leaf';
import { DateElement } from '@/components/plate-ui/date-element';
import { EmojiInputElement } from '@/components/plate-ui/emoji-input-element';
import { EquationElement } from '@/components/plate-ui/equation-element';
import { ExcalidrawElement } from '@/components/plate-ui/excalidraw-element';
import { HeadingElement } from '@/components/plate-ui/heading-element';
import { HighlightLeaf } from '@/components/plate-ui/highlight-leaf';
import { HrElement } from '@/components/plate-ui/hr-element';
import { ImageElement } from '@/components/plate-ui/image-element';
import { InlineEquationElement } from '@/components/plate-ui/inline-equation-element';
import { KbdLeaf } from '@/components/plate-ui/kbd-leaf';
import { LinkElement } from '@/components/plate-ui/link-element';
import { MediaAudioElement } from '@/components/plate-ui/media-audio-element';
import { MediaEmbedElement } from '@/components/plate-ui/media-embed-element';
import { MediaFileElement } from '@/components/plate-ui/media-file-element';
import { MediaPlaceholderElement } from '@/components/plate-ui/media-placeholder-element';
import { MediaVideoElement } from '@/components/plate-ui/media-video-element';
import { MentionElement } from '@/components/plate-ui/mention-element';
import { MentionInputElement } from '@/components/plate-ui/mention-input-element';
import { ParagraphElement } from '@/components/plate-ui/paragraph-element';
import { withPlaceholders } from '@/components/plate-ui/placeholder';
import { SlashInputElement } from '@/components/plate-ui/slash-input-element';
import {
  TableCellElement,
  TableCellHeaderElement,
} from '@/components/plate-ui/table-cell-element';
import { TableElement } from '@/components/plate-ui/table-element';
import { TableRowElement } from '@/components/plate-ui/table-row-element';
import { TocElement } from '@/components/plate-ui/toc-element';
import { ToggleElement } from '@/components/plate-ui/toggle-element';

import { FeatureKeys } from './features';
import { recipeTemplate } from './recipe-template';
import { TElement } from '@udecode/plate-common';

export const useCreateEditor = (features: FeatureKeys[]) => {
  const editorPluginsFiltered = editorPlugins(features);
  const SlashInputElementFiltered = SlashInputElement(features);

  const isFeatureEnabled = (key: FeatureKeys) =>
    features.includes(key as FeatureKeys);

  const components = {
    ...(isFeatureEnabled('ai') && { [AIPlugin.key]: AILeaf }),
    ...(isFeatureEnabled('audio') && { [AudioPlugin.key]: MediaAudioElement }),
    ...(isFeatureEnabled('blockquote') && {
      [BlockquotePlugin.key]: BlockquoteElement,
    }),
    ...(isFeatureEnabled('bold') && {
      [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
    }),
    ...(isFeatureEnabled('code') && {
      [CodeBlockPlugin.key]: CodeBlockElement,
    }),
    ...(isFeatureEnabled('code') && {
      [CodeLinePlugin.key]: CodeLineElement,
    }),
    ...(isFeatureEnabled('code') && { [CodePlugin.key]: CodeLeaf }),
    ...(isFeatureEnabled('code') && {
      [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
    }),
    ...(isFeatureEnabled('3column') && {
      [ColumnItemPlugin.key]: ColumnElement,
    }),
    ...(isFeatureEnabled('3column') && {
      [ColumnPlugin.key]: ColumnGroupElement,
    }),
    ...(isFeatureEnabled('comments') && { [CommentsPlugin.key]: CommentLeaf }),
    ...(isFeatureEnabled('date') && { [DatePlugin.key]: DateElement }),
    ...(isFeatureEnabled('emoji') && {
      [EmojiInputPlugin.key]: EmojiInputElement,
    }),
    ...(isFeatureEnabled('block-latex') && {
      [EquationPlugin.key]: EquationElement,
    }),
    ...(isFeatureEnabled('excalidraw') && {
      [ExcalidrawPlugin.key]: ExcalidrawElement,
    }),
    ...(isFeatureEnabled('file') && { [FilePlugin.key]: MediaFileElement }),
    ...(isFeatureEnabled('headings123') && {
      [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: 'h1' }),
    }),
    ...(isFeatureEnabled('headings123') && {
      [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: 'h2' }),
    }),
    ...(isFeatureEnabled('headings123') && {
      [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: 'h3' }),
    }),
    ...(isFeatureEnabled('headings456') && {
      [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: 'h4' }),
    }),
    ...(isFeatureEnabled('headings456') && {
      [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: 'h5' }),
    }),
    ...(isFeatureEnabled('headings456') && {
      [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: 'h6' }),
    }),
    ...(isFeatureEnabled('highlight') && {
      [HighlightPlugin.key]: HighlightLeaf,
    }),
    ...(isFeatureEnabled('divider') && {
      [HorizontalRulePlugin.key]: HrElement,
    }),
    ...(isFeatureEnabled('images') && { [ImagePlugin.key]: ImageElement }),
    ...(isFeatureEnabled('latex') && {
      [InlineEquationPlugin.key]: InlineEquationElement,
    }),
    ...(isFeatureEnabled('italic') && {
      [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
    }),
    ...(isFeatureEnabled('keyboardInput') && { [KbdPlugin.key]: KbdLeaf }),
    ...(isFeatureEnabled('links') && { [LinkPlugin.key]: LinkElement }),
    ...((isFeatureEnabled('images') ||
      isFeatureEnabled('videos') ||
      isFeatureEnabled('audio') ||
      isFeatureEnabled('file')) && {
      [MediaEmbedPlugin.key]: MediaEmbedElement,
    }),
    ...(isFeatureEnabled('mentions') && {
      [MentionInputPlugin.key]: MentionInputElement,
    }),
    ...(isFeatureEnabled('mentions') && {
      [MentionPlugin.key]: MentionElement,
    }),
    ...(isFeatureEnabled('paragraph') && {
      [ParagraphPlugin.key]: ParagraphElement,
    }),
    ...(isFeatureEnabled('placeholderPlugin') && {
      [PlaceholderPlugin.key]: MediaPlaceholderElement,
    }),
    ...(isFeatureEnabled('slashCommands') && {
      [SlashInputPlugin.key]: SlashInputElementFiltered,
    }),
    ...(isFeatureEnabled('strikethrough') && {
      [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
    }),
    ...(isFeatureEnabled('subscript') && {
      [SubscriptPlugin.key]: withProps(PlateLeaf, { as: 'sub' }),
    }),
    ...(isFeatureEnabled('superscript') && {
      [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: 'sup' }),
    }),
    ...(isFeatureEnabled('tables') && {
      [TableCellHeaderPlugin.key]: TableCellHeaderElement,
    }),
    ...(isFeatureEnabled('tables') && {
      [TableCellPlugin.key]: TableCellElement,
    }),
    ...(isFeatureEnabled('tables') && { [TablePlugin.key]: TableElement }),
    ...(isFeatureEnabled('tables') && {
      [TableRowPlugin.key]: TableRowElement,
    }),
    ...(isFeatureEnabled('toc') && { [TocPlugin.key]: TocElement }),
    ...(isFeatureEnabled('toggleList') && {
      [TogglePlugin.key]: ToggleElement,
    }),
    ...(isFeatureEnabled('underline') && {
      [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
    }),
    ...(isFeatureEnabled('videos') && { [VideoPlugin.key]: MediaVideoElement }),
  };

  return usePlateEditor({
    override: {
      components: withPlaceholders(components),
    },
    plugins: [...copilotPlugins, ...editorPluginsFiltered],
    value: recipeTemplate as unknown as TElement[],
  });
};
