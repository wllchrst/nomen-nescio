use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Receiver::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Receiver::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Receiver::EmailId).integer().not_null())
                    .col(ColumnDef::new(Receiver::UserId).integer().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .from(Receiver::Table, Receiver::UserId)
                            .to(User::Table, User::Id),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .from(Receiver::Table, Receiver::EmailId)
                            .to(Email::Table, Email::Id),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Receiver::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum Receiver {
    Table,
    Id,
    EmailId,
    UserId,
}

#[derive(DeriveIden)]
enum Email {
    Table,
    Id,
}

#[derive(DeriveIden)]
enum User {
    Table,
    Id,
}
