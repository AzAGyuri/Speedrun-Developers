CREATE TABLE
    IF NOT EXISTS specializaton (id varchar(50) primary key not null);

INSERT INTO
    specializaton (id)
VALUES
    ("ECONOMY"),
    ("FINANCE"),
    ("IT");

CREATE TABLE
    IF NOT EXISTS roles (id varchar(50) PRIMARY KEY NOT NULL);

INSERT INTO
    roles (id)
VALUES
    ("ROLE_ADMIN"),
    ("ROLE_TEACHER"),
    ("ROLE_STUDENT");

CREATE TABLE
    IF NOT EXISTS avail_type (id varchar(50) PRIMARY KEY NOT NULL);

INSERT INTO
    avail_type (id)
VALUES
    ("DISCORD"),
    ("YOUTUBE"),
    ("FACEBOOK"),
    ("TWITTER"),
    ("TWITCH"),
    ("GOOGLE"),
    ("NYIRSZIKSZI"),
    ("EMAIL");

CREATE TABLE
    IF NOT EXISTS subjects (id varchar(50) PRIMARY KEY NOT NULL);

INSERT INTO
    subjects (id)
VALUES
    ("HISTORY"),
    ("HUNGARIAN"),
    ("MATHS"),
    ("ICT"),
    ("TECHNICAL_ENGLISH");

CREATE TABLE
    IF NOT EXISTS school_class (
        id INT (9) PRIMARY KEY AUTO_INCREMENT,
        starting_year INT (5) NOT NULL,
        class_year INT (2) CHECK (
            class_year >= 9
            AND class_year <= 12
        ),
        class_label char(1) not null,
        specializaton_id varchar(50) NOT NULL,
        FOREIGN KEY (specializaton_id) REFERENCES specializaton (id) ON DELETE RESTRICT ON UPDATE CASCADE
    ) AUTO_INCREMENT = 700000001;

CREATE TABLE
    IF NOT EXISTS registered_users (
        id INT (9) PRIMARY KEY AUTO_INCREMENT,
        created_on DATE NOT NULL,
        username varchar(100) NOT NULL UNIQUE,
        user_password varchar(80) NOT NULL,
        email varchar(70) not NULL unique,
        nickname varchar(80) null,
        phone_number varchar(12) null,
        birth_date DATE null,
        deleted boolean null,
        deleted_on date null,
        last_login date null,
        last_logoff date null,
        profile_picture mediumblob null,
        class_id int (9),
        FOREIGN KEY (class_id) REFERENCES school_class (id) ON DELETE SET NULL ON UPDATE CASCADE
    ) AUTO_INCREMENT = 100000001;

CREATE TABLE
    IF NOT EXISTS user_roles (
        user_id INT (9) NOT NULL,
        role_id varchar(50) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES registered_users (id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE RESTRICT ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS availabilities (
        id int (9) PRIMARY KEY AUTO_INCREMENT,
        link varchar(60) not null,
        availability_type varchar(50) NOT NULL,
        user_id int (9) NOT NULL,
        FOREIGN KEY (availability_type) REFERENCES avail_type (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
        FOREIGN KEY (user_id) REFERENCES registered_users (id) ON DELETE CASCADE ON UPDATE CASCADE
    ) AUTO_INCREMENT = 800000001;

CREATE TABLE
    IF NOT EXISTS entries (
        id int (9) primary key AUTO_INCREMENT,
        title varchar(255) not null,
        content varchar(4000) not null,
        kept boolean not null,
        test boolean not null,
        deleted boolean null,
        deleted_on date null,
        subject_name varchar(50) not null,
        author_id int (9),
        class_id int (9),
        FOREIGN KEY (subject_name) REFERENCES subjects (id) ON DELETE RESTRICT ON UPDATE CASCADE,
        FOREIGN KEY (author_id) REFERENCES registered_users (id) ON DELETE SET NULL ON UPDATE CASCADE,
        FOREIGN KEY (class_id) REFERENCES school_class (id) ON DELETE SET NULL ON UPDATE CASCADE
    ) AUTO_INCREMENT = 200000001;

CREATE TABLE
    IF NOT EXISTS attachment (
        id int (9) PRIMARY KEY AUTO_INCREMENT,
        file_name varchar(100) not null,
        filetype varchar(20) not null,
        file_data mediumblob not null,
        entry_id int (9) NOT NULL,
        FOREIGN KEY (entry_id) REFERENCES entries (id) ON DELETE CASCADE ON UPDATE CASCADE
    ) AUTO_INCREMENT = 300000001;

CREATE TABLE
    IF NOT EXISTS question (
        id int (9) PRIMARY KEY AUTO_INCREMENT,
        content varchar(100) NOT NULL,
        entry_id int (9) NOT NULL,
        FOREIGN KEY (entry_id) REFERENCES entries (id) ON DELETE CASCADE ON UPDATE CASCADE
    ) AUTO_INCREMENT = 400000001;

CREATE TABLE
    IF NOT EXISTS answer (
        id int (9) PRIMARY KEY AUTO_INCREMENT,
        correct boolean not null,
        content varchar(100) not null,
        question_id int (9) NOT NULL,
        FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE ON UPDATE CASCADE
    ) AUTO_INCREMENT = 500000001;

CREATE TABLE
    IF NOT EXISTS comment (
        id int (9) PRIMARY KEY AUTO_INCREMENT,
        created_on date not null,
        content varchar(2000) not null,
        author_id int (9),
        entry_id int (9) NOT NULL,
        FOREIGN KEY (author_id) REFERENCES registered_users (id) ON DELETE SET NULL ON UPDATE CASCADE,
        FOREIGN KEY (entry_id) REFERENCES entries (id) ON DELETE CASCADE ON UPDATE CASCADE
    ) AUTO_INCREMENT = 600000001;