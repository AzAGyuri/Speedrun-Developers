create table hunt (
    id          int         not null    primary key     auto_increment,
    location    varchar(30) not null,
    start_date  timestamp   not null,
    end_date    timestamp   not null
);