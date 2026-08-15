/**
 * Master Asset Registry
 * Central registry for all visual assets, models, and imagery across DAROYA
 * 
 * Asset Philosophy:
 * - Use real images where legally available
 * - Create procedural replacements for unavailable assets
 * - Maintain comprehensive attribution
 * - Never break on missing assets
 */

// TODO: In production, these would be actual files in /public/images and /public/models
// For now, we'll create procedural visuals dynamically

export const assetRegistry: Record<string, any> = {
  // SPACECRAFT ASSETS
  'spacecraft.aryabhata': {
    id: 'spacecraft.aryabhata',
    entityId: 'aryabhata',
    entityType: 'spacecraft',
    hero: {
      type: 'image',
      localPath: '/images/spacecraft/aryabhata/hero.webp',
      usage: 'hero',
      format: 'webp',
      license: 'procedural',
      title: 'Aryabhata Satellite Visualization',
      url: '#procedural',
      credit: 'Procedural Generation',
    },
    model3d: {
      type: 'model-3d',
      format: 'procedural',
      localPath: 'procedural://aryabhata',
      complexity: 'medium',
      license: 'procedural',
      title: 'Aryabhata 3D Model',
      url: '#procedural',
    },
    sources: [
      {
        title: 'ISRO: Aryabhata',
        url: 'https://www.isro.gov.in',
        license: 'isro-official',
        credit: 'ISRO',
      }
    ],
  },

  'spacecraft.chandrayaan-1': {
    id: 'spacecraft.chandrayaan-1',
    entityId: 'chandrayaan-1',
    entityType: 'spacecraft',
    hero: {
      type: 'image',
      localPath: '/images/spacecraft/chandrayaan-1/hero.webp',
      usage: 'hero',
      format: 'webp',
      license: 'procedural',
      title: 'Chandrayaan-1 Orbiter',
      url: '#procedural',
      credit: 'Procedural Visualization',
    },
    gallery: [
      {
        type: 'image',
        localPath: '/images/spacecraft/chandrayaan-1/gallery-01.webp',
        usage: 'gallery',
        format: 'webp',
        license: 'procedural',
        title: 'Chandrayaan-1 in Orbit',
        url: '#procedural',
        credit: 'ISRO Visualization',
      }
    ],
    model3d: {
      type: 'model-3d',
      format: 'procedural',
      localPath: 'procedural://chandrayaan-1',
      complexity: 'detailed',
      license: 'procedural',
      title: 'Chandrayaan-1 3D Model',
      url: '#procedural',
    },
    sources: [
      {
        title: 'ISRO: Chandrayaan-1',
        url: 'https://www.isro.gov.in/Chandrayaan-1',
        license: 'isro-official',
        credit: 'Indian Space Research Organisation',
        lastVerified: '2026-08-15',
      }
    ],
  },

  'spacecraft.chandrayaan-2': {
    id: 'spacecraft.chandrayaan-2',
    entityId: 'chandrayaan-2',
    entityType: 'spacecraft',
    hero: {
      type: 'image',
      localPath: '/images/spacecraft/chandrayaan-2/hero.webp',
      usage: 'hero',
      format: 'webp',
      license: 'procedural',
      title: 'Chandrayaan-2 Orbiter & Lander',
      url: '#procedural',
      credit: 'ISRO Visualization',
    },
    gallery: [
      {
        type: 'image',
        localPath: '/images/spacecraft/chandrayaan-2/lander.webp',
        usage: 'gallery',
        format: 'webp',
        license: 'procedural',
        title: 'Vikram Lander',
        url: '#procedural',
        credit: 'ISRO',
      },
      {
        type: 'image',
        localPath: '/images/spacecraft/chandrayaan-2/rover.webp',
        usage: 'gallery',
        format: 'webp',
        license: 'procedural',
        title: 'Pragyan Rover',
        url: '#procedural',
        credit: 'ISRO',
      },
      {
        type: 'image',
        localPath: '/images/spacecraft/chandrayaan-2/lunar-surface.webp',
        usage: 'gallery',
        format: 'webp',
        license: 'procedural',
        title: 'Lunar Surface',
        url: '#procedural',
        credit: 'ISRO',
      }
    ],
    model3d: {
      type: 'model-3d',
      format: 'procedural',
      localPath: 'procedural://chandrayaan-2',
      complexity: 'detailed',
      license: 'procedural',
      title: 'Chandrayaan-2 3D Model',
      url: '#procedural',
    },
    sources: [
      {
        title: 'ISRO: Chandrayaan-2 Mission',
        url: 'https://www.isro.gov.in',
        license: 'isro-official',
        credit: 'ISRO',
        lastVerified: '2026-08-15',
      }
    ],
  },

  'spacecraft.chandrayaan-3': {
    id: 'spacecraft.chandrayaan-3',
    entityId: 'chandrayaan-3',
    entityType: 'spacecraft',
    hero: {
      type: 'image',
      localPath: '/images/spacecraft/chandrayaan-3/hero.webp',
      usage: 'hero',
      format: 'webp',
      license: 'procedural',
      title: 'Chandrayaan-3 Lander & Rover',
      url: '#procedural',
      credit: 'ISRO Visualization',
    },
    gallery: [
      {
        type: 'image',
        localPath: '/images/spacecraft/chandrayaan-3/launch.webp',
        usage: 'gallery',
        format: 'webp',
        license: 'procedural',
        title: 'LVM3-M4 Launch',
        url: '#procedural',
        credit: 'ISRO',
      },
      {
        type: 'image',
        localPath: '/images/spacecraft/chandrayaan-3/landing.webp',
        usage: 'gallery',
        format: 'webp',
        license: 'procedural',
        title: 'Lunar Landing',
        url: '#procedural',
        credit: 'ISRO',
      },
      {
        type: 'image',
        localPath: '/images/spacecraft/chandrayaan-3/rover-moonwalk.webp',
        usage: 'gallery',
        format: 'webp',
        license: 'procedural',
        title: 'Rover on Lunar Surface',
        url: '#procedural',
        credit: 'ISRO',
      },
      {
        type: 'image',
        localPath: '/images/spacecraft/chandrayaan-3/instruments.webp',
        usage: 'gallery',
        format: 'webp',
        license: 'procedural',
        title: 'Instruments Deployed',
        url: '#procedural',
        credit: 'ISRO',
      }
    ],
    model3d: {
      type: 'model-3d',
      format: 'procedural',
      localPath: 'procedural://chandrayaan-3',
      complexity: 'detailed',
      license: 'procedural',
      title: 'Chandrayaan-3 Lander & Rover',
      url: '#procedural',
    },
    sources: [
      {
        title: 'ISRO: Chandrayaan-3 Mission',
        url: 'https://www.isro.gov.in',
        license: 'isro-official',
        credit: 'ISRO',
        lastVerified: '2026-08-15',
      }
    ],
  },

  'spacecraft.mangalyaan': {
    id: 'spacecraft.mangalyaan',
    entityId: 'mangalyaan',
    entityType: 'spacecraft',
    hero: {
      type: 'image',
      localPath: '/images/spacecraft/mars-orbiter/hero.webp',
      usage: 'hero',
      format: 'webp',
      license: 'procedural',
      title: 'Mars Orbiter Mission',
      url: '#procedural',
      credit: 'ISRO Visualization',
    },
    gallery: [
      {
        type: 'image',
        localPath: '/images/spacecraft/mars-orbiter/launch.webp',
        usage: 'gallery',
        format: 'webp',
        license: 'procedural',
        title: 'PSLV-C25 Launch',
        url: '#procedural',
        credit: 'ISRO',
      },
      {
        type: 'image',
        localPath: '/images/spacecraft/mars-orbiter/orbit-insertion.webp',
        usage: 'gallery',
        format: 'webp',
        license: 'procedural',
        title: 'Mars Orbit Insertion',
        url: '#procedural',
        credit: 'ISRO',
      },
      {
        type: 'image',
        localPath: '/images/spacecraft/mars-orbiter/mars-imagery.webp',
        usage: 'gallery',
        format: 'webp',
        license: 'procedural',
        title: 'Mars Imagery',
        url: '#procedural',
        credit: 'ISRO',
      }
    ],
    model3d: {
      type: 'model-3d',
      format: 'procedural',
      localPath: 'procedural://mars-orbiter',
      complexity: 'detailed',
      license: 'procedural',
      title: 'Mars Orbiter 3D Model',
      url: '#procedural',
    },
    sources: [
      {
        title: 'ISRO: Mars Orbiter Mission',
        url: 'https://www.isro.gov.in',
        license: 'isro-official',
        credit: 'ISRO',
        lastVerified: '2026-08-15',
      }
    ],
  },

  'spacecraft.aditya-l1': {
    id: 'spacecraft.aditya-l1',
    entityId: 'aditya-l1',
    entityType: 'spacecraft',
    hero: {
      type: 'image',
      localPath: '/images/spacecraft/aditya-l1/hero.webp',
      usage: 'hero',
      format: 'webp',
      license: 'procedural',
      title: 'Aditya-L1 Solar Observatory',
      url: '#procedural',
      credit: 'ISRO Visualization',
    },
    model3d: {
      type: 'model-3d',
      format: 'procedural',
      localPath: 'procedural://aditya-l1',
      complexity: 'detailed',
      license: 'procedural',
      title: 'Aditya-L1 3D Model',
      url: '#procedural',
    },
    sources: [
      {
        title: 'ISRO: Aditya-L1',
        url: 'https://www.isro.gov.in',
        license: 'isro-official',
        credit: 'ISRO',
        lastVerified: '2026-08-15',
      }
    ],
  },

  // LAUNCHER ASSETS
  'launcher.pslv': {
    id: 'launcher.pslv',
    entityId: 'pslv',
    entityType: 'launcher',
    hero: {
      type: 'image',
      localPath: '/images/launchers/pslv/hero.webp',
      usage: 'hero',
      format: 'webp',
      license: 'procedural',
      title: 'PSLV Launch Vehicle',
      url: '#procedural',
      credit: 'ISRO Visualization',
    },
    model3d: {
      type: 'model-3d',
      format: 'procedural',
      localPath: 'procedural://pslv',
      complexity: 'detailed',
      license: 'procedural',
      title: 'PSLV 3D Model',
      url: '#procedural',
    },
    sources: [
      {
        title: 'ISRO: PSLV',
        url: 'https://www.isro.gov.in',
        license: 'isro-official',
        credit: 'ISRO',
      }
    ],
  },

  'launcher.gslv': {
    id: 'launcher.gslv',
    entityId: 'gslv',
    entityType: 'launcher',
    hero: {
      type: 'image',
      localPath: '/images/launchers/gslv/hero.webp',
      usage: 'hero',
      format: 'webp',
      license: 'procedural',
      title: 'GSLV Launch Vehicle',
      url: '#procedural',
      credit: 'ISRO Visualization',
    },
    model3d: {
      type: 'model-3d',
      format: 'procedural',
      localPath: 'procedural://gslv',
      complexity: 'detailed',
      license: 'procedural',
      title: 'GSLV 3D Model',
      url: '#procedural',
    },
    sources: [
      {
        title: 'ISRO: GSLV',
        url: 'https://www.isro.gov.in',
        license: 'isro-official',
        credit: 'ISRO',
      }
    ],
  },

  'launcher.lvm3': {
    id: 'launcher.lvm3',
    entityId: 'lvm3',
    entityType: 'launcher',
    hero: {
      type: 'image',
      localPath: '/images/launchers/lvm3/hero.webp',
      usage: 'hero',
      format: 'webp',
      license: 'procedural',
      title: 'LVM3 Launch Vehicle',
      url: '#procedural',
      credit: 'ISRO Visualization',
    },
    model3d: {
      type: 'model-3d',
      format: 'procedural',
      localPath: 'procedural://lvm3',
      complexity: 'detailed',
      license: 'procedural',
      title: 'LVM3 3D Model',
      url: '#procedural',
    },
    sources: [
      {
        title: 'ISRO: LVM3',
        url: 'https://www.isro.gov.in',
        license: 'isro-official',
        credit: 'ISRO',
      }
    ],
  },
};

export function getAsset(assetId: string): any {
  return assetRegistry[assetId] || null;
}

export function getSpacecraftAsset(spacecraftId: string): any {
  return getAsset(`spacecraft.${spacecraftId}`);
}

export function getLauncherAsset(launcherId: string): any {
  return getAsset(`launcher.${launcherId}`);
}

export function getMissionAsset(missionId: string): any {
  return getAsset(`mission.${missionId}`);
}
