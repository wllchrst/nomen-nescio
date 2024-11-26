use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Email::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Email::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Email::SenderId).integer().not_null())
                    .col(ColumnDef::new(Email::Title).string().not_null())
                    .col(ColumnDef::new(Email::Description).string().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .from(Email::Table, Email::SenderId)
                            .to(User::Table, User::Id),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Email::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum Email {
    Table,
    Id,
    Title,
    Description,
    SenderId,
}

#[derive(DeriveIden)]
enum User {
    Table,
    Id,
}
