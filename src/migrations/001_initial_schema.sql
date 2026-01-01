-- Initial database schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    api_key VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_api_key ON users(api_key);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    status VARCHAR(50) NOT NULL,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_status ON sessions(status);

-- Requests table
CREATE TABLE IF NOT EXISTS requests (
    id VARCHAR(36) PRIMARY KEY,
    prompt TEXT NOT NULL,
    context TEXT,
    provider_id VARCHAR(50),
    routing_strategy VARCHAR(50),
    user_id VARCHAR(36),
    session_id VARCHAR(36),
    metadata TEXT, -- JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE SET NULL
);

CREATE INDEX idx_requests_user_id ON requests(user_id);
CREATE INDEX idx_requests_session_id ON requests(session_id);
CREATE INDEX idx_requests_created_at ON requests(created_at);

-- Responses table
CREATE TABLE IF NOT EXISTS responses (
    id VARCHAR(36) PRIMARY KEY,
    request_id VARCHAR(36) NOT NULL,
    provider_id VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    tokens_used INTEGER NOT NULL,
    latency INTEGER NOT NULL,
    confidence DECIMAL(5,4),
    metadata TEXT, -- JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE
);

CREATE INDEX idx_responses_request_id ON responses(request_id);
CREATE INDEX idx_responses_provider_id ON responses(provider_id);
CREATE INDEX idx_responses_created_at ON responses(created_at);

-- Audit log table
CREATE TABLE IF NOT EXISTS audit_log (
    id SERIAL PRIMARY KEY,
    request_id VARCHAR(36),
    action VARCHAR(100) NOT NULL,
    details TEXT, -- JSON
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_log_request_id ON audit_log(request_id);
CREATE INDEX idx_audit_log_timestamp ON audit_log(timestamp);

-- Provider metrics table
CREATE TABLE IF NOT EXISTS provider_metrics (
    id SERIAL PRIMARY KEY,
    provider_id VARCHAR(50) NOT NULL,
    reliability DECIMAL(5,2) NOT NULL,
    latency INTEGER NOT NULL,
    token_usage BIGINT NOT NULL,
    request_count BIGINT NOT NULL,
    error_rate DECIMAL(5,4) NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_provider_metrics_provider_id ON provider_metrics(provider_id);
CREATE INDEX idx_provider_metrics_recorded_at ON provider_metrics(recorded_at);
