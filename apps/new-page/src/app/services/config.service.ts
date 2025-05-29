import { Injectable } from '@angular/core';
import { tileConfig } from '../model/tiles';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly STORAGE_KEY = 'tiles_config';

  async saveTilesConfig(tiles: tileConfig[]): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ [this.STORAGE_KEY]: tiles }, () => {
        resolve();
      });
    });
  }

  async loadTilesConfig(): Promise<tileConfig[] | null> {
    return new Promise((resolve) => {
      chrome.storage.sync.get([this.STORAGE_KEY], (result) => {
        resolve(result[this.STORAGE_KEY] || null);
      });
    });
  }
} 