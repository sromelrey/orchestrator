const { db } = require("@vercel/postgres");
const { todos } = require("../app/lib/placeholder");

async function seedTodos(client) {
  try {
    const insertedTodos = await Promise.all(
      todos.map(async (todo) => {
        const mappedTodos = await client.sql`
        INSERT INTO todos (user_id, title, date)
        VALUES (${todo.user_id}, ${todo.title}, ${todo.date})
        ON CONFLICT (id) DO NOTHING
        RETURNING id;
      `;
        const {
          rows: [{ id }],
        } = mappedTodos;

        const tasksInserted = await Promise.all(
          todo.tasks.map(async (task) => {
            const mappedTasks = await client.sql`
          INSERT INTO subtasks (todo_id, title, start_time, end_time)
          VALUES (${id}, ${task.title}, ${task.start_time}, ${task.end_time})
          ON CONFLICT (id) DO NOTHING 
          RETURNING id;
        `;
            const {
              rows: [{ id: subtask_id }],
            } = mappedTasks;

            const todosInserted = await Promise.all(
              task.todos.map(async (todo) => {
                return await client.sql`
          INSERT INTO subtasks_list (subtask_id, description)
          VALUES (${subtask_id}, ${todo.description})
          ON CONFLICT (id) DO NOTHING 
          RETURNING id;
        `;
              })
            );
            return { todosInserted, mappedTasks };
          })
        );

        return { tasksInserted };
      })
    );

    return insertedTodos;
  } catch (error) {
    console.error("Error seeding todos:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedTodos(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
