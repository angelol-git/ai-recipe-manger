BEGIN TRANSACTION;

CREATE TABLE recipes_new (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  parent_id TEXT,
  title TEXT NOT NULL CHECK(length(title) <= 150),
  source_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (parent_id) REFERENCES recipes(id) ON DELETE SET NULL
);

INSERT INTO recipes_new (id, user_id, parent_id, title, source_url, created_at)
SELECT id, user_id, parent_id, title, source_url, created_at
FROM recipes;

DROP TABLE recipes;

ALTER TABLE recipes_new RENAME TO recipes;

COMMIT;
