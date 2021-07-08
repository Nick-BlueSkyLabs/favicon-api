
CREATE TABLE favicon.favicons (
    imageId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url TEXT,
    md5 TEXT,
    timestamp TIMESTAMP
);
