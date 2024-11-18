use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(EmailFile::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(EmailFile::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(EmailFile::EmailId).integer().not_null())
                    .col(ColumnDef::new(EmailFile::FileName).string().not_null())
                    .col(ColumnDef::new(EmailFile::FilePath).string().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .from(EmailFile::Table, EmailFile::EmailId)
                            .to(Email::Table, Email::Id),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(EmailFile::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum EmailFile {
    Table,
    Id,
    EmailId,
    FileName,
    FilePath,
}

#[derive(DeriveIden)]
enum Email {
    Table,
    Id,
}
