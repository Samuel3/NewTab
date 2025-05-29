export interface tileConfig {
  name: string;
  id: string;
  tileType: TileType;
}

export enum TileType {
  Bookmarks = 'bookmarks',
  Calculator = 'calculator',
  Search = 'search',
  Kanban = 'kanban'
}
