create table shoot (
    id           int        not null    primary key  auto_increment,
    hunter_id    int        not null,
    quarry_id    int        not null,
    date_time    timestamp  not null,

    foreign key (hunter_id) references hunter (id),
    foreign key (quarry_id) references quarry (id)

);