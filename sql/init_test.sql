insert into color_def (name)values ('biały');
insert into color_def (name)values ('czarny');
insert into color_def (name)values ('brązowy');

insert into product_group_def (name) values ('fi 16');
insert into product_group_def (name) values ('fi 19');
insert into product_group_def (name) values ('fi 25');

insert into color_def_product_group (color_id, product_group_id) values (1,1);
insert into color_def_product_group (color_id, product_group_id) values (1,2);
insert into color_def_product_group (color_id, product_group_id) values (1,3);
insert into color_def_product_group (color_id, product_group_id) values (2,1);
insert into color_def_product_group (color_id, product_group_id) values (2,2);
insert into color_def_product_group (color_id, product_group_id) values (3,2);
insert into color_def_product_group (color_id, product_group_id) values (3,3);

insert into support_def (name, color_id, product_group_id) values ('wspornik 1', 1,1);
insert into support_def (name, color_id, product_group_id) values ('wspornik 2', 1,1);
insert into support_def (name, color_id, product_group_id) values ('wspornik 3', 1,1);
insert into support_def (name, color_id, product_group_id) values ('wspornik 4', 2,1);
insert into support_def (name, color_id, product_group_id) values ('wspornik 5', 3,1);

insert into ending_def (name, color_id, product_group_id, count) values ('koncowka 1',1,1);
insert into ending_def (name, color_id, product_group_id, count) values ('koncowka 2',2,1);
insert into ending_def (name, color_id, product_group_id, count) values ('koncowka 3',1,2);
insert into ending_def (name, color_id, product_group_id, count) values ('koncowka 4',2,1);
insert into ending_def (name, color_id, product_group_id, count) values ('koncowka 5',2,2);

insert into circle_def (name, color_id, product_group_id) values ('haczyk 1',1,1);
insert into circle_def (name, color_id, product_group_id) values ('haczyk 2',2,1);
insert into circle_def (name, color_id, product_group_id) values ('haczyk 3',1,2);
insert into circle_def (name, color_id, product_group_id) values ('haczyk 4',2,1);
insert into circle_def (name, color_id, product_group_id) values ('haczyk 5',2,2);

insert into rod_length_def (length, color_id, product_group_id) values (130, 1,1);
insert into rod_length_def (length, color_id, product_group_id) values (140, 1,1);
insert into rod_length_def (length, color_id, product_group_id) values (150, 1,1);
insert into rod_length_def (length, color_id, product_group_id) values (160, 1,1);
insert into rod_length_def (length, color_id, product_group_id) values (170, 1,1);
insert into rod_length_def (length, color_id, product_group_id) values (180, 1,1);
insert into rod_length_def (length, color_id, product_group_id) values (190, 1,1);
insert into rod_length_def (length, color_id, product_group_id) values (200, 1,1);
insert into rod_length_def (length, color_id, product_group_id) values (210, 1,1);