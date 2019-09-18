

# Manage Migrations (Metadata + Postgres Schema)

## CREATE MIGRATION 
hasura init --directory project --endpoint http://localhost:8080   // name of the source

cd project

hasura migrate create "init" --from-server

hasura migrate apply --version 1568823797030 --skip-execution // change verison number


## APPLY MIGRATION
hasura migrate apply --endpoint http://localhost:8080   // name of the target


### More info
[docs.hasura.io](https://docs.hasura.io/1.0/graphql/manual/migrations/manage-migrations.html)
