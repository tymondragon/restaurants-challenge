
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('restaurants').del()
    .then(function () {
      // Inserts seed entries
      return knex('restaurants').insert([
        { id: 1, name: 'The Roost', place_id: 'ChIJhxYRNAv5a4cRCfII8tFxpuE', created_at: new Date() },
        { id: 2, name: "Mike O'Shays Restaurant & Ale House", place_id: 'ChIJk6gJLQv5a4cRUmVF_wm9igg', created_at: new Date() },
        { id: 3, name: "Rosalee's Pizzeria", place_id: 'ChIJs8oMLHX5a4cRRt16f2hPbUI', created_at: new Date() },
        { id: 4, name: 'Georgia Boys BBQ - Longmont', place_id: 'ChIJM8w7H6H5a4cRNpimqp3EzTI', created_at: new Date() },
        { id: 5, name: "Jefe's Longmont", place_id: 'ChIJIzrCIaD5a4cRsFXxiyHpedo', created_at: new Date() },
        { id: 6, name: "Flavor of India", place_id: 'ChIJ_y2WMgv5a4cRIXOtZIxXXrs', created_at: new Date() },
        { id: 7, name: "Jonny's of Longmont", place_id: 'ChIJN_8XNPX5a4cR8IbNDZ6INl0', created_at: new Date() },
      ]);
    });
};