create table participate (
    id           int        not null    primary key  auto_increment,
    hunt_id      int        not null,
    hunter_id    int        not null,

    foreign key (hunt_id) references hunt (id),
    foreign key (hunter_id) references hunter (id)

);