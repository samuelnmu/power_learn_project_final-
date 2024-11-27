CREATE TABLE Investor (
    investor_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    date_of_birth DATE,
    address TEXT,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Asset (
    asset_id INT PRIMARY KEY AUTO_INCREMENT,
    investor_id INT,
    asset_type ENUM('stock', 'bond', 'real_estate', 'cryptocurrency'),
    asset_name VARCHAR(100),
    symbol VARCHAR(20),
    quantity DECIMAL(10,2),
    purchase_price DECIMAL(10,2),
    current_value DECIMAL(10,2),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (investor_id) REFERENCES Investor(investor_id)
);

CREATE TABLE Transaction (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    investor_id INT,
    asset_id INT,
    transaction_type ENUM('buy', 'sell', 'transfer'),
    amount DECIMAL(10,2),
    date DATE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (investor_id) REFERENCES Investor(investor_id),
    FOREIGN KEY (asset_id) REFERENCES Asset(asset_id)
);

CREATE TABLE FinancialGoal (
    goal_id INT PRIMARY KEY AUTO_INCREMENT,
    investor_id INT,
    goal_name VARCHAR(100),
    target_amount DECIMAL(10,2),
    target_date DATE,
    description TEXT,
    achieved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (investor_id) REFERENCES Investor(investor_id)
);

-- Optional Tables

CREATE TABLE Vault (
    vault_id INT PRIMARY KEY AUTO_INCREMENT,
    investor_id INT,
    document_name VARCHAR(100),
    document_file BLOB,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (investor_id) REFERENCES Investor(investor_id)
);

CREATE TABLE FinancialResource (
    resource_id INT PRIMARY KEY AUTO_INCREMENT,
    resource_type ENUM('article', 'video', 'webinar'),
    title VARCHAR(100),
    link VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);