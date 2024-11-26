pub use sea_orm_migration::prelude::*;

mod m20241114_110446_create_user_table;
mod m20241115_033847_create_table_group;
mod m20241115_033855_create_table_group_members;
mod m20241118_002751_create_table_email;
mod m20241118_002917_create_table_email_receivers;
mod m20241118_002922_create_table_files;mod m20241126_143130_create_groups_and_members;
mod m20241126_143150_group_member;



pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20241114_110446_create_user_table::Migration),
            Box::new(m20241115_033847_create_table_group::Migration),
            Box::new(m20241115_033855_create_table_group_members::Migration),
            Box::new(m20241118_002751_create_table_email::Migration),
            Box::new(m20241118_002917_create_table_email_receivers::Migration),
            Box::new(m20241118_002922_create_table_files::Migration),
        ]
    }
}
