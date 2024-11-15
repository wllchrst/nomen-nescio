pub use sea_orm_migration::prelude::*;

mod m20241114_110446_create_user_table;
mod m20241115_033847_create_table_group;
mod m20241115_033855_create_table_group_members;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20241114_110446_create_user_table::Migration),
            Box::new(m20241115_033847_create_table_group::Migration),
            Box::new(m20241115_033855_create_table_group_members::Migration),
        ]
    }
}
