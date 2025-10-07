--Create database
CREATE DATABASE opportunity_portal;

--Create ENUM types
CREATE TYPE opportunity_type AS ENUM ('job', 'internship', 'hackathon', 'learning');
CREATE TYPE opportunity_status AS ENUM ('active', 'closed');

--Create table
CREATE TABLE job (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL, -- name of opportunity posted on employer site
    type opportunity_type NOT NULL, --required
    company VARCHAR(255) NOT NULL, --required
    description TEXT,
    location VARCHAR(100),
    start_date DATE,
    end_date DATE,
    salary VARCHAR(20),
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deadline DATE,
    tags JSONB,
    status opportunity_status DEFAULT 'active',
    url varchar(500) not null --required
);
