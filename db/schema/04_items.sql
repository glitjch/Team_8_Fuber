DROP TABLE IF EXISTS items CASCADE;

-- excluded ingredients as that could be in description
CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  rest_id INTEGER REFERENCES restaurants(id) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL,
  image VARCHAR(1000) NOT NULL,
  available BOOLEAN DEFAULT TRUE
);
