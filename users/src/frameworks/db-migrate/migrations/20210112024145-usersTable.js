'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  const sql = `
  CREATE TABLE \`users_users\` (
    \`id\` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key',
    \`name\` varchar(255) DEFAULT NULL,
    \`email\` varchar(255) DEFAULT NULL,
    \`password\` varchar(255) DEFAULT NULL,
    \`createdAt\` datetime DEFAULT NULL COMMENT 'created item',
    \`updatedAt\` datetime DEFAULT NULL COMMENT 'updated item',
    PRIMARY KEY (\`id\`)
  ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
  `;
  return db.runSql(sql);
};

exports.down = function(db) {
  const sql = `DROP TABLE \`users_users\`;`;
  return db.runSql(sql);
};

exports._meta = {
  "version": 1
};
