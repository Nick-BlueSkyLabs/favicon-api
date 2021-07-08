
CREATE TABLE favicon.favicons (
    imageid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url TEXT,
    md5 TEXT,
    timestamp INT,
    image TEXT
);
