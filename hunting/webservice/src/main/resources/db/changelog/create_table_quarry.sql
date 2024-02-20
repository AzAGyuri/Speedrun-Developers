create table quarry (
    id              int         not null    primary key     auto_increment,
    animal_race     varchar(30) not null,
    type_id         varchar(30),

    foreign key (type_id) references animal_type (id)

);