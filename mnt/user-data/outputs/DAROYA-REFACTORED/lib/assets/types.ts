/**
 * Asset Registry Types
 * Defines the structure for managing images, 3D models, and visual assets
 */

export interface AssetSource {
  url: string;
  title: string;
  license: 'public-domain' | 'cc-by' | 'cc-by-sa' | 'cc-by-nc' | 'fair-use' | 'isro-official' | 'nasa-official' | 'esa-official' | 'proprietary' | 'procedural';
  credit?: string;
  retrievedDate?: string;
  lastVerified?: string;
}

export interface ImageAsset extends AssetSource {
  type: 'image';
  usage: 'hero' | 'gallery' | 'thumbnail' | 'banner' | 'detail';
  dimensions?: {
    width: number;
    height: number;
  };
  format: 'webp' | 'png' | 'jpg' | 'svg';
  localPath: string;
}

export interface Model3DAsset extends AssetSource {
  type: 'model-3d';
  format: 'glb' | 'gltf' | 'obj' | 'procedural';
  localPath: string;
  scale?: number;
  rotationOffset?: [number, number, number];
  position?: [number, number, number];
  complexity: 'simple' | 'medium' | 'detailed';
}

export interface AssetEntity {
  id: string;
  entityId: string; // spacecraft, mission, launcher id
  entityType: 'spacecraft' | 'mission' | 'launcher' | 'centre' | 'person';
  
  // Imagery
  hero?: ImageAsset;
  gallery?: ImageAsset[];
  thumbnail?: ImageAsset;
  
  // 3D Models
  model3d?: Model3DAsset;
  
  // Additional visual assets
  diagram?: ImageAsset;
  schematic?: ImageAsset;
  portrait?: ImageAsset;
  
  // Metadata
  sources: AssetSource[];
  tags?: string[];
  createdDate: string;
  lastUpdated: string;
}

export interface AssetRegistry {
  version: '1.0';
  lastGenerated: string;
  assets: AssetEntity[];
}
