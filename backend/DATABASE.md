CREATE TABLE posts (
id SERIAL PRIMARY KEY,
title VARCHAR(255) NOT NULL,
content TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE posts
ADD COLUMN isupdated BOOLEAN DEFAULT FALSE;

INSERT INTO posts (title, content)
VALUES ('Blog title', 'Blog content');

SELECT \* FROM posts ORDER BY created_at DESC;

SELECT \* FROM posts WHERE id = 1;

UPDATE posts
SET title = 'Updated Blog Title',
content = 'Updated blog content',
updated_at = CURRENT_TIMESTAMP
WHERE id = 1;

DELETE FROM posts WHERE id = 1;
