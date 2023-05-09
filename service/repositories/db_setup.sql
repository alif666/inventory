CREATE TABLE IF NOT EXISTS `device` (
  `device_id` int NOT NULL AUTO_INCREMENT,
  `device_sl` varchar(255) NOT NULL,
  `device_name` varchar(255) DEFAULT NULL,
  `device_category` varchar(255) DEFAULT NULL,
  `device_req_date` date DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`device_id`),
  UNIQUE KEY `device_sl_UNIQUE` (`device_sl`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS person (
  person_id INT AUTO_INCREMENT PRIMARY KEY,
  person_sl VARCHAR(255) NOT NULL,
  person_email VARCHAR(255) NOT NULL,
  person_name VARCHAR(255) NOT NULL,
  person_team VARCHAR(255),
  status VARCHAR(255) NOT NULL DEFAULT 'active',
  remark VARCHAR(255),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(255) NOT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by VARCHAR(255) NOT NULL
);

ALTER TABLE `devicedb`.`device` 
CHANGE COLUMN `device_name` `device_name` VARCHAR(255) NULL ,
CHANGE COLUMN `device_category` `device_category` VARCHAR(255) NULL ,
CHANGE COLUMN `device_req_date` `device_req_date` DATE NULL ,
CHANGE COLUMN `remark` `remark` VARCHAR(255) NULL ,
CHANGE COLUMN `created_by` `created_by` VARCHAR(255) NULL ,
CHANGE COLUMN `updated_by` `updated_by` VARCHAR(255) NULL ,
ADD UNIQUE INDEX `device_sl_UNIQUE` (`device_sl` ASC) VISIBLE;
;