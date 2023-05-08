class Person {
    constructor(person_id, person_sl, person_email, person_name, person_team, status, remark, created_at, created_by, updated_at, updated_by) {
    this.person_id = person_id;
    this.person_sl = person_sl;
    this.person_email = person_email;
    this.person_name = person_name;
    this.person_team = person_team;
    this.status = status;
    this.remark = remark;
    this.created_at = created_at;
    this.created_by = created_by;
    this.updated_at = updated_at;
    this.updated_by = updated_by;
    }
    
    static mapFromRow(row) {
    try {
    return new Person(
    row.person_id,
    row.person_sl,
    row.person_email,
    row.person_name,
    row.person_team,
    row.status,
    row.remark,
    row.created_at,
    row.created_by,
    row.updated_at,
    row.updated_by
    );
    } catch (err) {
    console.error('Error while mapping Person from row:', err);
    throw err;
    }
    }
    
    static mapFromRows(rows) {
    try {
    return rows.map(row => Person.mapFromRow(row));
    } catch (err) {
    console.error('Error while mapping Person from rows:', err);
    throw err;
    }
    }
    }
    
    module.exports = Person;