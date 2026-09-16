-- Seed / upsert all WCA events that have icons in public/events (safe to re-run)
INSERT INTO events (id, name, is_wca, image) VALUES
  ('333', '3x3x3 Cube', 1, '3x3.png'),
  ('222', '2x2x2 Cube', 1, '2x2.png'),
  ('444', '4x4x4 Cube', 1, '4x4.png'),
  ('555', '5x5x5 Cube', 1, '5x5.png'),
  ('666', '6x6x6 Cube', 1, '6x6.png'),
  ('777', '7x7x7 Cube', 1, '7x7.png'),
  ('333bf', '3x3x3 Blindfolded', 1, '3BLD.png'),
  ('333oh', '3x3x3 One-Handed', 1, 'OH.png'),
  ('minx', 'Megaminx', 1, 'MEGA.png'),
  ('pyram', 'Pyraminx', 1, 'PYRA.png'),
  ('skewb', 'Skewb', 1, 'SKEWB.png'),
  ('sq1', 'Square-1', 1, 'Square1.png'),
  ('444bf', '4x4x4 Blindfolded', 1, '4BLD.png')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  is_wca = VALUES(is_wca),
  image = VALUES(image);
