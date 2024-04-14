alter database schoolpedia character
set
    'utf8mb4' collate 'utf8mb4_hungarian_ci';

CREATE TABLE
    IF NOT EXISTS specialization (id varchar(50) primary key not null);

INSERT IGNORE INTO specialization (id)
VALUES
    ("ECONOMY"),
    ("MANAGEMENT"),
    ("IT");

CREATE TABLE
    IF NOT EXISTS roles (id varchar(50) PRIMARY KEY NOT NULL);

INSERT IGNORE INTO roles (id)
VALUES
    ("ROLE_ADMIN"),
    ("ROLE_TEACHER"),
    ("ROLE_STUDENT");

CREATE TABLE
    IF NOT EXISTS avail_type (id varchar(50) PRIMARY KEY NOT NULL);

INSERT IGNORE INTO avail_type (id)
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

INSERT IGNORE INTO subjects (id)
VALUES
    ("HISTORY"),
    ("HUNGARIAN"),
    ("MATHS"),
    ("ICT"),
    ("TECHNICAL_ENGLISH");

CREATE TABLE
    IF NOT EXISTS registered_users (
        id INT (9) PRIMARY KEY AUTO_INCREMENT,
        created_on datetime NOT NULL,
        username varchar(100) NOT NULL,
        user_password varchar(80) NOT NULL,
        email varchar(70) not NULL unique,
        random_avatar_bg_color varchar(7) not null,
        nickname varchar(80) null,
        phone_number varchar(14) null,
        birth_date datetime null,
        deleted boolean null,
        deleted_on datetime null,
        last_login datetime null,
        last_logoff datetime null,
        profile_picture mediumblob null
    ) AUTO_INCREMENT = 100000001;

CREATE TABLE
    IF NOT EXISTS school_groups (
        id INT (9) PRIMARY KEY AUTO_INCREMENT,
        group_name varchar(75) not null,
        random_avatar_bg_color varchar(7) null,
        description_content varchar(100) null,
        creator_id int (9) not null,
        FOREIGN KEY (creator_id) REFERENCES registered_users (id) ON DELETE CASCADE ON UPDATE CASCADE
    ) AUTO_INCREMENT = 700000001;

CREATE TABLE
    IF NOT EXISTS grouped_user (
        user_id int (9) not null,
        group_id int (9) not null,
        FOREIGN KEY (user_id) REFERENCES registered_users (id) ON DELETE RESTRICT ON UPDATE CASCADE,
        FOREIGN KEY (group_id) REFERENCES school_groups (id) ON DELETE RESTRICT ON UPDATE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS group_specialization (
        group_id int (9) NOT NULL,
        specialization varchar(50) NOT NULL,
        FOREIGN KEY (specialization) REFERENCES specialization (id) ON DELETE RESTRICT ON UPDATE CASCADE,
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
        deleted_on datetime null,
        created_on datetime null,
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
        created_on datetime not null,
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
    ),
    (
        NOW (),
        'Michael Johnson',
        'Password1',
        'michaeljohnson@example.com',
        ''
    ),
    (
        NOW (),
        'David Wilson',
        'P@ssw0rd2',
        'davidwilson@example.com',
        ''
    ),
    (
        NOW (),
        'Sarah Parker',
        'Pass1234',
        'sarahparker@example.com',
        ''
    ),
    (
        NOW (),
        'Adam Taylor',
        'P@ssword5',
        'adamtaylor@example.com',
        ''
    ),
    (
        NOW (),
        'Rachel Brown',
        'Pass6789',
        'rachelbrown@example.com',
        ''
    );

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
        "Szakmai Angol szókincs 1",
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
    ),
    (
        "Algoritmusok és Adatszerkezetek",
        "Az algoritmusok és adatszerkezetek kulcsfontosságú fogalmak az informatikában. Az algoritmusok hatékony megvalósítása és az optimális adatszerkezetek kiválasztása lehetővé teszi az informatikai problémák hatékony megoldását.",
        0,
        0,
        NOW (),
        'ICT',
        100000016
    ),
    (
        "Felhőalapú Számítástechnika",
        "A felhőalapú számítástechnika forradalmasította az informatikát. Az egyre növekvő számú vállalat és felhasználó számára biztosítja az adatok tárolását, szolgáltatásokat és alkalmazásokat a világhálón keresztül.",
        0,
        0,
        NOW (),
        'ICT',
        100000017
    ),
    (
        "Kiberbiztonság és Hálózatbiztonság",
        "A kiberbiztonság és hálózatbiztonság napjainkban kulcsfontosságú területe az informatikának. Az internetes fenyegetések és a számítógépes bűnözés elleni védelem elengedhetetlen a biztonságos online környezet megteremtéséhez.",
        0,
        0,
        NOW (),
        'ICT',
        100000018
    ),
    (
        "Adattudomány és Nagy Adat",
        "Az adattudomány és a nagy adat elemzésének képességei forradalmasítják az üzleti és tudományos területeket egyaránt. Az adatokból való értelmezés lehetővé teszi a trendek felismerését és a jövőbeli döntések meghozatalát.",
        0,
        0,
        NOW (),
        'ICT',
        100000016
    ),
    (
        "Mesterséges Intelligencia és Gépi Tanulás",
        "A mesterséges intelligencia és a gépi tanulás területei forradalmasítják az informatikát. Az olyan alkalmazások, mint az autonóm járművek és a nyelvi felismerés, az MI és a gépi tanulás legújabb fejlesztéseinek eredményei.",
        0,
        0,
        NOW (),
        'ICT',
        100000018
    ),
    (
        "Petőfi Sándor élete és művei",
        "Petőfi Sándor a magyar irodalom kiemelkedő alakja, költői öröksége mély nyomot hagyott a magyar irodalmi kánonban. Az ő versei azóta is népszerűek, és számos generáció számára jelentettek és jelentenek inspirációt. Élete és művei a magyar kultúra fontos részét képezik.",
        0,
        0,
        NOW (),
        'HUNGARIAN',
        100000016
    ),
    (
        "A Jókai-regények világa",
        "Jókai Mór regényeinek jelentősége és hatása a magyar irodalomra kiemelkedő. Ő az egyik legjelentősebb és legtermékenyebb magyar író, akinek művei nemcsak a kortársakat, de a későbbi nemzedékeket is lenyűgözték. Munkássága kiterjedt és sokrétű, és ma is aktuálisak az írásai.",
        0,
        0,
        NOW (),
        'HUNGARIAN',
        100000017
    ),
    (
        "Az Áprily-regények és novellák",
        "Áprily Lajos műveinek sokszínűsége és irodalmi értéke elismerést váltott ki a kortársak körében. Ő egyik legkiemelkedőbb magyar íróként tartják számon, aki életművével hozzájárult a magyar irodalom fejlődéséhez és gazdagításához. Művei mai napig fontosak és értékesek.",
        0,
        0,
        NOW (),
        'HUNGARIAN',
        100000017
    ),
    (
        "A magyar költészet aranykora",
        "A romantika és a szimbolizmus jelentős költői és alkotásai meghatározóak a magyar költészeti kánonban. Ebben az időszakban születtek meg a legjelentősebb magyar költői művek, amelyek a mai napig inspirálják az olvasókat és hatnak a kortárs irodalomra. Az aranykor költői között olyan kimagasló alakok találhatók, mint Petőfi Sándor és Arany János.",
        0,
        0,
        NOW (),
        'HUNGARIAN',
        100000016
    ),
    (
        "A XX. századi magyar drámaírás",
        "Az újító drámaírók és a kortárs magyar dráma jellegzetességei sokszínűséget hoztak a magyar dráma műfajába. A XX. század folyamán számos jelentős és megkerülhetetlen drámaíró alkotta meg emlékezetes műveit, amelyek jelentősen befolyásolták a magyar irodalmat és kultúrát. Ezen alkotók munkássága mai napig inspirálja és provokálja az olvasókat.",
        0,
        0,
        NOW (),
        'HUNGARIAN',
        100000018
    ),
    (
        "A prímszámok világa",
        "A prímszámok fontos szerepet játszanak a matematikában, és számos alkalmazása van a való életben is. Ezek a természetes számok, amelyek csak egyetlen osztóval oszthatók oszthatók, alapvető fontosságúak a kriptográfiai rendszerek és más matematikai problémák megoldásában. A prímszámok elmélete hosszú történelmi hátteret és jelentőségét mutatja.",
        0,
        0,
        NOW (),
        'MATHS',
        100000019
    ),
    (
        "Az algebra alapjai",
        "Az alapvető algebrai műveletek és fogalmak megértése elengedhetetlen a matematikai tudás elsajátításához. Az algebra az absztrakt matematika egyik alapvető ága, amely számos alkalmazást talál a tudományokban és a mindennapi életben egyaránt. Az algebrai gondolkodás kulcsfontosságú a problémamegoldásban és a matematikai modellezésben.",
        0,
        0,
        NOW (),
        'MATHS',
        100000020
    ),
    (
        "A geometria varázslata",
        "A geometriai alakzatok és tulajdonságaik megértése segít abban, hogy jobban értsük a térbeli viszonyokat. A geometria az elemi matematikai ág, amely a síkbeli és térbeli alakzatokat tanulmányozza, és számos területen talál alkalmazást, beleértve a mérnöki, építészeti és grafikai tervezést. A geometriai fogalmak számos területen alapvető fontosságúak.",
        0,
        0,
        NOW (),
        'MATHS',
        100000020
    ),
    (
        "A differenciálszámítás alapjai",
        "A differenciálszámítás alapfogalmai és szabályai fontosak a matematikai analízis megértéséhez. Ez az analízis egyik alapvető ága, amely a függvények változásának és alakulásának tanulmányozására összpontosít. A differenciálszámítás számos területen, például a fizikában és a mérnöki gyakorlatban is alkalmazható.",
        0,
        0,
        NOW (),
        'MATHS',
        100000019
    ),
    (
        "A valószínűségszámítás alapjai",
        "A valószínűségszámítás fontossága és alkalmazása kiterjed az üzleti analitikától az alkalmazott matematikáig. Ez a matematika ága a véletlenségi események és azok valószínűségeinek tanulmányozására összpontosít, és számos területen fontos, például a statisztikában, a pénzügyekben és a gépi tanulásban.",
        0,
        0,
        NOW (),
        'MATHS',
        100000018
    ),
    (
        "Exploring Quantum Mechanics",
        "Understanding the fundamental principles of quantum mechanics opens doors to exploring the mysteries of the quantum world. Quantum mechanics is a branch of physics that describes the behavior of matter and energy at very small scales, such as atoms and subatomic particles. It has led to the development of technologies such as quantum computing and quantum cryptography.",
        0,
        0,
        NOW (),
        'TECHNICAL_ENGLISH',
        100000016
    ),
    (
        "Introduction to Data",
        "Basic concepts and techniques in data management and analysis are crucial for understanding modern technologies. Data is the foundation of many technological advancements, and knowing how to collect, store, and analyze data is essential for professionals in various fields, from business to science and engineering.",
        0,
        0,
        NOW (),
        'TECHNICAL_ENGLISH',
        100000017
    ),
    (
        "Advancements in Artificial Intelligence",
        "Recent developments and applications of artificial intelligence are transforming various industries and aspects of our daily lives. Artificial intelligence (AI) technologies, such as machine learning and natural language processing, are being used to automate tasks, make predictions, and improve decision-making processes across different sectors, from healthcare to finance.",
        0,
        0,
        NOW (),
        'TECHNICAL_ENGLISH',
        100000017
    ),
    (
        "Fundamentals of Cryptography",
        "Understanding encryption techniques and cryptographic protocols is essential for securing sensitive information in digital communication. Cryptography plays a crucial role in safeguarding data privacy and integrity, ensuring that only authorized parties can access and understand transmitted information.",
        0,
        0,
        NOW (),
        'TECHNICAL_ENGLISH',
        100000016
    ),
    (
        "Theoretical Foundations of Computer Networks",
        "Key concepts and models in computer networking provide the theoretical framework for understanding how data is transmitted and exchanged in modern networks. Computer networks are essential for communication and data sharing in today's interconnected world, and understanding their theoretical foundations is crucial for network engineers and cybersecurity professionals.",
        0,
        0,
        NOW (),
        'TECHNICAL_ENGLISH',
        100000018
    ),
    (
        "Az Árpád-ház kora",
        "Az Árpád-ház kora a magyar történelem kezdete, amikor az Árpád-ház nemzetsége alapította meg Magyarországot és létrehozta az első magyar államalakulatot. Ez az időszak a honfoglalástól a királylánccal történt koronázásig tartott, és fontos mérföldkő volt a magyar történelemben. Az Árpád-ház kora alatt a magyar törzsek egyesítették erőiket és megalapozták az első magyar államot.",
        0,
        0,
        NOW (),
        'HISTORY',
        100000016
    ),
    (
        "A Mohácsi csata",
        "A Mohácsi csata Magyarország történelmének egyik legmeghatározóbb eseménye volt, amelynek következtében az ország elveszítette függetlenségét és területi egységét. A csata során a Magyar Királyság súlyos vereséget szenvedett a török sereg ellen, és a magyar király, II. Lajos életét vesztette. A Mohácsi csata következményei hosszú távú hatással voltak Magyarország politikai és társadalmi helyzetére.",
        0,
        0,
        NOW (),
        'HISTORY',
        100000017
    ),
    (
        "A Rákóczi-szabadságharc",
        "A Rákóczi-szabadságharc az összmagyar felkelés volt a Habsburg Birodalom ellen, amelyet II. Rákóczi Ferenc vezetett. A szabadságharc célja a Habsburg uralom megszüntetése és Magyarország függetlenségének visszaállítása volt. A felkelés bár nem ért el végleges sikert, jelentős mértékben hozzájárult a magyar nemzeti öntudat erősödéséhez és az abszolutizmus elleni harchoz.",
        0,
        0,
        NOW (),
        'HISTORY',
        100000017
    ),
    (
        "Az 1848-49-es forradalom és szabadságharc",
        "Az 1848-49-es forradalom és szabadságharc az osztrák uralom elleni küzdelem volt, amely a forradalmi hullám részeként tört ki Európában. Magyarország az abszolutizmus és az osztrák befolyás elleni küzdelem jegyében szervezte meg a forradalmat, amelynek célja a függetlenség és a polgári jogok kivívása volt. Bár a forradalom végül vereséget szenvedett, jelentős változásokat indított el Magyarországon, és hosszú távú hatással volt az ország politikai és társadalmi életére.",
        0,
        0,
        NOW (),
        'HISTORY',
        100000016
    ),
    (
        "Az első világháború utáni Magyarország",
        "Az első világháború utáni Magyarország az 1918-as trianoni békeszerződés következményeinek tükrében alakult át. A békeszerződés Magyarországot jelentős területi veszteségekkel sújtotta, amelynek következtében az ország elvesztette területeinek nagy részét és jelentős magyar lakosságot tartalmazó területeket. Az első világháború utáni időszak Magyarországon gazdasági és politikai instabilitást eredményezett, amely hosszú távú hatással volt az ország történelmére.",
        0,
        0,
        NOW (),
        'HISTORY',
        100000018
    );

INSERT INTO
    school_groups (group_name, creator_id)
values
    ('Szakmai Angol 2/14B', 100000001),
    ('Magyar nyelv 12D', 100000001),
    ('Történelem 12C', 100000001),
    ('Matematika 12C', 100000001),
    ('Digitális Kultúra 12A', 100000001),
    ('Gigachad (Backend) 2/14B', 100000001),
    ('2_14b_frontend', 100000001);

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