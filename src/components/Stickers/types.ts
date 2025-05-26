export interface Sticker {
  id: string;
  url: string;
}

export interface StickerCollection {
  name: string;
  stickers: Sticker[];
}
