use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(GroupMember::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(GroupMember::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(GroupMember::GroupId).integer().not_null())
                    .col(ColumnDef::new(GroupMember::UserId).integer().not_null())
                    .col(ColumnDef::new(GroupMember::Role).string().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .from(GroupMember::Table, GroupMember::GroupId)
                            .to(Group::Table, Group::Id),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .from(GroupMember::Table, GroupMember::UserId)
                            .to(User::Table, User::Id),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(GroupMember::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum GroupMember {
    Table,
    Id,
    GroupId,
    UserId,
    Role
}

#[derive(DeriveIden)]
enum Group {
    Table,
    Id,
}

#[derive(DeriveIden)]
enum User {
    Table,
    Id,
}
