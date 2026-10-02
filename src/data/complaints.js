export const complaints = [
  {
    id: "CF-1021",
    title: "Hostel Wi-Fi Issue",
    category: "Internet",
    description: "Wi-Fi is frequently disconnecting in Block B, especially during evening hours.",
    location: "Hostel Block B",
    priority: "Medium",
    status: "In Progress",
    createdAt: "28 September 2026",
    updates: [
      {
        status: "Submitted",
        date: "28 September 2026",
        message: "Issue reported by student.",
      },
      {
        status: "Assigned",
        date: "29 September 2026",
        message: "Issue assigned to the maintenance team.",
      },
      {
        status: "In Progress",
        date: "30 September 2026",
        message: "Maintenance team is investigating the issue.",
      },
    ],
  },
  {
    id: "CF-1022",
    title: "Classroom Fan Repair",
    category: "Electrical",
    description: "The classroom fan in Room 204 is making loud noise and is not cooling properly.",
    location: "Room 204, Block A",
    priority: "High",
    status: "Resolved",
    createdAt: "17 September 2026",
    updates: [
      {
        status: "Submitted",
        date: "17 September 2026",
        message: "Maintenance request created.",
      },
      {
        status: "Assigned",
        date: "18 September 2026",
        message: "Electronic maintenance team dispatched.",
      },
      {
        status: "In Progress",
        date: "19 September 2026",
        message: "Fan motor replaced and inspection completed.",
      },
      {
        status: "Resolved",
        date: "20 September 2026",
        message: "Issue resolved and classroom confirmed operational.",
      },
    ],
  },
  {
    id: "CF-1023",
    title: "Water Leakage Near Cafeteria",
    category: "Hostel",
    description: "There is a recurring water leak near the cafeteria entry area, causing slippery flooring.",
    location: "Cafeteria Entrance",
    priority: "Medium",
    status: "Assigned",
    createdAt: "02 October 2026",
    updates: [
      {
        status: "Submitted",
        date: "02 October 2026",
        message: "Issue reported by student and logged in the campus system.",
      },
      {
        status: "Assigned",
        date: "03 October 2026",
        message: "Facilities team assigned to inspect the leak.",
      },
    ],
  },
];
