//! `SeaORM` Entity, @generated by sea-orm-codegen 1.1.0

use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Eq)]
#[sea_orm(table_name = "email_file")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub email_id: i32,
    pub file_name: String,
    pub file_path: String,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::email::Entity",
        from = "Column::EmailId",
        to = "super::email::Column::Id",
        on_update = "NoAction",
        on_delete = "NoAction"
    )]
    Email,
}

impl Related<super::email::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Email.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
