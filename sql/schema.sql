-- CubeFaster schema (MySQL / Hostinger)
-- flag / image store SVG filenames (or relative paths), not emoji or binary

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS countries;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE countries (
  id         VARCHAR(16)  NOT NULL,
  name       VARCHAR(100) NOT NULL,
  flag       VARCHAR(255) NOT NULL,  -- e.g. 'us.svg' or 'flags/us.svg'
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE events (
  id      VARCHAR(32)  NOT NULL,
  name    VARCHAR(100) NOT NULL,
  is_wca  BOOLEAN      NOT NULL DEFAULT 0,
  image   VARCHAR(255) NOT NULL,  -- e.g. '333.svg' or 'events/333.svg'
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE users (
  clerk_id     VARCHAR(64)  NOT NULL,
  username     VARCHAR(64)  NOT NULL,
  display_name VARCHAR(100) NULL,
  avatar_url   TEXT         NULL,
  country_id   VARCHAR(16)  NULL,
  created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  free_plan    BOOLEAN      NOT NULL DEFAULT 1,
  PRIMARY KEY (clerk_id),
  UNIQUE KEY users_username_unique (username),
  KEY users_country_id_idx (country_id),
  CONSTRAINT users_country_id_fk
    FOREIGN KEY (country_id) REFERENCES countries (id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO countries (id, name, flag) VALUES
  ('US', 'United States', 'us.svg'),
  ('GB', 'United Kingdom', 'gb.svg'),
  ('DE', 'Germany', 'de.svg');

INSERT INTO events (id, name, is_wca, image) VALUES
  ('333', '3x3x3 Cube', 1, '333.svg'),
  ('222', '2x2x2 Cube', 1, '222.svg'),
  ('444', '4x4x4 Cube', 1, '444.svg'),
  ('oh', '3x3x3 One-Handed', 1, 'oh.svg');