CREATE TABLE IF NOT EXISTS social_users (
  id SERIAL PRIMARY key,
  clerk_id INTEGER,
  username VARCHAR(255),
  location TEXT,
  bio TEXT
);

CREATE TABLE IF NOT EXISTS social_posts (
  id SERIAL PRIMARY key,
  user_id INTEGER,
  content TEXT,
  FOREIGN KEY ("user_id") REFERENCES social_users ("id")
)