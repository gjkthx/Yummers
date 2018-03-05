CREATE TABLE saved (
    save_id serial,
    whoSaved integer REFERENCES users(id),
    recipe_id varchar(25),
    recipe_title varchar(100),
    recipe_img varchar(250),
    social_rank integer
)