import type FE from 'froala-editor';
import { createSignal, For } from 'solid-js';
import { Portal } from 'solid-js/web';
import { Stickers } from './Stickers';

declare global {
  interface FroalaEditorStatic {
    INSTANCES: import('froala-editor').default[];
  }
  var FroalaEditor: FroalaEditorStatic | undefined;
}

export function EditorSticker() {
  const froalaInstances = useFroalaInstances();
  return (
    <For each={froalaInstances()}>
      {(editor) => <StickerPortal editor={editor} />}
    </For>
  );
}

function StickerPortal(props: { editor: FE }) {
  const mainEl = props.editor.$el[0];
  const boxParent = mainEl.closest('.message-editorWrapper');
  return (
    <Portal mount={boxParent}>
      <Stickers editor={props.editor} />
    </Portal>
  );
}

function useFroalaInstances() {
  const F_INSTANCES = window.FroalaEditor?.INSTANCES ?? [];

  const [instances, setInstances] = createSignal<FE[]>([...F_INSTANCES]);

  function notifyChange() {
    setInstances([...F_INSTANCES]);
  }

  const proxyInstances = new Proxy(F_INSTANCES, {
    set(target, prop, value) {
      const result = Reflect.set(target, prop, value);
      notifyChange();
      return result;
    },
    deleteProperty(target, prop) {
      const result = Reflect.deleteProperty(target, prop);
      notifyChange();
      return result;
    },
  });

  if (window.FroalaEditor?.INSTANCES) {
    window.FroalaEditor.INSTANCES = proxyInstances;
  }

  return instances;
}
