const { Model } = require('objection');

class BaseModel extends Model {
    // Called automatically by Objection before inserting a new row.
    // Ensures created_at and updated_at are set if not provided.
    $beforeInsert(ctx) {
        if (super.$beforeInsert) super.$beforeInsert(ctx);
        if (this.created_at === undefined) this.created_at = new Date().toISOString();
        if (this.updated_at === undefined) this.updated_at = new Date().toISOString();
    }

    // Called automatically by Objection before updating an existing row.
    // Updates the updated_at timestamp on every update.
    $beforeUpdate(opt, ctx) {
        if (super.$beforeUpdate) super.$beforeUpdate(opt, ctx);
        this.updated_at = new Date().toISOString();
    }
}

module.exports = BaseModel;
