class Device {
    constructor(device_id, device_sl, device_name, device_category, device_req_date, remark, status, created_at, created_by, updated_at, updated_by) {
        this.device_id = device_id;
        this.device_sl = device_sl;
        this.device_name = device_name;
        this.device_category = device_category;
        this.device_req_date = device_req_date;
        this.remark = remark;
        this.status = status;
        this.created_at = created_at;
        this.created_by = created_by;
        this.updated_at = updated_at;
        this.updated_by = updated_by;
    }
  
    static mapFromRow(row) {
        try {
            return new Device(
                row.device_id,
                row.device_sl,
                row.device_name,
                row.device_category,
                row.device_req_date,
                row.remark,
                row.status,
                row.created_at,
                row.created_by,
                row.updated_at,
                row.updated_by
            );
        } catch (err) {
            console.error('Error while mapping Device from row:', err);
            throw err;
        }
    }
  
    static mapFromRows(rows) {
        try {
            return rows.map(row => Device.mapFromRow(row));
        } catch (err) {
            console.error('Error while mapping Billing from rows:', err);
            throw err;
        }
    }
  }

  module.exports = Device;
  