import { getUsers, addUser, deleteUser } from "./services/api.js";

const firstNames = ["Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones"];
const roles = ["Admin", "User", "Moderator", "Guest"];
const statuses = ["Active", "Inactive", "Banned", "Pending", "Suspended"];

// Random name/email/username generators
function randomName() {
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${first} ${last}`;
}

function randomEmail(name) {
  return name.toLowerCase().replace(/\s+/g, ".") + "@example.com";
}

function randomUsername(name) {
  return name.toLowerCase().replace(/\s+/g, "_");
}

function randomJoinedDate() {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 365);
  return new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
}

// Generate lastActive timestamp within past 30 days
function randomLastActive() {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30); // 0–29 days ago
  const hoursAgo = Math.floor(Math.random() * 24);
  const minutesAgo = Math.floor(Math.random() * 60);
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - daysAgo,
    now.getHours() - hoursAgo,
    now.getMinutes() - minutesAgo
  ).toISOString();
}

// Optional: convert ISO date to human-readable relative string
function relativeTime(dateISO) {
  const now = new Date();
  const past = new Date(dateISO);
  const diffMs = now - past;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return `${diffSec} seconds ago`;
  if (diffMin < 60) return `${diffMin} minutes ago`;
  if (diffHr < 24) return `${diffHr} hours ago`;
  if (diffDay < 7) return `${diffDay} days ago`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)} weeks ago`;
  return `${Math.floor(diffDay / 30)} months ago`;
}

// Generate 70 realistic users
const realisticUsers = Array.from({ length: 70 }, () => {
  const name = randomName();
  const lastActiveISO = randomLastActive();
  return {
    name,
    username: randomUsername(name),
    email: randomEmail(name),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    role: roles[Math.floor(Math.random() * roles.length)],
    joinedDate: randomJoinedDate(),
    lastActive: lastActiveISO,
    lastActiveRelative: relativeTime(lastActiveISO), // optional field for display
    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
    phone: `+1-555-${Math.floor(Math.random() * 9000 + 1000)}`,
    address: `Street ${Math.floor(Math.random() * 100)}, City`
  };
});

// Generate 10 proxy users with realistic lastActive
const proxyUsers = Array.from({ length: 10 }, (_, i) => {
  const id = i + 1;
  const lastActiveISO = randomLastActive();
  return {
    name: `name ${id}`,
    username: `user${id}`,
    email: `user${id}@example.com`,
    status: `status ${id}`,
    role: `role ${id}`,
    joinedDate: "2025-10-11",
    lastActive: lastActiveISO,
    lastActiveRelative: relativeTime(lastActiveISO),
    avatar: "",
    phone: "",
    address: ""
  };
});

const users = [...realisticUsers, ...proxyUsers];

async function seed() {
  try {
    const existing = await getUsers();
    await Promise.all(existing.data.map(u => deleteUser(u.id)));

    for (const user of users) {
      await addUser(user);
    }

    console.log("✅ Successfully seeded 80 users with realistic lastActive!");
  } catch (err) {
    console.error("❌ Error seeding users:", err.message);
  }
}

seed();

