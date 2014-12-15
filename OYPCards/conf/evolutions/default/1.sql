# Cards schema

# --- !Ups
CREATE SEQUENCE card_id_seq;
CREATE TABLE card (
    id integer NOT NULL DEFAULT nextval('card_id_seq'),
    name varchar(255),
    nickName varchar(255),
    title varchar(255),
    stat1 varchar(255),
    stat2 varchar(255),
    stat3 varchar(255),
    val1 varchar(255),
    val2 varchar(255),
    val3 varchar(255),
    message varchar(1000),
    email varchar(255),
    allergies varchar(255),
    gluten boolean,
    vegetarian boolean
);

# --- !Downs

DROP TABLE card;
DROP SEQUENCE card_id_seq;
