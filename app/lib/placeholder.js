const todos = [
  {
    user_id: "526f79ba-7d4f-4d12-a20a-f65f1fc32591",
    date: "2024-03-17",
    title: "Setup Authentication",
    tasks: [
      {
        title: "Create Login",
        start_time: "01:00:00",
        end_time: "02:00:00",
        todos: [
          { description: "Create Login Form", status: "done" },
          { description: "Integrate Authentication", status: "done" },
          {
            description: "Modify Login UI for Mobile Responsiveness",
            status: "pending",
          },
        ],
      },
      {
        title: "Create SignUp",
        start_time: "02:00:00",
        end_time: "03:00:00",
        status: "ongoing",
        todos: [
          { description: "Create SignUp Form", status: "pending" },
          { description: "Integrate SignUp with API", status: "pending" },
          {
            description: "Modify SignUp UI for Mobile Responsiveness",
            status: "pending",
          },
        ],
      },
      {
        title: "Create table Component",
        status: "done",
        start_time: "03:00:00",
        end_time: "04:00:00",
        todos: [
          { description: "Create table Component", status: "done" },
          { description: "Integrate with API", status: "done" },
          { description: "Integrate Pagination", status: "done" },
          {
            description: "Modify Login UI for Mobile Responsiveness",
            status: "pending",
          },
        ],
      },
    ],
  },
];
module.exports = {
  todos,
};
