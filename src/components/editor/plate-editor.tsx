'use client';

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Plate } from '@udecode/plate-common/react';

import { SettingsDialog } from '@/components/editor/settings';
import { useCreateEditor } from '@/components/editor/use-create-editor';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';

import { type FeatureKeys } from './features';

export function PlateEditor({
  featuresGiven,
}: {
  featuresGiven?: FeatureKeys[];
}) {
  const features: FeatureKeys[] = featuresGiven ?? [
    'undoRedo',
    'bold',
    'italic',
    'mode',
    'blletedIndentList',
    'numberedIndentList',
    'insert',
    'emoji',
    'links',
    'tables',
    'moreOptions',
    'export',
  ];
  const editor = useCreateEditor(features);

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor}>
        <EditorContainer>
          <Editor variant="demo" />
        </EditorContainer>

        {features.includes('aiSettings') && <SettingsDialog />}
      </Plate>
    </DndProvider>
  );
}
