# Manage Migrations (Metadata + Postgres Schema)

## CREATE MIGRATION

hasura init --directory project --endpoint http://localhost:8080 // name of the source

hasura init --hasura-migrations-new project --endpoint http://localhost:8080 --admin-secret "password"

cd project

hasura migrate create "init" --from-server




 // change verison number

## APPLY MIGRATION

hasura migrate apply --endpoint http://localhost:8080 // name of the target

### More info

[docs.hasura.io](https://docs.hasura.io/1.0/graphql/manual/migrations/manage-migrations.html)
