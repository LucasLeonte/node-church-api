const bcrypt = require("bcryptjs");

exports.seed = async function (knex) {
    // Deletes ALL existing entries (in order to respect FKs)
    await knex("category_resource").del();
    await knex("resources").del();
    await knex("resource_categories").del();
    await knex("programs").del();
    await knex("news").del();
    await knex("users").del();

    // Insert users
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("password123", salt);

    const [userId] = await knex("users").insert({
        name: "Admin",
        email: "admin@example.com",
        password: passwordHash,
        is_admin: true,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
    });

    // Insert news
    const [newsId] = await knex("news").insert({
        title: "Welcome",
        image: "welcome.png",
        content: "Welcome to the API.",
        published_at: knex.fn.now(),
        author: "System",
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
    });

    // Insert programs
    const [programId] = await knex("programs").insert({
        title: "Sunday Service",
        description: "Weekly worship service",
        day_of_week: "Sunday",
        start_time: "10:00",
        end_time: "11:30",
        published: true,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
    });

    // Insert resource categories
    const [catA] = await knex("resource_categories").insert({
        name: "Sermons",
        description: "Recorded sermons and audio",
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
    });

    const [catB] = await knex("resource_categories").insert({
        name: "Devotionals",
        description: "Daily devotionals",
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
    });

    // Insert resources
    const [res1] = await knex("resources").insert({
        title: "First Sermon",
        image: "sermon1.jpg",
        content: "Audio file link",
        published_at: knex.fn.now(),
        author: "Pastor",
        link: null,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
    });

    const [res2] = await knex("resources").insert({
        title: "Morning Devotional",
        image: "devotional1.jpg",
        content: "Devotional text",
        published_at: knex.fn.now(),
        author: "Team",
        link: null,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now(),
    });

    // Link resources to categories via pivot
    await knex("category_resource").insert([
        {
            resource_id: res1,
            resource_category_id: catA,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now(),
        },
        {
            resource_id: res2,
            resource_category_id: catB,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now(),
        },
    ]);
};
