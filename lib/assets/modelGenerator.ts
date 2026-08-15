/**
 * Procedural 3D Model Generator
 * Creates detailed spacecraft and launcher models without external assets
 * Uses Three.js geometry primitives and careful composition
 */

import * as THREE from 'three';

export interface ModelConfig {
  scale?: number;
  wireframe?: boolean;
  materials?: Record<string, THREE.Material>;
}

export function createAryabhataModel(config?: ModelConfig): THREE.Group {
  const group = new THREE.Group();
  const scale = config?.scale || 1;

  // Main body - cube satellite design
  const bodyGeometry = new THREE.BoxGeometry(1.4, 1.4, 1.4, 2, 2, 2);
  const bodyMaterial = new THREE.MeshPhongMaterial({
    color: 0x3a3a3a,
    emissive: 0x1a1a1a,
    shininess: 30,
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.scale.multiplyScalar(scale);
  group.add(body);

  // Solar panels - two main wings
  const panelGeometry = new THREE.BoxGeometry(3.2, 0.1, 1.2);
  const panelMaterial = new THREE.MeshPhongMaterial({
    color: 0x1a2a3a,
    emissive: 0x0a1a2a,
    shininess: 100,
  });

  const leftPanel = new THREE.Mesh(panelGeometry, panelMaterial);
  leftPanel.position.set(-2.2 * scale, 0.8 * scale, 0);
  leftPanel.rotation.z = Math.PI / 12;
  group.add(leftPanel);

  const rightPanel = new THREE.Mesh(panelGeometry, panelMaterial);
  rightPanel.position.set(2.2 * scale, 0.8 * scale, 0);
  rightPanel.rotation.z = -Math.PI / 12;
  group.add(rightPanel);

  // Antenna
  const antennaGeometry = new THREE.CylinderGeometry(0.15 * scale, 0.15 * scale, 2.5 * scale);
  const antennaMaterial = new THREE.MeshPhongMaterial({
    color: 0xcccccc,
    shininess: 80,
  });
  const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
  antenna.position.set(0, 1.5 * scale, 0);
  group.add(antenna);

  // Small sensors
  const sensorGeometry = new THREE.SphereGeometry(0.2 * scale, 8, 8);
  const sensorMaterial = new THREE.MeshPhongMaterial({
    color: 0xff6b6b,
    emissive: 0x333333,
  });
  const sensor = new THREE.Mesh(sensorGeometry, sensorMaterial);
  sensor.position.set(0.7 * scale, 0.7 * scale, 0);
  group.add(sensor);

  group.scale.multiplyScalar(1.2);
  return group;
}

export function createChandrayaan1Model(config?: ModelConfig): THREE.Group {
  const group = new THREE.Group();
  const scale = config?.scale || 1;

  // Main orbiter body
  const bodyGeometry = new THREE.BoxGeometry(1.5, 1.5, 2.5);
  const bodyMaterial = new THREE.MeshPhongMaterial({
    color: 0x2a4a6a,
    emissive: 0x0a1a2a,
    shininess: 60,
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.scale.multiplyScalar(scale);
  group.add(body);

  // Large solar panel wings
  const panelGeometry = new THREE.BoxGeometry(5.0, 0.15, 1.8);
  const panelMaterial = new THREE.MeshPhongMaterial({
    color: 0x1a3a4a,
    emissive: 0x0a1a2a,
    shininess: 90,
  });

  const leftPanel = new THREE.Mesh(panelGeometry, panelMaterial);
  leftPanel.position.set(-3.2 * scale, 1.0 * scale, 0);
  leftPanel.rotation.z = Math.PI / 8;
  group.add(leftPanel);

  const rightPanel = new THREE.Mesh(panelGeometry, panelMaterial);
  rightPanel.position.set(3.2 * scale, 1.0 * scale, 0);
  rightPanel.rotation.z = -Math.PI / 8;
  group.add(rightPanel);

  // Antenna boom
  const antennaGeometry = new THREE.CylinderGeometry(0.1 * scale, 0.1 * scale, 3.0 * scale);
  const antennaMaterial = new THREE.MeshPhongMaterial({
    color: 0xdddddd,
    shininess: 100,
  });
  const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
  antenna.position.set(0, 2.0 * scale, 0);
  antenna.rotation.z = Math.PI / 6;
  group.add(antenna);

  // Instruments bay
  const instrumentGeometry = new THREE.BoxGeometry(0.8, 0.8, 1.2);
  const instrumentMaterial = new THREE.MeshPhongMaterial({
    color: 0x444444,
    emissive: 0x222222,
  });
  const instrument = new THREE.Mesh(instrumentGeometry, instrumentMaterial);
  instrument.position.set(0, -1.0 * scale, 1.3 * scale);
  group.add(instrument);

  // Radiators
  const radiatorGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.8);
  const radiatorMaterial = new THREE.MeshPhongMaterial({
    color: 0x333333,
    emissive: 0x111111,
  });
  const radiator = new THREE.Mesh(radiatorGeometry, radiatorMaterial);
  radiator.position.set(0, -1.2 * scale, -1.3 * scale);
  group.add(radiator);

  group.scale.multiplyScalar(1.1);
  return group;
}

export function createChandrayaan2Model(config?: ModelConfig): THREE.Group {
  const group = new THREE.Group();
  const scale = config?.scale || 1;

  // ORBITER
  const orbiterGroup = new THREE.Group();
  const orbiterBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1.5, 2.8),
    new THREE.MeshPhongMaterial({
      color: 0x1a3a5a,
      emissive: 0x0a1a2a,
      shininess: 70,
    })
  );
  orbiterGroup.add(orbiterBody);

  // Orbiter solar panels
  const orbiterPanelGeometry = new THREE.BoxGeometry(4.5, 0.12, 1.6);
  const orbiterPanelMaterial = new THREE.MeshPhongMaterial({
    color: 0x1a3a4a,
    emissive: 0x0a1a2a,
  });
  const orbiterLeftPanel = new THREE.Mesh(orbiterPanelGeometry, orbiterPanelMaterial);
  orbiterLeftPanel.position.set(-2.8 * scale, 0.9 * scale, 0);
  orbiterLeftPanel.rotation.z = Math.PI / 7;
  orbiterGroup.add(orbiterLeftPanel);

  const orbiterRightPanel = new THREE.Mesh(orbiterPanelGeometry, orbiterPanelMaterial);
  orbiterRightPanel.position.set(2.8 * scale, 0.9 * scale, 0);
  orbiterRightPanel.rotation.z = -Math.PI / 7;
  orbiterGroup.add(orbiterRightPanel);

  orbiterGroup.position.z = 3.0 * scale;
  orbiterGroup.scale.multiplyScalar(scale);
  group.add(orbiterGroup);

  // LANDER
  const landerGroup = new THREE.Group();
  const landerBody = new THREE.Mesh(
    new THREE.BoxGeometry(2.0, 1.2, 2.0),
    new THREE.MeshPhongMaterial({
      color: 0x2a4a6a,
      emissive: 0x0a1a2a,
      shininess: 50,
    })
  );
  landerGroup.add(landerBody);

  // Landing legs
  const legGeometry = new THREE.CylinderGeometry(0.08 * scale, 0.08 * scale, 2.0 * scale);
  const legMaterial = new THREE.MeshPhongMaterial({
    color: 0xbbbbbb,
    shininess: 60,
  });

  for (let i = 0; i < 4; i++) {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    const angle = (i * Math.PI) / 2;
    leg.position.set(
      Math.cos(angle) * 1.0 * scale,
      -1.2 * scale,
      Math.sin(angle) * 1.0 * scale
    );
    leg.rotation.z = (i % 2) * Math.PI / 6;
    landerGroup.add(leg);
  }

  landerGroup.position.z = 0;
  landerGroup.scale.multiplyScalar(scale);
  group.add(landerGroup);

  // ROVER (on lander top)
  const roverGroup = new THREE.Group();
  const roverBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.4, 0.7),
    new THREE.MeshPhongMaterial({
      color: 0x3a3a3a,
      emissive: 0x1a1a1a,
    })
  );
  roverGroup.add(roverBody);

  // Rover wheels
  const wheelGeometry = new THREE.CylinderGeometry(0.15 * scale, 0.15 * scale, 0.8 * scale, 16);
  const wheelMaterial = new THREE.MeshPhongMaterial({
    color: 0x1a1a1a,
    shininess: 20,
  });

  for (let i = 0; i < 6; i++) {
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    const xPos = ((i % 3) - 1) * 0.35 * scale;
    const yPos = -0.3 * scale;
    const zPos = (i < 3 ? -1 : 1) * 0.4 * scale;
    wheel.position.set(xPos, yPos, zPos);
    wheel.rotation.z = Math.PI / 2;
    roverGroup.add(wheel);
  }

  roverGroup.position.y = 1.0 * scale;
  roverGroup.scale.multiplyScalar(scale);
  landerGroup.add(roverGroup);

  return group;
}

export function createChandrayaan3Model(config?: ModelConfig): THREE.Group {
  const group = new THREE.Group();
  const scale = config?.scale || 1;

  // LANDER (Improved design)
  const landerGroup = new THREE.Group();
  const landerBody = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 1.1, 2.2),
    new THREE.MeshPhongMaterial({
      color: 0x2a5a6a,
      emissive: 0x0a1a2a,
      shininess: 60,
    })
  );
  landerGroup.add(landerBody);

  // Improved landing legs with better geometry
  const legGeometry = new THREE.CylinderGeometry(0.12 * scale, 0.12 * scale, 2.5 * scale);
  const legMaterial = new THREE.MeshPhongMaterial({
    color: 0xcccccc,
    shininess: 80,
  });

  for (let i = 0; i < 4; i++) {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    const angle = (i * Math.PI) / 2 + Math.PI / 4;
    leg.position.set(
      Math.cos(angle) * 1.2 * scale,
      -1.4 * scale,
      Math.sin(angle) * 1.2 * scale
    );
    leg.rotation.z = Math.PI / 5;
    landerGroup.add(leg);
  }

  // Instrument packages
  const instrumentGeometry = new THREE.BoxGeometry(0.5, 0.3, 0.5);
  const instrumentMaterial = new THREE.MeshPhongMaterial({
    color: 0xff6b6b,
    emissive: 0x330000,
  });
  const instrument = new THREE.Mesh(instrumentGeometry, instrumentMaterial);
  instrument.position.set(0.6 * scale, 0.7 * scale, 0);
  landerGroup.add(instrument);

  landerGroup.scale.multiplyScalar(scale);
  group.add(landerGroup);

  // ROVER (Improved Pragyan)
  const roverGroup = new THREE.Group();
  const roverBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 0.5, 0.8),
    new THREE.MeshPhongMaterial({
      color: 0x3a4a5a,
      emissive: 0x1a1a2a,
      shininess: 40,
    })
  );
  roverGroup.add(roverBody);

  // 6-wheel drive configuration
  const wheelGeometry = new THREE.CylinderGeometry(0.18 * scale, 0.18 * scale, 0.9 * scale, 16);
  const wheelMaterial = new THREE.MeshPhongMaterial({
    color: 0x1a1a1a,
    shininess: 30,
  });

  for (let i = 0; i < 6; i++) {
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    const xPos = ((i % 3) - 1) * 0.4 * scale;
    const yPos = -0.35 * scale;
    const zPos = (i < 3 ? -1 : 1) * 0.5 * scale;
    wheel.position.set(xPos, yPos, zPos);
    wheel.rotation.z = Math.PI / 2;
    roverGroup.add(wheel);
  }

  // Rover instruments
  const roverInstrumentGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.3);
  const roverInstrumentMaterial = new THREE.MeshPhongMaterial({
    color: 0x00aa66,
    emissive: 0x003322,
  });
  const roverInstrument = new THREE.Mesh(roverInstrumentGeometry, roverInstrumentMaterial);
  roverInstrument.position.set(0, 0.4 * scale, 0);
  roverGroup.add(roverInstrument);

  roverGroup.position.set(0, 1.0 * scale, -2.0 * scale);
  roverGroup.scale.multiplyScalar(scale);
  group.add(roverGroup);

  return group;
}

export function createMarsOrbiterModel(config?: ModelConfig): THREE.Group {
  const group = new THREE.Group();
  const scale = config?.scale || 1;

  // Main orbiter body
  const bodyGeometry = new THREE.BoxGeometry(2.0, 0.8, 2.5);
  const bodyMaterial = new THREE.MeshPhongMaterial({
    color: 0x1a3a6a,
    emissive: 0x0a1a2a,
    shininess: 70,
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.scale.multiplyScalar(scale);
  group.add(body);

  // Solar panel wings (heat shield on one side)
  const panelGeometry = new THREE.BoxGeometry(6.0, 0.1, 1.5);
  const panelMaterial = new THREE.MeshPhongMaterial({
    color: 0x1a2a4a,
    emissive: 0x0a0a1a,
  });

  const leftPanel = new THREE.Mesh(panelGeometry, panelMaterial);
  leftPanel.position.set(-3.5 * scale, 0.6 * scale, 0);
  leftPanel.rotation.z = Math.PI / 9;
  group.add(leftPanel);

  const rightPanel = new THREE.Mesh(panelGeometry, panelMaterial);
  rightPanel.position.set(3.5 * scale, 0.6 * scale, 0);
  rightPanel.rotation.z = -Math.PI / 9;
  group.add(rightPanel);

  // Antenna
  const antennaGeometry = new THREE.CylinderGeometry(0.15 * scale, 0.15 * scale, 3.5 * scale);
  const antennaMaterial = new THREE.MeshPhongMaterial({
    color: 0xeeeeee,
    shininess: 100,
  });
  const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
  antenna.position.set(0, 2.2 * scale, 0);
  antenna.rotation.z = Math.PI / 5;
  group.add(antenna);

  // Instruments on body
  const instrumentGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.8);
  const instrumentMaterial = new THREE.MeshPhongMaterial({
    color: 0x444444,
    emissive: 0x222222,
  });
  const instrument = new THREE.Mesh(instrumentGeometry, instrumentMaterial);
  instrument.position.set(0.8 * scale, 0, 1.3 * scale);
  group.add(instrument);

  group.scale.multiplyScalar(1.0);
  return group;
}

export function createAdityaL1Model(config?: ModelConfig): THREE.Group {
  const group = new THREE.Group();
  const scale = config?.scale || 1;

  // Main payload module
  const bodyGeometry = new THREE.CylinderGeometry(1.0 * scale, 1.0 * scale, 2.0 * scale);
  const bodyMaterial = new THREE.MeshPhongMaterial({
    color: 0x1a2a4a,
    emissive: 0x0a0a1a,
    shininess: 60,
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  group.add(body);

  // Large solar panels (heat-resistant)
  const panelGeometry = new THREE.BoxGeometry(5.5, 0.12, 2.0);
  const panelMaterial = new THREE.MeshPhongMaterial({
    color: 0x1a3a2a,
    emissive: 0x0a1a0a,
  });

  const leftPanel = new THREE.Mesh(panelGeometry, panelMaterial);
  leftPanel.position.set(-3.2 * scale, 1.2 * scale, 0);
  leftPanel.rotation.z = Math.PI / 7;
  group.add(leftPanel);

  const rightPanel = new THREE.Mesh(panelGeometry, panelMaterial);
  rightPanel.position.set(3.2 * scale, 1.2 * scale, 0);
  rightPanel.rotation.z = -Math.PI / 7;
  group.add(rightPanel);

  // Heat shield (bottom)
  const shieldGeometry = new THREE.CylinderGeometry(1.1 * scale, 1.1 * scale, 0.2 * scale);
  const shieldMaterial = new THREE.MeshPhongMaterial({
    color: 0x333333,
    emissive: 0x111111,
  });
  const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
  shield.position.y = -1.2 * scale;
  group.add(shield);

  // Sun-facing instruments (top)
  const instrumentGeometry = new THREE.BoxGeometry(0.8, 0.8, 1.2);
  const instrumentMaterial = new THREE.MeshPhongMaterial({
    color: 0xffaa00,
    emissive: 0x663300,
  });
  const instrument = new THREE.Mesh(instrumentGeometry, instrumentMaterial);
  instrument.position.y = 1.3 * scale;
  group.add(instrument);

  // Radiators
  const radiatorGeometry = new THREE.BoxGeometry(1.2, 0.1, 0.6);
  const radiatorMaterial = new THREE.MeshPhongMaterial({
    color: 0x222222,
    emissive: 0x111111,
  });
  const radiator = new THREE.Mesh(radiatorGeometry, radiatorMaterial);
  radiator.position.set(0, 0, -1.2 * scale);
  group.add(radiator);

  group.scale.multiplyScalar(1.1);
  return group;
}

export function createPSLVModel(config?: ModelConfig): THREE.Group {
  const group = new THREE.Group();
  const scale = (config?.scale || 1) * 0.8;

  // STAGE 1 (Solid Booster)
  const stage1Geometry = new THREE.CylinderGeometry(1.2 * scale, 1.2 * scale, 5.0 * scale);
  const stage1Material = new THREE.MeshPhongMaterial({
    color: 0x1a1a1a,
    emissive: 0x0a0a0a,
    shininess: 30,
  });
  const stage1 = new THREE.Mesh(stage1Geometry, stage1Material);
  stage1.position.y = 2.5 * scale;
  group.add(stage1);

  // STAGE 2 (Liquid)
  const stage2Geometry = new THREE.CylinderGeometry(0.9 * scale, 0.9 * scale, 3.5 * scale);
  const stage2Material = new THREE.MeshPhongMaterial({
    color: 0x2a3a4a,
    emissive: 0x0a1a1a,
    shininess: 40,
  });
  const stage2 = new THREE.Mesh(stage2Geometry, stage2Material);
  stage2.position.y = 6.5 * scale;
  group.add(stage2);

  // STAGE 3 (Liquid)
  const stage3Geometry = new THREE.CylinderGeometry(0.7 * scale, 0.7 * scale, 2.8 * scale);
  const stage3Material = new THREE.MeshPhongMaterial({
    color: 0x1a3a4a,
    emissive: 0x0a1a2a,
    shininess: 50,
  });
  const stage3 = new THREE.Mesh(stage3Geometry, stage3Material);
  stage3.position.y = 9.8 * scale;
  group.add(stage3);

  // STAGE 4 (Solid Strap-on)
  const stage4Geometry = new THREE.CylinderGeometry(0.4 * scale, 0.4 * scale, 2.0 * scale);
  const stage4Material = new THREE.MeshPhongMaterial({
    color: 0x1a1a1a,
    emissive: 0x0a0a0a,
  });
  const stage4 = new THREE.Mesh(stage4Geometry, stage4Material);
  stage4.position.y = 11.5 * scale;
  group.add(stage4);

  // Payload fairing
  const fairingGeometry = new THREE.ConeGeometry(0.5 * scale, 1.5 * scale, 16);
  const fairingMaterial = new THREE.MeshPhongMaterial({
    color: 0x3a3a5a,
    emissive: 0x1a1a2a,
  });
  const fairing = new THREE.Mesh(fairingGeometry, fairingMaterial);
  fairing.position.y = 13.2 * scale;
  group.add(fairing);

  // Side boosters (4)
  for (let i = 0; i < 4; i++) {
    const boosterGeometry = new THREE.CylinderGeometry(0.3 * scale, 0.3 * scale, 2.2 * scale);
    const boosterMaterial = new THREE.MeshPhongMaterial({
      color: 0x0a0a0a,
      shininess: 20,
    });
    const booster = new THREE.Mesh(boosterGeometry, boosterMaterial);

    const angle = (i * Math.PI * 2) / 4;
    booster.position.set(
      Math.cos(angle) * 1.5 * scale,
      2.0 * scale,
      Math.sin(angle) * 1.5 * scale
    );
    group.add(booster);
  }

  return group;
}

export function createGSLVModel(config?: ModelConfig): THREE.Group {
  const group = new THREE.Group();
  const scale = (config?.scale || 1) * 0.75;

  // STAGE 1 (Solid L40H)
  const stage1Geometry = new THREE.CylinderGeometry(2.1 * scale, 2.1 * scale, 4.8 * scale);
  const stage1Material = new THREE.MeshPhongMaterial({
    color: 0x0a0a0a,
    emissive: 0x050505,
    shininess: 25,
  });
  const stage1 = new THREE.Mesh(stage1Geometry, stage1Material);
  stage1.position.y = 2.4 * scale;
  group.add(stage1);

  // STAGE 2 (Liquid L40)
  const stage2Geometry = new THREE.CylinderGeometry(2.1 * scale, 2.1 * scale, 4.0 * scale);
  const stage2Material = new THREE.MeshPhongMaterial({
    color: 0x1a2a3a,
    emissive: 0x0a0a1a,
    shininess: 40,
  });
  const stage2 = new THREE.Mesh(stage2Geometry, stage2Material);
  stage2.position.y = 7.2 * scale;
  group.add(stage2);

  // STAGE 3 (Cryogenic C25)
  const stage3Geometry = new THREE.CylinderGeometry(2.1 * scale, 2.1 * scale, 4.5 * scale);
  const stage3Material = new THREE.MeshPhongMaterial({
    color: 0x1a3a5a,
    emissive: 0x0a1a2a,
    shininess: 60,
  });
  const stage3 = new THREE.Mesh(stage3Geometry, stage3Material);
  stage3.position.y = 11.8 * scale;
  group.add(stage3);

  // Payload fairing
  const fairingGeometry = new THREE.ConeGeometry(1.1 * scale, 3.0 * scale, 16);
  const fairingMaterial = new THREE.MeshPhongMaterial({
    color: 0x2a3a5a,
    emissive: 0x1a1a2a,
  });
  const fairing = new THREE.Mesh(fairingGeometry, fairingMaterial);
  fairing.position.y = 15.5 * scale;
  group.add(fairing);

  // Side boosters (4)
  for (let i = 0; i < 4; i++) {
    const boosterGeometry = new THREE.CylinderGeometry(1.0 * scale, 1.0 * scale, 3.5 * scale);
    const boosterMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a1a1a,
      emissive: 0x0a0a0a,
    });
    const booster = new THREE.Mesh(boosterGeometry, boosterMaterial);

    const angle = (i * Math.PI * 2) / 4;
    booster.position.set(
      Math.cos(angle) * 4.5 * scale,
      2.5 * scale,
      Math.sin(angle) * 4.5 * scale
    );
    group.add(booster);
  }

  return group;
}

export function createLVM3Model(config?: ModelConfig): THREE.Group {
  const group = new THREE.Group();
  const scale = (config?.scale || 1) * 0.7;

  // STAGE 1 (L110 Solid)
  const stage1Geometry = new THREE.CylinderGeometry(2.4 * scale, 2.4 * scale, 6.0 * scale);
  const stage1Material = new THREE.MeshPhongMaterial({
    color: 0x0a0a0a,
    emissive: 0x050505,
  });
  const stage1 = new THREE.Mesh(stage1Geometry, stage1Material);
  stage1.position.y = 3.0 * scale;
  group.add(stage1);

  // STAGE 2 (L40 Liquid)
  const stage2Geometry = new THREE.CylinderGeometry(2.4 * scale, 2.4 * scale, 4.0 * scale);
  const stage2Material = new THREE.MeshPhongMaterial({
    color: 0x1a2a3a,
    emissive: 0x0a0a1a,
  });
  const stage2 = new THREE.Mesh(stage2Geometry, stage2Material);
  stage2.position.y = 8.0 * scale;
  group.add(stage2);

  // STAGE 3 (C25 Cryogenic - larger for heavy-lift)
  const stage3Geometry = new THREE.CylinderGeometry(2.4 * scale, 2.4 * scale, 5.5 * scale);
  const stage3Material = new THREE.MeshPhongMaterial({
    color: 0x1a3a5a,
    emissive: 0x0a1a2a,
    shininess: 70,
  });
  const stage3 = new THREE.Mesh(stage3Geometry, stage3Material);
  stage3.position.y = 13.2 * scale;
  group.add(stage3);

  // Large payload fairing
  const fairingGeometry = new THREE.ConeGeometry(1.6 * scale, 4.0 * scale, 16);
  const fairingMaterial = new THREE.MeshPhongMaterial({
    color: 0x2a4a6a,
    emissive: 0x1a2a3a,
  });
  const fairing = new THREE.Mesh(fairingGeometry, fairingMaterial);
  fairing.position.y = 17.8 * scale;
  group.add(fairing);

  // Core + 4 strap-on boosters
  for (let i = 0; i < 4; i++) {
    const boosterGeometry = new THREE.CylinderGeometry(1.3 * scale, 1.3 * scale, 5.0 * scale);
    const boosterMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a1a2a,
      emissive: 0x0a0a0a,
    });
    const booster = new THREE.Mesh(boosterGeometry, boosterMaterial);

    const angle = (i * Math.PI * 2) / 4 + Math.PI / 4;
    booster.position.set(
      Math.cos(angle) * 5.0 * scale,
      3.0 * scale,
      Math.sin(angle) * 5.0 * scale
    );
    group.add(booster);
  }

  return group;
}

export function createModelByType(type: string, config?: ModelConfig): THREE.Group {
  switch (type) {
    case 'aryabhata':
      return createAryabhataModel(config);
    case 'chandrayaan-1':
      return createChandrayaan1Model(config);
    case 'chandrayaan-2':
      return createChandrayaan2Model(config);
    case 'chandrayaan-3':
      return createChandrayaan3Model(config);
    case 'mars-orbiter':
      return createMarsOrbiterModel(config);
    case 'aditya-l1':
      return createAdityaL1Model(config);
    case 'pslv':
      return createPSLVModel(config);
    case 'gslv':
      return createGSLVModel(config);
    case 'lvm3':
      return createLVM3Model(config);
    default:
      // Return a generic satellite model
      const genericGroup = new THREE.Group();
      const genericBody = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshPhongMaterial({ color: 0x3a3a3a })
      );
      genericGroup.add(genericBody);
      return genericGroup;
  }
}
