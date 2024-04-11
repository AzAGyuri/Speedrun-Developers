CREATE TABLE
    IF NOT EXISTS specialization (id varchar(50) primary key not null);

INSERT INTO
    specialization (id)
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
            class_year >= 1
            AND class_year <= 14
        ),
        class_label char(1) not null,
    ) AUTO_INCREMENT = 700000001;

CREATE TABLE
    IF NOT EXISTS school_class_specialization (
        school_class_id int (9) NOT NULL,
        specialization varchar(50) NOT NULL,
        FOREIGN KEY (specialization) REFERENCES specialization (id) ON DELETE RESTRICT ON UPDATE CASCADE,
        FOREIGN KEY (school_class_id) REFERENCES school_class (id) ON DELETE RESTRICT ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS registered_users (
        id INT (9) PRIMARY KEY AUTO_INCREMENT,
        created_on DATE NOT NULL,
        username varchar(100) NOT NULL,
        user_password varchar(80) NOT NULL,
        email varchar(70) not NULL unique,
        random_pfpbg_color varchar(7) not null,
        nickname varchar(80) null,
        phone_number varchar(14) null,
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
        created_on date null,
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

INSERT INTO
    school_class (class_year, class_label, starting_year)
values
    (14, 'B', 2023),
    (12, 'D', 2019),
    (12, 'A', 2018);

INSERT INTO
    school_class_specialization (school_class_id, specialization)
values
    (700000001, 'IT'),
    (700000002, 'IT'),
    (700000003, 'IT'),
    (700000003, 'ECONOMY');

INSERT INTO
    entries (
        title,
        content,
        kept,
        test,
        deleted,
        created_on,
        subject_name,
        author_id,
        class_id
    )
values
    (
        "Algebrai kifejezések",
        "",
        0,
        1,
        0,
        NOW (),
        'MATHS',
        100000001,
        700000001
    ),
    (
        "Geometriai háromszögek",
        "",
        0,
        1,
        0,
        NOW (),
        'MATHS',
        100000001,
        700000001
    ),
    (
        "Informatikai alapok 1",
        "",
        0,
        1,
        0,
        NOW (),
        'ICT',
        100000001,
        700000001
    ),
    (
        "Informatikai alapok 2",
        "",
        0,
        1,
        0,
        NOW (),
        'ICT',
        100000001,
        700000001
    ),
    (
        "Informatikai alapok 3",
        "",
        0,
        1,
        0,
        NOW (),
        'ICT',
        100000001,
        700000001
    ),
    (
        "Programozási paradigma",
        "",
        0,
        1,
        0,
        NOW (),
        'ICT',
        100000001,
        700000001
    ),
    (
        "Magyarország történelmi korszakai",
        "",
        0,
        1,
        0,
        NOW (),
        'HISTORY',
        100000001,
        700000001
    ),
    (
        "Szakmai Angol szókincs",
        "",
        0,
        1,
        0,
        NOW (),
        'TECHNICAL_ENGLISH',
        100000001,
        700000001
    ),
    (
        "Szakmai Angol szókincs 2",
        "",
        0,
        1,
        0,
        NOW (),
        'TECHNICAL_ENGLISH',
        100000001,
        700000001
    ),
    (
        "Szakmai Angol szókincs 3",
        "",
        0,
        1,
        0,
        NOW (),
        'TECHNICAL_ENGLISH',
        100000001,
        700000001
    );

INSERT INTO
    question (content, entry_id)
values
    ('Mennyi 6*6?', 200000001),
    ('Melyik nem matematikai kifejezés?', 200000001),
    (
        'Mi a háromszögek belső szögeinek összege?',
        200000002
    ),
    (
        'Melyik alábbi szög típus jellemző az 1 fokos szögre?',
        200000002
    ),
    (
        'Melyik az alapvető adattípus a JavaScriptben?',
        200000003
    ),
    (
        'Melyik nyelvet használják leginkább az internetes fejlesztés során?',
        200000003
    ),
    (
        'Melyik a legnépszerűbb programozási nyelv?',
        200000004
    ),
    (
        'Milyen típusú adattároló a JavaScript-ben a tömb?',
        200000004
    ),
    (
        'Mi a legismertebb szövegszerkesztő program?',
        200000005
    ),
    (
        'Melyik az egyik legnépszerűbb webes böngésző?',
        200000005
    ),
    (
        'Mi a népszerű programozási nyelvek között számon tartott Python másik neve?',
        200000006
    ),
    (
        'Mi az objektumorientált programozás egyik alapelve?',
        200000006
    ),
    (
        'Melyik történelmi korszakban éltek a honfoglaló magyarok?',
        200000007
    ),
    (
        'Melyik évben került sor a Mohácsi csatára?',
        200000007
    ),
    (
        'Hogyan mondod angolul: "Mi a szakmai célod?"',
        200000008
    ),
    (
        'Hogyan mondod angolul: "Milyen nyelveket beszélsz?"',
        200000008
    ),
    (
        'Hogyan mondod angolul: "Hol szerezted a tapasztalatod?"',
        200000009
    ),
    (
        'Hogyan mondod angolul: "Milyen tapasztalatod van?"',
        200000009
    ),
    ('Hogyan mondod angolul: "Mi a neved?"', 200000010),
    ('Hogyan mondod angolul: "Hol laksz?"', 200000010);

INSERT INTO
    answer (correct, content, question_id)
values
    (1, '36', 400000001),
    (0, '7', 400000001),
    (0, '18', 400000001),
    (0, '11', 400000001),
    (0, 'Pitagorasz-tétel', 400000002),
    (1, 'Kutya', 400000002),
    (0, 'Számok', 400000002),
    (0, 'Egyenlet', 400000002),
    (1, '180 fok', 400000003),
    (0, '270 fok', 400000003),
    (0, '360 fok', 400000003),
    (0, '720 fok', 400000003),
    (1, 'Hegyes szög', 400000004),
    (0, 'Derékszög', 400000004),
    (0, 'Tompaszög', 400000004),
    (0, 'Teljes szög', 400000004),
    (0, 'Integer', 400000005),
    (1, 'String', 400000005),
    (0, 'Boolean', 400000005),
    (0, 'Array', 400000005),
    (0, 'Java', 400000006),
    (0, 'Python', 400000006),
    (0, 'HTML', 400000006),
    (1, 'JavaScript', 400000006),
    (0, 'Python', 400000007),
    (0, 'Java', 400000007),
    (0, 'C++', 400000007),
    (1, 'JavaScript', 400000007),
    (1, 'Sorozat', 400000008),
    (0, 'Tároló', 400000008),
    (0, 'Adattábla', 400000008),
    (0, 'Vektor', 400000008),
    (1, 'Microsoft Word', 400000009),
    (0, 'Google Docs', 400000009),
    (0, 'Notepad', 400000009),
    (0, 'Sublime Text', 400000009),
    (0, 'Internet Explorer', 400000010),
    (1, 'Firefox', 400000010),
    (0, 'Safari', 400000010),
    (0, 'Opera', 400000010),
    (1, 'Snake', 400000011),
    (0, 'Viper', 400000011),
    (0, 'Lizard', 400000011),
    (0, 'Cobra', 400000011),
    (1, 'Enkapszuláció', 400000012),
    (0, 'Polimorfizmus', 400000012),
    (0, 'Öröklődés', 400000012),
    (0, 'Absztrakció', 400000012),
    (0, 'Római kor', 400000013),
    (0, 'Kora újkor', 400000013),
    (0, 'Ókor', 400000013),
    (1, 'Középkor', 400000013),
    (0, '1456', 400000014),
    (1, '1526', 400000014),
    (0, '1492', 400000014),
    (0, '1568', 400000014),
    (1, 'What is your professional goal?', 400000015),
    (0, 'What is professional goal you?', 400000015),
    (0, 'What your professional goal is?', 400000015),
    (0, 'Your professional goal is what?', 400000015),
    (1, 'What languages do you speak?', 400000016),
    (0, 'What languages speak you?', 400000016),
    (0, 'You speak what languages?', 400000016),
    (0, 'Do you speak what languages?', 400000016),
    (1, 'Where did you gain experience?', 400000017),
    (0, 'Where did you gained experience?', 400000017),
    (0, 'Where you did gain experience?', 400000017),
    (0, 'Where did gain you experience?', 400000017),
    (1, 'What experience do you have?', 400000018),
    (0, 'What do you experience have?', 400000018),
    (0, 'What do experience you have?', 400000018),
    (0, 'What have experience you do?', 400000018),
    (1, 'What is your name?', 400000019),
    (0, 'What is name you?', 400000019),
    (0, 'What your name is?', 400000019),
    (0, 'Your name is what?', 400000019),
    (1, 'Where do you live?', 400000020),
    (0, 'Where you live?', 400000020),
    (0, 'You live where?', 400000020),
    (0, 'Do you live where?', 400000020);