#[ic_cdk::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

#[ic_cdk::query]
fn eek(name: String) -> String {
    format!("Hello, {}!", name)
}
ic_cdk::export_candid!();
