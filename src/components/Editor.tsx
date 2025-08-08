// components/Editor.tsx
'use client';

import { Editor } from '@toast-ui/react-editor';
import { forwardRef } from 'react';

// Toast UI Editor의 Props 타입을 그대로 가져와서 사용합니다.
interface EditorProps {
  initialValue?: string;
}

// forwardRef를 사용하여 부모 컴포넌트의 ref를 Editor 컴포넌트로 전달합니다.
const TuiEditor = forwardRef<Editor, EditorProps>((props, ref) => {
  return (
    <Editor
      ref={ref}
      initialValue={props.initialValue || '마크다운으로 내용을 작성하세요...'}
      previewStyle='vertical' // 마크다운과 미리보기를 수직으로 분할
      height='600px'
      initialEditType='wysiwyg' // 기본 모드를 위지윅(WYSIWYG)으로 설정
      useCommandShortcut={true}
      // 한국어 설정 (필요 시)
      // language="ko-KR"
    />
  );
});

TuiEditor.displayName = 'TuiEditor';

export default TuiEditor;
