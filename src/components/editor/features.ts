/* eslint-disable perfectionist/sort-union-types */
export type FeatureKeys =
  | 'ai' // All ai features (except settings)
  | 'aiSettings' // Settings button (bottom-right)
  | 'align'
  | 'alignment'
  | 'divider'
  | 'audio'
  | 'backgroundColor'
  | 'bulletedIndentList'
  | 'paragraph'
  | 'bold'
  | 'code'
  | 'comments'
  | 'delete'
  | 'emoji'
  | 'export'
  | 'file'
  | 'fontSize'
  | 'highlight'
  | 'images'
  | 'indent'
  | 'indentTodo'
  | 'insert'
  | 'italic'
  | 'lineHeight'
  | 'links'
  | 'mode'
  | 'moreOptions'
  | 'numberedIndentList'
  | 'outdent'
  | 'strikethrough'
  | 'tables'
  | '3column'
  | 'textColor'
  | 'toggleToolbar'
  | 'toggleList'
  | 'turnInto'
  | 'underline'
  | 'undoRedo'
  | 'duplicate' // Context-menu
  | 'blockquote' // Context-menu
  | 'headings123' // h1 h2 h3
  | 'turnIntoDisabled'
  | 'videos'
  | 'latex' // "inline equation"
  | 'block-latex' // "equation"
  | 'keyboardInput' // For command like text
  | 'superscript'
  | 'subscript'
  | 'excalidraw'
  | 'toc'
  | 'date';
