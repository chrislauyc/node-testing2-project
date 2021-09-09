exports.up = function(knex){
    return knex.schema
    .createTable("materials",(table)=>{
        //schema building functions
        //
        // some common ones:
        // increments, text, integer, float, boolean, notNullable
        // references('id'), inTable('farms')
        // 
        table.increments("material_id");
        table.string("material_name").notNullable();
    })
    .createTable("gases",(table)=>{
        //createTable are chainable
        table.increments("gas_id");
        table.string("gas_name").notNullable();
    })
    .createTable("experiments",(table)=>{
        table.increments("experiment_id");
        table.date("experiment_date").notNullable();
        table.integer("material_id")
        .unsigned()
        .notNullable()
        .references("material_id")
        .inTable("materials")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("temperatures",(table)=>{
        table.increments("temperature_id");
        table.integer("temperature scan #")
        .unsigned().notNullable();
        table.datetime("temperature_time").notNullable();
        table.double("emissivity");
        table.double("temperature");
        table.double("detector scalar");
        table.double("expo theo scalar");
        table.double("total intensity");
        table.integer("experiment_id")
        .unsigned()
        .notNullable()
        .references("experiment_id")
        .inTable("experiments")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

    })
    .createTabe("sweeps",(table)=>{
        table.increments("sweep_id");
        table.integer("experiment_id")
        .unsigned()
        .notNullable()
        .references("experiemnts_id")
        .inTable("experiments")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
        table.integer("sweep scan #")
        .unsigned()
        .notNullable();
        table.double("total pressure")
        .unsigned();
        table.double("high frequency")
        ,unsigned();
        table.double("low frequency")
        .unsigned();
        table.double("drive amplitude")
        .unsigned();
        table.double("dwell time")
        .unsigned();
        table.double("sweep time")
        .unsigned();
        table.double("RF Vo A");
        table.double("RF Vo B");
        table.double("RF frequency")
        .unsigned();
        table.double("green laser mW");
        table.double("green laser photodiode V");
        table.double("green laser V");
        table.double("waveplate");
        table.boolean("uv lamp").defaultTo(false);
        table.double("sweep time");
        table.double("peak amplitude");
        table.double("peak position");
        table.double("peak width");
        table.double("peak offset");
        table.integer("charge");
    })
    .createTable("mfcs",(table)=>{
        table.increments("mfc_id");
        table.double("mfc_%").defaultTo(100);
        table.integer("sweep_id")
        .unsigned()
        .notNullable()
        .references("sweep_id")
        .inTable("sweeps")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");;
        table.integer("gas_id")
        .unsigned()
        .notNullable()
        .references("gas_id")
        .inTable("gases")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");;
    })
}
exports.down = function(knex){
    return knex.schema
    .dropTableIfExists("mfcs")
    .dropTableIfExists("sweeps")
    .dropTableIfExists("temperatures")
    .dropTableIfExists("experiments")
    .dropTableIfExists("gases")
    .dropTableIfExists("materials");
}