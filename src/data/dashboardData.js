// Single shared dummy dataset. Every card, chart, and table reads from here.
const FIRST = ["Asha", "Ravi", "Meera", "Kiran", "Anil", "Sneha", "Rohan", "Divya", "Arjun", "Pooja", "Vikram", "Neha"];
const LAST = ["Sharma", "Reddy", "Patel", "Iyer", "Nair", "Gupta", "Rao", "Singh", "Das", "Menon"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const SIGNUPS_PER_MONTH = [4, 6, 5, 8, 9, 7, 10, 12, 11, 14];

let nextId = 0;
export const users = SIGNUPS_PER_MONTH.flatMap((count, month) =>
  Array.from({ length: count }, (_, k) => {
    nextId += 1;
    const name = `${FIRST[nextId % FIRST.length]} ${LAST[(nextId * 3) % LAST.length]}`;
    return {
      id: nextId,
      name,
      email: `${name.toLowerCase().replace(" ", ".")}${nextId}@example.com`,
      status: nextId % 4 === 0 ? "Inactive" : "Active",
      registeredAt: new Date(2026, month, ((k * 5 + nextId) % 27) + 1),
    };
  })
);

// "This month" means the month of the most recent registration in the dataset.
const latest = users.reduce((a, u) => (u.registeredAt > a ? u.registeredAt : a), users[0].registeredAt);
const inLatestMonth = (d) => d.getMonth() === latest.getMonth() && d.getFullYear() === latest.getFullYear();

export const summary = {
  total: users.length,
  active: users.filter((u) => u.status === "Active").length,
  inactive: users.filter((u) => u.status === "Inactive").length,
  newThisMonth: users.filter((u) => inLatestMonth(u.registeredAt)).length,
};

export const monthlyRegistrations = MONTHS.map((month, i) => ({
  month,
  registrations: users.filter((u) => u.registeredAt.getMonth() === i).length,
}));

export const userGrowth = monthlyRegistrations.reduce((acc, m) => {
  const previous = acc.length ? acc[acc.length - 1].users : 0;
  return [...acc, { month: m.month, users: previous + m.registrations }];
}, []);

export const statusBreakdown = [
  { name: "Active", value: summary.active },
  { name: "Inactive", value: summary.inactive },
];

export const recentUsers = [...users].sort((a, b) => b.registeredAt - a.registeredAt).slice(0, 5);
