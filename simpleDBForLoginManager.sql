CREATE Schema InfoSaver;

CREATE TABLE InfoSaver.LoginData(
	dataId int AUTO_INCREMENT PRIMARY KEY,
    domain VARCHAR(100),
    username VARCHAR(100),
    pword VARCHAR(100),
    notes VARCHAR(250),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);