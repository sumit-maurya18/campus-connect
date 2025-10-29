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
    location VARCHAR(100),
    start_date DATE,
    end_date DATE,
    salary VARCHAR(20),
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deadline DATE,
    tags JSONB,
    status opportunity_status DEFAULT 'active',
    url varchar(500) not null, --required
);


--create table for hackathons + learning
CREATE TYPE event_mode AS ENUM ('In-Person', 'Online', 'Hybrid');
CREATE TYPE event_type AS ENUM ('hackathon', 'learning');

CREATE TABLE hackathon_learning (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    mode event_mode NOT NULL,
    event event_type NOT NULL,
    deadline DATE NOT NULL,
    tags JSONB,
    url VARCHAR(500) NOT NULL,
    banner_image_url VARCHAR(500)
);

