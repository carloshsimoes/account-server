# Migrations

## Generate orm config file.

Create a orm config file with database ingress, migrations folder, etc.
Is automatically generated before `*:migration` command.

```sh
yarn orm:config
```

## Configure orm cli.

Is automatically used before `*:migration` command.

```sh
yarn orm:cli
```

## Generate migration.

Create a migration file with diff from the database.

```sh
yarn orm:migration:gen -n MigrationName
```

## Execute migrations.

Execute all migrations in the migrations folder.

```sh
yarn orm:migration:run
```

## Clean database.

Delete from tables.

```sh
orm:database:clean
```

## Persist hosts in database.

Insert hosts from mocks.

```sh
orm:database:persist-hosts
```
