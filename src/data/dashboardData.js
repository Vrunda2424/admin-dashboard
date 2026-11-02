// Single shared dummy dataset. Every card, chart, and table reads from here.
const FIRST = ["Asha", "Ravi", "Meera", "Kiran", "Anil", "Sneha", "Rohan", "Divya", "Arjun", "Pooja", "Vikram", "Neha"];
const LAST = ["Sharma", "Reddy", "Patel", "Iyer", "Nair", "Gupta", "Rao", "Singh", "Das", "Menon"];
const SIGNUPS_PER_MONTH = [1, 1, 1, 2, 2, 2, 2, 3, 3, 3]; // Jan to Oct
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY = 86400000;

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
      role: nextId % 7 === 0 ? "Admin" : nextId % 3 === 0 ? "Editor" : "Viewer",
      registeredAt: new Date(2026, month, ((k * 5 + nextId) % 27) + 1),
    };
  })
);

export const ROLES = ["Admin", "Editor", "Viewer"];
export const currentUserProfile = { name: "Admin User", email: "admin@example.com", phone: "9876543210", role: "Admin" };

export const RANGE_OPTIONS = [
  { key: "7d", label: "Last 7 Days" },
  { key: "30d", label: "Last 30 Days" },
  { key: "3m", label: "Last 3 Months" },
  { key: "year", label: "This Year" },
];

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const formatDay = (d) => `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;

// Ranges end on the most recent registration, so the demo data always has something to show.
const reference = startOfDay(users.reduce((a, u) => (u.registeredAt > a ? u.registeredAt : a), users[0].registeredAt));

export function getRange(key) {
  const starts = {
    "7d": addDays(reference, -6),
    "30d": addDays(reference, -29),
    "3m": new Date(reference.getFullYear(), reference.getMonth() - 3, reference.getDate() + 1),
    year: new Date(reference.getFullYear(), 0, 1),
  };
  return { start: starts[key], end: new Date(addDays(reference, 1).getTime() - 1) };
}

// Short ranges are shown day by day, longer ones month by month.
function buildBuckets(start, end, days) {
  const buckets = [];
  if (days <= 31) {
    for (let i = 0; i < days; i++) {
      const from = addDays(start, i);
      buckets.push({ label: `${from.getDate()} ${MONTH_NAMES[from.getMonth()]}`, from, to: addDays(from, 1) });
    }
    return buckets;
  }
  let cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  while (cursor <= end) {
    const next = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
    buckets.push({ label: MONTH_NAMES[cursor.getMonth()], from: cursor, to: next });
    cursor = next;
  }
  return buckets;
}

export function buildStats(rangeKey) {
  const { start, end } = getRange(rangeKey);
  const within = (u, from, to) => u.registeredAt >= from && u.registeredAt <= to;
  const list = users.filter((u) => within(u, start, end));
  const days = Math.round((startOfDay(end) - startOfDay(start)) / DAY) + 1;
  const previousCount = users.filter((u) => within(u, addDays(start, -days), new Date(start.getTime() - 1))).length;

  const buckets = buildBuckets(start, end, days);
  const inBucket = (b) => list.filter((u) => u.registeredAt >= b.from && u.registeredAt < b.to);
  const monthlyRegistrations = buckets.map((b) => ({ month: b.label, registrations: inBucket(b).length }));
  let running = 0;
  const userGrowth = monthlyRegistrations.map((m) => ({ month: m.month, users: (running += m.registrations) }));
  const registrationsByStatus = buckets.map((b) => ({
    month: b.label,
    Active: inBucket(b).filter((u) => u.status === "Active").length,
    Inactive: inBucket(b).filter((u) => u.status === "Inactive").length,
  }));

  const active = list.filter((u) => u.status === "Active").length;
  const peak = monthlyRegistrations.reduce((best, m) => (m.registrations > best.registrations ? m : best), monthlyRegistrations[0]);
  const sameMonthAsEnd = (u) => u.registeredAt.getMonth() === end.getMonth() && u.registeredAt.getFullYear() === end.getFullYear();

  return {
    label: `${formatDay(start)} to ${formatDay(end)}`,
    summary: { total: list.length, active, inactive: list.length - active, newThisMonth: list.filter(sameMonthAsEnd).length },
    monthlyRegistrations,
    userGrowth,
    registrationsByStatus,
    statusBreakdown: [{ name: "Active", value: active }, { name: "Inactive", value: list.length - active }],
    roleDistribution: ROLES.map((name) => ({ name, value: list.filter((u) => u.role === name).length })),
    recentUsers: [...list].sort((a, b) => b.registeredAt - a.registeredAt).slice(0, 5),
    analytics: {
      averagePerMonth: (list.length / (days / 30.44)).toFixed(1),
      peak,
      growthRate: previousCount === 0 ? null : Math.round(((list.length - previousCount) / previousCount) * 100),
      activeRate: list.length ? Math.round((active / list.length) * 100) : 0,
    },
  };
}
