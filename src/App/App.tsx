import { type Component } from 'solid-js';
import {
  ThemeSettings,
  initializeTheme,
} from '../components/ThemeSettings/ThemeSettings';
import { EditorSticker } from '../components/Stickers/EditorSticker';
import { UserVFX } from '../components/UserVFX/UserVFX';
import { Drawer } from '../components/Drawer';
import { MemberInfo } from '../components/MemberInfo/MemberInfo';

// Initialize theme as soon as possible to avoid flickering
initializeTheme();

const App: Component = () => {
  return (
    <>
      <Drawer title="Cài đặt VozLit">
        <ThemeSettings />
      </Drawer>

      <EditorSticker />
      <UserVFX />
      <MemberInfo />
    </>
  );
};

export default App;
