CREATE TABLE
    IF NOT EXISTS specialization (id varchar(50) primary key not null);

INSERT INTO
    specialization (id)
VALUES
    ("ECONOMY"),
    ("MANAGEMENT"),
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
    IF NOT EXISTS school_groups (
        id INT (9) PRIMARY KEY AUTO_INCREMENT,
        group_name varchar(75) not null,
        random_avatar_bg_color varchar(7) null,
        description_content varchar(100) null
    ) AUTO_INCREMENT = 700000001;

CREATE TABLE
    IF NOT EXISTS group_specialization (
        group_id int (9) NOT NULL,
        specialization varchar(50) NOT NULL,
        FOREIGN KEY (specialization) REFERENCES specialization (id) ON DELETE RESTRICT ON UPDATE CASCADE,
        FOREIGN KEY (group_id) REFERENCES school_groups (id) ON DELETE RESTRICT ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS registered_users (
        id INT (9) PRIMARY KEY AUTO_INCREMENT,
        created_on DATE NOT NULL,
        username varchar(100) NOT NULL,
        user_password varchar(80) NOT NULL,
        email varchar(70) not NULL unique,
        random_avatar_bg_color varchar(7) not null,
        nickname varchar(80) null,
        phone_number varchar(14) null,
        birth_date DATE null,
        deleted boolean null,
        deleted_on date null,
        last_login date null,
        last_logoff date null,
        profile_picture mediumblob null
    ) AUTO_INCREMENT = 100000001;

CREATE TABLE
    IF NOT EXISTS grouped_user (
        user_id int (9) not null,
        group_id int (9) not null,
        FOREIGN KEY (user_id) REFERENCES registered_users (id) ON DELETE RESTRICT ON UPDATE CASCADE,
        FOREIGN KEY (group_id) REFERENCES school_groups (id) ON DELETE RESTRICT ON UPDATE CASCADE
    );

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
        FOREIGN KEY (subject_name) REFERENCES subjects (id) ON DELETE RESTRICT ON UPDATE CASCADE,
        FOREIGN KEY (author_id) REFERENCES registered_users (id) ON DELETE SET NULL ON UPDATE CASCADE
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
    registered_users (
        created_on,
        username,
        user_password,
        email,
        random_avatar_bg_color
    )
values
    (
        NOW (),
        "admin",
        "admin",
        "CHANGE_ME@example.com",
        ""
    ),
    (
        NOW (),
        "Seres Marcell",
        "Feltorhetetlen123",
        "marcell2003.sm@gmail.com",
        ""
    ),
    (
        NOW (),
        "Polyák György",
        "jelszo123",
        "23g_polyakg@nyirszikszi.hu",
        ""
    ),
    (
        NOW (),
        "Beri Alex",
        "ozslej321",
        "23g_beria@nyirszikszi.hu",
        ""
    ),
    (
        NOW (),
        "Mikovics Ábel",
        "321neltetehrotleF",
        "23g_mikovicsa@nyirszikszi.hu",
        ""
    ),
    (
        NOW (),
        "Kohán Milán Zsolt",
        "qwertz12345",
        "23g_kohanmzs@nyirszikszi.hu",
        ""
    ),
    (
        NOW (),
        "Orosz Kristóf",
        "Ae123456",
        "23g_oroszk@nyirszikszi.hu",
        ""
    ),
    (
        NOW (),
        "John Doe",
        "Password123!",
        "john.doe@example.com",
        ""
    ),
    (
        NOW (),
        "Alice Smith",
        "p4ssw0rD!",
        "alice.smith@protonmail.com",
        ""
    ),
    (
        NOW (),
        "Emily Brown",
        "crossMyHeartAndHopeToFly123",
        "emily_b@gmail.com",
        ""
    ),
    (
        NOW (),
        "Michael Wilson",
        "changeme123",
        "wilsonmike@freemail.hu",
        ""
    ),
    (
        NOW (),
        "Jane Smith",
        "user1234",
        "kovacsjanka@hotmail.com",
        ""
    ),
    (
        NOW (),
        "David Lee",
        "samsung1",
        "davidlee2006@live.com",
        ""
    ),
    (
        NOW (),
        "Alex Johnson",
        "abbcccdddd66666",
        "alex2007@outlook.com",
        ""
    ),
    (
        NOW (),
        "Sophia Garcia",
        "theworldinyourhand1",
        "sophiagarcia@gmail.es",
        ""
    );

INSERT INTO
    school_groups (group_name)
values
    ('Szakmai Angol 2/14B'),
    ('Magyar nyelv 12D'),
    ('Történelem 12C'),
    ('Matematika 12C'),
    ('Digitális Kultúra 12A'),
    ('Gigachad (Backend) 2/14B'),
    ('2_14b_frontend');

INSERT INTO
    group_specialization (group_id, specialization)
values
    (700000001, 'IT'),
    (700000002, 'IT'),
    (700000003, 'IT'),
    (700000003, 'MANAGEMENT'),
    (700000004, 'IT'),
    (700000004, 'MANAGEMENT'),
    (700000005, 'IT'),
    (700000005, 'ECONOMY'),
    (700000006, 'IT'),
    (700000007, 'IT');

INSERT INTO
    grouped_user (user_id, group_id)
values
    (100000001, 700000001),
    (100000001, 700000002),
    (100000001, 700000003),
    (100000001, 700000004),
    (100000001, 700000005),
    (100000001, 700000006),
    (100000001, 700000007),
    (100000001, 700000001),
    (100000002, 700000001),
    (100000003, 700000001),
    (100000004, 700000001),
    (100000005, 700000001),
    (100000006, 700000001),
    (100000007, 700000001),
    (100000002, 700000006),
    (100000005, 700000006),
    (100000006, 700000006),
    (100000007, 700000006),
    (100000003, 700000007),
    (100000004, 700000007),
    (100000006, 700000007),
    (100000007, 700000007),
    (100000008, 700000002),
    (100000009, 700000002),
    (100000010, 700000003),
    (100000011, 700000003),
    (100000012, 700000004),
    (100000013, 700000004),
    (100000014, 700000005),
    (100000015, 700000005);

INSERT INTO
    entries (
        title,
        content,
        kept,
        test,
        created_on,
        subject_name,
        author_id
    )
values
    (
        "Algebrai kifejezések",
        "",
        0,
        1,
        NOW (),
        'MATHS',
        100000001
    ),
    (
        "Geometriai háromszögek",
        "",
        0,
        1,
        NOW (),
        'MATHS',
        100000001
    ),
    (
        "Informatikai alapok 1",
        "",
        0,
        1,
        NOW (),
        'ICT',
        100000001
    ),
    (
        "Informatikai alapok 2",
        "",
        0,
        1,
        NOW (),
        'ICT',
        100000001
    ),
    (
        "Informatikai alapok 3",
        "",
        0,
        1,
        NOW (),
        'ICT',
        100000001
    ),
    (
        "Programozási paradigma",
        "",
        0,
        1,
        NOW (),
        'ICT',
        100000001
    ),
    (
        "Magyarország történelmi korszakai",
        "",
        0,
        1,
        NOW (),
        'HISTORY',
        100000001
    ),
    (
        "Szakmai Angol szókincs",
        "",
        0,
        1,
        NOW (),
        'TECHNICAL_ENGLISH',
        100000001
    ),
    (
        "Szakmai Angol szókincs 2",
        "",
        0,
        1,
        NOW (),
        'TECHNICAL_ENGLISH',
        100000001
    ),
    (
        "Szakmai Angol szókincs 3",
        "",
        0,
        1,
        NOW (),
        'TECHNICAL_ENGLISH',
        100000001
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